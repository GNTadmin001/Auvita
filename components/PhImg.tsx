'use client';
// 圖位元件。原 shared.jsx 的 PhImg。onError 時把自己移除（露出 .ph 底圖）。
import { IMG } from '@/lib/img';

type Props = { kw: string; lock: number | string; w?: number; h?: number; eager?: boolean };

export default function PhImg({ kw, lock, w, h, eager }: Props) {
  return (
    <img
      className="ph-img"
      alt=""
      loading={eager ? 'eager' : 'lazy'}
      src={IMG(kw, lock, w, h)}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).remove();
      }}
    />
  );
}
