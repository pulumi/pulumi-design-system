# Design tokens

JSON source of truth for `@pulumi/design-tokens`. Edit files here directly — consumers translate to SCSS, Tailwind, CSS, or framework config in their own repos.

## Architecture

```
tokens/core/
  primitives.json    ← Color hex values (50–950 scale, brand.pulumi.com)
  semantic.json      ← Shared color semantics referencing primitives
  typography.json    ← Font families, sizes, weights, Material levels
  spacing.json       ← Spacing scale and semantic spacing tokens
```

### Color scale

Palettes use **50, 100, 200, …, 900, 950** per [brand.pulumi.com/identity/color](https://brand.pulumi.com/identity/color). Lower values are lighter; 950 is the darkest step.

### Reference syntax

Semantic tokens reference other tokens using `{group.name}`:

```json
// semantic.json
{ "success": "{green.800}", "text-body": "{gray.950}" }

// spacing.json
{ "card-margin-bottom": "{scale.3x}" }
```

Color semantics use `{family.shade}` (e.g. `{violet.700}`). Utility colors use `{utility.name}` (e.g. `{utility.service-black}`).

### Layers

| Layer | File | Purpose |
|-------|------|---------|
| **Primitives** | `primitives.json` | Canonical color hex values |
| **Color semantic** | `semantic.json` | Cross-property color aliases |
| **Typography** | `typography.json` | Font families, type ramp, Material-compatible levels |
| **Spacing** | `spacing.json` | Spacing scale, dialog widths, semantic spacing |
| **Property semantics** | — | Defined at consumption time in each property's repo |
