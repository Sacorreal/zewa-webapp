import { FolderTree, Network, Workflow } from "lucide-react";

export const HERO = {
  eyebrow: "Gestión integral de propiedad horizontal",
  title: "Tu copropiedad merece algo más que administrar.",
  titleAccent: "Merece estar bajo control.",
  subtitle:
    "Conecta la gestión administrativa, financiera, jurídica y contractual de tu copropiedad en una sola plataforma. Más control para administrar. Más transparencia para decidir.",
  primaryCta: "Solicitar una demo",
  secondaryCta: "Descubrir ZEWA",
  attributes: [
    { icon: Network, label: "Gestión centralizada" },
    { icon: Workflow, label: "Trazabilidad de procesos" },
    { icon: FolderTree, label: "Información organizada" },
  ],
} as const;
