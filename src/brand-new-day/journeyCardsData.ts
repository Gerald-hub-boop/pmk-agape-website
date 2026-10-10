import { JourneyCard, Chapter } from './types';

export const CHAPTER_CONFIG: Record<
  Chapter,
  {
    num: string;
    title: string;
    subtitle: string;
    description: string;
    transitionCopy: string;
    colorTheme: {
      tagBg: string;
      tagText: string;
      tagBorder: string;
      activeBorder: string;
      activeBg: string;
    };
  }
> = {
  past: {
    num: '01',
    title: 'PAST',
    subtitle: 'Hal-hal yang sudah dilewati',
    description: 'Melihat kembali apa yang sudah dilewati dan bagaimana pengalaman tersebut membentuk kita.',
    transitionCopy: 'Look back.',
    colorTheme: {
      tagBg: 'bg-[#FFF0F2]',
      tagText: 'text-[#4A1F1F]',
      tagBorder: 'border-[#FADADD]',
      activeBorder: 'border-[#D88A9A]',
      activeBg: 'bg-[#FFF0F2]/60',
    },
  },
  now: {
    num: '02',
    title: 'NOW',
    subtitle: 'Apa yang sedang dijalani akhir-akhir ini',
    description: 'Memahami keadaan, perasaan, rutinitas, dan kehidupan perkuliahan akhir-akhir ini.',
    transitionCopy: 'Look around.',
    colorTheme: {
      tagBg: 'bg-[#F0F7F4]',
      tagText: 'text-[#2D4A3E]',
      tagBorder: 'border-[#C2E0D4]',
      activeBorder: 'border-[#8ABEA7]',
      activeBg: 'bg-[#F0F7F4]/60',
    },
  },
  next: {
    num: '03',
    title: 'NEXT',
    subtitle: 'Apa yang ingin dibawa ke depan',
    description: 'Melihat harapan, tujuan, dan hal-hal yang ingin dicapai dalam perjalanan berikutnya.',
    transitionCopy: 'Look ahead.',
    colorTheme: {
      tagBg: 'bg-[#F4F6FB]',
      tagText: 'text-[#2A3B5C]',
      tagBorder: 'border-[#CBD8F0]',
      activeBorder: 'border-[#91AADA]',
      activeBg: 'bg-[#F4F6FB]/60',
    },
  },
  god: {
    num: '04',
    title: 'GOD',
    subtitle: 'Melihat perjalanan bersama Tuhan',
    description: 'Menemukan bagaimana Tuhan hadir, menyertai, dan membimbing seluruh perjalanan kita.',
    transitionCopy: 'You are not walking alone.',
    colorTheme: {
      tagBg: 'bg-[#FAF5FF]',
      tagText: 'text-[#4A2D5C]',
      tagBorder: 'border-[#E4D4F4]',
      activeBorder: 'border-[#BA9BD8]',
      activeBg: 'bg-[#FAF5FF]/60',
    },
  },
};

