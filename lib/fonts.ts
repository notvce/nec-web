import { DM_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const geistMono = GeistMono;
