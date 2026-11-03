export interface FlashcardCategory {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  description: string;
  cardCount: number;
  tagColor: {
    bg: string;
    text: string;
    border: string;
    badgeBg: string;
  };
}

export interface FlashcardItem {
  id: number;
  cardNumber: number;
  categoryId: string;
  categoryName: string;
  categoryBadge: string;
  prefix: string; // e.g. "WHAT", "WHO", "KONTEKS SEJARAH"
  title: string;
  fullTitle: string;
  content: string; // Exact text from prompt
  reference: string;
  keyQuestion?: string;
}

export const FLASHCARD_CATEGORIES: FlashcardCategory[] = [
  {
    id: '5w1h',
    name: '5W + 1H',
    shortName: '5W + 1H',
    badge: '5W + 1H',
    description: 'Pertanyaan mendasar seputar isi, tokoh, latar tempat, waktu, alasan penyampaian, dan cara Allah menyatakan kuasa-Nya.',
    cardCount: 7,
    tagColor: {
      bg: 'bg-rose-50',
      text: 'text-rose-900',
      border: 'border-rose-200',
      badgeBg: 'bg-rose-100',
    },
  },
  {
    id: 'sejarah',
    name: 'Konteks Sejarah',
    shortName: 'Sejarah',
    badge: 'Konteks Sejarah',
    description: 'Latar belakang kelompok Bani Korah serta situasi ancaman krisis dan peperangan dalam sejarah Israel.',
    cardCount: 2,
    tagColor: {
      bg: 'bg-amber-50',
      text: 'text-amber-900',
      border: 'border-amber-200',
      badgeBg: 'bg-amber-100',
    },
  },
  {
    id: 'budaya',
    name: 'Konteks Budaya',
    shortName: 'Budaya',
    badge: 'Konteks Budaya',
    description: 'Pemaknaan kota berbenteng dan perlindungan dalam kehidupan dunia Timur Dekat Kuno.',
    cardCount: 1,
    tagColor: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-900',
      border: 'border-emerald-200',
      badgeBg: 'bg-emerald-100',
    },
  },
  {
    id: 'literatur',
    name: 'Konteks Literatur',
    shortName: 'Literatur',
    badge: 'Konteks Literatur',
    description: 'Struktur puitis dan pergerakan tema dari tiga bagian utama Mazmur 46.',
    cardCount: 1,
    tagColor: {
      bg: 'bg-blue-50',
      text: 'text-blue-900',
      border: 'border-blue-200',
      badgeBg: 'bg-blue-100',
    },
  },
  {
    id: 'teologis',
    name: 'Konteks Teologis',
    shortName: 'Teologis',
    badge: 'Konteks Teologis',
    description: 'Panggilan untuk mengenal Allah yang berdaulat, berdiam diri, dan mengandalkan penyertaan-Nya.',
    cardCount: 1,
    tagColor: {
      bg: 'bg-purple-50',
      text: 'text-purple-900',
      border: 'border-purple-200',
      badgeBg: 'bg-purple-100',
    },
  },
];

