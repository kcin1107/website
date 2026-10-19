export type Language = 'en' | 'de';

type Values = Record<string, string | number>;

const copy = {
  en: {
    uploadTitle: 'Drop your FIT file here',
    chooseFile: 'Choose file',
    fileHint: 'Pool swimming activities in .fit format. Your file never leaves this device.',
    selectFile: 'Select or drop a FIT file',
    file: 'Loaded file',
    pool: '{length} pool',
    replace: 'Replace file',
    changes: '{count} {count, plural, one {change} other {changes}}',
    noChanges: 'No changes yet',
    download: 'Download',
    undo: 'Undo',
    reset: 'Reset',
    summary: 'Summary',
    distance: 'Distance',
    activeLengths: 'Active lengths',
    swimTime: 'Swim time',
    before: 'was {value}',
    suggestions: 'Suggestions',
    heartRate: 'Heart rate',
    hrLegend: 'Heart rate',
    activeLegend: 'Active lengths',
    noSuggestions: 'Nothing looks off.',
    stillReview: 'You can still edit lengths below.',
    applyAll: 'Apply all',
    apply: 'Apply',
    ignore: 'Ignore',
    showTable: 'Show',
    mergeTitle: 'Merge {first} and {second}',
    restTitle: 'Mark {length} as rest',
    flagTitle: 'Check {length}',
    lengths: 'Lengths',
    selected: '{count} {count, plural, one {length} other {lengths}} selected',
    selectionHelp: 'Select lengths to edit them. To merge, pick two neighbours in the same interval.',
    merge: 'Merge',
    markRest: 'Mark as rest',
    setStroke: 'Set stroke…',
    tableCaption: 'Detected swim intervals and lengths',
    select: 'Select',
    number: 'No.',
    stroke: 'Stroke',
    time: 'Time',
    strokes: 'Strokes',
    pulse: 'Heart rate',
    note: 'Note',
    rest: 'Rest',
    interval: 'Interval {number} · {distance} · {time} · {count} {count, plural, one {length} other {lengths}}',
    flag: 'Check',
    mergeFlag: 'Merge?',
    restFlag: 'Rest?',
    chartLabel: 'Heart rate across the activity',
    minute: 'min',
    loaded: 'File loaded. Review the suggested corrections now.',
    updated: 'Change applied.',
    suggestionApplied: 'Suggestion applied.',
    suggestionsApplied: 'Suggestions applied.',
    suggestionIgnored: 'Suggestion ignored.',
    merged: 'Lengths merged.',
    restMarked: 'Selected lengths marked as rest.',
    undone: 'Last change undone.',
    resetDone: 'All changes reset.',
    strokeUpdated: 'Stroke updated.',
    downloadStarted: 'FIT file download started.',
    freestyle: 'Freestyle',
    backstroke: 'Backstroke',
    breaststroke: 'Breaststroke',
    butterfly: 'Butterfly',
    drill: 'Drill',
    mixed: 'Mixed',
    unknownStroke: 'Stroke {value}',
  },
  de: {
    uploadTitle: 'FIT-Datei hier ablegen', chooseFile: 'Datei auswählen', fileHint: 'Pool-Schwimmaktivitäten im .fit-Format. Deine Datei verlässt dieses Gerät nicht.', selectFile: 'FIT-Datei auswählen oder hier ablegen',
    file: 'Geladene Datei', pool: '{length}-Becken', replace: 'Andere Datei', changes: '{count} {count, plural, one {Änderung} other {Änderungen}}', noChanges: 'Noch keine Änderungen',
    download: 'Herunterladen', undo: 'Rückgängig', reset: 'Zurücksetzen', summary: 'Zusammenfassung', distance: 'Distanz', activeLengths: 'Aktive Längen', swimTime: 'Schwimmzeit', before: 'vorher {value}',
    suggestions: 'Vorschläge', heartRate: 'Herzfrequenz', hrLegend: 'Herzfrequenz', activeLegend: 'Aktive Bahnen', noSuggestions: 'Keine Auffälligkeiten.', stillReview: 'Du kannst die Längen unten trotzdem bearbeiten.', applyAll: 'Alle übernehmen', apply: 'Übernehmen', ignore: 'Ignorieren', showTable: 'Zeigen', mergeTitle: '{first} und {second} zusammenlegen', restTitle: '{length} als Pause markieren', flagTitle: '{length} prüfen',
    lengths: 'Längen', selected: '{count} {count, plural, one {Länge} other {Längen}} ausgewählt', selectionHelp: 'Wähle Längen aus, um sie zu bearbeiten. Zum Zusammenlegen zwei benachbarte im selben Intervall.', merge: 'Zusammenlegen', markRest: 'Als Pause markieren', setStroke: 'Stil setzen…', tableCaption: 'Erkannte Schwimmintervalle und Längen', select: 'Auswahl', number: 'Nr.', stroke: 'Stil', time: 'Zeit', strokes: 'Züge', pulse: 'Puls', note: 'Hinweis', rest: 'Pause', interval: 'Intervall {number} · {distance} · {time} · {count} {count, plural, one {Länge} other {Längen}}', flag: 'Prüfen', mergeFlag: 'Zusammenlegen?', restFlag: 'Pause?',
    minute: 'min', chartLabel: 'Herzfrequenz über die Aktivität', loaded: 'Datei geladen. Prüfe nun die vorgeschlagenen Korrekturen.', updated: 'Änderung übernommen.', suggestionApplied: 'Vorschlag übernommen.', suggestionsApplied: 'Vorschläge übernommen.', suggestionIgnored: 'Vorschlag ignoriert.', merged: 'Längen zusammengelegt.', restMarked: 'Ausgewählte Längen als Pause markiert.', undone: 'Letzte Änderung rückgängig gemacht.', resetDone: 'Alle Änderungen wurden zurückgesetzt.', strokeUpdated: 'Schwimmstil aktualisiert.', downloadStarted: 'Download der FIT-Datei gestartet.',
    freestyle: 'Kraul', backstroke: 'Rücken', breaststroke: 'Brust', butterfly: 'Schmetterling', drill: 'Drill', mixed: 'Gemischt', unknownStroke: 'Stil {value}',
  },
} as const;

