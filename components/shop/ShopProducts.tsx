"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";

const ITEMS_PER_PAGE = 12; // 3 cols × 4 rows

const sortOptions = [
  { value: "default", label: "Default Sorting" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
];

// Duplicate products to simulate more items for pagination
const allProducts = [...products, ...products, ...products].map((p, i) => ({
  ...p,
  id: `${p.id}-${i}`,
}));

export function ShopProducts({
  priceLow,
  priceHigh,
  categories,
  page,
  onPageChange,
}: {
  priceLow: number;
  priceHigh: number;
  categories: string[];
  page: number;
  onPageChange: (p: number) => void;
}) {
  const [sort, setSort] = useState("default");

  const filtered = allProducts.filter((p) => {
    const inPrice = p.price >= priceLow && p.price <= priceHigh;
    const inCat = categories.length === 0 || categories.includes(p.category);
    return inPrice && inCat;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "name-asc") return a.name.localeCompare(b.name);
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const currentPage = totalPages > 0 ? Math.min(page, totalPages) : 1;
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = sorted.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-[14px] text-secondary">
          {sorted.length === 0
            ? "No results"
            : `Showing ${start + 1}–${Math.min(start + ITEMS_PER_PAGE, sorted.length)} of ${sorted.length} results`}
        </p>
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); onPageChange(1); }}
          className="h-10 rounded-[8px] border border-line bg-white px-3 text-[13px] text-secondary outline-none focus:border-ink"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 xl:grid-cols-3">
        {pageItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export function ShopPagination({
  priceLow,
  priceHigh,
  categories,
  page,
  onPageChange,
}: {
  priceLow: number;
  priceHigh: number;
  categories: string[];
  page: number;
  onPageChange: (p: number) => void;
}) {
  const filtered = allProducts.filter((p) => {
    const inPrice = p.price >= priceLow && p.price <= priceHigh;
    const inCat = categories.length === 0 || categories.includes(p.category);
    return inPrice && inCat;
  });
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentPage = totalPages > 0 ? Math.min(page, totalPages) : 1;

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-secondary transition hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={17} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => onPageChange(num)}
          aria-label={`Page ${num}`}
          aria-current={currentPage === num ? "page" : undefined}
          className={`grid h-10 w-10 place-items-center rounded-full border text-[14px] font-medium transition ${
            currentPage === num
              ? "border-ink bg-ink text-white"
              : "border-line bg-white text-secondary hover:border-ink hover:text-ink"
          }`}
        >
          {num}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex h-10 items-center gap-1.5 rounded-full border border-line bg-white px-4 text-[13px] font-medium text-secondary transition hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next <ChevronRight size={15} />
      </button>
    </div>
  );
}
