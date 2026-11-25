"use server";

import { revalidatePath } from "next/cache";
import { type ActionResult, runAction } from "@/lib/actions/action-result";
import { ApiError } from "@/lib/api/api-error";
import { optionalFile, parseInput } from "@/lib/actions/parse-input";
import { zewaApi } from "@/lib/api/zewa-api.server";
import { requireAdminSession, withAdminSession } from "@/lib/auth/admin-session.server";
import type {
  ClientCreated,
  ClientDetail,
  ClientList,
  ClientListQuery,
  ClientStats,
  ClientSummary,
  InvitationDelivery,
} from "../types/client.types";
import {
  changeStatusSchema,
  clientIdSchema,
  createClientSchema,
  updateClientSchema,
} from "../validations/client.schema";

/**
 * Puente BFF entre el panel global y zewa-api. Cada función re-verifica la
 * sesión (las Server Actions son endpoints públicos) y nunca expone el token.
 */

const CLIENTS_PATH = "/admin/clients";

function assertClientId(id: string): void {
  parseInput(clientIdSchema, id);
}

function refreshAdminViews(): void {
  revalidatePath("/admin", "layout");
}

// ── Lecturas (Server Components) ──

export async function listClients(query: ClientListQuery): Promise<ClientList> {
  await requireAdminSession();
  return withAdminSession((config) =>
    zewaApi.get<ClientList>(CLIENTS_PATH, { ...config, params: query }).then(({ data }) => data),
  );
}

export async function getClientStats(): Promise<ClientStats> {
  await requireAdminSession();
  return withAdminSession((config) =>
    zewaApi.get<ClientStats>(`${CLIENTS_PATH}/stats`, config).then(({ data }) => data),
  );
}

/** `null` si el id no corresponde a un cliente (la página muestra 404). */
export async function getClient(id: string): Promise<ClientDetail | null> {
  await requireAdminSession();
  if (!clientIdSchema.safeParse(id).success) return null;
  try {
    return await withAdminSession((config) =>
      zewaApi.get<ClientDetail>(`${CLIENTS_PATH}/${id}`, config).then(({ data }) => data),
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

// ── Mutaciones ──

export async function createClient(formData: FormData): Promise<ActionResult<ClientCreated>> {
  return runAction(async () => {
    const input = parseInput(createClientSchema, {
      name: formData.get("name"),
      taxId: formData.get("taxId"),
      administratorEmail: formData.get("administratorEmail"),
      logo: optionalFile(formData.get("logo")),
    });

    const body = new FormData();
    body.set("name", input.name);
    body.set("taxId", input.taxId);
    body.set("administratorEmail", input.administratorEmail);
    if (input.logo) body.set("logo", input.logo);

    const created = await withAdminSession((config) =>
      zewaApi.post<ClientCreated>(CLIENTS_PATH, body, config).then(({ data }) => data),
    );
    refreshAdminViews();
    return created;
  });
}

export async function updateClient(
  id: string,
  formData: FormData,
): Promise<ActionResult<ClientSummary>> {
  return runAction(async () => {
    assertClientId(id);
    const input = parseInput(updateClientSchema, {
      name: formData.get("name"),
      taxId: formData.get("taxId"),
      logo: optionalFile(formData.get("logo")),
      removeLogo: formData.get("removeLogo") === "true",
    });

    const body = new FormData();
    body.set("name", input.name);
    body.set("taxId", input.taxId);
    if (input.logo) body.set("logo", input.logo);
    else if (input.removeLogo) body.set("removeLogo", "true");

    const updated = await withAdminSession((config) =>
      zewaApi.patch<ClientSummary>(`${CLIENTS_PATH}/${id}`, body, config).then(({ data }) => data),
    );
    refreshAdminViews();
    return updated;
  });
}

export async function changeClientStatus(
  id: string,
  status: "ACTIVE" | "SUSPENDED",
): Promise<ActionResult<ClientSummary>> {
  return runAction(async () => {
    assertClientId(id);
    const nextStatus = parseInput(changeStatusSchema, status);
    const updated = await withAdminSession((config) =>
      zewaApi
        .patch<ClientSummary>(`${CLIENTS_PATH}/${id}/status`, { status: nextStatus }, config)
        .then(({ data }) => data),
    );
    refreshAdminViews();
    return updated;
  });
}

export async function resendInvitation(id: string): Promise<ActionResult<InvitationDelivery>> {
  return runAction(async () => {
    assertClientId(id);
    const delivery = await withAdminSession((config) =>
      zewaApi
        .post<InvitationDelivery>(`${CLIENTS_PATH}/${id}/resend-invitation`, undefined, config)
        .then(({ data }) => data),
    );
    refreshAdminViews();
    return delivery;
  });
}

