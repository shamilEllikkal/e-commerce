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
    <section className="container mb-[100px] grid grid-cols-1 items-center  lg:grid-cols-2 ">
      {/* Left — image */}
      <div className="relative overflow-hidden rounded-[25px] bg-yellow" style={{ height: "588px", width: "527px", maxWidth: "100%" }}>
        <Image
          src="/about4.webp"
          alt="Girl in yellow outfit"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain object-bottom p-6 pb-0"
        />
      </div>

      {/* Right — text + stats */}
      <div className="max-w-[420px]">
        <h2 className="mb-[22px] text-[38px] font-semibold leading-[1.1] tracking-[-2px] md:text-[38px]">
          Your Children Deserve The Best
        </h2>
        <p className="mb-[42px] text-[16px] font-light leading-[1.75] text-body">
          Our story started with a simple dream: to create a space where parents
          could find clothes that kids love to wear and are built to withstand
          all their adventures.
        </p>

        {/* Stats row — border BELOW the number */}
        <div className="mb-[42px] grid grid-cols-3 gap-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="pb-4 border-b border-[#e8e8e8]">
              <p className="text-[52px] font-medium leading-none tracking-[-2px]">
                {value}
              </p>
              <p className="mt-2 text-[14px] text-secondary">{label}</p>
            </div>
          ))}
        </div>

        <ButtonLink href="/shop" variant="dark" className="font-medium text-white! hover:text-ink! hover:bg-yellow-500 hover:border-0">
          Explore our collection <ArrowUpRight size={17} />
        </ButtonLink>
      </div>
    </section>
  );
}
