// 線上 placeholder 圖（loremflickr，依 lock 穩定）。原 shared.jsx 的 window.IMG。
// 之後換成品牌實拍；每個 <PhImg> = 一個圖位。
export const IMG = (kw: string, lock: number | string, w = 1000, h = 750): string =>
  `https://loremflickr.com/${w}/${h}/${encodeURIComponent(kw)}?lock=${lock}`;
