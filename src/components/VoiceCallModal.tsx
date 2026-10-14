import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, Volume2, Bot, Sparkles, User } from 'lucide-react';
import { callAudioEngine } from '../utils/audioSimulator';

interface VoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  customerPhone: string;
  productName: string;
}

export const VoiceCallModal: React.FC<VoiceCallModalProps> = ({
  isOpen,
  onClose,
  customerName,
  customerPhone,
  productName,
}) => {
  const [callStatus, setCallStatus] = useState<'ringing' | 'connected' | 'ended'>('ringing');
  const [callDuration, setCallDuration] = useState(0);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const dialogue = [
    {
      speaker: 'ai',
      text: `আসসালামু আলাইকুম ${customerName} ভাইয়া! আমি amgoolfree কাস্টমার কেয়ার থেকে বলছি। আপনি আমাদের পেইজে ${productName} সম্পর্কে ইনকোয়ারি করেছিলেন।`,
    },
    {
      speaker: 'customer',
      text: 'হ্যাঁ ভাইয়া, ড্রোনটা কি ক্যাশ অন ডেলিভারিতে ঢাকায় পাঠানো যাবে?',
    },
    {
      speaker: 'ai',
      text: 'অবশ্যই ভাইয়া! ঢাকায় ৪৮ ঘণ্টার মধ্যে সম্পূর্ণ ক্যাশ অন ডেলিভারিতে প্রোডাক্ট পৌঁছে যাবে। আপনি রাইডারের সামনে প্যাকেট খুলে চেক করে তারপর মূল্য পরিশোধ করতে পারবেন। সাথে আজকের জন্য ২০% ফ্ল্যাট ডিসকাউন্ট ফ্রি ডেলিভারি পাচ্ছেন!',
    },
    {
      speaker: 'customer',
      text: 'দারুণ! তাহলে আমার ঠিকানায় একটি বুক করে দিন।',
    },
    {
      speaker: 'ai',
      text: 'অনেক ধন্যবাদ ভাইয়া! আপনার অর্ডারটি সিস্টেমে বুক করে নেওয়া হয়েছে এবং ট্র্যাকিং লিঙ্ক আপনার মোবাইলে এসএমএস পাঠিয়ে দেওয়া হয়েছে। আপনার দিনটি শুভ হোক!',
    },
  ];

  useEffect(() => {
    if (!isOpen) {
      callAudioEngine.stopRingtone();
      callAudioEngine.stopSpeaking();
      setCallStatus('ringing');
      setCallDuration(0);
      setDialogueIndex(0);
      return;
    }

    // Start ringtone
    callAudioEngine.startRingtone();

    // Answer call after 2.5 seconds
    const timer = setTimeout(() => {
      callAudioEngine.stopRingtone();
      setCallStatus('connected');
      playCurrentDialogue(0);
    }, 2500);

    return () => {
      clearTimeout(timer);
      callAudioEngine.stopRingtone();
      callAudioEngine.stopSpeaking();
    };
  }, [isOpen]);

  // Duration timer
  useEffect(() => {
    let interval: any;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const playCurrentDialogue = (index: number) => {
    if (index >= dialogue.length) return;
    const current = dialogue[index];
    setDialogueIndex(index);

    if (current.speaker === 'ai') {
      setIsAiSpeaking(true);
      callAudioEngine.speakText(current.text, () => {
        setIsAiSpeaking(false);
        // Advance to next after slight pause
        setTimeout(() => {
          playCurrentDialogue(index + 1);
        }, 1200);
      });
    } else {
      setIsAiSpeaking(false);
      // Wait for customer to "finish speaking"
      setTimeout(() => {
        playCurrentDialogue(index + 1);
      }, 2400);
    }
  };

  const handleEndCall = () => {
    callAudioEngine.stopRingtone();
    callAudioEngine.stopSpeaking();
    setCallStatus('ended');
    setTimeout(() => {
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl flex flex-col items-center justify-between min-h-[520px] text-white relative overflow-hidden">
        {/* Glowing background aura */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Header */}
        <div className="text-center pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3 h-3" />
            <span>amgoolfree এআই ভয়েস সেলস কল</span>
          </div>

          <h3 className="text-xl font-extrabold text-white">{customerName}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{customerPhone}</p>

          <p className="text-xs font-medium text-emerald-400 mt-2">
            {callStatus === 'ringing'
              ? 'রিং হচ্ছে (কল সংযুক্ত হচ্ছে)...'
              : callStatus === 'connected'
              ? `কল চলছে • ${formatTimer(callDuration)}`
              : 'কল সমাপ্ত'}
          </p>
        </div>

        {/* Center Waveform & Avatar Animation */}
        <div className="flex flex-col items-center justify-center my-6 space-y-4">
          <div className="relative">
            {callStatus === 'connected' && isAiSpeaking && (
              <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping"></span>
            )}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 p-1 shadow-2xl shadow-emerald-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                <Bot className="w-12 h-12 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Animated audio bars when speaking */}
          {callStatus === 'connected' && (
            <div className="flex items-center gap-1.5 h-6">
              {[40, 70, 100, 60, 90, 45, 80].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-emerald-400 rounded-full transition-all duration-200"
                  style={{
                    height: isAiSpeaking ? `${h}%` : '20%',
                    opacity: isAiSpeaking ? 1 : 0.4,
                  }}
                />
              ))}
            </div>
          )}

          {/* Live Subtitle Transcript */}
          {callStatus === 'connected' && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 text-xs text-slate-200 text-center max-w-xs leading-relaxed shadow-inner">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                {dialogue[dialogueIndex]?.speaker === 'ai' ? '🤖 এআই বলছে' : '👤 গ্রাহক বলছে'}
              </span>
              <p className="line-clamp-3">{dialogue[dialogueIndex]?.text}</p>
            </div>
          )}
        </div>

        {/* Bottom Call Controls */}
        <div className="w-full pt-4 border-t border-slate-800 flex items-center justify-around">
          <div className="flex flex-col items-center gap-1 text-[10px] text-slate-400">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
              <Volume2 className="w-4 h-4" />
            </div>
            <span>স্পিকার অন</span>
          </div>

          {/* Red End Call Button */}
          <button
            onClick={handleEndCall}
            className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-600/40 active:scale-95 transition-all"
            title="কল শেষ করুন"
          >
            <PhoneOff className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center gap-1 text-[10px] text-slate-400">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
              <Mic className="w-4 h-4" />
            </div>
            <span>এআই মিউট</span>
          </div>
        </div>
      </div>
    </div>
  );
};
