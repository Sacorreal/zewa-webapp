"use client";

import type { ComponentType } from "react";
import { AccessModePanel } from "@/domains/tenant-auth/components/access-mode-panel";
import type { LoginMode } from "@/domains/tenant-auth/types/tenant-auth.types";
import { RECOVERY_DESCRIPTIONS } from "../content/audience";
import { AdministratorRecoveryForm } from "./administrator-recovery-form";
import { ResidentRecoveryForm } from "./resident-recovery-form";

const RECOVERY_FORMS: Record<LoginMode, ComponentType> = {
  administrador: AdministratorRecoveryForm,
  residente: ResidentRecoveryForm,
};

/** Solicitud del enlace de recuperación según el tipo de acceso. */
export function ForgotPasswordPanel({ initialMode }: { initialMode: LoginMode }) {
  return (
    <AccessModePanel
      initialMode={initialMode}
      forms={RECOVERY_FORMS}
      descriptions={RECOVERY_DESCRIPTIONS}
    />
  );
}
