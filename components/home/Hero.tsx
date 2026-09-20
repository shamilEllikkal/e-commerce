import { ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SubscribeForm } from "@/components/ui/SubscribeForm";

type Point = [number, number];

function polar(cx: number, cy: number, r: number, deg: number): Point {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

interface BurstOptions {
  cx?: number;
  cy?: number;
  spikes?: number;
  outerR?: number;
  innerR?: number;
  radius?: number;
}

function buildBurstPath({
  cx = 100,
  cy = 100,
  spikes = 11,
  outerR = 95,
  innerR = 76,
  radius = 6,
}: BurstOptions = {}): string {
  const n = spikes * 2;
  const verts: Point[] = Array.from({ length: n }, (_, i) =>
    polar(cx, cy, i % 2 === 0 ? outerR : innerR, (360 / n) * i)
  );

  const sub = (a: Point, b: Point): Point => [a[0] - b[0], a[1] - b[1]];
  const norm = (v: Point): Point => {
    const len = Math.hypot(v[0], v[1]) || 1;
    return [v[0] / len, v[1] / len];
  };

  let d = "";
  verts.forEach((curr, i) => {
    const prev = verts[(i - 1 + n) % n];
    const next = verts[(i + 1) % n];
    const toPrev = norm(sub(prev, curr));
    const toNext = norm(sub(next, curr));
    const a: Point = [curr[0] + toPrev[0] * radius, curr[1] + toPrev[1] * radius];
    const b: Point = [curr[0] + toNext[0] * radius, curr[1] + toNext[1] * radius];
    d += i === 0
      ? `M ${a[0].toFixed(2)} ${a[1].toFixed(2)} `
      : `L ${a[0].toFixed(2)} ${a[1].toFixed(2)} `;
    d += `Q ${curr[0].toFixed(2)} ${curr[1].toFixed(2)} ${b[0].toFixed(2)} ${b[1].toFixed(2)} `;
  });
  return d + "Z";
}

interface DiscountBadgeProps {
  percent?: number;
  label?: string;
}

function DiscountBadge({ percent = 30, label = "OFF" }: DiscountBadgeProps) {
  const outerPath = buildBurstPath({ outerR: 102, innerR: 82, radius: 8 });
  const innerPath = buildBurstPath({ outerR: 87, innerR: 68, radius: 7 });

  return (
    <div
      className="absolute left-1/2 top-[45px] z-10 h-[135px] w-[135px] -translate-x-1/2 md:top-[20px] md:h-48 md:w-48"
      aria-label={`${percent}% off`}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <linearGradient id="burstGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DCCEEB" />
            <stop offset="60%" stopColor="#E2D0C9" />
            <stop offset="100%" stopColor="#EBD39A" />
          </linearGradient>
        </defs>
        <path d={outerPath} fill="url(#burstGradient)" />
        <path d={innerPath} fill="white" />
      </svg>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center font-extrabold text-[var(--ink)]">
        <div className="text-[31px] leading-none md:text-[44px]">{percent}%</div>
        <div className="text-[16px] leading-tight md:text-[22px]">{label}</div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="container grid min-h-[700px] grid-cols-1 items-center gap-[35px] py-[55px] lg:grid-cols-[0.95fr_1.05fr] lg:gap-[50px] lg:py-[85px_80px]">
      <div>
        <h1 className="m-0 mb-[34px] text-[20px] font-bold leading-[1.06] tracking-[-3px] md:text-[76px] lg:text-[90px] lg:tracking-[-5px]">
          Where
          <br />
          Every Little
          <br />
          One Finds
          <br />
          Style
        </h1>
        <p className="mb-[42px] max-w-[620px] text-[16px] leading-[1.7] text-secondary lg:text-[18px]">
          Explore our exclusive collection of kids&apos; clothes and toys to get
          ready for the autumn season.
        </p>
        <div className="flex flex-wrap gap-7">
          <ButtonLink href="/shop" variant="dark" className="text-white! font-medium hover:bg-yellow-500 hover:border-0  hover:text-primary! px-6">
            Explore Collection <ArrowUpRight size={18} />
          </ButtonLink>
          <ButtonLink href="/promo-video" className="font-medium hover:bg-yellow-500 hover:border-0 ">
            <Play size={18} /> Promo Video
          </ButtonLink>
        </div>
      </div>

      <div className="relative w-full h-full flex justify-between gap-8 pb-20">
        <DiscountBadge percent={30} label="OFF" />

        <div className="bg-yellow rounded-2xl w-full mt-15">
          <div className="flex items-end justify-center h-full">
            <Image
              className="mx-auto w-auto h-auto"
              src="/web1.webp"
              alt="Child wearing yellow clothes"
              width={233}
              height={405}
            />
          </div>
        </div>

        <div className="w-full flex flex-col justify-between gap-8">
          <div className="bg-lavender rounded-2xl h-full">
            <div className="flex items-end justify-center h-full">
              <Image
                className="mx-auto w-auto h-auto"
                src="/web2.webp"
                alt="Child wearing yellow clothes"
                width={233}
                height={405}
              />
            </div>
          </div>

          <div>
            <SubscribeForm variant="mini" placeholder="Email address" />
          </div>
        </div>
      </div>
    </section>
  );
}