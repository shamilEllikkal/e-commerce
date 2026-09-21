import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function PromoGrid() {
  return (
    <section className="container mb-[100px] grid grid-cols-1 gap-7 lg:grid-cols-[1.45fr_1fr]">
      <article className="relative min-h-[450px] overflow-hidden rounded-[25px] bg-[#dcefe9] lg:min-h-[590px] group">
        <Image src="/web3.webp" alt="Toy collection" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover  transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent to-60%" />
        <div className="absolute bottom-10 left-[45px] text-white">
          <span className="text-[15px] font-bold">NEW TOYS COLLECTION</span>
          <div className="my-3 flex items-start gap-2 text-[60px] font-extrabold leading-[0.95]">
            20 <small className="pt-1 text-[17px] leading-[1.15]">%<br />OFF</small>
          </div>
          <ButtonLink href="/shop/toys" variant="white" className="min-h-[58px] text-primary! font-medium hover:bg-yellow-500 hover:border-0 px-3">
            VIEW OFFER <ArrowUpRight size={17} />
          </ButtonLink>
        </div>
      </article>

      <div className="grid  gap-7">
        <PromoCard title="NEW SHOES COLLECTION" discount="10" image="/web4.webp" alt="Shoes" tone="bg-lavender" />
        <PromoCard title="NEW HATS COLLECTION" discount="12" image="/web5.webp" alt="Hat" tone="bg-yellow" />
      </div>
    </section>
  );
}

function PromoCard({ title, discount, image, alt, tone }: { title: string; discount: string; image: string; alt: string; tone: string }) {
  return (
    <article className={`flex group min-h-[250px] items-center justify-between overflow-hidden rounded-[25px] p-7 md:min-h-[280px] md:p-11 ${tone}`}>
      <div>
        <span className="text-[15px] font-medium">{title}</span>
        <div className="my-3 flex items-start gap-2 text-[55px] font-medium leading-[0.95]">
          {discount} <small className="pt-1 text-[17px] leading-[1.15]">%<br />OFF</small>
        </div>
        <ButtonLink href="/shop" variant="white" className="min-h-[58px] border border-gray-300! font-medium px-6">
          VIEW OFFER <ArrowUpRight size={17} />
        </ButtonLink>
      </div>
      <div className="relative h-[120px] transition-transform duration-500 group-hover:scale-110 w-[43%]">
        <Image src={image} alt={alt} fill sizes="240px" className="object-contain" />
      </div>
    </article>
  );
}
