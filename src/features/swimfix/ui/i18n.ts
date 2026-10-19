export type Language = 'en' | 'de';

type Values = Record<string, string | number>;

const copy = {
  en: {
    brandNote: 'Fix pool swimming',
    local: 'Local in your browser',
    privacy: 'SwimFix processes your activity entirely on this device.',
    cloud: 'No sign-in · No cloud',
    uploadTitle: 'Drop your FIT file here',
    uploadHelp: 'or choose it from your device',
    chooseFile: 'Choose file',
    fileHint: 'Pool swimming activities in .fit format are supported.',
    otherFile: 'Choose another FIT file',
    replace: 'Replace',
    selectFile: 'Select or drop a FIT file',
    guide: 'How it works',
    guideTitle: 'Your clean file in three steps',
    step1: 'Choose FIT file',
    step1Copy: 'Drop the pool swimming activity here or choose it from your device.',
    step2: 'Review suggestions',
    step2Copy: 'Adjust lengths, rests and stroke type whenever needed.',
    step3: 'Download FIT file',
    step3Copy: 'Save the corrected copy as a new file on your device.',
    introEyebrow: 'SwimFix · Clean up FIT files',
    introTitle: 'Your swim session, accurately recorded.',
    introCopy: 'Correct misdetected lengths and rests directly on your device. Your file is never uploaded.',
    activityEyebrow: 'SwimFix · Review activity',
    activityTitle: 'Correct swim session',
    activityCopy: 'Review detected lengths and save a corrected FIT file afterwards.',
    changes: '{count} {count, plural, one {change} other {changes}} made',
    download: 'Download FIT file',
    undo: 'Undo',
    reset: 'Reset',
    steps: 'Editing progress',
    load: 'Load file',
    review: 'Review & correct',
    summary: 'Summary',
    date: 'Date',
    poolLength: 'Pool length',
    distance: 'Distance',
    activeLengths: 'Active lengths',
    swimTime: 'Swim time',
    before: 'Before {value}',
    automaticReview: 'Automatic review',
    suggestions: 'Suggestions',
    workload: 'Workload',
    heartRate: 'Heart rate',
    hrLegend: 'Heart rate',
    activeLegend: 'Active lengths',
    noSuggestions: 'No outstanding suggestions.',
    stillReview: 'You can still review the lengths manually.',
    applyAll: 'Apply all suggested corrections',
    apply: 'Apply',
    ignore: 'Ignore',
    showTable: 'Show in table',
    confidence: 'Confidence: {value}',
    mergeTitle: 'Merge {first} and {second}',
    restTitle: 'Mark {length} as rest',
    flagTitle: 'Review {length}',
    details: 'Edit details',
    intervals: 'Intervals and lengths',
    selected: '{count} active {count, plural, one {length} other {lengths}} selected',
    noneSelected: 'No active length selected',
    selectionHelp: 'To merge, select two adjacent active lengths in the same interval.',
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
    flag: 'Review',
    mergeFlag: 'Merge?',
    restFlag: 'Rest?',
    noHeartRate: 'No heart-rate data is available for this activity.',
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
    readError: 'The file could not be read: {error}',
    unknownError: 'The file could not be read: {error}',
    high: 'high',
    medium: 'medium',
    low: 'low',
    freestyle: 'Freestyle',
    backstroke: 'Backstroke',
    breaststroke: 'Breaststroke',
    butterfly: 'Butterfly',
    drill: 'Drill',
    mixed: 'Mixed',
    unknownStroke: 'Stroke {value}',
  },
  de: {
    brandNote: 'Pool-Schwimmen korrigieren', local: 'Lokal im Browser', privacy: 'SwimFix verarbeitet deine Aktivität ausschließlich lokal.', cloud: 'Keine Anmeldung · Keine Cloud',
    uploadTitle: 'FIT-Datei hier ablegen', uploadHelp: 'oder wähle sie von deinem Gerät aus', chooseFile: 'Datei auswählen', fileHint: 'Unterstützt werden Pool-Schwimmaktivitäten im .fit-Format.', otherFile: 'Andere FIT-Datei auswählen', replace: 'Ersetzen', selectFile: 'FIT-Datei auswählen oder hier ablegen',
    guide: 'So funktioniert’s', guideTitle: 'In drei Schritten zur bereinigten Datei', step1: 'FIT-Datei auswählen', step1Copy: 'Ziehe die Pool-Schwimmaktivität hierher oder wähle sie aus.', step2: 'Vorschläge prüfen', step2Copy: 'Passe Bahnen, Pausen und Schwimmstil bei Bedarf an.', step3: 'FIT-Datei laden', step3Copy: 'Speichere die korrigierte Kopie als neue Datei auf deinem Gerät.',
    introEyebrow: 'SwimFix · FIT-Dateien aufräumen', introTitle: 'Deine Schwimmeinheit, sauber erfasst.', introCopy: 'Korrigiere falsch erkannte Bahnen und Pausen direkt auf deinem Gerät. Deine Datei wird nie hochgeladen.',
    activityEyebrow: 'SwimFix · Aktivität prüfen', activityTitle: 'Schwimmeinheit korrigieren', activityCopy: 'Prüfe die erkannten Bahnen und speichere anschließend eine bereinigte FIT-Datei.', changes: '{count} {count, plural, one {Änderung} other {Änderungen}} vorgenommen',
    download: 'FIT-Datei herunterladen', undo: 'Rückgängig', reset: 'Zurücksetzen', steps: 'Bearbeitungsfortschritt', load: 'Datei laden', review: 'Prüfen & korrigieren', summary: 'Zusammenfassung', date: 'Datum', poolLength: 'Bahnlänge', distance: 'Distanz', activeLengths: 'Aktive Längen', swimTime: 'Schwimmzeit', before: 'Vorher {value}',
    automaticReview: 'Automatische Prüfung', suggestions: 'Vorschläge', workload: 'Belastung', heartRate: 'Herzfrequenz', hrLegend: 'Herzfrequenz', activeLegend: 'Aktive Bahnen', noSuggestions: 'Keine offenen Vorschläge.', stillReview: 'Du kannst die Bahnen weiterhin manuell prüfen.', applyAll: 'Alle Korrekturvorschläge übernehmen', apply: 'Übernehmen', ignore: 'Ignorieren', showTable: 'In Tabelle zeigen', confidence: 'Sicherheit: {value}', mergeTitle: '{first} und {second} zusammenlegen', restTitle: '{length} als Pause markieren', flagTitle: '{length} prüfen',
    details: 'Details bearbeiten', intervals: 'Intervalle und Längen', selected: '{count} aktive {count, plural, one {Länge} other {Längen}} ausgewählt', noneSelected: 'Keine aktive Länge ausgewählt', selectionHelp: 'Zum Zusammenlegen zwei benachbarte aktive Längen im selben Intervall auswählen.', merge: 'Zusammenlegen', markRest: 'Als Pause markieren', setStroke: 'Stil setzen…', tableCaption: 'Erkannte Schwimmintervalle und Längen', select: 'Auswahl', number: 'Nr.', stroke: 'Stil', time: 'Zeit', strokes: 'Züge', pulse: 'Puls', note: 'Hinweis', rest: 'Pause', interval: 'Intervall {number} · {distance} · {time} · {count} {count, plural, one {Länge} other {Längen}}', flag: 'Prüfen', mergeFlag: 'Zusammenlegen?', restFlag: 'Pause?',
    noHeartRate: 'Für diese Aktivität sind keine Herzfrequenzdaten vorhanden.', minute: 'min', chartLabel: 'Herzfrequenz über die Aktivität', loaded: 'Datei geladen. Prüfe nun die vorgeschlagenen Korrekturen.', updated: 'Änderung übernommen.', suggestionApplied: 'Vorschlag übernommen.', suggestionsApplied: 'Vorschläge übernommen.', suggestionIgnored: 'Vorschlag ignoriert.', merged: 'Längen zusammengelegt.', restMarked: 'Ausgewählte Längen als Pause markiert.', undone: 'Letzte Änderung rückgängig gemacht.', resetDone: 'Alle Änderungen wurden zurückgesetzt.', strokeUpdated: 'Schwimmstil aktualisiert.', downloadStarted: 'Download der FIT-Datei gestartet.', readError: 'Die Datei konnte nicht gelesen werden: {error}', unknownError: 'Die Datei konnte nicht gelesen werden: {error}',
    high: 'hoch', medium: 'mittel', low: 'niedrig', freestyle: 'Kraul', backstroke: 'Rücken', breaststroke: 'Brust', butterfly: 'Schmetterling', drill: 'Drill', mixed: 'Gemischt', unknownStroke: 'Stil {value}',
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
