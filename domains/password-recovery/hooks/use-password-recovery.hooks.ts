"use client";

import { useMutation } from "@tanstack/react-query";
import type { ActionResult } from "@/lib/actions/action-result";
import { unwrapAction } from "@/lib/actions/unwrap-action";
import {
  confirmPasswordReset,
  requestAdministratorReset,
  requestResidentReset,
} from "../services/password-recovery.actions";

function useActionMutation<Input, Output>(action: (input: Input) => Promise<ActionResult<Output>>) {
  return useMutation({ mutationFn: (input: Input) => unwrapAction(action(input)) });
}

export const useAdministratorResetRequest = () => useActionMutation(requestAdministratorReset);

export const useResidentResetRequest = () => useActionMutation(requestResidentReset);

export const useConfirmPasswordReset = () => useActionMutation(confirmPasswordReset);
