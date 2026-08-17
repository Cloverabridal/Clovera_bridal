type SocialIconName = "facebook" | "instagram" | "tiktok";

const paths: Record<SocialIconName, React.ReactNode> = {
  facebook: (
    <path d="M14 8.5h-1.5c-.55 0-1 .45-1 1V11h2.5l-.35 2.5H11.5V21h-3v-7.5H6.5V11h2V9.2c0-2.16 1.34-3.7 3.7-3.7H14v3z" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  tiktok: (
    <path d="M15.5 3.5c.4 2.2 1.9 3.7 4 4v3c-1.5 0-2.9-.4-4-1.2V15c0 3.3-2.7 5.5-5.5 5.5S4.5 18.3 4.5 15s2.7-5.5 5.5-5.5c.3 0 .6 0 .9.06v3.06a2.5 2.5 0 1 0 1.6 2.34V3.5h3z" />
  ),
};

export function SocialIcon({
  name,
  className,
}: {
  name: SocialIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
