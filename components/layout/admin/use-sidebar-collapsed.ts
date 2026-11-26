"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "zewa:admin-sidebar-collapsed";
const listeners = new Set<() => void>();
/** Respaldo cuando el navegador bloquea `localStorage`: la preferencia dura lo que dure la pestaña. */
let inMemoryCollapsed = false;

function readCollapsed(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return inMemoryCollapsed;
  }
}

function writeCollapsed(collapsed: boolean): void {
  inMemoryCollapsed = collapsed;
  try {
    window.localStorage.setItem(STORAGE_KEY, String(collapsed));
  } catch {
    // Se conserva en memoria (`inMemoryCollapsed`).
  }
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void): () => void {
  listeners.add(notify);
  window.addEventListener("storage", notify);
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", notify);
  };
}

const getServerSnapshot = () => false;

/** Preferencia del usuario (por navegador) de barra lateral colapsada en escritorio. */
export function useSidebarCollapsed() {
  const collapsed = useSyncExternalStore(subscribe, readCollapsed, getServerSnapshot);
  const toggle = useCallback(() => writeCollapsed(!readCollapsed()), []);
  return { collapsed, toggle };
}
