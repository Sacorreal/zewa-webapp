"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { unwrapAction } from "@/lib/actions/unwrap-action";
import { ADMIN_HOME_PATH } from "@/lib/auth/session-tokens";
import { login } from "../services/auth.actions";
import type { LoginInput } from "../validations/login.schema";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (values: LoginInput) => unwrapAction(login(values)),
    onSuccess: () => router.replace(ADMIN_HOME_PATH),
  });
}
