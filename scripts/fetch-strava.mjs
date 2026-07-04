// Fetches YTD ride/run totals from Strava and writes content/strava.json.
// Runs in the strava-sync GitHub Action; needs STRAVA_CLIENT_ID,
// STRAVA_CLIENT_SECRET and STRAVA_REFRESH_TOKEN in the environment.
import { writeFile } from 'node:fs/promises'

const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } =
  process.env

if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
  console.error(
    'Missing env: STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN',
  )
  process.exit(1)
}

async function json(res, label) {
  if (!res.ok) {
    throw new Error(`${label} failed: ${res.status} ${await res.text()}`)
  }
  return res.json()
}

const token = await json(
  await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: STRAVA_REFRESH_TOKEN,
    }),
  }),
  'Token exchange',
)

if (token.refresh_token && token.refresh_token !== STRAVA_REFRESH_TOKEN) {
  // Strava may rotate refresh tokens; the stored secret must be updated by
  // hand or every later run fails (caught by the failed-Action email).
  console.log(
    '::warning::Strava returned a new refresh token — update the STRAVA_REFRESH_TOKEN repo secret before the next run.',
  )
}

const auth = { Authorization: `Bearer ${token.access_token}` }
const athlete = await json(
  await fetch('https://www.strava.com/api/v3/athlete', { headers: auth }),
  'Athlete lookup',
)
const stats = await json(
  await fetch(`https://www.strava.com/api/v3/athletes/${athlete.id}/stats`, {
    headers: auth,
  }),
  'Athlete stats',
)

const km = (meters) => Math.round((meters ?? 0) / 1000)
const data = {
  ytdRideKm: km(stats.ytd_ride_totals?.distance),
  ytdRunKm: km(stats.ytd_run_totals?.distance),
  asOf: new Date().toISOString().slice(0, 10),
}

await writeFile(
  new URL('../content/strava.json', import.meta.url),
  JSON.stringify(data, null, 2) + '\n',
)
console.log('Wrote content/strava.json:', data)
