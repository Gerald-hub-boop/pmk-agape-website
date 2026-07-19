import React, { useState, useEffect, useRef } from 'react';
// Team Images 1-45
import img1 from './images/1.png';
import img2 from './images/2.png';
import img3 from './images/3.png';
import img4 from './images/4.png';
import img5 from './images/5.png';
import img6 from './images/6.png';
import img7 from './images/7.png';
import img8 from './images/8.png';
import img9 from './images/9.png';
import img10 from './images/10.png';
import img11 from './images/11.png';
import img12 from './images/12.png';
import img13 from './images/13.png';
import img14 from './images/14.png';
import img15 from './images/15.png';
import img16 from './images/16.png';
import img17 from './images/17.png';
import img18 from './images/18.png';
import img19 from './images/19.png';
import img20 from './images/20.png';
import img21 from './images/21.png';
import img22 from './images/22.png';
import img23 from './images/23.png';
import img24 from './images/24.png';
import img25 from './images/25.png';
import img26 from './images/26.png';
import img27 from './images/27.png';
import img28 from './images/28.png';
import img29 from './images/29.png';
import img30 from './images/30.png';
import img31 from './images/31.png';
import img32 from './images/32.png';
import img33 from './images/33.png';
import img34 from './images/34.png';
import img35 from './images/35.png';
import img36 from './images/36.png';
import img37 from './images/37.png';
import img38 from './images/38.png';
import img39 from './images/39.png';
import img40 from './images/40.png';
import img41 from './images/41.png';
import img42 from './images/42.png';
import img43 from './images/43.png';
import img44 from './images/44.png';
import img45 from './images/45.png';
import logo from './logo.png';
import imgPersekutuanDoaJemaat from './images/WhatWeDo/Persekutuan Doa Jemaat.png';
import imgPersekutuanJumat from './images/WhatWeDo/Persekutuan Jumat.png';
import imgNatalPaskah from './images/WhatWeDo/NATAL & PASKAH.png';
import imgPenyambutanMaba from './images/WhatWeDo/Penyambutan Mahasiswa Baru.png';
import imgRetreat from './images/WhatWeDo/Retreat.png';
import imgKelompokKecil from './images/WhatWeDo/Kelompok Kecil.png';
import imgPelayananPribadi from './images/WhatWeDo/Pelayanan Pribadi.png';
import imgPMKS33hat from './images/WhatWeDo/PMK S33hat.png';
import { CinematicHero } from './components/CinematicHero';

import { motion, AnimatePresence } from 'motion/react';
import {
  Heart, Users, BookOpen, MessageCircle, MapPin,
  Calendar, ChevronRight, Star, Mail, ArrowRight,
  HandHeart, Send, Quote, Music, Sparkles, UserPlus, Mountain, Megaphone,
  Flame, Menu, X, Instagram, Activity, Smile, Handshake
} from 'lucide-react';

function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "PMK Agape";
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      let isAnyIntersecting = false;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          isAnyIntersecting = true;
        }
      });
      // If we scroll to the very top and miss the threshold slightly, default to home
      if (!isAnyIntersecting && window.scrollY < 100) {
        setActiveSection('home');
      }
    }, {
      rootMargin: '-20% 0px -60% 0px'
    });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  const navLinks = [
    { name: "Vision & Mission", href: "#vision" },
    { name: "What We Do?", href: "#events" },
    { name: "Meet The Team", href: "#family" }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b-transparent' : 'bg-white/80 backdrop-blur-md border-b border-[#FFF0F2]'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 cursor-pointer group">



          {/* Logo Box */}

          <div className="w-10 h-10 rounded-xl bg-[#FFF0F2] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">

            <img
              src={logo}
              alt="PMK Agape Logo"
              className="w-full h-full object-contain"
            />

          </div>

          <span className="font-bold text-xl tracking-tight text-brand-black">
            PMK Agape
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className={`text-sm font-semibold transition-colors relative pb-1 ${activeSection === link.href.substring(1) ? 'text-brand-black' : 'text-gray-400 hover:text-brand-black'}`}>
              {link.name}
              {activeSection === link.href.substring(1) && (
                <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D88A9A] rounded-full" />
              )}
            </a>
          ))}
          <a href="#connect" className="px-6 py-2.5 bg-[#FFF0F2] text-brand-black hover:bg-brand-pink hover:text-white rounded-full text-sm font-bold transition-colors">
            Join Us
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-brand-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl md:hidden border-t border-gray-100 py-6 px-6 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-bold ${activeSection === link.href.substring(1) ? 'text-[#C06C84]' : 'text-gray-600'}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#connect"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 text-center bg-brand-black text-white rounded-full font-bold mt-2"
            >
              Join Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}



