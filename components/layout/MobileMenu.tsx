"use client";

import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = ["Home", "Shop", "News", "About Us", "Contact Us"];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden ">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open ? (
        <div className="absolute inset-x-3 top-[86px] z-20 rounded-2xl border border-line bg-white p-4 shadow-xl">
          <div className="mb-4 grid h-12 grid-cols-[1fr_44px] overflow-hidden rounded-[10px] bg-soft">
            <input
              aria-label="Search products"
              placeholder="What are you looking for?"
              className="min-w-0 bg-transparent px-4 text-[14px] outline-none"
            />
            <button type="button" aria-label="Search" className="grid place-items-center">
              <Search size={18} />
            </button>
          </div>
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link
                key={link}
                href={link === "Home" ? "/" : `/${link.toLowerCase().replaceAll(" ", "-")}`}
                className="rounded-xl px-3 py-3 text-[13px] font-bold uppercase text-[#34485d]"
                onClick={() => setOpen(false)}
              >
                {link}
              </Link>
            ))}
          </nav>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-3">
            <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-soft px-3 py-3 text-[12px] font-bold uppercase">
              <UserRound size={16} /> Login
            </Link>
            <Link href="/cart" className="inline-flex items-center gap-2 rounded-xl bg-soft px-3 py-3 text-[12px] font-bold uppercase">
              <ShoppingBag size={16} /> $0.00
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
