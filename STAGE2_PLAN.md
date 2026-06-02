# Stage 2 計畫 — AUVITA 官網移植到 Next.js（搬版面）

> 給接手的 session / sub-agent：本文件是 Stage 2 的單一真相。讀完即可動工，不需回頭問。
> 上層任務脈絡見 `../README.md`；整體 4-Stage 路線圖見本檔最後一節。

---

## 0. 一句話目標

把 AUVITA 設計（瀏覽器 CDN React + Babel 即時編譯的 .jsx）搬進已建好的 Next.js 15 骨架，
**畫面與原站一致**、`window.XXX` 全域改成 `import/export`、純 CSS 原樣 global import。

- **狀態**：Stage 1 骨架已完成（next-intl 三語、靜態匯出、僅首頁 placeholder）。本階段 = Stage 2。
- **商務頁範圍**：✅ 全搬（9 頁 + header 購物車抽屜）。cart 維持 localStorage 前端 stub、**不接綠界金流**。
- **語言切換**：✅ 三語（繁 / EN / 日）接 next-intl 真切換。

## 1. 鐵律（逐字遵守）

1. 唯一真相是 Next.js 原始碼；改原始碼 → `npm run build` 產 `out/`；**禁止直接編輯 `out/`**。
2. 使用者可見文字放 `locales/{zh-TW,en,ja}.json`；元件內**禁止硬編碼面向用戶字串**。
   - ⚠️ Stage 2 例外：依任務指示「**首頁文字先抽進 locales**」。其餘頁面**本階段暫留內嵌中文**（能跑優先），
     完整 i18n 抽取列為待辦（見 §6 收尾），是「done」前必還的技術債。
3. 樣式沿用 AUVITA 原本純 CSS（global import）；**不要** Tailwind、不要重寫。
4. 設定檔優先「從 AeroJet 複製」而非重寫。
5. **一次只做一個子階段，每個子階段結束停下來等人工確認**，不要一口氣做完。

## 2. 來源與目標路徑

| 用途 | 路徑 |
|---|---|
| 設計原始檔（穩定參考夾） | `../design-extract-auvita/ui_kits/auvita/`（.jsx / .css / .html / README.md） |
| 根 design tokens | `../design-extract-auvita/colors_and_type.css` |
| logo 圖 | `../design-extract-auvita/assets/logo-nautilus-*.png` |
| 品牌文案參考（i18n 取材） | `../design-extract-auvita/uploads/www.auvita.tw.md` |
| Next.js 專案根 | `./`（即 `Auvita/`） |
| 架構慣例參考 | `../../../01-TDDS/website/AeroJet/`（components/ PascalCase、app/[locale]/<slug>/page.tsx） |

設計 README（必讀）：`../design-extract-auvita/ui_kits/auvita/README.md`。

## 3. 載入機制（原站 → Next.js）

原站每頁一個 `xxx.html`，依序 babel-載入：`shared.jsx → cart.jsx → site.jsx → particles.jsx → 頁面.jsx`，
最後手刻 `App()` 組合 `<Intro/> <SiteHeader/> <頁面/> <SiteFooter/>` 並 `ReactDOM.createRoot`。
所有元件/工具掛 `window.XXX` 靠 Babel 全域作用域共享。

Next.js 改法：每個 `xxx.html` → 一個 `app/[locale]/<slug>/page.tsx`，於該 server page 內組合
`<SiteHeader active=.. /> <頁面元件/> <SiteFooter/>`；全域改 import。

## 4. window.XXX → import/export 完整對照表

| 原全域 | 來源 .jsx | 目標模組 | `"use client"` | 備註 |
|---|---|---|---|---|
| `IMG` | shared | `lib/img.ts` | ❌ 純函式 | loremflickr URL builder（外部圖，靜態匯出 OK） |
| `PhImg` | shared | `components/PhImg.tsx` | ❌ | `<img>` + onError 移除 |
| `setupReveal` (+`__revealRun`/`__revealBound`) | shared | `lib/reveal.ts` | ✅ window/scroll | scroll 淡入；用 `useReveal()` hook 包，掛在各頁 |
| `Marquee` | shared | `components/Marquee.tsx` | ❌ 靜態 svg + CSS 動畫 | 食材跑馬燈 |
| `Nav`, `Footer`（legacy） | shared | **跳過** | — | README 註明已淘汰、未使用 |
| `Cart` | cart | `lib/cart.ts` | ✅ localStorage | store + pub/sub |
| `ntd` | cart | `lib/cart.ts` | ❌ 純函式 | `NT$ 1,280` 格式化 |
| `useCart` | cart | `lib/cart.ts` | ✅ hook | 訂閱 Cart |
| `CartButton`,`CartDrawer`,`BagIcon`,`QtyStep` | cart | `components/Cart*.tsx` | ✅ | header 購物車徽章 + 滑出抽屜 |
| `SiteHeader` | site | `components/SiteHeader.tsx` | ✅ scroll | + **三語切換** + nav 連結改 next-intl `Link` |
| `SiteFooter` | site | `components/SiteFooter.tsx` | ❌（連結改 `Link`） | 頁尾 |
| `Arw` | site | `components/SiteFooter.tsx` 或 `lib` | ❌ | 箭頭 svg |
| `GoldDust` | particles | `components/GoldDust.tsx` | ✅ WebGL | **Stage 3**；2A 先 STUB（空 div/靜態漸層） |
| `ogl` | index.html | （Stage 3 在 GoldDust 內 import） | — | 尚未列 dependency |
| `Intro`,`Home` | home | `components/Intro.tsx`,`components/Home.tsx` | ✅ timer/scroll | 首頁 |
| `GoldHistory` | gold-history | `components/GoldHistory.tsx` | 視內容 | |
| `BrandTech` | brand-tech | `components/BrandTech.tsx` | 視內容 | |
| `Applications` | applications | `components/Applications.tsx` | 視內容（錨點捲動） | |
| `News` | news | `components/News.tsx` | 視內容 | |
| `Contact` | contact | `components/Contact.tsx` | ✅ 表單 | |
| `Shop`,`PRODUCTS` | shop | `components/Shop.tsx` + `lib/products.ts` | ✅ 篩選/加購 | |
| `Product` | product | `components/Product.tsx` | ✅ gallery/數量/加購 | |
| `Checkout` | checkout | `components/Checkout.tsx` | ✅ 表單/cart | |

