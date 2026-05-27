const ITEMS = [
  "Cambridge International School",
  "British Council · Best IGCSE School Ghana 2022/23",
  "AS & A Level Centre",
  "IGCSE",
  "B.E.C.E",
  "10+ Nationalities",
  "Christian Values",
  "Boarding Available",
];

export function TrustMarquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <section className="border-y border-[var(--border)] bg-[var(--ivory)] overflow-hidden">
      <div className="mx-auto max-w-[1250px] overflow-hidden px-6">
        <div className="flex animate-marquee whitespace-nowrap py-6">
          {row.map((it, i) => (
            <div key={i} className="flex items-center gap-10 px-10">
              <span className="text-[var(--ink-soft)] text-sm uppercase tracking-[0.22em]">{it}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--gold)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
