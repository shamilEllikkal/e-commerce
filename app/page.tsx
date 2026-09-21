import { Benefits } from "@/components/home/Benefits";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { LogoStrip } from "@/components/home/LogoStrip";
import { PromoGrid } from "@/components/home/PromoGrid";
import { TrustedCustomers } from "@/components/home/TrustedCustomers";
import { VoucherSection } from "@/components/home/VoucherSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <PromoGrid />
      <LogoStrip />
      <FeaturedProducts />
      <TrustedCustomers />
      <VoucherSection />
      <Benefits />
    </main>
  );
}
