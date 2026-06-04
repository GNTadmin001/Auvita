import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { FOOTER_COLS, CERTS, type FootColItem } from '@/lib/content/footer.layout';

function FootLink({ label, href, external }: { label: string; href: string; external?: boolean }) {
  if (external) {
    return (
      <a className="fl" href={href}>
        {label}
      </a>
    );
  }
  return (
    <Link className="fl" href={href}>
      {label}
    </Link>
  );
}

export default async function SiteFooter() {
  const t = await getTranslations('footer');

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
                {t('brandName')}<small>{t('brandTagline')}</small>
              </span>
            </Link>
            <p className="sf-blurb">{t('blurb')}</p>
            <div className="sf-cert">
              {CERTS.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.key}>
              <h5>{t(`cols.${col.key}`)}</h5>
              {col.items.map((item: FootColItem) => (
                <FootLink
                  key={item.key}
                  label={t(`links.${item.key}`)}
                  href={item.href}
                  external={item.external}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="sf-bot">
          <span>{t('copyright')}</span>
          <span>{t('tagline')}</span>
        </div>
      </div>
    </footer>
  );
}
