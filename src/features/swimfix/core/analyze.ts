import { markRest, mergeLengths } from './edit';
import type { FitFile } from './fitfile';
import type { HrSample, LengthInfo, Model } from './model';
import { strokeName } from './profile';

export type Confidence = 'hoch' | 'mittel' | 'niedrig';

export interface Suggestion {
  kind: 'merge' | 'rest' | 'flag';
  /** length indices: merge = [i, i+1], rest/flag = [i] */
  indices: number[];
  /** stable across edits (based on the start time of the first length) */
  key: string;
  reason: string;
  confidence: Confidence;
}

function median(xs: number[]): number {
  if (xs.length === 0) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

const SHORT = 0.6;

function fmt(n: number): string {
  return n.toFixed(1).replace('.', ',');
}

function hrRisesContinuously(hr: HrSample[], from: number, to: number): boolean {
  const w = hr.filter((s) => s.ts >= from && s.ts < to);
  if (w.length < 2) return false;
  let max = w[0].hr;
  for (const s of w) {
    if (s.hr < max - 2) return false;
    max = Math.max(max, s.hr);
  }
  return w[w.length - 1].hr - w[0].hr >= 3;
}

export function analyze(model: Model): Suggestion[] {
  const active = model.lengths.filter((l) => l.active && l.seconds > 0);
  if (active.length === 0) return [];
  const medAll = median(active.map((l) => l.seconds));
  const base = active.filter((l) => l.seconds >= SHORT * medAll);
  const T = median(base.map((l) => l.seconds));
  const S = median(base.map((l) => l.strokes ?? 0));
  const out: Suggestion[] = [];
  const used = new Set<number>();
  const L = model.lengths;

  // a. merge candidates
  for (let i = 0; i + 1 < L.length; i++) {
    const a = L[i];
    const b = L[i + 1];
    if (used.has(i) || used.has(i + 1)) continue;
    if (!a.active || !b.active || a.lapIndex !== b.lapIndex) continue;
    if (!(a.seconds < SHORT * T || b.seconds < SHORT * T)) continue;
    const t = a.seconds + b.seconds;
    const st = (a.strokes ?? 0) + (b.strokes ?? 0);
    if (t < 0.75 * T || t > 1.3 * T || st < 0.6 * S || st > 1.4 * S) continue;
    const rising = hrRisesContinuously(model.hr, a.start, b.start + b.seconds);
    const differ = a.stroke !== b.stroke;
    let reason = differ
      ? `Lagenwechsel auf der Bahn (${strokeName(a.stroke)} → ${strokeName(b.stroke)}): ${fmt(a.seconds)} s + ${fmt(b.seconds)} s = ${fmt(t)} s, ${st} Züge`
      : `Bahn fälschlich geteilt: ${fmt(a.seconds)} s + ${fmt(b.seconds)} s = ${fmt(t)} s, ${st} Züge`;
    if (rising) reason += '; Puls steigt durchgehend';
    const tight = t >= 0.85 * T && t <= 1.15 * T && st >= 0.8 * S && st <= 1.2 * S;
    out.push({
      kind: 'merge',
      indices: [i, i + 1],
      key: `merge:${a.start}`,
      reason,
      confidence: tight && (rising || differ) ? 'hoch' : tight || rising ? 'mittel' : 'niedrig',
    });
    used.add(i);
    used.add(i + 1);
  }

  // b. rest candidates, c. other short lengths
  for (const l of L) {
    if (used.has(l.index) || !l.active || !(l.seconds < SHORT * T)) continue;
    const strokes = l.strokes ?? 0;
    const drop = l.hrStart !== undefined && l.hrEnd !== undefined ? l.hrEnd - l.hrStart : 0;
    if (strokes < 0.35 * S && drop <= -5) {
      out.push({
        kind: 'rest',
        indices: [l.index],
        key: `rest:${l.start}`,
        reason: `nur ${strokes} Züge in ${Math.round(l.seconds)} s, Puls fällt ${l.hrStart}→${l.hrEnd} – vermutlich Pause am Beckenrand`,
        confidence: strokes < 0.2 * S && drop <= -10 ? 'hoch' : 'mittel',
      });
    } else {
      out.push(flag(l));
    }
  }
  return out.sort((x, y) => x.indices[0] - y.indices[0]);
}

function flag(l: LengthInfo): Suggestion {
  return {
    kind: 'flag',
    indices: [l.index],
    key: `flag:${l.start}`,
    reason: `ungewöhnlich kurz (${fmt(l.seconds)} s, ${l.strokes ?? 0} Züge) – bitte prüfen`,
    confidence: 'niedrig',
  };
}

/** Apply merge and rest suggestions. Rests first (no index shift), then merges from the highest index down. */
export function applySuggestions(file: FitFile, suggestions: Suggestion[]): FitFile {
  let f = file;
  for (const s of suggestions) if (s.kind === 'rest') f = markRest(f, s.indices[0]);
  const merges = suggestions.filter((s) => s.kind === 'merge').sort((a, b) => b.indices[0] - a.indices[0]);
  for (const s of merges) f = mergeLengths(f, s.indices[0]);
  return f;
}
