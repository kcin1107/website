import { DataRecord, FitError, FitFile } from './fitfile';
import { lapIndexOfLength, poolLengthM } from './model';
import { LAP, LENGTH, LENGTH_ACTIVE, LENGTH_IDLE, MSG, SESSION, STROKE_MIXED } from './profile';

function lengthsOf(f: FitFile): DataRecord[] {
  return f.messages(MSG.length);
}

function requireActive(l: DataRecord | undefined, i: number): DataRecord {
  if (!l) throw new FitError(`Länge ${i} existiert nicht.`);
  if (l.get(LENGTH.lengthType) !== LENGTH_ACTIVE) throw new FitError(`Länge ${i} ist keine aktive Länge.`);
  return l;
}

/** Merge length i into length i+1 (both active, same lap). Returns a new file. */
export function mergeLengths(file: FitFile, i: number): FitFile {
  const f = file.clone();
  const lengths = lengthsOf(f);
  const laps = f.messages(MSG.lap);
  const a = requireActive(lengths[i], i);
  const b = requireActive(lengths[i + 1], i + 1);
  const lapIdx = lapIndexOfLength(laps, i);
  if (lapIdx < 0 || lapIdx !== lapIndexOfLength(laps, i + 1)) {
    throw new FitError('Die Längen gehören nicht zum selben Intervall.');
  }

  const timer = (a.get(LENGTH.totalTimerTime) ?? 0) + (b.get(LENGTH.totalTimerTime) ?? 0);
  const strokes = (a.get(LENGTH.totalStrokes) ?? 0) + (b.get(LENGTH.totalStrokes) ?? 0);
  if (a.get(LENGTH.swimStroke) !== b.get(LENGTH.swimStroke)) b.set(LENGTH.swimStroke, STROKE_MIXED);
  const start = a.get(LENGTH.startTime);
  if (start !== undefined) b.set(LENGTH.startTime, start);
  b.set(LENGTH.totalElapsedTime, (a.get(LENGTH.totalElapsedTime) ?? 0) + (b.get(LENGTH.totalElapsedTime) ?? 0));
  b.set(LENGTH.totalTimerTime, timer);
  b.set(LENGTH.totalStrokes, strokes);
  if (timer > 0) b.set(LENGTH.avgSwimmingCadence, Math.round(strokes / (timer / 60000)));
  a.removed = true;

  const rest = lengthsOf(f);
  rest.forEach((l, n) => l.set(LENGTH.messageIndex, n));
  laps.forEach((lap, k) => {
    const first = lap.get(LAP.firstLengthIndex);
    if (first !== undefined && first > i) lap.set(LAP.firstLengthIndex, first - 1);
    if (k === lapIdx) lap.set(LAP.numLengths, (lap.get(LAP.numLengths) ?? 1) - 1);
  });

  recompute(f, new Set([lapIdx]));
  return f;
}

/** Turn active length i into an idle (rest) length. */
export function markRest(file: FitFile, i: number): FitFile {
  const f = file.clone();
  const lengths = lengthsOf(f);
  const l = requireActive(lengths[i], i);
  const lapIdx = lapIndexOfLength(f.messages(MSG.lap), i);
  l.set(LENGTH.lengthType, LENGTH_IDLE);
  for (const fld of [LENGTH.totalStrokes, LENGTH.avgSpeed, LENGTH.swimStroke, LENGTH.avgSwimmingCadence]) l.setInvalid(fld);
  recompute(f, new Set([lapIdx]));
  return f;
}

export function setStroke(file: FitFile, i: number, stroke: number): FitFile {
  const f = file.clone();
  const l = requireActive(lengthsOf(f)[i], i);
  const lapIdx = lapIndexOfLength(f.messages(MSG.lap), i);
  l.set(LENGTH.swimStroke, stroke);
  recompute(f, new Set([lapIdx]));
  return f;
}

interface Stats {
  count: number;
  strokes: number;
  activeMs: number;
  activeS: number;
  maxSpeed: number;
  stroke: number;
}

