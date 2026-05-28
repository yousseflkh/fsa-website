import { Hero } from "@/components/Hero";
import { Academy } from "@/components/Academy";
import { Quote } from "@/components/Quote";
import { Programs } from "@/components/Programs";
import { Pathway } from "@/components/Pathway";
import { Marquee } from "@/components/Marquee";
import { League } from "@/components/League";
import { Coaches } from "@/components/Coaches";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { Instagram } from "@/components/Instagram";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Academy />
      <Quote />
      <Programs />
      <Pathway />
      <Marquee />
      <League />
      <Coaches />
      <Gallery />
      <Testimonials />
      <Instagram />
      <Marquee variant="muted" />
      <Contact />
      <Footer />
    </>
  );
}
