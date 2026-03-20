const SESSION_KEY = "cd_session_id";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function getDeviceType(): string {
  if (typeof window === "undefined") return "desktop";
  const ua = navigator.userAgent.toLowerCase();
  if (/mobile|android|iphone|ipad/.test(ua)) return "mobile";
  return "desktop";
}

export function trackVisit(path: string) {
  const payload = JSON.stringify({
    path,
    sessionId: getSessionId(),
    deviceType: getDeviceType(),
  });
  fetch("/api/track/visit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true, // conclui mesmo ao navegar/fechar
  }).catch(() => {});
}

export function trackWhatsAppClick(pageOrigin: string) {
  const payload = JSON.stringify({
    pageOrigin,
    deviceType: getDeviceType(),
  });
  fetch("/api/track/whatsapp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true, // conclui mesmo ao abrir nova aba com WhatsApp
  }).catch(() => {});
}
