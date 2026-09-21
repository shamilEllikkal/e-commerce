"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "My little ones are so picky, but they love the fun designs and bright colors. And as a mom, I love that the clothes are both stylish and sturdy!",
    name: "Samatha Jackson",
    role: "Client",
  },
  {
    quote:
      "I've been shopping here for two years and the quality keeps getting better. My kids actually get excited when a new Kiddy order arrives!",
    name: "Emily Parker",
    role: "Parent",
  },
  {
    quote:
      "The customer service is incredible and the sizing is always spot-on. I recommend Kiddy to every parent I know.",
    name: "Michael Torres",
    role: "Customer",
  },
  {
    quote:
      "Beautiful fabrics, thoughtful designs, and fast shipping. Kiddy has become our go-to for every season.",
    name: "Priya Mehta",
    role: "Returning Customer",
  },
];

export function AboutTestimonials() {
  const [index, setIndex] = useState(0);

  function prev() {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }

  function next() {
    setIndex((i) => (i + 1) % testimonials.length);
  }

  const { quote, name, role } = testimonials[index];

  return (
    <section className="container mb-[100px]">
      <div className="rounded-[25px] border border-line px-[30px] py-[60px] md:px-[80px] md:py-[75px]">
        {/* Avatar — top center */}
        <div className="mb-8 flex justify-center">
          <div className="relative h-[80px] w-[80px] overflow-hidden rounded-full border-[3px] border-white shadow-md">
            <Image src="/about5.webp" alt={name} fill sizes="80px" className="object-cover" />
          </div>
        </div>
        {/* Arrows + quote */}
        <div className="flex items-center gap-4 md:gap-8">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex-shrink-0 grid h-10 w-10 place-items-center rounded-full border border-line text-secondary transition hover:border-ink hover:text-ink"
          >
            <ChevronLeft size={18} />
          </button>

          <blockquote className="flex-1 text-center">
            <p className="text-[18px] font-light! leading-[1.65] text-ink md:text-[27px]">
              {quote}
            </p>
            <footer className="mt-6">
              <cite className="not-italic">
                <p className="text-[16px] font-bold text-ink">{name}</p>
                <p className="text-[14px] text-secondary">{role}</p>
              </cite>
            </footer>
          </blockquote>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex-shrink-0 grid h-10 w-10 place-items-center rounded-full border border-line text-secondary transition hover:border-ink hover:text-ink"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-yellow-500" : "w-2 bg-line"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
