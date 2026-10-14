import React, { useState } from 'react';
import {
  Settings,
  Mail,
  Zap,
  ShieldCheck,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  Globe,
  Radio,
  Sliders,
  Sparkles,
  Bot,
  Percent,
} from 'lucide-react';
import { AutopilotConfig, CountryCode } from '../types';

interface AutopilotSettingsViewProps {
  config: AutopilotConfig;
  onUpdateConfig: (newConfig: AutopilotConfig) => void;
  marginPercent: number;
  setMarginPercent: (val: number) => void;
}

export const AutopilotSettingsView: React.FC<AutopilotSettingsViewProps> = ({
  config,
  onUpdateConfig,
  marginPercent,
  setMarginPercent,
}) => {
  const [gmailInput, setGmailInput] = useState(config.connectedAccounts.gmail.email || 'jessijara191@gmail.com');
  const [isSaved, setIsSaved] = useState(false);

  const handleToggleMaster = () => {
    onUpdateConfig({
      ...config,
      isRunning: !config.isRunning,
    });
  };

  const handleToggleFeature = (key: keyof AutopilotConfig) => {
    onUpdateConfig({
      ...config,
      [key]: !config[key],
    });
  };

  const handleToggleCountry = (country: CountryCode) => {
    onUpdateConfig({
      ...config,
      targetCountries: {
        ...config.targetCountries,
        [country]: !config.targetCountries[country],
      },
    });
  };

  const handleSaveGmail = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({
      ...config,
      connectedAccounts: {
        ...config.connectedAccounts,
        gmail: { connected: true, email: gmailInput },
      },
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-cyan-800/40 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              ১-ক্লিক জিমেইল ও ২৪/৭ ফুল অটোনমাস কন্ট্রোল
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              অটোপাইলট ইঞ্জিন ও ইন্টিগ্রেশন সেটিংস
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
              শুধুমাত্র জিমেইল কানেক্ট করলেই এআই স্বয়ংক্রিয়ভাবে আলিবাবা এক্সপ্রেস থেকে প্রোডাক্ট নিয়ে এসে আপনার সাইটে
              ২০% লাভে সোশ্যাল মিডিয়ায় মার্কেটিং ও সেলস ক্লোজিং শুরু করে।
            </p>
          </div>

          {/* Master 24/7 Switch */}
          <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <div className="text-right">
              <span className="block text-xs font-bold text-white">২৪/৭ অটোপাইলট</span>
              <span className="text-[10px] text-slate-400">
                {config.isRunning ? 'সক্রিয় ও কাজ করছে' : 'বন্ধ রয়েছে'}
              </span>
            </div>
            <button
              onClick={handleToggleMaster}
              className={`p-1 rounded-full transition-colors ${
                config.isRunning ? 'text-emerald-400' : 'text-slate-600'
              }`}
            >
              {config.isRunning ? (
                <ToggleRight className="w-10 h-10" />
              ) : (
                <ToggleLeft className="w-10 h-10" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 1-Click Gmail Connect Card */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">১-ক্লিক জিমেইল কানেক্ট (অটো-লগইন)</h2>
            <p className="text-xs text-slate-400">
              জিমেইল সংযুক্ত করার পর আর কোনো ম্যানুয়াল কাজের প্রয়োজন নেই, এআই সবকিছু পরিচালনা করবে।
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveGmail} className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="relative flex-1 w-full">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="email"
              value={gmailInput}
              onChange={(e) => setGmailInput(e.target.value)}
              placeholder="আপনার জিমেইল এড্রেস লিখুন..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-cyan-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isSaved ? 'কানেক্টেড ও অ্যাক্টিভ!' : 'জিমেইল কানেক্ট করুন'}</span>
          </button>
        </form>

        <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
          <ShieldCheck className="w-4 h-4" />
          <span>অটোমেটিক সিনক্রোনাইজেশন এনাবল্ড: অর্ডার নোটিফিকেশন সরাসরি জিমেইলে যাবে।</span>
        </div>
      </div>

      {/* Target Countries Selection */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-bold text-white">টার্গেট দেশসমূহ (মার্কেটপ্লেস)</h2>
          </div>
          <span className="text-xs text-slate-400">৪টি দেশেই এআই মার্কেটিং করবে</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { id: 'BD', name: 'বাংলাদেশ', sub: 'ক্যাশ অন ডেলিভারি (bKash/Nagad)' },
            { id: 'US', name: 'United States', sub: '3-Day Express Shipping' },
            { id: 'CA', name: 'Canada', sub: 'Tracked Canada Post' },
            { id: 'UK', name: 'United Kingdom', sub: 'Royal Mail 48-Hour' },
          ].map((item) => {
            const active = config.targetCountries[item.id as CountryCode];
            return (
              <button
                key={item.id}
                onClick={() => handleToggleCountry(item.id as CountryCode)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  active
                    ? 'bg-slate-950 border-cyan-500/60 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-white">{item.name}</span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      active ? 'bg-cyan-400' : 'bg-slate-600'
                    }`}
                  ></span>
                </div>
                <p className="text-[11px] text-slate-400">{item.sub}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Autonomous Behavior Rules */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Bot className="w-4 h-4 text-emerald-400" />
          <span>এআই স্বয়ংক্রিয় কার্যক্রম রুলস (২৪/৭ অটোমেশন)</span>
        </h2>

        <div className="divide-y divide-slate-800/80 text-xs">
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-200 block text-sm">
                সোশ্যাল মিডিয়ায় অটো-কমেন্ট রিপ্লাই (ফেসবুক ও টিকটক)
              </span>
              <p className="text-slate-400 mt-0.5">
                কেউ কমেন্ট করলে ১ মিনিটের মধ্যে মানুষের মতো উত্তর দিয়ে ইনবক্সে অর্ডার লিঙ্ক পাঠাবে।
              </p>
            </div>
            <button
              onClick={() => handleToggleFeature('autoReplyComments')}
              className={`p-1 rounded-full ${
                config.autoReplyComments ? 'text-emerald-400' : 'text-slate-600'
              }`}
            >
              {config.autoReplyComments ? (
                <ToggleRight className="w-8 h-8" />
              ) : (
                <ToggleLeft className="w-8 h-8" />
              )}
            </button>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-200 block text-sm">
                হোয়াটসঅ্যাপ ও ইনবক্স অটোমেটিক চ্যাট (মানুষের মতো)
              </span>
              <p className="text-slate-400 mt-0.5">
                গ্রাহকের সাথে আন্তরিক সুরে কথা বলে প্রোডাক্ট সাজেস্ট করবে এবং ক্যাশ অন ডেলিভারি বুক করবে।
              </p>
            </div>
            <button
              onClick={() => handleToggleFeature('autoReplyDMs')}
              className={`p-1 rounded-full ${
                config.autoReplyDMs ? 'text-emerald-400' : 'text-slate-600'
              }`}
            >
              {config.autoReplyDMs ? (
                <ToggleRight className="w-8 h-8" />
              ) : (
                <ToggleLeft className="w-8 h-8" />
              )}
            </button>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-200 block text-sm">
                প্রতিদিন আলিবাবা/এক্সপ্রেস ভাইরাল প্রোডাক্ট অটো-স্ক্যান
              </span>
              <p className="text-slate-400 mt-0.5">
                প্রতিদিন রাত ১২টায় নতুন ট্রেন্ডিং আইটেম বাছাই করে ২০% লাভে আপনার ওয়েবসাইটে যোগ করবে।
              </p>
            </div>
            <button
              onClick={() => handleToggleFeature('autoDailyHunt')}
              className={`p-1 rounded-full ${
                config.autoDailyHunt ? 'text-emerald-400' : 'text-slate-600'
              }`}
            >
              {config.autoDailyHunt ? (
                <ToggleRight className="w-8 h-8" />
              ) : (
                <ToggleLeft className="w-8 h-8" />
              )}
            </button>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-200 block text-sm">
                এআই ভয়েস কল ও অডিও আউটরিচ
              </span>
              <p className="text-slate-400 mt-0.5">
                ফোন কলে গ্রাহকের সাথে মানুষের মতো কথা বলে অর্ডার কনফার্মেশন ও ফলো-আপ নিশ্চিত করবে।
              </p>
            </div>
            <button
              onClick={() => handleToggleFeature('autoVoiceCallOutreach')}
              className={`p-1 rounded-full ${
                config.autoVoiceCallOutreach ? 'text-emerald-400' : 'text-slate-600'
              }`}
            >
              {config.autoVoiceCallOutreach ? (
                <ToggleRight className="w-8 h-8" />
              ) : (
                <ToggleLeft className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
