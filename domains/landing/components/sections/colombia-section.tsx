import { Info } from "lucide-react";
import { COLOMBIA_ITEMS, COLOMBIA_SECTION } from "../../content/colombia";
import { IconTile } from "../icon-tile";
import { Section } from "../section";
import { SectionHeading } from "../section-heading";

export function ColombiaSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow={COLOMBIA_SECTION.eyebrow}
        title={COLOMBIA_SECTION.title}
        subtitle={COLOMBIA_SECTION.text}
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {COLOMBIA_ITEMS.map((item) => (
          <li
            key={item.title}
            className="reveal flex flex-col gap-3 rounded-card border border-line bg-white p-6 shadow-card"
          >
            <IconTile icon={item.icon} />
            <h3 className="type-h4 text-navy">{item.title}</h3>
            <p className="type-small text-ink">{item.description}</p>
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-10 flex max-w-3xl items-start gap-2.5 rounded-lg bg-subtle px-4 py-3 type-small text-ink-soft">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        {COLOMBIA_SECTION.disclaimer}
      </p>
    </Section>
  );
}
