import { cn } from "@/lib/utils";
import { FEATURES, FEATURES_SECTION } from "../../content/features";
import { SECTION_IDS } from "../../content/navigation";
import type { Feature } from "../../types/landing.types";
import { IconTile } from "../icon-tile";
import { Section } from "../section";
import { SectionHeading } from "../section-heading";

function FeatureCard({ feature }: { feature: Feature }) {
  const { icon, title, description, highlighted } = feature;
  return (
    <li
      className={cn(
        "reveal group flex flex-col gap-3 rounded-card border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover",
        highlighted
          ? "border-petrol/25 bg-gradient-to-b from-sage/70 to-white shadow-card"
          : "border-line bg-white",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <IconTile icon={icon} tone={highlighted ? "navy" : "sage"} />
        {highlighted && (
          <span className="rounded-full border border-petrol/20 bg-white px-2.5 py-0.5 type-eyebrow text-petrol">
            {FEATURES_SECTION.highlightLabel}
          </span>
        )}
      </div>
      <h3 className={cn(highlighted ? "type-h4" : "font-heading text-base font-semibold", "text-navy")}>
        {title}
      </h3>
      <p className="type-small text-ink">{description}</p>
    </li>
  );
}

export function FeaturesSection() {
  const highlighted = FEATURES.filter((feature) => feature.highlighted);
  const regular = FEATURES.filter((feature) => !feature.highlighted);

  return (
    <Section id={SECTION_IDS.features}>
      <SectionHeading eyebrow={FEATURES_SECTION.eyebrow} title={FEATURES_SECTION.title} />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {highlighted.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </ul>
      <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {regular.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </ul>
    </Section>
  );
}
