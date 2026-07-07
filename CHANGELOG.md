# Changelog

## 0.6.0 — 2026-07-02

### Added

- `tokens/core/primitives-dark.json` — dark-mode color palettes (inverted 50–950 scale, aligned with pulumi-service / brand.pulumi.com)
- `tokens/core/palette-semantics.json` — per-palette primary (700), accent (500), muted (200), background (50) roles
- `tokens/core/tokens.json` — bundled export of all core token files
- `scripts/sync-tokens.mjs` — regenerates `primitives-dark.json` and `tokens.json` after source edits
- `AGENTS.md` — token index and editing guide for agents and contributors

### Changed

- `semantic.json` — added `brand-yellow`, `foreground`, `foreground-muted`, and `background` tokens

### Install

```json
"@pulumi/design-tokens": "github:pulumi/pulumi-design-system#v0.6.0"
```

## 0.5.0 — 2026-06-30

### Added

- `tokens/core/typography.json` — font families, PDS type ramp, Material-compatible levels
- `tokens/core/spacing.json` — spacing scale, semantic spacing tokens, dialog widths
- Package exports for `./tokens/core/typography.json` and `./tokens/core/spacing.json`

### Removed

- All SCSS under `src/` (`_typography.scss`, `_spacing.scss`, `_index.scss`)
- `./scss` package export and `sass` peer dependency

### Install

```json
"@pulumi/design-tokens": "github:pulumi/pulumi-design-system#v0.5.0"
```

## 0.4.3 — 2026-06-30

### Changed

- Moved typography and spacing SCSS from `src/global/design-tokens/` to `src/global/`
- `./scss` export now points to `src/global/_index.scss`

### Removed

- `src/global/design-tokens/_shape.scss` and `_size.scss`
- `src/global/design-tokens/` directory
- `fonts.css` and `./fonts.css` package export
- `./scss/mixins` package export (mixins removed in prior release)

### Install

```json
"@pulumi/design-tokens": "github:pulumi/pulumi-design-system#v0.4.3"
```

## 0.4.2 — 2026-06-30

### Removed

- `tokens/marketing/` — legacy www palettes, brand map, and typography/shape metadata belong in consumer repos, not the shared token source

### Install

```json
"@pulumi/design-tokens": "github:pulumi/pulumi-design-system#v0.4.2"
```

## 0.4.1 — 2026-06-30

### Changed

- Moved `aqua` palette into `tokens/core/primitives.json` (already defined on brand.pulumi.com)

### Removed

- `tokens/console/extensions.json` and `./tokens/console/extensions.json` package export

### Install

```json
"@pulumi/design-tokens": "github:pulumi/pulumi-design-system#v0.4.1"
```

## 0.4.0 — 2026-06-30

### Added

- **Brand-aligned color scale**: core palettes use `50–950` nomenclature per [brand.pulumi.com/identity/color](https://brand.pulumi.com/identity/color) (`950` replaces former `1000`; hex values unchanged)
- `tokens/core/semantic.json` — shared semantic color tokens (`success`, `brand-violet`, etc.) referencing primitives via `{family.shade}` syntax
- `utility.service-black` (`#1f1b21`) in `tokens/core/primitives.json`
- JSON package exports for all token sources (`tokens/core/primitives.json`, `tokens/core/semantic.json`, `tokens/marketing/extensions.json`, `tokens/marketing/meta.json`)
- `tokens/README.md` and `tokens/DISCREPANCIES.md` documenting architecture and known mismatches

### Changed

- **JSON is the source of truth for color hex values** — consumers translate to SCSS, Tailwind, and CSS variables in their own repos
- Remaining SCSS exports (`./scss`, `./scss/mixins`) cover typography, spacing, shape, and size only; color mixins use CSS custom properties with core palette fallbacks

### Removed

- `scripts/build-tokens.mjs`, `scripts/verify-tokens.mjs`, and CI verify workflow
- `generated/` SCSS and Tailwind outputs
- `tailwind/www-preset.js`, `tailwind/color-utils.js`, `scss/www/_colors.scss`, `scss/tailwind-v4/_theme.scss`
- `tokens/www.json` (was generated from marketing JSON)
- Console color SCSS layer: `_colors.scss`, `_colors-dark.scss`, `_color-vars.scss`, `_theme.scss`, `_theme-helpers.scss`, `_decision-tokens.scss`
- Package exports: `./tokens/www.json`, `./tokens/manifest.json`, `./scss/www/colors`, `./scss/tailwind-v4/theme`, `./tailwind/www-preset`, `./tailwind/color-utils`

### Install

```json
"@pulumi/design-tokens": "github:pulumi/pulumi-design-system#v0.4.0"
```

## 0.3.1 — 2026-06-23

### Fixed

- Correct relative import paths in `scss/tailwind-v4/_theme.scss` and `scss/www/_colors.scss` so consumers resolve generated files from `node_modules`

### Install

```json
"@pulumi/design-tokens": "github:pulumi/pulumi-design-system#v0.3.1"
```

## 0.3.0 — 2026-06-23

### Added

- **Layered token sources**: `tokens/core/`, `tokens/console/`, `tokens/marketing/`
- `scripts/build-tokens.mjs` — generates SCSS + Tailwind v4 `@theme` from JSON
- `scripts/verify-tokens.mjs` + CI workflow to prevent generated drift
- `generated/token-manifest.json` — documents shared vs product-specific tokens and core/marketing conflicts

### Changed

- Console primitive palettes in `_colors.scss` are now generated from JSON
- `tokens/www.json` is generated from marketing sources (Tailwind v2 backward compat)
- `scss/tailwind-v4/_theme.scss` and `scss/www/_colors.scss` are thin re-exports of generated files

### Install

```json
"@pulumi/design-tokens": "github:pulumi/pulumi-design-system#v0.3.0"
```

## 0.2.1 — 2026-06-23

### Added

- `scss/tailwind-v4/_theme.scss` — Tailwind v4 `@theme` block generated from PDS color maps (for pulumi.com/docs)

### Install

```json
"@pulumi/design-tokens": "github:pulumi/pulumi-design-system#v0.2.1"
```

## 0.2.0 — 2026-06-22

### Added

- **www/marketing palette** for pulumi.com (`tokens/www.json`) — Tailwind v2 color maps and typography used by docs/marketing
- `tailwind/www-preset.js` — builds Tailwind theme colors from www token JSON (no visual change when adopted)
- `scss/www/_colors.scss` — SCSS color maps for webpack/sass consumers (extended gray scale, brand extras)

### Install

```json
"@pulumi/design-tokens": "github:pulumi/pulumi-design-system#v0.2.0"
```

## 0.1.0 — 2026-06-22

Initial release of `@pulumi/design-tokens`, extracted from `pulumi-service` PDS.

### Added

- SCSS design token system (colors, theme, decision tokens, typography, spacing, shape, size)
- Typography mixins (`@pulumi/design-tokens/scss/mixins`)
- `fonts.css` with `@font-face` declarations
- Sass helpers: `theme()`, `theme-rgba()`, `theme-swap()`

### Install

```json
"@pulumi/design-tokens": "github:pulumi/pulumi-design-system#v0.1.0"
```
