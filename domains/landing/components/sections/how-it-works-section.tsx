import { SECTION_IDS } from "../../content/navigation";
import { STEPS, STEPS_SECTION } from "../../content/steps";
import { Section } from "../section";
import { SectionHeading } from "../section-heading";

export function HowItWorksSection() {
  return (
    <Section id={SECTION_IDS.howItWorks} tone="subtle">
      <SectionHeading eyebrow={STEPS_SECTION.eyebrow} title={STEPS_SECTION.title} />

      <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
        <span
          className="absolute left-6 top-6 h-[calc(100%-3rem)] w-0.5 bg-gradient-to-b from-petrol via-petrol/40 to-line md:left-[12.5%] md:right-[12.5%] md:h-0.5 md:w-auto md:bg-gradient-to-r"
          aria-hidden="true"
        />
        {STEPS.map(({ order, icon: Icon, title, description }) => (
          <li key={order} className="reveal relative flex gap-5 md:flex-col md:items-center md:text-center">
            <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-white text-petrol shadow-card">
              <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
                {order}
              </span>
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="type-h4 text-navy">{title}</h3>
              <p className="type-body text-ink">{description}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-16 flex flex-wrap justify-center gap-x-3 gap-y-1 text-center font-heading text-lg font-bold text-navy">
        {STEPS_SECTION.closing.map((phrase, index) => (
          <span key={phrase} className={index === STEPS_SECTION.closing.length - 1 ? "text-petrol" : undefined}>
            {phrase}
          </span>
        ))}
      </p>
    </Section>
  );
}
