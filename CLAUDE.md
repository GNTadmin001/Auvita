# CLAUDE.md — AUVITA 官網接手說明

## 你拿到的是什麼

Next.js 15 / React 19 靜態網站，部署在 https://www.auvita.tw。
原始碼 repo：GNTadmin001/Auvita（private）
push main → GitHub Actions 自動 FTP 上傳，**不需要手動部署**。

---

## 技術棧一句話

```
Next.js 15 App Router  +  output: 'export'（純靜態 HTML）
next-intl（zh-TW / en / ja 多語）
CSS modules-free，所有樣式在 app/*.css
FTP deploy via GitHub Actions (.github/workflows/deploy-on-push.yml)
```

---

## 目錄結構重點

| 路徑 | 說明 |
|------|------|
| `app/[locale]/` | 所有頁面路由（zh-TW 為主） |
| `components/*.tsx` | 頁面元件，一個檔案一個區塊 |
| `lib/products.ts` | **商品資料唯一真相**，改商品在這裡 |
| `lib/home.layout.ts` | 首頁 Origins、Scenes 等圖片對應 |
| `locales/zh-TW.json` | 中文文案唯一真相 |
| `data/promotions/` | 行銷活動 JSON（active.json 驅動 /news 頁） |
| `public/images/` | 靜態圖片（子目錄對應頁面） |
| `app/site.css` | Header / Footer / 全站共用樣式 |
| `app/auvita.css` | 首頁各 section 樣式 |

---

## 常見修改位置

### 改文案
→ `locales/zh-TW.json`，key 結構與 component 內 `useTranslations('xxx')` 對應。

### 改商品（加/刪/改規格、價格、圖片）
→ `lib/products.ts` 的 `PRODUCTS` 陣列。

### 改首頁圖片
→ `lib/home.layout.ts`（origins、scenes、gifts、news 等各 section 圖片路徑）。

### 改 Header logo 大小
→ `app/site.css`，`.site-head .brand .wm .wm-logo { height: NNpx; }`

### 改行銷活動（/news 頁）
→ `data/promotions/` 目錄下的 JSON 檔，active.json 由 GitHub Actions 每日自動輪替。

---

## 鐵律

1. **不要動 `.github/workflows/`** — deploy pipeline 已調好，亂改會斷上線。
2. **不要在 `app/[locale]/` 以外新增路由** — 多語 middleware 只認這層。
3. **圖片放 `public/images/` 對應子目錄**，路徑在程式碼中用 `/images/xxx` 引用。
4. **商品 ID 一旦上線不能改**（URL 會變、書籤失效）。
5. **CSS 不用 Tailwind**，全部手寫在 `app/*.css`，不要引入新 CSS 框架。
6. **多語文案只維護 zh-TW**（en/ja 目前為佔位，不用同步）。

---

## 本機開發

```bash
npm install          # 第一次
npm run dev          # http://localhost:3000
npm run build        # 確認靜態輸出無錯誤再 push
```

build 成功 = push 即上線（約 2 分鐘後生效）。

---

## 不需要附給接手者的檔案

以下在本機存在但**不需要傳遞**給接手 Claude/開發者：

| 排除項目 | 原因 |
|----------|------|
| `node_modules/`（437 MB） | `npm install` 自動還原，絕對不要壓縮傳送 |
| `.next/`（build 快取） | 本機 build artifact，接手者自己 build |
| `out/`（靜態輸出） | 同上，push 後 Actions 會重新 build |
| `.env`、`.env.local` | 若有敏感金鑰在此，不可外傳；接手者自行索取 |
| `.claude/`（Claude Code 本機設定） | 個人工具設定，與原始碼無關 |
| `tsconfig.tsbuildinfo` | 編譯快取，自動生成 |
| `seo-reports/`（本機分析報告） | 非程式碼，可選擇性附上參考用 |
| `STAGE2_PLAN.md` | 內部規劃文件，接手者不需要 |
| `.git/`（git 歷史） | 若用 zip 傳送則不含；若用 git clone 則自動帶 |

**最小必要傳送清單**（直接 `git clone` 最方便，或 zip 時包含以下）：

```
app/
components/
data/
i18n/
lib/
locales/
middleware.ts
next.config.ts
package.json
package-lock.json
public/
scripts/
tsconfig.json
types/
.gitignore
.github/
CLAUDE.md
README.md
eslint.config.mjs
```

---

## 接手後第一件事

1. `git clone https://github.com/GNTadmin001/Auvita.git`
2. `npm install`
3. `npm run dev` — 確認本機能跑
4. 看 `README.md` 了解整體架構
5. 需要部署權限：請向 GNTadmin001 帳號申請 repo 寫入權限，GitHub Actions Secrets 中已有 FTP 憑證
