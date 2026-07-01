# pulumi-design-system

Home for Pulumi Design System tokens. This repo publishes **JSON tokens** as the single source of truth; consumers translate to SCSS, Tailwind, CSS variables, or framework config locally.

## Package: `@pulumi/design-tokens`

### Usage

```javascript
import primitives from "@pulumi/design-tokens/tokens/core/primitives.json";
import semantic from "@pulumi/design-tokens/tokens/core/semantic.json";
import typography from "@pulumi/design-tokens/tokens/core/typography.json";
import spacing from "@pulumi/design-tokens/tokens/core/spacing.json";
```

### Token files

```
tokens/core/
  primitives.json    ← Color palettes (50–950, brand.pulumi.com)
  semantic.json      ← Shared color semantics ({green.800}, etc.)
  typography.json    ← Font families, type ramp, Material levels
  spacing.json       ← Spacing scale, dialog widths
```

See `tokens/README.md` for architecture and reference syntax.

### Updating tokens

Edit JSON under `tokens/core/` directly. No build step in this repo.

### Roadmap

- **pulumi-service** — translate JSON to console SCSS/Tailwind
- **pulumi/docs** — translate JSON for docs/marketing
- **pulumi/registry** — adopt shared JSON tokens

## License

Apache-2.0 — see [LICENSE](LICENSE).
