import type { NavGroup, NavLink } from "../types/landing.types";

export const ROUTES = {
  home: "/",
  demo: "/demo",
  login: "/iniciar-sesion",
  about: "/nosotros",
  privacy: "/politica-de-privacidad",
  dataTreatment: "/tratamiento-de-datos",
  terms: "/terminos-y-condiciones",
} as const;

export const SECTION_IDS = {
  product: "producto",
  howItWorks: "como-funciona",
  features: "funcionalidades",
  audience: "para-quien-es",
} as const;

const anchor = (id: string) => `/#${id}`;

export const MAIN_NAV: NavLink[] = [
  { label: "Producto", href: anchor(SECTION_IDS.product) },
  { label: "Soluciones", href: anchor(SECTION_IDS.howItWorks) },
  { label: "Funcionalidades", href: anchor(SECTION_IDS.features) },
  { label: "Para quién es", href: anchor(SECTION_IDS.audience) },
  { label: "Nosotros", href: ROUTES.about },
];

export const FOOTER_NAV: NavGroup[] = [
  { title: "Plataforma", links: MAIN_NAV },
  {
    title: "Contacto",
    links: [
      { label: "Solicitar una demo", href: ROUTES.demo },
      { label: "Iniciar sesión", href: ROUTES.login },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Política de privacidad", href: ROUTES.privacy },
      { label: "Tratamiento de datos personales", href: ROUTES.dataTreatment },
      { label: "Términos y condiciones", href: ROUTES.terms },
    ],
  },
];
