import React from 'react';
import { ArrowLeft, BookOpen, Quote, Info, ChevronRight, Bookmark } from 'lucide-react';
import { MATTHEW_HENRY_DATA } from '../data/matthewHenryData';

interface MatthewHenryViewProps {
  onBackToMain: () => void;
}

export const MatthewHenryView: React.FC<MatthewHenryViewProps> = ({ onBackToMain }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Top Back Action */}
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToMain}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#FFF0F2] text-[#4A1F1F] text-xs sm:text-sm font-semibold border border-[#FADADD] transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#C06C84]" />
          <span>Kembali ke Flashcard</span>
        </button>

        <span className="text-xs font-semibold text-[#C06C84] bg-[#FFF0F2] px-3 py-1 rounded-full border border-[#FADADD]/60">
          Matthew Henry's Commentary
        </span>
      </div>

      {/* Header Commentary */}
      <header className="mb-8 pb-6 border-b border-[#FADADD]/60 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F2] text-[#4A1F1F] text-xs font-semibold mb-3 border border-[#FADADD]">
          <BookOpen className="w-3.5 h-3.5 text-[#C06C84]" />
          <span>{MATTHEW_HENRY_DATA.subtitle}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4A1F1F] font-serif leading-tight mb-2">
          {MATTHEW_HENRY_DATA.title}
        </h2>

        <p className="text-sm text-gray-500 font-sans">
          Dasar Ayat: <strong className="text-[#4A1F1F]">{MATTHEW_HENRY_DATA.scriptureReference}</strong>
        </p>
      </header>

      {/* Mini-Navigation Pills to Jump to Key Sections */}
      <nav className="mb-8 p-3 bg-[#FFF9FA] rounded-2xl border border-[#FADADD]/70" aria-label="Navigasi cepat bagian commentary">
        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2 px-1">
          Lompat ke Bagian:
        </p>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => scrollToSection('section-pengantar')}
            className="px-3 py-1 rounded-full bg-white hover:bg-[#FFF0F2] text-[#4A1F1F] text-xs font-semibold border border-[#FADADD] transition-colors"
          >
            Pengantar
          </button>
          {MATTHEW_HENRY_DATA.mainSections.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollToSection(`section-${sec.id}`)}
              className="px-3 py-1 rounded-full bg-white hover:bg-[#FFF0F2] text-[#4A1F1F] text-xs font-semibold border border-[#FADADD] transition-colors"
            >
              {sec.navTitle}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollToSection('section-inti')}
            className="px-3 py-1 rounded-full bg-white hover:bg-[#FFF0F2] text-[#4A1F1F] text-xs font-semibold border border-[#FADADD] transition-colors"
          >
            Inti Pemikiran
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('section-catatan')}
            className="px-3 py-1 rounded-full bg-white hover:bg-[#FFF0F2] text-[#4A1F1F] text-xs font-semibold border border-[#FADADD] transition-colors"
          >
            Catatan Penggunaan
          </button>
        </div>
      </nav>

      {/* ──────────────── CONTENT SECTIONS ──────────────── */}
      <div className="space-y-10 text-[#4A1F1F]">
        {/* 1. Pengantar */}
        <section id="section-pengantar" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-3">
            <Bookmark className="w-4 h-4 text-[#C06C84]" />
            <h3 className="text-xl font-bold font-serif text-[#4A1F1F]">
              Pengantar
            </h3>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#FADADD] space-y-3.5 shadow-2xs">
            {MATTHEW_HENRY_DATA.introduction.paragraphs.map((p, idx) => (
              <p key={idx} className="text-sm sm:text-base leading-relaxed text-gray-700 font-sans text-justify sm:text-left">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* 2, 3, 4: Three Main Sections */}
        {MATTHEW_HENRY_DATA.mainSections.map((sec) => (
          <section key={sec.id} id={`section-${sec.id}`} className="scroll-mt-24">
            <div className="flex items-center justify-between mb-3 border-b border-[#FADADD]/60 pb-2">
              <h3 className="text-lg sm:text-xl font-bold font-serif text-[#4A1F1F]">
                {sec.title}
              </h3>
              {sec.versesBadge && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FFF0F2] text-[#C06C84] border border-[#FADADD]">
                  {sec.versesBadge}
                </span>
              )}
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#FADADD] space-y-3.5 shadow-2xs">
              {sec.paragraphs.map((p, idx) => (
                <p key={idx} className="text-sm sm:text-base leading-relaxed text-gray-700 font-sans text-justify sm:text-left">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}

        {/* 5. Inti Pemikiran Matthew Henry */}
        <section id="section-inti" className="scroll-mt-24">
          <div className="bg-gradient-to-br from-[#FFF9FA] to-[#FFF0F2] p-5 sm:p-7 rounded-2xl border border-[#D88A9A] shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Quote className="w-5 h-5 text-[#C06C84]" />
              <h3 className="text-lg sm:text-xl font-bold font-serif text-[#4A1F1F]">
                {MATTHEW_HENRY_DATA.coreThought.title}
              </h3>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-gray-800 font-sans font-medium text-justify sm:text-left">
              {MATTHEW_HENRY_DATA.coreThought.paragraph}
            </p>
          </div>
        </section>

        {/* 6. Catatan Penggunaan (Context & Boundaries) */}
        <section id="section-catatan" className="scroll-mt-24">
          <div className="bg-amber-50/60 p-5 sm:p-6 rounded-2xl border border-amber-200/80">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-amber-800" />
              <h3 className="text-sm sm:text-base font-bold font-serif text-amber-900 tracking-wide uppercase">
                {MATTHEW_HENRY_DATA.usageNotes.title}
              </h3>
            </div>
            <div className="space-y-3">
              {MATTHEW_HENRY_DATA.usageNotes.notes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                  <p className="text-xs sm:text-sm leading-relaxed text-amber-950 font-sans">
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Back Button */}
        <div className="pt-6 border-t border-[#FADADD]/60 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToMain}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4A1F1F] text-white hover:bg-[#5A1E1E] text-xs sm:text-sm font-semibold transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Flashcard</span>
          </button>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-semibold text-gray-500 hover:text-[#4A1F1F] transition-colors"
          >
            Kembali ke Atas &uarr;
          </button>
        </div>
      </div>
    </div>
  );
};

