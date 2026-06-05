import { ShieldCheck } from "lucide-react";

type HttpsSecurityBadgeProps = {
  className?: string;
  size?: "sm" | "md";
};

export function HttpsSecurityBadge({
  className = "",
  size = "sm",
}: HttpsSecurityBadgeProps) {
  const isMd = size === "md";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-graysoft/50 bg-surface px-3 py-1.5 shadow-sm ${className}`}
      role="img"
      aria-label="Site seguro com conexão criptografada HTTPS"
      title="Conexão criptografada (HTTPS)"
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-full bg-primary-xlight ${
          isMd ? "h-8 w-8" : "h-6 w-6"
        }`}
        aria-hidden
      >
        <ShieldCheck
          className={`text-primary ${isMd ? "h-4 w-4" : "h-3.5 w-3.5"}`}
          strokeWidth={2.25}
        />
      </span>
      <span className={`leading-tight ${isMd ? "text-sm" : "text-xs"}`}>
        <span className="block font-medium text-ink">Site seguro</span>
        <span className="block text-ink-muted tracking-wide">HTTPS</span>
      </span>
    </div>
  );
}
