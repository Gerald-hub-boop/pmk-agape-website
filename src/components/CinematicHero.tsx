import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { UserPlus, ArrowRight } from 'lucide-react';
import imgLanding from '../images-optimized/Landing.webp';

// ─────────────────────────────────────────────
// Staggered fade-up — matches the animation
// style used in every whileInView section below.
// ─────────────────────────────────────────────
function Rise({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
export const CinematicHero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);

  // Subtle scroll-driven parallax on the image only
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  // Mark ready once image loads (prevents flash of broken layout)
  const onImageLoad = useCallback(() => setReady(true), []);
  useEffect(() => {
    if (imgRef.current?.complete) setReady(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full h-[100svh] min-h-[540px] max-h-[780px] md:h-screen md:min-h-[640px] md:max-h-[960px] overflow-hidden bg-[#FFF0F2]"
    >
      {/* ─── BACKGROUND IMAGE (right half, parallax) ──────────── */}
      {/* Positioned absolutely so the white text panel floats over it */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imgY }}
        aria-hidden
      >
        <img
          ref={imgRef}
          src={imgLanding}
          alt=""
          className="w-full h-full object-cover object-[80%_center] md:object-center"
          style={{
            // Slightly warmer and dimmed on mobile for slogan legibility
            filter: 'brightness(0.93) saturate(0.94)',
            scale: 1.04,
          }}
          onLoad={onImageLoad}
        />

        {/* Desktop horizontal gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background:
              'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 25%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 60%)',
          }}
        />
        {/* Mobile horizontal gradient overlay — white translucent overlay (98% left -> 40% right minimum opacity) */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{
            background:
              'linear-gradient(to right, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.94) 25%, rgba(255,255,255,0.88) 45%, rgba(255,255,255,0.78) 60%, rgba(255,255,255,0.65) 75%, rgba(255,255,255,0.52) 88%, rgba(255,255,255,0.40) 100%)',
          }}
        />

        {/* Gradient fade at bottom — desktop 40%, mobile 15% */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background:
              'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 18%, transparent 40%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{
            background:
              'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 8%, transparent 15%)',
          }}
        />
      </motion.div>

      {/* ─── CONTENT LAYER ────────────────────────────────────── */}
      <div className="relative z-10 h-full flex items-center md:items-start pt-0 md:pt-[clamp(2.5rem,8vh,5.5rem)] pb-36 md:pb-0">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          {/*
           * Max-width constraint keeps the text panel tight on the left
           * while the image breathes on the right — intentional asymmetry.
           */}
          <div className="max-w-[480px]">

            {/* First Friends Hero Badge */}
            <Rise delay={0.15} className="mt-0 md:mt-2 mb-2 md:mb-3">
              <a
                href="#first-friends"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 border border-[#D88A9A]/50 shadow-sm hover:shadow-md hover:border-[#D88A9A] hover:bg-[#FFF0F2] transition-all duration-300 group cursor-pointer"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D88A9A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4A1F1F]"></span>
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#4A1F1F] tracking-wide flex items-center gap-1.5">
                  <UserPlus className="w-3.5 h-3.5 text-[#D88A9A]" />
                  <span>First Friends 2026 is Now Open</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D88A9A] group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </Rise>

            {/* Headline — Quicksand bold, same scale as H2 sections */}
            <Rise delay={0.25} className="mt-0 md:mt-4">
              <h1
                className="font-bold text-brand-black leading-[1.1] tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 6.5vw, 4.6rem)' }}
              >
                You Belong Here.
              </h1>
            </Rise>

            {/* Supporting text — one or two sentences, matches p style below */}
            <Rise delay={0.42} className="mt-5 md:mt-6">
              <p
                className="font-semibold leading-relaxed text-brand-black"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', maxWidth: '455px' }}
              >
                Here, you can grow in faith, make new friends, and walk through university with people who truly care.
              </p>
            </Rise>

            {/* CTA buttons — exact same classes as the site's existing CTAs */}
            <Rise delay={0.58} className="mt-8 md:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <a
                href="#connect"
                onClick={() => {
                  const event = new CustomEvent('scroll-to-connect-card', { detail: 0 });
                  window.dispatchEvent(event);
                }}
                className="
                  px-7 py-3.5 rounded-full
                  bg-[#D88A9A] text-white text-sm font-bold
                  shadow-[0_4px_20px_rgba(216,138,154,0.4)]
                  hover:bg-[#C9778A]
                  hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(216,138,154,0.45)]
                  transition-all duration-300
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D88A9A]
                "
              >
                Join Us
              </a>
              <a
                href="#vision"
                className="
                  px-7 py-3.5 rounded-full
                  bg-white text-[#4A1F1F] text-sm font-bold
                  border border-[#FADADD]
                  hover:bg-[#FFF0F2] hover:border-[#D88A9A]
                  hover:-translate-y-0.5
                  transition-all duration-300
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D88A9A]
                "
              >
                Discover Our Story →
              </a>
            </Rise>

          </div>
        </div>
      </div>



      {/* ─── SCROLL INDICATOR ─────────────────────────────────── */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="opacity-30">
            <path
              d="M4.5 7L9 11.5L13.5 7"
              stroke="#4A1F1F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/*
       * Invisible preload state — we let the browser paint first
       * before fading in, preventing a white flash on slow connections.
       */}
      {!ready && (
        <div className="absolute inset-0 z-30 bg-[#FFF0F2]" aria-hidden />
      )}
    </section>
  );
};