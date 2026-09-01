import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DIGITAL_EFFECT_CARDS } from '../effectCardsData';
import { EffectCard, Player } from '../types';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectEffect: (effectId: EffectCard['id'], reason?: string, targetPlayerId?: string) => void;
  players: Player[];
  currentPlayer: Player;
}

export const EffectDeckModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectEffect,
  players,
  currentPlayer,
}) => {
  const [selectedEffect, setSelectedEffect] = useState<EffectCard | null>(null);
  const [targetPlayerId, setTargetPlayerId] = useState<string>('');

  if (!isOpen) return null;

  const handleApplyEffect = () => {
    if (!selectedEffect) return;

    if (selectedEffect.id === 'pass-it-on' && !targetPlayerId) {
      alert('Pilih pemain yang harus menjawab pertanyaan ini selanjutnya.');
      return;
    }

    onSelectEffect(selectedEffect.id, undefined, targetPlayerId);
    setSelectedEffect(null);
    setTargetPlayerId('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A1F1F]/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg bg-white border border-[#FFF0F2] rounded-3xl p-6 shadow-2xl max-h-[88vh] flex flex-col text-[#4A1F1F]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#C06C84]">
                Digital Effect Deck
              </span>
              <h3 className="font-serif text-xl font-bold tracking-tight text-[#4A1F1F]">
                Digital Effect Cards (6 Cards)
              </h3>
            </div>
            <button
              onClick={() => {
                setSelectedEffect(null);
                onClose();
              }}
              className="p-2 rounded-full hover:bg-[#FFF0F2] text-[#4A1F1F]/60 hover:text-[#4A1F1F] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto my-4 pr-1">
            {!selectedEffect ? (
              <div className="grid grid-cols-2 gap-3">
                {DIGITAL_EFFECT_CARDS.map((eff) => (
                  <button
                    key={eff.id}
                    onClick={() => {
                      setSelectedEffect(eff);
                      setTargetPlayerId('');
                    }}
                    className="flex flex-col bg-[#FAF9F6] border border-gray-100 hover:border-[#D88A9A] rounded-2xl p-2.5 text-left transition-all hover:shadow-md group"
                  >
                    {/* Authentic Card Image */}
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-white border border-gray-100 mb-2">
                      <img
                        src={eff.image}
                        alt={eff.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex items-center justify-between w-full mt-1">
                      <span className="font-bold text-xs text-[#4A1F1F] group-hover:text-[#7A2E2E]">
                        {eff.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Back button */}
                <button
                  onClick={() => setSelectedEffect(null)}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#C06C84] hover:text-[#7A2E2E] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali ke daftar Effect</span>
                </button>

                {/* Selected Card Image */}
                <div className="w-full max-w-[280px] mx-auto aspect-square rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md">
                  <img
                    src={selectedEffect.image}
                    alt={selectedEffect.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="p-3.5 bg-[#FAF9F6] rounded-2xl border border-gray-200/80 text-xs text-[#4A1F1F] leading-relaxed">
                  <span className="font-bold block mb-1 uppercase tracking-wider text-[10px] text-[#C06C84]">
                    Aturan Kartu:
                  </span>
                  {selectedEffect.rule}
                </div>

                {/* Player Target Selector for PASS IT ON */}
                {selectedEffect.id === 'pass-it-on' && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#4A1F1F]">
                      Pilih pemain yang harus menjawab:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {players
                        .filter((p) => p.id !== currentPlayer.id)
                        .map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setTargetPlayerId(p.id)}
                            className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
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

                {/* Apply Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setSelectedEffect(null)}
                    className="flex-1 py-3 bg-gray-100 text-[#4A1F1F] text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleApplyEffect}
                    className="flex-1 py-3 bg-[#4A1F1F] text-white text-xs font-bold rounded-xl hover:bg-[#7A2E2E] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Aktivasi Effect</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
