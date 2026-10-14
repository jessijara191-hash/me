import React, { useState } from 'react';
import {
  Share2,
  Sparkles,
  Video,
  Send,
  Copy,
  Check,
  TrendingUp,
  Eye,
  MessageCircle,
  ThumbsUp,
  Repeat,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { Product, SocialPost, CountryCode } from '../types';
import { formatPrice, getCountryFlag } from '../utils/currency';

interface MarketingStudioViewProps {
  products: Product[];
  socialPosts: SocialPost[];
  onPublishCampaign: (newPost: SocialPost) => void;
  currency: 'BDT' | 'USD' | 'CAD' | 'GBP';
  preselectedProduct?: Product | null;
}

export const MarketingStudioView: React.FC<MarketingStudioViewProps> = ({
  products,
  socialPosts,
  onPublishCampaign,
  currency,
  preselectedProduct,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPost['platform']>('TikTok');
  const [targetCountry, setTargetCountry] = useState<CountryCode>('BD');
  const [selectedProductId, setSelectedProductId] = useState<string>(
    preselectedProduct?.id || products[0]?.id || ''
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Active product
  const activeProduct =
    products.find((p) => p.id === selectedProductId) || preselectedProduct || products[0];

  // Generated draft content
  const [draftTitle, setDraftTitle] = useState(
    '🔥 টিকটকে তুমুল ভাইরাল ৪কে ডুয়েল ক্যামেরা ড্রোন!'
  );
  const [draftCaption, setDraftCaption] = useState(
    'হলিউড কোয়ালিটি ড্রোন শট এখন হাতের নাগালে! 📸 মাত্র ৩ সেকেন্ডে অবস্টাকল সেন্সর রেডি। ক্যাশ অন ডেলিভারি সারা দেশে! সীমিত স্টক, লিঙ্ক বায়োতে! 📦'
  );
  const [draftScript, setDraftScript] = useState(
    `[0:00 - 0:03]: (Hook) এই ড্রোনটা নিয়ে আমার ফ্রেন্ডরা বিশ্বাসই করতে পারল না এর দাম কত!\n[0:03 - 0:08]: (Demo) দেখুন ডুয়েল ৪কে ক্যামেরা আর অটো-অবস্টাকল সেন্সর কীভাবে কাজ করে।\n[0:08 - 0:15]: (CTA) আজকে অর্ডার করলে ২০% ডিসকাউন্ট আর ফ্রি ডেলিভারি! বায়োর লিঙ্কে ক্লিক করুন বা কমেন্টে 'BUY' লিখুন!`
  );
  const [draftHashtags, setDraftHashtags] = useState(
    '#amgoolfree #viralproducts #tiktokdeals #dronelife #aliexpressfinds'
  );

  const handleGenerateWithAI = async () => {
    if (!activeProduct) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/marketing-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: activeProduct,
          platform: selectedPlatform,
          targetCountry,
        }),
      });
      const data = await res.json();
      if (data.campaign) {
        if (data.campaign.title) setDraftTitle(data.campaign.title);
        if (data.campaign.caption) setDraftCaption(data.campaign.caption);
        if (data.campaign.script) setDraftScript(data.campaign.script);
        if (data.campaign.hashtags) setDraftHashtags(data.campaign.hashtags);
      }
    } catch (e) {
      console.warn('AI marketing generate fallback:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = () => {
    if (!activeProduct) return;
    const newPost: SocialPost = {
      id: `post-${Date.now()}`,
      platform: selectedPlatform,
      productId: activeProduct.id,
      productTitle: activeProduct.title,
      productImage: activeProduct.image,
      content: draftCaption,
      hook: draftTitle,
      script: draftScript,
      hashtags: draftHashtags.split(' '),
      reach: Math.floor(Math.random() * 25000) + 12000,
      clicks: Math.floor(Math.random() * 800) + 300,
      shares: Math.floor(Math.random() * 200) + 50,
      commentsCount: Math.floor(Math.random() * 60) + 15,
      ordersGenerated: Math.floor(Math.random() * 8) + 2,
      revenueGeneratedUSD: Number((activeProduct.salePriceUSD * (Math.floor(Math.random() * 8) + 2)).toFixed(2)),
      timeAgo: 'এইমাত্র লাইভ',
      status: 'Live',
    };

    onPublishCampaign(newPost);
    alert(`🎉 '${selectedPlatform}' এ ক্যাম্পেইন সফলভাবে লাইভ করা হয়েছে! এআই এখন স্বয়ংক্রিয়ভাবে কমেন্ট ও ইনবক্সের রিপ্লাই দিয়ে সেলস জেনারেট করবে।`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${draftCaption}\n\n${draftHashtags}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms: { id: SocialPost['platform']; label: string; icon: string }[] = [
    { id: 'TikTok', label: 'TikTok', icon: '🎵' },
    { id: 'Facebook', label: 'Facebook', icon: '📘' },
    { id: 'Instagram', label: 'Instagram', icon: '📸' },
    { id: 'YouTube', label: 'YouTube Shorts', icon: '📺' },
    { id: 'Twitter', label: 'Twitter / X', icon: '🐦' },
    { id: 'WhatsApp', label: 'WhatsApp Broadcast', icon: '💬' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950 border border-purple-800/40 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              ২৪/৭ অমনিচ্যানেল সোশ্যাল মার্কেটিং এআই ইঞ্জিন
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              টিকটক, ফেসবুক, ইনস্টাগ্রাম ও ইউটিউব অটো-মার্কেটিং
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              আপনার ওয়েবসাইটের প্রোডাক্ট নিয়ে এআই স্বয়ংক্রিয়ভাবে আকর্ষণীয় ভিডিও স্ক্রিপ্ট ও ভাইরাল ক্যাপশন তৈরি করে
              সোশ্যাল মিডিয়ায় পোস্ট করে এবং কমেন্টে মানুষের সাথে কথা বলে কাস্টমারকে অর্ডারে কনভার্ট করে।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 animate-ping" />
              ২৪ ঘণ্টা অটো-পোস্টিং চালু
            </span>
          </div>
        </div>
      </div>

      {/* Main Campaign Creation Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Select Platform, Product, Target Country, Generate */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Video className="w-4 h-4 text-purple-400" />
            <span>নতুন ভাইরাল প্রচার তৈরি করুন</span>
          </h2>

          {/* Platform Selector Tabs */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              সোশ্যাল মিডিয়া প্ল্যাটফর্ম বেছে নিন:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlatform(p.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedPlatform === p.id
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-400'
                      : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span className="text-base">{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product & Target Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                প্রোডাক্ট নির্বাচন করুন:
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.banglaTitle} (${p.salePriceUSD})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                টার্গেট অডিয়েন্স দেশ:
              </label>
              <select
                value={targetCountry}
                onChange={(e) => setTargetCountry(e.target.value as CountryCode)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
              >
                <option value="BD">🇧🇩 বাংলাদেশ (ক্যাশ অন ডেলিভারি)</option>
                <option value="US">🇺🇸 United States (Fast 3-Day)</option>
                <option value="CA">🇨🇦 Canada (Free Tracked)</option>
                <option value="UK">🇬🇧 United Kingdom (Royal Mail)</option>
              </select>
            </div>
          </div>

          {/* AI Generate Button */}
          <button
            onClick={handleGenerateWithAI}
            disabled={isGenerating}
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'এআই কনটেন্ট তৈরি করছে...' : 'এআই দিয়ে ভাইরাল স্ক্রিপ্ট ও পোস্ট তৈরি করুন'}</span>
          </button>

          {/* Editable Draft Inputs */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                ভাইরাল হুক বা শিরোনাম:
              </label>
              <input
                type="text"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                পোস্টের বিবরণ ও অফার (Caption):
              </label>
              <textarea
                rows={3}
                value={draftCaption}
                onChange={(e) => setDraftCaption(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-purple-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                ১৫-৩০ সেকেন্ডের ভিডিও স্ক্রিপ্ট (Reels / TikTok):
              </label>
              <textarea
                rows={4}
                value={draftScript}
                onChange={(e) => setDraftScript(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-mono outline-none focus:border-purple-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                হ্যাশট্যাগ:
              </label>
              <input
                type="text"
                value={draftHashtags}
                onChange={(e) => setDraftHashtags(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-cyan-400 outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Action Buttons: Publish or Copy */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'কপি হয়েছে!' : 'ক্যাপশন কপি করুন'}</span>
            </button>

            <button
              onClick={handlePublish}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{selectedPlatform}-এ লাইভ পাবলিশ করুন</span>
            </button>
          </div>
        </div>

        {/* Right Preview Card: Realistic Social Media Card Mockup */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300">
                লাইভ প্রিভিউ ({selectedPlatform})
              </span>
              <span className="text-[11px] text-purple-400 font-mono">
                {getCountryFlag(targetCountry)} টার্গেটেড
              </span>
            </div>

            {/* Simulated Smartphone Social Post Feed Card */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
              {/* Profile Header */}
              <div className="p-3 flex items-center justify-between border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 p-0.5">
                    <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center font-extrabold text-[10px] text-white">
                      AF
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-white">amgoolfree Deals</span>
                      <span className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white">
                        ✓
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">Sponsored • Just now</span>
                  </div>
                </div>
                <span className="text-slate-400 text-xs">•••</span>
              </div>

              {/* Media image */}
              <div className="relative h-56 w-full bg-slate-900">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-amber-300 border border-amber-500/30">
                  {formatPrice(activeProduct.salePriceUSD, currency)} (২০% ছাড়)
                </div>
              </div>

              {/* Engagement icons */}
              <div className="p-3 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4 text-cyan-400" /> 1.4k
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4 text-purple-400" /> 280
                    </span>
                    <span className="flex items-center gap-1">
                      <Repeat className="w-4 h-4 text-emerald-400" /> 84
                    </span>
                  </div>
                  <span className="text-[11px] text-cyan-300 font-semibold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                    অর্ডার লিঙ্ক যুক্ত
                  </span>
                </div>

                <p className="text-slate-200 line-clamp-3 text-xs leading-relaxed">
                  <span className="font-bold text-white mr-1.5">amgoolfree Deals</span>
                  {draftCaption}
                </p>

                <p className="text-[11px] text-cyan-400 line-clamp-1">{draftHashtags}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center">
            এআই স্বয়ংক্রিয়ভাবে দর্শকদের কমেন্টে রিপ্লাই দেয় এবং অর্ডারের লিঙ্ক সরবরাহ করে।
          </div>
        </div>
      </div>

      {/* Active Campaigns List & Analytics */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
        <h2 className="text-base font-bold text-white mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>লাইভ রানিং ক্যাম্পেইন পারফরম্যান্স</span>
          </span>
          <span className="text-xs font-normal text-slate-400">
            {socialPosts.length} টি সক্রিয় ক্যাম্পেইন
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3 hover:border-slate-700 transition-all text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300">
                  {post.platform}
                </span>
                <span className="text-slate-400">{post.timeAgo}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <img
                  src={post.productImage}
                  alt={post.productTitle}
                  className="w-10 h-10 rounded-lg object-cover shrink-0"
                />
                <div className="truncate">
                  <span className="font-bold text-white truncate block">{post.productTitle}</span>
                  <p className="text-slate-400 truncate">{post.content}</p>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-800/80 text-center text-[11px]">
                <div className="bg-slate-900 p-1.5 rounded">
                  <span className="text-slate-400 block">রিচ</span>
                  <span className="font-bold text-white">{(post.reach / 1000).toFixed(1)}k</span>
                </div>
                <div className="bg-slate-900 p-1.5 rounded">
                  <span className="text-slate-400 block">ক্লিক</span>
                  <span className="font-bold text-cyan-300">{post.clicks}</span>
                </div>
                <div className="bg-slate-900 p-1.5 rounded">
                  <span className="text-slate-400 block">অর্ডার</span>
                  <span className="font-bold text-emerald-400">+{post.ordersGenerated} টি</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
