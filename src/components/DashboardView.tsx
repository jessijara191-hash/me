import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Package,
  Users,
  Activity,
  ExternalLink,
  CheckCircle2,
  Clock,
  Truck,
  ArrowUpRight,
  Filter,
  Sparkles,
  Bot,
  ShieldCheck,
  Percent,
} from 'lucide-react';
import { Order, LiveActivity, CountryCode } from '../types';
import { formatPrice, getCountryFlag, getCountryName } from '../utils/currency';

interface DashboardViewProps {
  orders: Order[];
  activities: LiveActivity[];
  currency: 'BDT' | 'USD' | 'CAD' | 'GBP';
  onVisitStorefront: () => void;
  onOpenBossChat: () => void;
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  orders,
  activities,
  currency,
  onVisitStorefront,
  onOpenBossChat,
  onUpdateOrderStatus,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Filter orders by country and status
  const filteredOrders = orders.filter((o) => {
    const matchCountry = selectedCountry === 'ALL' || o.country === selectedCountry;
    const matchStatus = statusFilter === 'ALL' || o.status === statusFilter;
    return matchCountry && matchStatus;
  });

  // Financial aggregates
  const totalRevenueUSD = orders.reduce((sum, o) => sum + o.totalRevenueUSD, 0);
  const totalCostUSD = orders.reduce((sum, o) => sum + o.totalCostUSD, 0);
  const totalProfitUSD = orders.reduce((sum, o) => sum + o.profitUSD, 0);
  const averageProfitMargin = totalRevenueUSD > 0 ? (totalProfitUSD / totalCostUSD) * 100 : 20;

