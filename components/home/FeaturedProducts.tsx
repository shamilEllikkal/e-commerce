import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProductGrid } from "@/components/products/ProductGrid";

export function FeaturedProducts() {
  return (
    <section className="container mb-[120px]">
      <div className="mb-[45px] flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <h2 className="m-0 text-[42px] font-bold leading-[1.1] tracking-[-2.5px] lg:text-[clamp(42px,4vw,62px)]">
          Featured Products
        </h2>
        <ButtonLink href="/shop" className="min-h-[58px] font-medium hover:bg-yellow-500">
          View All Products <ArrowUpRight size={18} />
        </ButtonLink>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
