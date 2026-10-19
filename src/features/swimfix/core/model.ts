import { DataRecord, FitFile } from './fitfile';
import { FIT_EPOCH_OFFSET, LAP, LENGTH, LENGTH_ACTIVE, MSG, RECORD, SESSION } from './profile';

export class NotSwimError extends Error {}

export interface HrSample {
  /** FIT timestamp (seconds since 1989-12-31) */
  ts: number;
  hr: number;
}

export interface LengthInfo {
  index: number;
  lapIndex: number;
  /** interval number (1-based) if the length belongs to an interval, else undefined */
  interval?: number;
  /** 1-based position inside the interval/lap (for labels such as "5.2") */
  position: number;
  active: boolean;
  stroke?: number;
  start: number;
  seconds: number;
  strokes?: number;
  hrStart?: number;
  hrEnd?: number;
  hrMin?: number;
  hrMax?: number;
}

export interface IntervalRow {
  kind: 'interval';
  number: number;
  lapIndex: number;
  distanceM: number;
  seconds: number;
  lengthIndices: number[];
  activeCount: number;
}

export interface RestRow {
  kind: 'rest';
  lapIndex: number;
  seconds: number;
  lengthIndices: number[];
}

export interface Summary {
  startDate: Date;
  poolLengthM: number;
  poolUnitYards: boolean;
  distanceM: number;
  activeLengths: number;
  swimTimeS: number;
  swolf?: number;
  strokes: number;
}

export interface Model {
  summary: Summary;
  rows: (IntervalRow | RestRow)[];
  lengths: LengthInfo[];
  hr: HrSample[];
  /** FIT timestamps of the start and end of the activity */
  tStart: number;
  tEnd: number;
}

export function poolLengthM(file: FitFile): number {
  const s = file.messages(MSG.session)[0];
  const p = s?.get(SESSION.poolLength);
  return p ? p / 100 : 50;
}

/** Lap that owns length j: the last lap whose first_length_index <= j. */
export function lapIndexOfLength(laps: DataRecord[], j: number): number {
  let best = -1;
  let bestFirst = -1;
  laps.forEach((lap, k) => {
    const f = lap.get(LAP.firstLengthIndex);
    if (f !== undefined && f <= j && f >= bestFirst) {
      best = k;
      bestFirst = f;
    }
  });
  return best;
}

export function fitToDate(ts: number): Date {
  return new Date((ts + FIT_EPOCH_OFFSET) * 1000);
}

export function buildModel(file: FitFile): Model {
  const lengthMsgs = file.messages(MSG.length);
  const sessions = file.messages(MSG.session);
  if (lengthMsgs.length === 0 || sessions.length === 0) {
    throw new NotSwimError('Diese Datei enthält keine Pool-Schwimm-Längen – es ist keine Pool-Schwimmaktivität.');
  }
  const laps = file.messages(MSG.lap);
  const session = sessions[0];

  const hr: HrSample[] = [];
  for (const r of file.messages(MSG.record)) {
    const ts = r.get(RECORD.timestamp);
    const h = r.get(RECORD.heartRate);
    if (ts !== undefined && h !== undefined) hr.push({ ts, hr: h });
  }

  const lengths: LengthInfo[] = lengthMsgs.map((m, index) => {
    const start = m.get(LENGTH.startTime) ?? m.get(LENGTH.timestamp) ?? 0;
    const seconds = (m.get(LENGTH.totalTimerTime) ?? 0) / 1000;
    const vals = hr.filter((s) => s.ts >= start && s.ts < start + seconds).map((s) => s.hr);
    return {
      index,
      lapIndex: lapIndexOfLength(laps, index),
      position: 0,
      active: m.get(LENGTH.lengthType) === LENGTH_ACTIVE,
      stroke: m.get(LENGTH.swimStroke),
      start,
      seconds,
      strokes: m.get(LENGTH.totalStrokes),
      hrStart: vals[0],
      hrEnd: vals[vals.length - 1],
      hrMin: vals.length ? Math.min(...vals) : undefined,
      hrMax: vals.length ? Math.max(...vals) : undefined,
    };
  });

  const rows: (IntervalRow | RestRow)[] = [];
  let n = 0;
  laps.forEach((lap, k) => {
    const idx = lengths.filter((l) => l.lapIndex === k).map((l) => l.index);
    const dist = (lap.get(LAP.totalDistance) ?? 0) / 100;
    const secs = (lap.get(LAP.totalTimerTime) ?? 0) / 1000;
    if (dist > 0) {
      n++;
      rows.push({
        kind: 'interval',
        number: n,
        lapIndex: k,
        distanceM: dist,
        seconds: secs,
        lengthIndices: idx,
        activeCount: idx.filter((i) => lengths[i].active).length,
      });
      idx.forEach((i, p) => {
        lengths[i].interval = n;
        lengths[i].position = p + 1;
      });
    } else {
      rows.push({ kind: 'rest', lapIndex: k, seconds: secs, lengthIndices: idx });
      idx.forEach((i, p) => (lengths[i].position = p + 1));
    }
  });

  const active = lengths.filter((l) => l.active);
  const startTs = session.get(SESSION.startTime) ?? lengths[0].start;
  const poolM = poolLengthM(file);
  const summary: Summary = {
    startDate: fitToDate(startTs),
    poolLengthM: poolM,
    poolUnitYards: session.get(SESSION.poolLengthUnit) === 1,
    distanceM: (session.get(SESSION.totalDistance) ?? poolM * active.length * 100) / 100,
    activeLengths: session.get(SESSION.numActiveLengths) ?? active.length,
    swimTimeS: (session.get(SESSION.activeTime) ?? active.reduce((a, l) => a + l.seconds * 1000, 0)) / 1000,
    swolf: session.get(SESSION.avgSwolf),
    strokes: session.get(SESSION.totalCycles) ?? active.reduce((a, l) => a + (l.strokes ?? 0), 0),
  };

  const last = lengths[lengths.length - 1];
  return {
    summary,
    rows,
    lengths,
    hr,
    tStart: Math.min(startTs, lengths[0].start, hr[0]?.ts ?? Infinity),
    tEnd: Math.max(last.start + last.seconds, hr[hr.length - 1]?.ts ?? 0),
  };
}
