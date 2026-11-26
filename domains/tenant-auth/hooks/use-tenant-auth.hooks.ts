"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { ActionResult } from "@/lib/actions/action-result";
import { unwrapAction } from "@/lib/actions/unwrap-action";
import { loginAsAdministrator, loginAsResident, selectTenant } from "../services/tenant-auth.actions";

/** Ejecuta una acción que abre una sesión y navega a la ruta que devuelve. */
function useSessionMutation<Input>(action: (input: Input) => Promise<ActionResult<string>>) {
  const router = useRouter();

  return useMutation({
    mutationFn: (input: Input) => unwrapAction(action(input)),
    onSuccess: (destination) => router.replace(destination),
  });
}

export const useAdministratorLogin = () => useSessionMutation(loginAsAdministrator);

export const useResidentLogin = () => useSessionMutation(loginAsResident);

export const useSelectTenant = () => useSessionMutation(selectTenant);
