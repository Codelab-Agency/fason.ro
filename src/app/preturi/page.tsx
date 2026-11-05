import type { Metadata } from "next";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { Tariffs } from "@/components/sections/Tariffs";

export const metadata: Metadata = {
  title: "Tarife 2027 — FASON",
  description:
    "Tarife FASON 2027 pentru coafor, barber, cosmetică, tratamente faciale și corporale, manichiură și pedichiură.",
};

export default function PricesPage() {
  return (
    <>
      <Navigation onHomePage={false} />
      <Tariffs />
      <Footer homePrefix="/" />
    </>
  );
}
