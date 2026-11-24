import { FileSpreadsheet, FolderOpen, PiggyBank, Unlink } from "lucide-react";
import type { IconItem } from "../types/landing.types";

export const PROBLEM_SECTION = {
  eyebrow: "El problema que resolvemos",
  title: "Administrar una copropiedad no debería significar gestionar todo por separado.",
  subtitle:
    "Cuando la información está dispersa, se pierde el control sobre las decisiones, los recursos y las responsabilidades.",
} as const;

export const PROBLEMS: IconItem[] = [
  {
    icon: FolderOpen,
    title: "Información dispersa",
    description: "Documentos, contratos, actas y soportes almacenados en diferentes lugares.",
  },
  {
    icon: Unlink,
    title: "Falta de trazabilidad",
    description: "Difícil saber quién autorizó, ejecutó o dio seguimiento a una decisión.",
  },
  {
    icon: FileSpreadsheet,
    title: "Procesos manuales",
    description:
      "Sanciones, solicitudes y contrataciones gestionadas con documentos y hojas de cálculo independientes.",
  },
  {
    icon: PiggyBank,
    title: "Poco control financiero",
    description: "Dificultad para relacionar presupuesto, gastos, contratos y soportes.",
  },
];
