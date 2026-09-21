import Image from "next/image";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-[40px]">

      {/* Yellow image card — 540×475, image contained within bounds */}
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-[25px] bg-yellow"
        style={{ height: "475px", maxWidth: "540px", width: "100%" }}
      >
        <Image
          src="/contact1.webp"
          alt="Kiddy store"
          width={400}
          height={380}
          className="object-contain"
        />
      </div>

      {/* Address */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="mt-1 grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-soft">
            <MapPin size={18} strokeWidth={1.8} />
          </span>
          <div>
            <p className="mb-1 text-[15px] font-semibold">Our Location</p>
            <p className="text-[14px] leading-[1.7] text-body">
              123 Kiddy Lane, Suite 4B<br />
              New York, NY 10001<br />
              United States
            </p>
          </div>
        </div>
        <ButtonLink
          href="https://maps.google.com"
          variant="outline"
          className="flex-shrink-0 min-h-[44px] px-4 font-medium hover:bg-yellow-500 hover:border-0"
        >
          Get Directions <ArrowUpRight size={14} />
        </ButtonLink>
      </div>

      {/* Call us + Opening hours in a row */}
      <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2">

        {/* Call us */}
        <div className="flex items-start gap-4">
          <span className="mt-1 grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-soft">
            <Phone size={18} strokeWidth={1.8} />
          </span>
          <div className="w-full">
            <p className="mb-2 text-[15px] font-semibold">Call Us Today</p>
            <div className="flex items-center gap-2 text-[14px] text-body">
              <span className="">Mobile:</span>
              <a href="tel:+73099321312" className="transition-colors font-medium text-ink!">+73 099 321 312</a>
            </div>
            <div className="flex items-center gap-2 text-[14px] text-body">
              <span className="">Email:</span>
              <a href="mailto:kiddy@mail.com" className="transition-colors font-medium text-ink!">kiddy@mail.com</a>
            </div>
          </div>
        </div>

        {/* Opening hours */}
        <div className="flex items-start gap-4">
          <span className="mt-1 grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-soft">
            <Clock size={18} strokeWidth={1.8} />
          </span>
          <div>
            <p className="mb-2 text-[15px] font-semibold">Opening Hours</p>
            <div className="flex justify-between gap-4 text-[14px] text-body">
              <span>Mon – Fri:</span>
              <span className="font-medium text-ink">08:30 – 20:00</span>
            </div>
            <div className="flex justify-between gap-4 text-[14px] text-body">
              <span>Sat – Sun:</span>
              <span className="font-medium text-ink">10:00 – 18:00</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
