import type { TimelineEvent } from "../types/landing.types";

export const TRANSPARENCY_SECTION = {
  eyebrow: "Transparencia y control",
  title: "Cada decisión debe tener una historia que puedas consultar.",
  text: "En ZEWA puedes conectar las decisiones de la administración con sus responsables, autorizaciones, documentos y resultados. Así, la información no queda dispersa y la gestión puede ser consultada y verificada.",
} as const;

export const TIMELINE_CASE = {
  label: "Línea de tiempo · Ejemplo ilustrativo",
  title: "Impermeabilización de terrazas comunes",
  reference: "Expediente CT-2025-014",
} as const;

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    date: "03 Feb 2025",
    title: "Solicitud de contratación registrada",
    actor: "Administración",
    status: { label: "Registrado", tone: "success" },
    document: "Solicitud_tecnica.pdf",
  },
  {
    date: "10 Feb 2025",
    title: "Cotizaciones recibidas",
    actor: "Administración",
    status: { label: "3 cotizaciones", tone: "success" },
    document: "Cuadro_comparativo.xlsx",
  },
  {
    date: "14 Feb 2025",
    title: "Aprobación del consejo",
    actor: "Consejo de administración",
    status: { label: "Aprobado", tone: "success" },
    document: "Acta_consejo_12.pdf",
  },
  {
    date: "20 Feb 2025",
    title: "Contrato formalizado",
    actor: "Representante legal",
    status: { label: "Firmado", tone: "success" },
    document: "Contrato_obra.pdf",
  },
  {
    date: "12 Mar 2025",
    title: "Servicio supervisado",
    actor: "Comité de obras",
    status: { label: "Recibido", tone: "success" },
    document: "Acta_recibo.pdf",
  },
  {
    date: "14 Mar 2025",
    title: "Factura registrada",
    actor: "Contabilidad",
    status: { label: "Validada", tone: "success" },
    document: "Factura_electronica.xml",
  },
  {
    date: "18 Mar 2025",
    title: "Pago ejecutado",
    actor: "Tesorería",
    status: { label: "Pendiente", tone: "warning" },
    document: "Comprobante_egreso.pdf",
  },
];
