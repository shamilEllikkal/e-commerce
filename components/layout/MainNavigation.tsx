"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop", hasMenu: true },
  { label: "News", href: "/news" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export function MainNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="flex h-[72px] items-center gap-6"
      aria-label="Main navigation"
    >
      {mainLinks.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);

        return (
          <div key={link.label} className="group relative h-[72px]">
            <Link
              href={link.href}
              className={`
                relative inline-flex h-[72px] items-center gap-2 px-4
                text-[12px] font-medium uppercase
                transition-colors duration-200

                after:absolute after:bottom-0 after:left-0 after:right-0
                after:h-px after:bg-ink
                after:transition-opacity after:duration-200

                ${
                  isActive
                    ? "text-ink after:opacity-100"
                    : "text-secondary after:opacity-0 hover:text-ink! hover:after:opacity-100"
                }
              `}
            >
              {link.label}
              {link.hasMenu && <ChevronDown size={16} />}
            </Link>

            {link.hasMenu && (
              <div className="invisible absolute left-0 top-full z-50 w-48 translate-y-2 rounded-lg bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <Link
                  href="/shop/variable-product"
                  className="block px-5 py-3 text-sm text-secondary hover:bg-gray-50 hover:text-yellow-500! "
                >
                  Variable Product
                </Link>

                <Link
                  href="/shop/product-gallery"
                  className="block px-5 py-3 text-sm text-secondary hover:bg-gray-50 hover:text-yellow-500!"
                >
                  Product Gallery
                </Link>

                <Link
                  href="/shop/custom-tab"
                  className="block px-5 py-3 text-sm text-secondary hover:bg-gray-50 hover:text-yellow-500!"
                >
                  Custom Tab
                </Link>

                <Link
                  href="/shop/advanced-reviews"
                  className="block px-5 py-3 text-sm text-secondary hover:bg-gray-50 hover:text-yellow-500!"
                >
                  Advanced Reviews
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}