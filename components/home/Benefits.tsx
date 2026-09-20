import { CreditCard, Gift, MessagesSquare, Truck } from "lucide-react";

const benefits = [
  {
    title: "Secure Payments",
    body: "Tellus gravida ipsum at facilisis tempus at aliquam estsem.",
    icon: CreditCard,
  },
  {
    title: "Free Shipping",
    body: "Non pulvinar aenean ultrices lectus vitae imperdiet aeu.",
    icon: Truck,
  },
  {
    title: "24/7 Support",
    body: "Nullam iaculis vestibulum arcu id urnain pellentesque quis.",
    icon: MessagesSquare,
  },
  {
    title: "Gifts & Sales",
    body: "Aliquet ullamcorper leo mi vel sit pretium euismod eget libero.",
    icon: Gift,
  },
];

export function Benefits() {
  return (
    <section className="container mb-[85px] grid min-h-[180px] grid-cols-1 gap-[35px] rounded-[25px] bg-ink p-[30px] text-white md:grid-cols-2 md:p-[42px] xl:grid-cols-4">
      {benefits.map(({ title, body, icon: Icon }) => (
        <div key={title} className="grid grid-cols-[50px_1fr] gap-[15px]">
          <Icon size={35} strokeWidth={1.5} aria-hidden="true" />
          <div>
            <h3 className="mb-2 text-[17px] font-semibold">{title}</h3>
            <p className="m-0 text-[14px] leading-[1.65] text-[#d1d8df]">{body}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
