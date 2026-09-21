"use client";

import { Heart, ShoppingBag, Shuffle, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LoginModal } from "@/components/ui/LoginModal";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { useCart } from "@/context/CartContext";

export function AccountNav() {
  const [loginOpen, setLoginOpen] = useState(false);
  const { cartOpen, setCartOpen, subtotal, totalCount } = useCart();

  return (
    <>
      <nav className="flex h-[72px] items-center gap-6" aria-label="Account navigation">
        {/* Login — triggers modal */}
        <button
          type="button"
          onClick={() => setLoginOpen(true)}
          className="inline-flex h-[72px] items-center gap-2 text-[12px]! font-medium uppercase text-secondary transition-colors duration-200 hover:text-yellow-500!"
        >
          <UserRound size={19} strokeWidth={1.8} aria-hidden="true" />
          Login
        </button>

        {[
          { label: "Compare", href: "/compare", icon: Shuffle },
          { label: "Wishlist", href: "/wishlist", icon: Heart },
        ].map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="inline-flex h-[72px] items-center gap-2 text-[12px] font-medium uppercase text-secondary transition-colors duration-200 hover:text-yellow-500!"
          >
            <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
            {label}
          </Link>
        ))}

        {/* Cart drawer trigger */}
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="inline-flex h-[72px] items-center gap-2 text-[12px]! font-medium uppercase text-secondary transition-colors duration-200 hover:text-yellow-500!"
        >
          <div className="relative inline-flex items-center justify-center">
            <ShoppingBag size={19} strokeWidth={1.8} aria-hidden="true" />
            {totalCount > 0 ? (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-[10px] font-extrabold text-white shadow-xs">
                {totalCount}
              </span>
            ) : null}
          </div>
          ${subtotal.toFixed(2)}
        </button>
      </nav>

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </>
  );
}



