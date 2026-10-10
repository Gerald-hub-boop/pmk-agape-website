import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HistoryItem } from '../types';
import { CHAPTER_CONFIG } from '../journeyCardsData';
import { X, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  history?: HistoryItem[];
  onSelectStealCard?: (item: HistoryItem) => void;
  isStealMode?: boolean;
}

export const JourneyHistoryModal: React.FC<Props> = ({
  isOpen,
  onClose,
  history = [],
  onSelectStealCard,
  isStealMode = false,
}) => {
  if (!isOpen) return null;

  const safeHistory = Array.isArray(history) ? history : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A1F1F]/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md bg-white border border-[#FFF0F2] rounded-3xl p-6 shadow-2xl max-h-[88vh] flex flex-col text-[#4A1F1F]"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#C06C84]">
                {isStealMode ? 'Effect: Steal' : 'Group Archive'}
              </span>
              <h3 className="font-serif text-xl font-bold tracking-tight text-[#4A1F1F]">
                {isStealMode ? 'Pilih Kartu dari History' : 'Journey History'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#FFF0F2] text-[#4A1F1F]/60 hover:text-[#4A1F1F] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isStealMode && (
            <div className="mt-3 p-3 rounded-2xl bg-[#FFF0F2] border border-[#FADADD] text-xs text-[#4A1F1F] leading-relaxed">
              Pilih salah satu Journey Card yang sudah pernah dimainkan sebelumnya untuk kamu jawab kembali sekarang.
            </div>
          )}

          {/* History List */}
          <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-1">
            {safeHistory.length === 0 ? (
              <div className="text-center py-12 text-gray-400 space-y-2">
                <p className="text-sm font-medium">Belum ada kartu yang dimainkan dalam sesi ini.</p>
                <p className="text-xs text-gray-400">Kartu yang selesai disharing akan tercatat di sini.</p>
              </div>
            ) : (
              safeHistory.map((item) => {
                const chapterCfg = CHAPTER_CONFIG[item.chapter] || CHAPTER_CONFIG['past'];
                return (
                  <div
                    key={item.id}
                    className="bg-[#FAF9F6] border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 shadow-sm hover:border-[#FADADD] transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] tracking-wider border ${chapterCfg.colorTheme.tagBg} ${chapterCfg.colorTheme.tagText} ${chapterCfg.colorTheme.tagBorder}`}
                      >
                        {chapterCfg.title}
                      </span>
                      <span className="text-gray-500 font-medium text-[11px]">
                        Oleh: <strong className="text-[#4A1F1F]">{item.playedByPlayerName}</strong>
                      </span>
                    </div>

                    {/* Authentic Card Image */}
                    <div className="w-full aspect-square bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                      <img
                        src={item.cardImage}
                        alt={item.cardTitle}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.opacity = '0.5';
                        }}
                      />
                    </div>

                    {item.effectUsed && (
                      <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-[11px] text-[#C06C84] font-medium">
                        <span className="font-bold uppercase tracking-wider text-[10px]">Effect</span>
                        <span>{item.effectUsed}</span>
                      </div>
                    )}

                    {isStealMode && onSelectStealCard && (
                      <button
                        onClick={() => onSelectStealCard(item)}
                        className="w-full py-2.5 bg-[#4A1F1F] text-white text-xs font-bold rounded-xl hover:bg-[#7A2E2E] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <span>Gunakan Kartu Ini</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Modal Footer */}
          <div className="pt-3 border-t border-gray-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-100 text-[#4A1F1F] hover:bg-gray-200 text-xs font-bold rounded-xl transition-colors"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
