import React, { useState } from 'react';
import { 
  Type, 
  Paintbrush, 
  Image as ImageIcon, 
  Sparkles, 
  ShieldCheck, 
  Upload, 
  Check, 
  Sliders, 
  Phone, 
  Globe, 
  Tag, 
  Layers
} from 'lucide-react';
import { DesignState, TemplatePreset } from '../types';
import { GRADIENT_PALETTES, SAMPLE_CUTOUTS, TEMPLATE_PRESETS } from '../data/templates';

interface ControlPanelProps {
  design: DesignState;
  onUpdateDesign: (updater: Partial<DesignState> | ((prev: DesignState) => DesignState)) => void;
  onApplyTemplate: (template: TemplatePreset) => void;
  onOpenAICopy: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  design,
  onUpdateDesign,
  onApplyTemplate,
  onOpenAICopy,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'templates' | 'text' | 'visuals' | 'product' | 'watermark'>('text');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onUpdateDesign({ productImage: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const handleBgImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onUpdateDesign({ bgCustomImage: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  return (
    <aside className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col h-full overflow-hidden">
      {/* Sub tabs header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-2 bg-slate-950/60 overflow-x-auto scrollbar-none">
        <button
          id="btn-subtab-text"
          onClick={() => setActiveSubTab('text')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
            activeSubTab === 'text'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>টেক্সট ও কন্টেন্ট</span>
        </button>

        <button
          id="btn-subtab-templates"
          onClick={() => setActiveSubTab('templates')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
            activeSubTab === 'templates'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>টেমপ্লেট</span>
        </button>

        <button
          id="btn-subtab-visuals"
          onClick={() => setActiveSubTab('visuals')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
            activeSubTab === 'visuals'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Paintbrush className="w-3.5 h-3.5" />
          <span>কালার ও ব্যাকগ্রাউন্ড</span>
        </button>

        <button
          id="btn-subtab-product"
          onClick={() => setActiveSubTab('product')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
            activeSubTab === 'product'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>প্রোডাক্ট ছবি</span>
        </button>

        <button
          id="btn-subtab-watermark"
          onClick={() => setActiveSubTab('watermark')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
            activeSubTab === 'watermark'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ওয়াটারমার্ক</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* 1. TEXT & CONTENT TAB */}
        {activeSubTab === 'text' && (
          <div className="space-y-4">
            {/* AI Copy Generator Quick Trigger */}
            <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 p-3 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-purple-200 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  AI দিয়ে আকর্ষণীয় বাংলা কপি লিখুন
                </p>
                <p className="text-[11px] text-purple-300/80 font-bengali">অফার হেডলাইন, ব্যাজ ও ক্যাপশন</p>
              </div>
              <button
                id="btn-trigger-ai-copy-panel"
                onClick={onOpenAICopy}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-all shadow"
              >
                জেনারেট করুন
              </button>
            </div>

            {/* Headline Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-200">মূল হেডলাইন (Headline)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="input-headline-color"
                    value={design.headlineColor}
                    onChange={(e) => onUpdateDesign({ headlineColor: e.target.value })}
                    className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                    title="Headline Color"
                  />
                  <span className="text-[11px] text-slate-400">{design.headlineSize}px</span>
                </div>
              </div>
              <textarea
                id="input-headline-text"
                rows={2}
                value={design.headline}
                onChange={(e) => onUpdateDesign({ headline: e.target.value })}
                placeholder="মেগা ধামাকা সেল\n৫০% পর্যন্ত ছাড়!"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg p-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-bengali"
              />
              <div className="flex items-center gap-2 pt-1">
                <Sliders className="w-3 h-3 text-slate-400" />
                <input
                  type="range"
                  id="range-headline-size"
                  min="20"
                  max="64"
                  value={design.headlineSize}
                  onChange={(e) => onUpdateDesign({ headlineSize: Number(e.target.value) })}
                  className="flex-1 accent-indigo-500"
                />
              </div>
            </div>

            {/* Badge / Ribbon Tag */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="check-show-badge"
                    checked={design.showBadge}
                    onChange={(e) => onUpdateDesign({ showBadge: e.target.checked })}
                    className="rounded accent-indigo-600"
                  />
                  <label htmlFor="check-show-badge" className="text-xs font-semibold text-slate-200">
                    অফার ব্যাজ (Badge Tag)
                  </label>
                </div>
                {design.showBadge && (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">রং:</span>
                    <input
                      type="color"
                      id="input-badge-color"
                      value={design.badgeBgColor}
                      onChange={(e) => onUpdateDesign({ badgeBgColor: e.target.value })}
                      className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                    />
                  </div>
                )}
              </div>
              {design.showBadge && (
                <input
                  type="text"
                  id="input-badge-text"
                  value={design.badgeText}
                  onChange={(e) => onUpdateDesign({ badgeText: e.target.value })}
                  placeholder="🔥 বিশেষ অফার | সীমিত স্টক"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-bengali"
                />
              )}
            </div>

            {/* Sub-headline Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-200">সাব-হেডলাইন বা অফার বিবরণ</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="input-subheadline-color"
                    value={design.subheadlineColor}
                    onChange={(e) => onUpdateDesign({ subheadlineColor: e.target.value })}
                    className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                    title="Subheadline Color"
                  />
                  <span className="text-[11px] text-slate-400">{design.subheadlineSize}px</span>
                </div>
              </div>
              <textarea
                id="input-subheadline-text"
                rows={2}
                value={design.subheadline}
                onChange={(e) => onUpdateDesign({ subheadline: e.target.value })}
                placeholder="প্রিমিয়াম কোয়ালিটি নিশ্চিত ও সারাদেশে ক্যাশ অন ডেলিভারি!"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-bengali"
              />
              <div className="flex items-center gap-2 pt-1">
                <Sliders className="w-3 h-3 text-slate-400" />
                <input
                  type="range"
                  id="range-subheadline-size"
                  min="12"
                  max="32"
                  value={design.subheadlineSize}
                  onChange={(e) => onUpdateDesign({ subheadlineSize: Number(e.target.value) })}
                  className="flex-1 accent-indigo-500"
                />
              </div>
            </div>

            {/* Call to Action (CTA) Button */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="check-show-cta"
                    checked={design.showCta}
                    onChange={(e) => onUpdateDesign({ showCta: e.target.checked })}
                    className="rounded accent-indigo-600"
                  />
                  <label htmlFor="check-show-cta" className="text-xs font-semibold text-slate-200">
                    অ্যাকশন বাটন (Call To Action)
                  </label>
                </div>
                {design.showCta && (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">বাটন কালার:</span>
                    <input
                      type="color"
                      id="input-cta-color"
                      value={design.ctaBgColor}
                      onChange={(e) => onUpdateDesign({ ctaBgColor: e.target.value })}
                      className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                    />
                  </div>
                )}
              </div>
              {design.showCta && (
                <input
                  type="text"
                  id="input-cta-text"
                  value={design.ctaText}
                  onChange={(e) => onUpdateDesign({ ctaText: e.target.value })}
                  placeholder="অর্ডার করতে ইনবক্স করুন 🛒"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-bengali"
                />
              )}
            </div>

            {/* Price Tag / Discount Bubble */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="check-show-pricetag"
                    checked={design.showPriceTag}
                    onChange={(e) => onUpdateDesign({ showPriceTag: e.target.checked })}
                    className="rounded accent-indigo-600"
                  />
                  <label htmlFor="check-show-pricetag" className="text-xs font-semibold text-slate-200">
                    মূল্য বা ছাড় ট্যাগ (Price Tag Bubble)
                  </label>
                </div>
                {design.showPriceTag && (
                  <input
                    type="color"
                    id="input-pricetag-color"
                    value={design.priceTagColor}
                    onChange={(e) => onUpdateDesign({ priceTagColor: e.target.value })}
                    className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                  />
                )}
              </div>
              {design.showPriceTag && (
                <input
                  type="text"
                  id="input-pricetag-text"
                  value={design.priceTag}
                  onChange={(e) => onUpdateDesign({ priceTag: e.target.value })}
                  placeholder="মাত্র\n৳৮৫০"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-bengali"
                />
              )}
            </div>

            {/* Brand & Footer Contact Info */}
            <div className="space-y-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="check-show-footer"
                    checked={design.showFooter}
                    onChange={(e) => onUpdateDesign({ showFooter: e.target.checked })}
                    className="rounded accent-indigo-600"
                  />
                  <label htmlFor="check-show-footer" className="text-xs font-semibold text-slate-200">
                    ক্লায়েন্ট ব্র্যান্ড ও যোগাযোগ তথ্য
                  </label>
                </div>
              </div>

              {design.showFooter && (
                <div className="space-y-2 pt-1">
                  <div>
                    <span className="text-[11px] text-slate-400">ব্র্যান্ড / শপ নাম:</span>
                    <input
                      type="text"
                      id="input-brand-name"
                      value={design.brandName}
                      onChange={(e) => onUpdateDesign({ brandName: e.target.value })}
                      placeholder="TrendZone BD"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> ফোন / WhatsApp:
                      </span>
                      <input
                        type="text"
                        id="input-brand-phone"
                        value={design.phone}
                        onChange={(e) => onUpdateDesign({ phone: e.target.value })}
                        placeholder="01712-345678"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Globe className="w-3 h-3" /> পেজ / ওয়েবসাইট:
                      </span>
                      <input
                        type="text"
                        id="input-brand-website"
                        value={design.website}
                        onChange={(e) => onUpdateDesign({ website: e.target.value })}
                        placeholder="fb.com/trendzonebd"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. TEMPLATES TAB */}
        {activeSubTab === 'templates' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400 font-bengali">
              ১-ক্লিকে হাই-কনভার্টিং টেমপ্লেট লোড করে ক্লায়েন্টের প্রোডাক্ট অনুযায়ী কাস্টমাইজ করুন:
            </p>
            <div className="space-y-2">
              {TEMPLATE_PRESETS.map((tpl) => (
                <div
                  key={tpl.id}
                  id={`card-template-${tpl.id}`}
                  onClick={() => onApplyTemplate(tpl)}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500 cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tpl.thumbnailColor} flex items-center justify-center text-white shadow`}>
                      <Tag className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white group-hover:text-indigo-400 transition-colors">
                        {tpl.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">{tpl.category}</p>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-1 rounded bg-indigo-600/20 text-indigo-300 font-medium group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    লোড করুন
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. VISUALS & BACKGROUND TAB */}
        {activeSubTab === 'visuals' && (
          <div className="space-y-4">
            {/* Color Palette Presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-200">প্রি-সেট গ্রেডিয়েন্ট প্যালেট</label>
              <div className="grid grid-cols-2 gap-2">
                {GRADIENT_PALETTES.map((pal) => (
                  <button
                    key={pal.name}
                    id={`btn-palette-${pal.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() =>
                      onUpdateDesign({
                        bgColor1: pal.c1,
                        bgColor2: pal.c2,
                        bgGradientAngle: pal.angle,
                        ctaBgColor: pal.accent,
                      })
                    }
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-600 text-left flex items-center gap-2.5 transition-all"
                  >
                    <div
                      className="w-6 h-6 rounded-md shadow border border-white/20 shrink-0"
                      style={{
                        background: `linear-gradient(${pal.angle}deg, ${pal.c1}, ${pal.c2})`,
                      }}
                    />
                    <div className="truncate">
                      <p className="text-[11px] font-medium text-slate-200 truncate">{pal.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Gradient Colors */}
            <div className="space-y-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <label className="text-xs font-semibold text-slate-200">কাস্টম গ্রেডিয়েন্ট কালার</label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="input-bg-color-1"
                    value={design.bgColor1}
                    onChange={(e) => onUpdateDesign({ bgColor1: e.target.value })}
                    className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <span className="text-xs text-slate-300 font-mono">{design.bgColor1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="input-bg-color-2"
                    value={design.bgColor2}
                    onChange={(e) => onUpdateDesign({ bgColor2: e.target.value })}
                    className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <span className="text-xs text-slate-300 font-mono">{design.bgColor2}</span>
                </div>
              </div>

              {/* Angle Slider */}
              <div className="space-y-1 pt-2">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>গ্রেডিয়েন্ট অ্যাঙ্গেল:</span>
                  <span>{design.bgGradientAngle}°</span>
                </div>
                <input
                  type="range"
                  id="range-gradient-angle"
                  min="0"
                  max="360"
                  value={design.bgGradientAngle}
                  onChange={(e) => onUpdateDesign({ bgGradientAngle: Number(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>

            {/* Ambient Lighting & Glow FX */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-200">অ্যাম্বিয়েন্ট গ্লো ও শ্যাডো ইফেক্ট</p>
                <p className="text-[11px] text-slate-400 font-bengali">পোস্ট ডিজাইনে ডেপথ ও আধুনিক লুক যোগ করে</p>
              </div>
              <input
                type="checkbox"
                id="check-glow-effects"
                checked={design.showGlowEffects}
                onChange={(e) => onUpdateDesign({ showGlowEffects: e.target.checked })}
                className="rounded accent-indigo-600 w-4 h-4"
              />
            </div>

            {/* Custom Background Image Overlay */}
            <div className="space-y-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <label className="text-xs font-semibold text-slate-200">কাস্টম ব্যাকগ্রাউন্ড ছবি যোগ করুন</label>
              <label className="flex items-center justify-center gap-2 w-full p-2.5 rounded-lg border border-dashed border-slate-700 hover:border-indigo-500 bg-slate-900 cursor-pointer transition-all text-xs text-slate-300">
                <Upload className="w-4 h-4 text-indigo-400" />
                <span>কম্পিউটার থেকে ব্যাকগ্রাউন্ড আপলোড</span>
                <input type="file" accept="image/*" onChange={handleBgImageUpload} className="hidden" />
              </label>
              {design.bgCustomImage && (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> ইমেজ লোড হয়েছে
                  </span>
                  <button
                    onClick={() => onUpdateDesign({ bgCustomImage: undefined })}
                    className="text-[11px] text-red-400 hover:underline"
                  >
                    রিমুভ
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. PRODUCT IMAGE TAB */}
        {activeSubTab === 'product' && (
          <div className="space-y-4">
            {/* Upload Client Product Photo */}
            <div className="space-y-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <label className="text-xs font-semibold text-slate-200">ক্লায়েন্টের প্রোডাক্ট ইমেজ আপলোড করুন</label>
              <label className="flex flex-col items-center justify-center gap-1.5 w-full py-4 rounded-lg border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-900 cursor-pointer transition-all text-xs text-slate-300">
                <Upload className="w-5 h-5 text-indigo-400" />
                <span className="font-medium">ছবি নির্বাচন করুন (PNG বা JPG)</span>
                <span className="text-[10px] text-slate-500">স্বচ্ছ ব্যাকগ্রাউন্ড (Transparent PNG) সবচেয়ে ভালো দেখাবে</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>

            {/* Quick Sample Products */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-200">অথবা নমুনা প্রোডাক্ট সিলেক্ট করুন</label>
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_CUTOUTS.map((prod) => (
                  <button
                    key={prod.id}
                    id={`btn-sample-product-${prod.id}`}
                    onClick={() => onUpdateDesign({ productImage: prod.url })}
                    className={`p-1.5 rounded-lg border bg-slate-950 transition-all flex flex-col items-center gap-1 ${
                      design.productImage === prod.url
                        ? 'border-indigo-500 ring-1 ring-indigo-500'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={prod.url}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-md"
                    />
                    <span className="text-[10px] text-slate-300 truncate w-full text-center">{prod.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Adjustments (Scale, X, Y, Shadow) */}
            <div className="space-y-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <label className="text-xs font-semibold text-slate-200">প্রোডাক্ট পজিশন ও সাইজ অ্যাডজাস্টমেন্ট</label>

              {/* Scale */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>সাইজ স্কেল:</span>
                  <span>{Math.round((design.productScale || 1) * 100)}%</span>
                </div>
                <input
                  type="range"
                  id="range-product-scale"
                  min="0.3"
                  max="1.8"
                  step="0.05"
                  value={design.productScale || 1}
                  onChange={(e) => onUpdateDesign({ productScale: Number(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>

              {/* Position X */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>অনুভূমিক পজিশন (X Offset):</span>
                  <span>{design.productPosX}%</span>
                </div>
                <input
                  type="range"
                  id="range-product-posx"
                  min="-45"
                  max="45"
                  value={design.productPosX}
                  onChange={(e) => onUpdateDesign({ productPosX: Number(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>

              {/* Position Y */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>উল্লম্ব পজিশন (Y Offset):</span>
                  <span>{design.productPosY}%</span>
                </div>
                <input
                  type="range"
                  id="range-product-posy"
                  min="-45"
                  max="45"
                  value={design.productPosY}
                  onChange={(e) => onUpdateDesign({ productPosY: Number(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>

              {/* Product Frame Shape */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] text-slate-400">ইমেজ ফ্রেম স্টাইল:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['none', 'rounded', 'circle'] as const).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => onUpdateDesign({ productShape: shape })}
                      className={`py-1 text-xs rounded border transition-all ${
                        design.productShape === shape
                          ? 'bg-indigo-600 text-white border-indigo-500'
                          : 'bg-slate-900 text-slate-400 border-slate-700'
                      }`}
                    >
                      {shape === 'none' ? 'স্বাভাবিক' : shape === 'rounded' ? 'রাউন্ড কার্ড' : 'সার্কেল'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drop Shadow */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-300">প্রোডাক্ট ড্রপ শ্যাডো (Depth)</span>
                <input
                  type="checkbox"
                  id="check-product-shadow"
                  checked={design.productShadow}
                  onChange={(e) => onUpdateDesign({ productShadow: e.target.checked })}
                  className="rounded accent-indigo-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* 5. CLIENT WATERMARK TAB */}
        {activeSubTab === 'watermark' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>ক্লায়েন্ট সিকিউরিটি ও ওয়াটারমার্ক</span>
              </div>
              <p className="text-xs text-amber-200/80 leading-relaxed font-bengali">
                নতুন ক্লায়েন্টদের সোশ্যাল পোস্ট বা ব্যানার ডিজাইন পাঠানোর সময় সবসময় ওয়াটারমার্ক দিয়ে প্রিভিউ পাঠান। পেমেন্ট পাওয়ার পর ওয়াটারমার্ক ছাড়া ফাইনাল হাই-রেজুলিউশন ফাইল ডেলিভারি দিন!
              </p>
            </div>

            {/* Toggle Watermark */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-200">ওয়াটারমার্ক সক্রিয় রাখুন</p>
                <p className="text-[11px] text-slate-400">ক্যানভাসে ডায়াগোনাল প্রোটেকশন টেক্সট দেখাবে</p>
              </div>
              <input
                type="checkbox"
                id="check-watermark-active"
                checked={design.showWatermark}
                onChange={(e) => onUpdateDesign({ showWatermark: e.target.checked })}
                className="rounded accent-amber-500 w-4 h-4"
              />
            </div>

            {/* Watermark Custom Text */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-200">ওয়াটারমার্ক লেখা (Watermark Text)</label>
              <input
                type="text"
                id="input-watermark-text"
                value={design.watermarkText}
                onChange={(e) => onUpdateDesign({ watermarkText: e.target.value })}
                placeholder="CLIENT PREVIEW • FOR APPROVAL ONLY"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Safe zone for Facebook Cover */}
            {design.format === 'fb_page_cover' && (
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-200">ফেসবুক কভার মোবাইল সেফ জোন</p>
                  <p className="text-[11px] text-slate-400">মোবাইলে ৬৪০px চওড়া অংশ ছাড়া দুই পাশ কেটে যায়</p>
                </div>
                <input
                  type="checkbox"
                  id="check-safezone-guide"
                  checked={design.showSafeZone}
                  onChange={(e) => onUpdateDesign({ showSafeZone: e.target.checked })}
                  className="rounded accent-red-500 w-4 h-4"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
