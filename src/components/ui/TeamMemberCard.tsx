import Image from "next/image";
import type { TeamMember } from "@/lib/salon";
import { PhotoReveal } from "../effects/PhotoReveal";
import { Logo } from "./Logo";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <figure className="min-w-0" data-team-member={member.id}>
      <PhotoReveal className="relative aspect-[0.8] overflow-hidden bg-sand outline -outline-offset-1 outline-black/10">
        {member.image ? (
          <Image
            src={member.image}
            alt={
              member.demonstrative
                ? `Portret generat pentru profilul demonstrativ ${member.name}`
                : `${member.name}, ${member.role}`
            }
            fill
            sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(33.333vw - 43px), 30vw"
            className="object-cover"
            style={{ objectPosition: member.imagePosition ?? "50% 30%" }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <Logo
              dark
              decorative
              className="h-auto w-full max-w-[180px] opacity-35"
            />
          </div>
        )}
      </PhotoReveal>
      <figcaption data-photo-caption className="pt-5">
        <h3 className="text-[clamp(1.6rem,2.5vw,2.5rem)] leading-[1.15] tracking-[-0.045em] [overflow-wrap:anywhere]">
          {member.name}
        </h3>
        <p className="mt-2 text-[0.75rem] leading-[1.65] font-medium text-accent">
          {member.role}
        </p>
        <p className="mt-2 max-w-[30ch] text-[0.8125rem] leading-[1.75] text-ink/65">
          {member.focus}
        </p>
      </figcaption>
    </figure>
  );
}
