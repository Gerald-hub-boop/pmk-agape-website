import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TOTAL_FRAMES = 79;
const BACKGROUND_COLOR = "#FFF0F2";

export const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);

  // =========================
  // LOAD IMAGES
  // =========================
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/sequence/Create_smooth_transition_${i}.jpg`;

      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) setImagesLoaded(true);
      };

      img.onerror = () => {
        console.error("ERROR:", img.src);
        loaded++;
      };

      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // =========================
  // SCROLL (REVERSED)
  // =========================
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;

      let progress = -rect.top / total;
      progress = Math.max(0, Math.min(1, progress));

      setScrollProgress(progress);

      const target = (1 - progress) * (TOTAL_FRAMES - 1);
      frameRef.current += (target - frameRef.current) * 0.08;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // =========================
  // CANVAS RENDER
  // =========================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const frameIndex = Math.round(frameRef.current);
      const img = imagesRef.current[frameIndex];

      if (img && img.complete) {
        const imgAspect = img.width / img.height;
        const canvasAspect = width / height;

        let drawWidth, drawHeight;

        // FULL COVER (NO BORDER)
        if (imgAspect > canvasAspect) {
          drawHeight = height * 1.2;
          drawWidth = drawHeight * imgAspect;
        } else {
          drawWidth = width * 1.2;
          drawHeight = drawWidth / imgAspect;
        }

        const floatY = Math.sin(Date.now() / 4000) * (width < 768 ? 2 : 6);

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // 🔥 lebih soft & cinematic
        ctx.globalAlpha = 0.88;
        ctx.filter = "brightness(1.03) contrast(0.95) saturate(0.95)";

        ctx.drawImage(
          img,
          width / 2 - drawWidth / 2,
          height / 2 - drawHeight / 2 + floatY,
          drawWidth,
          drawHeight
        );
      }

      requestAnimationFrame(render);
    };

    render();
  }, []);

  // =========================
  // SCENE
  // =========================
  const isScene1 = scrollProgress < 0.35;

  return (
    <section
      ref={containerRef}
      className="relative w-screen h-[450vh]"
      style={{ backgroundColor: BACKGROUND_COLOR }}
    >
      <div className="sticky top-0 w-screen h-screen overflow-hidden flex items-center justify-center">

        {/* CANVAS */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

        {/* CINEMATIC OVERLAY */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0) 35%, rgba(255,255,255,0.35) 100%)"
          }}
        />

        {/* TEXT */}
        <div
          className="absolute inset-0 flex items-center justify-center z-30 px-6 text-center"
          style={{ transform: "translateY(-2vh)" }}
        >
          <AnimatePresence mode="wait" initial={false}>

            {/* SCENE 1 */}
            {isScene1 ? (
              <motion.h1
                key="scene1"
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1 }}
                className="leading-[0.95]"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "clamp(3.4rem, 10vw, 7.6rem)",
                  color: "#4A1F1F",
                  textShadow: `
                    0 1px 0 rgba(255,255,255,0.35),
                    0 6px 18px rgba(0,0,0,0.08)
                  `,

                  WebkitFontSmoothing: "antialiased",
                  textRendering: "optimizeLegibility"
                }}
              >
                <span className="block">Welcome To</span>
                <span className="block mt-6 md:mt-10">The Family</span>
              </motion.h1>
            ) : (
              <motion.div
                key="scene2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >

                {/* 🔥 TITLE FIXED (TEGAS + ELEGANT) */}
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    fontSize: "clamp(4rem, 12vw, 10rem)",
                    lineHeight: 0.95,
                    color: "#4A1F1F",
                    textShadow: `
                      0 1px 0 rgba(255,255,255,0.35),
                      0 6px 18px rgba(0,0,0,0.08)
                    `,
                    textAlign: "center"
                  }}
                >
                  PMK AGAPE
                </motion.h2>

                {/* SUBTEXT */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.95, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                    color: "#5A1E1E",
                    textShadow: `
                      0 1px 0 rgba(255,255,255,0.35),
                      0 6px 18px rgba(0,0,0,0.08)
                    `,
                    lineHeight: 1.6,
                    textAlign: "center",
                    maxWidth: "90vw"
                  }}
                  className="mt-6"
                >
                  A place to grow, share, and walk together in Christ
                </motion.p>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* LOADING */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#FFF0F2] z-50">
            <p className="text-sm text-gray-400">Loading...</p>
          </div>
        )}

      </div>

      {/* FONTS */}
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Cormorant+Garamond:wght@500;600;700&display=swap');

body {
  margin: 0;
  background: #FFF0F2;
}
      `}</style>
    </section>
  );
};