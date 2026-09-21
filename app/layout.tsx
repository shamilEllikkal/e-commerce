import type { Metadata } from "next";
import { Alexandria, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const alexandria = Alexandria({
  subsets: ["latin"],
  variable: "--font-alexandria",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kiddy - Kids Fashion Store",
  description:
    "Shop playful kids fashion, toys, shoes, hats, and seasonal essentials from Kiddy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${alexandria.variable}`}>
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

