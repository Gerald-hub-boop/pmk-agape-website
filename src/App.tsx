import React, { useState, useEffect, useRef } from 'react';
// Team Images 1-45 (optimized WebP)
import img1 from './images-optimized/1.webp';
import img2 from './images-optimized/2.webp';
import img3 from './images-optimized/3.webp';
import img4 from './images-optimized/4.webp';
import img5 from './images-optimized/5.webp';
import img6 from './images-optimized/6.webp';
import img7 from './images-optimized/7.webp';
import img8 from './images-optimized/8.webp';
import img9 from './images-optimized/9.webp';
import img10 from './images-optimized/10.webp';
import img11 from './images-optimized/11.webp';
import img12 from './images-optimized/12.webp';
import img13 from './images-optimized/13.webp';
import img14 from './images-optimized/14.webp';
import img15 from './images-optimized/15.webp';
import img16 from './images-optimized/16.webp';
import img17 from './images-optimized/17.webp';
import img18 from './images-optimized/18.webp';
import img19 from './images-optimized/19.webp';
import img20 from './images-optimized/20.webp';
import img21 from './images-optimized/21.webp';
import img22 from './images-optimized/22.webp';
import img23 from './images-optimized/23.webp';
import img24 from './images-optimized/24.webp';
import img25 from './images-optimized/25.webp';
import img26 from './images-optimized/26.webp';
import img27 from './images-optimized/27.webp';
import img28 from './images-optimized/28.webp';
import img29 from './images-optimized/29.webp';
import img30 from './images-optimized/30.webp';
import img31 from './images-optimized/31.webp';
import img32 from './images-optimized/32.webp';
import img33 from './images-optimized/33.webp';
import img34 from './images-optimized/34.webp';
import img35 from './images-optimized/35.webp';
import img36 from './images-optimized/36.webp';
import img37 from './images-optimized/37.webp';
import img38 from './images-optimized/38.webp';
import img39 from './images-optimized/39.webp';
import img40 from './images-optimized/40.webp';
import img41 from './images-optimized/41.webp';
import img42 from './images-optimized/42.webp';
import img43 from './images-optimized/43.webp';
import img44 from './images-optimized/44.webp';
import img45 from './images-optimized/45.webp';
import logo from './images-optimized/logo.webp';
import imgPersekutuanDoaJemaat from './images-optimized/WhatWeDo/Persekutuan Doa Jemaat.webp';
import imgPersekutuanJumat from './images-optimized/WhatWeDo/Persekutuan Jumat.webp';
import imgNatalPaskah from './images-optimized/WhatWeDo/NATAL & PASKAH.webp';
import imgPenyambutanMaba from './images-optimized/WhatWeDo/Penyambutan Mahasiswa Baru.webp';
import imgRetreat from './images-optimized/WhatWeDo/Retreat.webp';
import imgKelompokKecil from './images-optimized/WhatWeDo/Kelompok Kecil.webp';
import imgPelayananPribadi from './images-optimized/WhatWeDo/Pelayanan Pribadi.webp';
import imgPMKS33hat from './images-optimized/WhatWeDo/PMK S33hat.webp';
import { CinematicHero } from './components/CinematicHero';
import { LetsTalkModal } from './components/LetsTalkModal';
import { BrandNewDayApp } from './brand-new-day/BrandNewDayApp';
import { ErrorBoundary } from './brand-new-day/components/ErrorBoundary';

import { motion, AnimatePresence } from 'motion/react';
import {
  Heart, Users, BookOpen, MessageCircle, MapPin,
  Calendar, ChevronRight, Star, Mail, ArrowRight,
  HandHeart, Send, Quote, Music, Sparkles, UserPlus, Mountain, Megaphone,
  Flame, Menu, X, Activity, Smile, Handshake,
  CreditCard, Copy, Check, ExternalLink, Phone, MessageSquare
} from 'lucide-react';
import { InstagramLogo as Instagram } from '@phosphor-icons/react';

export const triggerScrollToConnectCard = (index: number) => {
  const event = new CustomEvent('scroll-to-connect-card', { detail: index });
  window.dispatchEvent(event);
};

