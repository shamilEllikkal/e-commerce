import Link from "next/link";
import Image from "next/image";

export function Brand() {
  return (
    <Link
      href="/"
      className="inline-flex w-max items-center gap-3 text-[21px] font-extrabold tracking-[-0.5px]"
      aria-label="Kiddy home"
    >
      <Image src="/logo.svg" alt="Kiddy logo" width={82} height={32} className="h-auto w-[87px] " />
     
    </Link>
  );
}
