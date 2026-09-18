import React, { useState } from 'react';
import { 
  HelpCircle, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  Send, 
  Check, 
  Copy, 
  TrendingUp, 
  Award,
  Zap,
  Target
} from 'lucide-react';

export const SellingGuideModal: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyScript = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-y-auto p-4 lg:p-8 font-sans">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900/40 via-indigo-900/40 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">সোশ্যাল মিডিয়া ডিজাইন বিক্রি ও ক্লায়েন্ট পাওয়ার গাইড</h2>
              <p className="text-xs text-emerald-300 font-bengali mt-0.5">
                Facebook/Instagram পোস্ট, ব্যানার ও কভার বানিয়ে প্রতি মাসে রেকারিং ক্লায়েন্ট তৈরি করার প্রমাণিত কৌশল
              </p>
            </div>
          </div>
        </div>

        {/* 4 Core Steps to Sell */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-sm">
              ১
            </div>
            <h3 className="text-sm font-bold text-white">লোকাল টার্গেট ক্লায়েন্ট খুঁজুন</h3>
            <p className="text-xs text-slate-400 font-bengali leading-relaxed">
              ফেসবুকে সার্চ করুন: <em>"Boutique BD", "Gadget Shop", "Restaurant Dhaka", "Organic Food BD"</em>। যেসব পেজে নিয়মিত প্রোডাক্ট বিক্রি হয় কিন্তু ব্যানারের ডিজাইন সাধারণ বা দুর্বল, তাদেরকে টার্গেট করুন।
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold text-sm">
              ২
            </div>
            <h3 className="text-sm font-bold text-white">১টি ফ্রি স্যাম্পল মকআপ বানিয়ে দেখান</h3>
            <p className="text-xs text-slate-400 font-bengali leading-relaxed">
              সরাসরি কাজ চাওয়ার চেয়ে ক্লায়েন্টের পেজের ১টি প্রোডাক্টের ছবি নিয়ে আমাদের স্টুডিওতে সুন্দর পোস্ট ও কভার বানিয়ে <strong>ওয়াটারমার্ক সহ লাইভ মকআপ</strong> স্ক্রিনশট পাঠিয়ে মেসেজ দিন। এতে কনভার্সন রেট ৩ গুণ বাড়ে!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold text-sm">
              ৩
            </div>
            <h3 className="text-sm font-bold text-white">৫০% অগ্রিম পেমেন্ট নিশ্চিত করুন</h3>
            <p className="text-xs text-slate-400 font-bengali leading-relaxed">
              ডিজাইন শুরু করার আগেই ৫০% বিকাশ/নগদে অ্যাডভান্স নিন। ক্লায়েন্টকে ড্রাফট দেখানোর সময় ওয়াটারমার্ক চালু রাখুন। ফুল পেমেন্ট পাওয়ার পর হাই-রেজুলিউশন ফাইল ডেলিভারি দিন।
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 font-bold text-sm">
              ৪
            </div>
            <h3 className="text-sm font-bold text-white">মান্থলি প্যাকেজে কনভার্ট করুন</h3>
            <p className="text-xs text-slate-400 font-bengali leading-relaxed">
              সিঙ্গেল পোস্টের চেয়ে পেজ ওনারদের মান্থলি প্যাকেজ অফার করুন: <em>"প্রতি মাসে ১৫টি পোস্ট + ১টি পেজ কভার মাত্র ৳৪,৫০০"</em>। ৩-৪ জন স্থায়ী ক্লায়েন্ট থাকলেই প্রতি মাসে ফিক্সড ১৫-২০ হাজার টাকা আয় সম্ভব।
            </p>
          </div>
        </div>

        {/* Pricing Benchmarks Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">সোশ্যাল মিডিয়া ডিজাইন প্রাইসিং বেঞ্চমার্ক (Market Rates)</h3>
          </div>

          <div className="border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3 font-semibold">ডিজাইন সার্ভিস</th>
                  <th className="p-3 font-semibold">লোকাল ক্লায়েন্ট রেট (BDT)</th>
                  <th className="p-3 font-semibold">আন্তর্জাতিক ক্লায়েন্ট রেট (USD)</th>
                  <th className="p-3 font-semibold">ডেলিভারি সময়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-medium text-white">১টি স্ট্যান্ডার্ড স্কয়ার পোস্ট (FB/Instagram)</td>
                  <td className="p-3 font-mono text-emerald-400">৳২০০ - ৳৪০০</td>
                  <td className="p-3 font-mono text-emerald-400">$৫ - $১৫</td>
                  <td className="p-3">১২-২৪ ঘণ্টা</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-medium text-white">১টি ফেসবুক পেজ কভার ব্যানার</td>
                  <td className="p-3 font-mono text-emerald-400">৳৫০০ - ৳১,০০০</td>
                  <td className="p-3 font-mono text-emerald-400">$১৫ - $৩৫</td>
                  <td className="p-3">২৪ ঘণ্টা</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-medium text-white">১০টি পোস্ট স্টার্টার বান্ডেল</td>
                  <td className="p-3 font-mono text-emerald-400">৳২,০০০ - ৳৩,০০০</td>
                  <td className="p-3 font-mono text-emerald-400">$৫০ - $৯০</td>
                  <td className="p-3">৩-৫ দিন</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-medium text-white">মান্থলি সোশ্যাল মিডিয়া প্যাক (১৫-২০ পোস্ট + কভার)</td>
                  <td className="p-3 font-mono text-emerald-400">৳৫,০০০ - ৳১২,০০০</td>
                  <td className="p-3 font-mono text-emerald-400">$১০০ - $২৫০</td>
                  <td className="p-3">পুরো মাস জুড়ে</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Ready-to-use Client Outreach Scripts */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">কপি-পেস্ট ক্লায়েন্ট আউটরিচ মেসেজ স্ক্রিপ্ট</h3>
          </div>

          <div className="space-y-4">
            {/* Script 1 */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300">
                  ১. ফেসবুক পেজ মালিকদের মেসেঞ্জারে পাঠানোর স্ক্রিপ্ট (Bengali):
                </span>
                <button
                  onClick={() =>
                    copyScript(
                      `আসসালামু আলাইকুম [ক্লায়েন্টের পেজ নাম] টিম,\n\nআপনাদের পেজের প্রোডাক্ট কালেকশনগুলো সত্যিই চমৎকার! তবে লক্ষ্য করলাম সোশ্যাল মিডিয়া পোস্ট ও ব্যানারের গ্রাফিক্স আরও প্রিমিয়াম করা গেলে কাস্টমারদের আস্থা ও সেলস আরও বহু গুণ বৃদ্ধি পেত।\n\nআমি প্রফেশনাল সোশ্যাল মিডিয়া গ্রাফিক ডিজাইনার হিসেবে কাজ করছি। আপনাদের জন্য ১টি স্পেশাল টেস্ট পোস্ট ও ব্যানার ডিজাইন করে মকআপ বানিয়েছি (সংযুক্ত)।\n\nআপনি চাইলে আপনাদের পেজের জন্য ১০টি হাই-কনভার্টিং সেলস পোস্ট + ১টি ফেসবুক কভার ব্যানার স্পেশাল ডিসকাউন্ট প্যাকেজে ডিজাইন করে দিতে পারি।\n\nএকটু সময় হবে বিস্তারিত আলোচনা করার?\nধন্যবাদ।`,
                      'scr1'
                    )
                  }
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1"
                >
                  {copiedId === 'scr1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>কপি করুন</span>
                </button>
              </div>
              <p className="text-xs text-slate-300 font-bengali leading-relaxed bg-slate-900/60 p-3 rounded-lg whitespace-pre-wrap">
                আসসালামু আলাইকুম [ক্লায়েন্টের পেজ নাম] টিম,{"\n\n"}
                আপনাদের পেজের প্রোডাক্ট কালেকশনগুলো সত্যিই চমৎকার! তবে লক্ষ্য করলাম সোশ্যাল মিডিয়া পোস্ট ও ব্যানারের গ্রাফিক্স আরও প্রিমিয়াম করা গেলে কাস্টমারদের আস্থা ও সেলস আরও বহু গুণ বৃদ্ধি পেত।{"\n\n"}
                আমি প্রফেশনাল সোশ্যাল মিডিয়া গ্রাফিক ডিজাইনার হিসেবে কাজ করছি। আপনাদের জন্য ১টি স্পেশাল টেস্ট পোস্ট ও ব্যানার ডিজাইন করে মকআপ বানিয়েছি (সংযুক্ত)।{"\n\n"}
                আপনি চাইলে আপনাদের পেজের জন্য ১০টি হাই-কনভার্টিং সেলস পোস্ট + ১টি ফেসবুক কভার ব্যানার স্পেশাল ডিসকাউন্ট প্যাকেজে ডিজাইন করে দিতে পারি।{"\n\n"}
                একটু সময় হবে বিস্তারিত আলোচনা করার?{"\n"}
                ধন্যবাদ।
              </p>
            </div>

            {/* Script 2 */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300">
                  ২. আন্তর্জাতিক বা ইংরেজি ক্লায়েন্টদের জন্য পিচ স্ক্রিপ্ট (Instagram / LinkedIn):
                </span>
                <button
                  onClick={() =>
                    copyScript(
                      `Hey [Name / Brand],\n\nI love what you're doing with [Brand Name]! I noticed your current social media graphics could look even sharper to drive higher ad conversions and brand authority.\n\nI am a professional social media designer specializing in high-converting Instagram/Facebook ad creatives and covers.\n\nI’d love to design a 10-post bundle or a custom header banner for you with unlimited revisions.\n\nWould you be open to seeing a quick sample mock-up I put together for your brand?\n\nBest regards!`,
                      'scr2'
                    )
                  }
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1"
                >
                  {copiedId === 'scr2' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>কপি করুন</span>
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg whitespace-pre-wrap font-sans">
                Hey [Name / Brand],{"\n\n"}
                I love what you're doing with [Brand Name]! I noticed your current social media graphics could look even sharper to drive higher ad conversions and brand authority.{"\n\n"}
                I am a professional social media designer specializing in high-converting Instagram/Facebook ad creatives and covers.{"\n\n"}
                I’d love to design a 10-post bundle or a custom header banner for you with unlimited revisions.{"\n\n"}
                Would you be open to seeing a quick sample mock-up I put together for your brand?{"\n\n"}
                Best regards!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
