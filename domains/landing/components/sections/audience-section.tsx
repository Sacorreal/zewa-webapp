import { AUDIENCE_SECTION, AUDIENCES } from "../../content/audiences";
import { SECTION_IDS } from "../../content/navigation";
import { IconTile } from "../icon-tile";
import { Section } from "../section";
import { SectionHeading } from "../section-heading";

export function AudienceSection() {
  return (
    <Section id={SECTION_IDS.audience} tone="subtle">
      <SectionHeading {...AUDIENCE_SECTION} />

      <ul className="mt-14 grid gap-5 md:grid-cols-3">
        {AUDIENCES.map((audience) => (
          <li
            key={audience.title}
            className="reveal flex flex-col gap-4 rounded-card border border-line bg-white p-7 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card-hover"
          >
            <IconTile icon={audience.icon} tone="navy" />
            <h3 className="type-h3 text-navy">{audience.title}</h3>
            <p className="type-body text-ink">{audience.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
