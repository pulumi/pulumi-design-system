# pulumi-design-system

Home for all things Pulumi Design System. This repo currently publishes **design tokens** extracted from the Pulumi Cloud UI (`pulumi-service`), packaged for consumption by PDS, docs, marketing, and other Pulumi surfaces.

## Package: `@pulumi/design-tokens`

### What's included

| Category | Source | Description |
|----------|--------|-------------|
| **Colors** | `_colors.scss`, `_colors-dark.scss` | Primitive palettes (gray, violet, aqua, green, orange, red, blue, yellow) with light and dark variants |
| **CSS variables** | `_color-vars.scss`, `_theme.scss` | Runtime theme tokens (`--gray-800`, `--color-brand-blue`, etc.) |
| **Decision tokens** | `_decision-tokens.scss` | Semantic component tokens (buttons, surfaces, code editor, AG Grid, etc.) |
| **Typography** | `_typography.scss` | Font families, sizes, weights, and Material-compatible config |
| **Spacing** | `_spacing.scss` | Spacing scale (`$spacing-xs` through `$spacing-4x`) and dialog widths |
| **Shape** | `_shape.scss` | Border radii, shadows, card borders |
| **Size** | `_size.scss` | Icon and sizing tokens |
| **Helpers** | `_theme-helpers.scss` | `theme()`, `theme-rgba()`, and `theme-swap()` Sass functions |
| **Mixins** | `_mixins.scss` | Typography mixins (`font-display-large`, `font-body-medium`, etc.) |
| **Fonts** | `fonts.css` | `@font-face` declarations for Inter, Monaspace Neon, and Material Icons |
| **www palette** | `tokens/www.json`, `tailwind/www-preset.js`, `scss/www/_colors.scss` | pulumi.com/docs/marketing colors (Gilroy, legacy gray scale) — separate from PDS cloud tokens |

### www / marketing palette (pulumi.com)

For docs and marketing sites on Tailwind v2:

```javascript
const defaultTheme = require("tailwindcss/defaultTheme");
const { buildWwwTailwindTheme } = require("@pulumi/design-tokens/tailwind/www-preset");
const { global } = require("@pulumi/design-tokens/tokens/www.json");

const { colors, rgbColors, extend } = buildWwwTailwindTheme(global, defaultTheme);
```

SCSS color maps: `@import "@pulumi/design-tokens/scss/www/colors";`

## Token source of truth (layered)

Human-editable JSON sources live under `tokens/`. SCSS and Tailwind outputs are **generated** — never edit `generated/` by hand.

```
tokens/
  core/
    primitives.json          ← Canonical palette (50–950, brand.pulumi.com)
    semantic.json            ← Shared semantic tokens ({green.800}, etc.)
  console/extensions.json    ← Console-only (aqua)
  marketing/extensions.json  ← Marketing-only (salmon, fuchsia, purple, legacy gray)
  marketing/meta.json        ← Marketing Tailwind v2 typography/shape metadata

generated/                   ← Output of npm run build:tokens
  core/_semantic-tokens.scss
  console/_primitive-palettes.scss
  console/tailwind-v4/_theme.scss
  marketing/_www-colors.scss
  token-manifest.json        ← Lists shared vs product-specific tokens and conflicts
```

See `tokens/README.md` and `tokens/DISCREPANCIES.md` for architecture and known color mismatches.

**Console** (`src/global/design-tokens/_colors.scss`) imports generated primitive palettes and adds semantic tokens (brand, buttons, dark mode).

**Marketing** (`scss/www/_colors.scss`) re-exports generated marketing palettes.

**Docs Tailwind v4** (`scss/tailwind-v4/_theme.scss`) re-exports generated console theme.

### Updating tokens

```bash
# 1. Edit tokens/core/primitives.json or tokens/marketing/extensions.json
# 2. Regenerate outputs
npm run build:tokens

# 3. Verify (also runs in CI)
npm run verify:tokens
```

Check `generated/token-manifest.json` for `overlappingFamiliesWithDifferentValues` — intentional diffs between console and marketing (e.g. legacy www gray vs PDS gray) are listed explicitly.

### Token architecture (console SCSS runtime)

Tokens are organized in three layers:

1. **SCSS maps** — raw color palettes in `_colors.scss` and `_colors-dark.scss`
2. **CSS custom properties** — runtime theme variables emitted on `:root` and `[data-theme="dark"]`
3. **Decision tokens** — semantic aliases for components (e.g. `$button-primary-text`, `$code-background-color`)

### SCSS usage

```scss
@use "@pulumi/design-tokens/scss" as *;

.card {
  color: theme(gray-800);
  padding: $spacing-m;
  background: $surface-background-color;
}
```

Import the token barrel once in your global stylesheet to emit CSS custom properties for theme switching.

### Typography mixins

```scss
@use "@pulumi/design-tokens/scss/mixins" as *;

.title {
  @include font-display-large;
}
```

### Theme switching

CSS custom properties are emitted when the token barrel is imported. Toggle dark mode by setting `data-theme="dark"` on a root element or applying the `.theme-dark` class:

```html
<html data-theme="dark">
```

### Fonts

`fonts.css` declares `@font-face` rules for Inter, Monaspace Neon, Roboto, and Material Icons. Font file URLs point to `/assets/fonts/...` paths used by PDS and console2 at runtime.

Font binaries are **not** included in this repository. Consumers must either:

- Host the font files at the expected `/assets/fonts/` paths, or
- Override the `@font-face` URLs in their own build pipeline

Primary PDS fonts: **Inter** (UI text) and **Monaspace Neon** (code).

### Roadmap

This repo will become the single source of truth for design tokens across:

- **pulumi-service** — PDS component library and Pulumi Cloud console
- **pulumi/docs** — pulumi.com (docs and marketing)
- **pulumi/registry** — registry.pulumi.com

Docs and registry currently use a separate `tokens.json` + Tailwind v2 system. Converging those consumers onto these tokens is planned as a follow-up effort.

## Development

No build step is required. Tokens are consumed directly as SCSS partials.

To verify tokens compile:

```bash
echo '@use "src/global/design-tokens/index" as *; .x { color: theme(gray-800); }' \
  | npx sass --stdin --load-path=src/global/design-tokens
```

## License

Apache-2.0 — see [LICENSE](LICENSE).
