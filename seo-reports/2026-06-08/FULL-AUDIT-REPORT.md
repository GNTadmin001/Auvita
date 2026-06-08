# Full SEO Audit Report — AUVITA (www.auvita.tw)

**Date:** 2026-06-08  
**Baseline:** 上線後第一次全套健檢（Stage 1–4 上線後）  
**執行方式：** SEO Skill 底層腳本（truststore + runpy，Playwright N/A）  
**覆蓋頁面：** 9 頁（depth 2 爬取；/zh-TW, /shop, /brand-tech, /applications, /gold-history, /contact, /news, /product, /checkout）

---

## 三個關鍵分數

| 分數 | 數值 | 評語 |
|---|---|---|
| **Technical Score** | **58/100** | 安全標頭 + canonical 衝突是主要扣分點 |
| **Audit Score** | **52/100** | E-E-A-T 極低（21/100）拉低整體；內容品質佳 |
| **GEO Readiness** | **42/100** | AI 爬蟲開放、但缺 /llms.txt 與 sameAs 佈局 |

---

## 1. Technical Agent 發現

### 1.1 Crawlability（70/100）
- ✅ robots.txt HTTP 200，格式正確
- ✅ sitemap.xml 存在，21 個 URL，三語（zh-TW/en/ja）
- ✅ /*/checkout 和 /*/product 正確 Disallow（避免爬蟲抓購物流程）
- ⚠️ robots.txt `Sitemap:` 宣告使用 `auvita.tw`（無 www），與實際服務域名不一致
- ⚠️ 11 個 AI 爬蟲均未顯式管理（繼承 `*` Allow）
- ℹ️ sitemap 中包含 en/ja 路徑——如果 AUVITA 定位為 zh-TW 單語，應評估是否移除或補充英日文內容

### 1.2 Indexability（55/100）
- ❌ **Critical：www vs non-www canonical 衝突**
  - 網站在 `www.auvita.tw` 服務
  - canonical tag 指向 `auvita.tw/zh-TW`（無 www）
  - OG `og:url` = `auvita.tw/zh-TW`
  - Organization schema `@id` = `https://auvita.tw/#organization`
  - sitemap 全部 URL = `auvita.tw/...`
  - **結果：** Google 收到的訊號互相矛盾；兩個域名各自積累 authority
- ⚠️ 主頁 302 redirect（/ → /zh-TW）應改 301；PageRank 不完全傳遞
- ✅ meta robots 未設定（允許抓取）
- ✅ H1 = 1 個（"永恆光輝的色彩"）

### 1.3 Security（25/100）
- ✅ HTTPS 啟用
- ❌ HSTS（Strict-Transport-Security）缺漏
- ❌ CSP（Content-Security-Policy）缺漏
- ❌ X-Frame-Options 缺漏
- ❌ X-Content-Type-Options 缺漏
- ❌ Referrer-Policy 缺漏
- ❌ Permissions-Policy 缺漏
- **只有 HTTPS，其餘 6 項全無**

### 1.4 URL Structure（65/100）
- ✅ 乾淨語意 URL（/zh-TW/brand-tech 等）
- ✅ 無 URL 超過 100 字
- ✅ 無循環 redirect
- ⚠️ 302 應改 301（永久重定向）
- ⚠️ www vs non-www 不一致（延伸 1.2 問題）

### 1.5 Mobile（85/100）
- ✅ `<meta name="viewport" content="width=device-width, initial-scale=1">` 正確
- ✅ 響應式設計（Next.js）
- ✅ H1 存在
- ⚠️ 行動版 CWV 數字需從 PSI 結果確認（Environment limitation）
- PSI 用戶已跑完（mobile）：https://pagespeed.web.dev/analysis/https-www-auvita-tw-zh-TW/bho8qfalte?form_factor=mobile

### 1.6 Core Web Vitals（N/A — Environment limitation）
- PSI API rate-limited（本機無 PAGESPEED_API_KEY）
- 請從用戶提供的 PSI URL 確認 LCP / INP / CLS
- CWV 閾值：LCP < 2.5s ✅、INP < 200ms ✅、CLS < 0.1 ✅（"good"）
- 若任一為 "needs improvement" 或 "poor" → 移至 High Priority

### 1.7 Structured Data（60/100）
- ✅ Organization schema 存在（含 alternateName 和 sameAs）
- ✅ WebSite schema 存在（含 publisher 引用）
- ⚠️ Organization `url`/`@id` 使用 non-www
- ❌ Product schema 7 個全部缺 `image`、`sku`
- ❌ 2 個 Product 缺 `price`（error 級）
- ❌ 缺 BreadcrumbList（每頁）
- ❌ 缺 LocalBusiness（有實體地址）
- ❌ 缺 FAQPage

