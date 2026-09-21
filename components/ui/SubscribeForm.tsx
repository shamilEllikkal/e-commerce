"use client";

import { FormEvent, useState } from "react";

interface SubscribeFormProps {
  variant: "mini" | "large";
  placeholder: string;
}

export function SubscribeForm({ variant, placeholder }: SubscribeFormProps) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  const isLarge = variant === "large";

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid grid-cols-[1fr_auto] bg-white ${
        isLarge
          ? "h-[75px] rounded-[14px] p-2"
          : "h-[67px] rounded-[14px] border border-[#e0e4e8] p-[7px]"
      }`}
    >
      <label className="sr-only" htmlFor={`${variant}-email`}>
        Email address
      </label>
      <input
        id={`${variant}-email`}
        type="email"
        placeholder={sent ? "Thanks for subscribing" : placeholder}
        className="min-w-0 border-0 bg-transparent px-[18px] text-ink outline-0 placeholder:text-[#a5afb9]"
        required
      />
      <button
        type="submit"
        className="rounded-[10px] bg-ink px-[22px] font-extrabold text-white hover:bg-yellow-500 hover:text-primary"
      >
        Subscribe
      </button>
    </form>
  );
}