function About() {
  const missions = [
    { title: "Penginjilan", icon: <Megaphone className="w-6 h-6" />, desc: "Memberitakan Injil melalui pendekatan pribadi, kelompok kecil, dan kegiatan agar mahasiswa mengenal Kristus." },
    { title: "Pemuridan", icon: <BookOpen className="w-6 h-6" />, desc: "Membina iman dan karakter melalui kelompok kecil, persekutuan, dan pembelajaran firman." },
    { title: "Pelipatgandaan", icon: <Users className="w-6 h-6" />, desc: "Mempercayakan mahasiswa untuk membina orang lain dan menjadi murid yang melipatgandakan." },
    { title: "Pengutusan", icon: <Send className="w-6 h-6" />, desc: "Mengutus mahasiswa untuk hidup sebagai terang di tengah keluarga, gereja, dan masyarakat." },
  ];

  return (
    <motion.section
      id="vision"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-10 md:py-14 px-6 bg-white relative scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-4 md:mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Vision & Mission</h2>
          <p className="text-lg text-gray-500 font-medium">
            The Foundation of Direction and Calling for PMK Agape
          </p>
        </motion.div>

        {/* Visi Highlight Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-b from-[#FFF0F2] to-white border border-[#D88A9A]/20 rounded-3xl p-5 md:p-6 text-center max-w-3xl mx-auto mb-8 shadow-[0_10px_30px_-10px_rgba(90,30,30,0.1)]"
        >
          {/* Faint Background Quote Icon */}
          <Quote className="absolute top-6 left-6 md:top-8 md:left-8 w-16 h-16 md:w-20 md:h-20 text-[#FADADD] opacity-40 rotate-180 -z-10" />

          {/* High Contrast Pill Label */}
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#f8dce1] text-[#5A1E1E] text-[10px] font-black tracking-[0.2em] uppercase shadow-sm">
              Vision
            </span>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                }
              }
            }}
            className="text-lg md:text-xl lg:text-2xl font-semibold text-brand-black/90 leading-snug md:leading-relaxed max-w-2xl mx-auto italic relative z-10"
          >
            {"\"Memperlengkapi mahasiswa menjadi garam dan terang, yang dewasa dalam Kristus serta menjadi berkat bagi keluarga, gereja, bangsa, bahkan dunia.\"".split(" ").map((word, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 5, filter: "blur(2px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { ease: "easeOut", duration: 0.6 }
                  }
                }}
                className="inline-block mr-[0.2em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Misi Grid */}
        <div className="flex overflow-x-auto overflow-y-hidden pt-3 pb-4 md:pt-0 md:pb-0 -mt-3 md:mt-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 px-4 md:px-0 -mx-4 md:mx-0 snap-x snap-mandatory scroll-smooth no-scrollbar md:overflow-visible">
          {missions.map((misi, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{
                delay: idx * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="bg-[#FFF0F2] rounded-[2rem] p-5 md:p-6 text-center hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 md:hover:-translate-y-1 group shrink-0 w-[80vw] md:w-auto snap-start cursor-pointer"
            >
              <div className="w-14 h-14 bg-white text-brand-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm [&>svg]:transition-transform [&>svg]:duration-300 group-hover:[&>svg]:scale-[1.15] group-hover:[&>svg]:rotate-[8deg]">
                {misi.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{misi.title}</h3>
              <p className="text-gray-600 font-medium leading-relaxed">{misi.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function Activities() {
  const activities = [
    {
      title: "Kelompok Kecil",
      icon: <Users className="w-6 h-6" />,
      desc: "Tempat kita berjalan bersama dalam iman, saling mengenal, dan bertumbuh bersama secara pribadi dalam Tuhan.",
      image: imgKelompokKecil
    },
    {
      title: "Persekutuan Doa Jemaat",
      icon: <Heart className="w-6 h-6" />,
      desc: "Ruang untuk saling mendoakan, membawa setiap pergumulan kepada Tuhan bersama-sama.",
      image: imgPersekutuanDoaJemaat
    },
    {
      title: "Persekutuan Jumat",
      icon: <Music className="w-6 h-6" />,
      desc: "Ibadah rutin untuk memuji Tuhan, mendengar firman, dan dikuatkan bersama.",
      image: imgPersekutuanJumat
    },
    {
      title: "Ibadah Perayaan Natal & Paskah",
      icon: <Sparkles className="w-6 h-6" />,
      desc: "Momen spesial untuk merayakan kasih Tuhan bersama seluruh komunitas.",
      image: imgNatalPaskah
    },
    {
      title: "Ibadah Penyambutan Mahasiswa Baru",
      icon: <UserPlus className="w-6 h-6" />,
      desc: "Tempat pertama untuk mengenal komunitas ini dan mulai perjalanan bersama.",
      image: imgPenyambutanMaba
    },
    {
      title: "Retreat",
      icon: <Mountain className="w-6 h-6" />,
      desc: "Waktu khusus untuk berhenti sejenak, dipulihkan, dan kembali dekat dengan Tuhan.",
      image: imgRetreat
    },
    {
      title: "Pelayanan Pribadi",
      icon: <MessageCircle className="w-6 h-6" />,
      desc: "Ruang aman untuk berbagi cerita, didengarkan, dan didoakan secara pribadi.",
      image: imgPelayananPribadi
    },
    {
      title: "PMK S33hat",
      icon: <Activity className="w-6 h-6" />,
      desc: "Kegiatan olahraga bersama untuk menjaga kesehatan jasmani sekaligus membangun keakraban antar jemaat.",
      image: imgPMKS33hat
    },
  ];

  return (
    <motion.section
      id="events"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="pt-8 pb-4 md:pt-12 md:pb-6 px-0 bg-[#FAFAFA] rounded-[3rem] mx-1 md:mx-4 mt-6 mb-2 overflow-hidden scroll-mt-20"
    >
      <div className="max-w-[1500px] mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-end mb-6 px-6 lg:px-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 tracking-tight text-brand-black">What We Do?</h2>
            <p className="text-gray-500 font-medium text-base md:text-lg leading-relaxed opacity-90">Growing together in every gathering and every shared journey.</p>
          </div>
        </div>

        {/* Horizontal Scroll Layout */}
        <div className="relative w-full">
          <div className="flex overflow-x-auto overflow-y-hidden pt-3 pb-6 md:pt-0 md:pb-10 -mt-3 md:mt-0 gap-4 md:gap-6 px-6 lg:px-16 snap-x snap-mandatory no-scrollbar w-full relative scroll-smooth">
            {activities.map((act, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white rounded-2xl md:rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 ease-in-out cursor-pointer group flex flex-col border border-gray-100/50 shrink-0 w-[80vw] md:w-[48vw] lg:w-[42vw] max-w-[650px] snap-start overflow-hidden h-fit"
              >
                {/* Immersive Image Header */}
                <div className="relative w-full h-[200px] md:h-[340px] overflow-hidden">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  {/* Cinematic Overlay */}
                  <div className="absolute inset-0 bg-[#5A1E1E]/5 transition-opacity duration-500 group-hover:opacity-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent opacity-60" />
                </div>

                {/* Content Section */}
                <div className="p-4 md:p-6 flex flex-col relative bg-white">
                  <div className="flex gap-4 md:gap-6 items-start">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-[#FFF0F2] text-[#5A1E1E] rounded-xl flex items-center justify-center shrink-0 border border-[#FADADD]/20 shadow-sm">
                      {React.cloneElement(act.icon as React.ReactElement, { className: 'w-5 h-5 md:w-7 md:h-7' })}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-2.5 leading-tight text-[#5A1E1E] group-hover:translate-x-1 transition-transform duration-300">{act.title}</h3>
                      <p className="text-gray-500 font-medium text-sm md:text-base leading-relaxed opacity-80">{act.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Spacer to allow the last card to scroll fully to the left */}
            <div className="shrink-0 w-8 md:w-20"></div>
          </div>
        </div>

      </div>
    </motion.section>
  );
}

const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1508614999368-9260051292e5?auto=format&fit=crop&q=80&w=400"
];

interface LeadershipCardProps {
  m: any;
  avatarUrl: string;
  key?: React.Key;
}

function LeadershipCard({ m, avatarUrl }: LeadershipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  const backImages = m.backImages || BACKGROUND_IMAGES;

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isFlipped && backImages.length > 0) {
      interval = setInterval(() => {
        setImgIndex(prev => (prev + 1) % backImages.length);
      }, 1000);
    } else {
      setImgIndex(0);
    }
    return () => clearInterval(interval);
  }, [isFlipped, backImages.length]);

  return (
    <motion.div
      className="group snap-start shrink-0 w-[240px] md:w-full h-[300px] [perspective:1200px] cursor-pointer"
      onMouseEnter={() => {
        if (!isTouch) setIsFlipped(true);
      }}
      onMouseLeave={() => {
        if (!isTouch) setIsFlipped(false);
      }}
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d] rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 [backface-visibility:hidden] flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100">
          <div className="h-[150px] w-full bg-[#FFF0F2] relative overflow-hidden flex-shrink-0">
            <img src={avatarUrl} alt={m.name} className="w-full h-full object-cover object-[center_20%]" />
          </div>
          <div className="p-4 flex-1 flex flex-col items-center justify-center text-center bg-gray-50 relative">
            <h4 className="font-bold text-xl text-brand-black">{m.name}</h4>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-2">{m.role}</p>

            {/* Mobile Hint */}
            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 text-[9px] font-bold text-brand-pink/60 uppercase tracking-tighter md:hidden">
              <Sparkles className="w-2.5 h-2.5" /> Tap to see story
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl overflow-hidden bg-white border border-[#FADADD]/40 shadow-inner"
        >
          {/* Layer 1: Image Loop */}
          <div className="absolute inset-0 z-0">
            {backImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${idx === imgIndex ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>

          {/* Layer 2: Overlay */}
          <div className="absolute inset-0 z-10 bg-white/85 backdrop-blur-[3px]" />

          {/* Layer 3: Content */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full p-6 text-center">
            <Quote className="w-6 h-6 text-brand-pink fill-brand-pink/50 mb-3 drop-shadow-sm opacity-90" />
            <p className="text-[12px] font-bold text-brand-black mb-3 leading-relaxed tracking-wide">"{m.message}"</p>
            <p className="text-xs font-black text-brand-black uppercase tracking-widest mt-auto opacity-70">— {m.author || m.name}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Leadership() {
  const members = [
    { name: "Osihanna Meita", role: "President", message: "Sekalipun aku berjalan dalam lembah kekelaman, aku tidak takut bahaya, sebab Engkau besertaku; gada-Mu dan tongkat-Mu, itulah yang menghibur aku.", avatar: img25, backImages: [img25, img26, img27], author: "Mazmur 23:4" },
    { name: "Rachel Joicefine", role: "Secretary", message: "Aku bersyukur kepada-Mu oleh karena kejadianku dahsyat dan ajaib; ajaib apa yang Kaubuat, dan jiwaku benar-benar menyadarinya.", avatar: img28, backImages: [img28, img29, img30], author: "Mazmur 139:14" },
    { name: "Yesi Elisabet Lubis", role: "Treasurer", message: "Ia membuat segala sesuatu indah pada waktunya, bahkan Ia memberikan kekekalan dalam hati mereka. Tetapi manusia tidak dapat menyelami pekerjaan yang dilakukan Allah dari awal sampai akhir.", avatar: img31, backImages: [img31, img32, img33], author: "Pengkhotbah 3:11" },
    { name: "Gita Kezia Sibarani", role: "Events Coordinator", message: "Tetapi carilah dahulu Kerajaan Allah dan kebenarannya, maka semuanya itu akan ditambahkan kepadamu.", avatar: img34, backImages: [img34, img35, img36], author: "Matius 6:33" },
    { name: "Nathanael Dova", role: "Events Staff", message: "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.", avatar: img43, backImages: [img43, img44, img45], author: "Yeremia 29:11" },
    { name: "Lundu Anugrah", role: "Events Staff", message: "Sekalipun aku berjalan dalam lembah kekelaman, aku tidak takut bahaya, sebab Engkau besertaku; gada-Mu dan tongkat-Mu, itulah yang menghibur aku.", avatar: img40, backImages: [img40, img41, img42], author: "Mazmur 23:4" },
    { name: "Ruth Keysha Putri", role: "Events Staff", message: "Sebab TUHAN, Dialah yang berjalan di depanmu, Dialah yang menyertai engkau, Dia tidak akan membiarkan engkau dan tidak akan meninggalkan engkau; janganlah takut dan janganlah patah hati.", avatar: img37, backImages: [img37, img38, img39], author: "Ulangan 31:8" },
    { name: "Gerald Bradley", role: "Discipleship Coordinator", message: "Janganlah menahan kebaikan dari pada orang-orang yang berhak menerimanya, padahal engkau mampu melakukannya.", avatar: img13, backImages: [img13, img14, img15], author: "Amsal 3:27" },
    { name: "Erta Kiristina", role: "Discipleship Staff", message: "janganlah takut, sebab Aku menyertai engkau, janganlah bimbang, sebab Aku ini Allahmu; Aku akan meneguhkan, bahkan akan menolong engkau; Aku akan memegang engkau dengan tangan kanan-Ku yang membawa kemenangan.", avatar: img16, backImages: [img16, img17, img18], author: "Yesaya 41:10" },
    { name: "Tikauli Cristina", role: "Discipleship Staff", message: "Diberkatilah orang yang mengandalkan TUHAN, yang menaruh harapannya pada TUHAN!", avatar: img19, backImages: [img19, img20, img21], author: "Yeremia 17:7" },
    { name: "Ferlian Luri Sasta", role: "Discipleship Staff", message: "Apa yang Kuperbuat, engkau tidak tahu sekarang, tetapi engkau akan mengertinya kelak.", avatar: img22, backImages: [img22, img23, img24], author: "Yohanes 13:7" },
    { name: "Chris Matthew", role: "Communications & Media Coordinator", message: "Menceritakan kasih Tuhan yang luar biasa melalui kreativitas dan media digital.", avatar: img7, backImages: [img7, img8, img9] },
    { name: "Zipora Andiena", role: "Communications & Media Staff", message: "Matahari tidak menyakiti engkau pada waktu siang, atau bulan pada waktu malam.", avatar: img10, backImages: [img10, img11, img12], author: "Mazmur 121:6" },
    { name: "Nova Kristin", role: "Communications & Media Staff", message: "Tetaplah berdoa. Mengucap syukurlah dalam segala hal, sebab itulah yang dikehendaki Allah di dalam Kristus Yesus bagi kamu.", avatar: img1, backImages: [img1, img2, img3], author: "1 Tesalonika 5:17–18" },
    { name: "Johan Binsar", role: "Communications & Media Staff", message: "Sebab bagi Allah tidak ada yang mustahil.", avatar: img4, backImages: [img4, img5, img6], author: "Lukas 1:37" }
  ];

  return (
    <motion.section
      id="family"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="pt-3 pb-10 md:pt-4 md:pb-14 px-6 bg-white overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet The Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">The familiar faces you’ll often meet in PMK Agape.</p>
        </div>

        {/* Horizontal scroll on mobile, wrap on desktop */}
        <div className="flex overflow-x-auto overflow-y-hidden pt-3 pb-12 -mt-3 md:pt-0 md:mt-0 md:grid md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 px-4 no-scrollbar -mx-4 md:mx-0 snap-x scroll-smooth">
          {members.map((m, i) => {
            const avatarUrl = m.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${m.name}-${i}&backgroundColor=FADADD`;
            return <LeadershipCard key={i} m={m} avatarUrl={avatarUrl} />;
          })}
        </div>
      </div>
    </motion.section>
  );
}

function Statistics() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const stats = [
    { value: "15", label: "Pengurus" },
    { value: "4", label: "Divisi" },
    { value: "1", label: "Tubuh Kristus" },
    { value: "∞", label: "Kasih" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 -mt-14 md:-mt-18 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm bg-white">
        {stats.map((stat, i) => {
          const isActive = activeIndex === i;
          return (
            <div
              key={i}
              onClick={() => setActiveIndex(isActive ? null : i)}
              className={`
                group
                flex flex-col items-center justify-center 
                py-8 md:py-10 text-center 
                cursor-pointer transition-all duration-300 ease-out
                border-gray-100
                ${i !== stats.length - 1 ? 'border-b sm:border-b-0 sm:border-r' : ''}
                ${isActive
                  ? 'bg-[#D88A9A] text-white z-10 scale-[1.02] shadow-md'
                  : 'bg-white text-brand-black hover:bg-[#D88A9A] hover:text-white hover:scale-[1.02] hover:shadow-md hover:z-10'}
              `}
            >
              <span className="text-5xl md:text-6xl font-bold mb-2 tracking-tighter transition-transform duration-300">
                {stat.value}
              </span>
              <span className={`
                text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-colors duration-300
                ${isActive ? 'text-white/80' : 'text-gray-400 group-hover:text-white/80'}
              `}>
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Testimonials() {
  const stories = [
    { 
      text: `banyak rumah sudah disinggahi, beribu jumpa sudah dialami, banyak yang datang, pergi, dan melampaui, ada juga yang tidak kunjung sama sekali. tapi yang satu ini beda sekali, ini lebih dari sekedar singgah, ini rumah yang berbeda`, 
      author: "Matthew FISIP 21",
      widthClass: "w-[85vw] sm:w-[380px] md:w-[420px]"
    },
    { 
      text: `PMK Agape adalah tempat Tuhan membentukku. Rumah untuk pulang… di mana aku diingatkan bahwa perjalanan iman tidak dijalani seorang diri. Bersama orang-orang yang Tuhan hadirkan, aku belajar mengasihi Tuhan, mengasihi sesama, dan mengasihi diri sendiri 🩷`, 
      author: "Reynaya FEB 22",
      widthClass: "w-[85vw] sm:w-[400px] md:w-[450px]"
    },
    { 
      text: `Kabanyakan orang bilang "aku takut ditolak" \ntapi PMK Agape? dengan kasih yang Tuhan berikan menjadi tempat setiap pribadi di terima dengan baik apapun kekurangan nya. Tempat bertumbuh mengenal diri lebih baik dalam kasih Tuhan agar dapat menyebarkan kasih lebih luas`, 
      author: "Davina FEB 22",
      widthClass: "w-[85vw] sm:w-[440px] md:w-[500px]"
    },
    { 
      text: `Terkadang Tuhan tidak mengubah jalan yang sedang kita lewati, tetapi menghadirkan tempat untuk beristirahat, bertumbuh, dan dikuatkan. Kebersamaan yang Tuhan berikan di tempat itu begitu hangat, hingga aku belajar bahwa iman bukan hanya tentang berjalan menuju Tuhan, tetapi juga tentang saling menggenggam tangan agar tidak ada yang tertinggal dalam perjalanan.`, 
      author: "Dinda FEB 25",
      widthClass: "w-[85vw] sm:w-[520px] md:w-[640px]"
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="pt-8 pb-10 md:pt-12 md:pb-14 px-6 bg-[#FAFAFA] rounded-[3rem] mx-2 md:mx-6 my-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">What They Say?</h2>
        <div className="flex overflow-x-auto items-stretch gap-4 md:gap-6 pb-6 -mx-4 px-4 md:-mx-6 md:px-6 snap-x snap-mandatory scroll-smooth no-scrollbar">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                delay: i * 0.2,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className={`bg-white p-4 md:p-6 rounded-3xl shadow-sm flex flex-col border border-gray-50 shrink-0 snap-start cursor-pointer min-h-[350px] sm:min-h-[310px] md:min-h-[260px] ${story.widthClass}`}
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-brand-pink text-brand-pink" />)}
              </div>
              <p className="text-lg font-medium text-brand-black italic mb-4 relative z-10">"{story.text}"</p>
              <p className="font-bold text-brand-black">— {story.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function Interaction() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const items = container.querySelectorAll('.cta-card');
    let minDistance = Infinity;
    let closestIndex = 0;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + container.clientWidth / 2;

    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIdx) {
      setActiveIdx(closestIndex);
    }
  };

  const cards = [
    {
      title: "Serve With Us",
      desc: "You don’t have to be anyone special to start. There is always a place for you to serve and grow together with us.",
      icon: <Users className="w-8 h-8 md:w-10 md:h-10" />,
      btn: "Start Serving",
      activeStyle: "bg-white border-[#4A1F1F]/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]",
      inactiveStyle: "bg-white border-transparent shadow-sm opacity-60 hover:opacity-100",
      iconBg: "bg-[#4A1F1F]/5 text-[#4A1F1F]",
      btnStyle: "border-[1.5px] border-[#4A1F1F] text-[#4A1F1F] bg-transparent hover:bg-[#4A1F1F] hover:text-white hover:shadow-md hover:scale-[1.02] transition-all duration-300"
    },
    {
      title: "Request Prayer",
      desc: "You don’t have to carry everything alone. We are here to pray with you and stand with you.",
      icon: <Heart className="w-8 h-8 md:w-10 md:h-10 fill-[#4A1F1F]" />,
      btn: "Send Prayer Request",
      activeStyle: "bg-white border-[#4A1F1F]/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]",
      inactiveStyle: "bg-white border-transparent shadow-sm opacity-60 hover:opacity-100",
      iconBg: "bg-[#4A1F1F]/5 text-[#4A1F1F]",
      btnStyle: "border-[1.5px] border-[#4A1F1F] text-[#4A1F1F] bg-transparent hover:bg-[#4A1F1F] hover:text-white hover:shadow-md hover:scale-[1.02] transition-all duration-300"
    },
    {
      title: "First Friends",
      desc: "Tempat untuk mengenal teman baru, terhubung dengan kakak tingkat se-fakultas, dan bertanya segala hal tentang perkuliahan sebelum resmi masuk kampus.",
      icon: <Smile className="w-8 h-8 md:w-10 md:h-10" />,
      btn: "Get Connected",
      activeStyle: "bg-white border-[#4A1F1F]/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]",
      inactiveStyle: "bg-white border-transparent shadow-sm opacity-60 hover:opacity-100",
      iconBg: "bg-[#4A1F1F]/5 text-[#4A1F1F]",
      btnStyle: "border-[1.5px] border-[#4A1F1F] text-[#4A1F1F] bg-transparent hover:bg-[#4A1F1F] hover:text-white hover:shadow-md hover:scale-[1.02] transition-all duration-300"
    },
    {
      title: "Let’s Talk",
      desc: "If you need someone to listen, we are here for you. Feel free to reach out anytime.",
      icon: <MessageCircle className="w-8 h-8 md:w-10 md:h-10" />,
      btn: "Start a Conversation",
      activeStyle: "bg-white border-[#4A1F1F]/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]",
      inactiveStyle: "bg-white border-transparent shadow-sm opacity-60 hover:opacity-100",
      iconBg: "bg-[#4A1F1F]/5 text-[#4A1F1F]",
      btnStyle: "border-[1.5px] border-[#4A1F1F] text-[#4A1F1F] bg-transparent hover:bg-[#4A1F1F] hover:text-white hover:shadow-md hover:scale-[1.02] transition-all duration-300"
    },
    {
      title: "Media Partner",
      desc: "Kami terbuka untuk berkolaborasi dalam publikasi acara, promosi kegiatan, media partner, maupun kerja sama event demi memberikan dampak positif.",
      icon: <Handshake className="w-8 h-8 md:w-10 md:h-10" />,
      btn: "Collaborate With Us",
      activeStyle: "bg-white border-[#4A1F1F]/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]",
      inactiveStyle: "bg-white border-transparent shadow-sm opacity-60 hover:opacity-100",
      iconBg: "bg-[#4A1F1F]/5 text-[#4A1F1F]",
      btnStyle: "border-[1.5px] border-[#4A1F1F] text-[#4A1F1F] bg-transparent hover:bg-[#4A1F1F] hover:text-white hover:shadow-md hover:scale-[1.02] transition-all duration-300"
    }
  ];

  return (
    <motion.section
      id="connect"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="pt-8 pb-10 md:pt-12 md:pb-14 bg-white relative overflow-hidden scroll-mt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[900px] bg-gradient-to-r from-[#FFF0F2] to-transparent rounded-full opacity-50 blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-8 px-6 lg:px-12">

        {/* LEFT */}
        <div className="w-full lg:w-5/12 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight text-[#4A1F1F]">
            We’re ready to walk this journey with you.
          </h2>

          <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Whether you want to come, need someone to pray with you, want to share your story, or feel called to serve, you are always welcome here.
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-7/12 relative">
          {/* Fade Indicator (Mobile Only) */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/20 to-transparent z-20 pointer-events-none md:hidden" />

          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="
            flex gap-4 md:gap-8 overflow-x-auto pb-10 px-4 pl-4
            snap-x snap-mandatory no-scrollbar
          "
          >
            {cards.map((c, i) => {
              const isActive = activeIdx === i;

              return (
                <div
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const items = containerRef.current?.querySelectorAll('.cta-card');
                    items?.[i]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
                  }}
                  className={`
                  cta-card shrink-0
                  w-[78%] sm:w-[80%] md:w-[380px] lg:w-[400px]
                  snap-start rounded-[2rem]
                  p-6 md:p-8
                  flex flex-col items-center justify-center
                  min-h-[280px] md:min-h-[320px]
                  cursor-pointer border-2
                  transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${isActive
                      ? c.activeStyle + ' scale-100 shadow-xl z-10 opacity-100'
                      : c.inactiveStyle + ' scale-95 opacity-70 z-0'}
                `}
                >

                  {/* ICON */}
                  <div className={`
                  w-14 h-14 md:w-16 md:h-16 rounded-full
                  flex items-center justify-center
                  mb-4 md:mb-6
                  transition-transform duration-500 shadow-sm
                  ${isActive ? 'scale-110' : ''}
                  ${c.iconBg}
                `}>
                    {c.icon}
                  </div>

                  {/* TITLE */}
                  <h3 className="font-bold text-2xl md:text-3xl mb-3 text-center text-[#4A1F1F]">
                    {c.title}
                  </h3>

                  {/* DESC */}
                  <p className="text-center mb-5 font-medium text-gray-500 leading-relaxed">
                    {c.desc}
                  </p>

                  {/* BUTTON */}
                  <button
                    type="button"
                    className={`
                    w-full py-3 md:py-3.5 rounded-full font-bold text-sm tracking-wide
                    transition-all duration-300
                    ${isActive
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-4 opacity-0 pointer-events-none'}
                    ${c.btnStyle}
                  `}
                  >
                    {c.btn}
                  </button>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </motion.section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#111111] text-white py-16 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-12 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={logo}
              alt="PMK Agape Logo"
              className="w-10 h-10 object-contain rounded-lg"
            />
            <span className="text-xl font-bold text-white tracking-tight">PMK Agape</span>
          </div>
          <p className="text-white/60 text-sm font-medium leading-relaxed max-w-sm">
            A Christ-centered student community at UPNVJ, growing together in the love of Christ.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Get Involved</h3>
          <ul className="space-y-2 text-sm text-white/60">
            <li><a href="#" className="hover:text-white transition-colors">Start Serving</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Request Prayer</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Start a Conversation</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Find Us</h3>
          <ul className="space-y-4 text-sm text-white/60">
            <li className="flex items-center gap-3"><MapPin className="w-4 h-4" /> UPN "Veteran" Jakarta Campus</li>
            <li className="flex items-center gap-3"><Mail className="w-4 h-4" /> pmkagape@upnvj.ac.id</li>
            <li className="flex items-center gap-3"><Instagram className="w-4 h-4" /> Instagram</li>
            <li className="flex items-center gap-3"><Music className="w-4 h-4" /> TikTok</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-white/40 font-semibold tracking-wide">
        <p>&copy; {new Date().getFullYear()} PMK Agape UPNVJ. All rights reserved.</p>
        <p className="mt-2 md:mt-0 uppercase tracking-widest">To love and to serve.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen font-sans bg-white selection:bg-brand-pink selection:text-brand-black">
      <Header />
      <CinematicHero />

      <About />
      <Activities />
      <Leadership />
      <Statistics />
      <Testimonials />
      <Interaction />
      <Footer />
    </div>
  );
}
