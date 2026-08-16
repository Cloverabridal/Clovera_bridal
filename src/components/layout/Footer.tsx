import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navLinks, socialLinks } from "@/content/site";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-serif text-2xl text-ink">Clovera Bridal</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              {t("tagline")}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              {t("explore")}
            </p>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              {t("studio")}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              <li>{tContact("addressLine1")}</li>
              <li>
                <a
                  href={`mailto:${tContact("email")}`}
                  className="transition-colors hover:text-ink"
                >
                  {tContact("email")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              {t("legal")}
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {t("terms")}
                </Link>
              </li>
            </ul>
            {socialLinks.length > 0 && (
              <>
                <p className="mt-8 text-xs uppercase tracking-[0.2em] text-gold">
                  {t("follow")}
                </p>
                <ul className="mt-4 space-y-3">
                  {socialLinks.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-ink-soft transition-colors hover:text-ink"
                      >
                        {social.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-8 text-xs text-ink-soft/70">
          © {year} Clovera Bridal. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
