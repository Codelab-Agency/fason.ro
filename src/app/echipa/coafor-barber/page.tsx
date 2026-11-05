import type { Metadata } from "next";
import { TeamDepartmentPage } from "@/components/sections/TeamDepartmentPage";

export const metadata: Metadata = {
  title: "Coafor & Barber — Echipa FASON",
  description:
    "Echipa de hairstyling și îngrijire a părului FASON, sub direcția creativă a Cristinei Gramma.",
};

export default function HairTeamPage() {
  return <TeamDepartmentPage departmentId="coafor-barber" />;
}
