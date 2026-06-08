# SEO Action Plan — AUVITA (www.auvita.tw)

**Date:** 2026-06-08  
**Scores:** Technical 58 / Audit 52 / GEO Readiness 42  
**Reference:** FULL-AUDIT-REPORT.md / SCHEMA-REPORT.md / GEO-ANALYSIS.md / AEO-REPORT.md

---

## ❌ Critical（上線即存在的問題，排在所有開發之前）

### C1. 統一 www vs non-www（canonical 衝突）
- **位置：** Next.js codebase（next.config.js、layout.tsx、sitemap.xml、JSON-LD）
- **問題：** canonical、OG、schema、sitemap 全用 `auvita.tw`，但網站跑在 `www.auvita.tw`
- **預估工時：** 2-3 小時
- **修法清單：**
  - [ ] 決定正典 domain（建議保留 `www.auvita.tw`）
  - [ ] `next.config.js` → `async redirects()` 加入 non-www → www 301 redirect
  - [ ] `layout.tsx` 所有 `canonical`、`og:url` 改 `https://www.auvita.tw`
  - [ ] `public/sitemap.xml` 21 個 URL 全改為 www 版本
  - [ ] `_app.tsx` 或 JSON-LD 注入點更新 Organization `@id` 和 `url` 為 `https://www.auvita.tw`
  - [ ] robots.txt `Sitemap:` 更新為 `https://www.auvita.tw/sitemap.xml`
  - [ ] 部署後驗證：`curl -I https://auvita.tw` 應得到 301 → `www.auvita.tw`

### C2. 補全 Product schema（防止 Google Rich Results 無法顯示）
- **位置：** /zh-TW/shop 頁面（可能在 `data/promotions/active.json` 或商品列表資料）
- **問題：** 7 個 Product schema 缺 image + sku；2 個缺 price（error）
- **預估工時：** 3-4 小時（手動補）或整合進 MARKETING_PIPELINE_SOP.md 的 n8n pipeline
- **修法清單：**
  - [ ] 補 `image` 欄位（商品主圖的完整 URL）
  - [ ] 補 `sku` 或 `gtin` 欄位
  - [ ] 補缺少 `price` 的 2 個商品
  - [ ] 使用 Google Rich Results Test 驗證：https://search.google.com/test/rich-results
  - [ ] 長期：將 `generated-schema.json` 的 `product_template` 接入 Sheet→n8n pipeline

---

## ⚠️ High（1 週內修復）

### H1. 補 6 個安全標頭
- **位置：** `next.config.js` async headers()
- **預估工時：** 1 小時
- **修法：** 見 TECHNICAL-AUDIT.md Critical Issue #2 的程式碼範例
- **注意：** CSP 需謹慎設定（避免擋掉 GA、GTM、CDN）；可先設 Report-Only 模式觀察 2-3 天再改為 enforce

### H2. 302 redirect 改 301
- **位置：** `next.config.js` redirects 或 Next.js middleware
- **預估工時：** 0.5 小時
- **修法：** `{ source: '/', destination: '/zh-TW', permanent: true }`

### H3. 補 Organization schema 欄位
- **位置：** JSON-LD 注入點（_document.tsx 或 layout.tsx）
- **預估工時：** 1 小時
- **修法：**
  - [ ] 補 `contactPoint`（含 URL to /contact）
  - [ ] 補 `address`（台北市內湖區瑞光路 258 巷 52 號）
  - [ ] 加 TWSE 1267 identifier（`"identifier": "TWSE:1267"` 或 `"award"`）
  - [ ] 補認證資訊（考慮用 `award` 欄位列 SNQ/E175/TFDA/HALAL）
  - [ ] 參考 `generated-schema.json` 的 organization 物件

