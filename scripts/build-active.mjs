#!/usr/bin/env node
// build-active.mjs — 從 schedule.json 按今日日期切分出 active.json / archive.json
// 零依賴。先跑 validate-schedule.mjs 才允許執行。移植自 01-TDDS/website/AeroJet。
//
// 規則：
//   今日 = process.env.TODAY ?? new Date()（UTC+8 台灣時區）
//   active.json    ← schedule 中 startAt <= today <= endAt（最多取 10 則）
//   archive.json   ← schedule 中 endAt < today（加 archivedAt 時間戳）
//   future（startAt > today）→ 留在 schedule.json，不出現在 active/archive

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = path.resolve(import.meta.dirname, '..');
const SCHEDULE = path.join(ROOT, 'data/promotions/schedule.json');
const ACTIVE = path.join(ROOT, 'data/promotions/active.json');
const ARCHIVE = path.join(ROOT, 'data/promotions/archive.json');

// 台灣時區 YYYY-MM-DD
function todayInTaipei() {
  if (process.env.TODAY && /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(process.env.TODAY)) {
    return process.env.TODAY; // 測試用
  }
  const now = new Date();
  // UTC+8
  const tw = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  return tw.toISOString().slice(0, 10);
}

const today = todayInTaipei();
console.log(`[build-active] today (Asia/Taipei) = ${today}`);

if (!fs.existsSync(SCHEDULE)) {
  console.error(`[FAIL] ${SCHEDULE} not found`);
  process.exit(2);
}

const schedule = JSON.parse(fs.readFileSync(SCHEDULE, 'utf8'));
if (!Array.isArray(schedule)) {
  console.error(`[FAIL] schedule.json must be an array`);
  process.exit(2);
}

const active = [];
const archived = [];

for (const p of schedule) {
  if (!p?.startAt || !p?.endAt) continue;
  if (p.startAt <= today && today <= p.endAt) {
    // 當期 active（不寫 archivedAt 欄位，避免 leak）
    const { archivedAt, ...cleaned } = p;
    active.push(cleaned);
  } else if (p.endAt < today) {
    // 已過期 → archive，加 archivedAt（首次歸檔時間）
    const stamped = { ...p, archivedAt: p.archivedAt ?? new Date().toISOString() };
    archived.push(stamped);
  }
  // future（startAt > today）→ 留在 schedule.json，不輸出
}

// active.json 最多 10 則
const activeOutput = active.slice(0, 10);
if (active.length > 10) {
  console.warn(`[WARN] ${active.length} active promotions today, taking first 10 (validate should have caught this)`);
}

// 合併既存 archive.json（保留歷史，避免每次都重寫掉）
let existingArchive = [];
if (fs.existsSync(ARCHIVE)) {
  try {
    existingArchive = JSON.parse(fs.readFileSync(ARCHIVE, 'utf8'));
    if (!Array.isArray(existingArchive)) existingArchive = [];
  } catch {
    existingArchive = [];
  }
}

// 重要：當期 active / future 的 id 必須從 archive 排除（避免同一筆同時出現在兩處）
const activeOrFutureIds = new Set();
for (const p of schedule) {
  if (!p?.startAt || !p?.endAt) continue;
  if (today <= p.endAt) activeOrFutureIds.add(p.id); // active 或 future
}

const archiveMap = new Map();
for (const p of existingArchive) {
  if (!p?.id) continue;
  if (activeOrFutureIds.has(p.id)) continue; // 排除：當期 active / future
  archiveMap.set(p.id, p);
}
for (const p of archived) {
  if (p?.id) archiveMap.set(p.id, p);
}
const archiveOutput = Array.from(archiveMap.values())
  .sort((a, b) => (a.endAt < b.endAt ? 1 : -1)); // 新 → 舊

fs.writeFileSync(ACTIVE, JSON.stringify(activeOutput, null, 2) + '\n', 'utf8');
fs.writeFileSync(ARCHIVE, JSON.stringify(archiveOutput, null, 2) + '\n', 'utf8');

console.log(`[build-active] wrote ${path.relative(ROOT, ACTIVE)} (${activeOutput.length} active)`);
console.log(`[build-active] wrote ${path.relative(ROOT, ARCHIVE)} (${archiveOutput.length} archived total)`);
console.log(`[build-active] OK`);
