import { Heart, Sparkles, Leaf } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Driven by Love",
    body: "Founded by a team of parents, designers, and dreamers, we set out to create a place where parents can find high-quality clothing.",
  },
  {
    icon: Sparkles,
    title: "Designed for Fun and Magic",
    body: "From cozy basics to whimsical prints and adventure-ready outfits, we carefully design each piece to reflect the fun and magic of being a kid.",
  },
  {
    icon: Leaf,
    title: "Sustainable & Friendly",
    body: "We source only the softest, most durable fabrics and ensure every piece is crafted with attention to detail, so it can stand up to even the busiest little explorers.",
  },
];

export function AboutValues() {
  return (
    <section className="container mb-[90px]">
      <div className="grid grid-cols-1 gap-[50px] md:grid-cols-3">
        {values.map(({ icon: Icon, title, body }) => (
          <div key={title}>
            <div className="mb-5 grid h-[52px] w-[52px] place-items-center rounded-full border border-line">
              <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3 className="mb-3 text-[25px] font-bold">{title}</h3>
            <p className="m-0 text-[17px] font-light leading-[1.7] text-body">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
