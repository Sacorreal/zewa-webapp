import type { Metadata } from "next";
import { AuthCardLayout } from "@/components/layout/auth-card-layout";
import { LoginForm } from "@/domains/admin-auth/components/login-form";

export const metadata: Metadata = { title: "Iniciar sesión" };

export default function AdminLoginPage() {
  return (
    <AuthCardLayout
      eyebrow="Administración global"
      title="Ingresa al panel de ZEWA"
      description="Acceso exclusivo para superadministradores de la plataforma."
    >
      <LoginForm />
    </AuthCardLayout>
  );
}
