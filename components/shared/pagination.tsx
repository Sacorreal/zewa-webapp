import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  /** Arma el enlace de una página conservando los demás filtros. */
  hrefFor: (page: number) => string;
}

export function Pagination({ page, pageSize, total, hrefFor }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <nav
      aria-label="Paginación"
      className="flex flex-col items-center justify-between gap-3 text-sm text-ink-soft sm:flex-row"
    >
      <p>
        {from}–{to} de {total}
      </p>
      <div className="flex items-center gap-2">
        <PageLink href={hrefFor(page - 1)} disabled={page <= 1} label="Página anterior">
          <ChevronLeft aria-hidden="true" />
        </PageLink>
        <span aria-current="page">
          Página {Math.min(page, totalPages)} de {totalPages}
        </span>
        <PageLink href={hrefFor(page + 1)} disabled={page >= totalPages} label="Página siguiente">
          <ChevronRight aria-hidden="true" />
        </PageLink>
      </div>
    </nav>
  );
}

function PageLink({
  href,
  disabled,
  label,
  children,
}: {
  href: string;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  const className = cn(buttonVariants({ variant: "outline", size: "icon-sm" }), "bg-white");
  if (disabled) {
    return (
      <span aria-disabled="true" aria-label={label} className={cn(className, "pointer-events-none opacity-40")}>
        {children}
      </span>
    );
  }
  return (
    <Link href={href} aria-label={label} className={className} scroll={false}>
      {children}
    </Link>
  );
}
