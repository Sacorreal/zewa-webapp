import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { HERO } from "../../content/hero";
import { ROUTES, SECTION_IDS } from "../../content/navigation";
import { DashboardMockup } from "../mockups/dashboard-mockup";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid w-full grid-cols-1 max-w-[1280px] items-center gap-14 px-5 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <span className="inline-flex items-center gap-2 self-start rounded-full border border-petrol/20 bg-sage px-3 py-1">
            <span className="size-1.5 rounded-full bg-petrol" aria-hidden="true" />
            <span className="type-eyebrow text-petrol">{HERO.eyebrow}</span>
          </span>

          <h1 className="type-display text-navy">
            {HERO.title} <span className="text-petrol">{HERO.titleAccent}</span>
          </h1>

          <p className="max-w-xl type-lead text-ink">{HERO.subtitle}</p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={ROUTES.demo} className={buttonVariants({ size: "lg" })}>
              {HERO.primaryCta}
              <ArrowRight
                data-icon="inline-end"
                className="transition-transform group-hover/button:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href={`#${SECTION_IDS.product}`}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {HERO.secondaryCta}
            </Link>
          </div>

          <ul className="grid gap-3 border-t border-line pt-6 sm:grid-cols-3">
            {HERO.attributes.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm font-medium text-ink">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sage text-petrol">
                  <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative isolate lg:col-span-6">
          <div
            className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-sage via-petrol/5 to-transparent blur-2xl"
            aria-hidden="true"
          />
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
