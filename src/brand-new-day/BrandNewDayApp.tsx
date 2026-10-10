import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useBrandNewDay } from './useBrandNewDay';
import { JourneyHistoryModal } from './components/JourneyHistoryModal';
import { RollEffectModal } from './components/RollEffectModal';
import { MapVisual } from './components/MapVisual';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CHAPTER_CONFIG } from './journeyCardsData';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCcw,
  Home,
  Plus,
  Trash2,
  History,
  Map as MapIcon,
  RefreshCw,
  Shuffle,
} from 'lucide-react';

interface Props {
  onBackToHome?: () => void;
}

export const BrandNewDayApp: React.FC<Props> = ({ onBackToHome }) => {
  const {
    session,
    setPlayers,
    navigateTo,
    resetGame,
    startJourneyFromSetup,
    selectChapterFromMap,
    drawJourneyCard,
    activateEffect,
    selectPickOneCard,
    stealHistoryCard,
    clearActiveEffect,
    finishCurrentCardSharing,
    drawAnotherInSameChapter,
    exploreAnotherChapter,
    endJourney,
    goBackInternal,
  } = useBrandNewDay();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isRollEffectOpen, setIsRollEffectOpen] = useState(false);
  const [isStealMode, setIsStealMode] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [isSharingRevealed, setIsSharingRevealed] = useState(false);

  const safePlayers =
    session.players && session.players.length > 0
      ? session.players
      : [
          { id: 'player-1', name: 'Gerald', turnOrder: 0 },
          { id: 'player-2', name: 'Erta', turnOrder: 1 },
        ];

  const currentPlayer = safePlayers[session.currentPlayerIndex] || safePlayers[0];

  const currentChapCfg = CHAPTER_CONFIG[session.currentChapter] || CHAPTER_CONFIG['past'];

  // Synchronize internal screen navigation with browser history stack
  useEffect(() => {
    if (session.screen !== 'intro') {
      window.history.pushState({ bndScreen: session.screen }, '', window.location.href);
    }
  }, [session.screen]);

  useEffect(() => {
    const handlePopState = () => {
      if (session.screen === 'intro') {
        if (onBackToHome) onBackToHome();
      } else {
        goBackInternal();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [session.screen, goBackInternal, onBackToHome]);

  // Group setup functions
  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;
    if (safePlayers.length >= 8) {
      alert('Maksimal 8 pemain dalam satu kelompok.');
      return;
    }
    const newP = {
      id: `player-${Date.now()}`,
      name: newPlayerName.trim(),
      turnOrder: safePlayers.length,
    };
    setPlayers([...safePlayers, newP]);
    setNewPlayerName('');
  };

  const handleRemovePlayer = (id: string) => {
    if (safePlayers.length <= 2) {
      alert('Minimal 2 pemain.');
      return;
    }
    setPlayers(safePlayers.filter((p) => p.id !== id));
  };

  const handleEditPlayerName = (id: string, name: string) => {
    setPlayers(safePlayers.map((p) => (p.id === id ? { ...p, name } : p)));
  };

  const renderHeaderLeftButton = () => {
    if (session.screen === 'intro' || session.screen === 'completed') {
      return (
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#4A1F1F]/70 hover:text-[#4A1F1F] transition-colors"
        >
          <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>PMK Agape</span>
        </button>
      );
    }

    if (session.screen === 'how-it-works' || session.screen === 'group-setup') {
      return (
        <button
          onClick={goBackInternal}
          className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#4A1F1F]/70 hover:text-[#4A1F1F] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Kembali</span>
        </button>
      );
    }

    if (session.screen === 'map') {
      return (
        <button
          onClick={() => navigateTo('group-setup')}
          className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#4A1F1F]/70 hover:text-[#4A1F1F] transition-colors"
          title="Ubah Anggota Kelompok"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Setup</span>
        </button>
      );
    }

    // When inside any chapter screen (turn-intro, sharing, pick-one, turn-decision, final-reflection)
    return (
      <button
        onClick={() => navigateTo('map')}
        className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#C06C84] hover:text-[#4A1F1F] transition-colors px-2 sm:px-2.5 py-1 rounded-full bg-[#FFF0F2] border border-[#FADADD] shadow-sm"
        title="Kembali ke Chapter Menu (Peta)"
      >
        <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        <span>Chapter Menu</span>
      </button>
    );
  };

  return (
    <ErrorBoundary onReset={resetGame} onHome={onBackToHome}>
      <div className="min-h-screen w-full bg-[#FFF0F2]/40 text-[#4A1F1F] font-sans flex flex-col justify-between selection:bg-[#FADADD] selection:text-[#4A1F1F] box-border">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#FFF0F2] px-3 sm:px-4 py-2.5 sm:py-3 w-full">
          <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
            <div className="shrink-0">{renderHeaderLeftButton()}</div>

            <div className="text-center truncate">
              <span className="font-serif font-bold text-[11px] sm:text-xs tracking-wider sm:tracking-widest text-[#4A1F1F] uppercase">
                BRAND NEW DAY
              </span>
            </div>

            <div className="shrink-0 flex items-center gap-1.5">
              {session.screen !== 'intro' &&
                session.screen !== 'how-it-works' &&
                session.screen !== 'group-setup' && (
                  <button
                    onClick={() => {
                      setIsStealMode(false);
                      setIsHistoryOpen(true);
                    }}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#FFF0F2] hover:bg-[#FADADD] text-[#4A1F1F] text-[11px] sm:text-xs font-bold transition-colors flex items-center gap-1 border border-[#FADADD]"
                    title="Journey History"
                  >
                    <History className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>History</span>
                  </button>
                )}
            </div>
          </div>
        </header>

        {/* Main Experience Viewport */}
        <main className="flex-1 w-full max-w-xl mx-auto px-3.5 sm:px-4 py-4 sm:py-6 pb-12 sm:pb-8 flex flex-col justify-center box-border">
          <AnimatePresence mode="wait">
            {/* 1. INTRO SCREEN */}
            {session.screen === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="text-center py-6 space-y-8"
              >
                <div className="space-y-3">
                  <span className="inline-block px-3.5 py-1 bg-white border border-[#FADADD] text-[#C06C84] text-[11px] font-bold tracking-widest uppercase rounded-full shadow-sm">
                    Interactive Fellowship Experience
                  </span>
                  <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#4A1F1F] tracking-tight leading-tight">
                    BRAND NEW DAY
                  </h1>
                  <p className="font-serif italic text-lg sm:text-xl text-[#7A2E2E]">
                    A journey worth sharing.
                  </p>
                </div>

                <div className="bg-white border border-[#FADADD] rounded-3xl p-6 sm:p-8 text-[#4A1F1F] text-sm leading-relaxed space-y-4 shadow-sm text-left">
                  <p className="text-gray-600">
                    Kita semua sedang menjalani perjalanan yang berbeda.
                  </p>
                  <p className="font-medium text-[#4A1F1F] leading-relaxed">
                    Mari melihat apa yang sudah dilewati, memahami apa yang sedang dijalani, melihat apa yang ada di depan, dan menemukan bagaimana Tuhan hadir dalam perjalanan kita.
                  </p>
                  <div className="pt-2 border-t border-gray-100 text-xs text-gray-500 font-medium">
                    Dirancang untuk 1 kelompok menggunakan 1 smartphone.
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => navigateTo('how-it-works')}
                    className="w-full py-4 bg-[#4A1F1F] text-white font-bold rounded-2xl shadow-lg hover:bg-[#7A2E2E] transition-all transform active:scale-95 flex items-center justify-center gap-2 text-sm tracking-wide"
                  >
                    <span>START JOURNEY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigateTo('how-it-works')}
                    className="w-full py-3.5 bg-white border border-gray-200 text-[#4A1F1F] font-bold rounded-2xl hover:bg-gray-50 transition-colors text-xs"
                  >
                    HOW IT WORKS
                  </button>
                </div>
              </motion.div>
            )}

            {/* 2. HOW IT WORKS SCREEN */}
            {session.screen === 'how-it-works' && (
              <motion.div
                key="how-it-works"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="py-4 space-y-6"
              >
                <div className="text-center space-y-1">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#C06C84]">
                    Panduan Singkat
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#4A1F1F]">
                    HOW IT WORKS
                  </h2>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      num: '01',
                      title: 'Sit Together',
                      desc: 'Duduk bersama dalam satu lingkaran kelompok.',
                    },
                    {
                      num: '02',
                      title: 'One Phone Is Enough',
                      desc: 'Gunakan satu HP untuk seluruh kelompok.',
                    },
                    {
                      num: '03',
                      title: 'Take Turns',
                      desc: 'HP berpindah mengikuti giliran yang ditentukan.',
                    },
                    {
                      num: '04',
                      title: 'Share',
                      desc: 'Jawab pertanyaan dan ceritakan seperlunya secara santai.',
                    },
                    {
                      num: '05',
                      title: 'Listen',
                      desc: 'Dengarkan cerita temanmu dengan penuh perhatian.',
                    },
                  ].map((item) => (
                    <div
                      key={item.num}
                      className="bg-white border border-[#FADADD] rounded-2xl p-4 flex gap-4 items-start shadow-sm"
                    >
                      <span className="font-serif font-bold text-sm text-[#4A1F1F] bg-[#FFF0F2] border border-[#FADADD] w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                        {item.num}
                      </span>
                      <div>
                        <h4 className="font-bold text-[#4A1F1F] text-sm">{item.title}</h4>
                        <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-white rounded-2xl border border-gray-100 text-center text-xs text-gray-500 italic">
                  "There's no right answer. Just your story."
                </div>

                <button
                  onClick={() => navigateTo('group-setup')}
                  className="w-full py-4 bg-[#4A1F1F] text-white font-bold rounded-2xl shadow-lg hover:bg-[#7A2E2E] transition-all flex items-center justify-center gap-2 text-sm tracking-wide"
                >
                  <span>LET'S GO</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* 3. GROUP SETUP SCREEN */}
            {session.screen === 'group-setup' && (
              <motion.div
                key="group-setup"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="py-4 space-y-6"
              >
                <div className="text-center space-y-1">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#C06C84]">
                    Kelompok PDJ
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#4A1F1F]">
                    WHO'S ON THIS JOURNEY?
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    Masukkan nama anggota kelompok (2–8 orang, rekomendasi 5 orang).
                  </p>
                </div>

                <div className="bg-white border border-[#FADADD] rounded-3xl p-5 shadow-sm space-y-4">
                  <div className="space-y-2.5">
                    {safePlayers.map((p, idx) => (
                      <div key={p.id} className="flex items-center gap-2">
                        <span className="w-6 text-center font-mono text-xs font-bold text-[#C06C84]">
                          {idx + 1}.
                        </span>
                        <input
                          type="text"
                          value={p.name}
                          onChange={(e) => handleEditPlayerName(p.id, e.target.value)}
                          className="flex-1 bg-[#FAF9F6] border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-[#4A1F1F] focus:outline-none focus:ring-2 focus:ring-[#D88A9A]"
                          placeholder={`Pemain ${idx + 1}`}
                        />
                        {safePlayers.length > 2 && (
                          <button
                            onClick={() => handleRemovePlayer(p.id)}
                            className="p-2 text-xs text-gray-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                            title="Hapus pemain"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {safePlayers.length < 8 && (
                    <div className="pt-2 border-t border-gray-100 flex gap-2">
                      <input
                        type="text"
                        placeholder="Tambah nama teman..."
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
                        className="flex-1 bg-[#FAF9F6] border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#D88A9A]"
                      />
                      <button
                        onClick={handleAddPlayer}
                        className="px-4 py-2 bg-[#FFF0F2] border border-[#FADADD] text-[#4A1F1F] text-xs font-bold rounded-xl hover:bg-[#FADADD] transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah</span>
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={startJourneyFromSetup}
                  className="w-full py-4 bg-[#4A1F1F] text-white font-bold rounded-2xl shadow-lg hover:bg-[#7A2E2E] transition-all flex items-center justify-center gap-2 text-sm tracking-wide"
                >
                  <span>START JOURNEY (BUKA MAP)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* 4. FELLOWSHIP JOURNEY MAP / CHAPTER MENU SCREEN */}
            {session.screen === 'map' && (
              <motion.div
                key="map"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="w-full py-2 sm:py-4 space-y-4 sm:space-y-6"
              >
                <MapVisual
                  currentChapter={session.currentChapter}
                  visitedChapters={session.visitedChapters}
                  onSelectChapter={(chap) => selectChapterFromMap(chap)}
                  onEndJourney={endJourney}
                  historyLength={(session.history || []).length}
                />
              </motion.div>
            )}

            {/* 5. TURN TRANSITION SCREEN (Phone passing) */}
            {session.screen === 'turn-intro' && (
              <motion.div
                key="turn-intro"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="text-center py-8 space-y-6"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[11px] font-bold tracking-widest text-[#C06C84] uppercase bg-white border border-[#FADADD] px-4 py-1 rounded-full shadow-sm inline-block">
                    Chapter: {currentChapCfg.title}
                  </span>
                </div>

                <div className="py-4 space-y-2">
                  <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#4A1F1F]">
                    {currentPlayer.name}'s Turn
                  </h2>
                  <p className="text-gray-600 text-sm font-medium">
                    Pass the phone to <strong className="text-[#4A1F1F]">{currentPlayer.name}</strong>.
                  </p>
                </div>

                <div className="bg-white border border-[#FADADD] p-4 rounded-2xl max-w-sm mx-auto text-xs text-[#4A1F1F] shadow-sm leading-relaxed">
                  Take the phone. Tekan tombol di bawah untuk menarik kartu Journey Card dari chapter{' '}
                  <strong className="uppercase">{session.currentChapter}</strong>.
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      setIsSharingRevealed(false);
                      drawJourneyCard();
                    }}
                    className="w-full py-4 bg-[#4A1F1F] text-white font-bold rounded-2xl shadow-lg hover:bg-[#7A2E2E] transition-all flex items-center justify-center gap-2 text-sm tracking-wide"
                  >
                    <span>DRAW JOURNEY CARD</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => navigateTo('map')}
                    className="w-full py-3 bg-white border border-[#FADADD] text-[#4A1F1F] font-bold rounded-2xl hover:bg-[#FFF0F2] transition-colors text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>PILIH CHAPTER LAIN (CHAPTER MENU)</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 6. PICK ONE EFFECT SCREEN */}
            {session.screen === 'pick-one' && session.activeEffect?.extraCardOptions && (
              <motion.div
                key="pick-one"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="py-4 space-y-5 text-center"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-widest text-[#C06C84] uppercase bg-[#FFF0F2] border border-[#FADADD] px-3 py-0.5 rounded-full">
                    Effect: Pick One
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#4A1F1F]">
                    Pilih 1 Journey Card
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Pilih salah satu kartu di bawah ini untuk kamu jawab.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {session.activeEffect.extraCardOptions.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => {
                        setIsSharingRevealed(true);
                        selectPickOneCard(card);
                      }}
                      className="bg-white border border-gray-200 hover:border-[#D88A9A] rounded-2xl p-3 text-left shadow-sm hover:shadow-md transition-all group flex flex-col cursor-pointer"
                    >
                      <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#FAF9F6] border border-gray-100 mb-2">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.opacity = '0.5';
                          }}
                        />
                      </div>
                      <span className="font-bold text-xs text-[#4A1F1F] group-hover:text-[#7A2E2E]">
                        {card.title}
                      </span>
                      <span className="text-[11px] text-[#C06C84] font-medium mt-1">
                        Pilih kartu ini &rarr;
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => navigateTo('map')}
                  className="text-xs text-[#C06C84] hover:text-[#4A1F1F] font-bold flex items-center gap-1 mx-auto pt-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Chapter Menu</span>
                </button>
              </motion.div>
            )}

            {/* 7. PLAYING / SHARING SCREEN (CORE JOURNEY CARD) */}
            {session.screen === 'sharing' && session.currentCard && (
              <motion.div
                key="sharing"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="py-2 space-y-4"
              >
                {/* Turn Header */}
                <div className="flex items-center justify-between bg-white border border-[#FADADD] rounded-2xl px-4 py-2 text-xs shadow-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigateTo('map')}
                      className="text-xs text-[#C06C84] hover:text-[#4A1F1F] font-bold flex items-center gap-1 pr-2.5 border-r border-gray-200 transition-colors"
                      title="Kembali ke Chapter Menu"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Menu</span>
                    </button>
                    <span className="font-bold text-[#4A1F1F]">
                      GILIRAN: <span className="underline uppercase tracking-wide">{currentPlayer.name}</span>
                    </span>
                  </div>
                  <span className="font-mono text-[#C06C84] font-bold uppercase text-[11px]">
                    Chapter: {session.currentChapter}
                  </span>
                </div>

                {/* Active Effect Banner if activated */}
                {session.activeEffect && (
                  <div className="bg-[#4A1F1F] text-white p-3.5 rounded-2xl shadow-md text-xs space-y-1.5 border border-[#4A1F1F]">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-[#FADADD] text-[11px] uppercase tracking-wider">
                        EFFECT: {session.activeEffect.effect.name}
                      </span>
                      <button
                        onClick={clearActiveEffect}
                        className="text-[10px] underline text-[#FADADD] hover:text-white cursor-pointer"
                      >
                        Batal
                      </button>
                    </div>

                    <p className="text-white/90 text-xs leading-relaxed">
                      {session.activeEffect.effect.rule}
                    </p>

                    {session.activeEffect.effect.id === 'mirror' && (
                      <p className="text-[11px] text-[#FADADD] font-semibold pt-0.5">
                        Orang yang berada di depanmu harus ikut menjawab pertanyaan yang sama.
                      </p>
                    )}

                    {session.activeEffect.effect.id === 'team-answer' && (
                      <p className="text-[11px] text-[#FADADD] font-semibold pt-0.5">
                        {currentPlayer.name} dilewati (skip). Semua anggota lain wajib menjawab pertanyaan ini.
                      </p>
                    )}

                    {session.activeEffect.effect.id === 'everyone' && (
                      <p className="text-[11px] text-[#FADADD] font-semibold pt-0.5">
                        Semua anggota kelompok (termasuk {currentPlayer.name}) wajib menjawab pertanyaan ini.
                      </p>
                    )}

                    {session.activeEffect.effect.id === 'pass-it-on' && session.activeEffect.targetPlayerId && (
                      <p className="text-[11px] text-[#FADADD] font-semibold pt-0.5">
                        Pertanyaan diteruskan ke:{' '}
                        {safePlayers.find((p) => p.id === session.activeEffect?.targetPlayerId)?.name}
                      </p>
                    )}

                    {session.activeEffect.reason && (
                      <p className="italic text-[11px] text-[#FADADD]/80 pt-0.5">
                        "Alasan: {session.activeEffect.reason}"
                      </p>
                    )}
                  </div>
                )}

                {/* REAL CARD IMAGE CONTAINER (1:1 Aspect Ratio) */}
                <div className="w-full aspect-square bg-white rounded-3xl overflow-hidden border border-[#FADADD] shadow-lg flex items-center justify-center p-2">
                  <img
                    src={session.currentCard.image}
                    alt={session.currentCard.title}
                    className="w-full h-full object-contain rounded-2xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.opacity = '0.5';
                    }}
                  />
                </div>

                {/* Instruction Helper Text */}
                <div className="p-3 bg-white/80 border border-gray-100 rounded-2xl text-center space-y-1">
                  <p className="text-xs font-bold text-[#4A1F1F]">
                    Take your time. Share with your group.
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Sharing dilakukan secara langsung/verbal bersama teman kelompokmu.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsRollEffectOpen(true)}
                      className="flex-1 py-3 bg-white border border-[#FADADD] text-[#4A1F1F] font-bold rounded-2xl hover:bg-[#FFF0F2] transition-colors flex items-center justify-center gap-1.5 text-xs shadow-sm cursor-pointer"
                    >
                      <Shuffle className="w-3.5 h-3.5 text-[#C06C84]" />
                      <span>ROLL EFFECT CARD</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsStealMode(true);
                        setIsHistoryOpen(true);
                      }}
                      className="py-3 px-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
                      title="Steal from History"
                    >
                      <History className="w-3.5 h-3.5" />
                      <span>STEAL</span>
                    </button>
                  </div>

                  {!isSharingRevealed ? (
                    <button
                      onClick={() => setIsSharingRevealed(true)}
                      className="w-full py-4 bg-[#4A1F1F] text-white font-bold rounded-2xl shadow-lg hover:bg-[#7A2E2E] transition-all flex items-center justify-center gap-2 text-sm tracking-wide cursor-pointer"
                    >
                      <span>I'M READY TO SHARE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsSharingRevealed(false);
                        finishCurrentCardSharing();
                      }}
                      className="w-full py-4 bg-[#4A1F1F] text-white font-bold rounded-2xl shadow-lg hover:bg-[#7A2E2E] transition-all flex items-center justify-center gap-2 text-sm tracking-wide cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>DONE</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* 8. TURN DECISION SCREEN (WHAT'S NEXT?) */}
            {session.screen === 'turn-decision' && (
              <motion.div
                key="turn-decision"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="py-6 space-y-6 text-center"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-bold tracking-widest text-[#C06C84] uppercase bg-white border border-[#FADADD] px-4 py-1 rounded-full shadow-sm inline-block">
                    Kartu Selesai Disharing
                  </span>
                  <h2 className="font-serif text-3xl font-extrabold text-[#4A1F1F]">
                    WHAT'S NEXT?
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    Kelompok bebas memilih untuk lanjut di chapter ini atau menjelajah chapter lain.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Option 1: Draw another in same chapter */}
                  <button
                    onClick={drawAnotherInSameChapter}
                    className="w-full py-4 bg-[#4A1F1F] text-white font-bold rounded-2xl shadow-lg hover:bg-[#7A2E2E] transition-all flex items-center justify-center gap-2 text-sm tracking-wide cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>DRAW ANOTHER (CHAPTER {session.currentChapter.toUpperCase()})</span>
                  </button>

                  {/* Option 2: Explore another chapter via map */}
                  <button
                    onClick={exploreAnotherChapter}
                    className="w-full py-4 bg-white border border-[#FADADD] text-[#4A1F1F] font-bold rounded-2xl hover:bg-[#FFF0F2] transition-colors flex items-center justify-center gap-2 text-sm shadow-sm cursor-pointer"
                  >
                    <MapIcon className="w-4 h-4 text-[#C06C84]" />
                    <span>EXPLORE ANOTHER CHAPTER (CHAPTER MENU)</span>
                  </button>

                  {/* Option 3: End Journey */}
                  <button
                    onClick={endJourney}
                    className="w-full py-3 bg-transparent text-gray-500 hover:text-[#4A1F1F] font-bold text-xs transition-colors cursor-pointer"
                  >
                    Selesaikan Perjalanan (Akhiri Sesi)
                  </button>
                </div>
              </motion.div>
            )}

            {/* 9. FINAL REFLECTION SCREEN */}
            {session.screen === 'final-reflection' && (
              <motion.div
                key="final-reflection"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="py-4 space-y-6 text-center"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-bold tracking-widest text-[#C06C84] uppercase bg-white border border-[#FADADD] px-3.5 py-1 rounded-full shadow-sm">
                    Final Group Sharing
                  </span>
                  <h2 className="font-serif text-3xl font-extrabold text-[#4A1F1F]">
                    YOUR JOURNEY
                  </h2>
                  <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                    Kamu datang dengan cerita sendiri. Hari ini kamu mungkin pulang dengan cerita dari orang lain juga.
                  </p>
                </div>

                <div className="bg-white border border-[#FADADD] rounded-3xl p-6 shadow-sm text-left space-y-4">
                  <span className="text-[10px] font-bold text-[#C06C84] uppercase tracking-wider block text-center">
                    BEFORE YOU LEAVE...
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#4A1F1F] text-center leading-relaxed">
                    Apa satu hal yang kamu bawa pulang dari perjalanan ini?
                  </h3>
                  <p className="text-xs text-gray-500 text-center italic">
                    Semua anggota kelompok sharing secara langsung.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={() => navigateTo('completed')}
                    className="w-full py-4 bg-[#4A1F1F] text-white font-bold rounded-2xl shadow-lg hover:bg-[#7A2E2E] transition-all flex items-center justify-center gap-2 text-sm tracking-wide cursor-pointer"
                  >
                    <span>COMPLETE JOURNEY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => navigateTo('map')}
                    className="w-full py-3 bg-white border border-[#FADADD] text-[#4A1F1F] font-bold rounded-2xl hover:bg-[#FFF0F2] transition-colors text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Kembali ke Chapter Menu</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 10. JOURNEY COMPLETION SCREEN */}
            {session.screen === 'completed' && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="text-center py-6 space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-bold tracking-widest text-[#C06C84] uppercase bg-white border border-[#FADADD] px-4 py-1 rounded-full shadow-sm inline-block">
                    Selesai
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4A1F1F]">
                    JOURNEY COMPLETE
                  </h2>
                  <p className="font-serif italic text-base text-[#7A2E2E]">
                    Some journeys are better when shared.
                  </p>
                </div>

                {/* Full Map */}
                <MapVisual
                  currentChapter={session.currentChapter}
                  visitedChapters={['past', 'now', 'next', 'god']}
                  interactive={false}
                />

                <div className="bg-white border border-[#FADADD] rounded-3xl p-5 text-xs text-gray-600 space-y-2 shadow-sm text-center">
                  <p className="font-bold text-[#4A1F1F] text-sm">
                    Terima kasih telah berbagi dan mendengarkan.
                  </p>
                  <p className="leading-relaxed">
                    Kiranya setiap cerita dan persekutuan yang kita bangun hari ini menjadi berkat yang saling menguatkan dalam langkah bersama Tuhan.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {onBackToHome && (
                    <button
                      onClick={onBackToHome}
                      className="w-full py-4 bg-[#4A1F1F] text-white font-bold rounded-2xl shadow-lg hover:bg-[#7A2E2E] transition-all flex items-center justify-center gap-2 text-sm tracking-wide cursor-pointer"
                    >
                      <span>BACK TO PMK AGAPE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => resetGame()}
                    className="w-full py-3 bg-white border border-gray-200 text-[#4A1F1F] font-bold rounded-2xl hover:bg-gray-50 transition-colors text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>PLAY AGAIN</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="py-4 text-center border-t border-[#FFF0F2] text-[10px] sm:text-[11px] text-gray-400 px-4">
          BRAND NEW DAY • Fellowship Journey Map & Digital Card Game PMK Agape
        </footer>

        {/* Journey History Modal */}
        <JourneyHistoryModal
          isOpen={isHistoryOpen}
          onClose={() => {
            setIsHistoryOpen(false);
            setIsStealMode(false);
          }}
          history={session.history}
          isStealMode={isStealMode}
          onSelectStealCard={(item) => {
            const matchingCard = {
              id: item.id,
              chapter: item.chapter,
              title: item.cardTitle,
              image: item.cardImage,
            };
            stealHistoryCard(matchingCard);
            setIsSharingRevealed(true);
            setIsHistoryOpen(false);
            setIsStealMode(false);
          }}
        />

        {/* Digital Effect Roll Modal */}
        <RollEffectModal
          isOpen={isRollEffectOpen}
          onClose={() => setIsRollEffectOpen(false)}
          players={safePlayers}
          currentPlayer={currentPlayer}
          onApplyEffect={(effect, targetPlayerId) => {
            if (effect.id === 'steal') {
              setIsStealMode(true);
              setIsHistoryOpen(true);
            } else {
              activateEffect(effect.id, undefined, targetPlayerId);
            }
          }}
        />
      </div>
    </ErrorBoundary>
  );
};
