import { Nunito, Marcellus } from "next/font/google";

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

export const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-heading",
});

