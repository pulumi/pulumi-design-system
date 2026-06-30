# pulumi-design-system

Home for Pulumi Design System tokens. This repo publishes **JSON color tokens** as the single source of truth for hex values, plus legacy SCSS for non-color tokens (typography, spacing, shape).

## Package: `@pulumi/design-tokens`

### Color tokens (JSON)

All hex values live under `tokens/`. **Consumers** (console2, docs, marketing) translate these to SCSS, Tailwind, CSS variables, or property-specific semantics locally.

```javascript
import primitives from "@pulumi/design-tokens/tokens/core/primitives.json";
import semantic from "@pulumi/design-tokens/tokens/core/semantic.json";
import marketingExt from "@pulumi/design-tokens/tokens/marketing/extensions.json";
```

### Token layers

```
tokens/
  core/
    primitives.json          ← Canonical palette (50–950, brand.pulumi.com; includes aqua)
    semantic.json            ← Shared semantic tokens ({green.800}, etc.)
  marketing/
    extensions.json          ← Marketing-only (salmon, fuchsia, purple, legacy gray)
    meta.json                ← Marketing typography/shape metadata
```

See `tokens/README.md` and `tokens/DISCREPANCIES.md` for architecture and known color mismatches.

### Semantic tokens

Shared semantics in `tokens/core/semantic.json` use plain names (e.g. `success`, `brand-violet`) referencing primitives via `{family.shade}` syntax. Properties may define additional semantics in their own repos.

### Non-color SCSS (legacy)

Typography, spacing, shape, and size tokens remain as SCSS partials for PDS/console until migrated to JSON:

| Category | Source |
|----------|--------|
| **Typography** | `_typography.scss` |
| **Spacing** | `_spacing.scss` |
| **Shape** | `_shape.scss` |
| **Size** | `_size.scss` |
| **Mixins** | `_mixins.scss` |
| **Fonts** | `fonts.css` |

```scss
@use "@pulumi/design-tokens/scss" as *;
@use "@pulumi/design-tokens/scss/mixins" as *;
```

### Updating color tokens

Edit JSON under `tokens/` directly. No build step in this repo.

### Roadmap

- **pulumi-service** — translate JSON to console SCSS/Tailwind
- **pulumi/docs** — translate JSON for docs/marketing
- **pulumi/registry** — adopt shared JSON tokens

## Development

No build step required for color tokens.

To verify non-color SCSS compiles:

```bash
echo '@use "src/global/design-tokens/index" as *; .x { padding: $spacing-m; }' \
  | npx sass --stdin --load-path=src/global/design-tokens
```

## License

Apache-2.0 — see [LICENSE](LICENSE).
