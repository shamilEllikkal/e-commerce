import { ShopHero } from "@/components/shop/ShopHero";
import { ShopLayout } from "@/components/shop/ShopLayout";
import { Benefits } from "@/components/home/Benefits";

export const metadata = {
  title: "Shop — Kiddy",
  description: "Browse our full collection of kids fashion, toys, shoes, hats, and seasonal essentials.",
};

export default function ShopPage() {
  return (
    <main>
      <ShopHero />
      <ShopLayout />
      <Benefits />
    </main>
  );
}