export const triggerOpenFeaturedCampaign = (campaignId: string) => {
  const event = new CustomEvent('open-featured-campaign', { detail: campaignId });
  window.dispatchEvent(event);
};

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
    { name: "Meet The Team", href: "#family" },
    { name: "Special Event: Brand New Day", href: "#brand-new-day" },
    { name: "Retreat 2026", href: "#retreat-2026" }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90  shadow-sm border-b-transparent' : 'bg-white/80  border-b border-[#FFF0F2]'}`}>

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 cursor-pointer group">
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
          <a
            href="#connect"
            onClick={() => triggerScrollToConnectCard(0)}
            className="px-6 py-2.5 bg-[#FFF0F2] text-brand-black hover:bg-brand-pink hover:text-white rounded-full text-sm font-bold transition-colors"
          >
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
              onClick={() => {
                setMobileMenuOpen(false);
                triggerScrollToConnectCard(0);
              }}
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

export interface FeaturedCampaignConfig {
  id: string;
  enabled: boolean;
  badge: string;
  title: string;
  description: string;
  tags?: string[];
  modalDetails?: {
    subtitle: string;
    paragraphs: string[];
    eventDetails?: {
      date?: string;
      location?: string;
      locationAddress?: string;
      locationMapsUrl?: string;
      fee?: string;
      feeNote?: string;
      feeWarning?: string;
    };
    paymentInfo?: {
      bank: string;
      accountNumber: string;
      accountHolder: string;
      notes?: string[];
    };
    contactPersons?: {
      name: string;
      channel: string;
      value: string;
      url?: string;
    }[];
  };
  buttonText: string;
  buttonLink: string;
  icon?: React.ReactNode;
}

export const featuredCampaignConfigs: FeaturedCampaignConfig[] = [
  {
    id: "retreat-2026",
    enabled: true,
    badge: "PENDAFTARAN RETREAT 2026",
    title: "Retreat PMK Agape 2026",
    description: "Saatnya berhenti sejenak dari rutinitas, saling mengenal lebih dekat, dan bertumbuh dalam iman kepada Tuhan bersama keluarga PMK Agape.",
    tags: ["24–25 Okt 2026", "Grand Pesona Hotel & Resort", "HTM Rp170k (Bisa Cicil 3x)"],
    modalDetails: {
      subtitle: "#Rooted to Grow, Growing to be Fruitful 🤍",
      paragraphs: [
        "Shalom Agapers! Retreat PMK Agape 2026 hadir untuk memberikan kesempatan buat kita semua berhenti sejenak dari rutinitas, saling mengenal lebih dekat, dan tentunya semakin bertumbuh dalam iman kepada Tuhan.",
        "Mari persiapkan hati dan dirimu untuk mengalami perjumpaan yang menguatkan bersama teman-teman seiman di tempat yang tenang dan asri. Jangan lewatkan momen ini ya!"
      ],
      eventDetails: {
        date: "24–25 Oktober 2026",
        location: "Grand Pesona Hotel & Resort",
        locationAddress: "Jl. Cilotoh No.126, Lemah Duhur, Kec. Caringin, Kabupaten Bogor, Jawa Barat 16730",
        locationMapsUrl: "https://www.google.com/maps/search/?api=1&query=Grand+Pesona+Hotel+%26+Resort+Caringin+Bogor",
        fee: "Rp170.000 / orang",
        feeNote: "Pembayaran bisa dicicil hingga 3 kali, tenggat pembayaran terakhir 17 Oktober 2026.",
        feeWarning: "Apabila sudah melakukan pembayaran namun tidak dapat hadir, uang yang telah dibayarkan tidak dapat dikembalikan."
      },
      paymentInfo: {
        bank: "BANK BCA",
        accountNumber: "1663310201",
        accountHolder: "Osihanna Meita Kasih",
        notes: [
          "Bisa dicicil hingga 3 kali",
          "Tenggat pembayaran terakhir: 17 Oktober 2026"
        ]
      },
      contactPersons: [
        {
          name: "Dinda",
          channel: "WhatsApp",
          value: "081396101135",
          url: "https://wa.me/6281396101135?text=Shalom%20kak%20Dinda,%20saya%20mau%20tanya%20seputar%20Retreat%20PMK%20Agape%202026"
        },
        {
          name: "Nova",
          channel: "Line",
          value: "novaakristin",
          url: "https://line.me/R/ti/p/~novaakristin"
        }
      ]
    },
    buttonText: "Daftar Retreat Sekarang",
    buttonLink: "https://forms.gle/fnBSYhMEEDuQptDk8",
    icon: <Mountain className="w-10 h-10 text-[#4A1F1F]" />
  },
  {
    id: "pelayan",
    enabled: true,
    badge: "OPEN RECRUITMENT",
    title: "Open Recruitment Pelayan",
    description: "You don’t have to be anyone special to start. There is always a place for you to serve and grow together with us.",
    modalDetails: {
      subtitle: "Ruang untuk bertumbuh dan melayani di PMK Agape UPNVJ.",
      paragraphs: [
        "Setiap kita diberi karunia dan kesempatan untuk berdampak bagi sesama.",
        "Bergabunglah bersama pelayanan PMK Agape untuk melayani dalam berbagai divisi dan kegiatan persekutuan.",
        "Mari bergerak dan melayani bersama di dalam Kristus. Klik tombol di bawah untuk mengisi formulir pendaftaran pelayan."
      ]
    },
    buttonText: "Daftar Pelayan",
    buttonLink: "https://bit.ly/PELAYANPMK2026",
    icon: <Users className="w-10 h-10 text-[#4A1F1F]" />
  }
];

function FeaturedCampaign() {
  const [activeModalConfig, setActiveModalConfig] = useState<FeaturedCampaignConfig | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const activeCampaigns = featuredCampaignConfigs.filter((c) => c.enabled);

  const handleCopyAccount = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  // Listen to external triggers (e.g. from Activities card)
  useEffect(() => {
    const handleOpenCampaign = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const target = featuredCampaignConfigs.find((c) => c.id === customEvent.detail && c.enabled);
      if (target) {
        setActiveModalConfig(target);
      }
    };
    window.addEventListener('open-featured-campaign', handleOpenCampaign);
    return () => window.removeEventListener('open-featured-campaign', handleOpenCampaign);
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (activeModalConfig) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModalConfig]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalConfig(null);
      }
    };
    if (activeModalConfig) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalConfig]);

  if (activeCampaigns.length === 0) {
    return null;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2 md:pt-10 md:pb-4 relative z-10 scroll-mt-20 flex flex-col gap-6 sm:gap-8">
        {activeCampaigns.map((campaign) => (
          <motion.section
            id={campaign.id}
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="scroll-mt-28"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-[#FFF0F2]/80 via-white to-[#FADADD]/30 border border-[#FADADD] rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-sm">
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                {/* Main Copy */}
                <div className="max-w-2xl">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4A1F1F] text-white text-xs font-black uppercase tracking-[0.18em] shadow-sm mb-4 sm:mb-5">
                    <span className="w-2 h-2 rounded-full bg-[#D88A9A] animate-pulse" />
                    {campaign.badge}
                  </div>

                  {/* Title */}
                  <h2 className="font-lora text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black tracking-tight mb-3 md:mb-4">
                    {campaign.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-700 text-base sm:text-lg md:text-xl font-medium leading-relaxed mb-4 md:mb-5">
                    {campaign.description}
                  </p>

                  {/* Tags Preview */}
                  {campaign.tags && campaign.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                      {campaign.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center px-3 py-1 rounded-full bg-white text-[#4A1F1F] text-xs font-bold border border-[#FADADD] shadow-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA Buttons Row */}
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={campaign.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#4A1F1F] text-white font-bold text-base sm:text-lg shadow-md hover:bg-[#381717] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group cursor-pointer"
                    >
                      <span>{campaign.buttonText}</span>
                      <ArrowRight className="w-5 h-5 text-brand-pink group-hover:translate-x-1 transition-transform duration-300" />
                    </a>

                    {/* Mobile & Tablet Learn More button */}
                    <button
                      type="button"
                      onClick={() => setActiveModalConfig(campaign)}
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-[#D88A9A]/60 bg-white/80 text-[#4A1F1F] font-bold text-sm sm:text-base hover:bg-[#FFF0F2] hover:border-[#D88A9A] transition-all duration-300 cursor-pointer shadow-sm"
                    >
                      <span>Info Lengkap</span>
                      <ChevronRight className="w-4 h-4 text-[#D88A9A]" />
                    </button>
                  </div>
                </div>

                {/* Interactive Card Accent (Desktop) */}
                <div className="hidden lg:flex items-center justify-center shrink-0">
                  <motion.div
                    onClick={() => setActiveModalConfig(campaign)}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative w-64 h-64 rounded-3xl bg-white/90 border border-[#FADADD] shadow-lg hover:shadow-2xl hover:border-[#D88A9A]/80 flex flex-col items-center justify-between p-6 text-center group cursor-pointer overflow-hidden transition-colors duration-300"
                  >
                    {/* Top indicator badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F2] text-[#4A1F1F] text-[10px] font-bold tracking-wider uppercase border border-[#FADADD]/60 group-hover:bg-[#4A1F1F] group-hover:text-white transition-colors duration-300">
                      <span>Lihat Detail</span>
                      <ArrowRight className="w-3 h-3 text-[#D88A9A] group-hover:text-brand-pink" />
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-[#FFF0F2] flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300 my-auto shadow-inner">
                      {campaign.icon || <UserPlus className="w-8 h-8 text-[#4A1F1F]" />}
                    </div>

                    {/* Title & Bottom Indicator */}
                    <div className="w-full">
                      <span className="text-base font-bold text-brand-black block mb-0.5 line-clamp-1">
                        {campaign.title}
                      </span>
                      <span className="text-xs font-bold text-[#D88A9A] group-hover:text-[#4A1F1F] flex items-center justify-center gap-1 transition-colors duration-300">
                        Buka Info <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* Interactive Program Modal */}
      <AnimatePresence>
        {activeModalConfig && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setActiveModalConfig(null)}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 max-w-xl w-full shadow-2xl border border-gray-100 relative flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalConfig(null)}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3.5 pr-8">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF0F2] flex items-center justify-center shrink-0">
                  {activeModalConfig.icon || <Smile className="w-6 h-6 text-[#4A1F1F]" />}
                </div>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#4A1F1F] text-white text-[10px] font-black tracking-widest uppercase mb-1">
                    {activeModalConfig.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-brand-black tracking-tight leading-tight">
                    {activeModalConfig.title}
                  </h3>
                </div>
              </div>

              {/* Subtitle */}
              {activeModalConfig.modalDetails?.subtitle && (
                <p className="text-base sm:text-lg font-semibold text-[#D88A9A] -mt-1">
                  "{activeModalConfig.modalDetails.subtitle}"
                </p>
              )}

              {/* Divider */}
              <div className="h-px bg-gray-100 w-full" />

              {/* Explanation Text */}
              <div className="space-y-3 text-gray-700 text-sm sm:text-base font-medium leading-relaxed">
                {activeModalConfig.modalDetails?.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Event Details Grid if present */}
              {activeModalConfig.modalDetails?.eventDetails && (
                <div className="bg-[#FFF0F2]/70 border border-[#FADADD] rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 text-sm">
                  {/* Date */}
                  {activeModalConfig.modalDetails.eventDetails.date && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 border border-[#FADADD] text-[#4A1F1F] shadow-xs">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#D88A9A] block">Tanggal</span>
                        <span className="text-brand-black font-bold text-sm sm:text-base">
                          {activeModalConfig.modalDetails.eventDetails.date}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  {activeModalConfig.modalDetails.eventDetails.location && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 border border-[#FADADD] text-[#4A1F1F] shadow-xs">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#D88A9A] block">Lokasi</span>
                        <span className="text-brand-black font-bold text-sm sm:text-base block">
                          {activeModalConfig.modalDetails.eventDetails.location}
                        </span>
                        {activeModalConfig.modalDetails.eventDetails.locationAddress && (
                          <span className="text-gray-600 text-xs leading-relaxed block mt-0.5">
                            {activeModalConfig.modalDetails.eventDetails.locationAddress}
                          </span>
                        )}
                        {activeModalConfig.modalDetails.eventDetails.locationMapsUrl && (
                          <a
                            href={activeModalConfig.modalDetails.eventDetails.locationMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#4A1F1F] hover:text-[#D88A9A] mt-1 transition-colors"
                          >
                            <span>Buka di Google Maps</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Fee / HTM */}
                  {activeModalConfig.modalDetails.eventDetails.fee && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 border border-[#FADADD] text-[#4A1F1F] shadow-xs">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#D88A9A] block">Biaya / HTM</span>
                        <span className="text-brand-black font-extrabold text-base sm:text-lg block">
                          {activeModalConfig.modalDetails.eventDetails.fee}
                        </span>
                        {activeModalConfig.modalDetails.eventDetails.feeNote && (
                          <span className="text-gray-600 text-xs leading-relaxed block mt-0.5">
                            {activeModalConfig.modalDetails.eventDetails.feeNote}
                          </span>
                        )}
                        {activeModalConfig.modalDetails.eventDetails.feeWarning && (
                          <span className="text-[#8B2635] text-[11px] leading-snug block mt-1.5 font-medium bg-white/80 p-2 rounded-xl border border-[#FADADD]/60">
                            {activeModalConfig.modalDetails.eventDetails.feeWarning}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Payment Info Box if present */}
              {activeModalConfig.modalDetails?.paymentInfo && (
                <div className="bg-gradient-to-br from-[#4A1F1F] to-[#381717] text-white rounded-2xl p-4 sm:p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold tracking-widest uppercase text-[#FADADD]">
                      Metode Pembayaran
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
                      {activeModalConfig.modalDetails.paymentInfo.bank}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/10 rounded-xl p-3 sm:p-3.5 border border-white/10">
                    <div>
                      <span className="text-xs text-white/70 block">Nomor Rekening:</span>
                      <span className="text-lg sm:text-xl font-mono font-bold tracking-wider text-white">
                        {activeModalConfig.modalDetails.paymentInfo.accountNumber}
                      </span>
                      <span className="text-xs text-[#FADADD] block mt-0.5">
                        a.n. {activeModalConfig.modalDetails.paymentInfo.accountHolder}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyAccount(activeModalConfig.modalDetails!.paymentInfo!.accountNumber)}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#4A1F1F] hover:bg-[#FFF0F2] text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer shrink-0"
                    >
                      {copiedAccount ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin No. Rekening</span>
                        </>
                      )}
                    </button>
                  </div>

                  {activeModalConfig.modalDetails.paymentInfo.notes && activeModalConfig.modalDetails.paymentInfo.notes.length > 0 && (
                    <ul className="mt-3 space-y-1 text-xs text-white/80">
                      {activeModalConfig.modalDetails.paymentInfo.notes.map((note, nIdx) => (
                        <li key={nIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D88A9A] shrink-0" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Contact Persons if present */}
              {activeModalConfig.modalDetails?.contactPersons && activeModalConfig.modalDetails.contactPersons.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                    Contact Person
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeModalConfig.modalDetails.contactPersons.map((cp, cpIdx) => (
                      <a
                        key={cpIdx}
                        href={cp.url || '#'}
                        target={cp.url ? "_blank" : undefined}
                        rel={cp.url ? "noopener noreferrer" : undefined}
                        className="p-3 rounded-2xl bg-[#FAFAFA] hover:bg-[#FFF0F2] border border-gray-100 hover:border-[#FADADD] transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center border border-gray-100 text-[#4A1F1F] group-hover:bg-[#4A1F1F] group-hover:text-white transition-colors shrink-0">
                            {cp.channel === 'WhatsApp' ? <Phone className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-brand-black block">
                              {cp.name} ({cp.channel})
                            </span>
                            <span className="text-xs text-gray-500 font-mono">
                              {cp.value}
                            </span>
                          </div>
                        </div>
                        {cp.url && (
                          <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#4A1F1F] transition-colors shrink-0" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalConfig(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors order-2 sm:order-1 cursor-pointer"
                >
                  Tutup
                </button>
                <a
                  href={activeModalConfig.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#4A1F1F] text-white font-bold text-sm hover:bg-[#381717] shadow-md hover:shadow-lg transition-all text-center order-1 sm:order-2 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{activeModalConfig.buttonText}</span>
                  <ArrowRight className="w-4 h-4 text-brand-pink" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function About() {
  const missions = [
    {
      number: "01",
      title: "Penginjilan",
      icon: <Megaphone className="w-5 h-5" />,
      desc: "Mengenalkan Kristus melalui pelayanan pribadi, kelompok kecil, dan persekutuan agar mahasiswa dapat mengenal Injil secara nyata.",
    },
    {
      number: "02",
      title: "Pemuridan",
      icon: <BookOpen className="w-5 h-5" />,
      desc: "Bertumbuh bersama melalui firman, komunitas, dan kehidupan sehari-hari dalam iman yang semakin dalam.",
    },
    {
      number: "03",
      title: "Pelipatgandaan",
      icon: <Users className="w-5 h-5" />,
      desc: "Belajar membimbing orang lain agar bertumbuh bersama dan menjadi murid yang melipatgandakan murid.",
    },
    {
      number: "04",
      title: "Pengutusan",
      icon: <Send className="w-5 h-5" />,
      desc: "Menjadi terang dan membawa dampak nyata bagi keluarga, gereja, kampus, dan masyarakat luas.",
    },
  ];

  return (
    <section
      id="vision"
      className="py-16 md:py-24 px-6 bg-white relative scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Section Label ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-10 md:mb-14"
        >
          <div className="h-px w-8 bg-[#D88A9A]/50" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D88A9A]">Vision & Mission</span>
          <div className="h-px w-8 bg-[#D88A9A]/50" />
        </motion.div>

        {/* ── VISION ── Manifesto style */}
        <div className="mb-20 md:mb-28 text-center max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-400 mb-5"
          >
            Vision
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.04 }
              }
            }}
            className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-medium text-brand-black leading-snug md:leading-[1.3] tracking-normal"
          >
            {`"Memperlengkapi mahasiswa menjadi garam dan terang, yang dewasa dalam Kristus serta menjadi berkat bagi keluarga, gereja, bangsa, bahkan dunia."`.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 8, filter: "blur(3px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { ease: "easeOut", duration: 0.55 } }
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* ── MISSION ── Narrative intro */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-400 mb-4"
          >
            Our Mission
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-playfair text-2xl md:text-3xl font-bold text-brand-black mb-4 leading-snug"
          >
            Satu perjalanan,<br />empat langkah bersama.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-gray-500 text-base md:text-lg font-medium leading-relaxed"
          >
            Kami percaya bahwa pertumbuhan setiap mahasiswa bukan terjadi dalam satu langkah, tetapi melalui sebuah perjalanan. Perjalanan itulah yang kami hidupi bersama di PMK Agape.
          </motion.p>
        </div>

        {/* ── TIMELINE ── Desktop horizontal, Mobile vertical */}
        {/* Desktop */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connector line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="absolute top-[2.4rem] left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-[#FADADD]/70 origin-left"
            />

            <div className="grid grid-cols-4 gap-0">
              {missions.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: "easeOut" }}
                  className="flex flex-col items-center text-center px-4 group"
                >
                  {/* Step node */}
                  <div className="relative mb-6">
                    <div className="w-[4.8rem] h-[4.8rem] rounded-2xl bg-white border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-[#D88A9A]/40 flex items-center justify-center transition-all duration-300 relative z-10">
                      <div className="text-[#4A1F1F]/70 group-hover:text-[#4A1F1F] transition-colors duration-300">
                        {m.icon}
                      </div>
                    </div>
                    {/* Number badge */}
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#4A1F1F] text-white text-[9px] font-black flex items-center justify-center z-20 shadow-sm">
                      {i + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <h4 className="text-base font-bold text-brand-black mb-2 group-hover:text-[#7A2E2E] transition-colors duration-300">
                    {m.title}
                  </h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    {m.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden space-y-0">
          {missions.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className="flex gap-5 pb-0"
            >
              {/* Left: number + vertical line */}
              <div className="flex flex-col items-center shrink-0 w-10">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center relative z-10 shrink-0">
                  <span className="text-[11px] font-black text-[#4A1F1F]">{m.number}</span>
                </div>
                {i < missions.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: "easeOut" }}
                    className="w-px flex-1 bg-[#FADADD]/70 origin-top mt-2 min-h-[3rem]"
                  />
                )}
              </div>

              {/* Right: content */}
              <div className="pt-1 pb-8">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[#4A1F1F]/60">{m.icon}</span>
                  <h4 className="text-base font-bold text-brand-black">{m.title}</h4>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 md:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-gray-400 text-sm font-medium">
            Perjalanan ini dimulai dari satu langkah kecil.
          </p>
          <a
            href="#connect"
            onClick={() => triggerScrollToConnectCard(0)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4A1F1F] text-white text-sm font-bold hover:bg-[#381717] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] group"
          >
            <span>Join PMK Agape</span>
            <ArrowRight className="w-4 h-4 text-brand-pink group-hover:translate-x-0.5 transition-transform duration-300" />
          </a>
        </motion.div>

      </div>
    </section>
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
      icon: <Calendar className="w-6 h-6" />,
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
            <h2 className="font-playfair text-2xl md:text-4xl font-bold mb-3 tracking-tight text-brand-black">What We Do?</h2>
            <p className="font-playfair text-gray-700 font-medium text-lg md:text-xl leading-relaxed">Growing together in every gathering and every shared journey.</p>
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
                className="bg-white rounded-2xl md:rounded-3xl shadow-sm hover:shadow-sm transition-all duration-500 ease-in-out cursor-pointer group flex flex-col border border-gray-100/50 shrink-0 w-[80vw] md:w-[48vw] lg:w-[42vw] max-w-[650px] snap-start overflow-hidden h-fit"
              >
                {/* Immersive Image Header - Crisp & Full Color */}
                <div className="relative w-full h-[200px] md:h-[340px] overflow-hidden">
                  <img
                    src={act.image}
                    alt={act.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  {/* Subtle hover gradient for polish, no washed-out white overlays */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                </div>

                {/* Content Section */}
                <div className="p-4 md:p-6 flex flex-col relative bg-white">
                  <div className="flex gap-4 md:gap-6 items-start">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-[#FFF0F2] text-[#5A1E1E] rounded-xl flex items-center justify-center shrink-0 border border-[#FADADD]/20 shadow-sm">
                      {React.cloneElement(act.icon as React.ReactElement<{ className?: string }>, { className: 'w-5 h-5 md:w-7 md:h-7' })}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-2.5 leading-tight text-[#5A1E1E] group-hover:translate-x-1 transition-transform duration-300">{act.title}</h3>
                      <p className="text-gray-500 font-medium text-sm md:text-base leading-relaxed opacity-80">{act.desc}</p>
                      {act.title === "Retreat" && (
                        <div className="mt-4 pt-3 border-t border-[#FADADD]/50 flex flex-wrap items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F2] text-[#4A1F1F] text-xs font-bold border border-[#FADADD]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D88A9A] animate-pulse" />
                            Pendaftaran Dibuka: 24–25 Okt 2026
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerOpenFeaturedCampaign("retreat-2026");
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4A1F1F] hover:text-[#7A2E2E] bg-[#FFF0F2] hover:bg-[#FADADD] px-3.5 py-1.5 rounded-full border border-[#FADADD] transition-colors cursor-pointer"
                          >
                            <span>Daftar & Info Lengkap</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#D88A9A]" />
                          </button>
                        </div>
                      )}
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
        className="relative w-full h-full [transform-style:preserve-3d] rounded-3xl shadow-sm"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 [backface-visibility:hidden] flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100">
          <div className="h-[150px] w-full bg-[#FFF0F2] relative overflow-hidden flex-shrink-0">
            <img src={avatarUrl} alt={m.name} loading="lazy" className="w-full h-full object-cover object-[center_20%]" />
          </div>
          <div className="p-4 flex-1 flex flex-col items-center justify-center text-center bg-gray-50 relative">
            <h4 className="font-bold text-xl text-brand-black">{m.name}</h4>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-2">{m.role}</p>

            {/* Mobile Hint */}
            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 text-[9px] font-bold text-brand-pink/60 uppercase tracking-tighter md:hidden">
              <ArrowRight className="w-2.5 h-2.5" /> Tap to see story
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl overflow-hidden bg-white border border-[#FADADD]/40 shadow-inner"
        >
          {/* Layer 1: Image Loop */}
          <div className="absolute inset-0 z-0 bg-[#FFF0F2]">
            {backImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${idx === imgIndex ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>

          {/* Render Text and Overlay only if there's a message */}
          {m.message && (
            <>
              {/* Layer 2: Overlay */}
              <div className="absolute inset-0 z-10 bg-white/85 " />

              {/* Layer 3: Content */}
              <div className="relative z-20 flex flex-col items-center justify-center h-full p-6 text-center">
                <Quote className="w-6 h-6 text-brand-pink fill-brand-pink/50 mb-3 drop-shadow-sm opacity-90" />
                <p className="font-playfair text-[14px] md:text-[15px] font-medium text-brand-black mb-3 leading-relaxed tracking-wide">"{m.message}"</p>
                <p className="text-xs font-black text-brand-black uppercase tracking-widest mt-auto opacity-70">- {m.author || m.name}</p>
              </div>
            </>
          )}
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
    { name: "Chris Matthew", role: "Communications & Media Coordinator", message: "Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.", avatar: img7, backImages: [img7, img8, img9], author: "Yohanes 3:16" },
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
      className="pt-4 pb-6 md:pt-6 md:pb-10 px-6 bg-white overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Meet The Team</h2>
          <p className="font-playfair text-gray-700 max-w-2xl mx-auto text-lg md:text-xl font-medium">The familiar faces you’ll often meet in PMK Agape.</p>
        </div>

        {/* Horizontal scroll on mobile, wrap on desktop */}
        <div className="flex overflow-x-auto overflow-y-hidden pt-3 pb-8 -mt-3 md:pt-0 md:mt-0 md:grid md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 px-4 no-scrollbar -mx-4 md:mx-0 snap-x scroll-smooth">
          {members.map((m, i) => {
            const avatarUrl = m.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${m.name}-${i}&backgroundColor=FADADD`;
            return <LeadershipCard key={i} m={m} avatarUrl={avatarUrl} />;
          })}
        </div>
      </div>
    </motion.section>
  );
}

function Testimonials() {
  const [selectedStory, setSelectedStory] = useState<{ text: string; author: string } | null>(null);

  const stories = [
    {
      text: `banyak rumah sudah disinggahi, beribu jumpa sudah dialami, banyak yang datang, pergi, dan melampaui, ada juga yang tidak kunjung sama sekali. tapi yang satu ini beda sekali, ini lebih dari sekedar singgah, ini rumah yang berbeda`,
      author: "Matthew FISIP 21"
    },
    {
      text: `PMK Agape adalah tempat Tuhan membentukku. Rumah untuk pulang… di mana aku diingatkan bahwa perjalanan iman tidak dijalani seorang diri. Bersama orang-orang yang Tuhan hadirkan, aku belajar mengasihi Tuhan, mengasihi sesama, dan mengasihi diri sendiri 🩷`,
      author: "Reynaya FEB 22"
    },
    {
      text: `Kabanyakan orang bilang "aku takut ditolak" \ntapi PMK Agape? dengan kasih yang Tuhan berikan menjadi tempat setiap pribadi di terima dengan baik apapun kekurangan nya. Tempat bertumbuh mengenal diri lebih baik dalam kasih Tuhan agar dapat menyebarkan kasih lebih luas`,
      author: "Davina FEB 22"
    },
    {
      text: `Terkadang Tuhan tidak mengubah jalan yang sedang kita lewati, tetapi menghadirkan tempat untuk beristirahat, bertumbuh, dan dikuatkan. Kebersamaan yang Tuhan berikan di tempat itu begitu hangat, hingga aku belajar bahwa iman bukan hanya tentang berjalan menuju Tuhan, tetapi juga tentang saling menggenggam tangan agar tidak ada yang tertinggal dalam perjalanan.`,
      author: "Dinda FEB 25"
    },
    {
      text: `super happy karena bisa kenal orang baru di PMK Agape yang very welcome and warm. hopefully after this, more and more "reasons" will appear to make me be here and grow in God together w them`,
      author: "Natta FH 25"
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="pt-8 pb-10 md:pt-12 md:pb-14 px-4 md:px-6 bg-[#FAFAFA] rounded-[3rem] mx-2 md:mx-6 my-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-center">What They Say?</h2>
        <div className="flex overflow-x-auto items-stretch gap-4 md:gap-6 pb-6 -mx-4 px-4 md:-mx-6 md:px-6 snap-x snap-mandatory scroll-smooth no-scrollbar">
          {stories.map((story, i) => {
            const isLong = story.text.length > 170;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  delay: i * 0.15,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                onClick={() => setSelectedStory(story)}
                className="bg-white p-5 md:p-6 rounded-3xl shadow-sm flex flex-col justify-between border border-gray-100 shrink-0 snap-start cursor-pointer w-[88vw] sm:w-[350px] md:w-[360px] lg:w-[380px] h-[270px] sm:h-[280px] overflow-hidden"
              >
                <div>
                  <Quote className="w-5 h-5 text-[#D88A9A]/60 mb-2 rotate-180" />
                  <p className="text-sm sm:text-base font-medium text-brand-black relative z-10 leading-relaxed line-clamp-4">
                    "{story.text}"
                  </p>
                  {isLong && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStory(story);
                      }}
                      className="text-xs font-bold text-[#D88A9A] hover:underline mt-1 block"
                    >
                      Read more...
                    </button>
                  )}
                </div>
                <p className="font-bold text-brand-black text-sm sm:text-base pt-2 shrink-0 border-t border-gray-50 mt-auto">
                  - {story.author}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal for full story */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStory(null)}
            className="fixed inset-0 z-50 bg-black/50  flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 relative flex flex-col gap-4 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <Quote className="w-8 h-8 text-[#D88A9A]/60 rotate-180" />

              <p className="text-base sm:text-lg font-medium text-brand-black leading-relaxed">
                "{selectedStory.text}"
              </p>

              <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                <p className="font-bold text-brand-black text-base">- {selectedStory.author}</p>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-4 py-2 bg-[#4A1F1F] text-white text-xs font-bold rounded-full hover:bg-[#381717] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function Interaction() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLetsTalkModalOpen, setIsLetsTalkModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScrollToCard = (e: Event) => {
      const customEvent = e as CustomEvent;
      const index = customEvent.detail;
      if (typeof index !== 'number') return;

      const items = containerRef.current?.querySelectorAll('.cta-card');
      if (items && items[index]) {
        items[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        setActiveIdx(index);
      }

      document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' });
    };

    window.addEventListener('scroll-to-connect-card', handleScrollToCard);
    return () => {
      window.removeEventListener('scroll-to-connect-card', handleScrollToCard);
    };
  }, []);

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
      title: "Contact Our Team",
      desc: "For collaborations, registrations, data collection, media partnerships, official requests, or other administrative matters, feel free to contact our team.",
      icon: <Handshake className="w-8 h-8 md:w-10 md:h-10" />,
      btn: "Contact Our Team",
      link: "https://wa.me/6285175203004",
      activeStyle: "bg-white border-[#4A1F1F]/20 shadow-sm",
      inactiveStyle: "bg-white border-transparent shadow-sm opacity-60 hover:opacity-100",
      iconBg: "bg-[#4A1F1F]/5 text-[#4A1F1F]",
      btnStyle: "border-[1.5px] border-[#4A1F1F] text-[#4A1F1F] bg-transparent hover:bg-[#4A1F1F] hover:text-white hover:shadow-md hover:scale-[1.02] transition-all duration-300"
    },
    {
      title: "Serve With Us",
      desc: "You don’t have to be anyone special to start. There is always a place for you to serve and grow together with us.",
      icon: <Users className="w-8 h-8 md:w-10 md:h-10" />,
      btn: "Start Serving",
      link: "https://bit.ly/PELAYANPMK2026",
      activeStyle: "bg-white border-[#4A1F1F]/20 shadow-sm",
      inactiveStyle: "bg-white border-transparent shadow-sm opacity-60 hover:opacity-100",
      iconBg: "bg-[#4A1F1F]/5 text-[#4A1F1F]",
      btnStyle: "border-[1.5px] border-[#4A1F1F] text-[#4A1F1F] bg-transparent hover:bg-[#4A1F1F] hover:text-white hover:shadow-md hover:scale-[1.02] transition-all duration-300"
    },
    {
      title: "Request Prayer",
      desc: "You don’t have to carry everything alone. We are here to pray with you and stand with you.",
      icon: <Heart className="w-8 h-8 md:w-10 md:h-10 fill-[#4A1F1F]" />,
      btn: "Send Prayer Request",
      link: "https://forms.gle/ocmnPSBCvBacje98A",
      activeStyle: "bg-white border-[#4A1F1F]/20 shadow-sm",
      inactiveStyle: "bg-white border-transparent shadow-sm opacity-60 hover:opacity-100",
      iconBg: "bg-[#4A1F1F]/5 text-[#4A1F1F]",
      btnStyle: "border-[1.5px] border-[#4A1F1F] text-[#4A1F1F] bg-transparent hover:bg-[#4A1F1F] hover:text-white hover:shadow-md hover:scale-[1.02] transition-all duration-300"
    },
    {
      title: "Let’s Talk",
      desc: "If you need someone to listen, we are here for you. Feel free to reach out anytime.",
      icon: <MessageCircle className="w-8 h-8 md:w-10 md:h-10" />,
      btn: "Start a Conversation",
      activeStyle: "bg-white border-[#4A1F1F]/20 shadow-sm",
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
      <div className="max-w-[1450px] mx-auto relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-8 px-6 lg:px-12">

        {/* LEFT */}
        <div className="w-full lg:w-4/12 text-center lg:text-left lg:pt-8 shrink-0">
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-5xl font-bold mb-4 leading-tight text-[#4A1F1F]">
            We’re ready to walk this journey with you.
          </h2>

          <p className="font-playfair text-lg md:text-2xl text-gray-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Whether you want to come, need someone to pray with you, want to share your story, or feel called to serve, you are always welcome here.
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-8/12 relative min-w-0">
          {/* Fade Indicator (Mobile & Tablet) */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/40 to-transparent z-20 pointer-events-none xl:hidden" />

          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="
              flex gap-4 md:gap-6 lg:gap-6 overflow-x-auto pb-12 pt-4 px-2
              snap-x snap-mandatory no-scrollbar w-full
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
                    items?.[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                    setActiveIdx(i);
                  }}
                  className={`
                    cta-card shrink-0
                    w-[84vw] sm:w-[70vw] md:w-[340px] lg:w-[350px] xl:w-[370px]
                    snap-center rounded-[2rem]
                    p-6 md:p-8
                    flex flex-col items-center justify-between
                    min-h-[320px] md:min-h-[340px]
                    cursor-pointer border-2 group
                    transition-all duration-500 ease-out

                    ${isActive
                      ? 'bg-white border-[#4A1F1F]/30 shadow-xl z-10 opacity-100 scale-100'
                      : 'bg-white/90 border-gray-100 shadow-sm hover:shadow-md opacity-85 hover:opacity-100 scale-[0.98]'}
                  `}
                >
                  {/* ICON */}
                  <div className={`
                    w-14 h-14 md:w-16 md:h-16 rounded-full
                    flex items-center justify-center
                    mb-4 md:mb-5
                    transition-transform duration-300 shadow-sm
                    ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                    ${c.iconBg}
                  `}>
                    {c.icon}
                  </div>

                  {/* TITLE */}
                  <h3 className="font-bold text-2xl md:text-3xl mb-2 text-center text-[#4A1F1F]">
                    {c.title}
                  </h3>

                  {/* DESC */}
                  <p className="text-center mb-6 font-medium text-gray-500 text-sm md:text-base leading-relaxed">
                    {c.desc}
                  </p>

                  {/* BUTTON - ALWAYS VISIBLE & ACCESSIBLE */}
                  {c.link ? (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`
                        w-full py-3 md:py-3.5 rounded-full font-bold text-sm tracking-wide
                        transition-all duration-300 mt-auto text-center flex items-center justify-center
                        ${c.btnStyle}
                      `}
                    >
                      {c.btn}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        if (c.title === "Let’s Talk") {
                          e.stopPropagation();
                          setIsLetsTalkModalOpen(true);
                        }
                      }}
                      className={`
                        w-full py-3 md:py-3.5 rounded-full font-bold text-sm tracking-wide
                        transition-all duration-300 mt-auto
                        ${c.btnStyle}
                      `}
                    >
                      {c.btn}
                    </button>
                  )}

                </div>
              );
            })}

            {/* Spacer to allow the 5th card (Let's Talk) to scroll cleanly to center */}
            <div className="shrink-0 w-12 md:w-32 lg:w-48" />
          </div>
        </div>

      </div>

      <LetsTalkModal
        isOpen={isLetsTalkModalOpen}
        onClose={() => setIsLetsTalkModalOpen(false)}
      />
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
            <li>
              <a
                href="#brand-new-day"
                className="text-[#FADADD] hover:text-white transition-colors block cursor-pointer font-bold"
              >
                Brand New Day (Fellowship)
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/6285175203004"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors block cursor-pointer"
              >
                Contact Our Team
              </a>
            </li>
            <li>
              <a
                href="https://bit.ly/PELAYANPMK2026"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors block cursor-pointer"
              >
                Serve With Us
              </a>
            </li>
            <li>
              <a
                href="https://forms.gle/ocmnPSBCvBacje98A"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors block cursor-pointer"
              >
                Request Prayer
              </a>
            </li>
            <li>
              <button
                onClick={() => triggerScrollToConnectCard(3)}
                className="hover:text-white transition-colors text-left bg-transparent border-none p-0 focus:outline-none block w-full cursor-pointer"
              >
                Let’s Talk
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Find Us</h3>
          <ul className="space-y-4 text-sm text-white/60">
            <li>
              <a href="https://maps.app.goo.gl/PWX8cAmrsb8TFv157" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                <MapPin className="w-4 h-4 shrink-0" /> UPN "Veteran" Jakarta Campus
              </a>
            </li>
            <li>
              <a href="mailto:pmkagape@upnvj.ac.id" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="w-4 h-4 shrink-0" /> pmkagape@upnvj.ac.id
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/pmk_agape?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                <Instagram className="w-4 h-4 shrink-0" /> Instagram
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@pmk_agape?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                <Music className="w-4 h-4 shrink-0" /> TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-white/40 font-semibold tracking-wide">
        <p>&copy; {new Date().getFullYear()} PMK Agape UPNVJ. All rights reserved.</p>
        <p className="font-playfair text-sm mt-2 md:mt-0 tracking-widest text-white/60">To love and to serve.</p>
      </div>
    </footer>
  );
}

function isBrandNewDayRoute(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.location.hash === '#brand-new-day' ||
    window.location.pathname === '/brand-new-day' ||
    window.location.pathname.startsWith('/brand-new-day')
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'brand-new-day'>(() => {
    return isBrandNewDayRoute() ? 'brand-new-day' : 'home';
  });

  useEffect(() => {
    const handleRouteChange = () => {
      if (isBrandNewDayRoute()) {
        setCurrentView('brand-new-day');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  if (currentView === 'brand-new-day') {
    return (
      <ErrorBoundary
        onHome={() => {
          if (window.location.pathname.startsWith('/brand-new-day')) {
            window.history.pushState(null, '', '/');
          }
          window.location.hash = '';
          setCurrentView('home');
        }}
      >
        <BrandNewDayApp
          onBackToHome={() => {
            if (window.location.pathname.startsWith('/brand-new-day')) {
              window.history.pushState(null, '', '/');
            }
            window.location.hash = '';
            setCurrentView('home');
          }}
        />
      </ErrorBoundary>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-white selection:bg-brand-pink selection:text-brand-black">
      <Header />
      <CinematicHero />

      <FeaturedCampaign />

      <About />
      <Activities />
      <Leadership />
      <Testimonials />
      <Interaction />
      <Footer />
    </div>
  );
}

