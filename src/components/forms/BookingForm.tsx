"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full border-0 border-b border-line bg-transparent py-3 text-ink placeholder:text-ink-soft/50 focus:border-gold focus:outline-none transition-colors";
const labelClasses = "text-xs uppercase tracking-[0.14em] text-ink-soft";

export function BookingForm() {
  const t = useTranslations("book.form");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("request_failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="border border-line bg-paper-raised p-8 sm:p-10"
      >
        <p className="font-serif text-2xl text-ink">{t("successTitle")}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {t("successBody")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            {t("name")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={t("namePlaceholder")}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t("emailPlaceholder")}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>
            {t("phone")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder={t("phonePlaceholder")}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="date" className={labelClasses}>
            {t("date")}
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className={labelClasses}>
          {t("notes")}
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder={t("notesPlaceholder")}
          className={`${inputClasses} resize-none`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          {t("errorTitle")} {t("errorBody")}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
