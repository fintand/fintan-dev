// Fetches YTD ride/run totals from Intervals.icu and writes content/activity.json.
// Runs in the intervals-sync GitHub Action; needs INTERVALS_API_KEY.
import { writeFile } from 'node:fs/promises'

const { INTERVALS_API_KEY } = process.env

if (!INTERVALS_API_KEY) {
  console.error('Missing env: INTERVALS_API_KEY')
  process.exit(1)
}

async function json(res, label) {
  const body = await res.text()

  if (!res.ok) {
    throw new Error(`${label} failed: ${res.status} ${body}`)
  }

  return JSON.parse(body)
}

const year = new Date().getUTCFullYear()
const query = new URLSearchParams({
  oldest: `${year}-01-01`,
  newest: `${year}-12-31`,
  fields: 'id,name,start_date_local,type,distance,moving_time',
})

const credentials = Buffer.from(`API_KEY:${INTERVALS_API_KEY}`).toString(
  'base64',
)
const activities = await json(
  await fetch(
    `https://intervals.icu/api/v1/athlete/0/activities?${query}`,
    {
      headers: { Authorization: `Basic ${credentials}` },
    },
  ),
  'Intervals.icu activities lookup',
)

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

function totalDistance(types) {
  return activities
    .filter((activity) => types.has(typeKey(activity)))
    .reduce((total, activity) => total + Number(activity.distance ?? 0), 0)
}

const km = (meters) => Math.round((meters ?? 0) / 1000)
const data = {
  ytdRideKm: km(totalDistance(rideTypes)),
  ytdRunKm: km(totalDistance(runTypes)),
  asOf: new Date().toISOString().slice(0, 10),
}

await writeFile(
  new URL('../content/activity.json', import.meta.url),
  JSON.stringify(data, null, 2) + '\n',
)
console.log('Wrote content/activity.json:', data)
