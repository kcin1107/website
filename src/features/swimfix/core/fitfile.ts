import { crc16 } from './crc';

export class FitError extends Error {}

interface BaseType {
  size: number;
  signed: boolean;
  invalid: number;
}

/** Integer base types only (by base type number = byte & 0x1f). Others are read-only raw bytes. */
const BASE_TYPES: Record<number, BaseType> = {
  0x00: { size: 1, signed: false, invalid: 0xff }, // enum
  0x01: { size: 1, signed: true, invalid: 0x7f }, // sint8
  0x02: { size: 1, signed: false, invalid: 0xff }, // uint8
  0x03: { size: 2, signed: true, invalid: 0x7fff }, // sint16
  0x04: { size: 2, signed: false, invalid: 0xffff }, // uint16
  0x05: { size: 4, signed: true, invalid: 0x7fffffff }, // sint32
  0x06: { size: 4, signed: false, invalid: 0xffffffff }, // uint32
  0x0a: { size: 1, signed: false, invalid: 0x00 }, // uint8z
  0x0b: { size: 2, signed: false, invalid: 0x0000 }, // uint16z
  0x0c: { size: 4, signed: false, invalid: 0x00000000 }, // uint32z
};

export interface FieldDef {
  num: number;
  size: number;
  baseTypeByte: number;
  /** offset inside the data record (after the 1-byte header) */
  offset: number;
}

export interface Definition {
  local: number;
  glob: number;
  littleEndian: boolean;
  fields: FieldDef[];
  devSize: number;
  /** total data record length including header */
  dataLength: number;
}

export class DefinitionRecord {
  readonly kind = 'def';
  constructor(
    public raw: Uint8Array,
    public def: Definition,
  ) {}
}

export class DataRecord {
  readonly kind = 'data';
  removed = false;
  constructor(
    public raw: Uint8Array,
    public def: Definition,
  ) {}

  get glob(): number {
    return this.def.glob;
  }

  private field(num: number): { f: FieldDef; bt: BaseType } | undefined {
    const f = this.def.fields.find((x) => x.num === num);
    if (!f) return undefined;
    const bt = BASE_TYPES[f.baseTypeByte & 0x1f];
    if (!bt || bt.size !== f.size) return undefined; // arrays, strings, floats, ...
    return { f, bt };
  }

  /** Field present with a plain integer base type. */
  has(num: number): boolean {
    return this.field(num) !== undefined;
  }

  private view(): DataView {
    return new DataView(this.raw.buffer, this.raw.byteOffset, this.raw.byteLength);
  }

  private readRaw(f: FieldDef, bt: BaseType): number {
    const v = this.view();
    const o = 1 + f.offset;
    const le = this.def.littleEndian;
    switch (bt.size) {
      case 1:
        return bt.signed ? v.getInt8(o) : v.getUint8(o);
      case 2:
        return bt.signed ? v.getInt16(o, le) : v.getUint16(o, le);
      default:
        return bt.signed ? v.getInt32(o, le) : v.getUint32(o, le);
    }
  }

  private writeRaw(f: FieldDef, bt: BaseType, value: number): void {
    const v = this.view();
    const o = 1 + f.offset;
    const le = this.def.littleEndian;
    switch (bt.size) {
      case 1:
        if (bt.signed) v.setInt8(o, value);
        else v.setUint8(o, value);
        break;
      case 2:
        if (bt.signed) v.setInt16(o, value, le);
        else v.setUint16(o, value, le);
        break;
      default:
        if (bt.signed) v.setInt32(o, value, le);
        else v.setUint32(o, value, le);
    }
  }

  /** Value, or undefined if field is absent / holds the invalid value / is not a plain integer. */
  get(num: number): number | undefined {
    const x = this.field(num);
    if (!x) return undefined;
    const v = this.readRaw(x.f, x.bt);
    return v === x.bt.invalid ? undefined : v;
  }

  /** Returns false if the field is absent. Throws for non-integer fields or out-of-range values. */
  set(num: number, value: number): boolean {
    const f = this.def.fields.find((x) => x.num === num);
    if (!f) return false;
    const x = this.field(num);
    if (!x) throw new FitError(`Feld ${num} (Typ 0x${f.baseTypeByte.toString(16)}, ${f.size} Byte) kann nicht gesetzt werden`);
    if (!Number.isInteger(value)) throw new FitError(`Feld ${num}: ${value} ist keine ganze Zahl`);
    const bits = x.bt.size * 8;
    const min = x.bt.signed ? -(2 ** (bits - 1)) : 0;
    const max = x.bt.signed ? 2 ** (bits - 1) - 1 : 2 ** bits - 1;
    if (value < min || value > max) throw new FitError(`Feld ${num}: ${value} außerhalb des Wertebereichs`);
    this.writeRaw(x.f, x.bt, value);
    return true;
  }

