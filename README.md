# pulumi-design-system

Home for Pulumi Design System tokens. This repo publishes **JSON color tokens** as the single source of truth for hex values, plus legacy SCSS for typography and spacing.

## Package: `@pulumi/design-tokens`

### Color tokens (JSON)

All hex values live under `tokens/core/`. **Consumers** (console2, docs, marketing) translate these to SCSS, Tailwind, CSS variables, or property-specific semantics locally.

```javascript
import primitives from "@pulumi/design-tokens/tokens/core/primitives.json";
import semantic from "@pulumi/design-tokens/tokens/core/semantic.json";
```

### Token layers

```
tokens/
  core/
    primitives.json          ← Canonical palette (50–950, brand.pulumi.com)
    semantic.json            ← Shared semantic tokens ({green.800}, etc.)
```

See `tokens/README.md` for architecture.

### Semantic tokens

Shared semantics in `tokens/core/semantic.json` use plain names (e.g. `success`, `brand-violet`) referencing primitives via `{family.shade}` syntax. Properties may define additional semantics in their own repos.

### Non-color SCSS (legacy)

Typography and spacing tokens remain as SCSS partials under `src/global/` until migrated to JSON:

| Category | Source |
|----------|--------|
| **Typography** | `src/global/_typography.scss` |
| **Spacing** | `src/global/_spacing.scss` |

```scss
@use "@pulumi/design-tokens/scss" as *;
```

### Updating color tokens

Edit JSON under `tokens/core/` directly. No build step in this repo.

### Roadmap

- **pulumi-service** — translate JSON to console SCSS/Tailwind
- **pulumi/docs** — translate JSON for docs/marketing
- **pulumi/registry** — adopt shared JSON tokens

## Development

No build step required for color tokens.

To verify non-color SCSS compiles:

```bash
echo '@use "src/global/index" as *; .x { padding: $spacing-m; }' \
  | npx sass --stdin --load-path=src/global
```

## License

Apache-2.0 — see [LICENSE](LICENSE).
