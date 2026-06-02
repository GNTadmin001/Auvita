'use client';
// 捲動淡入。原 shared.jsx 的 window.setupReveal 改成 React hook。
// 在需要 .reveal 效果的頁面 client 元件最上層呼叫 useReveal()。
import { useEffect } from 'react';

export function useReveal(): void {
  useEffect(() => {
    const run = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > -40) el.classList.add('in');
      });
    };
    run();
    window.addEventListener('scroll', run, { passive: true });
    window.addEventListener('resize', run);
    // 安全網：5.2s 後強制全部顯示，永不留空白區塊
    const t = setTimeout(
      () => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('in')),
      5200,
    );
    return () => {
      window.removeEventListener('scroll', run);
      window.removeEventListener('resize', run);
      clearTimeout(t);
    };
  }, []);
}

// 深連結錨點捲動：載入後若網址有 #hash 就捲到該區（原各頁 useEffect 內的 scrollIntoView）。
export function useHashScroll(): void {
  useEffect(() => {
    const t = setTimeout(() => {
      if (location.hash) {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView();
      }
    }, 200);
    return () => clearTimeout(t);
  }, []);
}
