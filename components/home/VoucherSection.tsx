import Image from "next/image";
import { SubscribeForm } from "@/components/ui/SubscribeForm";

export function VoucherSection() {
  return (
    <section className="container mb-[90px] grid min-h-[500px] grid-cols-1 items-center overflow-hidden rounded-[25px] bg-yellow lg:grid-cols-[1fr_1.2fr]">
      <div className="relative mx-auto h-[380px] w-[90%] self-end lg:h-[500px] lg:w-[80%]">
        <Image src="/web15.webp" alt="Child in winter clothes" fill sizes="(max-width: 1024px) 90vw, 36vw" className="object-contain object-bottom" />
      </div>
      <div className="px-[25px] pb-[45px] lg:py-[50px] lg:pr-20 lg:pl-0">
        <h2 className="text-[35px] font-semibold leading-[1.1] tracking-[-2.5px] lg:text-[40px]">
          Get Voucher
        </h2>
        <p className="my-[22px] max-w-[680px] text-[20px]">
      
          Subscribe Today and Unlock Up to <strong>20% OFF</strong> Your Next Purchase!
        </p>
        <SubscribeForm variant="large" placeholder="Your email address" />
      </div>
    </section>
  );
}
