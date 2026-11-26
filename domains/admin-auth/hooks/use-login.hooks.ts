"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { unwrapAction } from "@/lib/actions/unwrap-action";
import { ADMIN_SESSION } from "@/lib/auth/session-tokens";
import type { EmailLoginInput } from "@/lib/validation/credentials";
import { login } from "../services/auth.actions";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (values: EmailLoginInput) => unwrapAction(login(values)),
    onSuccess: () => router.replace(ADMIN_SESSION.homePath),
  });
}
