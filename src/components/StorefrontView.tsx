import React, { useState } from 'react';
import {
  ShoppingBag,
  Star,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Search,
  MessageCircle,
  Sparkles,
  Phone,
  Flame,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { Product, CountryCode } from '../types';
import { formatPrice, getCountryFlag, getCountryName } from '../utils/currency';

interface StorefrontViewProps {
  products: Product[];
  currency: 'BDT' | 'USD' | 'CAD' | 'GBP';
  onOpenCheckout: (product: Product) => void;
  onOpenLiveChat: () => void;
  onOpenPhoneCall: () => void;
}

export const StorefrontView: React.FC<StorefrontViewProps> = ({
  products,
  currency,
  onOpenCheckout,
  onOpenLiveChat,
  onOpenPhoneCall,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [storeCountry, setStoreCountry] = useState<CountryCode>('BD');
  const [search, setSearch] = useState('');

  // Show only imported products (or all if few imported)
  const availableProducts = products.filter((p) => p.isImportedToStore);
  const displayProducts = availableProducts.length > 0 ? availableProducts : products;

  const filtered = displayProducts.filter((p) => {
    const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.banglaTitle.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Customer Storefront Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950/40 to-slate-900 border border-cyan-800/50 p-6 sm:p-10 shadow-2xl">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            amgoolfree অফিসিয়াল ভাইরাল কালেকশন • ২০% স্পেশাল ছাড়
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            বিশ্বখ্যাত আলিবাবা ও আলিএক্সপ্রেসের ট্রেন্ডিং গ্যাজেট এখন আপনার ঘরে
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            ১০০% অরিজিনাল কোয়ালিটি নিশ্চিত। বাংলাদেশ, আমেরিকা, কানাডা ও যুক্তরাজ্যে দ্রুত ডেলিভারি ও{' '}
            <span className="text-emerald-400 font-bold">ক্যাশ অন ডেলিভারি</span> সুবিধা।
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('store-products');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-cyan-500/25 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>পণ্যগুলো দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenLiveChat}
              className="px-4 py-2.5 bg-slate-900/90 hover:bg-slate-800 text-white font-medium rounded-xl text-xs sm:text-sm border border-slate-700 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>এআই সেলস এজেন্টের সাথে কথা বলুন</span>
            </button>
          </div>
        </div>

        {/* Guarantees bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-cyan-400" />
            <span>সারা দেশে ক্যাশ অন ডেলিভারি</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>৭ দিনের মানিব্যাক গ্যারান্টি</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>১০০% অরিজিনাল সাপ্লায়ার লট</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-purple-400" />
            <span>২৪/৭ কাস্টমার সাপোর্ট</span>
          </div>
        </div>
      </div>

      {/* Product Filters & Search */}
      <div id="store-products" className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(['ALL', 'Electronics', 'Gadgets', 'Home', 'Health', 'Lifestyle'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat === 'ALL' ? 'সকল প্রোডাক্ট' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Country selector */}
          <select
            value={storeCountry}
            onChange={(e) => setStoreCountry(e.target.value as CountryCode)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 outline-none"
          >
            <option value="BD">🇧🇩 Bangladesh</option>
            <option value="US">🇺🇸 United States</option>
            <option value="CA">🇨🇦 Canada</option>
            <option value="UK">🇬🇧 United Kingdom</option>
          </select>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="পণ্য খুঁজুন..."
              className="bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none w-40 sm:w-48"
            />
          </div>
        </div>
      </div>

      {/* Customer Products Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((prod) => (
          <div
            key={prod.id}
            className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-all flex flex-col justify-between shadow-xl group"
          >
            {/* Image */}
            <div className="relative h-52 w-full overflow-hidden bg-slate-950">
              <img
                src={prod.image}
                alt={prod.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-pink-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow">
                ২০% ছাড়
              </div>
              <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-cyan-300 px-2 py-0.5 rounded-md border border-cyan-800">
                {prod.deliveryDays}
              </div>
            </div>

            {/* Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>{prod.category}</span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {prod.rating} ({prod.reviewsCount}+ রিভিউ)
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {prod.banglaTitle}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                  {prod.banglaDescription}
                </p>
              </div>

              {/* Price & Order Button */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 line-through block">
                    {formatPrice(prod.salePriceUSD * 1.25, currency)}
                  </span>
                  <span className="text-base font-extrabold text-white">
                    {formatPrice(prod.salePriceUSD, currency)}
                  </span>
                </div>

                <button
                  onClick={() => onOpenCheckout(prod)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>অর্ডার করুন</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Bottom Right AI Sales Assistant Launcher */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          onClick={onOpenPhoneCall}
          className="p-3 bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-2 border-slate-900"
          title="এআই এর সাথে ফোনে কথা বলুন"
        >
          <Phone className="w-5 h-5 animate-pulse" />
        </button>

        <button
          onClick={onOpenLiveChat}
          className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all border-2 border-slate-900 text-xs sm:text-sm"
        >
          <MessageCircle className="w-5 h-5" />
          <span>মানুষের মতো এআই চ্যাট</span>
        </button>
      </div>
    </div>
  );
};
