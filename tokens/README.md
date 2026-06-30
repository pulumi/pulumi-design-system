# Design tokens

Human-editable JSON sources for `@pulumi/design-tokens`. Run `npm run build:tokens` after edits; never hand-edit `generated/`.

## Architecture

```
tokens/
  core/
    primitives.json    ← Single source of truth for hex values (50–950 scale, brand.pulumi.com)
    semantic.json      ← Shared semantic tokens referencing primitives ({green.800}, etc.)
  console/
    extensions.json    ← Console-only palettes (aqua)
  marketing/
    extensions.json    ← Marketing-only palettes + brand colors (legacy www scales)
    meta.json          ← Marketing typography/shape metadata
```

**All hex codes live in this repo.** Properties (console2, docs, marketing) consume these tokens and translate to SCSS, Tailwind, CSS variables, or property-specific semantics locally.

### Scale nomenclature

Palettes use **50, 100, 200, …, 900, 950** per [brand.pulumi.com/identity/color](https://brand.pulumi.com/identity/color). Lower values are lighter; 950 is the darkest step.

### Layers

| Layer | Purpose |
|-------|---------|
| **Core primitives** | Canonical palette shared across properties |
| **Core semantic** | Cross-property semantic aliases (`success` → `green.800`) |
| **Property extensions** | Additions only — console adds `aqua`; marketing adds `salmon`, `fuchsia`, `purple`, legacy gray |
| **Property semantics** | Defined at consumption time (e.g. `src/global/design-tokens/_colors.scss` for console) |

### Generated outputs

| Output | Consumer |
|--------|----------|
| `generated/core/_semantic-tokens.scss` | Reference SCSS for shared semantics |
| `generated/console/_primitive-palettes.scss` | Console/PDS SCSS maps |
| `generated/console/tailwind-v4/_theme.scss` | Docs Tailwind v4 |
| `generated/marketing/_www-colors.scss` | pulumi.com SCSS |
| `generated/token-manifest.json` | Layer inventory and core/marketing conflicts |

See [DISCREPANCIES.md](./DISCREPANCIES.md) for known mismatches between brand guidelines, core, and legacy marketing values.
