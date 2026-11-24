import type { Pillar } from "../types/landing.types";

export const PILLARS_SECTION = {
  eyebrow: "La propuesta de valor ZEWA",
  title: "Una sola plataforma. El control de toda la gestión.",
  subtitle: "ZEWA conecta los procesos que hacen funcionar una copropiedad.",
} as const;

export const PILLARS = {
  legal: {
    id: "juridico",
    eyebrow: "Pilar 01",
    title: "Control jurídico y administrativo",
    description:
      "Gestiona las actuaciones administrativas y los procesos jurídicos de tu copropiedad con procedimientos organizados y trazables.",
    capabilities: [
      "Procesos sancionatorios.",
      "Registro de requerimientos y descargos.",
      "Seguimiento de actuaciones.",
      "Gestión de actas y decisiones.",
      "Control de autorizaciones.",
      "Gestión de PQRS.",
    ],
  },
  financial: {
    id: "financiero",
    eyebrow: "Pilar 02",
    title: "Control financiero y contractual",
    description:
      "Conecta el presupuesto, los proveedores, los contratos y los movimientos financieros para mantener el control de los recursos.",
    capabilities: [
      "Presupuesto y ejecución presupuestal.",
      "Gestión de proveedores.",
      "Solicitudes y comparación de cotizaciones.",
      "Contratos y vencimientos.",
      "Seguimiento de obligaciones contractuales.",
      "Cuentas por pagar y control contable.",
    ],
  },
  documents: {
    id: "documental",
    eyebrow: "Pilar 03",
    title: "Gestión documental y transparencia",
    description:
      "Organiza la información y conserva la trazabilidad de las decisiones y actuaciones de la administración.",
    capabilities: [
      "Expedientes digitales.",
      "Repositorio documental.",
      "Control de versiones.",
      "Registro de responsables.",
      "Historial de actuaciones.",
      "Consulta de soportes y evidencias.",
    ],
  },
} satisfies Record<string, Pillar>;