> 慣例：元件 PascalCase 放 `components/`；純工具放 `lib/`。TypeScript **先全 `any`** 沒關係，能跑優先。

## 5. 路由對照

| 原 .html | Next route | `SiteHeader active` | 備註 |
|---|---|---|---|
| index.html | `app/[locale]/page.tsx` | `home` + `transparent` | 首頁 cinematic |
| gold-history.html | `app/[locale]/gold-history/page.tsx` | `history` | |
| brand-tech.html | `app/[locale]/brand-tech/page.tsx` | `brand` | `#tech`/`#specs`/`#cert` 錨點 |
| applications.html | `app/[locale]/applications/page.tsx` | `apps` | `#foil`/`#nano-gold`/`#nano-silver` |
| news.html | `app/[locale]/news/page.tsx` | `news` | |
| contact.html | `app/[locale]/contact/page.tsx` | `contact` | `#stores` 錨點 |
| shop.html | `app/[locale]/shop/page.tsx` | `apps`（或 none） | `#foil` 等分類錨點 |
| product.html | `app/[locale]/product/page.tsx` | — | 商品詳情 |
| checkout.html | `app/[locale]/checkout/page.tsx` | — | 結帳 |

內部連結全部從 `xxx.html` 改成 next-intl `Link href="/<slug>"`（locale-aware）。外部連結（gnt.com.tw 等）維持 `<a>`。

## 6. 子階段拆解（依相依順序）

### 2A — 地基（chrome + 共用）✅ 完成（2026-06-02，build 綠燈）
- 3 個 CSS 進專案 global import，順序：`colors_and_type.css → styles.css → site.css`
  （建議放 `app/`，於 `app/[locale]/layout.tsx` 或 `globals.css` `@import`；精簡預設 globals.css 的 reset 避免衝突）。
- logo PNG ×4 → `public/assets/`，jsx 內 `../../assets/xxx.png` 改 `/assets/xxx.png`。
- `shared.jsx` → `lib/img.ts`、`lib/reveal.ts`、`components/PhImg.tsx`、`components/Marquee.tsx`。
- `cart.jsx` → `lib/cart.ts`（Cart/ntd/useCart）+ `components/CartButton.tsx`、`components/CartDrawer.tsx`。
- `site.jsx` → `components/SiteHeader.tsx`（**三語切換**接 next-intl、nav 改 Link）、`components/SiteFooter.tsx`。
  - 三語切換 pattern 參考 AeroJet `components/Header.tsx`（`usePathname` + `routing.locales`）。
- `components/GoldDust.tsx` 先 **STUB**（回傳空/靜態），確保 build 過。
- **Checkpoint 2A**：起一個臨時測試頁掛 SiteHeader+SiteFooter → header/footer 顯示正常、nav 可跳頁、三語可切、購物車抽屜可開關。`npm run build` 不報錯。
  - ✅ 已驗證：build/型別通過（嚴格模式）、靜態匯出三語、`out/` HTML 含 header/footer/marquee、CSS 66KB 含設計 tokens。
  - 產出檔：`lib/{img,reveal,cart}.ts`、`components/{PhImg,Marquee,Arw,GoldDust,CartButton,CartDrawer,SiteHeader,SiteFooter}.tsx`、`app/{colors_and_type,auvita,site,overrides}.css`、`public/assets/logo-*.png`。
  - 已知（非 bug）：nav 連到 /gold-history 等尚未建立的路由，2C/2D 建立後才不 404；首頁目前是臨時測試頁，2B 換真 Home。

