"use client";

import type { ComponentType } from "react";
import { LOGIN_MODE_DESCRIPTIONS } from "../content/login-modes";
import type { LoginMode } from "../types/tenant-auth.types";
import { AccessModePanel } from "./access-mode-panel";
import { AdministratorLoginForm } from "./administrator-login-form";
import { ResidentLoginForm } from "./resident-login-form";

const LOGIN_FORMS: Record<LoginMode, ComponentType> = {
  administrador: AdministratorLoginForm,
  residente: ResidentLoginForm,
};

/** Elección del tipo de acceso y su formulario de inicio de sesión. */
export function LoginPanel({ initialMode }: { initialMode: LoginMode }) {
  return (
    <AccessModePanel
      initialMode={initialMode}
      forms={LOGIN_FORMS}
      descriptions={LOGIN_MODE_DESCRIPTIONS}
    />
  );
}
