import { analyze, applySuggestions, type Suggestion } from '../core/analyze';
import { markRest, mergeLengths, setStroke } from '../core/edit';
import { FitError, FitFile } from '../core/fitfile';
import { buildModel, NotSwimError, type Model } from '../core/model';
import { STROKE_NAMES } from '../core/profile';
import { languageOf, localizeError, localizeReason, strokeLabel, text, type Language, type MessageId } from './i18n';

interface State {
  name: string;
  original: FitFile;
  originalModel: Model;
  stack: FitFile[];
  ignored: Set<string>;
  selected: Set<number>;
  hover?: number;
}

let state: State | undefined;
let error = '';
let status: MessageId | undefined;
let announcedStatus = '';

const root = document.getElementById('swimfix-app');
if (!root) throw new Error('SwimFix needs an element with the ID "swimfix-app".');
const app: HTMLElement = root;
let language: Language = languageOf(app.dataset.language);
app.lang = language;
const liveNode = document.createElement('p');
liveNode.className = 'visually-hidden';
liveNode.setAttribute('aria-live', 'polite');
liveNode.setAttribute('aria-atomic', 'true');
app.after(liveNode);

const esc = (s: string | number): string =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const t = (key: Parameters<typeof text>[1], values?: Record<string, string | number>): string => text(language, key, values);
const locale = (): string => (language === 'de' ? 'de-DE' : 'en-US');
const number = (n: number, digits = 1): string =>
  n.toLocaleString(locale(), { minimumFractionDigits: digits, maximumFractionDigits: digits });
const current = (): FitFile => state!.stack.at(-1)!;
const dist = (m: number, yards: boolean): string => (yards ? `${number(m / 0.9144, 0)} yd` : `${number(m, 0)} m`);

