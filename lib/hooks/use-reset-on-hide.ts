"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Ejecuta `reset` cuando el componente deja de mostrarse. Con `cacheComponents`,
 * Next.js oculta las rutas con `<Activity>` en vez de desmontarlas, así que el
 * estado (valores del formulario, mutaciones) sobrevive a la navegación. El
 * cleanup de `useLayoutEffect` corre al ocultarse, antes de que pueda verse.
 */
export function useResetOnHide(reset: () => void) {
  const resetRef = useRef(reset);

  useLayoutEffect(() => {
    resetRef.current = reset;
  });

  useLayoutEffect(() => () => resetRef.current(), []);
}
