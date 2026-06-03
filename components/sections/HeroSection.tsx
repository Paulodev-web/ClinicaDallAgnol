"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/track";
import { useAutoplayVideo } from "@/lib/useAutoplayVideo";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Gostaria de falar com o Dr. Claudio na Clínica Dall'Agnol."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const DESKTOP_FALLBACK_ASPECT = 16 / 9;
const MOBILE_FALLBACK_ASPECT = 464 / 832;
const HERO_VIDEO_DESKTOP = "/VideoAbertura.MOV";
const HERO_VIDEO_MOBILE = "/VideoAberturamobile.mp4";

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
  const setDesktopVideoRef = useAutoplayVideo();
  const setMobileVideoRef = useAutoplayVideo();
  const [desktopAspect, setDesktopAspect] = useState<number | null>(null);
  const [mobileAspect, setMobileAspect] = useState<number | null>(null);
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [desktopVideoFailed, setDesktopVideoFailed] = useState(false);
  const [mobileVideoFailed, setMobileVideoFailed] = useState(false);

  const onDesktopMetadataLoaded = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = e.currentTarget;
      if (!video.videoWidth || !video.videoHeight) return;
      setDesktopAspect(video.videoWidth / video.videoHeight);
      setDesktopVideoFailed(false);
    },
    []
  );

  const onMobileMetadataLoaded = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = e.currentTarget;
      if (!video.videoWidth || !video.videoHeight) return;
      setMobileAspect(video.videoWidth / video.videoHeight);
      setMobileVideoFailed(false);
    },
    []
  );

  const logoOpacityRaf = useRef<number | null>(null);

  const onTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = e.currentTarget;
      const isMobileVideo = video.dataset.heroVideo === "mobile";
      const isMobileViewport = window.matchMedia("(max-width: 639px)").matches;
      if (isMobileVideo !== isMobileViewport) return;

      if (logoOpacityRaf.current !== null) return;
      logoOpacityRaf.current = requestAnimationFrame(() => {
        logoOpacityRaf.current = null;
        if (!Number.isFinite(video.duration)) return;
        const next = logoOpacityAtTime(video.currentTime, video.duration);
        setLogoOpacity((prev) =>
          Math.abs(prev - next) < 0.008 ? prev : next
        );
      });
    },
    []
  );

  useEffect(
    () => () => {
      if (logoOpacityRaf.current !== null) {
        cancelAnimationFrame(logoOpacityRaf.current);
      }
    },
    []
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const syncPlayback = () => {
      const desktop = document.querySelector<HTMLVideoElement>(
        "[data-hero-video='desktop']"
      );
      const mobile = document.querySelector<HTMLVideoElement>(
        "[data-hero-video='mobile']"
      );
      if (mq.matches) {
        desktop?.pause();
        void mobile?.play().catch(() => {});
      } else {
        mobile?.pause();
        void desktop?.play().catch(() => {});
      }
    };
    syncPlayback();
    mq.addEventListener("change", syncPlayback);
    return () => mq.removeEventListener("change", syncPlayback);
  }, []);

  const desktopAr = desktopAspect ?? DESKTOP_FALLBACK_ASPECT;
  const mobileAr = mobileAspect ?? MOBILE_FALLBACK_ASPECT;

  const fallbackBg = {
    backgroundImage: "url(/consultorio-cadeira.jpeg)",
    backgroundSize: "cover" as const,
    backgroundPosition: "center" as const,
  };
  const mobileFallbackBg = {
    ...fallbackBg,
    backgroundPosition: "center 42%" as const,
  };

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-bg-page)]">
      {/* Mobile — vídeo portrait */}
      <div
        className="relative w-full overflow-hidden sm:hidden"
        style={{ aspectRatio: mobileAr }}
      >
        {!mobileVideoFailed ? (
          <video
            ref={setMobileVideoRef}
            data-hero-video="mobile"
            src={HERO_VIDEO_MOBILE}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedMetadata={onMobileMetadataLoaded}
            onTimeUpdate={onTimeUpdate}
            onError={() => setMobileVideoFailed(true)}
            className="block h-full w-full origin-center scale-[1.12] object-cover object-[center_42%]"
            aria-hidden
          />
        ) : (
          <div
            className="block h-full w-full origin-center scale-[1.12] bg-section-alt"
            style={mobileFallbackBg}
            aria-hidden
          />
        )}

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[14%] min-h-[2.5rem] bg-gradient-to-b from-[var(--color-bg-page)] from-35% to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[12%] min-h-[2rem] bg-gradient-to-t from-[var(--color-bg-page)] from-30% to-transparent"
          aria-hidden
        />
      </div>

      {/* Desktop — vídeo landscape */}
      <div
        className="relative hidden w-full overflow-hidden sm:block"
        style={{ aspectRatio: desktopAr }}
      >
        {!desktopVideoFailed ? (
          <video
            ref={setDesktopVideoRef}
            data-hero-video="desktop"
            src={HERO_VIDEO_DESKTOP}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedMetadata={onDesktopMetadataLoaded}
            onTimeUpdate={onTimeUpdate}
            onError={() => setDesktopVideoFailed(true)}
            className="block h-full w-full origin-center scale-[1.07] object-cover"
            aria-hidden
          />
        ) : (
          <div
            className="block h-full w-full bg-section-alt"
            style={fallbackBg}
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

      {/* Overlay mobile — logo e botão adaptados ao portrait */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[4.5rem] z-10 flex items-center justify-center overflow-visible px-5 sm:hidden">
        <HeroOverlay logoOpacity={logoOpacity} variant="mobile" />
      </div>

      {/* Overlay desktop */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden items-center justify-center overflow-visible px-4 pt-24 sm:flex">
        <HeroOverlay logoOpacity={logoOpacity} variant="desktop" />
      </div>
    </section>
  );
}

type HeroOverlayProps = {
  logoOpacity: number;
  variant: "mobile" | "desktop";
};

function HeroOverlay({ logoOpacity, variant }: HeroOverlayProps) {
  const isMobile = variant === "mobile";
  const scale = 0.92 + logoOpacity * 0.08;

  return (
    <div
      style={{
        opacity: logoOpacity,
        transform: `scale(${scale})`,
      }}
      className={`flex flex-col items-center will-change-[opacity,transform] ${
        isMobile ? "gap-4" : "gap-3 sm:gap-4"
      } ${
        logoOpacity < 0.05 ? "pointer-events-none" : "pointer-events-auto"
      }`}
      aria-hidden={logoOpacity < 0.05}
    >
      <div
        className={
          isMobile
            ? "flex w-auto max-w-[min(72vw,11.5rem)] items-center justify-center"
            : "flex w-64 max-w-none items-center justify-center md:w-80 lg:w-96"
        }
      >
        <Image
          src="/LogoDallAgnol.png"
          alt="Dall Agnoll Odontologia"
          width={400}
          height={300}
          className={
            isMobile
              ? "h-auto w-full object-contain object-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
              : "h-auto w-full object-contain object-center drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          }
          priority
        />
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("home")}
        className={
          isMobile
            ? "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium uppercase tracking-wide text-white shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-200 hover:bg-primary-hover hover:shadow-brand-md"
            : "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium uppercase tracking-wide text-white shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition-all duration-200 hover:bg-primary-hover hover:shadow-brand-md"
        }
      >
        Falar com o Dr. Claudio
      </a>
    </div>
  );
}
