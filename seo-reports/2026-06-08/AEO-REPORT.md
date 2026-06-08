# AEO Report — AUVITA (www.auvita.tw)

**AEO = Answer Engine Optimization（問答引擎優化）**  
**Date:** 2026-06-08  
**工具：** answer_block_scanner + entity_checker + citation_readiness  
**決策：** 本次只評估，不立刻實作

---

## AEO Readiness: 20/100（偏低）

| 評估面向 | 狀態 | 說明 |
|---|---|---|
| Featured Snippet 可奪取性 | ❌ 0/100 | 無問答格式段落，無法觸發 |
| People Also Ask (PAA) 覆蓋 | ❌ 低 | 頁面無 FAQ/Q&A 結構 |
| Knowledge Panel 訊號 | ⚠️ 部分 | Organization schema 存在但 sameAs 不完整 |
| Sitelinks Searchbox | ⚠️ 未設 | 無 SearchAction schema（小站可稍後再加） |
| Voice Search 就緒度 | ❌ 低 | 無 speakable schema；無 TTFB 數據可評 |

---

## Featured Snippet 分析

**answer_block_scanner score: 0/100**

**現況：** 首頁（/zh-TW）無任何符合 Featured Snippet 條件的段落：
- ❌ 無「問題標題 → 20-70 字直接回答段落」結構
- ❌ 無簡潔定義段落（「什麼是食用金？」→ 一段直接回答）
- ❌ 無條列式或表格格式的 snippet-friendly 內容

**潛在可奪取的關鍵字（Hypothesis）：**

| 關鍵字 | 搜尋意圖 | 目前就緒度 |
|---|---|---|
| 食用金箔是什麼 | 資訊 | ❌ 頁面無定義段落 |
| 食用金安全嗎 | 資訊 | ❌ 有 SGS 認證文字但無 FAQ 格式 |
| 食用金的食品認證 | 資訊 | ❌ 認證散落在頁面中 |
| 食用金箔台灣 | 商業 | ⚠️ 有品牌頁但無針對性段落 |
| PVD 食用金 | 技術 | ⚠️ 有技術說明但未以 Q&A 呈現 |
| 9999 純金食品 | 商業 | ⚠️ 有內容但格式不佳 |

---

## People Also Ask (PAA) 覆蓋

**現況評估（Hypothesis — 需 Google SERP 實際查看）：**

PAA 問題（推斷常見問題）：

| 潛在 PAA 問題 | 品牌頁面有回答嗎？ | 建議動作 |
|---|---|---|
| 食用金箔對人體有害嗎？ | ❌ 無明確 Q&A | 加 FAQPage schema |
| 食用金箔的認證有哪些？ | ⚠️ 有提及但無格式 | 加條列說明 + FAQPage |
| 食用金箔怎麼使用？ | ⚠️ Applications 頁有圖解 | 補文字 Q&A |
| 奈米金和金箔有什麼不同？ | ⚠️ 有技術說明但散落 | 整理成 Q&A 格式 |
| 京華堂是公開上市公司嗎？ | ❌ Footer 有 TWSE 1267 但無 schema | 加入 Organization schema |

---

## Knowledge Panel 訊號

| 訊號 | 狀態 | 說明 |
|---|---|---|
| Wikipedia 頁面 | ❌ 未找到 | "AUVITA" 品牌無 Wikipedia 條目 |
| Wikidata QID | ⚠️ 注意 | Q41372799 = 同名人物，非本品牌 |
| Google Knowledge Graph | ⚠️ 未確認 | Google KG API 未查（無 key） |
| Organization schema `@id` | ✅ 存在 | 但 URL 為 non-www（需修正） |
| sameAs LinkedIn/Social | ❌ 缺漏 | 影響 Knowledge Panel 資訊豐富度 |
| TWSE 1267 / 公開上市 | ❌ 未入 schema | 上市公司訊號是強 E-E-A-T 佐證 |

---

## Voice Search 就緒度

| 檢查項 | 狀態 | 說明 |
|---|---|---|
| HTTPS | ✅ | Voice search 必要條件 |
| speakable schema | ❌ | 未設；Google Assistant 無法識別最佳回答段落 |
| 問題格式 H 標籤 | ❌ | 無 FAQ 式標題 |
| TTFB < 2s | — | Environment limitation（PSI 未取得） |

---

## AEO 改動建議（優先順序）

> **本次只評估，不立刻實作。** 以下排序供下一 sprint 規劃參考。

| 優先 | 改動 | 預估工時 | 預期影響 |
|---|---|---|---|
| P1 | 在品牌技術頁（/brand-tech）加 10-15 個 Q&A 段落 + FAQPage schema | 4-6h | 觸發 PAA + Featured Snippet |
| P1 | 加 FAQPage schema 到首頁（6-8 個食用金常見問題） | 2h | 擴大 SERP 佔據面積 |
| P2 | 將 TWSE 1267 / 認證資訊加入 Organization schema | 1h | Knowledge Panel 資訊豐富度 |
| P2 | 建立公司 Wikidata 條目（若符合 notability 標準） | 4-8h | Knowledge Panel 觸發 |
| P3 | 加 speakable schema 到首頁和品牌技術頁 | 1h | Google Assistant 引用 |
| P3 | 加 SearchAction schema（Sitelinks Searchbox） | 0.5h | SERP 搜尋框顯示 |

---

## 建議 FAQPage Schema 範本（供 P1 參考）

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "食用金箔對人體安全嗎？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "是的。AUVITA 食用金箔經歐盟 E175、台灣衛福部（TFDA）及 SNQ 國家品質標章三重認證，每批次均由 SGS 第三方實驗室檢測，純度達 9999（99.99%）。黃金在體內不被吸收，安全通過腸道排出。"
      }
    },
    {
      "@type": "Question",
      "name": "汽化金（PVD 金箔）和傳統金箔有什麼不同？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "傳統金箔以槌打方式延展，厚度約 400 nm。AUVITA 的汽化金採用 PVD（物理氣相沉積）製程，在真空中將黃金加熱至氣態後沉積，厚度僅 100 nm，為傳統金箔的四分之一，純度更高、分佈更均勻。"
      }
    },
    {
      "@type": "Question",
      "name": "食用金箔有哪些認證？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AUVITA 食用金箔持有：歐盟食品添加物認證 E175、台灣衛福部 TFDA 許可、SNQ 國家品質標章（台灣）、HALAL 清真認證。每批次由 SGS 第三方機構檢驗，純度保證 9999。"
      }
    }
  ]
}
```

---

## 下一步（待使用者確認後排入 sprint）

- [ ] P1：brand-tech 頁 FAQ 段落撰寫 + FAQPage schema 實作
- [ ] P1：首頁 FAQPage schema（6-8 個問題）
- [ ] P2：Organization schema 補 TWSE / 認證欄位
- [ ] P3：speakable schema 設定
