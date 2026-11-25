import { PROBLEM_SECTION, PROBLEMS } from "../../content/problems";
import { IconTile } from "../icon-tile";
import { Section } from "../section";
import { SectionHeading } from "../section-heading";

/** Representación sutil de información desconectada: fragmentos sueltos sin enlace entre sí. */
function DisconnectedPattern() {
  return (
    <div className="mt-auto flex items-center gap-1.5 pt-6" aria-hidden="true">
      <span className="h-1.5 w-8 rounded-full bg-line-strong" />
      <span className="h-1.5 w-3 rounded-full bg-line" />
      <span className="h-px w-4 border-t border-dashed border-line-strong" />
      <span className="h-1.5 w-6 rounded-full bg-line-strong" />
      <span className="h-px w-4 border-t border-dashed border-line-strong" />
      <span className="h-1.5 w-4 rounded-full bg-warning/50" />
    </div>
  );
}

export function ProblemSection() {
  return (
    <Section tone="subtle">
      <SectionHeading {...PROBLEM_SECTION} />
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PROBLEMS.map((problem) => (
          <li
            key={problem.title}
            className="reveal flex flex-col gap-4 rounded-card border border-line bg-white p-6 shadow-card"
          >
            <IconTile icon={problem.icon} tone="navy" />
            <h3 className="type-h4 text-navy">{problem.title}</h3>
            <p className="type-body text-ink">{problem.description}</p>
            <DisconnectedPattern />
          </li>
        ))}
      </ul>
    </Section>
  );
}
