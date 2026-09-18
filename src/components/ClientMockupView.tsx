import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  ThumbsUp, 
  Share2, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  ShieldCheck, 
  Smartphone, 
  Monitor,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DesignState } from '../types';
import { renderDesignToCanvas } from '../utils/canvasRenderer';

interface ClientMockupViewProps {
  design: DesignState;
  onUpdateDesign: (updater: Partial<DesignState> | ((prev: DesignState) => DesignState)) => void;
  onSwitchToStudio: () => void;
  onOpenAICopy: () => void;
}

export const ClientMockupView: React.FC<ClientMockupViewProps> = ({
  design,
  onUpdateDesign,
  onSwitchToStudio,
  onOpenAICopy,
}) => {
  const [platformMockup, setPlatformMockup] = useState<'instagram' | 'facebook'>('instagram');
  const [clientApprovalStatus, setClientApprovalStatus] = useState<'pending' | 'approved' | 'revision'>('pending');
  const [revisionNote, setRevisionNote] = useState<string>('');
  const [dataUrl, setDataUrl] = useState<string>('');
  const mockupCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = design.width;
    canvas.height = design.height;
    renderDesignToCanvas(canvas, design).then(() => {
      setDataUrl(canvas.toDataURL('image/png'));
    });
  }, [design]);

  const handleApprove = () => {
    setClientApprovalStatus('approved');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-y-auto p-4 lg:p-8">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Header & Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">ক্লায়েন্ট লাইভ ফিড মকআপ</h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Sales Pitch Mode
              </span>
            </div>
            <p className="text-xs text-slate-400 font-bengali mt-0.5">
              ক্লায়েন্টকে দেখান তাদের ফেসবুক বা ইন্সটাগ্রাম পেজে বিজ্ঞাপন ও পোস্টটি দেখতে কেমন লাগবে!
            </p>
          </div>

          {/* Switch Platform & Watermark */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                id="btn-mockup-instagram"
                onClick={() => setPlatformMockup('instagram')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  platformMockup === 'instagram'
                    ? 'bg-pink-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ইন্সটাগ্রাম ফিড
              </button>
              <button
                id="btn-mockup-facebook"
                onClick={() => setPlatformMockup('facebook')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  platformMockup === 'facebook'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ফেসবুক অ্যাড ফিড
              </button>
            </div>

            <button
              id="btn-mockup-toggle-watermark"
              onClick={() => onUpdateDesign((prev) => ({ ...prev, showWatermark: !prev.showWatermark }))}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                design.showWatermark
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{design.showWatermark ? 'ওয়াটারমার্ক অন' : 'ওয়াটারমার্ক অফ'}</span>
            </button>
          </div>
        </div>

        {/* Mockup Preview Card */}
        <div className="flex justify-center">
          {platformMockup === 'instagram' ? (
            /* INSTAGRAM MOCKUP */
            <div className="w-full max-w-md bg-black border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-white font-sans">
              {/* Phone Status Bar */}
              <div className="px-6 py-2 flex justify-between items-center text-[10px] text-neutral-400 border-b border-neutral-900 bg-neutral-950">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-2 border border-neutral-400 rounded-[1px]" />
                  <span>5G</span>
                </div>
              </div>

              {/* Instagram Header */}
              <div className="px-4 py-3 flex items-center justify-between border-b border-neutral-900">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-xs text-white">
                      {(design.brandName || 'Brand').substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-xs text-neutral-100">
                        {design.brandName.toLowerCase().replace(/\s+/g, '_') || 'client_brand'}
                      </span>
                      <span className="text-[10px] text-blue-400">✓</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 font-bengali">Sponsored • ঢাকা, বাংলাদেশ</p>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-neutral-400" />
              </div>

              {/* Post Image Render */}
              <div className="relative bg-neutral-950 aspect-square flex items-center justify-center overflow-hidden">
                {dataUrl ? (
                  <img
                    src={dataUrl}
                    alt="Design Preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                )}
              </div>

              {/* Instagram Engagement Bar */}
              <div className="p-4 space-y-2.5 bg-black">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500 cursor-pointer" />
                    <MessageCircle className="w-5 h-5 text-neutral-200 cursor-pointer" />
                    <Send className="w-5 h-5 text-neutral-200 cursor-pointer" />
                  </div>
                  <Bookmark className="w-5 h-5 text-neutral-200 cursor-pointer" />
                </div>

                <div className="text-xs font-semibold text-neutral-100">
                  ১,৪৫০ জন পছন্দ করেছেন
                </div>

                {/* Caption preview */}
                <div className="text-xs text-neutral-300 font-bengali leading-relaxed">
                  <span className="font-bold text-neutral-100 mr-1.5">
                    {design.brandName.toLowerCase().replace(/\s+/g, '_') || 'client_brand'}
                  </span>
                  {design.headline.replace('\n', ' ')} • {design.subheadline}
                  <div className="text-neutral-400 text-[11px] mt-1">
                    অর্ডার করতে ইনবক্স করুন 🛒 অথবা কল করুন: {design.phone || '017XXXXXXXX'}
                  </div>
                  <div className="text-blue-400 text-[11px] mt-1 space-x-1">
                    <span>#মেগাসেল</span>
                    <span>#offers</span>
                    <span>#bangladesh</span>
                    <span>#ecommerce</span>
                  </div>
                </div>

                <div className="text-[10px] text-neutral-500 uppercase tracking-wider pt-1">
                  ২ ঘণ্টা আগে • SPONSORED
                </div>
              </div>
            </div>
          ) : (
            /* FACEBOOK FEED MOCKUP */
            <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100 font-sans">
              {/* Facebook Post Header */}
              <div className="p-4 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm text-white shadow">
                    {(design.brandName || 'FB').substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-white">{design.brandName || 'Client Business Page'}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-xs text-blue-400 font-medium">Follow</span>
                    </div>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      Sponsored • <span>🌐</span>
                    </p>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-slate-400" />
              </div>

              {/* Caption */}
              <div className="px-4 py-3 text-xs text-slate-200 font-bengali leading-relaxed space-y-1.5">
                <p className="font-semibold text-white text-sm">{design.headline.replace('\n', ' ')}</p>
                <p className="text-slate-300">{design.subheadline}</p>
                <p className="text-slate-400 text-[11px]">
                  🚚 সারাদেশে দ্রুত হোম ডেলিভারি সুবিধা ও ক্যাশ অন ডেলিভারি!
                </p>
                <p className="text-indigo-400 font-medium text-xs">
                  👉 বিস্তারিত জানতে বা অর্ডার করতে এখনই নিচে বাটনে ক্লিক করুন:
                </p>
              </div>

              {/* Media Graphic */}
              <div className="relative bg-black flex items-center justify-center">
                {dataUrl ? (
                  <img
                    src={dataUrl}
                    alt="Facebook Design Preview"
                    className="w-full h-auto object-contain max-h-[480px]"
                  />
                ) : (
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin my-12" />
                )}
              </div>

              {/* Call to action bar */}
              <div className="bg-slate-800/80 px-4 py-2.5 flex items-center justify-between border-y border-slate-700/60">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                    {design.website || 'WWW.CLIENTPAGE.COM'}
                  </p>
                  <p className="text-xs font-bold text-white truncate max-w-[280px]">
                    {design.badgeText || 'Special Offer - Buy Now'}
                  </p>
                </div>
                <button className="px-4 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs transition-all shadow-sm">
                  {design.ctaText ? design.ctaText.replace(/[^\w\s\u0980-\u09FF]/gi, '').trim() : 'Send Message'}
                </button>
              </div>

              {/* Reaction counts & buttons */}
              <div className="p-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[9px] text-white">
                    👍
                  </div>
                  <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[9px] text-white">
                    ❤️
                  </div>
                  <span className="text-[11px] text-slate-300 ml-1">১.৮ হাজার</span>
                </div>
                <div className="flex gap-3 text-[11px]">
                  <span>১২৪টি মন্তব্য</span>
                  <span>৬৮টি শেয়ার</span>
                </div>
              </div>

              <div className="grid grid-cols-3 border-t border-slate-800 py-1 text-xs text-slate-300 font-medium">
                <button className="flex items-center justify-center gap-1.5 py-2 hover:bg-slate-800/60 rounded transition-all">
                  <ThumbsUp className="w-4 h-4 text-slate-400" />
                  <span>Like</span>
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2 hover:bg-slate-800/60 rounded transition-all">
                  <MessageCircle className="w-4 h-4 text-slate-400" />
                  <span>Comment</span>
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2 hover:bg-slate-800/60 rounded transition-all">
                  <Share2 className="w-4 h-4 text-slate-400" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Client Review & Approval Simulation Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">ক্লায়েন্ট ফিডব্যাক ও অ্যাপ্রুভাল স্ট্যাটাস</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                id="btn-client-approve"
                onClick={handleApprove}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>ক্লায়েন্ট অ্যাপ্রুভ করেছে</span>
              </button>
              <button
                id="btn-client-revision"
                onClick={() => setClientApprovalStatus('revision')}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-600/20 text-amber-300 border border-amber-500/40 hover:bg-amber-600/30 transition-all flex items-center gap-1.5"
              >
                <AlertCircle className="w-4 h-4" />
                <span>রিভিশন নোট</span>
              </button>
            </div>
          </div>

          {clientApprovalStatus === 'approved' && (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs font-bengali flex items-center justify-between">
              <div>
                🎉 <strong>অভিনন্দন! ক্লায়েন্ট ডিজাইন পছন্দ করেছে।</strong> এবার ওয়াটারমার্ক বন্ধ করে ফাইনাল হাই-রেস ফাইল ডাউনলোড করে ডেলিভারি দিন এবং পেমেন্ট নিন!
              </div>
              <button
                onClick={() => {
                  onUpdateDesign({ showWatermark: false });
                  onSwitchToStudio();
                }}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-xs shrink-0 ml-3"
              >
                ফাইনাল ফাইল ডাউনলোড
              </button>
            </div>
          )}

          {clientApprovalStatus === 'revision' && (
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
              <label className="text-xs font-semibold text-amber-300">ক্লায়েন্টের রিভিশন নোট লিখে রাখুন:</label>
              <textarea
                value={revisionNote}
                onChange={(e) => setRevisionNote(e.target.value)}
                placeholder="যেমন: ব্যাকগ্রাউন্ড কালার একটু ডার্ক হবে, প্রোডাক্ট ছবি একটু বড় করতে হবে, অথবা ডিসকাউন্ট লেখা ৫% বেশি হবে..."
                rows={2}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 font-bengali focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={onSwitchToStudio}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium"
              >
                এডিটর ক্যানভাসে ফেরত গিয়ে ঠিক করুন
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
