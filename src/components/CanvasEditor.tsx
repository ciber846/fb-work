import React, { useRef, useEffect, useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Download, 
  ShieldAlert, 
  Copy, 
  Check, 
  Sparkles, 
  Smartphone,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DesignState, PostFormat } from '../types';
import { renderDesignToCanvas } from '../utils/canvasRenderer';
import { FORMAT_PRESETS } from '../data/templates';

interface CanvasEditorProps {
  design: DesignState;
  onUpdateDesign: (updater: Partial<DesignState> | ((prev: DesignState) => DesignState)) => void;
  onOpenAICopy: () => void;
}

export const CanvasEditor: React.FC<CanvasEditorProps> = ({
  design,
  onUpdateDesign,
  onOpenAICopy,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [isRendering, setIsRendering] = useState<boolean>(false);

  // Auto-fit zoom calculation
  useEffect(() => {
    const handleFit = () => {
      if (!containerRef.current) return;
      const containerW = containerRef.current.clientWidth - 48;
      const containerH = containerRef.current.clientHeight - 48;
      if (containerW <= 0 || containerH <= 0) return;

      const scaleX = containerW / design.width;
      const scaleY = containerH / design.height;
      const fitScale = Math.min(scaleX, scaleY, 0.95);
      setZoom(Math.max(0.2, Math.min(1.2, fitScale)));
    };

    handleFit();
    window.addEventListener('resize', handleFit);
    return () => window.removeEventListener('resize', handleFit);
  }, [design.width, design.height, design.format]);

  // Re-render canvas whenever design state changes
  useEffect(() => {
    let active = true;
    const render = async () => {
      if (!canvasRef.current) return;
      setIsRendering(true);
      try {
        await renderDesignToCanvas(canvasRef.current, design);
      } catch (err) {
        console.error('Render error:', err);
      } finally {
        if (active) setIsRendering(false);
      }
    };
    render();
    return () => {
      active = false;
    };
  }, [design]);

  const currentFmt = FORMAT_PRESETS.find((f) => f.id === design.format) || FORMAT_PRESETS[0];

  const handleDownload = (withWatermark: boolean = false) => {
    if (!canvasRef.current) return;
    
    // Trigger celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#6366f1', '#a855f7', '#ec4899', '#f59e0b']
    });

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = design.width;
    tempCanvas.height = design.height;
    
    const downloadDesign: DesignState = {
      ...design,
      showWatermark: withWatermark,
    };

    renderDesignToCanvas(tempCanvas, downloadDesign).then(() => {
      const link = document.createElement('a');
      const suffix = withWatermark ? '_CLIENT_PREVIEW' : '_FINAL_HIGHRES';
      link.download = `${currentFmt.id}_${design.brandName.replace(/\s+/g, '_') || 'Post'}${suffix}.png`;
      link.href = tempCanvas.toDataURL('image/png', 1.0);
      link.click();
    });
  };

  const handleCopyClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob((blob) => {
        if (!blob) return;
        navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      });
    } catch (e) {
      console.warn('Clipboard copy error:', e);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden relative select-none">
      {/* Canvas Top Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">{currentFmt.banglaName}</span>
          <span className="text-slate-500">•</span>
          <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">
            {design.width} × {design.height} px ({currentFmt.aspectRatio})
          </span>
          {design.showWatermark && (
            <span className="flex items-center gap-1 text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded text-[11px] font-medium">
              <ShieldAlert className="w-3 h-3" />
              ক্লায়েন্ট ওয়াটারমার্ক সক্রিয়
            </span>
          )}
        </div>

        {/* Zoom & Quick Actions */}
        <div className="flex items-center gap-1.5">
          <button
            id="btn-zoom-out"
            onClick={() => setZoom((z) => Math.max(0.2, z - 0.1))}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] text-slate-400 w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            id="btn-zoom-in"
            onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            id="btn-zoom-fit"
            onClick={() => {
              if (!containerRef.current) return;
              const scale = Math.min(
                (containerRef.current.clientWidth - 64) / design.width,
                (containerRef.current.clientHeight - 64) / design.height
              );
              setZoom(Math.max(0.2, Math.min(1, scale)));
            }}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white ml-1"
            title="Fit to Screen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          {/* Copy Image */}
          <button
            id="btn-copy-canvas"
            onClick={handleCopyClipboard}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
            title="ক্লিপবোর্ডে কপি করুন"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'কপি হয়েছে' : 'কপি'}</span>
          </button>

          {/* Download with Watermark for client review */}
          <button
            id="btn-download-preview"
            onClick={() => handleDownload(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 transition-all"
            title="ক্লায়েন্টকে WhatsApp এ দেখানোর জন্য নিরাপদ ওয়াটারমার্ক সহ ডাউনলোড"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>প্রিভিউ কপি</span>
          </button>

          {/* Clean High Res Download */}
          <button
            id="btn-download-clean"
            onClick={() => handleDownload(false)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-sm transition-all"
            title="ক্লায়েন্টকে ডেলিভারি দেওয়ার ফাইনাল হাই-রেজুলিউশন ফাইল"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ফাইনাল ফাইল</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Stage (Checkered background for transparency check) */}
      <div 
        ref={containerRef}
        className="flex-1 flex items-center justify-center p-6 overflow-auto bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]"
      >
        <div 
          className="relative transition-transform duration-75 shadow-2xl rounded-sm ring-1 ring-slate-800/80"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            width: `${design.width}px`,
            height: `${design.height}px`,
          }}
        >
          <canvas
            ref={canvasRef}
            id="postcraft-main-canvas"
            className="w-full h-full block rounded-sm shadow-2xl"
          />

          {isRendering && (
            <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[1px] flex items-center justify-center rounded pointer-events-none">
              <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Floating Quick Assist Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-slate-700/80 shadow-2xl z-20">
        <button
          id="btn-quick-ai-copy"
          onClick={onOpenAICopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm hover:brightness-110 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI ক্যাপশন ও বিজ্ঞাপন হুক বানান</span>
        </button>

        {design.format === 'fb_page_cover' && (
          <button
            id="btn-toggle-safezone"
            onClick={() => onUpdateDesign((prev) => ({ ...prev, showSafeZone: !prev.showSafeZone }))}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              design.showSafeZone
                ? 'bg-red-500/20 text-red-300 border-red-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>মোবাইল সেফ জোন {design.showSafeZone ? 'অন' : 'অফ'}</span>
          </button>
        )}

        <button
          id="btn-bottom-watermark-toggle"
          onClick={() => onUpdateDesign((prev) => ({ ...prev, showWatermark: !prev.showWatermark }))}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
            design.showWatermark
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>ওয়াটারমার্ক {design.showWatermark ? 'চালু' : 'বন্ধ'}</span>
        </button>
      </div>
    </div>
  );
};
