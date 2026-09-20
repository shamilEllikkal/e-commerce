"use client";

import { Eye, Heart, Shuffle } from "lucide-react";
import { useState } from "react";

const actions = [
  { label: "Add to wishlist", icon: Heart },
  { label: "Compare product", icon: Shuffle },
  { label: "Quick view", icon: Eye },
];

export function ProductActions() {
  const [active, setActive] = useState<string[]>([]);

  function toggle(label: string) {
    setActive((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );
  }

  return (
    <div className="absolute top-[18px] right-[18px] grid gap-2.5">
      {actions.map(({ label, icon: Icon }) => {
        const pressed = active.includes(label);

        return (
          <button
            key={label}
            type="button"
            aria-label={label}
            aria-pressed={pressed}
            onClick={() => toggle(label)}
            className={`grid h-[38px] w-[38px] place-items-center rounded-full transition ${
              pressed ? "bg-ink text-white" : "bg-[#f4f6f8] text-[#5a6c7d] hover:bg-ink hover:text-white"
            }`}
          >
            <Icon size={18} strokeWidth={1.7} />
          </button>
        );
      })}
    </div>
  );
}
