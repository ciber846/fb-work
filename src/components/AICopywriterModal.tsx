import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Send, 
  ArrowRight, 
  RefreshCw, 
  Briefcase, 
  MessageSquare,
  DollarSign,
  Palette
} from 'lucide-react';
import { DesignState } from '../types';

interface AICopywriterModalProps {
  design: DesignState;
  onApplyToCanvas: (updates: Partial<DesignState>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AICopywriterModal: React.FC<AICopywriterModalProps> = ({
  design,
  onApplyToCanvas,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'copy' | 'pitch'>('copy');
  
  // Copy form state
  const [niche, setNiche] = useState<string>('E-commerce');
  const [topic, setTopic] = useState<string>('নতুন কালেকশন ও স্পেশাল অফার');
  const [offer, setOffer] = useState<string>('৫০% পর্যন্ত ছাড় ও ফ্রি ক্যাশ অন ডেলিভারি');
  const [tone, setTone] = useState<string>('আকর্ষণীয় ও হাই-কনভার্টিং');
  const [language, setLanguage] = useState<string>('বাংলা (Bengali)');
  const [isGeneratingCopy, setIsGeneratingCopy] = useState<boolean>(false);
  const [generatedCopy, setGeneratedCopy] = useState<any>(null);

  // Pitch form state
  const [clientName, setClientName] = useState<string>('Trend Fashion BD');
  const [businessType, setBusinessType] = useState<string>('অনলাইন ক্লদিং ও বুটিক শপ');
  const [postCount, setPostCount] = useState<string>('১০টি প্রফেশনাল পোস্ট ডিজাইন + ১টি ফ্রি ফেসবুক কভার');
  const [price, setPrice] = useState<string>('২৫০০');
  const [currency, setCurrency] = useState<string>('BDT');
  const [isGeneratingPitch, setIsGeneratingPitch] = useState<boolean>(false);
  const [generatedPitch, setGeneratedPitch] = useState<any>(null);

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleGenerateCopy = async () => {
    setIsGeneratingCopy(true);
    try {
      const res = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche,
          topic,
          offer,
          platform: design.format === 'fb_page_cover' ? 'Facebook Cover' : 'Facebook & Instagram',
          tone,
          language,
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setGeneratedCopy(json.data);
      }
    } catch (e) {
      console.error('Copy generation error:', e);
    } finally {
      setIsGeneratingCopy(false);
    }
  };

  const handleGeneratePitch = async () => {
    setIsGeneratingPitch(true);
    try {
      const res = await fetch('/api/generate-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          businessType,
          postCount,
          price,
          currency,
          platformTarget: 'Facebook Page ও Instagram',
          language,
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setGeneratedPitch(json.data);
      }
    } catch (e) {
      console.error('Pitch generation error:', e);
    } finally {
      setIsGeneratingPitch(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Gemini AI কপিরাইটার ও সেলস অ্যাসিস্ট্যান্ট</h2>
              <p className="text-xs text-slate-400 font-bengali">
                আকর্ষণীয় বিজ্ঞাপন কপি, অফার টেক্সট ও ক্লায়েন্ট ক্লোজিং পিচ বানান
              </p>
            </div>
          </div>
          <button
            id="btn-close-ai-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm font-semibold transition-all"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-900 px-6 pt-3 gap-2">
          <button
            id="btn-ai-tab-copy"
            onClick={() => setActiveTab('copy')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'copy'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>পোস্ট ও ব্যানার কপি (Copy Generator)</span>
          </button>
          <button
            id="btn-ai-tab-pitch"
            onClick={() => setActiveTab('pitch')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'pitch'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>ক্লায়েন্ট সেলস পিচ ও প্রস্তাব (Client Pitch & Sales)</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: POST COPY GENERATOR */}
          {activeTab === 'copy' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300">বিজনেস ক্যাটাগরি / ইন্ডাস্ট্রি</label>
                  <select
                    id="select-niche"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="E-commerce & Retail">🛍️ E-commerce ও অনলাইন শপ</option>
                    <option value="Food & Restaurant">🍔 ফুড ও রেস্তোরাঁ</option>
                    <option value="Fashion & Boutique">👗 ফ্যাশন ও বুটিক</option>
                    <option value="Gadgets & Electronics">📱 গ্যাজেট ও ইলেকট্রনিক্স</option>
                    <option value="Agency & B2B Service">🏢 ডিজিটাল এজেন্সি ও সার্ভিস</option>
                    <option value="Education & Course">🎓 অনলাইন কোর্স ও ফ্রিল্যান্সিং</option>
                    <option value="Beauty & Salon">💅 বিউটি পার্লার ও স্কিনকেয়ার</option>
                    <option value="Real Estate">🏡 রিয়েল এস্টেট ও প্রোপার্টি</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">কপির টোন (Tone)</label>
                  <select
                    id="select-tone"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="আকর্ষণীয় ও হাই-কনভার্টিং">🔥 আকর্ষণীয় ও হাই-কনভার্টিং</option>
                    <option value="সীমিত সময়ের অফার (FOMO)">⚡ সীমিত সময়ের মেগা অফার (Urgency)</option>
                    <option value="প্রফেশনাল ও ট্রাস্টেড">🤝 প্রফেশনাল ও বিশ্বস্ত</option>
                    <option value="সহজ ও বন্ধুত্বপূর্ণ">💬 সহজ ও বন্ধুত্বপূর্ণ</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">প্রোডাক্ট / ক্যাম্পেইনের বিষয়</label>
                  <input
                    type="text"
                    id="input-ai-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="যেমন: নতুন ঈদ কালেকশন পাঞ্জাবি"
                    className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 font-bengali"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">স্পেশাল অফার বা ছাড় (যদি থাকে)</label>
                  <input
                    type="text"
                    id="input-ai-offer"
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    placeholder="যেমন: ৪০% ছাড়, ১টি কিনলে ১টি ফ্রি"
                    className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 font-bengali"
                  />
                </div>
              </div>

              <button
                id="btn-generate-ai-copy"
                onClick={handleGenerateCopy}
                disabled={isGeneratingCopy}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isGeneratingCopy ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Gemini AI আকর্ষণীয় কপি তৈরি করছে...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>সোশ্যাল কপি ও ক্যাপশন তৈরি করুন</span>
                  </>
                )}
              </button>

              {/* Generated Copy Output */}
              {generatedCopy && (
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">
                      জেনারেটেড ডিজাইন টেক্সট ও ক্যাপশন:
                    </h3>
                    <button
                      id="btn-apply-all-canvas"
                      onClick={() => {
                        onApplyToCanvas({
                          headline: generatedCopy.headline,
                          subheadline: generatedCopy.subheadline,
                          badgeText: generatedCopy.badgeText,
                          ctaText: generatedCopy.ctaText,
                          showBadge: true,
                          showCta: true,
                        });
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
                    >
                      <span>এক ক্লিকে ক্যানভাসে বসান</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Headline & Subheadline Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">মূল হেডলাইন</span>
                      <p className="text-sm font-bold text-white font-bengali">{generatedCopy.headline}</p>
                      <button
                        onClick={() => copyToClipboard(generatedCopy.headline, 'hl')}
                        className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1 pt-1"
                      >
                        {copiedField === 'hl' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>কপি</span>
                      </button>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">সাব-হেডলাইন</span>
                      <p className="text-xs text-slate-200 font-bengali">{generatedCopy.subheadline}</p>
                      <button
                        onClick={() => copyToClipboard(generatedCopy.subheadline, 'sub')}
                        className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1 pt-1"
                      >
                        {copiedField === 'sub' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>কপি</span>
                      </button>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">অফার ব্যাজ ট্যাগ</span>
                      <p className="text-xs font-bold text-amber-400 font-bengali">{generatedCopy.badgeText}</p>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">CTA বাটন টেক্সট</span>
                      <p className="text-xs font-bold text-emerald-400 font-bengali">{generatedCopy.ctaText}</p>
                    </div>
                  </div>

                  {/* Full Caption */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">
                        সম্পূর্ণ পোস্ট ক্যাপশন (ইমোজি ও হ্যাশট্যাগ সহ ক্লায়েন্টকে দেওয়ার জন্য):
                      </span>
                      <button
                        onClick={() => copyToClipboard(generatedCopy.fullCaption, 'caption')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 transition-all"
                      >
                        {copiedField === 'caption' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedField === 'caption' ? 'কপি হয়েছে' : 'ক্যাপশন কপি'}</span>
                      </button>
                    </div>
                    <pre className="text-xs text-slate-300 font-bengali whitespace-pre-wrap leading-relaxed bg-slate-900/60 p-3 rounded-lg">
                      {generatedCopy.fullCaption}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CLIENT SALES PITCH & PROPOSAL */}
          {activeTab === 'pitch' && (
            <div className="space-y-5">
              <div className="p-3.5 bg-indigo-950/30 border border-indigo-500/30 rounded-2xl flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-xs text-indigo-200/90 leading-relaxed font-bengali">
                  <strong>ক্লায়েন্টের কাছে ডিজাইন বিক্রি করার ট্রিক:</strong> ফেসবুক বা ইনস্টাগ্রাম পেজ মালিকদের সরাসরি মেসেঞ্জারে বা হোয়াটসঅ্যাপে প্রফেশনাল পিচ পাঠিয়ে অর্ডার নেওয়া যায়। নিচের তথ্য দিয়ে ১ ক্লিকে হাই-কনভার্টিং পিচ স্ক্রিপ্ট তৈরি করুন।
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300">ক্লায়েন্ট / পেজ নাম</label>
                  <input
                    type="text"
                    id="input-pitch-client-name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Trend Fashion BD"
                    className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">ক্লায়েন্টের ব্যবসার ধরন</label>
                  <input
                    type="text"
                    id="input-pitch-business-type"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    placeholder="অনলাইন ক্লদিং ও বুটিক শপ"
                    className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-bengali"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">সার্ভিস প্যাকেজ ডেলিভারেবলস</label>
                  <input
                    type="text"
                    id="input-pitch-package"
                    value={postCount}
                    onChange={(e) => setPostCount(e.target.value)}
                    placeholder="১০টি প্রফেশনাল পোস্ট + ১টি কভার ব্যানার"
                    className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-bengali"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-300">প্যাকেজ রেট / মূল্য</label>
                    <input
                      type="number"
                      id="input-pitch-price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="2500"
                      className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">মুদ্রা</label>
                    <select
                      id="select-pitch-currency"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="BDT">৳ BDT (টাকা)</option>
                      <option value="USD">$ USD (ডলার)</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                id="btn-generate-ai-pitch"
                onClick={handleGeneratePitch}
                disabled={isGeneratingPitch}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isGeneratingPitch ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Gemini AI ক্লায়েন্ট পিচ লিখছে...</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4" />
                    <span>ক্লায়েন্ট সেলস পিচ মেসেজ তৈরি করুন</span>
                  </>
                )}
              </button>

              {/* Pitch Output */}
              {generatedPitch && (
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  {/* Cold Outreach Script */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                        <Send className="w-3.5 h-3.5" />
                        ক্লায়েন্টকে পাঠানোর প্রাথমিক মেসেজ (WhatsApp / Messenger Pitch):
                      </span>
                      <button
                        onClick={() => copyToClipboard(generatedPitch.coldPitch, 'cold')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1"
                      >
                        {copiedField === 'cold' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>কপি করুন</span>
                      </button>
                    </div>
                    <pre className="text-xs text-slate-300 font-bengali whitespace-pre-wrap leading-relaxed bg-slate-900/70 p-3 rounded-lg">
                      {generatedPitch.coldPitch}
                    </pre>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-300">
                        প্রফেশনাল প্রাইসিং অফার ব্রেকডাউন:
                      </span>
                      <button
                        onClick={() => copyToClipboard(generatedPitch.pricingProposal, 'proposal')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1"
                      >
                        {copiedField === 'proposal' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>কপি করুন</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 font-bengali whitespace-pre-wrap leading-relaxed">
                      {generatedPitch.pricingProposal}
                    </p>
                  </div>

                  {/* Follow up message */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300">
                        ২৪ ঘণ্টা পর ফলো-আপ মেসেজ (যদি রেসপন্স না আসে):
                      </span>
                      <button
                        onClick={() => copyToClipboard(generatedPitch.followUpMessage, 'follow')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1"
                      >
                        {copiedField === 'follow' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>কপি করুন</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 font-bengali whitespace-pre-wrap leading-relaxed">
                      {generatedPitch.followUpMessage}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
