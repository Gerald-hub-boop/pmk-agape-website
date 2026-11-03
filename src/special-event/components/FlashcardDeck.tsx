import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, LayoutGrid } from 'lucide-react';
import { FlashcardItem } from '../data/flashcardsData';

interface FlashcardDeckProps {
  cards: FlashcardItem[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onViewAllClick: () => void;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  cards,
  currentIndex,
  onIndexChange,
  onViewAllClick,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[currentIndex] || cards[0];
  const totalCards = cards.length;

  // Reset flip state when changing card
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  }, [currentIndex, onIndexChange]);

  const handleNext = useCallback(() => {
    if (currentIndex < totalCards - 1) {
      onIndexChange(currentIndex + 1);
    }
  }, [currentIndex, totalCards, onIndexChange]);

  const toggleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (e.key === ' ') e.preventDefault();
        toggleFlip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, toggleFlip]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Top Status: Position & View All Toggle */}
      <div className="w-full flex items-center justify-between mb-3 px-1 text-sm">
        <span className="font-semibold text-[#4A1F1F]">
          Kartu {currentIndex + 1} dari {totalCards}
        </span>

        <button
          type="button"
          onClick={onViewAllClick}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C06C84] hover:text-[#4A1F1F] transition-colors"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Lihat Semua Kartu</span>
        </button>
      </div>

      {/* 3D Flip Card Container */}
      <div className="w-full [perspective:1000px]">
        <div
          onClick={toggleFlip}
          role="button"
          tabIndex={0}
          aria-label={`Kartu ${currentIndex + 1}: ${currentCard.fullTitle}. Klik untuk membalik.`}
          className="relative w-full min-h-[360px] sm:min-h-[380px] cursor-pointer select-none transition-transform duration-500 [transform-style:preserve-3d] rounded-2xl shadow-sm hover:shadow-md"
          style={{
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* ──────────────── FRONT OF CARD ──────────────── */}
          <div
            className="absolute inset-0 w-full h-full bg-white rounded-2xl p-6 sm:p-8 border border-[#FADADD] flex flex-col justify-between [backface-visibility:hidden]"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-xs">
              <span className="px-2.5 py-1 rounded-full bg-[#FFF0F2] text-[#4A1F1F] font-semibold">
                Kartu {currentCard.cardNumber} • {currentCard.categoryName}
              </span>
              <span className="text-gray-400 flex items-center gap-1">
                <RotateCw className="w-3 h-3 text-[#C06C84]" />
                Ketuk untuk buka
              </span>
            </div>

            {/* Center Content */}
            <div className="my-auto py-6 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#4A1F1F] leading-snug mb-3 font-serif">
                {currentCard.fullTitle}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-sans">
                {currentCard.categoryName}
              </p>
            </div>

            {/* Bottom Bar */}
            <div className="pt-4 border-t border-[#FFF0F2] flex items-center justify-between text-xs text-gray-500">
              <span>
                Ayat: <strong className="text-[#4A1F1F]">{currentCard.reference}</strong>
              </span>
              <span className="text-[#C06C84] font-medium">
                Buka Materi &rarr;
              </span>
            </div>
          </div>

          {/* ──────────────── BACK OF CARD ──────────────── */}
          <div
            className="absolute inset-0 w-full h-full bg-[#FFF9FA] rounded-2xl p-6 sm:p-8 border border-[#D88A9A] flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-xs pb-3 border-b border-[#FADADD]/60">
              <span className="px-2.5 py-1 rounded-full bg-white text-[#4A1F1F] font-semibold border border-[#FADADD]">
                Kartu {currentCard.cardNumber} • {currentCard.categoryName}
              </span>
              <span className="text-gray-400 flex items-center gap-1">
                <RotateCw className="w-3 h-3 text-[#C06C84]" />
                Balik kartu
              </span>
            </div>

            {/* Center Content (The Paragraph) */}
            <div className="my-auto py-4 overflow-y-auto">
              <h4 className="text-base sm:text-lg font-bold text-[#4A1F1F] mb-3 leading-snug font-serif">
                {currentCard.fullTitle}
              </h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans text-justify sm:text-left">
                {currentCard.content}
              </p>
            </div>

            {/* Bottom Bar */}
            <div className="pt-3 border-t border-[#FADADD]/60 flex items-center justify-between text-xs">
              <span className="text-gray-600">
                Referensi: <strong className="text-[#4A1F1F]">{currentCard.reference}</strong>
              </span>
              <span className="text-gray-400 text-[11px]">
                Ketuk untuk tutup
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls: Previous / Flip / Next */}
      <div className="w-full flex items-center justify-between gap-3 mt-5">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
            currentIndex === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-[#4A1F1F] hover:bg-[#FFF0F2] border border-[#FADADD]'
          }`}
          aria-label="Kartu sebelumnya"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <button
          type="button"
          onClick={toggleFlip}
          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-5 rounded-full bg-[#FFF0F2] hover:bg-[#FADADD] text-[#4A1F1F] border border-[#FADADD] text-xs sm:text-sm font-semibold transition-colors"
        >
          <RotateCw className="w-3.5 h-3.5 text-[#C06C84]" />
          <span>{isFlipped ? 'Tutup Materi' : 'Buka Materi'}</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === totalCards - 1}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
            currentIndex === totalCards - 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-[#4A1F1F] text-white hover:bg-[#5A1E1E]'
          }`}
          aria-label="Kartu selanjutnya"
        >
          <span>Selanjutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Direct Card Selector 1–12 */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-5">
        {cards.map((card, idx) => (
          <button
            key={card.id}
            type="button"
            onClick={() => onIndexChange(idx)}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-semibold transition-all flex items-center justify-center ${
              currentIndex === idx
                ? 'bg-[#4A1F1F] text-white'
                : 'bg-white hover:bg-[#FFF0F2] text-gray-600 border border-[#FADADD]'
            }`}
            title={`Buka Kartu ${card.cardNumber}: ${card.title}`}
            aria-label={`Pilih Kartu ${card.cardNumber}`}
          >
            {card.cardNumber}
          </button>
        ))}
      </div>
    </div>
  );
};
