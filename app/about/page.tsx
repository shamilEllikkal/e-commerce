import { AboutMission } from "@/components/about/AboutMission";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutTestimonials } from "@/components/about/AboutTestimonials";
import { AboutFAQ } from "@/components/about/AboutFAQ";
import { Benefits } from "@/components/home/Benefits";

export const metadata = {
  title: "About Us — Kiddy",
  description: "Learn about Kiddy's mission to make kids feel comfortable, confident, and stylish.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutMission />
      <AboutValues />
      <AboutStory />
      <AboutTestimonials />
      <AboutFAQ />
      <Benefits />
    </main>
  );
}
