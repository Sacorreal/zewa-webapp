import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SECTION_IDS } from "../../content/navigation";
import { PILLARS, PILLARS_SECTION } from "../../content/pillars";
import type { Pillar } from "../../types/landing.types";
import { CheckList } from "../check-list";
import { DocumentsMockup } from "../mockups/documents-mockup";
import { FinanceMockup } from "../mockups/finance-mockup";
import { SanctionCaseMockup } from "../mockups/sanction-case-mockup";
import { Section } from "../section";
import { SectionHeading } from "../section-heading";

interface PillarRowProps {
  pillar: Pillar;
  visual: ReactNode;
  reversed?: boolean;
}

function PillarRow({ pillar, visual, reversed = false }: PillarRowProps) {
  return (
    <article
      id={pillar.id}
      className="reveal grid grid-cols-1 items-center gap-10 rounded-panel border border-line bg-white p-6 shadow-card sm:p-10 lg:grid-cols-2 lg:gap-14"
    >
      <div className={cn("flex flex-col gap-4", reversed && "lg:order-2")}>
        <span className="type-eyebrow text-petrol">{pillar.eyebrow}</span>
        <h3 className="type-h3 text-navy">{pillar.title}</h3>
        <p className="type-lead text-ink">{pillar.description}</p>
        <CheckList items={pillar.capabilities} className="mt-2" />
      </div>
      <div className={cn(reversed && "lg:order-1")}>{visual}</div>
    </article>
  );
}

export function ValuePillarsSection() {
  return (
    <Section id={SECTION_IDS.product}>
      <SectionHeading {...PILLARS_SECTION} />

      <div className="mt-14 flex flex-col gap-8">
        <PillarRow pillar={PILLARS.legal} visual={<SanctionCaseMockup />} />
        <PillarRow pillar={PILLARS.financial} visual={<FinanceMockup />} reversed />
        <PillarRow pillar={PILLARS.documents} visual={<DocumentsMockup />} />
      </div>
    </Section>
  );
}
