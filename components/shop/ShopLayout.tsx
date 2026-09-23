"use client";

import { useState } from "react";
import { ShopSidebar } from "./ShopSidebar";
import { ShopProducts, ShopPagination } from "./ShopProducts";
import { SlidersHorizontal, X } from "lucide-react";

const PRICE_MIN = 15;
const PRICE_MAX = 50;

export function ShopLayout() {
  const [priceLow, setPriceLow] = useState(15);
  const [priceHigh, setPriceHigh] = useState(50);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

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

  const sidebarProps = {
    priceLow,
    priceHigh,
    setPriceLow: (v: number) => { setPriceLow(v); setPage(1); },
    setPriceHigh: (v: number) => { setPriceHigh(v); setPage(1); },
    priceMin: PRICE_MIN,
    priceMax: PRICE_MAX,
    categories,
    onToggleCategory: toggleCategory,
    colors,
    onToggleColor: toggleColor,
    onResetFilters: resetFilters,
  };

  return (
    <section className="container mb-[100px]">
      <div className="grid grid-cols-1 gap-[50px] lg:grid-cols-[1fr_320px]">
        {/* Products Column */}
        <ShopProducts
          priceLow={priceLow}
          priceHigh={priceHigh}
          categories={categories}
          colors={colors}
          page={page}
          onPageChange={setPage}
          onReset={resetFilters}
          onOpenMobileFilter={() => setMobileFilterOpen(true)}
        />

        {/* Desktop Sidebar (Only visible on lg screens and above) */}
        <div className="hidden lg:block">
          <ShopSidebar {...sidebarProps} />
        </div>
      </div>

      {/* Mobile Right-Side Popup Drawer */}
      {mobileFilterOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden"
            onClick={() => setMobileFilterOpen(false)}
            aria-hidden="true"
          />

          {/* Right Slide-Over Popup Container */}
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Filters"
            className="fixed bottom-0 right-0 top-0 z-50 flex w-[85vw] max-w-[360px] flex-col bg-white p-6 shadow-2xl lg:hidden overflow-y-auto transition-transform duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
              <h2 className="text-[18px] font-bold text-ink flex items-center gap-2">
                <SlidersHorizontal size={18} /> Filter Products
              </h2>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Close filters"
                className="grid h-8 w-8 place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-ink transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Sidebar Filter Content (Price, Color, Best Deals, Promo Banner) */}
            <div className="flex-1">
              <ShopSidebar {...sidebarProps} />
            </div>

            {/* Apply Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="mt-6 h-12 w-full shrink-0 rounded-[10px] bg-ink text-[13px] font-bold uppercase text-white shadow-md transition hover:bg-yellow-500 hover:text-ink"
            >
              Apply Filters
            </button>
          </aside>
        </>
      )}

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
