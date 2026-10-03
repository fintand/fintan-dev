import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { syncActivities } from './fetch-intervals.mjs'

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), 'intervals-test-'))
  t.after(() => rm(directory, { recursive: true, force: true }))
  const outputUrl = join(directory, 'activity.json')
  const previous = '{"ytdRideKm":139,"ytdRunKm":0,"asOf":"2026-07-07"}\n'
  await writeFile(outputUrl, previous)
  return { outputUrl, previous }
}

const now = new Date('2026-10-03T12:00:00Z')
const response = (body) => async () => new Response(JSON.stringify(body))

test('writes rounded totals, normalizes types, and queries only through today', async (t) => {
  const { outputUrl } = await fixture(t)
  const data = await syncActivities({
    apiKey: 'test-key', outputUrl, now,
    fetchImpl: async (url, options) => {
      const query = new URL(url).searchParams
      assert.equal(query.get('oldest'), '2026-01-01')
      assert.equal(query.get('newest'), '2026-10-03')
      assert.equal(options.headers.Authorization, `Basic ${Buffer.from('API_KEY:test-key').toString('base64')}`)
      return new Response(JSON.stringify([
        { type: 'Ride', distance: 1200 },
        { type: 'Virtual_Ride', distance: 2400 },
        { type: 'Trail Run', distance: 1800 },
        { type: 'Run', distance: 0 },
        { type: 'Swim', distance: 1000 },
      ]))
    },
  })
  assert.deepEqual(data, { ytdRideKm: 4, ytdRunKm: 2, asOf: '2026-10-03' })
  assert.deepEqual(JSON.parse(await readFile(outputUrl, 'utf8')), data)
})

test('an empty successful response writes zero totals', async (t) => {
  const { outputUrl } = await fixture(t)
  assert.deepEqual(await syncActivities({ apiKey: 'test-key', outputUrl, now, fetchImpl: response([]) }),
    { ytdRideKm: 0, ytdRunKm: 0, asOf: '2026-10-03' })
})

test('invalid distances and response shapes preserve the previous file', async (t) => {
  const { outputUrl, previous } = await fixture(t)
  const bodies = [
    ...['invalid', '1000', -1, null, undefined].map((distance) => [{ type: 'Ride', distance }]),
    [{ type: 'Ride', distance: 1000 }, { type: 'Run', distance: -1 }],
    [{ type: 'Ride', distance: Number.MAX_VALUE }, { type: 'Ride', distance: Number.MAX_VALUE }],
    null, {}, [null], [{}],
  ]
  for (const body of bodies) {
    await assert.rejects(syncActivities({ apiKey: 'test-key', outputUrl, now, fetchImpl: response(body) }))
    assert.equal(await readFile(outputUrl, 'utf8'), previous)
  }
})

test('HTTP, network, and JSON failures preserve the previous file', async (t) => {
  const { outputUrl, previous } = await fixture(t)
  for (const fetchImpl of [
    async () => new Response('Unavailable', { status: 503 }),
    async () => { throw new Error('Network failure') },
    async () => new Response('invalid json'),
  ]) {
    await assert.rejects(syncActivities({ apiKey: 'test-key', outputUrl, now, fetchImpl }))
    assert.equal(await readFile(outputUrl, 'utf8'), previous)
  }
})
