"use client";

import { Building2, House, type LucideIcon } from "lucide-react";
import { type ComponentType, type KeyboardEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { LOGIN_MODE_CONTENT, LOGIN_MODE_QUERY_PARAM } from "../content/login-modes";
import { LOGIN_MODES, type LoginMode } from "../types/tenant-auth.types";
import { AdministratorLoginForm } from "./administrator-login-form";
import { ResidentLoginForm } from "./resident-login-form";

const MODE_ICONS: Record<LoginMode, LucideIcon> = {
  administrador: Building2,
  residente: House,
};

const MODE_FORMS: Record<LoginMode, ComponentType> = {
  administrador: AdministratorLoginForm,
  residente: ResidentLoginForm,
};

const tabId = (mode: LoginMode) => `login-tab-${mode}`;
const panelId = (mode: LoginMode) => `login-panel-${mode}`;

/** Elección del tipo de acceso (pestañas accesibles) y su formulario. */
export function LoginPanel({ initialMode }: { initialMode: LoginMode }) {
  const [mode, setMode] = useState<LoginMode>(initialMode);
  const Form = MODE_FORMS[mode];

  const selectMode = (next: LoginMode) => {
    setMode(next);
    const url = new URL(window.location.href);
    url.searchParams.set(LOGIN_MODE_QUERY_PARAM, next);
    window.history.replaceState(null, "", url);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const step = event.key === "ArrowRight" ? 1 : -1;
    const index = (LOGIN_MODES.indexOf(mode) + step + LOGIN_MODES.length) % LOGIN_MODES.length;
    const next = LOGIN_MODES[index];
    selectMode(next);
    document.getElementById(tabId(next))?.focus();
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        role="tablist"
        aria-label="Tipo de acceso"
        onKeyDown={handleKeyDown}
        className="grid grid-cols-2 gap-1 rounded-xl bg-subtle p-1"
      >
        {LOGIN_MODES.map((option) => {
          const Icon = MODE_ICONS[option];
          const selected = option === mode;
          return (
            <button
              key={option}
              id={tabId(option)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId(option)}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectMode(option)}
              className={cn(
                "flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 py-2 text-center text-sm font-medium text-ink-soft transition-colors hover:text-navy focus-visible:outline-2 focus-visible:outline-petrol",
                selected && "bg-white text-navy shadow-sm",
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              {LOGIN_MODE_CONTENT[option].label}
            </button>
          );
        })}
      </div>

      <div
        id={panelId(mode)}
        role="tabpanel"
        aria-labelledby={tabId(mode)}
        className="flex flex-col gap-5"
      >
        <p className="type-small text-ink-soft">{LOGIN_MODE_CONTENT[mode].description}</p>
        <Form key={mode} />
      </div>
    </div>
  );
}
