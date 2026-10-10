import React from 'react';
import { Chapter } from '../types';
import { CHAPTER_CONFIG } from '../journeyCardsData';

interface Props {
  currentChapter?: Chapter;
  visitedChapters?: Chapter[];
  onSelectChapter?: (chap: Chapter) => void;
  interactive?: boolean;
  onEndJourney?: () => void;
  historyLength?: number;
}

const chapters: Chapter[] = ['past', 'now', 'next', 'god'];

export const MapVisual: React.FC<Props> = ({
  currentChapter = 'past',
  visitedChapters = [],
  onSelectChapter,
  interactive = true,
  onEndJourney,
  historyLength = 0,
}) => {
  const safeVisited = Array.isArray(visitedChapters) ? visitedChapters : [];

  return (
    <div className="w-full bg-[#FAF9F6] border border-[#FADADD] rounded-3xl p-4 sm:p-6 shadow-sm space-y-5 sm:space-y-6 box-border">
      <div className="space-y-1 text-center px-1">
        <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#C06C84]">
          Fellowship Journey Map
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A1F1F]">
          4 Perjalanan Berbagi
        </h3>
        <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
          Pilih salah satu chapter di bawah untuk memulai atau melanjutkan obrolan kelompok.
        </p>
      </div>

      <div className="relative space-y-3 sm:space-y-3.5">
        {chapters.map((chap, idx) => {
          const cfg = CHAPTER_CONFIG[chap] || CHAPTER_CONFIG['past'];
          const isCurrent = currentChapter === chap;
          const isVisited = safeVisited.includes(chap);

          return (
            <div key={chap} className="relative w-full">
              {/* Subtle connecting path line between chapters */}
              {idx < chapters.length - 1 && (
                <div className="absolute left-[1.125rem] sm:left-5 top-10 sm:top-11 w-0.5 h-5 sm:h-6 z-0 bg-gray-200" />
              )}

              <button
                type="button"
                disabled={!interactive}
                onClick={() => onSelectChapter && onSelectChapter(chap)}
                className={`w-full relative z-10 flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl border text-left transition-all group ${
                  isCurrent
                    ? 'bg-white border-[#D88A9A] shadow-md ring-2 ring-[#FADADD]'
                    : isVisited
                    ? 'bg-white border-gray-200 hover:border-[#D88A9A] hover:shadow-sm'
                    : 'bg-white/80 border-gray-100 hover:border-[#FADADD]'
                } ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
              >
                {/* Node circle with number */}
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center font-serif font-bold text-xs shrink-0 transition-transform group-hover:scale-105 mt-0.5 ${
                    isCurrent
                      ? 'bg-[#4A1F1F] text-white shadow-sm'
                      : isVisited
                      ? 'bg-[#FFF0F2] text-[#4A1F1F] border border-[#FADADD]'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {cfg.num}
                </div>

                {/* Chapter details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${cfg.colorTheme.tagBg} ${cfg.colorTheme.tagText} ${cfg.colorTheme.tagBorder}`}
                    >
                      {cfg.title}
                    </span>

                    {isCurrent && (
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#C06C84] bg-[#FFF0F2] px-2 py-0.5 rounded-full border border-[#FADADD]">
                        Aktif
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-sm text-[#4A1F1F] leading-snug group-hover:text-[#7A2E2E] break-words pt-0.5">
                    {cfg.subtitle}
                  </h4>

                  <p className="text-xs text-gray-600 leading-relaxed break-words pt-0.5">
                    {cfg.description}
                  </p>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* End Journey Button if history has cards */}
      {onEndJourney && historyLength > 0 && (
        <div className="pt-2 border-t border-gray-200/60 text-center">
          <button
            onClick={onEndJourney}
            className="text-xs font-bold text-[#C06C84] hover:text-[#4A1F1F] transition-colors py-1.5 px-4 rounded-full hover:bg-[#FFF0F2]"
          >
            Selesaikan Perjalanan (Akhiri Sesi) &rarr;
          </button>
        </div>
      )}
    </div>
  );
};
