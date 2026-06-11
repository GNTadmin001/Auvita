'use client';
// PDF flip viewer — pdfjs-dist 從 CDN 動態載入，完全繞過 webpack 打包，
// 避免 pdfjs v5 ESM 與 webpack CommonJS shim 的 Object.defineProperty 衝突。
import { useCallback, useEffect, useRef, useState } from 'react';

const PDFJS_VERSION = '5.4.296';
const PDFJS_URL = `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.min.mjs`;
const PDFJS_WORKER = `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

// Minimal pdfjs types
type Viewport = { width: number; height: number };
type PDFPage = {
  getViewport(opts: { scale: number }): Viewport;
  render(opts: { canvasContext: CanvasRenderingContext2D; viewport: Viewport }): { promise: Promise<void> };
  cleanup(): void;
};
type PDFDoc = {
  numPages: number;
  getPage(n: number): Promise<PDFPage>;
  destroy(): Promise<void>;
};
type PdfjsLib = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument(src: { url: string }): { promise: Promise<PDFDoc> };
};

// Module-level cache so pdfjs is only downloaded once per session
let _lib: PdfjsLib | null = null;
async function getPdfJs(): Promise<PdfjsLib> {
  if (_lib) return _lib;
  // new Function bypasses both TypeScript static analysis and webpack module resolver,
  // so pdfjs-dist is fetched at runtime by the browser's native ESM loader.
  const lib = await new Function(`return import('${PDFJS_URL}')`)() as PdfjsLib;
  lib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  _lib = lib;
  return lib;
}

interface Props {
  url: string;
  title?: string;
  externalUrl?: string;
  onClose: () => void;
}

export default function PdfFlipViewer({ url, title, externalUrl, onClose }: Props) {
  const [numPages, setNumPages] = useState(0);
  const [spreadIdx, setSpreadIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [errMsg, setErrMsg] = useState('');
  const docRef = useRef<PDFDoc | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLCanvasElement>(null);
  const rightRef = useRef<HTMLCanvasElement>(null);

  // Mobile breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Load PDF document
  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setNumPages(0);
    setSpreadIdx(0);

    (async () => {
      try {
        const lib = await getPdfJs();
        const doc = await lib.getDocument({ url }).promise;
        if (cancelled) { await doc.destroy(); return; }
        docRef.current = doc;
        setNumPages(doc.numPages);
        setStatus('ready');
      } catch (e: unknown) {
        if (cancelled) return;
        setErrMsg(e instanceof Error ? e.message : '未知錯誤');
        setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
      docRef.current?.destroy();
      docRef.current = null;
    };
  }, [url]);

  // Page geometry
  const pagesPerSpread = isMobile ? 1 : 2;
  const totalSpreads = numPages > 0 ? Math.ceil(numPages / pagesPerSpread) : 0;
  const leftPage = spreadIdx * pagesPerSpread + 1;
  const rightPage = !isMobile && leftPage + 1 <= numPages ? leftPage + 1 : null;
  const canPrev = spreadIdx > 0;
  const canNext = spreadIdx < totalSpreads - 1;

  // Render a single page to a canvas element
  const renderPage = useCallback(
    async (pageNum: number, canvas: HTMLCanvasElement | null) => {
      if (!canvas || !docRef.current) return;
      const doc = docRef.current;
      if (pageNum < 1 || pageNum > doc.numPages) return;
      const page = await doc.getPage(pageNum);
      const aw = viewerRef.current ? viewerRef.current.clientWidth - 120 : 700;
      const maxW = isMobile ? Math.min(aw, 520) : Math.min(Math.floor((aw - 16) / 2), 480);
      const scale = maxW / page.getViewport({ scale: 1 }).width;
      const vp = page.getViewport({ scale });
      canvas.width = vp.width;
      canvas.height = vp.height;
      const ctx = canvas.getContext('2d');
      if (ctx) await page.render({ canvasContext: ctx, viewport: vp }).promise;
      page.cleanup();
    },
    [isMobile],
  );

  // Re-render whenever spread or doc changes
  useEffect(() => {
    if (status !== 'ready') return;
    renderPage(leftPage, leftRef.current);
    if (rightPage) renderPage(rightPage, rightRef.current);
  }, [status, spreadIdx, leftPage, rightPage, renderPage]);

  const prev = useCallback(() => canPrev && setSpreadIdx((i) => i - 1), [canPrev]);
  const next = useCallback(() => canNext && setSpreadIdx((i) => i + 1), [canNext]);

  // Keyboard nav + scroll lock
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', h);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  return (
    <div className="pdf-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pdf-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="pdf-header">
          {title && <span className="pdf-title">{title}</span>}
          <div className="pdf-hactions">
            {externalUrl && (
              <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="pdf-ext-btn">
                官方網站 ↗
              </a>
            )}
            <button className="pdf-close-btn" onClick={onClose} aria-label="關閉">✕</button>
          </div>
        </div>

        {/* Viewer */}
        <div className="pdf-viewer" ref={viewerRef}>
          <button
            className={'pdf-arrow pdf-arrow-l' + (canPrev ? '' : ' off')}
            onClick={prev}
            aria-label="上一頁"
          >‹</button>

          <div className={'pdf-spread' + (isMobile ? ' single' : ' double')}>
            {status === 'loading' && <div className="pdf-loading">載入中…</div>}
            {status === 'error' && <div className="pdf-loading">無法載入 PDF：{errMsg}</div>}
            {status === 'ready' && (
              <>
                <canvas ref={leftRef} />
                {rightPage && <canvas ref={rightRef} />}
              </>
            )}
          </div>

          <button
            className={'pdf-arrow pdf-arrow-r' + (canNext ? '' : ' off')}
            onClick={next}
            aria-label="下一頁"
          >›</button>
        </div>

        {/* Footer */}
        {status === 'ready' && numPages > 0 && (
          <div className="pdf-footer">
            <span className="pdf-pageinfo">
              {rightPage ? `${leftPage}–${rightPage}` : leftPage} / {numPages}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
