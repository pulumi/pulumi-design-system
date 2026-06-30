# Design tokens

JSON source of truth for `@pulumi/design-tokens`. Edit files here directly — this repo does not generate SCSS, Tailwind, or CSS outputs.

## Architecture

```
tokens/
  core/
    primitives.json    ← Single source of truth for hex values (50–950 scale, brand.pulumi.com)
    semantic.json      ← Shared semantic tokens referencing primitives ({green.800}, etc.)
```

**All hex codes live in this repo.** Properties (console2, docs, marketing) consume these JSON files and translate to SCSS, Tailwind, CSS variables, or property-specific semantics in their own codebases.

### Scale nomenclature

Palettes use **50, 100, 200, …, 900, 950** per [brand.pulumi.com/identity/color](https://brand.pulumi.com/identity/color). Lower values are lighter; 950 is the darkest step.

### Layers

| Layer | Purpose |
|-------|---------|
| **Core primitives** | Canonical palette shared across all properties |
| **Core semantic** | Cross-property aliases (`success` → `{green.800}`, `brand-violet` → `{violet.700}`) |
| **Property semantics** | Defined at consumption time in each property's repo |

### Reference syntax

Semantic tokens reference primitives using `{family.shade}` or `{utility.name}`:

```json
{
  "success": "{green.800}",
  "text-body": "{gray.950}"
}
```