  // Country counts
  const countryOrders = {
    BD: orders.filter((o) => o.country === 'BD').length,
    US: orders.filter((o) => o.country === 'US').length,
    CA: orders.filter((o) => o.country === 'CA').length,
    UK: orders.filter((o) => o.country === 'UK').length,
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome & Autonomous Status Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-cyan-800/40 p-5 sm:p-7 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
              <Bot className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              amgoolfree এআই অ্যাডমিন ও ফুল অটোনমি প্যানেল
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              স্বাগতম! আপনার এআই কর্মী ২৪ ঘণ্টা সক্রিয় রয়েছে
            </h1>
            <p className="text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
              আলিবাবা ও আলিএক্সপ্রেস থেকে বাছাই করা ভাইরাল প্রোডাক্ট আপনার পার্সোনাল স্টোরে{' '}
              <span className="text-emerald-400 font-semibold">অটোমেটিক ২০% নিট লাভে</span> যুক্ত হচ্ছে।
              ফেসবুক, টিকটক, ইনস্টাগ্রাম, ইউটিউব ও হোয়াটসঅ্যাপে এআই মানুষের মতো কথা বলে অর্ডার কনফার্ম করছে।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onVisitStorefront}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
            >
              <span>গ্রাহক ওয়েবসাইট দেখুন</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBossChat}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl text-xs sm:text-sm border border-slate-700 shadow-md active:scale-95 transition-all"
            >
              <Bot className="w-4 h-4 text-blue-400" />
              <span>এআই বন্ধুর সাথে ডিসকাস</span>
            </button>
          </div>
        </div>

        {/* Global Multi-Country Active Indicator */}
        <div className="mt-5 pt-4 border-t border-cyan-900/50 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-cyan-200">সক্রিয় মার্কেটপ্লেস:</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">
              🇧🇩 বাংলাদেশ ({countryOrders.BD})
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">
              🇺🇸 USA ({countryOrders.US})
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">
              🇨🇦 Canada ({countryOrders.CA})
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">
              🇬🇧 UK ({countryOrders.UK})
            </span>
          </div>

          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>অটো-মার্জিন লক: +২০% নিখুঁত লাভ</span>
          </div>
        </div>
      </div>

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">মোট বিক্রয় (Revenue)</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {formatPrice(totalRevenueUSD, currency)}
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-400 mt-2 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+২৪.৮% আজ নতুন সেলস</span>
          </div>
        </div>

        {/* Cost Price */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">কেনা দাম (Cost Price)</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-200">
            {formatPrice(totalCostUSD, currency)}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            আলিবাবা/এক্সপ্রেস সরাসরি সাপ্লায়ার খরচ
          </p>
        </div>

        {/* Net Profit (20% Profit) */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/40 p-5 shadow-lg shadow-emerald-950/30 relative overflow-hidden">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
              <Percent className="w-3.5 h-3.5" />
              নিট লাভ (২০% মার্জিন)
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-300">
            {formatPrice(totalProfitUSD, currency)}
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-400/90 mt-2 font-medium">
            <span>গড় মার্জিন: {averageProfitMargin.toFixed(1)}% নিট প্রফিট</span>
          </div>
        </div>

        {/* Orders Closed by AI */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">অটোমেটিক সেলস / অর্ডার</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {orders.length} টি অর্ডার
          </div>
          <p className="text-xs text-slate-400 mt-2">
            ১০০% এআই চ্যাট ও সোশ্যাল মার্কেটিংয়ের মাধ্যমে
          </p>
        </div>
      </div>

      {/* Main Grid: Orders Management (with Cost, Sale Price, Profit) & 24/7 Autopilot Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Orders Table */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>অটোমেটিক অর্ডার ও লাভ-লোকসান হিসাব</span>
                <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {filteredOrders.length} টি রেকর্ড
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                কেনা দাম, বিক্রি দাম এবং ২০% লাভে স্বয়ংক্রিয় প্রসেসিং
              </p>
            </div>

            {/* Country Selector Filter */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {(['ALL', 'BD', 'US', 'CA', 'UK'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCountry(c)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    selectedCountry === c
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {c === 'ALL' ? 'সকল দেশ' : `${getCountryFlag(c)} ${c}`}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-3.5">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                এই ফিল্টারে কোনো অর্ডার পাওয়া যায়নি।
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl bg-slate-950/70 border border-slate-800/80 p-4 hover:border-slate-700 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl" title={getCountryName(order.country)}>
                        {getCountryFlag(order.country)}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{order.customerName}</span>
                          <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/50">
                            {order.orderNumber}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {order.city} • {order.customerPhone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium">
                        {order.channel}
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          onUpdateOrderStatus(order.id, e.target.value as Order['status'])
                        }
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border outline-none cursor-pointer transition-colors ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                            : order.status === 'Shipped'
                            ? 'bg-blue-950/80 text-blue-300 border-blue-700'
                            : order.status === 'Auto-Processing'
                            ? 'bg-purple-950/80 text-purple-300 border-purple-700'
                            : 'bg-amber-950/80 text-amber-300 border-amber-700'
                        }`}
                      >
                        <option value="Pending">Pending (অপেক্ষমান)</option>
                        <option value="Auto-Processing">Auto-Processing (অটো প্রসেসিং)</option>
                        <option value="Shipped">Shipped (ডেলিভারির জন্য বের হয়েছে)</option>
                        <option value="Delivered">Delivered (সম্পন্ন)</option>
                      </select>
                    </div>
                  </div>

                  {/* Product items in order */}
                  <div className="bg-slate-900/60 rounded-lg p-2.5 space-y-1.5 border border-slate-800/60 text-xs">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex items-center justify-between text-slate-300">
                        <div className="flex items-center gap-2 truncate">
                          <img
                            src={it.product.image}
                            alt={it.product.title}
                            className="w-7 h-7 rounded object-cover shrink-0"
                          />
                          <span className="truncate font-medium">{it.product.banglaTitle}</span>
                          <span className="text-slate-400">x{it.quantity}</span>
                        </div>
                        <span className="font-semibold text-slate-200 shrink-0 ml-2">
                          {formatPrice(it.product.salePriceUSD * it.quantity, currency)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Financial Breakdown: Cost vs Sale Price vs 20% Net Profit */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/60 text-xs">
                    <div className="flex items-center gap-4 text-slate-400">
                      <div>
                        <span>কেনা খরচ: </span>
                        <span className="text-amber-400 font-semibold">
                          {formatPrice(order.totalCostUSD, currency)}
                        </span>
                      </div>
                      <div>
                        <span>বিক্রয় মূল্য: </span>
                        <span className="text-white font-semibold">
                          {formatPrice(order.totalRevenueUSD, currency)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-medium">নিট প্রফিট:</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold">
                        +{formatPrice(order.profitUSD, currency)} (২০%)
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Col: 24/7 Autopilot Live Activity Stream */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <h3 className="font-bold text-white text-sm">২৪/৭ লাইভ এআই অ্যাকশন ফিড</h3>
            </div>
            <span className="text-[11px] text-cyan-400 font-mono">লাইভ স্ট্রিমিং</span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[560px] pr-1">
            {activities.map((act) => (
              <div
                key={act.id}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all text-xs space-y-1"
              >
                <div className="flex items-center justify-between gap-1 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 font-semibold text-cyan-300">
                    {act.platform && (
                      <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {act.platform}
                      </span>
                    )}
                    {act.country && <span>{getCountryFlag(act.country)}</span>}
                    <span>{act.title}</span>
                  </span>
                  <span className="text-slate-400">{act.timestamp}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{act.detail}</p>
                {act.amountUSD && (
                  <div className="pt-1 flex items-center justify-end text-emerald-400 font-bold">
                    +{formatPrice(act.amountUSD, currency)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* AI Autonomous Worker Health Status */}
          <div className="mt-auto pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center justify-between">
              <span>ফেসবুক ও টিকটক বট:</span>
              <span className="text-emerald-400 font-semibold">সক্রিয় (Active)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>হোয়াটসঅ্যাপ ও ভয়েস কল:</span>
              <span className="text-emerald-400 font-semibold">অনলাইন (Online)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>আলিবাবা স্ক্যানার:</span>
              <span className="text-emerald-400 font-semibold">প্রতিনিয়ত রানিং</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
