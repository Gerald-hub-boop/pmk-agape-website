import React from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import {
  FlashcardItem,
  FLASHCARD_CATEGORIES,
} from '../data/flashcardsData';

interface FlashcardGridProps {
  cards: FlashcardItem[];
  onSelectCard: (index: number) => void;
}

export const FlashcardGrid: React.FC<FlashcardGridProps> = ({
  cards,
  onSelectCard,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      {FLASHCARD_CATEGORIES.map((category) => {
        const categoryCards = cards.filter(
          (c) => c.categoryId === category.id
        );

        if (categoryCards.length === 0) return null;

        return (
          <div key={category.id} className="space-y-4">
            {/* Category Header */}
            <div className="border-b border-[#FADADD]/60 pb-2">
              <h3 className="text-lg font-bold text-[#4A1F1F] font-serif">
                {category.name}
              </h3>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryCards.map((card) => {
                const globalIndex = card.cardNumber - 1;

                return (
                  <div
                    key={card.id}
                    onClick={() => onSelectCard(globalIndex)}
                    className="bg-white rounded-2xl p-5 border border-[#FADADD] hover:border-[#D88A9A] transition-all cursor-pointer flex flex-col justify-between shadow-2xs hover:shadow-sm"
                  >
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-semibold text-gray-400">
                          Kartu {card.cardNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#FFF0F2] text-[#4A1F1F] font-medium text-[11px]">
                          {card.categoryName}
                        </span>
                      </div>

                      {/* Card Title */}
                      <h4 className="text-base font-bold text-[#4A1F1F] mb-2 leading-snug font-serif">
                        {card.fullTitle}
                      </h4>

                      {/* Paragraph Content */}
                      <p className="text-sm text-gray-700 leading-relaxed font-sans mb-4">
                        {card.content}
                      </p>
                    </div>

                    {/* Bottom Reference & Action */}
                    <div className="pt-3 border-t border-[#FFF0F2] flex items-center justify-between text-xs">
                      <span className="text-gray-500 font-medium">
                        Ayat: <strong className="text-[#4A1F1F]">{card.reference}</strong>
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#C06C84] font-semibold">
                        <span>Buka di Viewer</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
