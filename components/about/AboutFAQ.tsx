"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "Rutrum massa id nisi enim enim tincidunt ultricies",
    answer:
      "Metus volutpat blandit euismod molestie et viverra nulla. A aenean velit tellus bibendum. Lorem posuere eu sit lacus laoreet neque integer augue. Feugiat fringilla rhoncus eleifend vulputate suspendisse non hendrerit. Ipsum ultrices quisque blandit venenatis at libero.\n\nEt amet dictum aenean condimentum nulla praesent non, nullam litora torquent. Consequat ullamcorper semper senectus ut ornare vel dis. Accumsan maecenas facilisi ad; convallis habitasse quis.",
  },
  {
    question: "What is your return and exchange policy?",
    answer:
      "We offer a 30-day return policy on all unworn items with original tags attached. Simply contact our support team and we'll guide you through the process. Exchanges are free for sizing issues.",
  },
  {
    question: "How do I find the right size for my child?",
    answer:
      "Each product page includes a detailed size guide based on age and measurements. We recommend measuring your child's chest, waist, and height for the most accurate fit.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to over 10 countries worldwide. Shipping times and costs vary by destination and are calculated at checkout. Free shipping is available on orders over $75.",
  },
  {
    question: "Are your fabrics safe for sensitive skin?",
    answer:
      "All our fabrics are OEKO-TEX certified and free from harmful chemicals. We use only skin-safe dyes and soft natural blends, making them suitable even for babies and children with sensitive skin.",
  },
];

export function AboutFAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="container mb-[100px]">
      <h2 className="mb-[45px] text-[36px] font-bold leading-[1.1] tracking-[-2px] md:text-[42px]">
        Frequently Asked Questions
      </h2>

      <div className="flex flex-col gap-3">
        {faqs.map(({ question, answer }, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="overflow-hidden rounded-[14px] border border-line bg-white"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-[28px] py-[22px] text-left text-[16px] font-medium text-ink transition hover:text-yellow-600"
              >
                <span>{question}</span>
                {isOpen ? (
                  <Minus size={18} className="flex-shrink-0 text-secondary" />
                ) : (
                  <Plus size={18} className="flex-shrink-0 text-secondary" />
                )}
              </button>

              {isOpen && (
                <div className="px-[28px] pb-[24px]">
                  {answer.split("\n\n").map((para, j) => (
                    <p
                      key={j}
                      className="mt-0 mb-3 text-[15px] leading-[1.75] text-body last:mb-0"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
