/* Current app versions, read at build time so the Scorer and Cleankey pages never
   need a hand edit after a release. Each lookup falls back to the last known
   values, so an offline build or an API hiccup still deploys — just with
   possibly stale numbers until the next build. */

export interface ScorerRelease {
  version: string
  /** Store-formatted price from the German App Store, e.g. "1,99 €". */
  price: string
}

export interface CleankeyRelease {
  version: string
}

const TIMEOUT_MS = 5000

const scorerFallback: ScorerRelease = { version: '1.3.1', price: '1,99 €' }
const cleankeyFallback: CleankeyRelease = { version: '1.1.4' }

async function fetchScorer(): Promise<ScorerRelease> {
  try {
    const res = await fetch('https://itunes.apple.com/lookup?bundleId=nick.Scorer&country=de', {
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    const app = (await res.json()).results?.[0]
    if (!app?.version) throw new Error('no App Store result')
    return { version: app.version, price: app.formattedPrice ?? scorerFallback.price }
  } catch (error) {
    console.warn(`[app-releases] Scorer lookup failed, using ${scorerFallback.version}:`, error)
    return scorerFallback
  }
}

/* github.com/…/releases/latest redirects to the newest tag's page. Reading that
   redirect avoids the REST API and its unauthenticated rate limit. */
async function fetchCleankey(): Promise<CleankeyRelease> {
  try {
    const res = await fetch('https://github.com/kcin1107/Cleankey/releases/latest', {
      method: 'HEAD',
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    const url = res.headers.get('location') ?? ''
    const tag = url.match(/\/releases\/tag\/v?([^/?#]+)$/)?.[1]
    if (!tag) throw new Error(`unexpected redirect "${url}"`)
    return { version: tag }
  } catch (error) {
    console.warn(`[app-releases] Cleankey lookup failed, using ${cleankeyFallback.version}:`, error)
    return cleankeyFallback
  }
}

/* Memoised so every page in one build shares a single request per app. */
let scorer: Promise<ScorerRelease> | undefined
let cleankey: Promise<CleankeyRelease> | undefined

export const getScorerRelease = () => (scorer ??= fetchScorer())
export const getCleankeyRelease = () => (cleankey ??= fetchCleankey())
