# Design tokens

JSON source of truth for `@pulumi/design-tokens`. Edit files here directly — consumers translate to SCSS, Tailwind, CSS, or framework config in their own repos.

See [AGENTS.md](../AGENTS.md) for the full file index, dark mode rules, and editing workflow.

## Architecture

```
tokens/core/
  primitives.json         ← Light-mode color hex values (50–950, brand.pulumi.com)
  primitives-dark.json    ← Dark-mode palettes (generated — inverted scale positions)
  semantic.json           ← Shared color semantics referencing primitives
  semantic-dark.json      ← Dark-mode semantic overrides
  palette-semantics.json  ← Per-palette primary / accent / muted / background
  typography.json         ← Font families, sizes, weights, Material levels
  spacing.json            ← Spacing scale and semantic spacing tokens
  tokens.json             ← Bundled export of all files above (generated)
```

### Single import

```javascript
import tokens from "@pulumi/design-tokens/tokens/core/tokens.json";
```

### Color scale

Palettes use **50, 100, 200, …, 900, 950** per [brand.pulumi.com/identity/color](https://brand.pulumi.com/identity/color). Lower values are lighter in light mode; 950 is the darkest step. In dark mode the scale inverts (50 becomes darkest, 950 lightest) while keeping the same token names.

### Palette semantics

Each palette defines four roles per the brand guidelines:

| Role | Shade | Use |
|------|-------|-----|
| **primary** | 700 | Majority of color needs |
| **accent** | 500 | Emphasis, visual interest |
| **muted** | 200 | Secondary elements, bolder backgrounds |
| **background** | 50 | Backgrounds and surfaces |

See `palette-semantics.json`. Resolve against `primitives.json` (light) or `primitives-dark.json` (dark).

### Reference syntax

Semantic tokens reference other tokens using `{group.name}`:

```json
// semantic.json
{ "success": "{green.800}", "text-body": "{gray.950}" }

// spacing.json
{ "card-margin-bottom": "{scale.3x}" }
```

Color semantics use `{family.shade}` (e.g. `{violet.700}`). Utility colors use `{utility.name}` (e.g. `{utility.service-black}`).

### Regenerating derived files

After editing token sources:

```bash
node scripts/sync-tokens.mjs
```

This updates `primitives-dark.json` and `tokens.json`. Do not edit those files by hand.

### Layers

| Layer | File | Purpose |
|-------|------|---------|
| **Primitives (light)** | `primitives.json` | Canonical color hex values |
| **Primitives (dark)** | `primitives-dark.json` | Inverted palettes for dark mode |
| **Color semantic** | `semantic.json` | Cross-property color aliases |
| **Color semantic (dark)** | `semantic-dark.json` | Dark-mode overrides |
| **Palette semantics** | `palette-semantics.json` | primary / accent / muted / background per palette |
| **Typography** | `typography.json` | Font families, type ramp, Material-compatible levels |
| **Spacing** | `spacing.json` | Spacing scale, dialog widths, semantic spacing |
| **Property semantics** | — | Defined at consumption time in each property's repo |
