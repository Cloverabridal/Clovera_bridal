import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navLinks, socialLinks, contactDetails } from "@/content/site";
import { SocialIcon } from "@/components/ui/SocialIcon";

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
            <Image
              src="/logo.png"
              alt="Clovera Bridal"
              width={220}
              height={168}
              className="h-16 w-auto sm:h-20"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
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
              <li>{tContact("addressLine2")}</li>
              <li>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="transition-colors hover:text-ink"
                >
                  {contactDetails.email}
                </a>
              </li>
              <li>
                <a
                  href={contactDetails.phoneHref}
                  className="transition-colors hover:text-ink"
                >
                  {contactDetails.phone}
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
                <div className="mt-4 flex items-center gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      className="text-ink-soft transition-colors hover:text-ink"
                    >
                      <SocialIcon name={social.icon} className="h-5 w-5" />
                    </a>
                  ))}
                </div>
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
