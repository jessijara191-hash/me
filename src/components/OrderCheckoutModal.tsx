import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  ShieldCheck,
  Truck,
  CheckCircle,
  Percent,
} from 'lucide-react';
import { Product, CountryCode, Order } from '../types';
import { formatPrice, convertUSDToBDT } from '../utils/currency';

interface OrderCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  currency: 'BDT' | 'USD' | 'CAD' | 'GBP';
  onPlaceOrder: (newOrder: Order) => void;
}

export const OrderCheckoutModal: React.FC<OrderCheckoutModalProps> = ({
  isOpen,
  onClose,
  product,
  currency,
  onPlaceOrder,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('ঢাকা');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState<CountryCode>('BD');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !product) return null;

  const totalCost = product.costUSD * quantity;
  const totalRevenue = product.salePriceUSD * quantity;
  const totalProfit = Number((totalRevenue - totalCost).toFixed(2));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: `AGF-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: name,
        customerPhone: phone,
        customerEmail: `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        country,
        city,
        address,
        items: [{ product, quantity }],
        totalCostUSD: totalCost,
        totalRevenueUSD: totalRevenue,
        profitUSD: totalProfit,
        totalRevenueBDT: convertUSDToBDT(totalRevenue),
        profitBDT: convertUSDToBDT(totalProfit),
        status: 'Auto-Processing',
        channel: 'Storefront Web',
        date: 'এইমাত্র অর্ডারকৃত',
        paymentMethod: 'Cash on Delivery (ক্যাশ অন ডেলিভারি)',
      };

      onPlaceOrder(newOrder);
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setName('');
        setPhone('');
        setAddress('');
      }, 2000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">অর্ডার সফলভাবে সম্পন্ন হয়েছে!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              আপনার ক্যাশ অন ডেলিভারি অর্ডারটি আমাদের সিস্টেমে যুক্ত হয়েছে। এআই স্বয়ংক্রিয়ভাবে আলিবাবা থেকে
              ডেলিভারি প্রসেস শুরু করেছে।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">ক্যাশ অন ডেলিভারি অর্ডার ফর্ম</h2>
            </div>

            {/* Product mini summary */}
            <div className="flex items-center gap-3 bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
              <img
                src={product.image}
                alt={product.title}
                className="w-12 h-12 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{product.banglaTitle}</h4>
                <div className="flex items-center gap-2 mt-0.5 text-xs">
                  <span className="font-extrabold text-cyan-300">
                    {formatPrice(product.salePriceUSD, currency)}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    ২০% ডিসকাউন্ট
                  </span>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded bg-slate-800 text-white font-bold flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-xs font-bold px-1">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded bg-slate-800 text-white font-bold flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: তানভীর আহমেদ"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">মোবাইল নাম্বার *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="যেমন: 01712-XXXXXX"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">দেশ *</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value as CountryCode)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
                >
                  <option value="BD">🇧🇩 বাংলাদেশ</option>
                  <option value="US">🇺🇸 United States</option>
                  <option value="CA">🇨🇦 Canada</option>
                  <option value="UK">🇬🇧 United Kingdom</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">শহর / জেলা *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="যেমন: ঢাকা, চট্টগ্রাম, সিলেট"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-slate-300 font-medium mb-1">পূর্ণাঙ্গ ঠিকানা *</label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="বাসা নং, রোড নং, এলাকা..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500 leading-relaxed"
              />
            </div>

            {/* Total Summary */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">মোট প্রদেয় মূল্য (ক্যাশ অন ডেলিভারি):</span>
              <span className="text-lg font-extrabold text-cyan-300">
                {formatPrice(totalRevenue, currency)}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'অর্ডার প্রসেস হচ্ছে...' : 'অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
