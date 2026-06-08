# Schema Analysis Report — AUVITA (www.auvita.tw)

**Date:** 2026-06-08  
**Tool:** product_schema_checker + entity_checker + 直接 JSON-LD 解析  
**Target:** https://www.auvita.tw/zh-TW（主頁）+ /zh-TW/shop（商店）

---

## 現有 JSON-LD 偵測

### 首頁（/zh-TW）— 2 個 schema

#### Schema 1: Organization ✅（存在，但有缺欄）
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://auvita.tw/#organization",
  "name": "AUVITA",
  "alternateName": ["京華堂", "GNT 京華堂", "Gold Nanotech"],
  "url": "https://auvita.tw",
  "logo": "https://auvita.tw/assets/logo-nautilus-gold.png",
  "foundingDate": "1993",
  "description": "台灣唯一合法食用金製造商；以 PVD 物理氣相沉積製程生產 9999 純金金箔、金粉、奈米金、奈米銀。",
  "sameAs": [
    "http://www.gnt.com.tw",
    "https://www.goldinalliance.com"
  ]
}
```
**缺漏欄位：**
- `contactPoint`（Google 知識面板需要）
- `address`（LocalBusiness 訊號；footer 有地址但未入 schema）
- `telephone`
- 社群媒體 `sameAs`（LinkedIn、Facebook、Instagram、Twitter/X）
- TWSE 上市資訊（`identifier` 或 `award`）
- 認證資訊（SNQ、EU E175、TFDA、HALAL）
- **⚠️ `url` 和 `@id` 使用 `auvita.tw`（無 www），與網站實際服務 URL `www.auvita.tw` 不一致**

#### Schema 2: WebSite ✅（基本正確）
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://auvita.tw/#website",
  "url": "https://auvita.tw",
  "name": "AUVITA",
  "publisher": { "@id": "https://auvita.tw/#organization" },
  "inLanguage": ["zh-TW", "en", "ja"]
}
```
**缺漏：** SearchAction（Sitelinks Searchbox）—小站可先不加

---

### 商店頁（/zh-TW/shop）— 7 個 Product schema

**所有 7 個商品的共同問題：**

| 問題 | 嚴重度 | 影響 |
|---|---|---|
| 缺 `image` | ⚠️ Warning | Google 商品卡片不顯示圖片 |
| 缺 `sku`/`gtin`/`mpn` | ⚠️ Warning | 無法在 Google 購物結果識別唯一商品 |
| 缺 `shippingDetails` | ℹ️ Info | 購物頁無法顯示運費資訊 |
| 缺 `hasMerchantReturnPolicy` | ℹ️ Info | 商品卡片無法顯示退貨政策 |

**額外問題（2 個商品）：**
- 缺 `price`/`lowPrice` → **❌ Error** → Google Rich Results 驗證工具會報錯，直接導致不顯示商品片段

---

## 缺漏的 Schema 類型

| Schema 類型 | 優先級 | 用途 |
|---|---|---|
| `BreadcrumbList` | High | 每個頁面應有；提升 SERP 麵包屑顯示 |
| `LocalBusiness` | High | 有實體地址（台北市內湖區瑞光路 258 巷 52 號）應加 |
| `FAQPage` | Medium | 若品牌技術頁/FAQ 頁有 Q&A 格式即可加 |
| `speakable` | Low | 語音搜尋（Google Assistant）引導 |

---

## 驗證問題摘要

| 嚴重度 | 數量 | 主要問題 |
|---|---|---|
| ❌ Error | 2 | Product 缺 price |
| ⚠️ Warning | 14 | 所有 Product 缺 image、sku |
| ℹ️ Info | 28 | 所有 Product 缺 shippingDetails、returnPolicy |
| Organization | 1 | www vs non-www @id 不一致 |

---

## sameAs 分析（Knowledge Graph 訊號）

| 平台 | 狀態 | KG 訊號強度 | 建議 |
|---|---|---|---|
| gnt.com.tw | ✅ 已加 | Low | 保留 |
| goldinalliance.com | ✅ 已加 | Low | 保留 |
| Wikipedia | ❌ 缺漏 | **Critical** | 先確認有無品牌 Wikipedia 頁；有則加入 |
| Wikidata | ❌ 缺漏 | **Critical** | 找到現有 Wikidata QID 再加（Q41372799 是同名人物，非此品牌） |
| LinkedIn | ❌ 缺漏 | High | 找到公司 LinkedIn 頁面後加入 |
| Twitter/X | ❌ 缺漏 | High | 找到官方帳號後加入 |
| Facebook | ❌ 未偵測 | High | 找到官方粉絲頁後加入 |
| Instagram | ❌ 未偵測 | High | 找到官方帳號後加入 |

> **重要：** Wikidata Q41372799 是「Auvita Rapilla（巴布亞紐幾內亞奧委會秘書長）」，與本品牌無關。**請勿**將此 QID 加入 sameAs。需要時，先確認是否有正確的品牌 Wikidata 條目，若無則考慮建立（需符合 notability 標準）。

---

## 建議 Schema 套用順序

1. **立刻（Critical + High）：**
   - 更新 Organization `url`/`@id` 為 `https://www.auvita.tw`（配合解決 www 問題）
   - 補 Organization `contactPoint`、`address`
   - 補 Product schema `image`、`sku`、`price`（2 個缺 price 的先補）
   - 加入 `BreadcrumbList`（每頁）

2. **1 個月內（Medium）：**
   - 加入 `LocalBusiness` schema
   - 補 Organization `sameAs`（LinkedIn、Facebook、Instagram）
   - 補所有 Product 的 `shippingDetails` 和 `hasMerchantReturnPolicy`

3. **Backlog（Low）：**
   - FAQPage（若有 FAQ 內容）
   - speakable
   - 認證資訊的結構化表達

---

## 下一步：generated-schema.json

本次同步產出 `generated-schema.json`，包含：
- 修正後的 Organization schema（www 版本 + 補全欄位）
- 修正後的 WebSite schema（含 SearchAction 範本）
- LocalBusiness schema
- Product template（`[FILL_IN]` 佔位符供 Sheet→n8n pipeline 填入）
- BreadcrumbList template

將此檔存入 Auvita repo，作為 Schema 設計的 source of truth。
