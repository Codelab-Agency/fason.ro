export function RevealWords({ text }: { text: string }) {
  return text.split(" ").map((word, index, words) => (
    <span key={`${word}-${index}`}>
      <span className="-mx-[0.04em] -mb-[0.17em] inline-flex max-w-full overflow-hidden px-[0.04em] pb-[0.17em] align-baseline">
        <span
          data-scroll-word
          className="inline-block min-w-0 [overflow-wrap:anywhere]"
        >
          {word}
        </span>
      </span>
      {index < words.length - 1 ? " " : null}
    </span>
  ));
}
