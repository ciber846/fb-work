import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Plus, 
  Trash2, 
  Download, 
  CheckCircle2, 
  CreditCard,
  Building,
  Phone,
  Calendar,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClientInvoice, InvoiceItem } from '../types';

export const InvoiceBuilder: React.FC = () => {
  const [invoice, setInvoice] = useState<ClientInvoice>({
    invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    clientName: 'সাকিব আল হাসান',
    clientBusiness: 'Fashion Hub BD',
    clientPhone: '01712-345678',
    currency: 'BDT',
    items: [
      { id: '1', description: '১০টি ফেসবুক ও ইনস্টাগ্রাম প্রোডাক্ট পোস্ট ডিজাইন', quantity: 10, rate: 250 },
      { id: '2', description: '১টি অফিশিয়াল ফেসবুক পেজ কভার ব্যানার ডিজাইন', quantity: 1, rate: 600 },
      { id: '3', description: '২টি ইনস্টাগ্রাম রিলস/স্টোরি কভার টেমপ্লেট', quantity: 2, rate: 200 },
    ],
    advancePaid: 1000,
    paymentMethod: 'bKash / Nagad Personal',
    paymentDetails: '01700-000000 (Send Money)',
    notes: 'অ্যাপ্রুভালের পর ফাইনাল হাই-রেজুলিউশন পিএনজি ও এডিটেবল ফাইল ডেলিভারি করা হবে। ৩ বার ফ্রি রিভিশন সুবিধা অন্তর্ভুক্ত।',
  });

  const subtotal = invoice.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const total = subtotal;
  const due = Math.max(0, total - invoice.advancePaid);

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: 'নতুন সোশ্যাল মিডিয়া ব্যানার ডিজাইন',
      quantity: 1,
      rate: 300,
    };
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const handleRemoveItem = (id: string) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const handleUpdateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handlePrint = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
    });
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-y-auto p-4 lg:p-8 font-sans">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Header and Print action */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">ক্লায়েন্ট কোটেশন ও ইনভয়েস জেনারেটর</h2>
            </div>
            <p className="text-xs text-slate-400 font-bengali mt-0.5">
              ডিজাইন বিক্রির জন্য ক্লায়েন্টকে প্রফেশনাল ইনভয়েস ও বিল পাঠিয়ে পেমেন্ট সংগ্রহ করুন
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-print-invoice"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট বা PDF সেভ করুন</span>
            </button>
          </div>
        </div>

        {/* The Printable Invoice Paper */}
        <div 
          id="printable-invoice-card"
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 text-slate-100 print:bg-white print:text-black print:p-0 print:border-0"
        >
          {/* Invoice Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-800 pb-6 print:border-neutral-200">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                  PC
                </div>
                <span className="text-xl font-extrabold tracking-tight text-white print:text-black">
                  PostCraft Design Studio
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-bengali print:text-neutral-600">
                প্রফেশনাল সোশ্যাল মিডিয়া গ্রাফিক ডিজাইন ও ব্র্যান্ডিং
              </p>
            </div>

            <div className="text-right sm:text-right">
              <span className="text-2xl font-black text-indigo-400 tracking-wider print:text-indigo-600">
                INVOICE
              </span>
              <div className="text-xs text-slate-400 font-mono mt-1 print:text-neutral-600">
                #{invoice.invoiceNumber}
              </div>
              <div className="text-xs text-slate-400 mt-0.5 print:text-neutral-600">
                তারিখ: {invoice.date}
              </div>
            </div>
          </div>

          {/* Client & Bill-To Info Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 print:bg-neutral-50 print:border-neutral-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 print:text-indigo-600">
                বিল প্রাপক (Bill To Client):
              </span>
              <div className="space-y-1.5">
                <input
                  type="text"
                  value={invoice.clientName}
                  onChange={(e) => setInvoice({ ...invoice, clientName: e.target.value })}
                  placeholder="ক্লায়েন্টের নাম"
                  className="w-full bg-slate-900 print:bg-white border border-slate-700 print:border-neutral-300 rounded-lg px-2.5 py-1 text-xs text-white print:text-black font-semibold font-bengali"
                />
                <input
                  type="text"
                  value={invoice.clientBusiness}
                  onChange={(e) => setInvoice({ ...invoice, clientBusiness: e.target.value })}
                  placeholder="ক্লায়েন্টের পেজ / ব্র্যান্ড নাম"
                  className="w-full bg-slate-900 print:bg-white border border-slate-700 print:border-neutral-300 rounded-lg px-2.5 py-1 text-xs text-slate-200 print:text-black font-bengali"
                />
                <input
                  type="text"
                  value={invoice.clientPhone}
                  onChange={(e) => setInvoice({ ...invoice, clientPhone: e.target.value })}
                  placeholder="ফোন বা WhatsApp নম্বর"
                  className="w-full bg-slate-900 print:bg-white border border-slate-700 print:border-neutral-300 rounded-lg px-2.5 py-1 text-xs text-slate-200 print:text-black font-mono"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 print:bg-neutral-50 print:border-neutral-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-600">
                পেমেন্ট রিসিভ পদ্ধতি (Payment Info):
              </span>
              <div className="space-y-1.5">
                <input
                  type="text"
                  value={invoice.paymentMethod}
                  onChange={(e) => setInvoice({ ...invoice, paymentMethod: e.target.value })}
                  placeholder="যেমন: bKash / Nagad Personal"
                  className="w-full bg-slate-900 print:bg-white border border-slate-700 print:border-neutral-300 rounded-lg px-2.5 py-1 text-xs text-white print:text-black font-semibold font-bengali"
                />
                <input
                  type="text"
                  value={invoice.paymentDetails}
                  onChange={(e) => setInvoice({ ...invoice, paymentDetails: e.target.value })}
                  placeholder="যেমন: 017XXXXXXXX (Send Money)"
                  className="w-full bg-slate-900 print:bg-white border border-slate-700 print:border-neutral-300 rounded-lg px-2.5 py-1 text-xs text-slate-200 print:text-black font-mono"
                />
                <div className="text-[11px] text-slate-400 print:text-neutral-500">
                  পেমেন্ট পাঠানোর পর ট্রানজ্যাকশন আইডি ও স্ক্রিনশট দিন
                </div>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 print:text-neutral-700">
                সার্ভিস ও পোস্ট আইটেম তালিকা
              </span>
              <button
                onClick={handleAddItem}
                className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium flex items-center gap-1 hover:bg-indigo-600 hover:text-white transition-all print:hidden"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>আইটেম যোগ করুন</span>
              </button>
            </div>

            <div className="border border-slate-800 print:border-neutral-300 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 print:bg-neutral-100 text-slate-400 print:text-neutral-700 border-b border-slate-800 print:border-neutral-300">
                  <tr>
                    <th className="p-3 font-semibold">বিবরণ (Description)</th>
                    <th className="p-3 font-semibold w-20 text-center">পরিমাণ</th>
                    <th className="p-3 font-semibold w-28 text-right">রেট ({invoice.currency})</th>
                    <th className="p-3 font-semibold w-28 text-right">মোট</th>
                    <th className="p-3 font-semibold w-12 text-center print:hidden"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 print:divide-neutral-200">
                  {invoice.items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/30 print:hover:bg-transparent">
                      <td className="p-3">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                          className="w-full bg-transparent border-0 text-slate-200 print:text-neutral-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1 font-bengali"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdateItem(item.id, 'quantity', Number(e.target.value))}
                          className="w-14 text-center bg-slate-950 print:bg-white border border-slate-700 print:border-neutral-300 rounded p-1 text-slate-200 print:text-neutral-800"
                        />
                      </td>
                      <td className="p-3 text-right">
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => handleUpdateItem(item.id, 'rate', Number(e.target.value))}
                          className="w-20 text-right bg-slate-950 print:bg-white border border-slate-700 print:border-neutral-300 rounded p-1 text-slate-200 print:text-neutral-800"
                        />
                      </td>
                      <td className="p-3 text-right font-mono font-semibold text-white print:text-neutral-900">
                        {invoice.currency === 'BDT' ? '৳' : '$'}
                        {(item.quantity * item.rate).toLocaleString()}
                      </td>
                      <td className="p-3 text-center print:hidden">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                          title="মুছুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals & Due Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between gap-6 pt-4 border-t border-slate-800 print:border-neutral-300">
            <div className="space-y-2 max-w-sm">
              <span className="text-xs font-bold text-slate-400 print:text-neutral-600">শর্তাবলী ও নোট:</span>
              <textarea
                value={invoice.notes}
                onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })}
                rows={3}
                className="w-full bg-slate-950 print:bg-neutral-50 border border-slate-700 print:border-neutral-300 rounded-xl p-2.5 text-xs text-slate-300 print:text-neutral-800 font-bengali"
              />
            </div>

            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400 print:text-neutral-600">
                <span>সাব-টোটাল:</span>
                <span className="font-mono font-semibold text-slate-200 print:text-neutral-900">
                  {invoice.currency === 'BDT' ? '৳' : '$'}{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-400 print:text-neutral-600 items-center">
                <span>অগ্রিম পেইড (Advance):</span>
                <input
                  type="number"
                  value={invoice.advancePaid}
                  onChange={(e) => setInvoice({ ...invoice, advancePaid: Number(e.target.value) })}
                  className="w-24 text-right bg-slate-950 print:bg-white border border-slate-700 print:border-neutral-300 rounded p-1 font-mono text-emerald-400 print:text-emerald-700 font-semibold"
                />
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-800 print:border-neutral-300 text-sm font-bold">
                <span className="text-white print:text-neutral-900">বাকি টাকা (Balance Due):</span>
                <span className="text-indigo-400 print:text-indigo-600 text-base font-mono">
                  {invoice.currency === 'BDT' ? '৳' : '$'}{due.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Signature */}
          <div className="pt-8 border-t border-slate-800/80 print:border-neutral-200 flex justify-between items-end text-xs text-slate-500 print:text-neutral-500">
            <div>
              <p>ধন্যবাদ আমাদের সাথে কাজ করার জন্য!</p>
              <p className="text-[11px] mt-0.5 font-bengali">আমরা প্রতিটি ডিজাইনে সর্বোচ্চ ক্লায়েন্ট সন্তুষ্টি নিশ্চিত করি।</p>
            </div>
            <div className="text-right">
              <div className="w-32 border-b border-slate-700 print:border-neutral-400 mb-1" />
              <p className="font-medium text-slate-400 print:text-neutral-700">ডিজাইনার স্বাক্ষর</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
