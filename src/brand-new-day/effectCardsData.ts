import { EffectCard, EffectTypeId } from './types';

// DIGITAL EFFECT CARD DECK (6 Cards only)
// Note: Physical cards (FOLLOW UP, SAME HERE, PASS, ALREADY SAID) are handled physically by players
export const DIGITAL_EFFECT_CARDS: EffectCard[] = [
  {
    id: 'mirror',
    name: 'MIRROR',
    rule: 'Orang yang berada di depanmu harus ikut menjawab pertanyaan yang sama.',
    image: '/brand-new-day-cards/EFFECT/Unknown-7.jpg',
    unlimited: false,
    type: 'turn',
  },
  {
    id: 'team-answer',
    name: 'TEAM ANSWER',
    rule: 'Kamu boleh tidak menjawab pertanyaan ini (skip). Sebagai gantinya, semua pemain lain wajib menjawab.',
    image: '/brand-new-day-cards/EFFECT/Unknown-6.jpg',
    unlimited: false,
    type: 'turn',
  },
  {
    id: 'pick-one',
    name: 'PICK ONE',
    rule: 'Roll 2 Journey Card, lalu pilih salah satu untuk kamu jawab.',
    image: '/brand-new-day-cards/EFFECT/Unknown-5.jpg',
    unlimited: false,
    type: 'mechanic',
  },
  {
    id: 'pass-it-on',
    name: 'PASS IT ON',
    rule: 'Setelah kamu menjawab, pilih satu orang untuk ikut menjawab pertanyaan yang sama.',
    image: '/brand-new-day-cards/EFFECT/Unknown-4.jpg',
    unlimited: false,
    type: 'turn',
  },
  {
    id: 'steal',
    name: 'STEAL',
    rule: 'Kamu boleh mengambil satu Journey Card yang sudah pernah keluar dari Journey History dan menjawabnya sekarang.',
    image: '/brand-new-day-cards/EFFECT/Unknown-2.jpg',
    unlimited: false,
    type: 'mechanic',
  },
  {
    id: 'everyone',
    name: 'EVERYONE',
    rule: 'Pertanyaan yang kamu dapat harus dijawab oleh semua pemain, termasuk kamu.',
    image: '/brand-new-day-cards/EFFECT/Unknown.jpg',
    unlimited: false,
    type: 'turn',
  },
];

export const getDigitalEffectById = (id: EffectTypeId): EffectCard => {
  const found = DIGITAL_EFFECT_CARDS.find((e) => e.id === id);
  if (!found) {
    throw new Error(`Digital Effect with id ${id} not found.`);
  }
  return found;
};

// Aliases for compatibility
export const EFFECT_CARDS = DIGITAL_EFFECT_CARDS;
export const getEffectById = getDigitalEffectById;
