# Color token discrepancies

Audit against [brand.pulumi.com/identity/color](https://brand.pulumi.com/identity/color) and the prior repo state (2026-06-30).

## Core primitives vs brand guidelines

**Result: no hex mismatches.** All 50–900 values and 950 (formerly `1000` in this repo) match brand definitions exactly.

| Change | Notes |
|--------|-------|
| Renamed `1000` → `950` | Values unchanged; aligns with brand nomenclature |

## Utility colors

| Token | Brand guideline | Current repo usage | Status |
|-------|-----------------|-------------------|--------|
| `service-black` | `#1f1b21` (utility, brand.pulumi.com) | `#2e2932` (`gray-950`) used for `--color-service-black` in Tailwind theme | **Mismatch** — repo uses gray-950, not brand utility service-black |
| `service-black` | `#1f1b21` | Stored in `tokens/core/primitives.json` → `utility.service-black` | Documented for future adoption |

## Console-specific (not in core JSON)

| Token | Value | Notes |
|-------|-------|-------|
| `$color-brand-yellow` | `#fed05d` | Not a palette step; closest core yellow is 300 (`#fdcf4c`) |
| `$color-stack-favorites` | `#fb9746` | Matches `orange-400` in core |
| Identity provider colors | Various | Third-party brand colors, intentionally outside core |

## Marketing legacy vs core

Marketing (`tokens/marketing/extensions.json`) intentionally uses **different hex values** for shared family names (gray, violet, blue, orange, green, yellow). These are legacy pulumi.com scales with non-standard steps (112, 125, 925, etc.).

Full conflict list: `generated/token-manifest.json` → `summary.overlappingFamiliesWithDifferentValues`.

**Examples:**

| Family | Shade | Core | Marketing |
|--------|-------|------|-----------|
| gray | 950 | `#2e2932` | `#131314` |
| violet | 600 | `#7952e5` | `#805ac3` (brand) |
| blue | 600 | `#3c79f6` | `#4d5bd9` (brand) |
| yellow | 600 | `#da7205` | `#f7bf2a` (brand) |

Marketing-only families (`salmon`, `fuchsia`, `purple`) and brand map entries have no core equivalent.

## Follow-up

1. Decide whether `--color-service-black` should switch to `#1f1b21` or remain `gray-950`
2. Migrate marketing consumers to core palettes where feasible
3. Resolve `$color-brand-yellow` against core yellow scale or add to semantic tokens
