import { JetBrains_Mono, Noto_Sans_SC } from "next/font/google";

export const fontSans = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  adjustFontFallback: false,
});
