import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowUpRight, Heart, Sparkles, Leaf } from "lucide-react";

const missionCards = [
  {
    image: "/about1.webp",
    alt: "Kids sweater on hanger",
    icon: Heart,
    title: "Driven by Love",
    body: "Founded by a team of parents, designers, and dreamers, we set out to create a place where parents can find high-quality clothing.",
  },
  {
    image: "/about2.webp",
    alt: "Kids room with plush toys",
    icon: Sparkles,
    title: "Designed for Fun and Magic",
    body: "From cozy basics to whimsical prints and adventure-ready outfits, we carefully design each piece to reflect the fun and magic of being a kid.",
  },
  {
    image: "/about3.webp",
    alt: "Kids outfit folded",
    icon: Leaf,
    title: "Sustainable & Friendly",
    body: "We source only the softest, most durable fabrics and ensure every piece is crafted with attention to detail, so it can stand up to even the busiest little explorers.",
  },
];

export function AboutMission() {
  return (
    <section className="container pt-[40px] md:pt-[70px] mb-[60px]">
      {/* Header row — centered on mobile */}
      <div className="mb-[45px] flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left gap-5">
        <div className="max-w-[580px]">
          <p className="mb-3 text-[16px] md:text-[18px] font-light text-secondary tracking-wide">
            Our Mission to Make Kids Feel Comfortable and Confident
          </p>
          <h1 className="m-0 text-[28px] sm:text-[36px] font-bold leading-[1.15] tracking-wide md:text-[46px] lg:text-[35px]">
            We believe every outfit should be as joyful, playful, and unique as
            the kids who wear it.
          </h1>
        </div>
        <ButtonLink
          href="/shop"
          variant="outline"
          className="w-max font-medium hover:bg-yellow-500 hover:border-0 self-center lg:self-auto"
        >
          View All Products <ArrowUpRight size={17} />
        </ButtonLink>
      </div>

      {/* Paired Image + Text Cards (Image followed immediately by its Text) */}
      <div className="grid grid-cols-1 gap-[40px] sm:grid-cols-3 sm:gap-6 mt-10">
        {missionCards.map(({ image, alt, icon: Icon, title, body }) => (
          <div key={title} className="flex flex-col items-center text-center sm:items-start sm:text-left group">
            {/* Image */}
            <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-[20px] mb-6 shadow-xs">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Icon */}
            <div className="mb-4 grid h-[48px] w-[48px] place-items-center rounded-full border border-line bg-soft text-ink">
              <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
            </div>

            {/* Title & Body */}
            <h3 className="mb-2.5 text-[22px] font-bold text-ink">{title}</h3>
            <p className="m-0 text-[15px] font-light leading-[1.7] text-body">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
