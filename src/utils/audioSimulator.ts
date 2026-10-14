// Web Audio & Speech Synthesis utility for human-like phone call simulations

class CallAudioEngine {
  private audioCtx: AudioContext | null = null;
  private ringOsc1: OscillatorNode | null = null;
  private ringOsc2: OscillatorNode | null = null;
  private ringGain: GainNode | null = null;
  private isRinging: boolean = false;

  private initCtx() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Realistic phone ring tone generator (dual frequencies 440Hz + 480Hz)
  public startRingtone() {
    try {
      this.initCtx();
      if (!this.audioCtx) return;
      this.stopRingtone();

      this.isRinging = true;
      const now = this.audioCtx.currentTime;

      this.ringGain = this.audioCtx.createGain();
      this.ringGain.gain.setValueAtTime(0.15, now);
      this.ringGain.connect(this.audioCtx.destination);

      this.ringOsc1 = this.audioCtx.createOscillator();
      this.ringOsc2 = this.audioCtx.createOscillator();

      this.ringOsc1.frequency.setValueAtTime(440, now);
      this.ringOsc2.frequency.setValueAtTime(480, now);

      this.ringOsc1.connect(this.ringGain);
      this.ringOsc2.connect(this.ringGain);

      this.ringOsc1.start();
      this.ringOsc2.start();
    } catch (e) {
      console.warn('Audio ringtone error:', e);
    }
  }

  public stopRingtone() {
    this.isRinging = false;
    try {
      if (this.ringOsc1) {
        this.ringOsc1.stop();
        this.ringOsc1.disconnect();
        this.ringOsc1 = null;
      }
      if (this.ringOsc2) {
        this.ringOsc2.stop();
        this.ringOsc2.disconnect();
        this.ringOsc2 = null;
      }
      if (this.ringGain) {
        this.ringGain.disconnect();
        this.ringGain = null;
      }
    } catch (e) {
      // ignore
    }
  }

  // Speech synthesis in human-like voice
  public speakText(text: string, onEnd?: () => void) {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel();

    const cleanText = text.replace(/[\*\_#]/g, '').slice(0, 300);
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Try finding a Bengali or warm English voice
    const voices = window.speechSynthesis.getVoices();
    const bnVoice = voices.find((v) => v.lang.includes('bn') || v.lang.includes('bengali'));
    const enVoice = voices.find((v) => v.lang.includes('en-US') || v.lang.includes('en-GB') || v.name.includes('Natural') || v.name.includes('Google'));

    if (bnVoice && /[অ-হ]/.test(text)) {
      utterance.voice = bnVoice;
      utterance.lang = 'bn-BD';
    } else if (enVoice) {
      utterance.voice = enVoice;
      utterance.lang = 'en-US';
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const callAudioEngine = new CallAudioEngine();
