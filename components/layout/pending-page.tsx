import Link from "next/link";
import { ArrowLeft, Hourglass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

interface PendingPageProps {
  title: string;
  description: string;
}

export function PendingPage({ title, description }: PendingPageProps) {
  return (
    <section className="flex flex-1 items-center bg-subtle px-5 py-24 lg:px-8">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-sage text-petrol">
          <Hourglass className="size-5" aria-hidden="true" />
        </span>
        <span className="type-eyebrow text-petrol">En preparación</span>
        <h1 className="type-h2 text-navy">{title}</h1>
        <p className="type-lead text-ink">{description}</p>
        <Link href="/" className={buttonVariants({ variant: "outline", size: "lg" })}>
          <ArrowLeft data-icon="inline-start" aria-hidden="true" />
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
