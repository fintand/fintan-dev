// Fetches YTD ride/run totals from Intervals.icu and writes content/activity.json.
// Runs in the intervals-sync GitHub Action; needs INTERVALS_API_KEY.
import { writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

async function json(res, label) {
  const body = await res.text()

  if (!res.ok) {
    throw new Error(`${label} failed: ${res.status} ${body}`)
  }

  return JSON.parse(body)
}

const rideTypes = new Set([
  'ebikeride',
  'gravelride',
  'handcycle',
  'mountainbikeride',
  'ride',
  'virtualride',
])
const runTypes = new Set(['run', 'trailrun', 'virtualrun'])

function typeKey(activity) {
  return String(activity.type ?? '')
    .replace(/[\s_-]/g, '')
    .toLowerCase()
}

function totalDistance(activities, types) {
  return activities
    .filter((activity) => types.has(typeKey(activity)))
    .reduce((total, activity) => {
      const distance = activity.distance
      if (typeof distance !== 'number' || !Number.isFinite(distance) || distance < 0) {
        throw new Error('Intervals.icu returned an invalid activity distance')
      }
      const nextTotal = total + distance
      if (!Number.isFinite(nextTotal)) {
        throw new Error('Intervals.icu activity distance total overflowed')
      }
      return nextTotal
    }, 0)
}

export async function syncActivities({
  apiKey = process.env.INTERVALS_API_KEY,
  fetchImpl = fetch,
  outputUrl = new URL('../content/activity.json', import.meta.url),
  now = new Date(),
} = {}) {
  if (!apiKey) throw new Error('Missing env: INTERVALS_API_KEY')

  const asOf = now.toISOString().slice(0, 10)
  const query = new URLSearchParams({
    oldest: `${now.getUTCFullYear()}-01-01`,
    newest: asOf,
    fields: 'id,type,distance',
  })
  const credentials = Buffer.from(`API_KEY:${apiKey}`).toString('base64')
  const activities = await json(
    await fetchImpl(`https://intervals.icu/api/v1/athlete/0/activities?${query}`, {
      headers: { Authorization: `Basic ${credentials}` },
      signal: AbortSignal.timeout(30_000),
    }),
    'Intervals.icu activities lookup',
  )
  if (!Array.isArray(activities) || activities.some((activity) =>
    !activity || typeof activity !== 'object' || typeof activity.type !== 'string'
  )) {
    throw new Error('Intervals.icu returned an invalid activities response')
  }

  const km = (meters) => Math.round(meters / 1000)
  const data = {
    ytdRideKm: km(totalDistance(activities, rideTypes)),
    ytdRunKm: km(totalDistance(activities, runTypes)),
    asOf,
  }

  // Validate the entire response before replacing the last successful sync.
  await writeFile(outputUrl, JSON.stringify(data, null, 2) + '\n')
  return data
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  try {
    console.log('Wrote content/activity.json:', await syncActivities())
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