### 2B — 首頁 ✅ 完成（2026-06-02，build 綠燈）
- `home.jsx` → `components/Home.tsx`（Hero/Origins/Scenes/BrandSymbol/ShopTeaser/Gifts/CTA）+ `components/Intro.tsx`。
- **首頁文字抽進 locales**：`home` namespace 完整（intro/hero/origins/scenes/symbol/shopTeaser/gifts/cta）；`<em>`/`<br>`/`foil` 用 `t.rich`、卡片陣列用 `t.raw`；`en`/`ja` 先鏡像 zh-TW（真翻譯留收尾）。
- 接 `app/[locale]/page.tsx`：`<Intro/> <SiteHeader active="home" transparent/> <Home/> <SiteFooter/>`。
- ✅ 已驗證：build/型別通過、靜態 HTML 含全部區段與 i18n 文案、rich-text 正確渲染（無逸出/無漏鍵）、透明 header `site-head over`。
- 命名：home 段 `Applications`→`Scenes`（避免與 applications 頁撞名）、`Symbol`→`BrandSymbol`（避免遮蔽全域 Symbol）。
- GoldDust 仍 stub（props 介面已定，Hero 呼叫點 Stage 3 不必再改）。

### 2C — 品牌頁 ×5 ✅ 完成（2026-06-02，build 綠燈）
- gold-history / brand-tech / applications / news / contact → 各自 `app/[locale]/<slug>/page.tsx`（server，組 Header+內容+Footer）+ `components/<Name>.tsx`（"use client"，內容 only）。
- 頁面文字**暫留內嵌中文**（i18n 留收尾批次）。
- 共用 hook：`lib/reveal.ts` 新增 `useHashScroll()`（深連結 #anchor 捲動，applications/brand-tech/contact 用）。
- ✅ 已驗證：18 頁（6 路由×3 語系）靜態匯出；`#tech/#specs/#cert`、`#foil/#nano-gold/#nano-silver`、`#stores` 錨點都在；內部連結 next-intl 自動加 locale 前綴；contact 表單/tel/外連正常。
- 已知（非 bug）：頁面內連到 `/shop`、`/product` 仍 404，待 2D 建立。

### 2D — 商務頁 ×4 ⬅️ 下一步（下個 session 從這裡接）
**先讀**：`../design-extract-auvita/ui_kits/auvita/{shop,product,checkout}.jsx`（+ `shop.html`/`product.html`/`checkout.html` 看 active prop 與組合）。
- `shop.jsx` → `components/Shop.tsx` + `lib/products.ts`（`PRODUCTS` 商品資料抽出；含分類篩選 + 加入購物車）。`window.Shop`/`PRODUCTS` 見 §4。
- `product.jsx` → `components/Product.tsx`（sticky gallery、數量 stepper、**加入購物車**＝`Cart.add`，from `@/lib/cart`）。
- `checkout.jsx` → `components/Checkout.tsx`（line items + 收件表單 + 小計/運費/總計；「確認下單」stub、`Cart.clear()`）。
- 路由：`app/[locale]/{shop,product,checkout}/page.tsx`（server，組 Header+內容+Footer）。
- **購物車已就緒**：`lib/cart.ts`（`Cart`/`useCart`/`ntd`）、`components/Cart{Button,Drawer}.tsx`（2A 完成、抽屜連 `/shop`+`/checkout`）。Shop/Product 只要 `import { Cart } from '@/lib/cart'` 然後 `Cart.add(item)`。
- 碰 localStorage/篩選/數量/表單的元件一律 `"use client"`；文字暫內嵌中文。
- **Checkpoint 2D**：3 頁畫面一致；加入/移除/數量增減購物車（localStorage）可運作、header 徽章即時更新；結帳為 stub（不接綠界金流）。

### 收尾（done 前必還）
- [ ] 非首頁文字補抽進 locales（還鐵律 2）。
- [ ] en/ja 真翻譯（內容任務，可獨立 session）。
- [ ] TypeScript `any` 收斂（非阻塞）。

## 7. 整體 4-Stage 路線圖（出處：上層任務）

- **Stage 1** ✅ 骨架（create-next-app + AeroJet 設定複製 + 三語 + 空路由）。
- **Stage 2** ⬅️ 本檔（搬版面，2A–2D）。
- **Stage 3** ogl 金箔粒子：`components/GoldDust.tsx` 包 `"use client"` + 動態 import（`ssr:false`）實作 particles.jsx，加 `ogl` 依賴。
- **Stage 4** 上線：GitHub Secrets（FTP）、deploy-on-push、FTP 上 Apache。repo：`github.com/GNTadmin001/Auvita.git`。

## 8. 注意事項

- 圖片是 placeholder（`window.IMG` → loremflickr 外部圖）；靜態匯出可直接用外部 URL，之後再換品牌實拍。
- `next.config.ts`：`output:'export'` 僅 build 時生效；`images.unoptimized:true` 已設。
- React 19 / Next 15.5 / next-intl 4；**無 Tailwind**（勿安裝）。
- 碰 `window`/`localStorage`/scroll/timer/WebGL 的元件一律 `"use client"`，避免 SSR 報錯。
