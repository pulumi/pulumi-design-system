# AGENTS.md — @pulumi/design-tokens

Guide for AI agents and contributors working in this repo.

## Quick start

**Prefer the bundled import** when you need multiple token layers:

```javascript
import tokens from "@pulumi/design-tokens/tokens/core/tokens.json";

const { primitives, primitivesDark, semantic, paletteSemantics, semanticDark, typography, spacing } = tokens;
```

Individual files remain available for tree-shaking or targeted updates:

```javascript
import primitives from "@pulumi/design-tokens/tokens/core/primitives.json";
import primitivesDark from "@pulumi/design-tokens/tokens/core/primitives-dark.json";
import semantic from "@pulumi/design-tokens/tokens/core/semantic.json";
import paletteSemantics from "@pulumi/design-tokens/tokens/core/palette-semantics.json";
import semanticDark from "@pulumi/design-tokens/tokens/core/semantic-dark.json";
import typography from "@pulumi/design-tokens/tokens/core/typography.json";
import spacing from "@pulumi/design-tokens/tokens/core/spacing.json";
```

## Token files (`tokens/core/`)

| File | Purpose |
|------|---------|
| `primitives.json` | Light-mode color palettes (50–950), white/black, utility colors |
| `primitives-dark.json` | Dark-mode palettes — inverted scale positions per [brand.pulumi.com/identity/color](https://brand.pulumi.com/identity/color) |
| `semantic.json` | Cross-property semantic color tokens (brand, text, states, foreground/background) |
| `semantic-dark.json` | Dark-mode semantic overrides (tokens not covered by inverting primitives) |
| `palette-semantics.json` | Per-palette roles: primary (700), accent (500), muted (200), background (50) |
| `typography.json` | Font families, type ramp, Material-compatible levels |
| `spacing.json` | Spacing scale, semantic spacing, dialog widths |
| `tokens.json` | **Bundle** of all files above — regenerate after edits |

## Reference syntax

Semantic tokens reference other tokens with `{group.name}`:

```json
{ "success": "{green.800}", "text-body": "{gray.950}" }
```

- Color palettes: `{family.shade}` (e.g. `{violet.700}`)
- Utility colors: `{utility.name}` (e.g. `{utility.service-black}`)
- Spacing: `{scale.name}` (e.g. `{scale.3x}`)

## Dark mode

1. Use `primitives-dark.json` instead of `primitives.json` for palette hex values.
2. Resolve `semantic.json` tokens against dark primitives (same shade references, inverted hex).
3. Apply overrides from `semantic-dark.json` where present (e.g. `brand-yellow`, `foreground`, `background`).

Palette semantics (`palette-semantics.json`) use the same shade references in both modes.

## Editing workflow

1. Edit the relevant file under `tokens/core/` (not `tokens.json` directly).
2. Run `node scripts/sync-tokens.mjs` to regenerate `primitives-dark.json` and `tokens.json`.
3. Bump version in `package.json` and add a `CHANGELOG.md` entry.

`primitives-dark.json` is derived from `primitives.json` by inverting shade positions (50↔950, 100↔900, …). Do not edit it by hand.

## Consumers

Properties translate JSON to local SCSS, Tailwind, or CSS variables:

- **pulumi-service** — `cmd/pulumi-design-system/scripts/build-color-tokens.mjs`
- **pulumi/docs** — `theme/scripts/build-color-theme.mjs`

Property-specific tokens (console button palettes, docs `docs-*` colors) stay in consumer repos.

## Brand reference

Color scale and palette semantics follow [brand.pulumi.com/identity/color](https://brand.pulumi.com/identity/color):

- 11 steps: 50–950 (950 is darkest in light mode, lightest in dark mode)
- Per palette: **primary** = 700, **accent** = 500, **muted** = 200, **background** = 50
