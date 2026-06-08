# GEO Analysis Report — AUVITA (www.auvita.tw)

**GEO = Generative Engine Optimization（AI 搜尋可見度）**  
**Date:** 2026-06-08  
**Tools:** llms_txt_checker + ai_crawler_policy_matrix + entity_checker + citation_readiness + eeat_signal_checker

---

## GEO Readiness Score: 42/100

| 維度 | 分數 | 狀態 |
|---|---|---|
| AI 爬蟲可抓取性 | 80/100 | ✅ 允許（但無顯式策略）|
| llms.txt / 結構化引導 | 0/100 | ❌ 完全缺漏 |
| 品牌實體辨識度（Knowledge Graph） | 35/100 | ⚠️ sameAs 不完整 |
| AI 可引用段落品質 | 70/100 | ⚠️ 有事實性內容，但格式不佳 |
| E-E-A-T 訊號 | 21/100 | ❌ 極低 |

---

## Platform Breakdown

### Google AI Overviews
- 爬蟲（Googlebot）：✅ 允許
- Google-Extended（Gemini 訓練）：⚠️ 允許（繼承 `*`），但未顯式聲明
- 可引用性：中等（有認證、年份、技術描述，但缺 FAQ 格式段落）
- 風險：security headers 缺漏可能影響信任評分

### ChatGPT / Perplexity
- GPTBot：✅ 允許（繼承 `*`）
- ChatGPT-User：✅ 允許
- PerplexityBot：✅ 允許
- 問題：**無 /llms.txt 導引**，AI 爬蟲只能靠 sitemap 和 robots.txt 自行判斷
- Wikidata 找到的 Q41372799 是同名人物（非品牌），AI 問及 AUVITA 可能混淆

### Claude (Anthropic)
- ClaudeBot：✅ 允許（繼承 `*`）
- anthropic-ai：✅ 允許

---

## AI 爬蟲政策詳情

```
robots.txt (https://www.auvita.tw/robots.txt)
─────────────────────────────────────────────
User-agent: *
Allow: /
Disallow: /*/checkout
Disallow: /*/product
Sitemap: https://auvita.tw/sitemap.xml  ← 無 www（inconsistency）
```

| 爬蟲 | 政策 | 說明 |
|---|---|---|
| GPTBot | allowed | 繼承 `*` |
| ChatGPT-User | allowed | 繼承 `*` |
| ClaudeBot | allowed | 繼承 `*` |
| PerplexityBot | allowed | 繼承 `*` |
| Google-Extended | allowed | 繼承 `*`（Gemini 訓練） |
| Applebot-Extended | allowed | 繼承 `*` |
| Bytespider（TikTok）| allowed | 繼承 `*` |
| CCBot（Common Crawl）| allowed | 繼承 `*` |
| Amazonbot | allowed | 繼承 `*` |

**結論：** 所有 AI 爬蟲目前均可抓取（alignment: allowed_without_llms_txt）  
**建議：** 保持開放（被 AI 引用 = 免費品牌曝光）+ 建立 /llms.txt 引導爬蟲優先讀取高品質頁面

---

## /llms.txt 狀態

| 檔案 | HTTP 狀態 | 分數 |
|---|---|---|
| https://www.auvita.tw/llms.txt | 404 Not Found | 0/100 |
| https://www.auvita.tw/llms-full.txt | 404 Not Found | — |

**建議內容（/llms.txt 範本）：**
```markdown
# AUVITA

> 台灣唯一合法食用金製造商，GNT 京華堂，TWSE 1267。PVD 物理氣相沉積製程，9999 純金，三國認證（EU E175、TFDA、SNQ），20+ 年研發。

## 重點頁面
- [品牌與技術](https://www.auvita.tw/zh-TW/brand-tech)：PVD 製程、9999 純度說明
- [產品應用](https://www.auvita.tw/zh-TW/applications)：食用金箔、奈米金、奈米銀
- [金的歷史](https://www.auvita.tw/zh-TW/gold-history)：食用金歷史背景
- [產品選購](https://www.auvita.tw/zh-TW/shop)：官方授權商品

## 認證資訊
SNQ 國家品質標章、EU E175、美國 FDA、HALAL

## 聯絡
https://www.auvita.tw/zh-TW/contact
```
（此為 markdown 格式的 /llms.txt，放在 /public/llms.txt 即可）

---

## 品牌實體辨識度

### 現有 sameAs
- gnt.com.tw ✅（Low KG signal）
- goldinalliance.com ✅（Low KG signal）

### 缺漏 sameAs（影響 AI 品牌辨識）
| 平台 | KG 訊號 | 優先 |
|---|---|---|
| Wikipedia | Critical | 有則加；品牌本身可能尚未達 notability 門檻 |
| Wikidata | Critical | Q41372799 ≠ 此品牌，勿誤加 |
| LinkedIn | High | 加公司 LinkedIn 頁 URL |
| Twitter/X | High | 加官方帳號 URL |
| Facebook | High | 加官方粉絲頁 URL |
| Instagram | High | 加官方帳號 URL |

---

## AI 可引用段落品質

**citation_readiness score: 70/100**

品牌頁面有可引用的高品質事實性段落：
1. **PVD 技術描述：** "當黃金不需被搥打、不再被溶解——而是化為分子的光，在真空中凝結成 100 nm 純金薄膜。9999 純度，SGS 第三方檢測，這就是汽化金。" → **confidence: Confirmed（直接引述）**
2. **1993 年成立：** "1993 年，京華堂以冷凝技術，將黃金帶進了生醫運用。"
3. **食用金箔薄度：** "食用金箔薄度僅 100 nm，約傳統槌打金箔的四分之一；純度 9999，每批 SGS 檢測。"

**問題：** 這些段落分散在長頁面中，未以 FAQ 格式（問→答）組織，AI 摘要時較難精準引用

---

## SSR 檢查

- Playwright 未安裝（Environment limitation）
- 從靜態 HTML 解析：title、meta description、H1、JSON-LD 均在初始 HTML 中可見
- **推斷：** 網站為 Next.js SSR（Server-Side Rendering）或 SSG，AI 爬蟲可直接讀取完整內容
- **confidence: Hypothesis**（未做 headless render 比對）

---

## Top 5 GEO 改動建議

1. **建立 /llms.txt**（1-2 小時）— 最高 ROI；讓 AI 爬蟲知道應優先讀哪些頁面
2. **補 Organization sameAs**（LinkedIn、Facebook、Instagram、Twitter/X）— Knowledge Graph 訊號
3. **在品牌技術頁加 FAQ 格式段落**（10-15 個 Q&A）— 提升 AI 摘要引用可能性
4. **修正 E-E-A-T 訊號**（score 21/100）— 加作者/團隊頁、認證 badge schema、TWSE 1267 badge
5. **解決 www vs non-www**（見 TECHNICAL-AUDIT Critical #1）— 品牌實體統一訊號

---

## 決策備忘（來自 NEXT_SESSION.md）

- GPTBot 策略：**保持開放**（被 AI 引用 = 免費品牌曝光）
- /llms.txt 建立：屬 NEXT_SESSION.md 的 P2 項目，待本次 audit 後排入開發
