// 小箭頭。原 site.jsx 的 Arw。純 SVG，無互動。
export default function Arw({ steel }: { steel?: boolean }) {
  return (
    <span className="arw">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke={steel ? 'var(--nano-steel)' : 'var(--k-gold-lt)'}
        strokeWidth={1.4}
      >
        <path d="M5 12h13M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
