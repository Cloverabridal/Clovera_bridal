import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 min-h-11 px-7 text-[13px] uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-gold border border-ink hover:border-gold",
  secondary:
    "bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper",
  ghost:
    "bg-transparent text-ink border border-transparent px-0 min-h-0 hover:text-gold underline underline-offset-4 decoration-gold/50",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  locale?: string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href) {
    const { href, locale, target, rel, ...rest } = props;
    return (
      <Link
        href={href}
        locale={locale}
        target={target}
        rel={rel}
        className={classes}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const { type, disabled, onClick, ...rest } = props as ButtonAsButton;
  return (
    <button
      className={classes}
      type={type ?? "button"}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
