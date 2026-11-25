import Link from "next/link";
import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";

export function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-5 rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
      <legend className="sr-only">{title}</legend>
      <h2 aria-hidden="true" className="type-h4 text-navy">
        {title}
      </h2>
      {children}
    </fieldset>
  );
}

export function FormActions({ cancelHref, children }: { cancelHref: string; children: ReactNode }) {
  return (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      <Link href={cancelHref} className={buttonVariants({ variant: "outline" })}>
        Cancelar
      </Link>
      {children}
    </div>
  );
}
