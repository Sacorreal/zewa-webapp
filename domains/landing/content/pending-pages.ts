interface PendingPageContent {
  title: string;
  description: string;
}

export const PENDING_PAGES = {
  demo: {
    title: "Solicitar una demo",
    description:
      "Muy pronto podrás agendar una demostración de ZEWA desde aquí. Estamos preparando este espacio.",
  },
  about: {
    title: "Nosotros",
    description: "Pronto compartiremos aquí quiénes somos y por qué creamos ZEWA.",
  },
  privacy: {
    title: "Política de privacidad",
    description: "Este documento se encuentra en preparación y será publicado próximamente.",
  },
  dataTreatment: {
    title: "Tratamiento de datos personales",
    description: "Este documento se encuentra en preparación y será publicado próximamente.",
  },
  terms: {
    title: "Términos y condiciones",
    description: "Este documento se encuentra en preparación y será publicado próximamente.",
  },
} satisfies Record<string, PendingPageContent>;
