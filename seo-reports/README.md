---
title: AUVITA SEO 健檢報告存放區
brand: AUVITA
language_scope: zh-TW（單語）
sop: ../../SEO_AUDIT_SOP.md
---

# AUVITA SEO Reports

## 目錄結構

```
seo-reports/
├── README.md            ← 本檔
└── YYYY-MM-DD/          ← 每次跑健檢前 cd 進來，建一個當日 folder
    ├── FULL-AUDIT-REPORT.md       ← seo audit 主報告
    ├── ACTION-PLAN.md             ← seo audit 行動計畫
    ├── SCHEMA-REPORT.md           ← seo schema 偵測結果
    ├── generated-schema.json      ← seo schema 可貼即用 JSON-LD
    ├── GEO-ANALYSIS.md            ← seo geo 報告
    ├── AEO-REPORT.md              ← seo aeo 報告（如有）
    ├── TECHNICAL-AUDIT.md         ← seo technical 報告（如有）
    └── SEO-REPORT.html            ← 互動 dashboard（如有明說要產）
```

## 跑健檢的標準動作

1. 建立今日 folder：`mkdir 2026-MM-DD`（以執行當天為準）
2. `cd 2026-MM-DD`
3. 依 [`SEO_AUDIT_SOP.md`](../../SEO_AUDIT_SOP.md) §2 AUVITA 路徑跑 5 個子指令
4. 跑完 commit 進 GNTadmin001/Auvita repo

## 注意事項

- AUVITA 是 zh-TW 單語站，**不用跑** `seo hreflang`
- Skill 把報告寫到「執行時的 CWD」，所以一定要先 cd 進日期 folder
- 跨日跑的話用新的日期 folder，不要覆蓋舊的（可比較差異）
