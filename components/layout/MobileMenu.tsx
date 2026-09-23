"use client";

import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { LoginModal } from "@/components/ui/LoginModal";
import { CartDrawer } from "@/components/ui/CartDrawer";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { cartOpen, setCartOpen, totalCount } = useCart();

  return (
    <div className="flex items-center gap-2 lg:hidden">
      {/* Login Icon */}
      <button
        type="button"
        aria-label="Open login"
        onClick={() => setLoginOpen(true)}
        className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-secondary transition hover:text-ink"
      >
        <UserRound size={18} />
      </button>

      {/* Cart Icon with Yellow Badge */}
      <button
        type="button"
        aria-label="Open cart"
        onClick={() => setCartOpen(true)}
        className="relative grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-secondary transition hover:text-ink"
      >
        <ShoppingBag size={18} />
        {totalCount > 0 ? (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-[10px] font-extrabold text-white shadow-xs">
            {totalCount}
          </span>
        ) : null}
      </button>

      {/* Hamburger Menu Toggle */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-secondary transition hover:text-ink"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Dropdown Menu */}
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
            {links.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="rounded-xl px-3 py-3 text-[13px] font-bold uppercase text-[#34485d] transition hover:bg-soft"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}

      {/* Modals & Drawers */}
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </div>
  );
}
