import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { SubscribeForm } from "@/components/ui/SubscribeForm";

const cards = [
  {
    bg: "bg-yellow",
    image: "/shop1.webp",
    alt: "New toys collection",
    label: "NEW TOYS COLLECTION",
    cta: { text: "Collections", href: "/shop/toys" },
  },
  {
    bg: "bg-lavender",
    image: "/shop2.webp",
    alt: "New shoes collection",
    label: "NEW SHOES COLLECTION",
    cta: { text: "New Arrivals", href: "/shop/shoes" },
  },
];

export function ShopHero() {
  return (
    <section className="container py-[60px] ">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_0.8fr_1.3fr] h-120 gap-7">
        {/* Card 1 — large with image bg */}
       <HeroCard
  bg="bg-[#dcefe9]"
  image="/shop1.webp"
  alt="New toys collection"
  label="Blandit Natoque Elementum Nascetur"
  href="/shop/toys"
  cta={cards[0].cta}
/>

<HeroCard
  bg="bg-lavender"
  image="/shop2.webp"
  alt="New shoes collection"
  label="Fermentum Maximus Consecte Bingilla"
  href="/shop/shoes"
  cta={cards[1].cta}
/>
        {/* Card 3 — same layout as cards 1 & 2 */}
        <article className="relative min-h-[340px] overflow-hidden rounded-[25px] group bg-pink">
          <Image
            src="/shop3.webp"
            alt="Discounts collection"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent to-60%" />

          {/* Top-left pill */}
          <span className="absolute top-6 left-6 z-10 flex h-11 items-center rounded-xl bg-white px-5 text-[13px] font-medium tracking-wide text-ink">
            Discounts
          </span>

          {/* Bottom: label + subscribe form */}
          <div className="absolute bottom-8 left-8 right-8 z-10 text-white">
           
            <SubscribeForm variant="mini" placeholder="Your email address" />
          </div>

          {/* Top-right arrow */}
          <a
            href="/shop/discounts"
            aria-label="Go to Discounts"
            className="absolute top-6 right-6 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-ink transition-colors hover:bg-ink hover:text-yellow-500!"
          >
            <ArrowUpRight size={18} />
          </a>
        </article>
      </div>
    </section>
  );
}

function HeroCard({
  bg,
  image,
  alt,
  label,
  href,
  cta,
}: {
  bg: string;
  image: string;
  alt: string;
  label: string;
  href: string;
   cta: {
    text: string;
    href: string;
  };
}) {
  return (
    <article
      className={`relative min-h-[340px] overflow-hidden rounded-[25px] group ${bg}`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent to-60%" />
<span
 
  className="absolute top-6 left-6 z-10 flex h-11 items-center rounded-xl bg-white px-5 text-[13px] font-medium  tracking-wide text-ink"
>
  {cta.text}
</span>

      {/* Bottom-left label */}
      <div className="absolute bottom-8 left-8 text-white z-10">
        <span className="text-[18px] font-semibold  tracking-wide block mb-3">
          {label}
        </span>
      
      </div>

      {/* Top-right arrow */}
      <a
        href={href}
        aria-label={`Go to ${label}`}
        className="absolute top-6 right-6 z-10 grid h-10 w-10 place-items-center rounded-full bg-white backdrop-blur-sm text-ink hover:text-yellow-500! hover:bg-ink transition-colors"
      >
        <ArrowUpRight size={18} />
      </a>
    </article>
  );
}
