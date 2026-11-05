import { SectionLabel } from "../ui/SectionLabel";

const notes = [
  {
    title: "Vino cu ideile tale",
    text: "O fotografie, un detaliu sau o idee ne ajută să înțelegem direcția în care vrei să mergi.",
  },
  {
    title: "Alegem împreună",
    text: "Discutăm despre ce îți dorești și despre rutina ta de îngrijire, înainte de a alege forma, nuanța sau tratamentul.",
  },
  {
    title: "Fiecare persoană e diferită",
    text: "Recomandările noastre pornesc de la individualitatea ta. Tehnica și creativitatea lucrează împreună pentru un rezultat personalizat.",
  },
];

export function GoodToKnow() {
  return (
    <section
      id="bine-de-stiut"
      aria-labelledby="good-to-know-heading"
      className="page-padding bg-cream pb-20 md:pb-28"
    >
      <h2 id="good-to-know-heading" className="mb-8">
        <SectionLabel as="span">Bine de știut</SectionLabel>
      </h2>
      <div className="grid gap-8 md:grid-cols-3 md:gap-12">
        {notes.map((note) => (
          <article
            key={note.title}
            data-reveal
            className="min-w-0 border-t border-ink/20 pt-6"
          >
            <h3 className="text-[1.25rem] leading-[1.3] tracking-[-0.035em]">
              {note.title}
            </h3>
            <p className="mt-4 max-w-[42ch] text-[14px] leading-[1.85] text-ink/70">
              {note.text.replace(/ (\S+)$/, "\u00a0$1")}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
