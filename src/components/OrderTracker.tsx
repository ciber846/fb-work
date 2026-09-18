import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  Phone, 
  Calendar,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { ClientOrder } from '../types';

interface OrderTrackerProps {
  onSwitchToInvoice: () => void;
}

const DEFAULT_ORDERS: ClientOrder[] = [
  {
    id: 'ord-1',
    clientName: 'তানভীর আহমেদ',
    businessName: 'Gadget Mania BD',
    phoneOrWhatsApp: '01712-998877',
    serviceType: '১০টি গ্যাজেট সেলস ব্যানার + ১টি কভার',
    postCount: 11,
    price: 3000,
    advancePaid: 1500,
    currency: 'BDT',
    deadline: '2026-09-22',
    status: 'In Client Review',
    notes: 'ক্লায়েন্টকে প্রিভিউ পাঠানো হয়েছে, কাল সকালের মধ্যে ফিডব্যাক দিবে।',
    createdAt: '2026-09-18',
  },
  {
    id: 'ord-2',
    clientName: 'ফারহানা ইসলাম',
    businessName: 'Boutique By Farhana',
    phoneOrWhatsApp: '01811-223344',
    serviceType: '৫টি ইনস্টাগ্রাম ফ্যাশন স্কয়ার পোস্ট',
    postCount: 5,
    price: 1500,
    advancePaid: 1500,
    currency: 'BDT',
    deadline: '2026-09-20',
    status: 'Approved',
    notes: 'ফাইনাল হাই-রেজুলিউশন ফাইল ডেলিভারি দেওয়া হয়েছে। ফুল পেমেন্ট কমপ্লিট।',
    createdAt: '2026-09-17',
  },
  {
    id: 'ord-3',
    clientName: 'রাকিবুল হাসান',
    businessName: 'Crispy Kitchen Cafe',
    phoneOrWhatsApp: '01999-556677',
    serviceType: 'রেস্তোরাঁ অফার পোস্ট ও ফেসবুক কভার',
    postCount: 6,
    price: 2000,
    advancePaid: 500,
    currency: 'BDT',
    deadline: '2026-09-24',
    status: 'Drafting',
    notes: 'ফুড ফটো কালেক্ট করা হয়েছে, ড্রাফট ডিজাইন তৈরি হচ্ছে।',
    createdAt: '2026-09-18',
  },
];

