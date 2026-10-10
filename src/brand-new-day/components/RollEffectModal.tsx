import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DIGITAL_EFFECT_CARDS } from '../effectCardsData';
import { EffectCard, Player } from '../types';
import { ArrowRight, X, Shuffle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApplyEffect: (effect: EffectCard, targetPlayerId?: string) => void;
  players: Player[];
  currentPlayer: Player;
}

export const RollEffectModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onApplyEffect,
  players,
  currentPlayer,
}) => {
  const [isRolling, setIsRolling] = useState(false);
  const [rolledEffect, setRolledEffect] = useState<EffectCard | null>(null);
  const [targetPlayerId, setTargetPlayerId] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      // Start roll animation
      setIsRolling(true);
      setRolledEffect(null);
      setTargetPlayerId('');

      const timer = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * DIGITAL_EFFECT_CARDS.length);
        setRolledEffect(DIGITAL_EFFECT_CARDS[randomIndex]);
        setIsRolling(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApply = () => {
    if (!rolledEffect) return;

    if (rolledEffect.id === 'pass-it-on' && !targetPlayerId) {
      alert('Pilih pemain yang harus menjawab pertanyaan ini selanjutnya.');
      return;
    }

    onApplyEffect(rolledEffect, targetPlayerId);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A1F1F]/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-sm bg-white border border-[#FFF0F2] rounded-3xl p-6 shadow-2xl flex flex-col text-[#4A1F1F]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#C06C84]">
              Digital Effect Card
            </span>
            {!isRolling && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#FFF0F2] text-[#4A1F1F]/60 hover:text-[#4A1F1F] transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Body */}
          <div className="py-4 flex flex-col items-center text-center space-y-4">
            {isRolling ? (
              <div className="py-10 flex flex-col items-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF0F2] border border-[#FADADD] flex items-center justify-center animate-spin">
                  <Shuffle className="w-6 h-6 text-[#C06C84]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-[#4A1F1F]">
                    ROLLING EFFECT...
                  </h4>
                  <p className="text-xs text-gray-400">
                    Memilih kartu dari Digital Effect Deck
                  </p>
                </div>
              </div>
            ) : rolledEffect ? (
              <div className="w-full space-y-4">
                {/* Authentic Card Image */}
                <div className="w-full max-w-[240px] mx-auto aspect-square rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md">
                  <img
                    src={rolledEffect.image}
                    alt={rolledEffect.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Effect Rule Explanation */}
                <div className="p-3 bg-[#FAF9F6] rounded-2xl border border-gray-200/80 text-left text-xs space-y-1.5">
                  <span className="font-bold block uppercase tracking-wider text-[10px] text-[#C06C84]">
                    {rolledEffect.name}
                  </span>
                  <p className="text-gray-700 leading-relaxed">{rolledEffect.rule}</p>

                  {rolledEffect.id === 'mirror' && (
                    <p className="text-[11px] text-[#C06C84] font-semibold pt-1">
                      Orang yang berada di depanmu harus ikut menjawab pertanyaan yang sama.
                    </p>
                  )}

                  {rolledEffect.id === 'team-answer' && (
                    <p className="text-[11px] text-[#C06C84] font-semibold pt-1">
                      {currentPlayer.name} dilewati (skip). Semua anggota lain wajib menjawab.
                    </p>
                  )}

                  {rolledEffect.id === 'everyone' && (
                    <p className="text-[11px] text-[#C06C84] font-semibold pt-1">
                      Semua anggota (termasuk {currentPlayer.name}) wajib menjawab pertanyaan ini.
                    </p>
                  )}
                </div>

                {/* Player Target Selector for PASS IT ON */}
                {rolledEffect.id === 'pass-it-on' && (
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-bold text-[#4A1F1F]">
                      Pilih pemain yang harus menjawab selanjutnya:
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {players
                        .filter((p) => p.id !== currentPlayer.id)
                        .map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setTargetPlayerId(p.id)}
                            className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                              targetPlayerId === p.id
                                ? 'bg-[#4A1F1F] text-white border-[#4A1F1F] shadow-sm'
                                : 'bg-gray-50 border-gray-200 text-[#4A1F1F] hover:bg-gray-100'
                            }`}
                          >
                            {p.name}
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {/* Apply CTA */}
                <button
                  onClick={handleApply}
                  className="w-full py-3.5 bg-[#4A1F1F] text-white font-bold rounded-2xl shadow-md hover:bg-[#7A2E2E] transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
                >
                  <span>Gunakan Effect Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : null}
          </div>

          {/* Physical Cards subtle reminder */}
          <div className="pt-2 border-t border-gray-100 text-[10px] text-gray-400 text-center leading-relaxed">
            Kartu fisik (<em>Follow Up</em>, <em>Same Here</em>, <em>Pass</em>, <em>Already Said</em>) dapat digunakan manual oleh pemain kapan saja sesuai aturan.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
