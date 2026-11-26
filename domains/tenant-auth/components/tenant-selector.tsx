"use client";

import { Building2, ChevronRight } from "lucide-react";
import { FormAlert } from "@/components/shared/form-alert";
import { roleLabel } from "../content/roles";
import { useSelectTenant } from "../hooks/use-tenant-auth.hooks";
import type { SelectableTenant } from "../types/tenant-auth.types";

/** Lista de conjuntos del usuario; al elegir uno se abre su sesión. */
export function TenantSelector({ tenants }: { tenants: SelectableTenant[] }) {
  const selection = useSelectTenant();
  const pending = selection.isPending || selection.isSuccess;

  return (
    <div className="flex flex-col gap-4">
      <FormAlert message={selection.error?.message} />
      <ul className="flex flex-col gap-2">
        {tenants.map((tenant) => (
          <li key={tenant.id}>
            <button
              type="button"
              disabled={pending}
              onClick={() => selection.mutate(tenant.id)}
              className="flex w-full items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-left transition-colors hover:border-petrol hover:bg-subtle focus-visible:outline-2 focus-visible:outline-petrol disabled:opacity-60"
            >
              <Building2 className="size-5 shrink-0 text-petrol" aria-hidden="true" />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-medium text-navy">{tenant.name}</span>
                <span className="text-xs text-ink-soft">
                  {tenant.roles.map(roleLabel).join(" · ")}
                </span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-mist" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
