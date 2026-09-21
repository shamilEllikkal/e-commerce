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
  const [colors, setColors] = useState<string[]>([]);

  function toggleCategory(label: string) {
    setCategories((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
    setPage(1);
  }

  function toggleColor(label: string) {
    setColors((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
    setPage(1);
  }

  function resetFilters() {
    setCategories([]);
    setColors([]);
    setPriceLow(15);
    setPriceHigh(50);
    setPage(1);
  }

  return (
    <section className="container mb-[100px]">
      <div className="grid grid-cols-1 gap-[50px] lg:grid-cols-[2fr_1fr]">
        <ShopProducts
          priceLow={priceLow}
          priceHigh={priceHigh}
          categories={categories}
          colors={colors}
          page={page}
          onPageChange={setPage}
          onReset={resetFilters}
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
          colors={colors}
          onToggleColor={toggleColor}
        />
      </div>
      <ShopPagination
        priceLow={priceLow}
        priceHigh={priceHigh}
        categories={categories}
        colors={colors}
        page={page}
        onPageChange={setPage}
      />
    </section>
  );
}
