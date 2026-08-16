export const siteConfig = {
  name: "Clovera Bridal",
  domain: "cloverabridal.com",
  url: "https://www.cloverabridal.com",
};

export const navLinks = [
  { href: "/about", key: "about" },
  { href: "/collections", key: "collections" },
  { href: "/services", key: "services" },
  { href: "/contact", key: "contact" },
] as const;

// TODO: add real handles once the client shares them — icons only render when href is set.
export const socialLinks: { name: string; href: string }[] = [];
