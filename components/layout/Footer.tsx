import { Circle, Heart, Mail, Music2, Phone } from "lucide-react";
import Link from "next/link";
import { Brand } from "@/components/ui/Brand";
import { PhonePill } from "@/components/ui/PhonePill";

const groups = [
  ["Shop", "Dresses & Suits", "Shoes & Socks", "Blouses & T-Shirts", "Toys & Games", "Caps & Accessories"],
  ["Company", "About Us", "FAQ", "Our News", "Our Story", "Contact Us"],
  ["Useful", "Site Map", "Affiliate Area", "Delivery", "Locations", "Collaboration"],
  ["Legal", "Shipping Policy", "Returns & Exchanges", "Terms of Use", "Privacy Policy", "Cookies Policy"],
];

export function Footer() {
  return (
    <footer className="container pb-[35px]">
      <div className="flex flex-col items-center text-center justify-between gap-8 border-b border-line pb-12 md:pb-[75px] lg:flex-row lg:items-center lg:text-left">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <Brand />
          <p className="mt-[20px] max-w-[750px] text-[15px] sm:text-[17px] text-body">
            Discover our unique assortment of children&apos;s apparel and playthings in preparation for the upcoming fall season.
          </p>
        </div>
        <PhonePill />
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-10 border-b border-line py-12 md:grid-cols-4 md:gap-[50px] md:py-[70px]">
        {groups.map(([title, ...links]) => (
          <div key={title} className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <h4 className="mb-5 text-[18px] font-semibold">{title}</h4>
            {links.map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-")}`}
                className={`mb-2 block text-[14px] sm:text-[16px] text-[#263b50] transition hover:text-yellow-600 ${link === "Returns & Exchanges" ? "text-[var(--accent)]" : ""}`}
              >
                {link}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="flex min-h-20 flex-col items-center text-center justify-center gap-5 pt-6 text-body md:flex-row md:items-center md:justify-between md:pt-0">
        <span className="text-[13px] sm:text-[14px]">Copyright © 2026 - WordPress Theme by CreativeThemes</span>
        <div className="flex items-center gap-5">
          {[Circle, Mail, Heart, Music2, Phone].map((Icon, index) => (
            <Link key={index} href="#" aria-label="Social link" className="font-medium text-ink transition hover:text-yellow-600">
              <Icon size={18} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
