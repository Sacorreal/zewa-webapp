"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CLIENT_STATUS_LABELS } from "../content/client-labels";
import { CLIENT_STATUSES, type ClientSort } from "../types/client.types";

const ALL_STATUSES = "ALL";
const SEARCH_DEBOUNCE_MS = 350;

const STATUS_ITEMS = [
  { value: ALL_STATUSES, label: "Todos los estados" },
  ...CLIENT_STATUSES.map((status) => ({ value: status, label: CLIENT_STATUS_LABELS[status].label })),
];

const SORT_ITEMS: { value: ClientSort; label: string }[] = [
  { value: "createdAt:desc", label: "Más recientes" },
  { value: "createdAt:asc", label: "Más antiguos" },
];

/** Búsqueda, estado y orden del listado, reflejados en la URL (enlazable y compartible). */
export function ClientsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  function updateQuery(changes: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(changes)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    params.delete("page");
    startTransition(() => router.replace(`${pathname}?${params.toString()}`, { scroll: false }));
  }

  useEffect(() => {
    if (search === (searchParams.get("search") ?? "")) return;
    const timer = setTimeout(() => updateQuery({ search: search.trim() || null }), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo reacciona al texto escrito
  }, [search]);

  return (
    <div
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
      aria-busy={pending}
      role="search"
    >
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-soft"
          aria-hidden="true"
        />
        <Input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por nombre o NIT"
          aria-label="Buscar clientes por nombre o NIT"
          className="bg-white pl-9"
        />
      </div>
      <Select
        items={STATUS_ITEMS}
        value={searchParams.get("status") ?? ALL_STATUSES}
        onValueChange={(value) => updateQuery({ status: value === ALL_STATUSES ? null : String(value) })}
      >
        <SelectTrigger className="w-full bg-white sm:w-56" aria-label="Filtrar por estado">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUS_ITEMS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        items={SORT_ITEMS}
        value={searchParams.get("sort") ?? SORT_ITEMS[0].value}
        onValueChange={(value) => updateQuery({ sort: String(value) })}
      >
        <SelectTrigger className="w-full bg-white sm:w-44" aria-label="Ordenar por fecha de creación">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_ITEMS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
