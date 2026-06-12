'use client';
import { Fragment, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import CartButton from '@/components/CartButton';
import CartDrawer from '@/components/CartDrawer';
import { NAV_LINKS, APP_MENU, LANGS, type AppMenuItem } from '@/lib/header.layout';

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
  t,
}: {
  label: string;
  items: AppMenuItem[];
  on: boolean;
  t: (key: string) => string;
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
            <span className="sm-zh">{t(`appMenu.${it.key}Label`)}</span>
            <span className="sm-en">{t(`appMenu.${it.key}Desc`)}</span>
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
  const t = useTranslations('header');

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
              <img className="wm-logo" src="/images/kyowado-logo-white.png" alt={t('brandName')} />
              <small>{t('brandTagline')}</small>
            </span>
          </Link>
          <nav className="mainnav">
            {NAV_LINKS.map((l) => (
              <Fragment key={l.key}>
                {l.active === 'shop' && (
                  <NavGroup
                    label={t('nav.applications')}
                    items={APP_MENU}
                    on={a === 'apps'}
                    t={t}
                  />
                )}
                <Link href={l.href} className={a === l.active ? 'on' : ''}>
                  {t(`nav.${l.key}`)}
                </Link>
              </Fragment>
            ))}
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
              aria-label={t('menuLabel')}
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
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={'mn-link' + (a === l.active ? ' on' : '')}
              onClick={() => setMenuOpen(false)}
            >
              {t(`nav.${l.key}`)}
            </Link>
          ))}

          <div className="mn-group">
            <div className="mn-group-h">{t('nav.applications')}</div>
            {APP_MENU.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className={'mn-sublink' + (it.lead ? ' lead' : '')}
                onClick={() => setMenuOpen(false)}
              >
                <span className="mn-sub-zh">{t(`appMenu.${it.key}Label`)}</span>
                <span className="mn-sub-en">{t(`appMenu.${it.key}Desc`)}</span>
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