export type CopyKey = keyof typeof copy.en;
export type MessageId = 'loaded' | 'updated' | 'suggestionApplied' | 'suggestionsApplied' | 'suggestionIgnored' | 'merged' | 'restMarked' | 'undone' | 'resetDone' | 'strokeUpdated' | 'downloadStarted';

export function languageOf(value: string | undefined): Language {
  return value === 'de' ? 'de' : 'en';
}

export function text(language: Language, key: CopyKey, values: Values = {}): string {
  const value = copy[language][key] as string;
  return value.replace(/\{(\w+)(?:, plural, one \{([^}]*)\} other \{([^}]*)\})?\}/g, (_, name: string, one?: string, other?: string) => {
    const replacement = String(values[name] ?? '');
    return one ? (Number(values[name]) === 1 ? one : other!).replace('#', replacement) : replacement;
  });
}

export function strokeLabel(language: Language, stroke: number | undefined): string {
  if (stroke === undefined) return '–';
  const keys: Record<number, CopyKey> = { 0: 'freestyle', 1: 'backstroke', 2: 'breaststroke', 3: 'butterfly', 4: 'drill', 5: 'mixed' };
  return keys[stroke] ? text(language, keys[stroke]) : text(language, 'unknownStroke', { value: stroke });
}

function localizeRawStroke(language: Language, value: string): string {
  if (value === '–') return value;
  const known = ['Kraul', 'Rücken', 'Brust', 'Schmetterling', 'Drill', 'Gemischt'];
  const index = known.indexOf(value);
  if (index >= 0) return strokeLabel(language, index);
  const unknown = value.match(/^Stil (\d+)$/);
  return unknown ? strokeLabel(language, Number(unknown[1])) : value;
}

