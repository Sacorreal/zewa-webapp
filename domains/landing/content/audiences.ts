import { BuildingComplex, UserCheck, Users } from "lucide-react";
import type { Audience } from "../types/landing.types";

export const AUDIENCE_SECTION = {
  eyebrow: "Para quién es ZEWA",
  title: "Una mejor forma de administrar, para quienes hacen posible la copropiedad.",
} as const;

export const AUDIENCES: Audience[] = [
  {
    icon: UserCheck,
    title: "Administradores",
    description:
      "Organiza tu gestión, controla los procesos y dedica menos tiempo a buscar información.",
  },
  {
    icon: BuildingComplex,
    title: "Empresas administradoras",
    description:
      "Centraliza tus copropiedades y supervisa la operación desde una misma plataforma.",
  },
  {
    icon: Users,
    title: "Consejos de administración",
    description:
      "Consulta la información, haz seguimiento a las decisiones y fortalece la transparencia.",
  },
];
