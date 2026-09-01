import { useState, useEffect, useCallback } from 'react';
import {
  GameSession,
  Player,
  Chapter,
  JourneyCard,
  EffectCard,
  ScreenState,
  HistoryItem,
} from './types';
import { JOURNEY_CARDS } from './journeyCardsData';
import { getEffectById } from './effectCardsData';

const LOCAL_STORAGE_KEY = 'brand-new-day-session';

const validChapters: Chapter[] = ['past', 'now', 'next', 'god'];

const validScreens: ScreenState[] = [
  'intro',
  'how-it-works',
  'group-setup',
  'map',
  'turn-intro',
  'pick-one',
  'sharing',
  'turn-decision',
  'final-reflection',
  'completed',
];

const initialPlayers: Player[] = [
  { id: 'player-1', name: 'Gerald', turnOrder: 0 },
  { id: 'player-2', name: 'Erta', turnOrder: 1 },
  { id: 'player-3', name: 'Sasta', turnOrder: 2 },
  { id: 'player-4', name: 'Tika', turnOrder: 3 },
];

const initialSession: GameSession = {
  players: initialPlayers,
  currentPlayerIndex: 0,
  currentChapter: 'past',
  currentCard: null,
  playedCardIds: [],
  history: [],
  visitedChapters: ['past'],
  activeEffect: null,
  screen: 'intro',
};

function sanitizeSession(raw: any): GameSession {
  if (!raw || typeof raw !== 'object') return initialSession;

  const players: Player[] =
    Array.isArray(raw.players) && raw.players.length >= 2
      ? raw.players.map((p: any, idx: number) => ({
        id: p?.id || `player-${idx + 1}`,
        name: typeof p?.name === 'string' && p.name.trim() ? p.name : `Pemain ${idx + 1}`,
        turnOrder: typeof p?.turnOrder === 'number' ? p.turnOrder : idx,
      }))
      : initialPlayers;

  const currentPlayerIndex =
    typeof raw.currentPlayerIndex === 'number' &&
      raw.currentPlayerIndex >= 0 &&
      raw.currentPlayerIndex < players.length
      ? raw.currentPlayerIndex
      : 0;

  const currentChapter: Chapter = validChapters.includes(raw.currentChapter)
    ? raw.currentChapter
    : 'past';

  const playedCardIds: string[] = Array.isArray(raw.playedCardIds) ? raw.playedCardIds : [];

  const history: HistoryItem[] = Array.isArray(raw.history)
    ? raw.history.filter((h: any) => h && typeof h.cardTitle === 'string')
    : [];

  const visitedChapters: Chapter[] =
    Array.isArray(raw.visitedChapters) && raw.visitedChapters.length > 0
      ? raw.visitedChapters.filter((c: any) => validChapters.includes(c))
      : [currentChapter];

  // If previous saved session had an outdated screen (e.g. 'chapter-complete'), fallback safely to 'map'
  const screen: ScreenState = validScreens.includes(raw.screen) ? raw.screen : 'intro';

  return {
    players,
    currentPlayerIndex,
    currentChapter,
    currentCard: raw.currentCard || null,
    playedCardIds,
    history,
    visitedChapters: visitedChapters.length > 0 ? visitedChapters : ['past'],
    activeEffect: raw.activeEffect || null,
    screen,
  };
}

