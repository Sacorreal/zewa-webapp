import { TRANSPARENCY_SECTION } from "../../content/transparency";
import { ActivityTimelineMockup } from "../mockups/activity-timeline-mockup";
import { Section } from "../section";
import { SectionHeading } from "../section-heading";

export function TransparencySection() {
  return (
    <Section tone="navy" className="relative overflow-hidden">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <SectionHeading
            eyebrow={TRANSPARENCY_SECTION.eyebrow}
            title={TRANSPARENCY_SECTION.title}
            align="left"
            inverted
          />
          <p className="type-lead text-white/75">{TRANSPARENCY_SECTION.text}</p>
        </div>
        <div className="reveal lg:col-span-7">
          <ActivityTimelineMockup />
        </div>
      </div>
    </Section>
  );
}