export const FLASHCARDS_DATA: FlashcardItem[] = [
  {
    id: 1,
    cardNumber: 1,
    categoryId: '5w1h',
    categoryName: '5W + 1H',
    categoryBadge: '5W + 1H',
    prefix: 'WHAT',
    title: 'Pokok Utama Mazmur 46',
    fullTitle: 'WHAT: Pokok Utama Mazmur 46',
    content:
      'Mazmur 46 menggambarkan Allah sebagai tempat perlindungan, kekuatan, dan penolong bagi umat-Nya. Di tengah kekacauan alam, kegemparan bangsa-bangsa, dan ancaman peperangan, Allah tetap hadir dan berdaulat. Karena itu, umat Tuhan diajak untuk tidak takut, sebab keamanan mereka bersumber dari penyertaan Allah, bukan dari keadaan dunia yang selalu stabil.',
    reference: 'Mazmur 46:2–4, 7–8, 11',
    keyQuestion: 'Apa pesan sentral yang ingin ditekankan oleh pemazmur tentang Allah dan umat-Nya?',
  },
  {
    id: 2,
    cardNumber: 2,
    categoryId: '5w1h',
    categoryName: '5W + 1H',
    categoryBadge: '5W + 1H',
    prefix: 'WHAT',
    title: 'Situasi yang Digambarkan',
    fullTitle: 'WHAT: Situasi yang Digambarkan',
    content:
      'Mazmur 46 menggunakan gambaran bumi yang berubah, gunung-gunung yang berguncang, laut yang bergelora, dan bangsa-bangsa yang gempar. Gambaran puitis ini memperlihatkan keadaan yang penuh ancaman dan ketidakstabilan. Namun, di tengah situasi tersebut, pemazmur menegaskan bahwa Allah tetap menjadi perlindungan bagi umat-Nya.',
    reference: 'Mazmur 46:3–4, 7',
    keyQuestion: 'Bagaimana pemazmur melukiskan ketidakpastian dunia melalui metafora alam dan bangsa-bangsa?',
  },
  {
    id: 3,
    cardNumber: 3,
    categoryId: '5w1h',
    categoryName: '5W + 1H',
    categoryBadge: '5W + 1H',
    prefix: 'WHO',
    title: 'Siapa yang Terlibat?',
    fullTitle: 'WHO: Siapa yang Terlibat?',
    content:
      'Allah atau TUHAN semesta alam merupakan tokoh utama yang menjadi perlindungan dan penolong umat-Nya. Umat Tuhan digambarkan sebagai komunitas yang dapat berlindung kepada-Nya, sedangkan bangsa-bangsa dan kerajaan-kerajaan menjadi gambaran kekuatan dunia yang mengalami keguncangan. Judul mazmur menghubungkannya dengan Bani Korah, kelompok yang dikenal memiliki peran dalam pelayanan musik dan nyanyian ibadah Israel.',
    reference: 'Judul Mazmur 46; ayat 2, 7, dan 11',
    keyQuestion: 'Siapakah para pihak yang hadir dan berperan dalam teks Mazmur 46?',
  },
  {
    id: 4,
    cardNumber: 4,
    categoryId: '5w1h',
    categoryName: '5W + 1H',
    categoryBadge: '5W + 1H',
    prefix: 'WHERE',
    title: 'Di Mana Latar Tempatnya?',
    fullTitle: 'WHERE: Di Mana Latar Tempatnya?',
    content:
      'Mazmur 46 menyebut Kota Allah, kota kudus tempat kediaman Yang Mahatinggi, yang umumnya dipahami sebagai Zion atau Yerusalem. Kota tersebut digambarkan sebagai tempat yang tidak goyah karena Allah hadir di tengah-tengahnya. Selain itu, bumi, laut, dan ujung-ujung bumi digunakan untuk menggambarkan cakupan kekuasaan Allah yang melampaui batas suatu kota atau bangsa.',
    reference: 'Mazmur 46:3–5, 9',
    keyQuestion: 'Latar tempat apa saja yang diangkat dan apa makna simbolis Kota Allah?',
  },
  {
    id: 5,
    cardNumber: 5,
    categoryId: '5w1h',
    categoryName: '5W + 1H',
    categoryBadge: '5W + 1H',
    prefix: 'WHEN',
    title: 'Kapan Situasi Ini Terjadi?',
    fullTitle: 'WHEN: Kapan Situasi Ini Terjadi?',
    content:
      'Mazmur 46 menggambarkan keadaan krisis, seperti keguncangan alam, pergolakan bangsa-bangsa, dan peperangan. Pesannya relevan bagi umat yang menghadapi ancaman dan membutuhkan penghiburan akan penyertaan Allah. Namun, teks Alkitab tidak menyebutkan secara pasti kapan mazmur ini ditulis atau peristiwa sejarah tertentu yang melatarbelakanginya, sehingga kita tidak dapat menetapkan satu tanggal atau kejadian sebagai fakta.',
    reference: 'Mazmur 46:3–4, 7–10',
    keyQuestion: 'Kapan situasi ini berlangsung dan mengapa tidak ada satu tanggal mutlak yang dipastikan?',
  },
  {
    id: 6,
    cardNumber: 6,
    categoryId: '5w1h',
    categoryName: '5W + 1H',
    categoryBadge: '5W + 1H',
    prefix: 'WHY',
    title: 'Mengapa Pesan Ini Disampaikan?',
    fullTitle: 'WHY: Mengapa Pesan Ini Disampaikan?',
    content:
      'Mazmur 46 menegaskan bahwa umat Tuhan tidak perlu dikuasai ketakutan karena Allah adalah tempat perlindungan dan kekuatan mereka. Pesan ini juga menunjukkan bahwa kekuasaan Allah melampaui kekacauan alam dan konflik antarmanusia. Melalui penggambaran tersebut, umat diajak untuk mengandalkan Tuhan dan mengakui bahwa Dia tetap berdaulat sekalipun keadaan di sekeliling mereka berubah.',
    reference: 'Mazmur 46:2–3, 6–11',
    keyQuestion: 'Apa tujuan dan dampak rohani yang diharapkan bagi umat yang mendengar nyanyian ini?',
  },
  {
    id: 7,
    cardNumber: 7,
    categoryId: '5w1h',
    categoryName: '5W + 1H',
    categoryBadge: '5W + 1H',
    prefix: 'HOW',
    title: 'Bagaimana Allah Menunjukkan Kuasa-Nya?',
    fullTitle: 'HOW: Bagaimana Allah Menunjukkan Kuasa-Nya?',
    content:
      'Allah digambarkan sebagai tempat perlindungan dan kekuatan, hadir di tengah Kota-Nya, serta berkuasa atas bangsa-bangsa dan peperangan. Ia menghentikan peperangan sampai ke ujung bumi dan memerintahkan manusia untuk diam serta mengakui bahwa Dialah Allah. Rangkaian gambaran ini menegaskan bahwa penyertaan dan kedaulatan Tuhan menjadi dasar pengharapan umat-Nya.',
    reference: 'Mazmur 46:2, 5–6, 9–11',
    keyQuestion: 'Dengan cara apa saja kedaulatan Allah dinyatakan dalam kehidupan nyata dan sejarah?',
  },
  {
    id: 8,
    cardNumber: 8,
    categoryId: 'sejarah',
    categoryName: 'Konteks Sejarah',
    categoryBadge: 'Konteks Sejarah',
    prefix: 'SEJARAH',
    title: 'Bani Korah',
    fullTitle: 'KONTEKS SEJARAH: Bani Korah',
    content:
      'Bani Korah merupakan kelompok keturunan Korah yang dikenal memiliki peran dalam pelayanan musik dan nyanyian ibadah Israel. Sejumlah mazmur, termasuk Mazmur 42–49, dikaitkan dengan Bani Korah melalui judulnya. Karena itu, Mazmur 46 dapat dipahami sebagai bagian dari tradisi nyanyian ibadah Israel, meskipun judulnya tidak memastikan siapa individu yang menulis mazmur ini.',
    reference: 'Judul Mazmur 42–49, khususnya Mazmur 46',
    keyQuestion: 'Siapakah Bani Korah dan apa peranan mereka dalam tradisi liturgi dan peribadahan Israel?',
  },
  {
    id: 9,
    cardNumber: 9,
    categoryId: 'sejarah',
    categoryName: 'Konteks Sejarah',
    categoryBadge: 'Konteks Sejarah',
    prefix: 'SEJARAH',
    title: 'Ancaman dan Peperangan',
    fullTitle: 'KONTEKS SEJARAH: Ancaman dan Peperangan',
    content:
      'Mazmur 46 menggambarkan ancaman berupa kekacauan alam, pergolakan bangsa-bangsa, dan peperangan. Gambaran tersebut sesuai dengan berbagai ancaman yang dapat dihadapi Israel dalam sejarahnya. Meskipun demikian, tidak ada keterangan eksplisit yang menghubungkan mazmur ini dengan satu peperangan atau peristiwa sejarah tertentu. Oleh sebab itu, kita perlu membedakan konteks ancaman yang tergambar dalam teks dari dugaan mengenai peristiwa yang mungkin melatarbelakanginya.',
    reference: 'Mazmur 46:3–4, 7–10',
    keyQuestion: 'Bagaimana menyikapi gambaran perang dalam teks tanpa terjebak dalam spekulasi peristiwa tunggal?',
  },
  {
    id: 10,
    cardNumber: 10,
    categoryId: 'budaya',
    categoryName: 'Konteks Budaya',
    categoryBadge: 'Konteks Budaya',
    prefix: 'BUDAYA',
    title: 'Kota dan Perlindungan',
    fullTitle: 'KONTEKS BUDAYA: Kota dan Perlindungan',
    content:
      'Dalam dunia Timur Dekat Kuno, kota dan benteng merupakan gambaran penting tentang keamanan dari ancaman luar. Mazmur 46 menggunakan gambaran Kota Allah yang tidak goyah untuk menekankan bahwa keamanan umat-Nya bersumber dari kehadiran Allah. Gambaran alam yang berguncang memperlihatkan besarnya ancaman, sedangkan sungai yang mengalir dan kota yang tetap teguh menggambarkan ketenteraman di tengah kekacauan.',
    reference: 'Mazmur 46:3–5',
    keyQuestion: 'Mengapa simbol kota berkubu dan benteng sangat kuat maknanya bagi masyarakat zaman itu?',
  },
  {
    id: 11,
    cardNumber: 11,
    categoryId: 'literatur',
    categoryName: 'Konteks Literatur',
    categoryBadge: 'Konteks Literatur',
    prefix: 'LITERATUR',
    title: 'Struktur Mazmur 46',
    fullTitle: 'KONTEKS LITERATUR: Struktur Mazmur 46',
    content:
      'Mazmur 46 dapat dibaca melalui tiga bagian utama: ayat 2–4 menggambarkan Allah sebagai perlindungan di tengah kekacauan; ayat 5–8 menekankan kehadiran dan kuasa Allah di tengah bangsa-bangsa; sedangkan ayat 9–12 mengajak pembaca menyaksikan karya Allah dan mengakui kedaulatan-Nya. Pengulangan pernyataan tentang TUHAN semesta alam yang menyertai umat-Nya memperkuat tema utama mazmur ini, yaitu penyertaan Allah sebagai sumber pengharapan.',
    reference: 'Mazmur 46:2–12',
    keyQuestion: 'Bagaimana alur dan pembagian tiga stanza utama membentuk pesan utuh Mazmur 46?',
  },
  {
    id: 12,
    cardNumber: 12,
    categoryId: 'teologis',
    categoryName: 'Konteks Teologis',
    categoryBadge: 'Konteks Teologis',
    prefix: 'TEOLOGIS',
    title: 'Mengenal Allah',
    fullTitle: 'KONTEKS TEOLOGIS: Mengenal Allah',
    content:
      'Mazmur 46 menekankan bahwa Allah adalah perlindungan umat-Nya, berdaulat atas alam dan sejarah, serta hadir di tengah orang-orang yang percaya kepada-Nya. Perintah, “Diamlah dan ketahuilah, bahwa Akulah Allah,” bukan sekadar ajakan untuk berhenti berbicara, melainkan panggilan untuk mengakui kedaulatan Tuhan. Dalam konteks mazmur ini, umat diajak untuk tidak menempatkan kekacauan dunia sebagai penentu akhir pengharapan mereka, tetapi tetap mengandalkan Allah yang menyertai mereka.',
    reference: 'Mazmur 46:2, 6–8, 11',
    keyQuestion: 'Apa arti terdalam dari perintah "Diamlah dan ketahuilah bahwa Akulah Allah" dalam hidup kita?',
  },
];

