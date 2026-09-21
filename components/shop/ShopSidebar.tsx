"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { ButtonLink } from "@/components/ui/ButtonLink";

interface ShopSidebarProps {
  priceLow: number;
  priceHigh: number;
  setPriceLow: (v: number) => void;
  setPriceHigh: (v: number) => void;
  priceMin: number;
  priceMax: number;
  categories: string[];
  onToggleCategory: (label: string) => void;
}

const colorFilters = [
  { label: "White",  count: 6,  hex: "#ffffff", border: true },
  { label: "Gray",   count: 3,  hex: "#9ca3af" },
  { label: "Beige",  count: 11, hex: "#d4b896" },
  { label: "Yellow", count: 3,  hex: "#facc15" },
  { label: "Orange", count: 3,  hex: "#f97316" },
  { label: "Red",    count: 8,  hex: "#ef4444" },
  { label: "Purple", count: 5,  hex: "#a855f7" },
  { label: "Blue",   count: 5,  hex: "#3b82f6" },
  { label: "Green",  count: 5,  hex: "#22c55e" },
  { label: "Black",  count: 1,  hex: "#111827" },
];

const categoryFilters = [
  { label: "Toys & Games",  count: 5 },
  { label: "Dresses",       count: 6 },
  { label: "Hats & Scarfs", count: 6 },
  { label: "Shoes & Socks", count: 6 },
  { label: "Sweaters",      count: 7 },
  { label: "T-shirts",      count: 5 },
];

const bestSelling = products.slice(0, 5);

export function ShopSidebar({
  priceLow,
  priceHigh,
  setPriceLow,
  setPriceHigh,
  priceMin,
  priceMax,
  categories,
  onToggleCategory,
}: ShopSidebarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"low" | "high" | null>(null);

  const lowPct  = ((priceLow  - priceMin) / (priceMax - priceMin)) * 100;
  const highPct = ((priceHigh - priceMin) / (priceMax - priceMin)) * 100;

  function valueFromPointer(clientX: number) {
    const rect = trackRef.current!.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(priceMin + pct * (priceMax - priceMin));
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const v = valueFromPointer(e.clientX);
    const distLow  = Math.abs(v - priceLow);
    const distHigh = Math.abs(v - priceHigh);
    dragging.current = distLow <= distHigh ? "low" : "high";
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    move(v);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    move(valueFromPointer(e.clientX));
  }

  function onPointerUp() {
    dragging.current = null;
  }

  function move(v: number) {
    if (dragging.current === "low")  setPriceLow(Math.min(v, priceHigh - 1));
    if (dragging.current === "high") setPriceHigh(Math.max(v, priceLow + 1));
  }

  return (
    <aside className="flex flex-col gap-[45px]">

      {/* ── Filter by price ── */}
      <div>
        <h3 className="mb-4 text-[17px] font-semibold">Filter by price</h3>

        {/* Drag area — slightly taller hit target */}
        <div
          ref={trackRef}
          className="relative my-4 h-[20px] cursor-pointer select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          {/* grey track */}
          <div className="absolute top-1/2 left-0 right-0 h-[5px] -translate-y-1/2 rounded-full bg-line" />

          {/* yellow fill */}
          <div
            className="absolute top-1/2 h-[5px] -translate-y-1/2 rounded-full bg-yellow-400"
            style={{ left: `${lowPct}%`, width: `${highPct - lowPct}%` }}
          />

          {/* low thumb */}
          <div
            className="absolute top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-yellow-400 bg-white shadow-sm"
            style={{ left: `${lowPct}%` }}
          />

          {/* high thumb */}
          <div
            className="absolute top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-yellow-400 bg-white shadow-sm"
            style={{ left: `${highPct}%` }}
          />
        </div>

        <p className="text-[13px] font-medium text-ink">
          Price: ${priceLow} &mdash; ${priceHigh}
        </p>
      </div>

      {/* ── Filter by color ── */}
      <div>
        <h3 className="mb-4 text-[17px] font-semibold">Filter by color</h3>
        <ul className="flex flex-col gap-2">
          {colorFilters.map(({ label, count, hex, border }) => (
            <li key={label}>
              <label className="group flex cursor-pointer items-center justify-between gap-3">
                <span className="flex items-center gap-3">
                  <span
                    className={`h-5 w-5 flex-shrink-0 rounded-full ${border ? "border border-line" : ""}`}
                    style={{ backgroundColor: hex }}
                    aria-hidden="true"
                  />
                  <span className="text-[14px] text-body transition-colors group-hover:text-ink">
                    {label}
                  </span>
                </span>
                <span className="text-[12px] text-muted">{count}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Filter by category ── */}
      <div>
        <h3 className="mb-4 text-[17px] font-semibold">Filter by category</h3>
        <ul className="flex flex-col gap-2">
          {categoryFilters.map(({ label, count }) => (
            <li key={label}>
              <label className="group flex cursor-pointer items-center justify-between">
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={categories.includes(label)}
                    onChange={() => onToggleCategory(label)}
                    className="h-4 w-4 rounded border-line accent-ink"
                  />
                  <span className="text-[14px] text-body transition-colors group-hover:text-ink">
                    {label}
                  </span>
                </span>
                <span className="text-[12px] text-muted">{count}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Best Selling ── */}
      <div>
        <h3 className="mb-4 text-[17px] font-semibold">Best Selling</h3>
        <ul className="flex flex-col gap-4">
          {bestSelling.map((product) => (
            <li key={product.id}>
              <Link href={`/product/${product.id}`} className="group flex items-center gap-3">
                <div className="relative h-[82px] w-[82px] flex-shrink-0 overflow-hidden rounded-[10px] bg-soft">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="82px"
                    className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div>
                  <p className="text-[15px] font-medium leading-[1.3] transition-colors group-hover:text-yellow-500">
                    {product.name}
                  </p>
                  <p className="mt-0.5 text-[14px] text-secondary">
                    {formatPrice(product.price)}
                    {product.oldPrice && (
                      <del className="ml-1.5 text-[12px] text-muted">
                        {formatPrice(product.oldPrice)}
                      </del>
                    )}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── 40% OFF promo banner ── */}
      <div className="relative mt-4 min-h-[570px] overflow-hidden rounded-[25px] bg-[#FFEBBE] group">
        <Image
          src="/web15.webp"
          alt="New collection"
          fill
          sizes="400px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent to-60%" />
        <div className="absolute bottom-8 left-6 right-6 z-10 text-white">
          <span className="mb-1 block text-[12px] font-bold uppercase tracking-widest opacity-80">
            New Arrivals
          </span>
          <h3 className="mb-4 text-[28px] font-extrabold leading-[1.1] tracking-[-1px]">
            New Collection
            <br />
            <span className="text-yellow-400">40% OFF</span>
          </h3>
          <ButtonLink
            href="/shop"
            variant="white"
            className="min-h-[46px] px-4 font-medium hover:border-0 text-ink! hover:bg-yellow-500"
          >
            View Offer <ArrowUpRight size={15} />
          </ButtonLink>
        </div>
      </div>

    </aside>
  );
}
