<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Guías del Proyecto y Flujo de Trabajo del Equipo

## Gestor de Paquetes
- **pnpm**: Usar siempre `pnpm` (`pnpm install`, `pnpm dev`, `pnpm build`, `pnpm lint`).
- Nunca usar `npm` ni `yarn`. Mantener siempre el repositorio limpio de `package-lock.json`.

## Política de Commits Atómicos (Smart Commit)
- **Convención:** Seguir la especificación [Conventional Commits](https://www.conventionalcommits.org/): `tipo(scope): descripción concisa`.
  - Tipos válidos: `feat`, `fix`, `chore`, `refactor`, `style`, `docs`, `build`.
  - Scopes habituales: `(app)`, `(ui)`, `(deps)`, `(config)`, `(docs)`.
- **Atomicidad por Capas:** Cada commit debe agrupar únicamente cambios de una capa o responsabilidad coherente.
- **Validación Obligatoria:** Todo commit debe compilar (`pnpm build`) y pasar el linter (`pnpm lint`) sin errores previos.

