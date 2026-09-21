"use client";

import Image from "next/image";
import { Loader2 } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductActions } from "./ProductActions";
import { ProductPrice } from "./ProductPrice";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, loadingProductId } = useCart();
  const isLoading = loadingProductId === product.id;

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
        <button
          type="button"
          onClick={() => addToCart(product)}
          disabled={isLoading}
          className="grid h-full place-items-center font-medium text-[15px] text-secondary transition-colors hover:text-yellow-500 disabled:opacity-60"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-1.5 text-[14px]">
              <Loader2 size={16} className="animate-spin text-yellow-500" />
              Adding...
            </span>
          ) : (
            "Add to cart"
          )}
        </button>
      </div>
    </article>
  );
}
