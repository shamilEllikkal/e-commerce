"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
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
            </Link>
          </div>
        );
      })}
    </nav>
  );
}