// WCAG 2.1 contrast check for the theme tokens in src/styles/global.css.
// Reads the :root (light) and [data-theme='dark'] blocks and checks every
// text token against every surface it can land on. Exits 1 on any failure.
//
//   npm run check:contrast

import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8')

function block(selector) {
  const start = css.indexOf(selector + ' {')
  if (start === -1) throw new Error(`No ${selector} block in global.css`)
  const body = css.slice(start, css.indexOf('}', start))
  const tokens = {}
  for (const [, name, value] of body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) tokens[name] = value
  return tokens
}

function luminance(hex) {
  const [r, g, b] = hex.slice(1).match(/../g).map((x) => {
    const v = parseInt(x, 16) / 255
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const SURFACES = ['white', 'light-grey', 'surface-grey', 'hover-grey', 'tag-idle']
// [foreground, minimum ratio, backgrounds]
const CHECKS = [
  ...['black', 'dark-grey', 'status-green', 'status-blue', 'error'].map((t) => [t, 4.5, SURFACES]),
  ['status-green', 4.5, ['status-green-bg']],
  ['error', 4.5, ['error-bg']],
  ['border-interactive', 3, SURFACES], // WCAG 1.4.11 non-text contrast
  ['focus-ring', 3, SURFACES],
]

const light = block(':root')
const themes = { light, dark: { ...light, ...block("[data-theme='dark']") } }

let failures = 0
for (const [theme, t] of Object.entries(themes)) {
  for (const [fg, min, bgs] of CHECKS) {
    for (const bg of bgs) {
      const ratio = contrast(t[fg], t[bg])
      if (ratio < min) {
        failures++
        console.log(`FAIL ${theme}: --${fg} on --${bg} ${ratio.toFixed(2)}:1 (needs ${min}:1)`)
      }
    }
  }
  console.log(`${theme}: ink on canvas ${contrast(t.black, t.white).toFixed(1)}:1`)
}

console.log(failures ? `${failures} contrast failure(s)` : 'All theme tokens pass WCAG 2.1 AA')
process.exit(failures ? 1 : 0)
