'use client';
// 購物車系統（localStorage store + pub/sub）。原 cart.jsx 的 window.Cart / ntd / useCart。
// 注意：結帳/付款刻意只做 stub，外部金流另接（鐵律：本次不含綠界購物車）。
import { useEffect, useState } from 'react';

export type CartItem = {
  id: string;
  zh: string;
  en?: string;
  family?: string;
  price: number;
  kw?: string;
  lock?: number;
  qty: number;
};

const CART_KEY = 'gnt_cart_v1';
const listeners = new Set<(items: CartItem[]) => void>();

function read(): CartItem[] {
  // SSR 時 localStorage 不存在 → try/catch 回 []，避免 server 端報錯
  try {
    return (JSON.parse(localStorage.getItem(CART_KEY) || '') as CartItem[]) || [];
  } catch {
    return [];
  }
}
function write(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  listeners.forEach((fn) => fn(items));
}

export const Cart = {
  items: read,
  count(): number {
    return read().reduce((n, i) => n + i.qty, 0);
  },
  total(): number {
    return read().reduce((n, i) => n + i.price * i.qty, 0);
  },
  add(p: Omit<CartItem, 'qty'>, qty = 1): void {
    const items = read();
    const ex = items.find((i) => i.id === p.id);
    if (ex) ex.qty += qty;
    else items.push(Object.assign({}, p, { qty }));
    write(items);
    window.dispatchEvent(new CustomEvent('cart:open'));
  },
  setQty(id: string, qty: number): void {
    const items = read();
    const it = items.find((i) => i.id === id);
    if (it) it.qty = Math.max(1, qty);
    write(items);
  },
  remove(id: string): void {
    write(read().filter((i) => i.id !== id));
  },
  clear(): void {
    write([]);
  },
  subscribe(fn: (items: CartItem[]) => void): () => void {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
};

export const ntd = (n: number): string => 'NT$ ' + Number(n).toLocaleString('en-US');

// React hook — 任何購物車變動都重繪。初值 []（與 SSR 一致避免 hydration mismatch），掛載後讀真值並訂閱。
export function useCart(): CartItem[] {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    setItems(Cart.items());
    return Cart.subscribe(setItems);
  }, []);
  return items;
}
