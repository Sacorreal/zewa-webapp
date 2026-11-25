import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckListProps {
  items: readonly string[];
  className?: string;
}

export function CheckList({ items, className }: CheckListProps) {
  return (
    <ul className={cn("grid gap-x-6 gap-y-2.5 sm:grid-cols-2", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 type-body text-ink">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sage text-petrol">
            <Check className="size-3" strokeWidth={3} aria-hidden="true" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