export function useBrandNewDay() {
  const [session, setSession] = useState<GameSession>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return sanitizeSession(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load local session', e);
    }
    return initialSession;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(session));
    } catch (e) {
      console.error('Failed to save session to localStorage', e);
    }
  }, [session]);

  const resetGame = useCallback(() => {
    setSession({
      ...initialSession,
      players: initialPlayers,
      screen: 'intro',
    });
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const setPlayers = useCallback((newPlayers: Player[]) => {
    setSession((prev) => ({
      ...prev,
      players: newPlayers.length >= 2 ? newPlayers : initialPlayers,
      currentPlayerIndex: 0,
    }));
  }, []);

  const navigateTo = useCallback((screen: ScreenState) => {
    setSession((prev) => ({ ...prev, screen }));
  }, []);

  const startJourneyFromSetup = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      currentPlayerIndex: 0,
      currentChapter: 'past',
      currentCard: null,
      playedCardIds: [],
      history: [],
      visitedChapters: ['past'],
      activeEffect: null,
      screen: 'map',
    }));
  }, []);

  const selectChapterFromMap = useCallback((chapter: Chapter) => {
    setSession((prev) => {
      const targetChap = validChapters.includes(chapter) ? chapter : 'past';
      const updatedVisited = (prev.visitedChapters || []).includes(targetChap)
        ? prev.visitedChapters
        : [...(prev.visitedChapters || []), targetChap];

      return {
        ...prev,
        currentChapter: targetChap,
        visitedChapters: updatedVisited,
        screen: 'turn-intro',
      };
    });
  }, []);

  const startTurn = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      screen: 'turn-intro',
    }));
  }, []);

  const getAvailableCardsForChapter = useCallback(
    (chapter: Chapter, excludedIds: string[] = []): JourneyCard[] => {
      const filtered = JOURNEY_CARDS.filter(
        (c) => c.chapter === chapter && !excludedIds.includes(c.id)
      );
      if (filtered.length > 0) return filtered;
      // Fallback if all cards in chapter have been played in this session
      const chapterCards = JOURNEY_CARDS.filter((c) => c.chapter === chapter);
      return chapterCards.length > 0 ? chapterCards : JOURNEY_CARDS;
    },
    []
  );

  const drawJourneyCard = useCallback(() => {
    setSession((prev) => {
      const available = getAvailableCardsForChapter(prev.currentChapter, prev.playedCardIds);
      const randomIndex = Math.floor(Math.random() * available.length);
      const cardToDraw = available[randomIndex] || JOURNEY_CARDS[0];

      return {
        ...prev,
        currentCard: cardToDraw,
        activeEffect: null,
        screen: 'sharing',
      };
    });
  }, [getAvailableCardsForChapter]);

  const activateEffect = useCallback(
    (effectId: EffectCard['id'], reason?: string, targetPlayerId?: string) => {
      try {
        const effect = getEffectById(effectId);

        if (effectId === 'pick-one') {
          const available = getAvailableCardsForChapter(
            session.currentChapter,
            session.playedCardIds
          );
          const shuffled = [...available].sort(() => 0.5 - Math.random());
          const cardOptions = shuffled.slice(0, 2);

          setSession((prev) => ({
            ...prev,
            activeEffect: {
              effect,
              reason,
              targetPlayerId,
              extraCardOptions: cardOptions,
            },
            screen: 'pick-one',
          }));
          return;
        }

        setSession((prev) => ({
          ...prev,
          activeEffect: {
            effect,
            reason,
            targetPlayerId,
          },
        }));
      } catch (e) {
        console.error('Failed to activate effect', e);
      }
    },
    [session.currentChapter, session.playedCardIds, getAvailableCardsForChapter]
  );

  const selectPickOneCard = useCallback((card: JourneyCard) => {
    setSession((prev) => ({
      ...prev,
      currentCard: card,
      screen: 'sharing',
    }));
  }, []);

  const stealHistoryCard = useCallback((card: JourneyCard) => {
    try {
      setSession((prev) => ({
        ...prev,
        currentCard: card,
        activeEffect: {
          effect: getEffectById('steal'),
        },
        screen: 'sharing',
      }));
    } catch (e) {
      console.error('Failed to steal card', e);
    }
  }, []);

  const clearActiveEffect = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      activeEffect: null,
    }));
  }, []);

  // When current card sharing is completed: record to history and show WHAT'S NEXT decision screen
  const finishCurrentCardSharing = useCallback(() => {
    setSession((prev) => {
      if (!prev.currentCard) return prev;

      const players = prev.players && prev.players.length > 0 ? prev.players : initialPlayers;
      const currentPlayer = players[prev.currentPlayerIndex] || players[0];

      const newHistoryItem: HistoryItem = {
        id: `${Date.now()}-${Math.random()}`,
        chapter: prev.currentChapter,
        cardTitle: prev.currentCard.title,
        cardImage: prev.currentCard.image,
        playedByPlayerName: currentPlayer.name,
        timestamp: Date.now(),
        effectUsed: prev.activeEffect ? prev.activeEffect.effect.name : undefined,
      };

      const newPlayedIds = (prev.playedCardIds || []).includes(prev.currentCard.id)
        ? prev.playedCardIds
        : [...(prev.playedCardIds || []), prev.currentCard.id];

      return {
        ...prev,
        playedCardIds: newPlayedIds,
        history: [newHistoryItem, ...(prev.history || [])],
        screen: 'turn-decision',
      };
    });
  }, []);

  // Action A: Draw Another card in the same chapter (advances player turn)
  const drawAnotherInSameChapter = useCallback(() => {
    setSession((prev) => {
      const players = prev.players && prev.players.length > 0 ? prev.players : initialPlayers;
      const nextPlayerIndex = (prev.currentPlayerIndex + 1) % players.length;
      return {
        ...prev,
        currentPlayerIndex: nextPlayerIndex,
        currentCard: null,
        activeEffect: null,
        screen: 'turn-intro',
      };
    });
  }, []);

  // Action B: Explore Another Chapter (opens Map to choose)
  const exploreAnotherChapter = useCallback(() => {
    setSession((prev) => {
      const players = prev.players && prev.players.length > 0 ? prev.players : initialPlayers;
      const nextPlayerIndex = (prev.currentPlayerIndex + 1) % players.length;
      return {
        ...prev,
        currentPlayerIndex: nextPlayerIndex,
        currentCard: null,
        activeEffect: null,
        screen: 'map',
      };
    });
  }, []);

  // Action C: End Journey and proceed to final reflection
  const endJourney = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      screen: 'final-reflection',
    }));
  }, []);

  // Internal Back Navigation maintaining full game state
  const goBackInternal = useCallback(() => {
    setSession((prev) => {
      switch (prev.screen) {
        case 'how-it-works':
        case 'group-setup':
          return { ...prev, screen: 'intro' };
        case 'map':
          return { ...prev, screen: 'group-setup' };
        case 'turn-intro':
        case 'sharing':
        case 'pick-one':
        case 'turn-decision':
          return { ...prev, screen: 'map' };
        case 'final-reflection':
          return { ...prev, screen: 'map' };
        case 'completed':
          return { ...prev, screen: 'intro' };
        default:
          return prev;
      }
    });
  }, []);

  return {
    session,
    setPlayers,
    navigateTo,
    resetGame,
    startJourneyFromSetup,
    selectChapterFromMap,
    startTurn,
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
  };
}

