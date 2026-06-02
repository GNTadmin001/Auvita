// 統一頁尾。原 site.jsx 的 SiteFooter。內部 .html 連結改 next-intl Link，外部維持 <a>。
import { Link } from '@/i18n/navigation';

const isExternal = (h: string) => /^(https?:|mailto:)/.test(h);
const toHref = (h: string) => '/' + h.replace('.html', ''); // gold-history.html#x → /gold-history#x

function FootLink({ label, href }: { label: string; href: string }) {
  if (isExternal(href)) {
    return (
      <a className="fl" href={href}>
        {label}
      </a>
    );
  }
  return (
    <Link className="fl" href={toHref(href)}>
      {label}
    </Link>
  );
}

const COLS: { h: string; items: [string, string][] }[] = [
  {
    h: '探索',
    items: [
      ['金的歷史', 'gold-history.html'],
      ['品牌與技術', 'brand-tech.html'],
      ['產品應用', 'applications.html'],
      ['最新活動', 'news.html'],
    ],
  },
  {
    h: '選購',
    items: [
      ['全部商品', 'shop.html'],
      ['金箔商品', 'shop.html#foil'],
      ['奈米金商品', 'shop.html#nano-gold'],
      ['奈米銀商品', 'shop.html#nano-silver'],
    ],
  },
  {
    h: '品牌生態系',
    items: [
      ['GNT 技術官網', 'http://www.gnt.com.tw'],
      ['金釀聯盟 酒廠', 'https://www.goldinalliance.com'],
      ['黃金博物館門市', 'contact.html#stores'],
      ['聯絡我們', 'contact.html'],
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="site-foot" id="contact">
      <div className="wrap">
        <div className="sf-top">
          <div>
            <Link className="brand" href="/">
              <img
                src="/assets/logo-nautilus-gold.png"
                alt=""
                style={{ height: '40px' }}
              />
              <span className="wm" style={{ fontSize: '21px' }}>
                京華金<small>GOLD NANOTECH · SINCE 1993</small>
              </span>
            </Link>
            <p className="sf-blurb">
              以食用金為本，同一道汽化式（PVD）工藝延伸至奈米金、奈米銀。台灣唯一合法食用金製造商，9999
              純金，世界級純淨與分散均勻度。
            </p>
            <div className="sf-cert">
              <span>SNQ</span>
              <span>SGS ≥99.9%</span>
              <span>EU · E175</span>
              <span>TFDA</span>
              <span>HALAL</span>
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <h5>{c.h}</h5>
              {c.items.map(([t, href]) => (
                <FootLink key={t} label={t} href={href} />
              ))}
            </div>
          ))}
        </div>
        <div className="sf-bot">
          <span>
            © 2026 Gold NanoTech, Inc. 京華堂實業股份有限公司 · 台北市內湖區瑞光路 258 巷 52 號 ·
            TWSE 1267
          </span>
          <span>Crafted with Science · Since 1993</span>
        </div>
      </div>
    </footer>
  );
}
