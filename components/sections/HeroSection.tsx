"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FALLBACK_ASPECT = 16 / 9;
/** Segundos iniciais: logo visível com fade out. */
const LOGO_AT_START_SECONDS = 2.5;
/** Segundos finais do vídeo em que a logo aparece (antes do loop). */
const LOGO_AT_END_SECONDS = 2.5;

function logoOpacityAtTime(currentTime: number, duration: number): number {
  let opacity = 0;

  if (currentTime < LOGO_AT_START_SECONDS) {
    const t = currentTime / LOGO_AT_START_SECONDS;
    opacity = Math.max(0, 1 - t);
  }

  const remaining = duration - currentTime;
  if (remaining <= LOGO_AT_END_SECONDS) {
    const t = 1 - remaining / LOGO_AT_END_SECONDS;
    opacity = Math.max(opacity, t);
  }

  return opacity;
}

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [logoOpacity, setLogoOpacity] = useState(1);

  const onMetadataLoaded = useCallback(() => {
    const video = videoRef.current;
    if (!video?.videoWidth || !video?.videoHeight) return;
    setAspectRatio(video.videoWidth / video.videoHeight);
  }, []);

  const onTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    setLogoOpacity(logoOpacityAtTime(video.currentTime, video.duration));
  }, []);

  const ar = aspectRatio ?? FALLBACK_ASPECT;

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-bg-page)]">
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: ar }}
      >
        <video
          ref={videoRef}
          src="/VideoAbertura.MOV"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedMetadata={onMetadataLoaded}
          onTimeUpdate={onTimeUpdate}
          className="block h-full w-full origin-center scale-[1.07] object-cover"
          aria-hidden
        />

        {/* Degradê esbranquiçado nas laterais — integra com o fundo da página */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[14%] min-w-[2.5rem] max-w-[10rem] bg-gradient-to-r from-[var(--color-bg-page)] from-25% via-[var(--color-bg-page)]/55 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[14%] min-w-[2.5rem] max-w-[10rem] bg-gradient-to-l from-[var(--color-bg-page)] from-25% via-[var(--color-bg-page)]/55 to-transparent"
          aria-hidden
        />
      </div>

      {/* Logo: área abaixo do header no mobile para não cortar nem deslocar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[4.5rem] z-10 flex items-center justify-center overflow-visible px-6 sm:inset-0 sm:top-0 sm:px-4 sm:pt-24">
        <motion.div
          initial={false}
          animate={{
            opacity: logoOpacity,
            scale: 0.92 + logoOpacity * 0.08,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex max-h-[min(38%,5.25rem)] w-auto max-w-[min(58vw,10.5rem)] items-center justify-center sm:max-h-none sm:max-w-none sm:w-64 md:w-80 lg:w-96"
          aria-hidden={logoOpacity < 0.05}
        >
          <Image
            src="/LogoDallAgnol.png"
            alt="Dall Agnoll Odontologia"
            width={400}
            height={300}
            className="h-auto max-h-full w-full object-contain object-center drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)] sm:max-h-none"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
