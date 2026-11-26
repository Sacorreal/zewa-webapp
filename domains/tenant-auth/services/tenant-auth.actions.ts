"use server";

import { redirect } from "next/navigation";
import { type ActionResult, runAction } from "@/lib/actions/action-result";
import { parseInput } from "@/lib/actions/parse-input";
import { forwardedClientHeaders } from "@/lib/api/forwarded-headers.server";
import { zewaApi } from "@/lib/api/zewa-api.server";
import { endSession, startSession } from "@/lib/auth/session.server";
import {
  APP_HOME_PATH,
  type SessionTokens,
  TENANT_SELECTION_PATH,
  TENANT_SESSION,
} from "@/lib/auth/session-tokens";
import { requireAccountSession, withTenantSession } from "@/lib/auth/tenant-session.server";
import { type EmailLoginInput, emailLoginSchema } from "@/lib/validation/credentials";
import { isResidentRole } from "../content/roles";
import type {
  MembershipSummary,
  SelectableTenant,
  TenantLoginResponse,
} from "../types/tenant-auth.types";
import {
  type AdministratorLoginInput,
  administratorLoginSchema,
} from "../validations/administrator-login.schema";
import { selectTenantSchema } from "../validations/select-tenant.schema";

const ACTIVE = "ACTIVE";

/** Acceso del administrador del conjunto. Devuelve la ruta de destino. */
export async function loginAsAdministrator(
  values: AdministratorLoginInput,
): Promise<ActionResult<string>> {
  return runAction(() =>
    openSession("/auth/login/administrator", parseInput(administratorLoginSchema, values)),
  );
}

/** Acceso de residentes y propietarios. Con varios conjuntos, envía a elegir uno. */
export async function loginAsResident(values: EmailLoginInput): Promise<ActionResult<string>> {
  return runAction(() =>
    openSession("/auth/login/resident", parseInput(emailLoginSchema, values)),
  );
}

/** Conjuntos en los que el usuario puede entrar como residente o propietario. */
export async function listSelectableTenants(): Promise<SelectableTenant[]> {
  await requireAccountSession();
  const memberships = await withTenantSession((config) =>
    zewaApi.get<MembershipSummary[]>("/auth/memberships", config).then(({ data }) => data),
  );
  return memberships
    .filter(
      ({ tenantStatus, membershipStatus, roles }) =>
        tenantStatus === ACTIVE && membershipStatus === ACTIVE && roles.some(isResidentRole),
    )
    .map(({ tenantId, tenantName, roles }) => ({
      id: tenantId,
      name: tenantName,
      roles: roles.filter(isResidentRole),
    }));
}

/** Cambia la sesión de cuenta por una del conjunto elegido (zewa-api valida la membresía). */
export async function selectTenant(tenantId: string): Promise<ActionResult<string>> {
  return runAction(async () => {
    const id = parseInput(selectTenantSchema, tenantId);
    const tokens = await withTenantSession((config) =>
      zewaApi
        .post<SessionTokens>("/auth/tenant-session", { tenantId: id }, config)
        .then(({ data }) => data),
    );
    await startSession(TENANT_SESSION, tokens);
    return TENANT_SESSION.homePath;
  });
}

export async function logout(): Promise<void> {
  await endSession(TENANT_SESSION);
  redirect(APP_HOME_PATH);
}

async function openSession(path: string, credentials: object): Promise<string> {
  const { data } = await zewaApi.post<TenantLoginResponse>(path, credentials, {
    headers: await forwardedClientHeaders(),
  });
  await startSession(TENANT_SESSION, data.tokens);
  return data.tokens.scope === "tenant" ? TENANT_SESSION.homePath : TENANT_SELECTION_PATH;
}
