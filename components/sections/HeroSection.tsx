"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/track";
import { useAutoplayVideo } from "@/lib/useAutoplayVideo";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Gostaria de falar com o Dr. Claudio na Clínica Dall'Agnol."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const FALLBACK_ASPECT = 16 / 9;
const HERO_VIDEO = "/VideoAbertura.MOV";

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
  const setVideoRef = useAutoplayVideo();
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [videoFailed, setVideoFailed] = useState(false);

  const onMetadataLoaded = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = e.currentTarget;
      if (!video.videoWidth || !video.videoHeight) return;
      setAspectRatio(video.videoWidth / video.videoHeight);
      setVideoFailed(false);
    },
    []
  );

  const onTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = e.currentTarget;
      if (!Number.isFinite(video.duration)) return;
      setLogoOpacity(logoOpacityAtTime(video.currentTime, video.duration));
    },
    []
  );

  const ar = aspectRatio ?? FALLBACK_ASPECT;

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-bg-page)]">
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: ar }}
      >
        {!videoFailed ? (
          <video
            ref={setVideoRef}
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedMetadata={onMetadataLoaded}
            onTimeUpdate={onTimeUpdate}
            onError={() => setVideoFailed(true)}
            className="block h-full w-full origin-center scale-[1.07] object-cover"
            aria-hidden
          />
        ) : (
          <div
            className="block h-full w-full bg-section-alt"
            style={
              videoFailed
                ? {
                    backgroundImage: "url(/consultorio-cadeira.jpeg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
            aria-hidden
          />
        )}

        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[14%] min-w-[2.5rem] max-w-[10rem] bg-gradient-to-r from-[var(--color-bg-page)] from-25% via-[var(--color-bg-page)]/55 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[14%] min-w-[2.5rem] max-w-[10rem] bg-gradient-to-l from-[var(--color-bg-page)] from-25% via-[var(--color-bg-page)]/55 to-transparent"
          aria-hidden
        />
      </div>

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
          className={`flex flex-col items-center gap-3 sm:gap-4 ${
            logoOpacity < 0.05 ? "pointer-events-none" : "pointer-events-auto"
          }`}
          aria-hidden={logoOpacity < 0.05}
        >
          <div className="flex max-h-[min(38%,5.25rem)] w-auto max-w-[min(58vw,10.5rem)] items-center justify-center sm:max-h-none sm:max-w-none sm:w-64 md:w-80 lg:w-96">
            <Image
              src="/LogoDallAgnol.png"
              alt="Dall Agnoll Odontologia"
              width={400}
              height={300}
              className="h-auto max-h-full w-full object-contain object-center drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)] sm:max-h-none"
              priority
            />
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("home")}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-white shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition-all duration-200 hover:bg-primary-hover hover:shadow-brand-md sm:px-6 sm:py-3 sm:text-sm"
          >
            Falar com o Dr. Claudio
          </a>
        </motion.div>
      </div>
    </section>
  );
}
