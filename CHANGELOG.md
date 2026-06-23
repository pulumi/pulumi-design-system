# Changelog

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
