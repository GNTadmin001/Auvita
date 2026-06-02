// AUVITA 設計純 CSS（鐵律 3：原樣 global import，不改 Tailwind）。順序固定：
// tokens+字型 → 暗色站 → 站頭/頁尾/購物車 → Stage 2 補強。
import './colors_and_type.css';
import './auvita.css';
import './site.css';
import './overrides.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
