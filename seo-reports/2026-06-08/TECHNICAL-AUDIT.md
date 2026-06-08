# Technical SEO Audit — AUVITA (www.auvita.tw)

**Date:** 2026-06-08  
**Auditor:** Claude Code SEO Skill (manual script execution)  
**Target:** https://www.auvita.tw (primary: /zh-TW)  
**Strategy:** Mobile-first (Google 100% mobile-first indexing since 2024-07-05)

---

## Technical Score: 58/100

### Category Breakdown

| Category | Status | Score | Notes |
|---|---|---|---|
| Crawlability | ⚠️ | 70/100 | robots.txt 正常；AI 爬蟲未顯式管理 |
| Indexability | ⚠️ | 55/100 | www vs non-www canonical 衝突 (Critical) |
| Security | ❌ | 25/100 | 6 個安全標頭全部缺漏 (Critical) |
| URL Structure | ⚠️ | 65/100 | 302 應改 301；www vs non-www 不一致 |
| Mobile | ✅ | 85/100 | viewport 正確；響應式設計；H1 存在 |
| Core Web Vitals | — | N/A | PSI API rate-limited（無 key）；用戶已提供結果 |
| Structured Data | ⚠️ | 60/100 | Organization+WebSite 存在；Product schema 有缺欄 |
| JS Rendering | ⚠️ | 75/100 | Playwright 未安裝；從靜態 HTML 推斷 SSR 正常 |

> **Core Web Vitals 備註（Environment limitation）：** 本機 PSI API 被 rate-limit（無 API key）。用戶已提供行動版 PSI 結果：  
> https://pagespeed.web.dev/analysis/https-www-auvita-tw-zh-TW/bho8qfalte?form_factor=mobile  
> 請直接從該頁面查閱 LCP / INP / CLS 數字。CWV 閾值：LCP < 2.5s、INP < 200ms、CLS < 0.1。

---

## Critical Issues（立即修復）

### 1. ❌ www vs non-www canonical 衝突
- **現象：** 網站在 `www.auvita.tw` 提供服務，但 canonical tag、OG tags、Organization schema 的 `url`/`@id`、sitemap URL 全部使用 `auvita.tw`（無 www）
- **影響：** Google 可能選擇 non-www 作為 canonical，兩個版本分別累積 link equity，搜尋排名被稀釋
- **confidence:** Confirmed（直接從 HTTP header + HTML 讀取）
- **修法：**
  1. 決定唯一正典 domain（建議：`https://www.auvita.tw`，因為這是實際服務網址）
  2. 在 Next.js `next.config.js` 設定 `canonical` 為 `https://www.auvita.tw`
  3. 更新 `_document.tsx` 或 `layout.tsx` 的所有 OG `og:url`
  4. 更新 `public/sitemap.xml` 的所有 URL（21 個）
  5. 更新 JSON-LD Organization schema 的 `url` 和 `@id`
  6. 在 FTP/伺服器設定 non-www → www 的 301 redirect（或在 Next.js middleware 處理）

### 2. ❌ 6 個安全標頭全部缺漏（Security Score: 25/100）
- **現象：** HSTS、CSP、X-Frame-Options、X-Content-Type-Options、Referrer-Policy、Permissions-Policy 六個均未設定
- **影響：** Google 將安全視為排名訊號；缺 HSTS 影響 HTTPS 強制；缺 CSP 對食用金品牌的信任度有負面影響
- **confidence:** Confirmed（HTTP header 直接讀取）
- **修法（Next.js `next.config.js` headers 設定）：**
  ```js
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        // CSP 需依實際資源清單訂定，避免 too strict 擋掉 CDN/GTM
      ]
    }]
  }
  ```

---

## High Priority（1 週內修復）

### 3. ⚠️ 首頁 302 redirect 應改為 301
- **現象：** `https://www.auvita.tw/` → 302 (temporary) → `https://www.auvita.tw/zh-TW`
- **影響：** 302 不傳遞 link equity；所有到首頁的反向連結 PageRank 不會轉移到 /zh-TW
- **confidence:** Confirmed（redirect chain 直接驗證）
- **修法：** 在 Next.js middleware 或 `next.config.js` redirects 改為 `permanent: true`（307→308/301）

### 4. ⚠️ 商店頁 Product schema 缺失關鍵欄位
- **現象：** /zh-TW/shop 頁面的 7 個 Product schema 全部缺：`image`、`sku`/`gtin`/`mpn`；其中 2 個缺 `price`（error 級）
- **影響：** Google Rich Results（商品片段）不會顯示；在 Google 購物搜尋結果中完全不可見
- **confidence:** Confirmed（product_schema_checker 直接從 JSON-LD 驗證）
- **修法：** 在 MARKETING_PIPELINE_SOP.md 規劃的 Sheet→n8n→GitHub pipeline 中，確保 Product schema 包含 `image`、`sku`、`price`、`currency`、`shippingDetails`、`hasMerchantReturnPolicy`

---

## Medium Priority（1 個月內修復）

### 5. ⚠️ Sitemap 的 21 個 URL 全部缺 `<lastmod>`
- **影響：** Google 無法判斷哪些頁面最近更新過，爬取效率降低
- **修法：** 在 Next.js sitemap 生成邏輯中加入 `lastmod`（可用 build time 或頁面 metadata）

### 6. ⚠️ Sitemap URL 使用 non-www（與 canonical 衝突）
- **現象：** sitemap.xml 的 URL 全部為 `auvita.tw/...`（無 www），同步 robots.txt 的 Sitemap 宣告也是無 www
- **修法：** 解決 Critical Issue #1 後一起修（統一為 www 或 non-www）

### 7. ⚠️ AI 爬蟲未顯式管理（11 個爬蟲繼承 `*` 規則）
- **現象：** robots.txt 只有一個 `User-agent: *` 規則，無法表達對 AI 爬蟲的明確立場
- **影響：** 無法向 AI 系統展示「歡迎引用」的意圖；也缺少 /llms.txt 做引導
- **修法：** 決定 AI 爬蟲策略（建議：全部開放 + 建 /llms.txt），或個別爬蟲明確 Allow/Disallow

---

## Low Priority（backlog）

### 8. og:image 缺 width/height 屬性
- 影響：Facebook/LINE 分享時圖片裁切可能不正確
- 修法：加 `og:image:width=1200` / `og:image:height=630`（確保圖片本身尺寸符合）

### 9. Sitemap 重複（auvita.tw 和 www.auvita.tw 都回傳同一份）
- 影響：技術上無害，但造成混淆
- 修法：解決 Critical Issue #1 後自動消除

---

## 原始資料摘要（各腳本輸出）

| 腳本 | 關鍵數字 |
|---|---|
| robots_checker | status 200、Sitemap: auvita.tw/sitemap.xml、AI crawlers: all "not managed" |
| security_headers | score 25/100、6 headers missing |
| redirect_checker | 1 hop, 302, 521ms total |
| sitemap_checker | 21 URLs、all missing lastmod、44 issues |
| canonical_checker | www.auvita.tw/zh-TW → canonical: auvita.tw/zh-TW |
| js_render_audit | title OK、H1: 1、schema: 2、word_count: 1140、Playwright N/A |
| social_meta | score 85/100、all OG+Twitter present、missing image dimensions |
| pagespeed | rate-limited (Environment limitation) |
