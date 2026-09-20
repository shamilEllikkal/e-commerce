import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { ProductActions } from "./ProductActions";
import { ProductPrice } from "./ProductPrice";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-2xl border group border-[#e6e9ec] bg-white">
      <div className="relative grid h-[240px] place-items-center p-[35px] md:h-[280px]">
        {product.badge ? (
          <span className="absolute top-[18px] left-[18px] rounded bg-[#ffb935] px-[13px] py-[7px] text-[13px] font-extrabold uppercase text-white">
            {product.badge}
          </span>
        ) : null}
        <Image src={product.image} alt={product.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="p-[35px] object-contain transition-transform duration-500 group-hover:scale-110" />
        <ProductActions />
      </div>

      <div className="border-t border-[#f0f1f3] px-[15px] py-[24px_27px] text-center">
        <h3 className="mb-[3px] text-[18px] font-semibold hover:text-yellow-500">{product.name}</h3>
        <p className="m-0 text-[12px] uppercase hover:text-yellow-500 text-[#a0aab4]">{product.category}</p>
      </div>

      <div className="grid min-h-[65px] grid-cols-2 items-center border-t border-[#eceff1]">
        <ProductPrice price={product.price} oldPrice={product.oldPrice} />
        <Link href={`/product/${product.id}`} className="grid h-full place-items-center font-medium text-[15px] hover:text-yellow-500! text-secondary!">
          Add to cart
        </Link>
      </div>
    </article>
  );
}
