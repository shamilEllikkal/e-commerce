import { formatPrice } from "@/lib/format";

interface ProductPriceProps {
  price: number;
  oldPrice?: number;
}

export function ProductPrice({ price, oldPrice }: ProductPriceProps) {
  return (
    <strong className="grid h-full place-items-center font-medium border-r border-[#eceff1] text-[15px] text-[#52687e]">
      <span>
        {formatPrice(price)}
        {oldPrice ? (
          <del className="ml-1.5 text-[12px] text-[#aeb6bd]">{formatPrice(oldPrice)}</del>
        ) : null}
      </span>
    </strong>
  );
}