  /** Write the base type's invalid value. Returns false if the field is absent. */
  setInvalid(num: number): boolean {
    const f = this.def.fields.find((x) => x.num === num);
    if (!f) return false;
    const x = this.field(num);
    if (!x) throw new FitError(`Feld ${num} kann nicht ungültig gesetzt werden`);
    this.writeRaw(x.f, x.bt, x.bt.invalid);
    return true;
  }

  clone(): DataRecord {
    const c = new DataRecord(this.raw.slice(), this.def);
    c.removed = this.removed;
    return c;
  }
}

export type FitRecord = DefinitionRecord | DataRecord;

export class FitFile {
  constructor(
    /** header bytes (12 or 14); size/CRC are recomputed on serialize */
    public header: Uint8Array,
    public records: FitRecord[],
  ) {}

  static parse(buf: Uint8Array): FitFile {
    if (buf.length < 14) throw new FitError('Datei zu klein – keine FIT-Datei.');
    const hsize = buf[0];
    if (hsize !== 12 && hsize !== 14) throw new FitError('Keine FIT-Datei (ungültiger Header).');
    const sig = String.fromCharCode(buf[8], buf[9], buf[10], buf[11]);
    if (sig !== '.FIT') throw new FitError('Keine FIT-Datei (Kennung ".FIT" fehlt).');
    const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    const dataSize = dv.getUint32(4, true);
    const end = hsize + dataSize;
    if (end + 2 > buf.length) throw new FitError('FIT-Datei ist abgeschnitten.');
    if (end + 2 < buf.length) throw new FitError('Verkettete FIT-Dateien werden nicht unterstützt.');
    if (crc16(buf, 0, end) !== dv.getUint16(end, true)) throw new FitError('FIT-Prüfsumme (CRC) stimmt nicht – Datei beschädigt.');

    const defs = new Map<number, Definition>();
    const records: FitRecord[] = [];
    let pos = hsize;
    while (pos < end) {
      const h = buf[pos];
      if (h & 0x80) {
        throw new FitError('Komprimierte Zeitstempel (Compressed Timestamp Header) werden nicht unterstützt.');
      }
      const local = h & 0x0f;
      if (h & 0x40) {
        const littleEndian = buf[pos + 2] === 0;
        const glob = dv.getUint16(pos + 3, littleEndian);
        const n = buf[pos + 5];
        const fields: FieldDef[] = [];
        let off = 0;
        for (let i = 0; i < n; i++) {
          const size = buf[pos + 7 + 3 * i];
          fields.push({ num: buf[pos + 6 + 3 * i], size, baseTypeByte: buf[pos + 8 + 3 * i], offset: off });
          off += size;
        }
        let len = 6 + 3 * n;
        let devSize = 0;
        if (h & 0x20) {
          const nd = buf[pos + len];
          for (let i = 0; i < nd; i++) devSize += buf[pos + len + 2 + 3 * i];
          len += 1 + 3 * nd;
        }
        const def: Definition = { local, glob, littleEndian, fields, devSize, dataLength: 1 + off + devSize };
        defs.set(local, def);
        records.push(new DefinitionRecord(buf.slice(pos, pos + len), def));
        pos += len;
      } else {
        const def = defs.get(local);
        if (!def) throw new FitError(`Datensatz mit unbekannter Definition (lokal ${local}).`);
        if (pos + def.dataLength > end) throw new FitError('FIT-Datei ist abgeschnitten.');
        records.push(new DataRecord(buf.slice(pos, pos + def.dataLength), def));
        pos += def.dataLength;
      }
    }
    return new FitFile(buf.slice(0, hsize), records);
  }

  /** Independent copy; data records are deep-copied so edits do not leak. */
  clone(): FitFile {
    return new FitFile(
      this.header.slice(),
      this.records.map((r) => (r instanceof DataRecord ? r.clone() : r)),
    );
  }

  /** Live (non-removed) data messages of a global message number. */
  messages(glob: number): DataRecord[] {
    return this.records.filter((r): r is DataRecord => r instanceof DataRecord && !r.removed && r.glob === glob);
  }

  serialize(): Uint8Array {
    const live = this.records.filter((r) => !(r instanceof DataRecord && r.removed));
    const body = live.reduce((n, r) => n + r.raw.length, 0);
    const hsize = this.header.length;
    const out = new Uint8Array(hsize + body + 2);
    out.set(this.header, 0);
    const dv = new DataView(out.buffer);
    dv.setUint32(4, body, true);
    if (hsize >= 14) dv.setUint16(12, crc16(out, 0, 12), true);
    let p = hsize;
    for (const r of live) {
      out.set(r.raw, p);
      p += r.raw.length;
    }
    dv.setUint16(p, crc16(out, 0, p), true);
    return out;
  }
}
