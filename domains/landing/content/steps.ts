import { BadgeCheck, ClipboardList, FolderTree, ListChecks } from "lucide-react";
import type { ProcessStep } from "../types/landing.types";

export const STEPS_SECTION = {
  eyebrow: "Cómo funciona ZEWA",
  title: "De una necesidad administrativa a un proceso completamente trazable.",
  closing: ["Todo conectado.", "Todo organizado.", "Todo con trazabilidad."],
} as const;

export const STEPS: ProcessStep[] = [
  {
    order: 1,
    icon: ClipboardList,
    title: "Gestiona",
    description: "Registra solicitudes, necesidades, documentos y actuaciones.",
  },
  {
    order: 2,
    icon: BadgeCheck,
    title: "Autoriza",
    description: "Identifica responsables, competencias y aprobaciones.",
  },
  {
    order: 3,
    icon: ListChecks,
    title: "Ejecuta",
    description: "Realiza seguimiento a las actividades, contratos y compromisos.",
  },
  {
    order: 4,
    icon: FolderTree,
    title: "Documenta",
    description: "Conserva soportes, evidencias, responsables e historial.",
  },
];