export function localizeReason(language: Language, reason: string): string {
  if (language === 'de') return reason;
  const withHeartRate = reason.endsWith('; Puls steigt durchgehend');
  const detail = withHeartRate ? reason.slice(0, -'; Puls steigt durchgehend'.length) : reason;
  const numeric = (value: string) => value.replace(/(\d),(\d)/g, '$1.$2').replace(' Züge', ' strokes');
  const merge = detail.match(/^Bahn fälschlich geteilt: (.+)$/);
  if (merge) return `Length was split incorrectly: ${numeric(merge[1])}${withHeartRate ? '; heart rate rises continuously' : ''}`;
  const change = detail.match(/^Lagenwechsel auf der Bahn \((.+) → (.+)\): (.+)$/);
  if (change) return `Stroke change within length (${localizeRawStroke(language, change[1])} → ${localizeRawStroke(language, change[2])}): ${numeric(change[3])}${withHeartRate ? '; heart rate rises continuously' : ''}`;
  const rest = reason.match(/^nur (\d+) Züge in (\d+) s, Puls fällt (.+) – vermutlich Pause am Beckenrand$/);
  if (rest) return `only ${rest[1]} strokes in ${rest[2]} s, heart rate drops ${rest[3]} – likely a rest at the pool edge`;
  const flag = reason.match(/^ungewöhnlich kurz \((.+) s, (\d+) Züge\) – bitte prüfen$/);
  if (flag) return `unusually short (${flag[1].replace(',', '.')} s, ${flag[2]} strokes) – please review`;
  return reason;
}

export function localizeError(language: Language, error: string): string {
  if (language === 'de') return error;
  const exact: Record<string, string> = {
    'Datei zu klein – keine FIT-Datei.': 'File is too small to be a FIT file.',
    'Keine FIT-Datei (ungültiger Header).': 'Not a FIT file (invalid header).',
    'Keine FIT-Datei (Kennung ".FIT" fehlt).': 'Not a FIT file (missing ".FIT" signature).',
    'FIT-Datei ist abgeschnitten.': 'FIT file is truncated.',
    'Verkettete FIT-Dateien werden nicht unterstützt.': 'Concatenated FIT files are not supported.',
    'FIT-Prüfsumme (CRC) stimmt nicht – Datei beschädigt.': 'FIT checksum (CRC) does not match — file is damaged.',
    'Komprimierte Zeitstempel (Compressed Timestamp Header) werden nicht unterstützt.': 'Compressed timestamp headers are not supported.',
    'Diese Datei enthält keine Pool-Schwimm-Längen – es ist keine Pool-Schwimmaktivität.': 'This file contains no pool-swim lengths — it is not a pool swimming activity.',
    'Die Längen gehören nicht zum selben Intervall.': 'The lengths do not belong to the same interval.',
  };
  if (exact[error]) return exact[error];
  const missing = error.match(/^Länge (\d+) existiert nicht\.$/);
  if (missing) return `Length ${missing[1]} does not exist.`;
  const inactive = error.match(/^Länge (\d+) ist keine aktive Länge\.$/);
  if (inactive) return `Length ${inactive[1]} is not active.`;
  const unknownDefinition = error.match(/^Datensatz mit unbekannter Definition \(lokal (\d+)\)\.$/);
  if (unknownDefinition) return `Record has an unknown definition (local ${unknownDefinition[1]}).`;
  const fieldSet = error.match(/^Feld (\d+) \(Typ (0x[\da-f]+), (\d+) Byte\) kann nicht gesetzt werden$/);
  if (fieldSet) return `Field ${fieldSet[1]} (type ${fieldSet[2]}, ${fieldSet[3]} byte) cannot be set.`;
  const notInteger = error.match(/^Feld (\d+): (.+) ist keine ganze Zahl$/);
  if (notInteger) return `Field ${notInteger[1]}: ${notInteger[2]} is not an integer.`;
  const range = error.match(/^Feld (\d+): (.+) außerhalb des Wertebereichs$/);
  if (range) return `Field ${range[1]}: ${range[2]} is outside the valid range.`;
  const invalid = error.match(/^Feld (\d+) kann nicht ungültig gesetzt werden$/);
  if (invalid) return `Field ${invalid[1]} cannot be marked invalid.`;
  return error;
}
