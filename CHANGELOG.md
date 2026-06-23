# Changelog

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
