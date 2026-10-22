import { MotionProvider } from "@/components/effects/MotionProvider";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Appointments } from "@/components/sections/Appointments";
import { Portfolio } from "@/components/sections/Portfolio";
import { Team } from "@/components/sections/Team";
import { About } from "@/components/sections/About";
import { Location } from "@/components/sections/Location";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <MotionProvider>
      <Navigation />
      <main id="continut">
        <Hero />
        <Services />
        <Appointments />
        <Portfolio />
        <Team />
        <About />
        <Location />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}
