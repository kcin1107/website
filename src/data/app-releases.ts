/* Current app versions, read at build time so the app pages (Scorer, Cleankey,
   Crescent, Grab) never need a hand edit after a release. Each lookup falls back
   to the last known values, so an offline build or an API hiccup still deploys —
   just with possibly stale numbers until the next build. */

export interface ScorerRelease {
  version: string
  /** "Free", or the store-formatted price from the German App Store, e.g. "1,99 €". */
  price: string
}

export interface GitHubRelease {
  version: string
}

const TIMEOUT_MS = 5000

const scorerFallback: ScorerRelease = { version: '1.3.1', price: 'Free' }
const cleankeyFallback: GitHubRelease = { version: '1.1.4' }
const crescentFallback: GitHubRelease = { version: '1.0.1' }
const grabFallback: GitHubRelease = { version: '1.0.1' }

async function fetchScorer(): Promise<ScorerRelease> {
  try {
    const res = await fetch('https://itunes.apple.com/lookup?bundleId=nick.Scorer&country=de', {
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    const app = (await res.json()).results?.[0]
    if (!app?.version) throw new Error('no App Store result')
    // The German storefront formats a free app as "Gratis"; the page is English.
    const price = app.price === 0 ? 'Free' : app.formattedPrice ?? scorerFallback.price
    return { version: app.version, price }
  } catch (error) {
    console.warn(`[app-releases] Scorer lookup failed, using ${scorerFallback.version}:`, error)
    return scorerFallback
  }
}

/* github.com/…/releases/latest redirects to the newest tag's page. Reading that
   redirect avoids the REST API and its unauthenticated rate limit. */
async function fetchGitHubRelease(name: string, repo: string, fallback: GitHubRelease): Promise<GitHubRelease> {
  try {
    const res = await fetch(`https://github.com/${repo}/releases/latest`, {
      method: 'HEAD',
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    const url = res.headers.get('location') ?? ''
    const tag = url.match(/\/releases\/tag\/v?([^/?#]+)$/)?.[1]
    if (!tag) throw new Error(`unexpected redirect "${url}"`)
    return { version: tag }
  } catch (error) {
    console.warn(`[app-releases] ${name} lookup failed, using ${fallback.version}:`, error)
    return fallback
  }
}

/* Memoised so every page in one build shares a single request per app. */
let scorer: Promise<ScorerRelease> | undefined
let cleankey: Promise<GitHubRelease> | undefined
let crescent: Promise<GitHubRelease> | undefined
let grab: Promise<GitHubRelease> | undefined

export const getScorerRelease = () => (scorer ??= fetchScorer())
export const getCleankeyRelease = () =>
  (cleankey ??= fetchGitHubRelease('Cleankey', 'kcin1107/Cleankey', cleankeyFallback))
export const getCrescentRelease = () =>
  (crescent ??= fetchGitHubRelease('Crescent', 'kcin1107/Crescent', crescentFallback))
export const getGrabRelease = () =>
  (grab ??= fetchGitHubRelease('Grab', 'kcin1107/grab', grabFallback))