export const OrderTracker: React.FC<OrderTrackerProps> = ({ onSwitchToInvoice }) => {
  const [orders, setOrders] = useState<ClientOrder[]>(() => {
    try {
      const saved = localStorage.getItem('postcraft_client_orders');
      return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
    } catch {
      return DEFAULT_ORDERS;
    }
  });

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newOrder, setNewOrder] = useState<Partial<ClientOrder>>({
    clientName: '',
    businessName: '',
    phoneOrWhatsApp: '',
    serviceType: '৫টি ফেসবুক পোস্ট ডিজাইন',
    postCount: 5,
    price: 1500,
    advancePaid: 500,
    currency: 'BDT',
    deadline: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
    status: 'Drafting',
    notes: '',
  });

  useEffect(() => {
    localStorage.setItem('postcraft_client_orders', JSON.stringify(orders));
  }, [orders]);

  const handleAddOrder = () => {
    if (!newOrder.clientName?.trim()) return;
    const order: ClientOrder = {
      id: `ord-${Date.now()}`,
      clientName: newOrder.clientName || 'ক্লায়েন্ট',
      businessName: newOrder.businessName || 'বিজনেস পেজ',
      phoneOrWhatsApp: newOrder.phoneOrWhatsApp || '',
      serviceType: newOrder.serviceType || 'পোস্ট ডিজাইন',
      postCount: newOrder.postCount || 1,
      price: newOrder.price || 0,
      advancePaid: newOrder.advancePaid || 0,
      currency: (newOrder.currency as any) || 'BDT',
      deadline: newOrder.deadline || '',
      status: (newOrder.status as any) || 'Drafting',
      notes: newOrder.notes || '',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setOrders([order, ...orders]);
    setShowAddModal(false);
    setNewOrder({
      clientName: '',
      businessName: '',
      phoneOrWhatsApp: '',
      serviceType: '৫টি ফেসবুক পোস্ট ডিজাইন',
      postCount: 5,
      price: 1500,
      advancePaid: 500,
      currency: 'BDT',
      deadline: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
      status: 'Drafting',
      notes: '',
    });
  };

  const handleDelete = (id: string) => {
    setOrders(orders.filter((o) => o.id !== id));
  };

  const handleStatusChange = (id: string, status: ClientOrder['status']) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.price, 0);
  const totalCollected = orders.reduce((sum, o) => sum + o.advancePaid, 0);
  const pendingDue = totalRevenue - totalCollected;

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-y-auto p-4 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto w-full space-y-6">
        {/* Header & Stats Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">ক্লায়েন্ট প্রজেক্ট ও সেলস পাইপলাইন</h2>
            </div>
            <p className="text-xs text-slate-400 font-bengali mt-0.5">
              সোশ্যাল মিডিয়া পোস্ট ও ব্যানার ডিজাইনের প্রতিটি ক্লায়েন্ট অর্ডার ও পেমেন্ট ট্র্যাক করুন
            </p>
          </div>

          <button
            id="btn-add-client-order"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন ক্লায়েন্ট অর্ডার যোগ করুন</span>
          </button>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">মোট প্রজেক্ট ভ্যালু</span>
            <div className="text-xl font-bold text-white font-mono mt-1">
              ৳{totalRevenue.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">{orders.length}টি অ্যাক্টিভ ও কমপ্লিট ক্লায়েন্ট</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-[11px] text-emerald-400 uppercase font-semibold">পেমেন্ট গৃহীত (Collected)</span>
            <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
              ৳{totalCollected.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">অগ্রিম ও সম্পূর্ণ পেমেন্ট</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-[11px] text-amber-400 uppercase font-semibold">বাকি সংগ্রহযোগ্য (Pending Due)</span>
            <div className="text-xl font-bold text-amber-400 font-mono mt-1">
              ৳{pendingDue.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">ডেলিভারির পর সংগ্রহযোগ্য</p>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              ক্লায়েন্ট প্রজেক্ট তালিকা ({orders.length})
            </h3>
            <button
              onClick={onSwitchToInvoice}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
            >
              <span>ইনভয়েস জেনারেট করুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {orders.map((order) => {
              const isDue = order.price > order.advancePaid;
              return (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow"
                >
                  <div className="space-y-1.5 max-w-md">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{order.businessName}</h4>
                      <span className="text-xs text-slate-400">• {order.clientName}</span>
                    </div>
                    <p className="text-xs text-indigo-300 font-bengali font-medium">
                      📦 {order.serviceType} ({order.postCount}টি আইটেম)
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                      {order.phoneOrWhatsApp && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-500" />
                          {order.phoneOrWhatsApp}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        ডেডলাইন: {order.deadline}
                      </span>
                    </div>
                    {order.notes && (
                      <p className="text-[11px] text-slate-400 italic bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800/80 font-bengali">
                        নোট: {order.notes}
                      </p>
                    )}
                  </div>

                  {/* Financial & Status Controls */}
                  <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-white">
                        {order.currency === 'BDT' ? '৳' : '$'}{order.price.toLocaleString()}
                      </div>
                      <div className="text-[11px]">
                        {isDue ? (
                          <span className="text-amber-400 font-semibold font-mono">
                            বাকি: {order.currency === 'BDT' ? '৳' : '$'}{(order.price - order.advancePaid).toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-emerald-400 font-medium">ফুল পেইড ✓</span>
                        )}
                      </div>
                    </div>

                    {/* Status Select */}
                    <div>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                        className={`text-xs font-semibold rounded-xl px-3 py-1.5 border focus:outline-none transition-all ${
                          order.status === 'Approved'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                            : order.status === 'In Client Review'
                            ? 'bg-purple-950/60 text-purple-300 border-purple-500/40'
                            : order.status === 'Revision'
                            ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                            : order.status === 'Delivered & Paid'
                            ? 'bg-blue-950/60 text-blue-300 border-blue-500/40'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        <option value="Drafting">📝 ডিজাইন ড্রাফটিং</option>
                        <option value="In Client Review">🔍 ক্লায়েন্ট প্রিভিউ রিভিউ</option>
                        <option value="Revision">✏️ রিভিশন কাজ চলছে</option>
                        <option value="Approved">✅ ক্লায়েন্ট অ্যাপ্রুভড</option>
                        <option value="Delivered & Paid">🎉 ডেলিভারি ও ফুল পেইড</option>
                      </select>
                    </div>

                    <button
                      onClick={() => handleDelete(order.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-all"
                      title="অর্ডার ডিলিট করুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Order Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">নতুন ক্লায়েন্ট অর্ডার যোগ করুন</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">ক্লায়েন্ট / পেজ নাম *</label>
                <input
                  type="text"
                  value={newOrder.businessName}
                  onChange={(e) => setNewOrder({ ...newOrder, businessName: e.target.value })}
                  placeholder="যেমন: Sneaker Store BD"
                  className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300">কন্টাক্ট পারসন</label>
                  <input
                    type="text"
                    value={newOrder.clientName}
                    onChange={(e) => setNewOrder({ ...newOrder, clientName: e.target.value })}
                    placeholder="নাম"
                    className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">ফোন / WhatsApp</label>
                  <input
                    type="text"
                    value={newOrder.phoneOrWhatsApp}
                    onChange={(e) => setNewOrder({ ...newOrder, phoneOrWhatsApp: e.target.value })}
                    placeholder="017XXXXXXXX"
                    className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">সার্ভিস টাইপ / প্যাকেজ</label>
                <input
                  type="text"
                  value={newOrder.serviceType}
                  onChange={(e) => setNewOrder({ ...newOrder, serviceType: e.target.value })}
                  placeholder="যেমন: ১০টি ফেসবুক পোস্ট + ১টি কভার"
                  className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-bengali"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300">পোস্ট সংখ্যা</label>
                  <input
                    type="number"
                    value={newOrder.postCount}
                    onChange={(e) => setNewOrder({ ...newOrder, postCount: Number(e.target.value) })}
                    className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">মোট রেট (৳)</label>
                  <input
                    type="number"
                    value={newOrder.price}
                    onChange={(e) => setNewOrder({ ...newOrder, price: Number(e.target.value) })}
                    className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">অগ্রিম পেইড (৳)</label>
                  <input
                    type="number"
                    value={newOrder.advancePaid}
                    onChange={(e) => setNewOrder({ ...newOrder, advancePaid: Number(e.target.value) })}
                    className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">নোট বা বিশেষ রিকোয়ারমেন্ট</label>
                <input
                  type="text"
                  value={newOrder.notes}
                  onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                  placeholder="যেমন: ক্লায়েন্ট রেড ও গোল্ডেন কালার প্রেফার করে"
                  className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-bengali"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800"
              >
                বাতিল
              </button>
              <button
                onClick={handleAddOrder}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                অর্ডার সেভ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
