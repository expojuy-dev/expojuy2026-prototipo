---
name: smart-commit
description: Skill de Antigravity IDE para realizar commits atómicos, organizados por capas de arquitectura y siguiendo la convención Conventional Commits en repositorios TypeScript/Next.js/pnpm.
---

# Smart Commit - Estrategia de Commits Atómicos y Capas

Esta Skill define el procedimiento para auditar, clasificar y ejecutar commits atómicos y estructurados en Antigravity IDE.

## Reglas de Ejecución de Commits
- **NO realizar commits automáticos**: Solo ejecutar `git commit` cuando el usuario lo pida explícitamente.
- **Atomicidad:** Cada commit debe contener solo cambios relacionados con una única responsabilidad o dominio (`db`, `api`, `ui`, `app`, `deps`, `config`).
- **Conventional Commits:** Seguir estrictamente la especificación `tipo(scope): descripción concisa`.
- **Validación Pre-commit:** Asegurar que el código pase el linter (`pnpm lint`) y construya correctamente (`pnpm build`) antes de comprometer los cambios.
- **Prohibido `git add .` global:** Nunca agregar todo en un solo bloque si hay múltiples capas afectadas.

---

## Flujo de Trabajo en Antigravity IDE

### 1. Inspección y Diagnóstico
Ejecutar siempre en el shell del workspace:
```bash
git status
git diff --stat
```
Para entender los archivos modificados, eliminados y sin seguimiento (*untracked*).

### 2. Matriz de Clasificación por Capas y Scopes

| Capa / Dominio | Rutas típicas | Scope Recomendado | Tipo de Commit |
| :--- | :--- | :--- | :--- |
| **Base de Datos & Esquema** | `prisma/**`, `drizzle/**`, `db/**`, `lib/db/**`, `lib/schema.ts` | `feat(db)` / `fix(db)` | `feat` / `fix` / `refactor` |
| **API & Backend** | `app/api/**`, `pages/api/**`, `server/**`, `lib/api/**` | `feat(api)` / `refactor(api)` | `feat` / `refactor` / `fix` |
| **Componentes & UI** | `components/**`, `styles/**`, `public/**` | `feat(ui)` / `style(ui)` | `feat` / `refactor` / `style` |
| **Rutas & Vistas (App)** | `app/**/page.tsx`, `app/**/layout.tsx`, `pages/**` | `feat(app)` / `fix(app)` | `feat` / `fix` / `refactor` |
| **Configuraciones & Deps** | `package.json`, `pnpm-lock.yaml`, `next.config.*`, `tsconfig.json`, `eslint.config.*` | `chore(deps)` / `chore(config)` | `chore` / `build` |

---

## Pasos de Ejecución Estándar

### Paso 1: Staging Específico por Capa
Agrega los archivos pertenecientes a un mismo dominio de forma explícita:
```bash
git add <rutas-del-dominio>
```

### Paso 2: Validación del Staging
Verifica qué archivos han quedado preparados:
```bash
git status
```

### Paso 3: Commit Formalizado
Ejecuta el commit correspondiente en modo imperativo y conciso:
```bash
git commit -m "tipo(scope): descripción concisa en minúsculas"
```

### Paso 4: Repetición
Repite los Pasos 1 a 3 para cada capa/dominio restante hasta que `git status` reporte `working tree clean`.
