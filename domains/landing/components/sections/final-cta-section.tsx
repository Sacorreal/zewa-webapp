import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FINAL_CTA } from "../../content/final-cta";
import { ROUTES } from "../../content/navigation";

export function FinalCtaSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-5 lg:px-8">
        <div className="reveal relative overflow-hidden rounded-panel bg-gradient-to-br from-navy via-navy to-petrol-dark px-6 py-14 text-center shadow-pop sm:px-12 lg:py-20">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgb(154_242_230/0.18),transparent_55%)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <h2 className="type-h2 text-white">{FINAL_CTA.title}</h2>
            <p className="type-lead text-white/80">{FINAL_CTA.text}</p>
            <Link
              href={ROUTES.demo}
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-2 bg-white text-navy hover:bg-sage hover:text-navy",
              )}
            >
              {FINAL_CTA.button}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
            <p className="type-small text-white/70">{FINAL_CTA.secondaryText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
