const logos = ["✦ Logoipsum", "LOCO°", "◎ Logoipsum", "▣ LOCO"];

export function LogoStrip() {
  return (
    <section className="container mb-[90px] flex min-h-[140px] flex-wrap items-center justify-center gap-10 rounded-[25px] bg-ink px-[50px] py-[25px] text-white lg:justify-around">
      {logos.map((logo) => (
        <span key={logo} className="text-[24px] font-extrabold">
          {logo}
        </span>
      ))}
    </section>
  );
}
