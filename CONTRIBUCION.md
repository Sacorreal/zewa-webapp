# 🎯 Objetivo del proyecto

ZEWA es una plataforma SaaS multi-tenant para la gestión y control integral de propiedad horizontal en Colombia (Ley 675 de 2001). Conecta los procesos administrativos, jurídicos, financieros, contractuales y documentales de cada copropiedad, de modo que cada decisión tenga su autorización, cada gasto su soporte y cada proceso su trazabilidad.

Este repositorio (`zewa-webapp`) contiene el frontend de la plataforma, construido con Next.js (App Router) y consumido por:

- Superadministradores de ZEWA (panel global `/admin`).
- Administradores de propiedad horizontal y empresas administradoras.
- Consejos de administración.

# 📖 Guía de Arquitectura: Convención de Sufijos y Capas

Esta guía establece los estándares de nomenclatura y responsabilidad para ZEWA. El objetivo es distinguir visualmente de forma inmediata dónde se ejecuta el código (Servidor vs. Navegador) y qué herramientas tiene permitidas cada capa.

## 🏗️ Resumen de la Arquitectura (BFF Pattern)

Implementamos un modelo **Backend For Frontend (BFF)** utilizando Next.js App Router. Esto nos permite delegar la seguridad al servidor y la interactividad al cliente.

| Sufijo        | Entorno         | Responsabilidad                                             | Directiva      |
| :------------ | :-------------- | :---------------------------------------------------------- | :------------- |
| `.actions.ts` | 🏠 **Servidor** | Mutaciones, Cookies `httpOnly`, Secretos, Puente a Backend. | `'use server'` |
| `.hooks.ts`   | 🌐 **Cliente**  | Estado de UI, Cache y Orquestación (React Query).           | `'use client'` |
| `.client.ts`  | 🌐 **Cliente**  | Lógica de navegador pura (Uploads, LocalStorage, Axios).    | N/A            |
| `.schema.ts`  | 🔄 **Ambos**    | Definiciones de Zod y Contratos de datos.                   | N/A            |

---

## 📂 Definición Detallada de Capas

### 1. Capa de Acciones (`*.actions.ts`)

Son **Server Actions**. Representan la lógica de negocio protegida que el usuario no puede interceptar en el navegador.

- **Entorno:** Node.js.
- **Permitido:** Uso de `next/headers` (`cookies()`), variables de entorno privadas, llamadas a la API de NestJS (`zewa-api`).
- **Ejemplo:** `auth.actions.ts`

### 2. Capa de Hooks (`*.hooks.ts`)

Son el motor de la experiencia de usuario. Envuelven la lógica asíncrona en **React Query**.

- **Entorno:** Navegador.
- **Permitido:** `useMutation`, `useQuery`, estados de React.
- **Ejemplo:** `use-login.hooks.ts`
  - _Función:_ Llamar a una `.actions.ts` y gestionar el estado `isPending`.

### 3. Capa de Cliente (`*.client.ts`)

Funciones de utilidad que requieren APIs del navegador que el servidor no posee.

- **Entorno:** Navegador.
- **Permitido:** `File`, `Blob`, `FormData` de cliente, progreso de Axios (`onUploadProgress`).
- **Ejemplo:** `storage.client.ts`
  - _Nota:_ Se usa para subir archivos (p. ej. el logo de un conjunto residencial) directamente al servicio de almacenamiento sin saturar el servidor de Next.js.

### 4. Capa de Validación (`*.schema.ts`)

La "Fuente de la Verdad". Define el contrato de los datos.

- **Entorno:** Agnóstico (se importa en cualquier lugar).
- **Ejemplo:** `client.schema.ts`
  - _Uso:_ El cliente lo usa para validar el formulario; el servidor lo usa para validar el payload recibido.

---

## 📐 Estructura de Carpetas (Domain-Driven)

Para escalar, agrupamos por **Dominio**, no por tipo de archivo:

```text
domains/clients/
├── components/            # React Components (UI)
├── hooks/                 # use-create-client.hooks.ts
├── services/
│   ├── clients.actions.ts # Comunicación con NestJS ('use server')
│   └── storage.client.ts  # Subida directa al almacenamiento (Browser logic)
├── validations/           # client.schema.ts
└── types/                 # client.types.ts
```
