import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Zap,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  SlidersHorizontal,
  Flame,
} from 'lucide-react';
import { BossChatMessage, Order } from '../types';

interface BossChatViewProps {
  messages: BossChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isThinking: boolean;
  orders: Order[];
  onQuickAction: (actionType: string) => void;
}

export const BossChatView: React.FC<BossChatViewProps> = ({
  messages,
  onSendMessage,
  isThinking,
  orders,
  onQuickAction,
}) => {
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isThinking) return;
    const text = inputText;
    setInputText('');
    await onSendMessage(text);
  };

  const quickPrompts = [
    {
      label: '🚀 বাংলাদেশ ও ইউএসএ-তে নতুন ক্যাম্পেইন চালাও',
      prompt: 'বন্ধু, বাংলাদেশ এবং আমেরিকায় সেলস আরও বাড়ানোর জন্য টিকটক ও ফেসবুকে এখনই একটা স্পেশাল পুশ ক্যাম্পেইন রান করো।',
    },
    {
      label: '💰 প্রফিট মার্জিন ২০% রিভিউ করো',
      prompt: 'আমাদের বর্তমান ২০% প্রফিট মার্জিন কি পারফেক্ট আছে? নাকি কোনো প্রোডাক্টে আরও লাভ বাড়ানো সম্ভব?',
    },
    {
      label: '📦 কাস্টমার ডেলিভারি পলিসি ঠিক করো',
      prompt: 'যদি কোনো কাস্টমার ডেলিভারি দেরি হওয়ার অভিযোগ করে, তাহলে এআই চ্যাটে কীভাবে ঠান্ডা মাথায় হ্যান্ডেল করবে?',
    },
    {
      label: '🔥 আলিবাবার নতুন ভাইরাল গ্যাজেট খোঁজ',
      prompt: 'আজকে আলিবাবা বা আলিএক্সপ্রেসে টপ ভাইরাল কী গ্যাজেট পাওয়া গেল যা এখনই ইমপোর্ট করা উচিত?',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 p-5 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">amgoolfree এআই বন্ধু ও বিজনেস পার্টনার</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                অনলাইন ও রেডি
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              আপনার বিশ্বস্ত এআই কো-ফাউন্ডার। যেকোনো পরিকল্পনা বা সমস্যা এখানে ডিসকাস করুন, এআই নিজে কোড ও স্টোর ঠিক করে দিবে।
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 shadow-xl flex flex-col h-[520px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                    isUser
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* If action was taken by AI */}
                  {msg.actionTaken && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{msg.actionTaken}</span>
                    </div>
                  )}

                  <span
                    className={`block text-[10px] mt-2 ${
                      isUser ? 'text-cyan-200 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Thinking indicator */}
          {isThinking && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="rounded-2xl rounded-tl-none bg-slate-950 border border-slate-800 p-4 text-xs text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>আপনার এআই বন্ধু চিন্তা করছে ও সমাধান সাজাচ্ছে...</span>
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Quick Action Suggestion Chips */}
        <div className="pt-3 pb-2 border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(item.prompt)}
              disabled={isThinking}
              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-cyan-300 shrink-0 transition-colors flex items-center gap-1 disabled:opacity-50"
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="pt-2 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="আপনার এআই বন্ধুকে কিছু বলুন বা কোনো সমস্যা ফিক্স করতে বলুন..."
            className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isThinking}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
          >
            <span>পাঠান</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
