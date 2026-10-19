/** Seconds between Unix epoch and FIT epoch (1989-12-31 00:00 UTC). */
export const FIT_EPOCH_OFFSET = 631065600;

export const MSG = { session: 18, lap: 19, record: 20, length: 101 } as const;

export const RECORD = { timestamp: 253, heartRate: 3 } as const;

export const LENGTH = {
  timestamp: 253,
  startTime: 2,
  totalElapsedTime: 3,
  totalTimerTime: 4,
  totalStrokes: 5,
  avgSpeed: 6,
  swimStroke: 7,
  avgSwimmingCadence: 9,
  lengthType: 12,
  messageIndex: 254,
} as const;

export const LAP = {
  messageIndex: 254,
  startTime: 2,
  sport: 25,
  totalElapsedTime: 7,
  totalTimerTime: 8,
  totalDistance: 9,
  totalCycles: 10,
  avgSpeed: 13,
  maxSpeed: 14,
  avgCadence: 17,
  numLengths: 32,
  firstLengthIndex: 35,
  swimStroke: 38,
  numActiveLengths: 40,
  activeTime: 70,
  avgSwolf: 73,
  avgStrokesPerLength: 90,
  enhancedAvgSpeed: 110,
  enhancedMaxSpeed: 111,
} as const;

export const SESSION = {
  startTime: 2,
  sport: 5,
  totalDistance: 9,
  totalCycles: 10,
  avgSpeed: 14,
  maxSpeed: 15,
  avgCadence: 18,
  numLengths: 33,
  poolLength: 44,
  poolLengthUnit: 46,
  numActiveLengths: 47,
  activeTime: 78,
  avgStrokesPerLength: 79,
  avgSwolf: 80,
  enhancedAvgSpeed: 124,
  enhancedMaxSpeed: 125,
} as const;

export const LENGTH_IDLE = 0;
export const LENGTH_ACTIVE = 1;

export const STROKE_MIXED = 5;

export const STROKE_NAMES: Record<number, string> = {
  0: 'Kraul',
  1: 'Rücken',
  2: 'Brust',
  3: 'Schmetterling',
  4: 'Drill',
  5: 'Gemischt',
};

export function strokeName(s: number | undefined): string {
  return s === undefined ? '–' : (STROKE_NAMES[s] ?? `Stil ${s}`);
}