export const JOURNEY_CARDS: JourneyCard[] = [
  // CHAPTER 1: PAST (10 Cards)
  {
    id: 'past-the-best-part',
    chapter: 'past',
    title: 'The Best Part',
    image: '/brand-new-day-cards/PAST/Unknown.jpg',
  },
  {
    id: 'past-the-plot-twist',
    chapter: 'past',
    title: 'The Plot Twist',
    image: '/brand-new-day-cards/PAST/Unknown-2.jpg',
  },
  {
    id: 'past-unexpected-lesson',
    chapter: 'past',
    title: 'Unexpected Lesson',
    image: '/brand-new-day-cards/PAST/Unknown-3.jpg',
  },
  {
    id: 'past-photo-album',
    chapter: 'past',
    title: 'Photo Album',
    image: '/brand-new-day-cards/PAST/Unknown-4.jpg',
  },
  {
    id: 'past-time-machine',
    chapter: 'past',
    title: 'Time Machine',
    image: '/brand-new-day-cards/PAST/Unknown-5.jpg',
  },
  {
    id: 'past-baggage-claim',
    chapter: 'past',
    title: 'Baggage Claim',
    image: '/brand-new-day-cards/PAST/Unknown-6.jpg',
  },
  {
    id: 'past-before-and-after',
    chapter: 'past',
    title: 'Before & After',
    image: '/brand-new-day-cards/PAST/Unknown-7.jpg',
  },
  {
    id: 'past-thank-you',
    chapter: 'past',
    title: 'Thank You',
    image: '/brand-new-day-cards/PAST/Unknown-8.jpg',
  },
  {
    id: 'past-the-thing-i-learned',
    chapter: 'past',
    title: 'The Thing I Learned',
    image: '/brand-new-day-cards/PAST/Unknown-9.jpg',
  },
  {
    id: 'past-goodbye',
    chapter: 'past',
    title: 'Goodbye',
    image: '/brand-new-day-cards/PAST/Unknown-10.jpg',
  },

  // CHAPTER 2: NOW (10 Cards)
  {
    id: 'now-weather-report',
    chapter: 'now',
    title: 'Weather Report',
    image: '/brand-new-day-cards/NOW/Unknown.jpg',
  },
  {
    id: 'now-energy-bar',
    chapter: 'now',
    title: 'Energy Bar',
    image: '/brand-new-day-cards/NOW/Unknown-2.jpg',
  },
  {
    id: 'now-current-tab',
    chapter: 'now',
    title: 'Current Tab',
    image: '/brand-new-day-cards/NOW/Unknown-3.jpg',
  },
  {
    id: 'now-the-weight',
    chapter: 'now',
    title: 'The Weight',
    image: '/brand-new-day-cards/NOW/Unknown-4.jpg',
  },
  {
    id: 'now-one-word',
    chapter: 'now',
    title: 'One Word',
    image: '/brand-new-day-cards/NOW/Unknown-5.jpg',
  },
  {
    id: 'now-whats-behind-it',
    chapter: 'now',
    title: "What's Behind It?",
    image: '/brand-new-day-cards/NOW/Unknown-6.jpg',
  },
  {
    id: 'now-currently',
    chapter: 'now',
    title: 'Currently',
    image: '/brand-new-day-cards/NOW/Unknown-7.jpg',
  },
  {
    id: 'now-help-me',
    chapter: 'now',
    title: 'Help Me',
    image: '/brand-new-day-cards/NOW/Unknown-8.jpg',
  },
  {
    id: 'now-not-alone',
    chapter: 'now',
    title: 'Not Alone',
    image: '/brand-new-day-cards/NOW/Unknown-9.jpg',
  },
  {
    id: 'now-if-you-could-pause',
    chapter: 'now',
    title: 'If You Could Pause',
    image: '/brand-new-day-cards/NOW/Unknown-10.jpg',
  },

  // CHAPTER 3: NEXT (10 Cards from FUTURE)
  {
    id: 'next-starting-line',
    chapter: 'next',
    title: 'Starting Line',
    image: '/brand-new-day-cards/FUTURE/Unknown.jpg',
  },
  {
    id: 'next-the-unknown',
    chapter: 'next',
    title: 'The Unknown',
    image: '/brand-new-day-cards/FUTURE/Unknown-2.jpg',
  },
  {
    id: 'next-future-letter',
    chapter: 'next',
    title: 'Future Letter',
    image: '/brand-new-day-cards/FUTURE/Unknown-3.jpg',
  },
  {
    id: 'next-try-something',
    chapter: 'next',
    title: 'Try Something',
    image: '/brand-new-day-cards/FUTURE/Unknown-4.jpg',
  },
  {
    id: 'next-side-quest',
    chapter: 'next',
    title: 'Side Quest',
    image: '/brand-new-day-cards/FUTURE/Unknown-5.jpg',
  },
  {
    id: 'next-one-step',
    chapter: 'next',
    title: 'One Step',
    image: '/brand-new-day-cards/FUTURE/Unknown-6.jpg',
  },
  {
    id: 'next-the-dream',
    chapter: 'next',
    title: 'The Dream',
    image: '/brand-new-day-cards/FUTURE/Unknown-7.jpg',
  },
  {
    id: 'next-if-everything-goes-well',
    chapter: 'next',
    title: 'If Everything Goes Well',
    image: '/brand-new-day-cards/FUTURE/Unknown-8.jpg',
  },
  {
    id: 'next-future-you',
    chapter: 'next',
    title: 'Future You',
    image: '/brand-new-day-cards/FUTURE/Unknown-9.jpg',
  },
  {
    id: 'next-future-prediction',
    chapter: 'next',
    title: 'Future Prediction',
    image: '/brand-new-day-cards/FUTURE/Unknown-10.jpg',
  },

  // CHAPTER 4: GOD (10 Cards)
  {
    id: 'god-control-room',
    chapter: 'god',
    title: 'Control Room',
    image: '/brand-new-day-cards/GOD/Unknown.jpg',
  },
  {
    id: 'god-let-go',
    chapter: 'god',
    title: 'Let Go',
    image: '/brand-new-day-cards/GOD/Unknown-2.jpg',
  },
  {
    id: 'god-the-unknown',
    chapter: 'god',
    title: 'The Unknown',
    image: '/brand-new-day-cards/GOD/Unknown-3.jpg',
  },
  {
    id: 'god-what-i-trust',
    chapter: 'god',
    title: 'What I Trust',
    image: '/brand-new-day-cards/GOD/Unknown-4.jpg',
  },
  {
    id: 'god-when-things-dont-go-my-way',
    chapter: 'god',
    title: "When Things Don't Go My Way",
    image: '/brand-new-day-cards/GOD/Unknown-5.jpg',
  },
  {
    id: 'god-god-where-are-you',
    chapter: 'god',
    title: 'God, Where Are You?',
    image: '/brand-new-day-cards/GOD/Unknown-6.jpg',
  },
  {
    id: 'god-god-i-need',
    chapter: 'god',
    title: 'God, I Need...',
    image: '/brand-new-day-cards/GOD/Unknown-7.jpg',
  },
  {
    id: 'god-begin',
    chapter: 'god',
    title: 'Begin',
    image: '/brand-new-day-cards/GOD/Unknown-8.jpg',
  },
  {
    id: 'god-my-prayer',
    chapter: 'god',
    title: 'My Prayer',
    image: '/brand-new-day-cards/GOD/Unknown-9.jpg',
  },
  {
    id: 'god-i-surrender',
    chapter: 'god',
    title: 'I Surrender',
    image: '/brand-new-day-cards/GOD/Unknown-10.jpg',
  },
];
