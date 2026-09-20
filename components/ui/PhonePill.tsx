import { Phone } from "lucide-react";

export function PhonePill() {
  return (
    <a
      href="tel:+73099321312"
      className="inline-flex items-center gap-2.5 justify-self-start hover:bg-gray-200 transition-colors duration-200 rounded-full border border-[#dce1e5] py-[7px] pr-4 pl-2 text-[13px] lg:justify-self-end"
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-white">
        <Phone size={17} strokeWidth={1.8} aria-hidden="true" />
      </span>
     +73 099 321 312
    </a>
  );
}
