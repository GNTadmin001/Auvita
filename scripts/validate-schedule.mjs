#!/usr/bin/env node
// validate-schedule.mjs — 驗證 data/promotions/schedule.json
// 零依賴（Node 20 內建）。Exit code 0 = pass，非 0 = fail。
// 移植自 01-TDDS/website/AeroJet（行為一致）。

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = path.resolve(import.meta.dirname, '..');
const SCHEDULE = path.join(ROOT, 'data/promotions/schedule.json');
const PUBLIC_DIR = path.join(ROOT, 'public');

const LOCALES = ['zh-TW', 'en', 'ja'];
const DATE_RE = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
const ID_RE = /^[A-Za-z0-9_-]+$/;
const IMG_LOCAL_RE = /^\/images\/promotions\/.+\.(jpg|jpeg|png|webp)$/i;
const IMG_URL_RE = /^https?:\/\/.+/i;

const errors = [];
const warnings = [];

function err(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

// 1. 檔案存在
if (!fs.existsSync(SCHEDULE)) {
  console.error(`[FAIL] schedule.json not found at ${SCHEDULE}`);
  process.exit(2);
}

// 2. JSON 可解析
let data;
try {
  data = JSON.parse(fs.readFileSync(SCHEDULE, 'utf8'));
} catch (e) {
  console.error(`[FAIL] schedule.json invalid JSON: ${e.message}`);
  process.exit(2);
}

// 3. 必須是陣列
if (!Array.isArray(data)) {
  console.error(`[FAIL] schedule.json must be an array, got ${typeof data}`);
  process.exit(2);
}

// 4. 逐筆檢查
const seenIds = new Set();
for (let i = 0; i < data.length; i++) {
  const p = data[i];
  const ctx = `[#${i}${p?.id ? ` id=${p.id}` : ''}]`;

  if (typeof p !== 'object' || p === null) { err(`${ctx} not an object`); continue; }

  // 4.1 必填欄位
  for (const k of ['id', 'image', 'startAt', 'endAt', ...LOCALES]) {
    if (!(k in p)) err(`${ctx} missing field: ${k}`);
  }

  // 4.2 id 格式 + 唯一
  if (p.id) {
    if (typeof p.id !== 'string' || !ID_RE.test(p.id)) {
      err(`${ctx} invalid id format (must match ^[A-Za-z0-9_-]+$): ${JSON.stringify(p.id)}`);
    }
    if (seenIds.has(p.id)) err(`${ctx} id duplicated: ${p.id}`);
    seenIds.add(p.id);
  }

  // 4.3 image 格式
  if (typeof p.image !== 'string') {
    err(`${ctx} image must be string`);
  } else if (IMG_LOCAL_RE.test(p.image)) {
    const abs = path.join(PUBLIC_DIR, p.image.replace(/^\//, ''));
    if (!fs.existsSync(abs)) {
      err(`${ctx} image not found in public/: ${p.image}`);
    }
  } else if (IMG_URL_RE.test(p.image)) {
    warn(`${ctx} image uses external URL (consider hosting locally): ${p.image}`);
  } else {
    err(`${ctx} invalid image path (must be /images/promotions/*.{jpg,jpeg,png,webp} or http(s) URL): ${p.image}`);
  }

  // 4.4 日期格式
  for (const k of ['startAt', 'endAt']) {
    if (typeof p[k] !== 'string') { err(`${ctx} ${k} must be string`); continue; }
    if (!DATE_RE.test(p[k])) { err(`${ctx} invalid ${k} format (need YYYY-MM-DD): ${p[k]}`); continue; }
    const d = new Date(p[k] + 'T00:00:00Z');
    if (isNaN(d.getTime())) err(`${ctx} ${k} is not a real date: ${p[k]}`);
  }

  // 4.5 startAt < endAt
  if (DATE_RE.test(p.startAt || '') && DATE_RE.test(p.endAt || '')) {
    if (p.startAt > p.endAt) {
      err(`${ctx} startAt (${p.startAt}) must be <= endAt (${p.endAt})`);
    }
  }

  // 4.6 三語系完整
  for (const loc of LOCALES) {
    const l = p[loc];
    if (typeof l !== 'object' || l === null) {
      err(`${ctx} locale ${loc} must be object`);
      continue;
    }
    for (const k of ['title', 'description']) {
      if (typeof l[k] !== 'string' || l[k].trim() === '') {
        err(`${ctx} locale ${loc}.${k} must be non-empty string`);
      }
      if (typeof l[k] === 'string') {
        const maxLen = k === 'title' ? 50 : 200;
        if (l[k].length > maxLen) {
          err(`${ctx} locale ${loc}.${k} too long (${l[k].length} > ${maxLen} chars)`);
        }
      }
    }
  }
}

// 5. 同期重疊上限（任一日期 active 數量 <= 10）— 區間端點 sweep
const events2 = [];
for (const p of data) {
  if (!DATE_RE.test(p?.startAt || '') || !DATE_RE.test(p?.endAt || '')) continue;
  events2.push({ date: p.startAt, delta: +1, id: p.id });
  // endAt 當日仍 active，從 endAt 隔日開始 -1
  const endD = new Date(p.endAt + 'T00:00:00Z');
  endD.setUTCDate(endD.getUTCDate() + 1);
  const endNext = endD.toISOString().slice(0, 10);
  events2.push({ date: endNext, delta: -1, id: p.id });
}
events2.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : a.delta - b.delta));
let active = 0;
let maxActive = 0;
let maxActiveDate = null;
for (const e of events2) {
  active += e.delta;
  if (active > maxActive) {
    maxActive = active;
    maxActiveDate = e.date;
  }
}
if (maxActive > 10) {
  err(`overlap exceeds 10 active promotions on ${maxActiveDate}: ${maxActive} concurrent (max allowed: 10)`);
}

// === 報告 ===
console.log(`[validate-schedule] checked ${data.length} promotions in ${path.relative(ROOT, SCHEDULE)}`);

if (warnings.length > 0) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  WARN  ${w}`);
}

if (errors.length > 0) {
  console.error(`\n${errors.length} error(s):`);
  for (const e of errors) console.error(`  FAIL  ${e}`);
  console.error(`\n[validate-schedule] FAILED`);
  process.exit(1);
}

console.log(`\n[validate-schedule] OK — all ${data.length} promotions valid (max ${maxActive} concurrent on ${maxActiveDate ?? 'n/a'})`);
process.exit(0);
