"use client";

import { useMutation } from "@tanstack/react-query";
import { unwrapAction } from "@/lib/actions/unwrap-action";
import { acceptInvitation } from "../services/invitations.actions";
import type { AcceptInvitationInput } from "../validations/activation.schema";

export function useAcceptInvitation() {
  return useMutation({
    mutationFn: (values: AcceptInvitationInput) => unwrapAction(acceptInvitation(values)),
  });
}
