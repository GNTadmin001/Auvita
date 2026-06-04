'use client';
// 統一站頭（編輯式導覽 + 三語切換 + 購物車 + ≤900px hamburger）。原 site.jsx 的 SiteHeader/NavGroup/Chev。
// transparent：首頁 cover 上以透明態起始，捲過 splash 後淡入實底。
import { Fragment, useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import CartButton from '@/components/CartButton';
import CartDrawer from '@/components/CartDrawer';

// 產品應用 ▾ — 三分類：金箔 / 奈米金 / 奈米銀（奈米銀為佔位）
const APP_MENU = [
  { zh: '產品應用總覽', en: 'Applications · Overview', href: '/applications', lead: true },
  { zh: '金箔', en: 'Gold Leaf · 化妝品 · 食品 · 酒', href: '/applications#foil' },
  { zh: '奈米金', en: 'Nano Gold · 美容 · 藥物載體', href: '/applications#nano-gold' },
  { zh: '奈米銀', en: 'Nano Silver · 殺菌抗菌', href: '/applications#nano-silver' },
];

const MAIN_LINKS: { href: string; zh: string; active: string }[] = [
  { href: '/', zh: '首頁', active: 'home' },
  { href: '/gold-history', zh: '金的歷史', active: 'history' },
  { href: '/brand-tech', zh: '品牌與技術', active: 'brand' },
  { href: '/shop', zh: '選購', active: 'shop' },
  { href: '/news', zh: '最新活動', active: 'news' },
  { href: '/contact', zh: '聯絡我們', active: 'contact' },
];

const LANGS: [string, string][] = [
  ['zh-TW', '繁'],
  ['en', 'EN'],
  ['ja', '日'],
];

function Chev() {
  return (
    <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NavGroup({
  label,
  items,
  on,
}: {
  label: string;
  items: typeof APP_MENU;
  on: boolean;
}) {
  return (
    <div className={'navgroup' + (on ? ' on' : '')}>
      <Link className="ng-label" href={items[0].href}>
        {label}
        <Chev />
      </Link>
      <div className="submenu">
        {items.map((it) => (
          <Link key={it.href} href={it.href} className={it.lead ? 'lead-link' : ''}>
            <span className="sm-zh">{it.zh}</span>
            <span className="sm-en">{it.en}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SiteHeader({
  active,
  transparent,
}: {
  active?: string;
  transparent?: boolean;
}) {
  const a = active || '';
  const [scrolled, setScrolled] = useState(!transparent);
  const [menuOpen, setMenuOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!transparent) {
      setScrolled(true);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 800;
      setScrolled(window.scrollY > vh * 0.8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [transparent]);

  // mobile menu 開啟時鎖住 body scroll；ESC 關閉。
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const switchLocale = (code: string) => {
    setMenuOpen(false);
    router.replace(pathname, { locale: code });
  };

  return (
    <Fragment>
      <header
        className={'site-head' + (transparent ? ' over' : '') + (scrolled ? ' scrolled' : '')}
      >
        <div className="wrap site-head-in">
          <Link className="brand" href="/" onClick={() => setMenuOpen(false)}>
            <img src="/assets/logo-nautilus-gold.png" alt="" />
            <span className="wm">
              京華金<small>GOLD NANOTECH · SINCE 1993</small>
            </span>
          </Link>
          <nav className="mainnav">
            <Link href="/" className={a === 'home' ? 'on' : ''}>
              首頁
            </Link>
            <Link href="/gold-history" className={a === 'history' ? 'on' : ''}>
              金的歷史
            </Link>
            <Link href="/brand-tech" className={a === 'brand' ? 'on' : ''}>
              品牌與技術
            </Link>
            <NavGroup label="產品應用" items={APP_MENU} on={a === 'apps'} />
            <Link href="/shop" className={a === 'shop' ? 'on' : ''}>
              選購
            </Link>
            <Link href="/news" className={a === 'news' ? 'on' : ''}>
              最新活動
            </Link>
            <Link href="/contact" className={a === 'contact' ? 'on' : ''}>
              聯絡我們
            </Link>
          </nav>
          <div className="head-cta">
            <div className="lang">
              {LANGS.map(([code, label], i) => (
                <Fragment key={code}>
                  {i > 0 && <span className="lang-sep">/</span>}
                  <button
                    className={locale === code ? 'on' : ''}
                    onClick={() => switchLocale(code)}
                    aria-label={code}
                  >
                    {label}
                  </button>
                </Fragment>
              ))}
            </div>
            <CartButton />
            <button
              type="button"
              className={'menu-btn' + (menuOpen ? ' on' : '')}
              aria-label="選單"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={'mobile-nav' + (menuOpen ? ' open' : '')}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <div className="mn-back" onClick={() => setMenuOpen(false)} aria-hidden />
        <nav className="mn-panel" onClick={(e) => e.stopPropagation()}>
          {MAIN_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={'mn-link' + (a === l.active ? ' on' : '')}
              onClick={() => setMenuOpen(false)}
            >
              {l.zh}
            </Link>
          ))}

          <div className="mn-group">
            <div className="mn-group-h">產品應用</div>
            {APP_MENU.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className={'mn-sublink' + (it.lead ? ' lead' : '')}
                onClick={() => setMenuOpen(false)}
              >
                <span className="mn-sub-zh">{it.zh}</span>
                <span className="mn-sub-en">{it.en}</span>
              </Link>
            ))}
          </div>

          <div className="mn-lang">
            {LANGS.map(([code, label], i) => (
              <Fragment key={code}>
                {i > 0 && <span className="mn-lang-sep">/</span>}
                <button
                  type="button"
                  className={locale === code ? 'on' : ''}
                  onClick={() => switchLocale(code)}
                  aria-label={code}
                >
                  {label}
                </button>
              </Fragment>
            ))}
          </div>
        </nav>
      </div>

      <CartDrawer />
    </Fragment>
  );
}
