import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

export function ContactHero() {
  return (
    <section className="container py-[70px] mb-[30px]">
      <div className="grid grid-cols-1 gap-[50px] lg:grid-cols-[1fr_1.2fr] lg:gap-[70px]">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}
