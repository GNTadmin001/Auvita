---
type: project-readme
project: 03-gold / website
repo: GNTadmin001/Auvita
deployed_url: https://www.auvita.tw
stack: Next.js 15 / React 19 / next-intl / static export
deploy: push to main → GitHub Actions → FTP upload
last_updated: 2026-06-11
---

# AUVITA 官網 — 接手說明

## 架構速覽

```
Next.js 15 App Router，output: 'export'（靜態輸出）
├── app/[locale]/              ← zh-TW 路由
│   ├── shop/                  ← 商品總覽
│   ├── product/[id]/          ← 各商品詳頁（動態路由）
│   ├── product/               ← 舊連結保留，自動 redirect → /shop
│   ├── applications/          ← 應用場景
│   ├── contact/               ← 聯絡
│   └── checkout/              ← 結帳（前端流程）
├── components/
│   ├── Shop.tsx               ← 商品總覽元件
│   ├── Product.tsx            ← 商品詳頁模板（所有商品共用）
│   └── PdfFlipViewer.tsx      ← PDF DM viewer（CDN 載入 pdfjs）
├── lib/
│   └── products.ts            ← 商品資料單一真相
├── public/
│   ├── images/products/       ← 商品圖片
│   └── documents/             ← 商品 PDF DM
└── locales/zh-TW.json         ← UI 文字（非商品內容）
```

---

## 商品管理架構決策（2026-06-11 定案）

### 資料分層

| 層級 | 存放位置 | 負責內容 | 更新方式 |
|------|----------|---------|---------|
| **靜態內容** | `lib/products.ts` | 商品名稱、描述、規格表、使用步驟、圖片路徑、認證標章、PDF 連結 | 直接改原始碼 → commit → push |
| **動態欄位** | `data/products-dynamic.json`（**尚未建置**） | 原價格、折扣比例、活動名稱與日期、是否上架 | Google Sheet → n8n → GitHub push → CI rebuild |

### 為什麼這樣分？

Google Sheet 可記錄的數據 ＜ 網站想呈現的內容。商品規格、說明、照片無法靠 Sheet 管理，且這類內容改動頻率低（上新商品才需要）。高頻的價格/促銷異動才用 Sheet→n8n 自動化。

### 動態欄位規劃（尚未實作）

```json
{
  "foil-leaf": {
    "price": 1280,
    "discount": 0.9,
    "promo": { "label": "618 限定", "endsAt": "2026-06-18" },
    "visible": true
  }
}
```

上架狀態 `visible: false` → 商品半透明、無法加入購物車。
有 `promo` → 商品卡顯示紅布條活動名稱。

---

## SOP — 新增商品

1. **備妥商品圖** → 放入 `public/images/products/<id>.jpg`（建議 900×900px，< 200 KB）
2. **編輯 `lib/products.ts`**，在 `PRODUCTS` 陣列末尾（同 fam 群組內）新增一筆：

```typescript
{
  id: 'foil-xxx',          // 唯一 ID，用於 URL /product/foil-xxx
  zh: '中文商品名',
  en: 'English Name',
  family: '金箔',           // 購物車顯示用，同 fam 群的中文名稱
  fam: 'foil',             // 篩選 key：'foil' | 'vaporize'
  price: 1280,
  kw: 'gold,keyword',      // loremflickr fallback 關鍵字（無圖時用）
  lock: 42,                // loremflickr 圖片 seed（隨意填一個數字）
  img: '/images/products/foil-xxx.jpg',
  desc: '商品卡短描述（30字以內）',
  // ── 詳頁欄位（選填，不填則降級顯示）──
  tag: '最受歡迎',
  unit: '禮盒（10 片裝）',
  longDesc: '詳頁長段落描述...',
  specs: [
    ['純度 Purity', '9999'],
    // ...
  ],
  steps: [
    ['01', '步驟標題', '步驟說明'],
    // ...
  ],
  thumbImgs:   ['/images/products/foil-xxx.jpg'],
  thumbLabels: ['正面'],
  thumbKw:     ['gold'],
  certs: ['TFDA', 'SGS'],
}
```

3. **Push → 自動 deploy**（GitHub Actions → FTP）

> **不需要**建新的 `page.tsx`。`app/[locale]/product/[id]/page.tsx` 的 `generateStaticParams()` 會自動讀 PRODUCTS，每次 build 都重新生成所有商品的靜態頁面。

---

## SOP — 更新現有商品

### 改文字 / 規格 / 步驟

直接編輯 `lib/products.ts` 對應商品的欄位 → commit → push。

### 換圖片

1. 新圖片放 `public/images/products/<id>.jpg`（覆蓋舊檔）
2. 更新 `products.ts` 的 `img` / `thumbImgs` 路徑（如有更名）
3. commit → push

### 改價格（現階段，動態 JSON 尚未建置）

直接改 `products.ts` 的 `price` 欄位 → commit → push。

### 下架商品

兩個選項（取其一）：
- **暫時下架**：把 `ph: true` 改成 `noOnline: true`（仍顯示但無法購買），或等動態 JSON 建置後設 `visible: false`
- **永久移除**：從 `PRODUCTS` 陣列刪除這筆資料 → 頁面自動消失

---

## SOP — 商品家族 / 群組

如需新增篩選分類（例如新增「禮品套組」家族）：

1. `PRODUCTS` 裡新商品填 `fam: 'gift'`
2. `FAMILIES` 陣列加 `{ key: 'gift', zh: '禮品套組' }`
3. `GROUPS` 陣列加對應的 group 物件（含 `note` 說明）

---

## 特殊商品：Gold Leaf Wine（foil-wine）

此商品有 `pdfUrl: '/documents/foil-wine-dm.pdf'`，行為不同：
- **商品卡**：點圖片 / CTA 按鈕 → 開啟 PDF modal（非跳轉詳頁）
- **詳頁** `/product/foil-wine`：有「查看商品 DM」按鈕 → 同樣開啟 modal
- PDF viewer 使用 CDN 載入 pdfjs-dist（`new Function('return import(url)')()` 繞過 webpack）

原因：pdfjs-dist v5 是 ESM 格式，webpack 5 CommonJS shim 插入 `undefined` 給 `exports`，導致 `Object.defineProperty` 報錯。CDN 動態載入讓瀏覽器原生 ESM loader 處理，完全繞開此問題。

---

## 本機開發

```bash
npm install
npm run dev      # http://localhost:3000
```

## 部署

```bash
git push origin main   # 觸發 GitHub Actions → FTP deploy
```

CI workflow 位於 `.github/workflows/`。部署後約 1–2 分鐘可見於 https://www.auvita.tw。
