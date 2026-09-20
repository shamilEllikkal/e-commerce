import Image from "next/image";

const stats = [
  { value: "12+", label: "Years" },
  { value: "60+", label: "Stores" },
  { value: "10+", label: "Countries" },
];

export function AboutStory() {
  return (
    <section className="container mb-[100px] grid grid-cols-1 items-center gap-[50px] lg:grid-cols-2 lg:gap-[80px]">
      {/* Left — image */}
      <div className="relative min-h-[480px] overflow-hidden rounded-[25px] bg-yellow lg:min-h-[560px]">
        <Image
          src="/about4.webp"
          alt="Girl in yellow outfit"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>

      {/* Right — text + stats */}
      <div>
        <h2 className="mb-[22px] text-[38px] font-bold leading-[1.1] tracking-[-2px] md:text-[48px]">
          Your Children Deserve The Best
        </h2>
        <p className="mb-[42px] text-[16px] leading-[1.75] text-body">
          Our story started with a simple dream: to create a space where parents
          could find clothes that kids love to wear and are built to withstand
          all their adventures.
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="border-t-2 border-ink pt-4">
              <p className="text-[38px] font-bold leading-none tracking-[-1px]">
                {value}
              </p>
              <p className="mt-1 text-[15px] text-secondary">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
