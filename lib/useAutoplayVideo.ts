import { useCallback, useEffect, useRef } from "react";

function bindAutoplay(video: HTMLVideoElement) {
  const configure = () => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
  };

  const tryPlay = () => {
    configure();
    void video.play().catch(() => {});
  };

  configure();
  tryPlay();

  video.addEventListener("loadeddata", tryPlay);
  video.addEventListener("canplay", tryPlay);

  const onVisibility = () => {
    if (document.visibilityState === "visible") tryPlay();
  };
  document.addEventListener("visibilitychange", onVisibility);

  const onTouch = () => tryPlay();
  document.addEventListener("touchstart", onTouch, { once: true, passive: true });

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) tryPlay();
    },
    { threshold: 0.15 }
  );
  observer.observe(video);

  return () => {
    video.removeEventListener("loadeddata", tryPlay);
    video.removeEventListener("canplay", tryPlay);
    document.removeEventListener("visibilitychange", onVisibility);
    document.removeEventListener("touchstart", onTouch);
    observer.disconnect();
  };
}

/**
 * Callback ref: roda o setup de autoplay sempre que o <video> monta (inclui troca de src).
 */
export function useAutoplayVideo() {
  const cleanupRef = useRef<(() => void) | null>(null);

  const setVideoRef = useCallback((video: HTMLVideoElement | null) => {
    cleanupRef.current?.();
    cleanupRef.current = null;
    if (!video) return;
    cleanupRef.current = bindAutoplay(video);
  }, []);

  useEffect(() => () => cleanupRef.current?.(), []);

  return setVideoRef;
}
