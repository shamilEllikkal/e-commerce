import { ContactHero } from "@/components/contact/ContactHero";
import { Benefits } from "@/components/home/Benefits";

export const metadata = {
  title: "Contact Us — Kiddy",
  description: "Get in touch with the Kiddy team.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <Benefits />
    </main>
  );
}
