import type { Metadata } from "next";
import { TeamDepartmentPage } from "@/components/sections/TeamDepartmentPage";

export const metadata: Metadata = {
  title: "Beauty — Echipa FASON",
  description:
    "Cosmetică, tratamente faciale și corporale, manichiură și pedichiură la FASON.",
};

export default function BeautyTeamPage() {
  return <TeamDepartmentPage departmentId="beauty" />;
}
