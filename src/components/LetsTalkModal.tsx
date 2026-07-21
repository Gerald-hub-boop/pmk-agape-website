import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Heart, Shield, User, Clock } from 'lucide-react';

interface LetsTalkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Ensure Tawk.to types are available on window
declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

// Tawk.to property ID and Widget ID
const TAWK_PROPERTY_ID = '6a5ef11c4693711d483c319b/default';

export function LetsTalkModal({ isOpen, onClose }: LetsTalkModalProps) {
  const [tawkStatus, setTawkStatus] = useState<'online' | 'away' | 'offline' | 'loading'>('loading');

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Inject and initialize Tawk.to
  useEffect(() => {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = window.Tawk_LoadStart || new Date();

    // If Tawk_API is already loaded, get status immediately
    if (typeof window.Tawk_API.getStatus === 'function') {
      const status = window.Tawk_API.getStatus();
      if (status) {
        setTawkStatus(status as any);
      }
    }

    // Attach callbacks
    const originalOnLoad = window.Tawk_API.onLoad;
    window.Tawk_API.onLoad = function () {
      if (typeof originalOnLoad === 'function') originalOnLoad();
      if (window.Tawk_API.hideWidget) window.Tawk_API.hideWidget();
      if (window.Tawk_API.getStatus) {
        setTawkStatus(window.Tawk_API.getStatus() || 'offline');
      }
    };

    window.Tawk_API.onChatMinimized = function () {
      if (window.Tawk_API.hideWidget) window.Tawk_API.hideWidget();
    };

    window.Tawk_API.onStatusChange = function (status: string) {
      setTawkStatus(status as any);
    };

    // Inject script if not already present
    if (!document.getElementById('tawk-script')) {
      const s1 = document.createElement('script');
      const s0 = document.getElementsByTagName('script')[0];
      s1.async = true;
      s1.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s1.id = 'tawk-script';

      s1.onerror = () => {
        setTawkStatus('offline');
      };

      if (s0 && s0.parentNode) {
        s0.parentNode.insertBefore(s1, s0);
      } else {
        document.head.appendChild(s1);
      }
    }

    // Fallback timer: if status is still loading after 4s, fallback to offline
    const timer = setTimeout(() => {
      setTawkStatus((prev) => (prev === 'loading' ? 'offline' : prev));
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartChat = () => {
    if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
      try {
        if (typeof window.Tawk_API.showWidget === 'function') {
          window.Tawk_API.showWidget();
        }
        window.Tawk_API.maximize();
      } catch (err) {
        window.open(`https://tawk.to/chat/${TAWK_PROPERTY_ID}`, '_blank');
      }
    } else {
      // Fallback: Direct link to Tawk.to chat page if widget API is not ready or blocked
      window.open(`https://tawk.to/chat/${TAWK_PROPERTY_ID}`, '_blank');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[2rem] p-6 sm:p-8 max-w-[420px] w-full shadow-2xl border border-gray-100 relative flex flex-col gap-6"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-16 h-16 rounded-full bg-[#FFF0F2] flex items-center justify-center mb-4 border border-[#FADADD]/60 shadow-inner">
                <MessageCircle className="w-8 h-8 text-[#4A1F1F]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-black mb-2 tracking-tight">Let's Talk</h3>
              <p className="text-gray-500 text-sm font-medium">Kami di sini untuk mendengarkan.</p>
            </div>

            {/* Main Message */}
            <div className="bg-[#FAFAFA] rounded-2xl p-5 border border-gray-100/80">
              <p className="text-brand-black text-sm sm:text-base leading-relaxed text-center font-medium italic">
                "Tidak semua pergumulan harus dipikul sendirian. Kalau kamu sedang ingin bercerita, bertanya, meminta didoakan, atau hanya membutuhkan seseorang untuk mendengarkan, kami siap menemanimu."
              </p>
            </div>

            {/* Guarantees / Info */}
            <div className="flex flex-col gap-3.5 px-2">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 bg-[#FFF0F2] p-1.5 rounded-full text-[#D88A9A]">
                  <Shield className="w-4 h-4" />
                </div>
                <p className="text-sm font-medium text-gray-700 leading-snug">Ceritamu akan dijaga kerahasiaannya dengan sangat aman.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 bg-[#FFF0F2] p-1.5 rounded-full text-[#D88A9A]">
                  <User className="w-4 h-4" />
                </div>
                <p className="text-sm font-medium text-gray-700 leading-snug">Kamu bebas menggunakan nama panggilan atau anonim.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 bg-[#FFF0F2] p-1.5 rounded-full text-[#D88A9A]">
                  <Heart className="w-4 h-4" />
                </div>
                <p className="text-sm font-medium text-gray-700 leading-snug">Tim pembinaan siap mendengarkan tanpa menghakimi.</p>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider py-1">
              {tawkStatus === 'loading' ? (
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Menghubungkan layanan...
                </span>
              ) : tawkStatus === 'online' ? (
                <span className="text-emerald-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Pembina Sedang Online
                </span>
              ) : (
                <span className="text-amber-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Tinggalkan Pesan
                </span>
              )}
            </div>

            {/* Action Button */}
            <button
              onClick={handleStartChat}
              className="w-full py-4 rounded-full bg-[#4A1F1F] text-white font-bold text-base shadow-lg shadow-[#4A1F1F]/20 hover:bg-[#381717] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Mulai Percakapan
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
