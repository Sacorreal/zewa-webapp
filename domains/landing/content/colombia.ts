import { Landmark, Lock, Scale, Wallet } from "lucide-react";
import type { IconItem } from "../types/landing.types";

export const COLOMBIA_SECTION = {
  eyebrow: "Diseñado para Colombia",
  title: "Gestión pensada para las particularidades de la propiedad horizontal en Colombia.",
  text: "ZEWA toma como referencia la Ley 675 de 2001 y los requerimientos administrativos, financieros y documentales de las copropiedades colombianas.",
  disclaimer:
    "La plataforma facilita la organización, ejecución y trazabilidad de los procesos. Su uso no sustituye las responsabilidades legales de los órganos de administración ni la asesoría profesional correspondiente.",
} as const;

export const COLOMBIA_ITEMS: IconItem[] = [
  {
    icon: Landmark,
    title: "Administración y órganos de gobierno",
    description: "Asamblea, consejo de administración y administrador, cada uno con sus competencias.",
  },
  {
    icon: Scale,
    title: "Procedimientos y debido proceso",
    description: "Etapas claras para requerimientos, descargos y decisiones.",
  },
  {
    icon: Wallet,
    title: "Gestión financiera y presupuestal",
    description: "Presupuesto, ejecución y soportes de cada gasto de la copropiedad.",
  },
  {
    icon: Lock,
    title: "Documentación y protección de datos",
    description: "Información organizada y tratada con criterios de protección de datos.",
  },
];
