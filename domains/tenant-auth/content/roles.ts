export const RESIDENT_ROLES: readonly string[] = ["RESIDENTE", "PROPIETARIO"];

const ROLE_LABELS: Record<string, string> = {
  ADMINISTRADOR: "Administrador",
  RESIDENTE: "Residente",
  PROPIETARIO: "Propietario",
};

export function roleLabel(role: string): string {
  return ROLE_LABELS[role] ?? role;
}

export function isResidentRole(role: string): boolean {
  return RESIDENT_ROLES.includes(role);
}
