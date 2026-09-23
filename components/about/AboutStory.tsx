import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

const stats = [
  { value: "12+", label: "Years" },
  { value: "60+", label: "Stores" },
  { value: "10+", label: "Countries" },
];

export function AboutStory() {
  return (
    <section className="container mb-[80px] md:mb-[100px] flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-center">
      {/* Left — image */}
      <div className="relative mx-auto w-full max-w-[527px] h-[360px] sm:h-[460px] lg:h-[588px] overflow-hidden rounded-[25px] bg-yellow">
        <Image
          src="/about4.webp"
          alt="Girl in yellow outfit"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain object-bottom p-6 pb-0"
        />
      </div>

      {/* Right — text + stats */}
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-[480px] w-full">
        <h2 className="mb-[18px] text-[28px] sm:text-[34px] md:text-[38px] font-semibold leading-[1.15] tracking-[-1.5px]">
          Your Children Deserve The Best
        </h2>
        <p className="mb-[32px] text-[15px] sm:text-[16px] font-light leading-[1.75] text-body">
          Our story started with a simple dream: to create a space where parents
          could find clothes that kids love to wear and are built to withstand
          all their adventures.
        </p>

        {/* Stats row */}
        <div className="mb-[36px] grid grid-cols-3 gap-4 w-full text-center">
          {stats.map(({ value, label }) => (
            <div key={label} className="pb-4 border-b border-[#e8e8e8]">
              <p className="text-[36px] sm:text-[46px] md:text-[52px] font-medium leading-none tracking-[-2px] text-ink">
                {value}
              </p>
              <p className="mt-2 text-[13px] sm:text-[14px] text-secondary">{label}</p>
            </div>
          ))}
        </div>

        <ButtonLink href="/shop" variant="dark" className="font-medium text-white! hover:text-ink! hover:bg-yellow-500 hover:border-0 mx-auto lg:mx-0">
          Explore our collection <ArrowUpRight size={17} />
        </ButtonLink>
      </div>
    </section>
  );
}
