import React, { useState, useRef, useEffect } from 'react';
import {
  MessagesSquare,
  Phone,
  Send,
  Bot,
  User,
  Sparkles,
  PhoneCall,
  Volume2,
  CheckCircle2,
  Clock,
  ShoppingBag,
  Flame,
} from 'lucide-react';
import { CustomerConversation, Product, CountryCode } from '../types';
import { getCountryFlag } from '../utils/currency';
import { callAudioEngine } from '../utils/audioSimulator';

interface OmniChatViewProps {
  conversations: CustomerConversation[];
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;
  onSendMessage: (conversationId: string, text: string) => Promise<void>;
  products: Product[];
  onTriggerPhoneCall: (customerName: string, customerPhone: string, productName: string) => void;
  onQuickBookOrder: (conv: CustomerConversation) => void;
  isReplying: boolean;
}

export const OmniChatView: React.FC<OmniChatViewProps> = ({
  conversations,
  activeConversationId,
  setActiveConversationId,
  onSendMessage,
  products,
  onTriggerPhoneCall,
  onQuickBookOrder,
  isReplying,
}) => {
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const activeConv =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages, isReplying]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isReplying || !activeConv) return;
    const text = inputText;
    setInputText('');
    await onSendMessage(activeConv.id, text);
  };

  const handleSpeakLastMessage = (text: string) => {
    callAudioEngine.speakText(text);
  };

  const channelIcons: Record<string, string> = {
    WhatsApp: '💬',
    Facebook: '📘',
    Instagram: '📸',
    TikTok: '🎵',
    WebChat: '🌐',
    PhoneCall: '📞',
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-950 border border-emerald-800/40 p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              ২৪/৭ হিউম্যান-লাইক সেলস এজেন্ট (হোয়াটসঅ্যাপ, মেসেঞ্জার ও ফোন কল)
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              ১০০% মানুষের মতো কথোপকথন ও সেলস ক্লোজিং
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              গ্রাহক বুঝতে পারবে না যে এটি কোনো রোবট। অত্যন্ত নম্র ও আন্তরিক ভঙ্গিতে বাংলা বা ইংরেজিতে প্রশ্নের উত্তর
              দেয়, দামাদামি হ্যান্ডেল করে এবং সরাসরি ক্যাশ অন ডেলিভারি অর্ডার কনফার্ম করে।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                onTriggerPhoneCall(
                  activeConv?.customerName || 'সাকিব আল হাসান',
                  activeConv?.customerPhone || '+880 1711-239485',
                  activeConv?.interestProduct || '4K Foldable Drone'
                )
              }
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-600/25 active:scale-95 transition-all"
            >
              <Phone className="w-4 h-4 animate-bounce" />
              <span>লাইভ ফোন কল টেস্ট করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Inboxes list & Active Chat window */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        {/* Left Side: Conversation List (4 Cols) */}
        <div className="md:col-span-4 border-r border-slate-800 flex flex-col bg-slate-950/60">
          <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              ইনবক্স ({conversations.length})
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-medium">
              সব চ্যানেল ২৪/৭ সক্রিয়
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {conversations.map((conv) => {
              const isSelected = conv.id === activeConv?.id;
              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`w-full p-3.5 text-left flex items-start gap-3 transition-colors ${
                    isSelected
                      ? 'bg-slate-800/90 border-l-4 border-emerald-500'
                      : 'hover:bg-slate-900/70'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={conv.avatar}
                      alt={conv.customerName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                    <span className="absolute -bottom-1 -right-1 text-xs">
                      {channelIcons[conv.channel] || '💬'}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-xs font-bold text-white truncate">
                          {conv.customerName}
                        </span>
                        <span className="text-xs">{getCountryFlag(conv.country)}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">{conv.time}</span>
                    </div>

                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {conv.lastMessage}
                    </p>

                    <div className="flex items-center justify-between mt-1.5">
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                          conv.status === 'Ready to Buy'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : conv.status === 'Order Placed'
                            ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {conv.status}
                      </span>

                      {conv.interestProduct && (
                        <span className="text-[10px] text-amber-400 truncate max-w-[120px]">
                          {conv.interestProduct}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Chat Window (8 Cols) */}
        {activeConv ? (
          <div className="md:col-span-8 flex flex-col bg-slate-900/50">
            {/* Header info */}
            <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center gap-3">
                <img
                  src={activeConv.avatar}
                  alt={activeConv.customerName}
                  className="w-9 h-9 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{activeConv.customerName}</span>
                    <span className="text-xs">{getCountryFlag(activeConv.country)}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                      {activeConv.channel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    আগ্রহী প্রোডাক্ট: <span className="text-amber-400">{activeConv.interestProduct || 'সব প্রোডাক্ট'}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    onTriggerPhoneCall(
                      activeConv.customerName,
                      activeConv.customerPhone,
                      activeConv.interestProduct || 'Featured Product'
                    )
                  }
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition-colors"
                  title="ভয়েস কল শুরু করুন"
                >
                  <PhoneCall className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onQuickBookOrder(activeConv)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>অর্ডার তৈরি করুন</span>
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 max-h-[420px]">
              {activeConv.messages.map((m) => {
                const isCustomer = m.sender === 'customer';
                const isSystem = m.sender === 'system';

                if (isSystem) {
                  return (
                    <div
                      key={m.id}
                      className="text-center text-xs text-slate-400 bg-slate-950/70 p-2 rounded-xl border border-slate-800"
                    >
                      {m.text}
                    </div>
                  );
                }

                return (
                  <div
                    key={m.id}
                    className={`flex gap-2.5 max-w-[85%] ${
                      isCustomer ? 'mr-auto' : 'ml-auto flex-row-reverse'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                        isCustomer
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-emerald-600 text-white font-bold'
                      }`}
                    >
                      {isCustomer ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    <div
                      className={`rounded-2xl p-3 text-xs sm:text-sm leading-relaxed shadow-md ${
                        isCustomer
                          ? 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                          : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{m.text}</p>

                      <div className="flex items-center justify-between gap-3 mt-1.5 pt-1 border-t border-black/10">
                        <span className={`text-[10px] ${isCustomer ? 'text-slate-400' : 'text-emerald-200'}`}>
                          {m.time}
                        </span>

                        {!isCustomer && (
                          <button
                            onClick={() => handleSpeakLastMessage(m.text)}
                            className="text-[10px] text-emerald-200 hover:text-white flex items-center gap-1"
                            title="মানুষের গলায় শুনুন"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>ভয়েস শুনুন</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isReplying && (
                <div className="flex gap-2.5 max-w-[85%] ml-auto flex-row-reverse">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                    <Bot className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="rounded-2xl rounded-tr-none bg-emerald-950 border border-emerald-800 p-3 text-xs text-emerald-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span>এআই মানুষের মতো রিপ্লাই সাজাচ্ছে...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Input Bar for Testing */}
            <form onSubmit={handleSend} className="p-3 bg-slate-950/60 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="গ্রাহক হিসেবে কোনো প্রশ্ন লিখুন (যেমন: দাম কম রাখা যাবে? ডেলিভারি কবে পাব?)..."
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isReplying}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all disabled:opacity-50"
              >
                <span>পাঠান</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="md:col-span-8 flex items-center justify-center text-slate-500 text-sm">
            একটি কথোপকথন নির্বাচন করুন
          </div>
        )}
      </div>
    </div>
  );
};
