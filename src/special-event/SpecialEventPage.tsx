import React, { useState, useEffect } from 'react';
import { ArrowLeft, Layers, LayoutGrid, BookOpen, ArrowRight } from 'lucide-react';
import { FLASHCARDS_DATA } from './data/flashcardsData';
import { FlashcardDeck } from './components/FlashcardDeck';
import { FlashcardGrid } from './components/FlashcardGrid';
import { MatthewHenryView } from './components/MatthewHenryView';

interface SpecialEventPageProps {
  onBackToHome: () => void;
}

export const SpecialEventPage: React.FC<SpecialEventPageProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'flashcard' | 'commentary'>('flashcard');
  const [activeFlashcardMode, setActiveFlashcardMode] = useState<'viewer' | 'all'>('viewer');
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

  useEffect(() => {
    document.title = 'A Different Pace: Be Still and Know | PMK Agape';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSelectCardFromGrid = (index: number) => {
    setCurrentCardIndex(index);
    setActiveFlashcardMode('viewer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100dvh] bg-white text-[#4A1F1F] flex flex-col selection:bg-brand-pink selection:text-brand-black pb-16">
      {/* ──────────────── TOP ACTION BAR ──────────────── */}
      <div className="border-b border-[#FADADD]/60 bg-[#FFF0F2]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#4A1F1F] hover:bg-[#FADADD] text-xs sm:text-sm font-semibold border border-[#FADADD] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C06C84]" />
            <span>Kembali ke Beranda</span>
          </button>

          <span className="text-xs text-gray-500 font-medium">
            PMK Agape • Special Event
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-8 sm:pt-10">
        {/* ──────────────── HEADER ──────────────── */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#4A1F1F] font-serif mb-1">
            A DIFFERENT PACE
          </h1>

          <div className="text-xl sm:text-2xl text-[#7A2E2E] font-serif mb-1">
            Be Still and Know
          </div>

          <div className="text-xs sm:text-sm font-semibold text-[#C06C84] mb-5 tracking-wide">
            Mazmur 46:1–11
          </div>

          {/* Ayat Alkitab sebagai Kutipan Utama */}
          <div className="max-w-xl mx-auto p-4 sm:p-5 bg-[#FFF9FA] rounded-2xl border border-[#FADADD]/80">
            <p className="text-sm sm:text-base text-[#4A1F1F] font-serif leading-relaxed italic mb-1.5">
              "Diamlah dan ketahuilah, bahwa Akulah Allah! Aku ditinggikan di antara bangsa-bangsa, Aku ditinggikan di bumi!"
            </p>
            <p className="text-xs font-semibold text-[#C06C84] text-right">
              — Mazmur 46:11
            </p>
          </div>
        </header>

        {/* ──────────────── TAB SELECTOR: FLASHCARD VS MATTHEW HENRY'S COMMENTARY ──────────────── */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex p-1 bg-[#FFF0F2] rounded-full border border-[#FADADD]">
            <button
              type="button"
              onClick={() => {
                setActiveTab('flashcard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'flashcard'
                  ? 'bg-white text-[#4A1F1F] shadow-2xs font-bold'
                  : 'text-gray-600 hover:text-[#4A1F1F]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#C06C84]" />
              <span>Flashcard</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('commentary');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'commentary'
                  ? 'bg-white text-[#4A1F1F] shadow-2xs font-bold'
                  : 'text-gray-600 hover:text-[#4A1F1F]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C06C84]" />
              <span>Matthew Henry's Commentary</span>
            </button>
          </div>
        </div>

        {/* ──────────────── MAIN CONTENT AREA ──────────────── */}
        <main>
          {activeTab === 'commentary' ? (
            /* Tampilan Khusus Commentary Matthew Henry */
            <MatthewHenryView
              onBackToMain={() => {
                setActiveTab('flashcard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : (
            /* Tampilan Flashcard: Deck / Grid */
            <div>
              {/* Sub-Mode Switcher: Viewer vs All */}
              <div className="flex items-center justify-center mb-6">
                <div className="inline-flex p-1 bg-gray-50 rounded-full border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setActiveFlashcardMode('viewer')}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeFlashcardMode === 'viewer'
                        ? 'bg-white text-[#4A1F1F] shadow-2xs font-bold'
                        : 'text-gray-500 hover:text-[#4A1F1F]'
                    }`}
                  >
                    <Layers className="w-3 h-3 text-[#C06C84]" />
                    <span>Flashcard Viewer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveFlashcardMode('all')}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeFlashcardMode === 'all'
                        ? 'bg-white text-[#4A1F1F] shadow-2xs font-bold'
                        : 'text-gray-500 hover:text-[#4A1F1F]'
                    }`}
                  >
                    <LayoutGrid className="w-3 h-3 text-[#C06C84]" />
                    <span>All Flashcards (12)</span>
                  </button>
                </div>
              </div>

              {activeFlashcardMode === 'viewer' ? (
                <FlashcardDeck
                  cards={FLASHCARDS_DATA}
                  currentIndex={currentCardIndex}
                  onIndexChange={setCurrentCardIndex}
                  onViewAllClick={() => setActiveFlashcardMode('all')}
                />
              ) : (
                <FlashcardGrid
                  cards={FLASHCARDS_DATA}
                  onSelectCard={handleSelectCardFromGrid}
                />
              )}

              {/* ──────────────── DEDICATED MATTHEW HENRY COMMENTARY RESOURCE CARD ──────────────── */}
              <section className="mt-12 p-6 sm:p-7 bg-[#FFF9FA] rounded-3xl border border-[#FADADD] flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-2xs">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C06C84] bg-white px-2.5 py-0.5 rounded-full border border-[#FADADD]/60">
                    Referensi Tambahan
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#4A1F1F] font-serif mt-2 mb-1.5">
                    Matthew Henry's Commentary
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-xl leading-relaxed">
                    Tafsiran Mazmur 46:1–12 untuk menggali makna teologis mengenai kedaulatan Allah, pemeliharaan-Nya, dan ketenangan bagi umat-Nya.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('commentary');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#4A1F1F] text-white hover:bg-[#5A1E1E] text-xs sm:text-sm font-bold transition-colors shadow-2xs active:scale-95"
                >
                  <BookOpen className="w-4 h-4 text-[#FADADD]" />
                  <span>Buka Matthew Henry's Commentary</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
