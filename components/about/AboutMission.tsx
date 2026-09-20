import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowUpRight } from "lucide-react";

const galleryImages = [
  { src: "/web6.webp", alt: "Kids sweater on hanger", tall: false },
  { src: "/web7.webp", alt: "Kids room decor", tall: true },
  { src: "/web8.webp", alt: "Kids clothing folded", tall: false },
];

export function AboutMission() {
  return (
    <section className="container pt-[70px] mb-[30px]">
      {/* Header row */}
      <div className="mb-[55px] flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[580px]">
          <p className="mb-3 text-[18px] font-light text-secondary  tracking-wide">
            Our Mission to Make Kids Feel Comfortable and Confident
          </p>
          <h1 className="m-0 text-[36px] font-bold leading-[1.1] tracking-wide md:text-[46px] lg:text-[35px]">
            We believe every outfit should be as joyful, playful, and unique as
            the kids who wear it.
          </h1>
        </div>
        <ButtonLink
          href="/shop"
          variant="outline"
          className="w-max font-medium hover:bg-yellow-500 hover:border-0 self-start lg:self-auto"
        >
          View All Products <ArrowUpRight size={17} />
        </ButtonLink>
      </div>

      {/* Staggered 3-image gallery */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:items-end">
        {/* Left — shorter */}
        <div className="relative h-[320px] overflow-hidden rounded-[20px] sm:h-[360px]">
          <Image
            src="/about1.webp"
            alt="Kids sweater on hanger"
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
        {/* Center — taller, raised */}
        <div className="relative h-[420px] overflow-hidden rounded-[20px] sm:h-[480px] sm:-mt-[60px]">
          <Image
            src="/about2.webp"
            alt="Kids room with plush toys"
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
        {/* Right — shorter */}
        <div className="relative h-[320px] overflow-hidden rounded-[20px] sm:h-[360px]">
          <Image
            src="/about3.webp"
            alt="Kids outfit folded"
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
