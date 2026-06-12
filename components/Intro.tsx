'use client';
// 首頁 cover splash（logy 風格：捲動時整版圖縮成框、封面字上浮淡出）。原 home.jsx 的 Intro。
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { IMG } from '@/lib/products';

export default function Intro() {
  const t = useTranslations('home.intro');
  useEffect(() => {
    const el = document.getElementById('cover');
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // progress 0→1 跨越 cover 捲動跑道（在脫離 pin 前剛好完成）
      const p = Math.min(1, Math.max(0, window.scrollY / (vh * 0.85)));
      el.style.setProperty('--p', p.toFixed(4));
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
  }, []);

  return (
    <section className="cover" id="cover">
      <div className="cover-sticky">
        <div className="cover-frame">
          <video
            className="cover-img"
            src="/videos/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <div className="cover-in">
          <img className="mark" src="/assets/logo-nautilus-gold.png" alt="" />
          <div className="lat">{t('latin')}</div>
          <div className="zh">{t('zh')}</div>
          <div className="en">{t('en')}</div>
        </div>
        <div className="cover-cue">
          <span>{t('scroll')}</span>
          <span className="ln"></span>
        </div>
      </div>
    </section>
  );
}
