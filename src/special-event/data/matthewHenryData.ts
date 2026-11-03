export interface CommentarySection {
  id: string;
  number?: number;
  navTitle: string;
  title: string;
  versesBadge?: string;
  paragraphs: string[];
}

export interface MatthewHenryCommentaryData {
  title: string;
  subtitle: string;
  scriptureReference: string;
  introduction: {
    paragraphs: string[];
  };
  mainSections: CommentarySection[];
  coreThought: {
    title: string;
    paragraph: string;
  };
  usageNotes: {
    title: string;
    notes: string[];
  };
}

export const MATTHEW_HENRY_DATA: MatthewHenryCommentaryData = {
  title: "MATTHEW HENRY'S COMMENTARY",
  subtitle: "Referensi Interpretasi Mazmur 46:1–12",
  scriptureReference: "Mazmur 46:1–12",
  introduction: {
    paragraphs: [
      "Mazmur 46 mengajarkan umat Tuhan untuk berharap dan percaya kepada Allah karena kuasa, pemeliharaan, dan kehadiran-Nya. Melalui mazmur ini, kita diajak menemukan penghiburan di tengah keadaan yang mengancam, mengakui pekerjaan besar Allah, serta meyakini bahwa Dia akan terus menyatakan kemuliaan-Nya.",
      "Matthew Henry membagi mazmur ini menjadi tiga bagian utama.",
    ],
  },
  mainSections: [
    {
      id: "perlindungan",
      number: 1,
      navTitle: "1. Perlindungan (1–6)",
      title: "1. ALLAH, PERLINDUNGAN BAGI UMAT-NYA (AYAT 1–6)",
      versesBadge: "Ayat 1–6",
      paragraphs: [
        "Allah bukan hanya tempat perlindungan dan kekuatan, tetapi juga penolong yang selalu tersedia dan telah terbukti menolong umat-Nya. Karena itu, umat Tuhan tidak perlu takut sekalipun menghadapi bahaya yang sangat besar, bahkan ketika keadaan dunia seolah-olah sedang mengalami kehancuran.",
        "Matthew Henry menjelaskan bahwa gambaran alam yang berguncang menunjukkan betapa besar ancaman yang mungkin dihadapi. Namun, umat Tuhan memiliki alasan untuk tetap teguh karena Allah menyertai dan melindungi mereka.",
        "Sungai yang menyukakan Kota Allah dipahami sebagai gambaran rohani tentang berkat dan penghiburan Allah. Gambaran tersebut dapat merujuk pada janji-janji Allah, Roh Kudus, maupun firman-Nya yang memberikan ketenangan bagi umat-Nya di tengah keadaan yang sulit.",
        "Kehadiran Allah membuat jemaat-Nya tetap teguh dan tidak binasa sekalipun dunia di sekitarnya mengalami guncangan. Allah juga memberikan pertolongan pada waktu yang tepat, bahkan ketika keadaan terasa paling sulit.",
      ],
    },
    {
      id: "kuasa",
      number: 2,
      navTitle: "2. Kuasa (7–10)",
      title: "2. KUASA ALLAH ATAS BANGSA-BANGSA (AYAT 7–10)",
      versesBadge: "Ayat 7–10",
      paragraphs: [
        "Allah adalah Raja atas seluruh bangsa dan kerajaan. Tidak ada kekuatan manusia yang mampu melampaui kuasa-Nya. Ketika bangsa-bangsa memberontak dan berusaha melawan kehendak-Nya, Allah sanggup menghentikan perlawanan serta menghancurkan rancangan mereka.",
        "Matthew Henry juga menekankan bahwa peperangan dan perdamaian berada dalam kendali Allah. Dia bukan hanya sanggup menghancurkan kekuatan musuh, tetapi juga menghentikan peperangan dan menghadirkan kedamaian.",
        "Karena itu, pekerjaan Tuhan perlu diperhatikan dan diakui. Kehancuran yang direncanakan oleh para musuh umat Allah dapat berbalik menimpa mereka sendiri. Sebaliknya, berakhirnya peperangan merupakan pekerjaan Allah yang patut disyukuri.",
      ],
    },
    {
      id: "kemuliaan",
      number: 3,
      navTitle: "3. Kemuliaan (11–12)",
      title: "3. ALLAH DIMULIAKAN DAN MENYERTAI UMAT-NYA (AYAT 11–12)",
      versesBadge: "Ayat 11–12",
      paragraphs: [
        "Perkataan \"Diamlah dan ketahuilah, bahwa Akulah Allah\" memiliki dua sisi. Bagi musuh-musuh-Nya, perkataan ini menunjukkan bahwa mereka harus berhenti melawan karena Allah berkuasa atas segala sesuatu. Bagi umat-Nya, perkataan ini merupakan panggilan untuk tetap tenang dan tidak dikuasai ketakutan karena Allah tetap memegang kendali.",
        "Allah akan tetap ditinggikan di antara bangsa-bangsa dan di seluruh bumi. Kemuliaan-Nya tidak bergantung pada keadaan ataupun kekuatan manusia, sebab Dia sendiri yang akan menyatakan kuasa dan kehendak-Nya.",
        "Penegasan bahwa Tuhan semesta alam menyertai umat-Nya menjadi sumber keyakinan dan penghiburan. Sebutan Allah Yakub mengingatkan bahwa Allah adalah Allah yang mengikatkan diri kepada umat-Nya. Dia bukan hanya berkuasa untuk melindungi, tetapi juga setia menyertai mereka.",
        "Karena itu, umat Tuhan dapat merasa aman sekalipun menghadapi berbagai ancaman, sebab Allah adalah tempat perlindungan mereka.",
      ],
    },
  ],
  coreThought: {
    title: "INTI PEMIKIRAN MATTHEW HENRY",
    paragraph:
      "Mazmur 46 menegaskan bahwa Allah adalah tempat perlindungan, kekuatan, dan penolong bagi umat-Nya. Dia berkuasa atas alam, bangsa-bangsa, dan peperangan. Kehadiran-Nya memberikan keteguhan di tengah kekacauan, sementara kesetiaan-Nya menjadi alasan bagi umat-Nya untuk tetap tenang dan percaya kepada-Nya.",
  },
  usageNotes: {
    title: "CATATAN PENGGUNAAN",
    notes: [
      "Penafsiran sungai sebagai gambaran rohani merupakan penjelasan Matthew Henry, bukan keterangan eksplisit dari ayat. Karena itu, peserta bisa menggunakannya sebagai salah satu sudut pandang untuk memahami ayat 5.",
      "Latar belakang sejarah Mazmur 46 tidak dipastikan. Matthew Henry hanya menyebut kemungkinan mazmur ini berkaitan dengan kemenangan Daud atas bangsa-bangsa di sekitarnya. Jadi, kita tidak perlu menjadikannya sebagai fakta sejarah.",
    ],
  },
};

