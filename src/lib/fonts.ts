import localFont from "next/font/local";
import { Inter, Playfair_Display } from "next/font/google";

// Displace has no Vietnamese diacritic glyphs, so it's only used for the
// English locale — see --font-serif's html[lang="vi"] override in globals.css.
export const displace = localFont({
  variable: "--font-displace",
  display: "swap",
  src: [
    { path: "../fonts/Displace20-Light.ttf", weight: "300", style: "normal" },
    {
      path: "../fonts/Displace20-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Displace20-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    { path: "../fonts/Displace20-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/Displace20-Black.ttf", weight: "900", style: "normal" },
  ],
});

// Vietnamese-locale heading fallback (full diacritic support).
export const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
});
