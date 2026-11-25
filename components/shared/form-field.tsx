import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

/** Etiqueta, control, ayuda y error accesible (el control usa `aria-describedby={id}-message`). */
export function FormField({ id, label, error, hint, children }: FormFieldProps) {
  const message = error ?? hint;
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {message && (
        <p
          id={`${id}-message`}
          role={error ? "alert" : undefined}
          className={error ? "text-xs text-destructive" : "text-xs text-ink-soft"}
        >
          {message}
        </p>
      )}
    </div>
  );
}

/** Props de accesibilidad para el control de un `FormField`. */
export function fieldA11y(id: string, error?: string, hint?: string) {
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error || hint ? `${id}-message` : undefined,
  } as const;
}
