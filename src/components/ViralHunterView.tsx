import React, { useState } from 'react';
import {
  Search,
  RefreshCw,
  Sparkles,
  Check,
  TrendingUp,
  Percent,
  ExternalLink,
  DollarSign,
  Star,
  Sliders,
  Send,
  Share2,
} from 'lucide-react';
import { Product, CountryCode } from '../types';
import { formatPrice, getCountryFlag } from '../utils/currency';

interface ViralHunterViewProps {
  products: Product[];
  onImportProduct: (productId: string) => void;
  onScanNewViral: () => void;
  isScanning: boolean;
  currency: 'BDT' | 'USD' | 'CAD' | 'GBP';
  onLaunchMarketing: (product: Product) => void;
  marginPercent: number;
  setMarginPercent: (val: number) => void;
}

export const ViralHunterView: React.FC<ViralHunterViewProps> = ({
  products,
  onImportProduct,
  onScanNewViral,
  isScanning,
  currency,
  onLaunchMarketing,
  marginPercent,
  setMarginPercent,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSource, setSelectedSource] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchSource = selectedSource === 'ALL' || p.supplierSource === selectedSource;
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.banglaTitle.includes(searchQuery);
    return matchCat && matchSource && matchSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Scanner Controls */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border border-amber-800/40 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              ২৪/৭ আলিবাবা ও আলিএক্সপ্রেস অটোমেটিক ভাইরাল হান্টার
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              ভাইরাল প্রোডাক্ট স্ক্যানার ও ২০% লাভ ক্যালকুলেটর
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              বিশ্বজুড়ে টিকটক ও সোশ্যাল মিডিয়ায় ট্রেন্ডিং সেরা প্রোডাক্টগুলো এআই প্রতিদিন স্বয়ংক্রিয়ভাবে খুঁজে বের করে
              এবং সরাসরি আপনার ওয়েবসাইটে ২০% লাভে যুক্ত করে।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onScanNewViral}
              disabled={isScanning}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'স্ক্যান করা হচ্ছে...' : 'নতুন ভাইরাল প্রোডাক্ট স্ক্যান করুন'}</span>
            </button>
          </div>
        </div>

        {/* Global Profit Margin Adjuster Slider */}
        <div className="mt-5 pt-4 border-t border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-200 flex items-center gap-1">
              <Percent className="w-4 h-4 text-emerald-400" />
              ডিফল্ট লাভ মার্জিন সেটিং:
            </span>
            <input
              type="range"
              min="10"
              max="40"
              value={marginPercent}
              onChange={(e) => setMarginPercent(Number(e.target.value))}
              className="accent-emerald-500 cursor-pointer w-32"
            />
            <span className="font-extrabold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
              +{marginPercent}% নিট লাভ
            </span>
          </div>

          <p className="text-slate-400">
            *প্রতিটি প্রোডাক্টের কেনা দামের উপর স্বয়ংক্রিয়ভাবে এই মার্জিন যুক্ত হয়ে সাইটে প্রকাশ পায়।
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(['ALL', 'AliExpress', 'Alibaba'] as const).map((source) => (
            <button
              key={source}
              onClick={() => setSelectedSource(source)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                selectedSource === source
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {source === 'ALL' ? 'সকল সোর্স' : source}
            </button>
          ))}

          <div className="w-[1px] h-5 bg-slate-800 mx-1"></div>

          {(['ALL', 'Electronics', 'Gadgets', 'Home', 'Health', 'Lifestyle'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {cat === 'ALL' ? 'সব ক্যাটাগরি' : cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="প্রোডাক্ট খুঁজুন..."
            className="w-full sm:w-56 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredProducts.map((prod) => {
          // Dynamic calculation based on current marginPercent slider
          const dynamicSalePriceUSD = Number((prod.costUSD * (1 + marginPercent / 100)).toFixed(2));
          const dynamicProfitUSD = Number((prod.costUSD * (marginPercent / 100)).toFixed(2));

          return (
            <div
              key={prod.id}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden hover:border-slate-700 transition-all flex flex-col shadow-lg group"
            >
              {/* Product Image & Badges */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-slate-950 shadow">
                    {prod.supplierSource}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-600 text-white shadow">
                    🔥 ভাইরাল {prod.viralScore}%
                  </span>
                </div>

                <div className="absolute bottom-2 right-2 flex items-center gap-1">
                  {prod.targetCountries.map((c) => (
                    <span
                      key={c}
                      className="text-xs bg-slate-950/80 px-1 py-0.5 rounded shadow"
                      title={c}
                    >
                      {getCountryFlag(c)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>{prod.category}</span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {prod.rating} ({prod.ordersCount.toLocaleString()}+ সেলস)
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
                    {prod.banglaTitle}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {prod.viralReason}
                  </p>
                </div>

                {/* Pricing Table: Cost Price vs Selling Price vs 20% Net Profit */}
                <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>কেনা দাম (Cost):</span>
                    <span className="font-semibold text-amber-400 line-through opacity-80">
                      {formatPrice(prod.costUSD, currency)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-200">
                    <span>বিক্রি দাম (Web):</span>
                    <span className="font-extrabold text-white text-sm">
                      {formatPrice(dynamicSalePriceUSD, currency)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-emerald-400 font-bold">
                    <span>নিট লাভ (+{marginPercent}%):</span>
                    <span>+{formatPrice(dynamicProfitUSD, currency)}</span>
                  </div>
                </div>

                {/* Actions: Import Toggle & Quick Social Marketing */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onImportProduct(prod.id)}
                    className={`flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      prod.isImportedToStore
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold'
                    }`}
                  >
                    {prod.isImportedToStore ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>সাইটে আছে</span>
                      </>
                    ) : (
                      <>
                        <span>সাইটে আনুন</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onLaunchMarketing(prod)}
                    className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>মার্কেটিং</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
