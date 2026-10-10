export type Chapter = 'past' | 'now' | 'next' | 'god';

export type EffectTypeId =
  | 'mirror'
  | 'team-answer'
  | 'pick-one'
  | 'pass-it-on'
  | 'steal'
  | 'everyone';

export interface Player {
  id: string;
  name: string;
  turnOrder: number;
}

export interface JourneyCard {
  id: string;
  chapter: Chapter;
  title: string;
  image: string;
}

export interface EffectCard {
  id: EffectTypeId;
  name: string;
  rule: string;
  image: string;
  unlimited: boolean;
  type: 'interaction' | 'mechanic' | 'turn';
}

export interface HistoryItem {
  id: string;
  chapter: Chapter;
  cardTitle: string;
  cardImage: string;
  playedByPlayerName: string;
  timestamp: number;
  effectUsed?: string;
}

export type ScreenState =
  | 'intro'
  | 'how-it-works'
  | 'group-setup'
  | 'map'
  | 'turn-intro'
  | 'pick-one'
  | 'sharing'
  | 'turn-decision'
  | 'final-reflection'
  | 'completed';

export interface ActiveEffectState {
  effect: EffectCard;
  reason?: string;
  targetPlayerId?: string;
  extraCardOptions?: JourneyCard[];
  targetHistoryCardId?: string;
}

export interface GameSession {
  players: Player[];
  currentPlayerIndex: number;
  currentChapter: Chapter;
  currentCard: JourneyCard | null;
  playedCardIds: string[];
  history: HistoryItem[];
  visitedChapters: Chapter[];
  activeEffect: ActiveEffectState | null;
  screen: ScreenState;
}
