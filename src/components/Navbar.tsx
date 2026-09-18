import React from 'react';
import { 
  Palette, 
  Smartphone, 
  Sparkles, 
  FileText, 
  Briefcase, 
  HelpCircle, 
  Download, 
  ShieldCheck, 
  Layers
} from 'lucide-react';
import { FORMAT_PRESETS } from '../data/templates';
import { PostFormat } from '../types';

interface NavbarProps {
  activeTab: 'studio' | 'mockup' | 'ai' | 'orders' | 'invoice' | 'guide';
  setActiveTab: (tab: 'studio' | 'mockup' | 'ai' | 'orders' | 'invoice' | 'guide') => void;
  currentFormat: PostFormat;
  onSelectFormat: (format: PostFormat) => void;
  onExportPNG: (withWatermark: boolean) => void;
  isWatermarked: boolean;
  onToggleWatermark: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentFormat,
  onSelectFormat,
  onExportPNG,
  isWatermarked,
  onToggleWatermark,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 lg:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo & Format selector */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">PostCraft Studio</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Client Sales Pro
                </span>
              </div>
              <p className="text-xs text-slate-400 font-bengali">সোশ্যাল পোস্ট, কভার ও ক্লায়েন্ট সেলস হাব</p>
            </div>
          </div>

          {/* Quick Format Selector */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            {FORMAT_PRESETS.map((fmt) => {
              const active = currentFormat === fmt.id;
              return (
                <button
                  key={fmt.id}
                  id={`btn-format-${fmt.id}`}
                  onClick={() => onSelectFormat(fmt.id)}
                  title={`${fmt.name} (${fmt.width}x${fmt.height}px)`}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                  }`}
                >
                  <span>{fmt.id === 'fb_page_cover' ? 'FB Cover' : fmt.id === 'ig_story_reel' ? 'Story/Reel' : fmt.id === 'fb_feed_landscape' ? 'Ad Banner' : 'Square Post'}</span>
                  <span className="text-[10px] opacity-75">
                    {fmt.width}×{fmt.height}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <button
            id="tab-studio"
            onClick={() => setActiveTab('studio')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'studio'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>ডিজাইন ক্যানভাস</span>
          </button>

          <button
            id="tab-mockup"
            onClick={() => setActiveTab('mockup')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'mockup'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>লাইভ ফিড মকআপ</span>
          </button>

          <button
            id="tab-ai"
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'ai'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-purple-300 hover:bg-purple-950/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI ক্যাপশন ও কপি</span>
          </button>

          <button
            id="tab-orders"
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>অর্ডার ট্র্যাকার</span>
          </button>

          <button
            id="tab-invoice"
            onClick={() => setActiveTab('invoice')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'invoice'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>কোটেশন ও ইনভয়েস</span>
          </button>

          <button
            id="tab-guide"
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-400 hover:bg-emerald-950/40'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>বিক্রির গাইডলাইন</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {/* Watermark Protection Toggle */}
          <button
            id="btn-toggle-watermark"
            onClick={onToggleWatermark}
            title="ক্লায়েন্টকে দেখানোর সময় ওয়াটারমার্ক চালু রাখুন যাতে কপি না করতে পারে"
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all ${
              isWatermarked
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-sm'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${isWatermarked ? 'text-amber-400' : ''}`} />
            <span>{isWatermarked ? 'ওয়াটারমার্ক: চালু' : 'ওয়াটারমার্ক'}</span>
          </button>

          {/* Export button */}
          <button
            id="btn-export-highres"
            onClick={() => onExportPNG(isWatermarked)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ডাউনলোড PNG</span>
          </button>
        </div>
      </div>
    </header>
  );
};
