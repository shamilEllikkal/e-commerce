import { ArrowRight, Crown, Footprints, Gamepad2, Shirt, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import type { Category } from "@/types/product";

const iconMap = {
  hat: Crown,
  toy: Gamepad2,
  dress: Sparkles,
  shirt: Shirt,
  shoes: Footprints,
};

const toneMap: Record<Category["tone"], string> = {
  cream: "bg-[#fff7e8]",
  pink: "bg-[#fff0f4]",
  green: "bg-[#ecfaef]",
  blue: "bg-[#eaf8f9]",
  purple: "bg-[#f1edff]",
};

export function TrustedCustomers() {
  return (
    <section className="container mb-[110px] text-center">
      <div className="mb-[25px] flex justify-center">
        {[16,17,18,19].map((item) => (
          <Image
            key={item}
            src={`/web${item}.webp`}
            alt=""
            width={72}
            height={72}
            className="-ml-[9px] h-[72px] w-[72px] rounded-full border-[3px] border-white object-cover first:ml-0"
          />
        ))}
      </div>
      <h2 className="mb-[55px] text-[34px] font-semibold leading-[1.1] tracking-[-2.5px] md:text-[42px]">
        Trusted by over 10K+ customers
      </h2>

      <div className="mx-auto flex max-w-[1250px] flex-wrap justify-center gap-x-[22px] gap-y-[25px]">
        {categories.map((category) => {
          const Icon = iconMap[category.icon];

          return (
            <Link
              key={category.id}
              href={`/shop/${category.id}`}
              className={`grid min-h-[125px] w-full grid-cols-[58px_1fr_60px] items-center rounded-full py-[18px] pr-[22px] pl-[38px] text-left md:min-w-[390px] md:w-auto ${toneMap[category.tone]}`}
            >
              <Icon size={35} aria-hidden="true" />
              <span className="whitespace-pre-line text-[18px] leading-[1.45] uppercase font-semibold">
                {category.label}
              </span>
              <span className="grid h-[60px] w-[60px] place-items-center rounded-full bg-white">
                <ArrowRight size={24} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
