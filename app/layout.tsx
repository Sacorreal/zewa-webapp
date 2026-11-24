import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "ZEWA | Gestión integral de propiedad horizontal",
    template: "%s | ZEWA",
  },
  description:
    "ZEWA conecta la gestión administrativa, financiera, jurídica, contractual y documental de tu copropiedad en una sola plataforma. La gestión de tu copropiedad, bajo control.",
  openGraph: {
    title: "ZEWA | La gestión de tu copropiedad, bajo control",
    description:
      "Plataforma SaaS de gestión y control integral de propiedad horizontal en Colombia.",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={cn("h-full antialiased font-sans", inter.variable, manrope.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
