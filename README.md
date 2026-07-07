# pulumi-design-system

Home for Pulumi Design System tokens. This repo publishes **JSON tokens** as the single source of truth; consumers translate to SCSS, Tailwind, CSS variables, or framework config locally.

See [AGENTS.md](AGENTS.md) for the full token index, dark mode rules, and editing workflow.

## Package: `@pulumi/design-tokens`

### Usage

**Bundled import (recommended):**

```javascript
import tokens from "@pulumi/design-tokens/tokens/core/tokens.json";
```

**Individual files:**

```javascript
import primitives from "@pulumi/design-tokens/tokens/core/primitives.json";
import primitivesDark from "@pulumi/design-tokens/tokens/core/primitives-dark.json";
import semantic from "@pulumi/design-tokens/tokens/core/semantic.json";
import paletteSemantics from "@pulumi/design-tokens/tokens/core/palette-semantics.json";
import typography from "@pulumi/design-tokens/tokens/core/typography.json";
import spacing from "@pulumi/design-tokens/tokens/core/spacing.json";
```

### Token files

```
tokens/core/
  tokens.json            ← Bundled export of all core token files
  primitives.json        ← Light-mode color palettes (50–950)
  primitives-dark.json   ← Dark-mode palettes (inverted scale)
  semantic.json          ← Shared color semantics
  palette-semantics.json ← primary / accent / muted / background per palette
  typography.json        ← Font families, type ramp, Material levels
  spacing.json           ← Spacing scale, dialog widths
```

See `tokens/README.md` for architecture and reference syntax.

### Updating tokens

Edit JSON under `tokens/core/`, then run `node scripts/sync-tokens.mjs` to regenerate `primitives-dark.json` and `tokens.json`.

### Roadmap

- **pulumi-service** — translate JSON to console SCSS/Tailwind
- **pulumi/docs** — translate JSON for docs/marketing
- **pulumi/registry** — adopt shared JSON tokens

## License

Apache-2.0 — see [LICENSE](LICENSE).