### 1.8 JS Rendering（75/100）
- ✅ title、meta description、H1、JSON-LD 均在初始 HTML 可見（SSR 訊號）
- ⚠️ Playwright 未安裝（無法做 headless render 比對）
- **confidence: Hypothesis**（推斷 Next.js SSR，Googlebot 應可正常渲染）
- 建議：上線後 Google Search Console > URL Inspection > 「以 Google 身分測試」確認 rendered HTML

---

## 2. Content Agent 發現

### 2.1 頁面內容品質
- ✅ 首頁 word count：1,140（充足）
- ✅ Meta description 包含關鍵差異化點（PVD 製程、9999 純金、三國認證、20 年研發）
- ✅ H1 存在（但非關鍵字優化：「永恆光輝的色彩」→ 品牌詩意優先）
- ⚠️ news 頁目前無外連連結（outgoing links: 0），顯示文章尚未填充
- ⚠️ 文案以中文為主，但 sitemap 包含 en/ja 路徑（等待多語內容）

### 2.2 E-E-A-T 訊號（21/100 — 極低）
- ❌ 無作者/撰稿人資訊
- ❌ 無學術或業界資歷標示
- ❌ 無編輯政策或審核流程頁面
- ❌ 無真實用戶評論或案例研究
- ⚠️ 有 3 個外部引用連結（數量偏少）
- ⚠️ 認證（SGS、SNQ、TFDA、EU E175）有提及但未以結構化方式呈現
- ✅ TWSE 1267 上市公司資訊在 footer（強訊號，但未入 schema）
- ✅ 接觸頁有實體地址（台北市內湖區瑞光路 258 巷 52 號）

### 2.3 內部連結
- 9 頁爬取，59 個內部連結
- ⚠️ checkout 頁為孤兒頁（只有 1 個內部連結）
- ⚠️ anchor text 大量重複（導覽文字如「選購」、「聯絡我們」重複 8 次）
- ⚠️ news 頁有 0 個外連連結（活動內容尚未填充）

---

## 3. Schema Agent 發現（摘要）

→ 詳見 `SCHEMA-REPORT.md`

**關鍵問題：**
- Organization + WebSite 存在，但 www vs non-www 不一致
- Product schema 7 個全部缺 image + sku；2 個缺 price → Rich Results 無法顯示
- 缺 BreadcrumbList、LocalBusiness、FAQPage

---

## 4. Performance Agent 發現

→ CWV 數據需從 PSI 結果確認（Environment limitation）

**已知效能影響因素：**
- FTP deploy 架構（從 GitHub Actions push 到 FTP 主機）—靜態 HTML 輸出，效能應佳
- 首頁圖片量多（gold imagery, product cards）—確認 LCP 圖是否有 loading="eager" + fetchpriority="high"
- Next.js image optimization—確認 <Image> 元件是否正確使用

---

## 5. Social/OG Agent 發現

- **Social Meta Score: 85/100**
- ✅ OG tags 齊全（title、description、image、url、type、site_name、locale）
- ✅ Twitter card = summary_large_image
- ⚠️ og:url = auvita.tw（non-www）— 與 canonical 衝突同一問題
- ⚠️ og:image 缺 width/height（1200×630 建議）
- og:image = https://auvita.tw/assets/logo-nautilus-gold.png（確認此圖尺寸）

---

## 6. 整體評估

**優勢：**
1. 技術架構健全（Next.js SSR、HTTPS、clean URLs）
2. Organization + WebSite schema 已存在（多數品牌從零開始）
3. 多語 sitemap 預先建立（zh-TW/en/ja）
4. Meta description 包含品牌差異化點
5. TWSE 1267 上市公司——強 E-E-A-T 先天優勢，只需入 schema

**主要弱點：**
1. www vs non-www 衝突是最大問題，影響整體 link equity 積累
2. Security headers 全缺——雖不直接影響排名，但影響 Core Web Vitals 相關的信任分數
3. E-E-A-T 極低——食用金是特殊品類，健康/食品相關搜尋 E-E-A-T 要求嚴格
4. Product schema 缺欄——商店功能已上線但 Google 無法辨識商品詳情

---

## Appendix: 環境限制說明

| 限制 | 原因 | 影響 |
|---|---|---|
| PSI API rate-limited | 無 PAGESPEED_API_KEY | CWV 數字未取得（用戶已預跑） |
| Playwright 未安裝 | 非 skill install 範圍 | JS render 比對為 Hypothesis |
| Google KG API | 無 key | Knowledge Graph 狀態未確認 |
| 反向連結分析 | pre-launch 無 backlink 數據 | link profile 未評估（預期為空） |
