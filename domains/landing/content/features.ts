import {
  Building,
  Calculator,
  ChartColumn,
  ClockArrowLeft,
  FileText,
  Gavel,
  Handshake,
  MessageSquareText,
  Truck,
  Users,
  Vote,
  Wrench,
} from "lucide-react";
import type { Feature } from "../types/landing.types";

export const FEATURES_SECTION = {
  eyebrow: "Funcionalidades principales",
  title: "Todo lo que necesitas para gestionar mejor.",
  highlightLabel: "Diferencial ZEWA",
} as const;

export const FEATURES: Feature[] = [
  {
    icon: Gavel,
    title: "Procesos sancionatorios",
    description: "Requerimientos, descargos, pruebas y decisiones con cada etapa registrada.",
    highlighted: true,
  },
  {
    icon: Handshake,
    title: "Gestión contractual",
    description: "Contratos, pólizas, obligaciones y alertas de vencimiento en un solo lugar.",
    highlighted: true,
  },
  {
    icon: Calculator,
    title: "Presupuesto y contabilidad",
    description: "Ejecución presupuestal conectada con gastos, cuentas por pagar y soportes.",
    highlighted: true,
  },
  {
    icon: FileText,
    title: "Gestión documental",
    description: "Expedientes digitales con versiones, responsables y soportes consultables.",
    highlighted: true,
  },
  {
    icon: Building,
    title: "Administración de copropiedades",
    description: "Información general de la copropiedad, sus áreas y su estructura.",
  },
  {
    icon: Users,
    title: "Gestión de propietarios y residentes",
    description: "Registro organizado de propietarios, residentes y unidades privadas.",
  },
  {
    icon: Truck,
    title: "Proveedores",
    description: "Proveedores, cotizaciones y documentación de cada contratista.",
  },
  {
    icon: MessageSquareText,
    title: "PQRS",
    description: "Radicación, seguimiento y respuesta de peticiones, quejas y reclamos.",
  },
  {
    icon: Vote,
    title: "Asambleas y actas",
    description: "Preparación de asambleas y registro de actas y decisiones.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento y activos",
    description: "Programación de mantenimientos y control de los activos comunes.",
  },
  {
    icon: ChartColumn,
    title: "Reportes e indicadores",
    description: "Indicadores de gestión para la administración y el consejo.",
  },
  {
    icon: ClockArrowLeft,
    title: "Historial y auditoría de actuaciones",
    description: "Quién hizo qué y cuándo, en cada proceso de la copropiedad.",
  },
];