function stats(act: DataRecord[]): Stats {
  const strokes = act.reduce((s, l) => s + (l.get(LENGTH.totalStrokes) ?? 0), 0);
  const activeMs = act.reduce((s, l) => s + (l.get(LENGTH.totalTimerTime) ?? 0), 0);
  const kinds = new Set(act.map((l) => l.get(LENGTH.swimStroke)));
  return {
    count: act.length,
    strokes,
    activeMs,
    activeS: activeMs / 1000,
    maxSpeed: Math.max(0, ...act.map((l) => l.get(LENGTH.avgSpeed) ?? 0)),
    stroke: kinds.size === 1 ? [...kinds][0] ?? STROKE_MIXED : STROKE_MIXED,
  };
}

/** Set a field only if present; speed fields only if currently valid. */
function put(r: DataRecord, field: number, v: number, onlyIfValid = false): void {
  if (onlyIfValid && r.get(field) === undefined) return;
  r.set(field, v);
}

function recompute(f: FitFile, affectedLaps: Set<number>): void {
  const pool = poolLengthM(f);
  const lengths = lengthsOf(f);
  const laps = f.messages(MSG.lap);

  for (const l of lengths) {
    const t = l.get(LENGTH.totalTimerTime);
    if (l.get(LENGTH.lengthType) === LENGTH_ACTIVE && t) l.set(LENGTH.avgSpeed, Math.round((pool / (t / 1000)) * 1000));
  }

  for (const k of affectedLaps) {
    const lap = laps[k];
    if (!lap) continue;
    const first = lap.get(LAP.firstLengthIndex) ?? 0;
    const num = lap.get(LAP.numLengths) ?? 0;
    const act = lengths.slice(first, first + num).filter((l) => l.get(LENGTH.lengthType) === LENGTH_ACTIVE);
    applyStats(lap, stats(act), pool, {
      count: LAP.numActiveLengths,
      dist: LAP.totalDistance,
      strokes: LAP.totalCycles,
      activeTime: LAP.activeTime,
      spl: LAP.avgStrokesPerLength,
      swolf: LAP.avgSwolf,
      cadence: LAP.avgCadence,
      speeds: [LAP.enhancedAvgSpeed, LAP.enhancedMaxSpeed, LAP.avgSpeed, LAP.maxSpeed],
      stroke: LAP.swimStroke,
    });
  }

  const sess = f.messages(MSG.session);
  const all = stats(lengths.filter((l) => l.get(LENGTH.lengthType) === LENGTH_ACTIVE));
  for (const s of sess) {
    applyStats(s, all, pool, {
      count: SESSION.numActiveLengths,
      dist: SESSION.totalDistance,
      strokes: SESSION.totalCycles,
      activeTime: SESSION.activeTime,
      spl: SESSION.avgStrokesPerLength,
      swolf: SESSION.avgSwolf,
      cadence: SESSION.avgCadence,
      speeds: [SESSION.enhancedAvgSpeed, SESSION.enhancedMaxSpeed, SESSION.avgSpeed, SESSION.maxSpeed],
    });
    s.set(SESSION.numLengths, all.count);
  }
}

interface FieldMap {
  count: number;
  dist: number;
  strokes: number;
  activeTime: number;
  spl: number;
  swolf: number;
  cadence: number;
  /** enhanced avg, enhanced max, avg, max (the 16-bit ones only if currently valid) */
  speeds: [number, number, number, number];
  stroke?: number;
}

function applyStats(r: DataRecord, s: Stats, pool: number, m: FieldMap): void {
  const n = s.count;
  const dist = pool * n;
  put(r, m.count, n);
  put(r, m.dist, Math.round(dist * 100));
  put(r, m.strokes, s.strokes);
  put(r, m.activeTime, s.activeMs);
  if (n === 0) {
    for (const fld of [m.spl, m.swolf, m.cadence]) put(r, fld, 0);
    for (const fld of m.speeds) put(r, fld, 0, true);
    return;
  }
  put(r, m.spl, Math.round((s.strokes / n) * 10));
  put(r, m.swolf, Math.round(s.activeS / n + s.strokes / n));
  put(r, m.cadence, s.activeS > 0 ? Math.round(s.strokes / (s.activeS / 60)) : 0);
  const avg = s.activeS > 0 ? Math.round((dist / s.activeS) * 1000) : 0;
  put(r, m.speeds[0], avg, true);
  put(r, m.speeds[1], s.maxSpeed, true);
  put(r, m.speeds[2], avg, true);
  put(r, m.speeds[3], s.maxSpeed, true);
  if (m.stroke !== undefined) put(r, m.stroke, s.stroke);
}
