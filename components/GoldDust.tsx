'use client';
// 金箔粒子（hero WebGL 粒子場）對外薄殼。
// 真正的 ogl 實作在 GoldDustCanvas，透過 next/dynamic ssr:false 載入：
// WebGL 只在 client 跑，靜態匯出/prerender 不會碰到 window 或 ogl。
import dynamic from 'next/dynamic';

export type GoldDustProps = {
  particleColors?: string[];
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleBaseSize?: number;
  sizeRandomness?: number;
  alphaParticles?: boolean;
  pixelRatio?: number;
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  className?: string;
};

const GoldDustCanvas = dynamic(() => import('./GoldDustCanvas'), { ssr: false });

export default function GoldDust(props: GoldDustProps) {
  return <GoldDustCanvas {...props} />;
}