### H4. 補 Organization sameAs（社群媒體）
- **位置：** JSON-LD + 決策（需先確認各平台官方帳號 URL）
- **預估工時：** 1-2 小時（含帳號確認）
- **修法：**
  - [ ] 確認 LinkedIn 公司頁 URL → 加入 sameAs
  - [ ] 確認 Facebook 粉絲頁 URL → 加入 sameAs
  - [ ] 確認 Instagram 帳號 URL → 加入 sameAs
  - [ ] 確認 Twitter/X 帳號 URL → 加入 sameAs

---

## 📋 Medium（1 個月內完成）

### M1. sitemap 補 `<lastmod>`
- [ ] 在 Next.js sitemap 生成邏輯加入 `<lastmod>` 欄位（可用頁面最後更新時間或 build 時間）

### M2. 所有頁面加 BreadcrumbList schema
- [ ] 在 layout 或各頁面 component 動態注入 BreadcrumbList
- 參考 `generated-schema.json` 的 `breadcrumb_template`

### M3. 加 LocalBusiness schema
- [ ] 在首頁或 contact 頁加入 LocalBusiness
- 參考 `generated-schema.json` 的 `local_business`

### M4. 建立 /llms.txt
- [ ] 在 `public/llms.txt` 建立（見 GEO-ANALYSIS.md 的範本）
- [ ] 同步測試：`curl https://www.auvita.tw/llms.txt` 應 200

### M5. Product schema 補 shippingDetails + hasMerchantReturnPolicy
- [ ] 補全所有 7 個商品的退貨政策和運送資訊
- 參考 `generated-schema.json` 的 `product_template`

### M6. AI 爬蟲策略明確化（robots.txt 更新）
- [ ] 決定是否要對部分 AI 爬蟲顯式 Allow（建議全部開放，配合 /llms.txt 引導）
- 最簡單做法：加一行 `# AI crawlers explicitly welcome — see /llms.txt`

---

## 📌 Low / Backlog

### L1. og:image 補 width/height
- 加 `<meta property="og:image:width" content="1200">`
- 加 `<meta property="og:image:height" content="630">`
- 確認 logo-nautilus-gold.png 本身的尺寸

### L2. 確認 CWV 數字並設 目標
- 從 PSI URL 查閱 LCP / INP / CLS
- 若 LCP > 2.5s → 找最大圖片（hero image）加 `fetchpriority="high"`
- 若 CLS > 0.1 → 找跳版元素

### L3. AEO P1：FAQPage schema（下個 sprint）
- 在 brand-tech 頁加 10-15 個 Q&A + FAQPage schema
- 在首頁加 6-8 個 FAQ
- 詳見 AEO-REPORT.md P1 條目

### L4. AEO P2：TWSE / 認證入 schema
- 詳見 AEO-REPORT.md P2 條目

### L5. 調查 E-E-A-T 提升路徑
- 考慮建立「關於我們 / 研發團隊」頁（具名人員 + 資歷）
- 考慮在 brand-tech 頁加入學術合作（「40+ 項學研合作試驗」已有提及，補充機構名稱）

---

## 修改後必做驗證步驟

| 動作 | 驗證方式 |
|---|---|
| C1 canonical 統一 | `curl -I https://auvita.tw` 應 301 → www |
| C2 Product schema | Google Rich Results Test |
| H1 security headers | securityheaders.com 掃描 |
| H2 301 redirect | `curl -I https://www.auvita.tw/` |
| H3 Organization | Google Rich Results Test / Schema.org Validator |
| M4 /llms.txt | `curl https://www.auvita.tw/llms.txt` |

---

## 同步 Asana / GitHub Issue 建議

| 條目 | 嚴重度 | 建議開 Issue |
|---|---|---|
| C1 www vs non-www canonical | Critical | ✅ 立刻開 |
| C2 Product schema 缺 image/sku/price | Critical | ✅ 立刻開 |
| H1 安全標頭補全 | High | ✅ 開 |
| H2 302 → 301 | High | ✅ 開（小工） |
| H3 Organization schema 補全 | High | ✅ 開 |
| M1 sitemap lastmod | Medium | 排入 backlog |
| M4 /llms.txt | Medium | 排入 backlog（接 NEXT_SESSION.md P2）|
