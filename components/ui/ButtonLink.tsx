import type { ReactNode } from "react";
import Link from "next/link";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "dark" | "outline" | "white";
  className?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "outline",
  className = "",
}: ButtonLinkProps) {
  const variants = {
    dark: "border-ink bg-ink text-white",
    outline: "border-[#dfe4e8] bg-white text-ink",
    white: "border-white bg-white text-ink",
  };

  return (
    <Link
      href={href}
      className={`inline-flex min-h-[62px] items-center justify-center gap-[15px] rounded-[10px] border px-[30px] text-[14px] font-extrabold transition hover:-translate-y-0.5 hover:shadow-sm ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
