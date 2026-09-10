"use client";

import { useTranslations } from "next-intl";
import { contactDetails } from "@/content/site";

const WHATSAPP_NUMBER = contactDetails.phoneHref
  .replace("tel:", "")
  .replace(/[^\d]/g, "");

/**
 * Always-visible WhatsApp quick-contact button, bottom-right. Opens a
 * chat with the studio number, pre-filled with a short greeting.
 */
export function WhatsAppButton() {
  const t = useTranslations("common");
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t("whatsappMessage"),
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={t("whatsappAria")}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold-soft/25 bg-surface-dark text-gold-soft shadow-lg shadow-surface-dark/25 transition-colors hover:bg-surface-dark-soft sm:bottom-8 sm:right-8"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24Zm-4.7 4.44c-.22 0-.58.08-.88.41-.3.33-1.16 1.13-1.16 2.76s1.19 3.2 1.35 3.42c.17.22 2.31 3.53 5.68 4.95.79.34 1.41.54 1.9.7.8.25 1.52.22 2.1.13.64-.1 1.97-.8 2.25-1.58.28-.78.28-1.44.2-1.58-.08-.14-.3-.22-.63-.39-.33-.17-1.97-.97-2.27-1.08-.3-.11-.53-.17-.75.17-.22.33-.86 1.08-1.05 1.3-.2.22-.39.25-.72.08-.33-.17-1.4-.51-2.66-1.64-.98-.88-1.65-1.96-1.84-2.3-.2-.33-.02-.5.14-.67.15-.15.33-.39.5-.58.16-.2.22-.33.33-.55.11-.22.06-.42-.03-.58-.08-.17-.75-1.8-1.03-2.47-.27-.65-.55-.56-.75-.57l-.64-.01Z" />
      </svg>
    </a>
  );
}
