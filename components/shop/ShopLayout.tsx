"use client";

import { useState } from "react";
import { ShopSidebar } from "./ShopSidebar";
import { ShopProducts, ShopPagination } from "./ShopProducts";

const PRICE_MIN = 15;
const PRICE_MAX = 50;

export function ShopLayout() {
  const [priceLow, setPriceLow] = useState(15);
  const [priceHigh, setPriceHigh] = useState(50);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);

  function toggleCategory(label: string) {
    setCategories((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
    setPage(1);
  }

  return (
    <section className="container mb-[100px]">
      {/* 2/3 products + 1/3 sidebar */}
      <div className="grid grid-cols-1 gap-[50px] lg:grid-cols-[2fr_1fr]">
        <ShopProducts
          priceLow={priceLow}
          priceHigh={priceHigh}
          categories={categories}
          page={page}
          onPageChange={setPage}
        />
        <ShopSidebar
          priceLow={priceLow}
          priceHigh={priceHigh}
          setPriceLow={(v) => { setPriceLow(v); setPage(1); }}
          setPriceHigh={(v) => { setPriceHigh(v); setPage(1); }}
          priceMin={PRICE_MIN}
          priceMax={PRICE_MAX}
          categories={categories}
          onToggleCategory={toggleCategory}
        />
      </div>

      {/* Pagination — full width, truly centered */}
      <ShopPagination
        priceLow={priceLow}
        priceHigh={priceHigh}
        categories={categories}
        page={page}
        onPageChange={setPage}
      />
    </section>
  );
}
