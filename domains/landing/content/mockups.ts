import {
  FileText,
  FolderOpen,
  Gavel,
  LayoutDashboard,
  MessageSquareText,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { StatusLabel } from "../types/landing.types";

// Datos claramente ficticios para los mockups de producto.

export const PROPERTY_NAME = "Conjunto Residencial Los Robles";

export interface SidebarItem {
  icon: LucideIcon;
  label: string;
}

export interface Kpi {
  label: string;
  value: string;
  detail: string;
  status: StatusLabel;
}

export interface ActivityItem {
  initials: string;
  text: string;
  time: string;
  status: StatusLabel;
}

export type StepState = "done" | "current" | "upcoming";

export interface CaseStep {
  date: string;
  title: string;
  evidence: string;
  state: StepState;
}

export interface ContractRow {
  vendor: string;
  object: string;
  due: string;
  status: StatusLabel;
}

export interface DocumentFile {
  name: string;
  meta: string;
  status: StatusLabel;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Gavel, label: "Jurídico" },
  { icon: Wallet, label: "Finanzas" },
  { icon: FolderOpen, label: "Expedientes" },
  { icon: MessageSquareText, label: "PQRS" },
  { icon: FileText, label: "Documentos" },
];

export const DASHBOARD_BUDGET = {
  label: "Presupuesto ejecutado",
  executed: "$142,8 M",
  total: "$208,5 M",
  percent: 68,
};

export const DASHBOARD_KPIS: Kpi[] = [
  {
    label: "Contratos por vencer",
    value: "3",
    detail: "Próximos 30 días",
    status: { label: "Revisar", tone: "warning" },
  },
  {
    label: "Procesos pendientes",
    value: "4",
    detail: "Administrativos en curso",
    status: { label: "En curso", tone: "neutral" },
  },
  {
    label: "PQRS abiertas",
    value: "2",
    detail: "Dentro del término",
    status: { label: "A tiempo", tone: "success" },
  },
];

export const DASHBOARD_DOCUMENTATION = {
  label: "Estado de documentación",
  percent: 92,
  detail: "46 de 50 soportes al día",
};

export const DASHBOARD_ACTIVITY: ActivityItem[] = [
  {
    initials: "AD",
    text: "Póliza de zonas comunes aprobada",
    time: "Hace 2 h",
    status: { label: "Aprobado", tone: "success" },
  },
  {
    initials: "CA",
    text: "Descargos recibidos · Exp. S-04",
    time: "Ayer",
    status: { label: "En plazo", tone: "warning" },
  },
  {
    initials: "TS",
    text: "Orden de compra mantenimiento",
    time: "Lun",
    status: { label: "Registrado", tone: "neutral" },
  },
];

export const SANCTION_CASE = {
  reference: "EXP-S-2025-004",
  title: "Proceso sancionatorio · Convivencia",
  unit: "Unidad 704 · Torre B",
  status: { label: "En descargos", tone: "warning" } as StatusLabel,
};

export const SANCTION_STEPS: CaseStep[] = [
  { date: "10 Abr", title: "Apertura del proceso", evidence: "Informe_porteria.pdf", state: "done" },
  { date: "12 Abr", title: "Requerimiento notificado", evidence: "Notificacion.pdf", state: "done" },
  { date: "17 Abr", title: "Recepción de descargos", evidence: "Pendiente de carga", state: "current" },
  { date: "—", title: "Decisión del consejo", evidence: "Sin iniciar", state: "upcoming" },
];

export const FINANCE = {
  title: "Ejecución presupuestal 2025",
  summary: "$212,4 M de $260,0 M",
};

export const BUDGET_CHAPTERS = [
  { label: "Vigilancia", percent: 84 },
  { label: "Aseo", percent: 71 },
  { label: "Mantenim.", percent: 58 },
  { label: "Servicios", percent: 66 },
  { label: "Seguros", percent: 92 },
];

export const CONTRACTS: ContractRow[] = [
  {
    vendor: "Vigilancia Andina S.A.S.",
    object: "Seguridad 24/7",
    due: "31 Dic 2025",
    status: { label: "Vigente", tone: "success" },
  },
  {
    vendor: "Elevadores del Valle",
    object: "Mantenimiento ascensores",
    due: "15 Jun 2025",
    status: { label: "Vence en 20 d", tone: "warning" },
  },
  {
    vendor: "Aseo Integral Norte",
    object: "Aseo zonas comunes",
    due: "28 Feb 2026",
    status: { label: "Vigente", tone: "success" },
  },
];

export const DOCUMENT_CATEGORIES = [
  { label: "Actas", count: 18 },
  { label: "Contratos", count: 12 },
  { label: "Pólizas", count: 4 },
  { label: "Soportes", count: 126 },
];

export const DOCUMENT_FILES: DocumentFile[] = [
  {
    name: "Acta_asamblea_2025.pdf",
    meta: "v3 · Secretaría",
    status: { label: "Firmado", tone: "success" },
  },
  {
    name: "Poliza_zonas_comunes.pdf",
    meta: "v1 · Administración",
    status: { label: "Vigente", tone: "success" },
  },
  {
    name: "Informe_gestion_marzo.pdf",
    meta: "v2 · Administración",
    status: { label: "En revisión", tone: "warning" },
  },
];
