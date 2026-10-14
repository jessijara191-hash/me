import React from 'react';
import {
  Sparkles,
  LayoutDashboard,
  BotMessageSquare,
  Search,
  Share2,
  MessagesSquare,
  ShoppingBag,
  Settings,
  Zap,
  Globe2,
} from 'lucide-react';

export type ActiveTab =
  | 'dashboard'
  | 'bossChat'
  | 'viralHunter'
  | 'marketing'
  | 'customerChat'
  | 'storefront'
  | 'settings';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isAutopilotRunning: boolean;
  currency: 'BDT' | 'USD' | 'CAD' | 'GBP';
  setCurrency: (curr: 'BDT' | 'USD' | 'CAD' | 'GBP') => void;
  onSimulateSale: () => void;
  totalOrdersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isAutopilotRunning,
  currency,
  setCurrency,
  onSimulateSale,
  totalOrdersCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand Logo & Autopilot Pill */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-cyan-300 via-white to-blue-300 bg-clip-text text-transparent">
                    amgoolfree
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 bg-cyan-950 border border-cyan-800/70 text-cyan-400 rounded-md">
                    AI 24/7
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  অটোনোমাস এআই ইকমার্স ও মার্কেটিং পার্টনার
                </p>
              </div>
            </button>

            {/* 24/7 Autopilot Live Pulse Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs">
              <span className="relative flex h-2.5 w-2.5">
                {isAutopilotRunning && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    isAutopilotRunning ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                ></span>
              </span>
              <span className="text-slate-300 font-medium">
                {isAutopilotRunning ? '২৪/৭ অটোমেটিক চালু' : 'পজ করা আছে'}
              </span>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden xl:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>ড্যাশবোর্ড ও সেলস</span>
            </button>

            <button
              onClick={() => setActiveTab('bossChat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all relative ${
                activeTab === 'bossChat'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BotMessageSquare className="w-4 h-4 text-blue-400" />
              <span>আমার এআই বন্ধু</span>
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            </button>

            <button
              onClick={() => setActiveTab('viralHunter')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'viralHunter'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>আলিবাবা/এক্সপ্রেস হান্টার (+২০%)</span>
            </button>

            <button
              onClick={() => setActiveTab('marketing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'marketing'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Share2 className="w-4 h-4 text-purple-400" />
              <span>মার্কেটিং ও ভিডিও</span>
            </button>

            <button
              onClick={() => setActiveTab('customerChat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'customerChat'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <MessagesSquare className="w-4 h-4 text-emerald-400" />
              <span>লাইভ চ্যাট ও কল</span>
            </button>

            <button
              onClick={() => setActiveTab('storefront')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'storefront'
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-pink-400" />
              <span>গ্রাহক ওয়েবসাইট</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>অটোপাইলট</span>
            </button>
          </nav>

          {/* Right Controls: Currency Selector & Quick Sale Simulator Button */}
          <div className="flex items-center gap-2">
            {/* Currency Selector */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
              <Globe2 className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
              {(['BDT', 'USD', 'CAD', 'GBP'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-1.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                    currency === c
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {c === 'BDT' ? '৳ BDT' : c}
                </button>
              ))}
            </div>

            {/* Quick Simulate Autonomous Sale Trigger */}
            <button
              onClick={onSimulateSale}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-emerald-900/30 active:scale-95 transition-all"
              title="এআই স্বয়ংক্রিয়ভাবে নতুন একজন গ্রাহক এনে সেল জেনারেট করবে"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">অটো সেলস টেস্ট</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="xl:hidden flex items-center justify-between overflow-x-auto py-2 gap-1 border-t border-slate-800/60 no-scrollbar text-[11px]">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${
              activeTab === 'dashboard'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400'
            }`}
          >
            📊 ড্যাশবোর্ড
          </button>
          <button
            onClick={() => setActiveTab('bossChat')}
            className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${
              activeTab === 'bossChat'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : 'text-slate-400'
            }`}
          >
            🤖 এআই বন্ধু
          </button>
          <button
            onClick={() => setActiveTab('viralHunter')}
            className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${
              activeTab === 'viralHunter'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400'
            }`}
          >
            🌐 আলিএক্সপ্রেস
          </button>
          <button
            onClick={() => setActiveTab('marketing')}
            className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${
              activeTab === 'marketing'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-400'
            }`}
          >
            📢 মার্কেটিং
          </button>
          <button
            onClick={() => setActiveTab('customerChat')}
            className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${
              activeTab === 'customerChat'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400'
            }`}
          >
            💬 চ্যাট ও কল
          </button>
          <button
            onClick={() => setActiveTab('storefront')}
            className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${
              activeTab === 'storefront'
                ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                : 'text-slate-400'
            }`}
          >
            🛍️ ওয়েবসাইট
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${
              activeTab === 'settings'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400'
            }`}
          >
            ⚙️ অটোপাইলট
          </button>
        </div>
      </div>
    </header>
  );
};