export const PSALM_46_PASSAGE = {
  title: 'Mazmur 46:1–11',
  subheading: 'Allah, tempat perlindungan dan kekuatan',
  superscription: 'Untuk pemimpin biduan. Dari bani Korah. Dengan lagu: Alamot. Nyanyian.',
  verses: [
    { number: 1, text: 'Untuk pemimpin biduan. Dari bani Korah. Dengan lagu: Alamot. Nyanyian.' },
    { number: 2, text: 'Allah itu bagi kita tempat perlindungan dan kekuatan, sebagai penolong dalam kesesakan sangat terbukti.' },
    { number: 3, text: 'Sebab itu kita tidak akan takut, sekalipun bumi berubah, sekalipun gunung-gunung goncang di dalam hati laut;' },
    { number: 4, text: 'sekalipun ribut dan berbuih airnya, sekalipun gunung-gunung goyang oleh geloranya. Sela' },
    { number: 5, text: 'Kota Allah, kediaman Yang Mahatinggi, disukakan oleh aliran-aliran sebuah sungai.' },
    { number: 6, text: 'Allah ada di dalamnya, kota itu tidak akan goncang; Allah akan menolongnya menjelang pagi.' },
    { number: 7, text: 'Bangsa-bangsa ribut, kerajaan-kerajaan goncang, Ia memperdengarkan suara-Nya, dan bumi pun hancur.' },
    { number: 8, text: 'TUHAN semesta alam menyertai kita, kota benteng kita ialah Allah Yakub. Sela' },
    { number: 9, text: 'Pergilah, pandanglah pekerjaan TUHAN, yang mengadakan kemusnahan di bumi,' },
    { number: 10, text: 'yang menghentikan peperangan sampai ke ujung bumi, yang mematahkan busur panah, menindas tombak, membakar kereta-kereta perang dengan api!' },
    { number: 11, text: '"Diamlah dan ketahuilah, bahwa Akulah Allah! Aku ditinggikan di antara bangsa-bangsa, Aku ditinggikan di bumi!"' },
  ],
};

