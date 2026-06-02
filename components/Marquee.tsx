// 自動捲動食材跑馬燈。原 shared.jsx 的 Marquee + MARQUEE_LOGOS。純 SVG + CSS 動畫。
const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.1,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const MARQUEE_LOGOS = [
  {
    label: '蛋糕',
    icon: (
      <svg viewBox="0 0 24 24" {...S}>
        <path d="M5 20.5h14M6.5 20.5v-7h11v7M6.5 13.5h11M12 6.4v3" />
        <circle cx="12" cy="5.3" r="1" />
      </svg>
    ),
  },
  {
    label: '抹茶',
    icon: (
      <svg viewBox="0 0 24 24" {...S}>
        <path d="M4 11.5h16M5.5 11.5a6.5 5 0 0 0 13 0" />
        <path d="M9 4h6M10 4v7.4M12 4v7.4M14 4v7.4" />
      </svg>
    ),
  },
  {
    label: '巧克力',
    icon: (
      <svg viewBox="0 0 24 24" {...S}>
        <rect x="5.5" y="4.5" width="13" height="15" rx="1" />
        <path d="M12 4.5v15M5.5 9.5h13M5.5 14.5h13" />
      </svg>
    ),
  },
  {
    label: '馬卡龍',
    icon: (
      <svg viewBox="0 0 24 24" {...S}>
        <path d="M4.5 10a7.5 4.5 0 0 1 15 0M4.5 14a7.5 4.5 0 0 0 15 0M4.5 11.4h15M4.5 12.6h15" />
      </svg>
    ),
  },
  {
    label: '咖啡',
    icon: (
      <svg viewBox="0 0 24 24" {...S}>
        <path d="M5 10h11v3.4a5.5 5.5 0 0 1-11 0zM16 10.5h2.2a2 2 0 0 1 0 4H16M4 19h13" />
        <path d="M8.5 4.4c0 1.3 1 1.3 1 2.5M11.5 4.4c0 1.3 1 1.3 1 2.5" />
      </svg>
    ),
  },
  {
    label: '和果子',
    icon: (
      <svg viewBox="0 0 24 24" {...S}>
        <circle cx="12" cy="12" r="2.2" />
        <circle cx="12" cy="6.6" r="2.2" />
        <circle cx="12" cy="17.4" r="2.2" />
        <circle cx="6.9" cy="9.3" r="2.2" />
        <circle cx="17.1" cy="9.3" r="2.2" />
        <circle cx="6.9" cy="14.7" r="2.2" />
        <circle cx="17.1" cy="14.7" r="2.2" />
      </svg>
    ),
  },
  {
    label: '香檳',
    icon: (
      <svg viewBox="0 0 24 24" {...S}>
        <path d="M6 5.5h12M7 5.5a5 4 0 0 0 10 0M12 9.5v8M8.5 18.5h7" />
        <circle cx="11" cy="3.2" r="0.5" />
        <circle cx="13.4" cy="2.2" r="0.5" />
      </svg>
    ),
  },
  {
    label: '威士忌',
    icon: (
      <svg viewBox="0 0 24 24" {...S}>
        <path d="M6.5 5h11l-1 14.5h-9z" />
        <path d="M7.4 12h9.2" />
        <rect x="9.8" y="6.9" width="3.4" height="3.4" rx="0.5" />
      </svg>
    ),
  },
];

export default function Marquee() {
  const copy = (k: string) =>
    MARQUEE_LOGOS.map((l, i) => (
      <div className="marq-item" key={`${k}-${i}`}>
        <span className="mi-mark">{l.icon}</span>
        <span className="ml">{l.label}</span>
      </div>
    ));
  return (
    <div className="marq" aria-label="食用金應用">
      <div className="marq-track">
        {copy('a')}
        {copy('b')}
      </div>
    </div>
  );
}