function hms(seconds: number): string {
  const total = Math.round(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainder = total % 60;
  return hours
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
    : `${minutes}:${String(remainder).padStart(2, '0')}`;
}

function dur(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${(seconds % 60).toFixed(1).padStart(4, '0')}`;
}

function svg(icon: 'upload' | 'download' | 'check'): string {
  const paths = {
    upload: '<path d="M12 16V3m0 0-4 4m4-4 4 4M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/>',
    download: '<path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19v2h16v-2"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
  }[icon];
  return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}

function lengthLabel(model: Model, index: number): string {
  const length = model.lengths[index];
  if (!length) return String(index + 1);
  return length.interval === undefined ? `P.${length.position}` : `${length.interval}.${length.position}`;
}

function captureFocus(): string | undefined {
  return (document.activeElement as HTMLElement | null)?.dataset.focus;
}

function restoreFocus(key?: string): void {
  if (!key) return;
  requestAnimationFrame(() => app.querySelector<HTMLElement>(`[data-focus="${CSS.escape(key)}"]`)?.focus());
}

const fileInput = '<input type="file" id="file" accept=".fit" class="hidden">';
const errorHtml = (): string => (error ? `<p class="error" role="alert">${esc(localizeError(language, error))}</p>` : '');

function emptyHtml(): string {
  return `${errorHtml()}<section class="drop" id="drop" aria-label="${t('selectFile')}">
    ${svg('upload')}
    <h2>${t('uploadTitle')}</h2>
    <button type="button" class="primary" data-upload data-focus="upload">${t('chooseFile')}</button>
    <p>${t('fileHint')}</p>
    ${fileInput}
  </section>`;
}

function toolbarHtml(model: Model): string {
  const summary = model.summary;
  const unit = summary.poolUnitYards ? 'yd' : 'm';
  const pool = summary.poolUnitYards ? summary.poolLengthM / 0.9144 : summary.poolLengthM;
  const date = summary.startDate.toLocaleString(locale(), { dateStyle: 'medium', timeStyle: 'short' });
  const edits = state!.stack.length - 1;
  const canUndo = edits > 0;
  const canReset = canUndo || state!.ignored.size > 0;
  return `<section class="toolbar" id="drop" aria-label="${t('file')}">
    <div class="file-name"><b>${esc(state!.name)}</b><span>${esc(date)} · ${t('pool', { length: `${number(pool, 0)} ${unit}` })} · ${edits ? t('changes', { count: edits }) : t('noChanges')}</span></div>
    <div class="actions">
      <button type="button" class="link" data-upload data-focus="replace">${t('replace')}</button>
      <button type="button" class="link" data-act="undo" data-focus="undo" ${canUndo ? '' : 'disabled'}>${t('undo')}</button>
      <button type="button" class="link" data-act="reset" data-focus="reset" ${canReset ? '' : 'disabled'}>${t('reset')}</button>
      <button type="button" class="primary" data-act="download" data-focus="download">${svg('download')}${t('download')}</button>
    </div>
    ${fileInput}
  </section>`;
}

function statsHtml(model: Model): string {
  const original = state!.originalModel.summary;
  const summary = model.summary;
  const yards = summary.poolUnitYards;
  const stat = (label: string, value: string, before: string): string =>
    `<div><dt>${label}</dt><dd>${esc(value)}${value !== before ? `<small>${t('before', { value: esc(before) })}</small>` : ''}</dd></div>`;
  const swolf = (value?: number): string => (value === undefined ? '–' : String(value));
  return `<dl class="stats" aria-label="${t('summary')}">${[
    stat(t('distance'), dist(summary.distanceM, yards), dist(original.distanceM, yards)),
    stat(t('activeLengths'), String(summary.activeLengths), String(original.activeLengths)),
    stat(t('swimTime'), hms(summary.swimTimeS), hms(original.swimTimeS)),
    stat('SWOLF', swolf(summary.swolf), swolf(original.swolf)),
  ].join('')}</dl>`;
}

function suggestions(model: Model): Suggestion[] {
  return analyze(model).filter((suggestion) => !state!.ignored.has(suggestion.key));
}

function suggestionTitle(model: Model, suggestion: Suggestion): string {
  if (suggestion.kind === 'merge') return t('mergeTitle', { first: lengthLabel(model, suggestion.indices[0]), second: lengthLabel(model, suggestion.indices[1]) });
  return suggestion.kind === 'rest'
    ? t('restTitle', { length: lengthLabel(model, suggestion.indices[0]) })
    : t('flagTitle', { length: lengthLabel(model, suggestion.indices[0]) });
}

function suggestionsHtml(model: Model, items: Suggestion[]): string {
  const actionable = items.some((suggestion) => suggestion.kind !== 'flag');
  const head = `<div class="block-head"><h2>${t('suggestions')}${items.length ? ` <span class="count">${items.length}</span>` : ''}</h2>${actionable ? `<button type="button" class="primary" data-act="apply-all" data-focus="apply-all">${t('applyAll')}</button>` : ''}</div>`;
  if (!items.length) return `<section class="block">${head}<p class="ok">${svg('check')}<span><b>${t('noSuggestions')}</b> ${t('stillReview')}</span></p></section>`;
  const rows = items.map((suggestion) => {
    const action = suggestion.kind === 'flag'
      ? `<button type="button" data-act="jump" data-index="${suggestion.indices[0]}" data-focus="jump-${suggestion.indices[0]}">${t('showTable')}</button>`
      : `<button type="button" data-act="apply" data-key="${esc(suggestion.key)}" data-focus="apply-${esc(suggestion.key)}">${t('apply')}</button>`;
    return `<li class="sug" data-hover="${suggestion.indices[0]}">
      <div><h3>${esc(suggestionTitle(model, suggestion))}</h3><p>${esc(localizeReason(language, suggestion.reason))}</p></div>
      <div class="sug-actions">${action}<button type="button" class="link" data-act="ignore" data-key="${esc(suggestion.key)}" data-focus="ignore-${esc(suggestion.key)}">${t('ignore')}</button></div>
    </li>`;
  }).join('');
  return `<section class="block">${head}<ul class="sug-list">${rows}</ul></section>`;
}

function canMerge(model: Model): boolean {
  const indices = [...state!.selected].sort((a, b) => a - b);
  if (indices.length !== 2 || indices[1] !== indices[0] + 1) return false;
  const [first, second] = [model.lengths[indices[0]], model.lengths[indices[1]]];
  return first.active && second.active && first.lapIndex === second.lapIndex && first.lapIndex >= 0;
}

function tableHtml(model: Model, items: Suggestion[]): string {
  const flags = new Map<number, string>();
  for (const item of items) for (const index of item.indices) flags.set(index, item.kind === 'merge' ? t('mergeFlag') : item.kind === 'rest' ? t('restFlag') : t('flag'));
  const lengthRow = (index: number): string => {
    const length = model.lengths[index];
    const selected = state!.selected.has(index);
    const label = lengthLabel(model, index);
    const select = length.active
      ? `<input type="checkbox" data-sel="${index}" data-focus="select-${index}" ${selected ? 'checked' : ''} aria-label="${t('select')} ${esc(label)}">`
      : '';
    return `<tr id="length-${index}" class="len${length.active ? '' : ' idle'}${selected ? ' sel' : ''}" data-hover="${index}">
      <td>${select}</td><td>${label}</td><td>${length.active ? esc(strokeLabel(language, length.stroke)) : t('rest')}</td><td>${dur(length.seconds)}</td><td>${length.active ? length.strokes ?? '–' : '–'}</td><td>${length.hrStart === undefined ? '–' : `${length.hrStart}→${length.hrEnd}`}</td><td class="flag">${flags.get(index) ?? ''}</td>
    </tr>`;
  };
  const rows = model.rows.map((row) => row.kind === 'rest'
    ? `<tr class="rest"><td></td><td colspan="6">${t('rest')} · ${hms(row.seconds)}</td></tr>`
    : `<tr class="interval"><td colspan="7">${t('interval', { number: row.number, distance: dist(row.distanceM, model.summary.poolUnitYards), time: hms(row.seconds), count: row.activeCount })}</td></tr>${row.lengthIndices.map(lengthRow).join('')}`).join('');
  return `<div class="tablewrap"><table><caption class="visually-hidden">${t('tableCaption')}</caption><thead><tr><th scope="col"><span class="visually-hidden">${t('select')}</span></th><th scope="col">${t('number')}</th><th scope="col">${t('stroke')}</th><th scope="col">${t('time')}</th><th scope="col">${t('strokes')}</th><th scope="col">${t('pulse')}</th><th scope="col"><span class="visually-hidden">${t('note')}</span></th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

const CHART = { W: 800, H: 140, L: 30, R: 6, T: 6, B: 18 };

function chartX(model: Model): (value: number) => number {
  const span = Math.max(1, model.tEnd - model.tStart);
  return (value) => CHART.L + ((value - model.tStart) / span) * (CHART.W - CHART.L - CHART.R);
}

function chartHtml(model: Model): string {
  if (!model.hr.length) return '';
  const { W, H, T, B } = CHART;
  const x = chartX(model);
  const span = Math.max(1, model.tEnd - model.tStart);
  const values = model.hr.map((sample) => sample.hr);
  const low = Math.floor(Math.min(...values) / 10) * 10 - 5;
  const high = Math.ceil(Math.max(...values) / 10) * 10 + 5;
  const y = (value: number) => T + (1 - (value - low) / (high - low || 1)) * (H - T - B);
  const shades = model.lengths.filter((length) => length.active).map((length) => `<rect x="${x(length.start).toFixed(1)}" y="${T}" width="${Math.max(1, x(length.start + length.seconds) - x(length.start)).toFixed(1)}" height="${H - T - B}" fill="var(--shade)"/>`).join('');
  let times = '';
  const every = Math.floor(span / 60 / 5) * 5 || 5;
  for (let minute = 0; minute * 60 <= span; minute += every) times += `<text x="${x(model.tStart + minute * 60)}" y="${H - 4}">${minute} ${t('minute')}</text>`;
  const ticks = [low, high].map((value) => `<text x="0" y="${y(value) + 3}">${Math.round(value)}</text>`).join('');
  const points = model.hr.map((sample) => `${x(sample.ts).toFixed(1)},${y(sample.hr).toFixed(1)}`).join(' ');
  return `<section class="block chart-block">
    <div class="block-head"><h2>${t('heartRate')}</h2><span class="legend"><span><i class="line"></i>${t('hrLegend')}</span><span><i></i>${t('activeLegend')}</span></span></div>
    <svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${t('chartLabel')}">${shades}<g id="hl"></g>${ticks}${times}<polyline points="${points}" fill="none" stroke="var(--line)" stroke-width="1.3"/></svg>
  </section>`;
}

function lengthsHtml(model: Model, items: Suggestion[]): string {
  const active = selectedActive().length;
  const options = Object.keys(STROKE_NAMES).map((key) => `<option value="${key}">${esc(strokeLabel(language, Number(key)))}</option>`).join('');
  return `<section class="block">
    <div class="block-head"><h2>${t('lengths')}</h2></div>
    <div class="selection-bar">
      <p>${active ? `<b>${t('selected', { count: active })}</b>` : t('selectionHelp')}</p>
      <div class="selection-controls">
        <button type="button" data-act="merge" data-focus="merge" ${canMerge(model) ? '' : 'disabled'}>${t('merge')}</button>
        <button type="button" data-act="rest" data-focus="rest" ${active ? '' : 'disabled'}>${t('markRest')}</button>
        <select id="stroke" data-focus="stroke" ${active ? '' : 'disabled'} aria-label="${t('setStroke')}"><option value="">${t('setStroke')}</option>${options}</select>
      </div>
    </div>
    ${tableHtml(model, items)}
  </section>`;
}

function loadedHtml(): string {
  const model = buildModel(current());
  const items = suggestions(model);
  return `${toolbarHtml(model)}${errorHtml()}${statsHtml(model)}${suggestionsHtml(model, items)}${chartHtml(model)}${lengthsHtml(model, items)}`;
}

function render(): void {
  const key = captureFocus();
  app.innerHTML = state ? loadedHtml() : emptyHtml();
  if (status !== announcedStatus) {
    liveNode.textContent = status ? t(status) : '';
    announcedStatus = status ?? '';
  }
  bind();
  updateHighlight();
  restoreFocus(key);
}

function selectedActive(): number[] {
  const model = buildModel(current());
  return [...state!.selected].filter((index) => model.lengths[index]?.active).sort((a, b) => a - b);
}

function updateHighlight(): void {
  if (!state) return;
  const group = document.getElementById('hl');
  if (!group) return;
  const model = buildModel(current());
  const x = chartX(model);
  const indices = new Set(state.selected);
  if (state.hover !== undefined) indices.add(state.hover);
  group.innerHTML = [...indices].map((index) => model.lengths[index]).filter(Boolean).map((length) => `<rect x="${x(length.start).toFixed(1)}" y="${CHART.T}" width="${Math.max(2, x(length.start + length.seconds) - x(length.start)).toFixed(1)}" height="${CHART.H - CHART.T - CHART.B}" fill="var(--hl)"/>`).join('');
}

function load(name: string, bytes: Uint8Array): void {
  try {
    const file = FitFile.parse(bytes);
    state = { name, original: file, originalModel: buildModel(file), stack: [file], ignored: new Set(), selected: new Set() };
    error = '';
    status = 'loaded';
  } catch (caught) {
    error = caught instanceof FitError || caught instanceof NotSwimError ? caught.message : (caught as Error).message;
    status = undefined;
  }
  render();
}

function push(file: FitFile, message: MessageId = 'updated'): void {
  state!.stack.push(file);
  state!.selected.clear();
  state!.hover = undefined;
  status = message;
  render();
}

function edit(fn: () => FitFile, message?: MessageId): void {
  try { push(fn(), message); } catch (caught) { error = (caught as Error).message; render(); }
}

function download(): void {
  const url = URL.createObjectURL(new Blob([current().serialize() as BlobPart], { type: 'application/octet-stream' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = state!.name.replace(/\.fit$/i, '') + '_swimfix.fit';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status = 'downloadStarted';
  render();
}

async function read(file: File): Promise<void> {
  try { load(file.name, new Uint8Array(await file.arrayBuffer())); }
  catch (caught) { error = (caught as Error).message; status = undefined; render(); }
}

function bind(): void {
  const drop = document.getElementById('drop');
  const input = document.getElementById('file') as HTMLInputElement | null;
  if (!drop || !input) return;
  // The empty drop zone opens the picker anywhere; once loaded, only the "Replace" button does.
  drop.addEventListener('click', (event) => {
    if (event.target === input) return;
    if (!state || (event.target as HTMLElement).closest('[data-upload]')) input.click();
  });
  input.addEventListener('change', () => { if (input.files?.[0]) void read(input.files[0]); });
  drop.addEventListener('dragover', (event) => { event.preventDefault(); drop.classList.add('over'); });
  drop.addEventListener('dragleave', () => drop.classList.remove('over'));
  drop.addEventListener('drop', (event) => { event.preventDefault(); drop.classList.remove('over'); if (event.dataTransfer?.files[0]) void read(event.dataTransfer.files[0]); });
}

app.addEventListener('click', (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>('[data-act]');
  if (!target || !state) return;
  error = '';
  const items = suggestions(buildModel(current()));
  const key = target.dataset.key;
  switch (target.dataset.act) {
    case 'apply': { const item = items.find((suggestion) => suggestion.key === key); if (item) edit(() => applySuggestions(current(), [item]), 'suggestionApplied'); break; }
    case 'apply-all': edit(() => applySuggestions(current(), items), 'suggestionsApplied'); break;
    case 'ignore': if (key) { state.ignored.add(key); status = 'suggestionIgnored'; render(); } break;
    case 'jump': { const row = document.getElementById(`length-${target.dataset.index}`); row?.scrollIntoView({ behavior: 'smooth', block: 'center' }); row?.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true }); break; }
    case 'merge': { const indices = [...state.selected].sort((a, b) => a - b); edit(() => mergeLengths(current(), indices[0]), 'merged'); break; }
    case 'rest': edit(() => selectedActive().reduce((file, index) => markRest(file, index), current()), 'restMarked'); break;
    case 'undo': if (state.stack.length > 1) { state.stack.pop(); state.selected.clear(); state.hover = undefined; status = 'undone'; render(); } break;
    case 'reset': state.stack = [state.original]; state.ignored.clear(); state.selected.clear(); state.hover = undefined; status = 'resetDone'; render(); break;
    case 'download': download(); break;
  }
});

app.addEventListener('change', (event) => {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  if (!state) return;
  if (target instanceof HTMLInputElement && target.dataset.sel !== undefined) {
    const index = Number(target.dataset.sel);
    target.checked ? state.selected.add(index) : state.selected.delete(index);
    render();
  } else if (target.id === 'stroke' && target.value) {
    const stroke = Number(target.value);
    edit(() => selectedActive().reduce((file, index) => setStroke(file, index, stroke), current()), 'strokeUpdated');
  }
});

app.addEventListener('mouseover', (event) => {
  if (!state) return;
  const element = (event.target as HTMLElement).closest<HTMLElement>('[data-hover]');
  const hover = element ? Number(element.dataset.hover) : undefined;
  if (hover !== state.hover) { state.hover = hover; updateHighlight(); }
});

app.addEventListener('swimfix:languagechange', ((event: CustomEvent<{ language?: string }>) => {
  language = languageOf(event.detail?.language);
  app.dataset.language = language;
  app.lang = language;
  announcedStatus = '';
  render();
}) as EventListener);

render();
