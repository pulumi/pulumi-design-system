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
| `service-black` | `#1f1b21` (utility, brand.pulumi.com) | Stored in `tokens/core/primitives.json` → `utility.service-black` | Available; consumers choose whether to use vs `gray-950` (`#2e2932`) |

## Console-specific (historical — now defined in consumer repos)

These were previously in console SCSS and should be re-established by consumers when translating JSON:

| Token | Value | Notes |
|-------|-------|-------|
| Brand yellow | `#fed05d` | Not a palette step; closest core yellow is 300 (`#fdcf4c`) |
| Stack favorites | `#fb9746` | Matches `orange-400` in core |

## Marketing legacy vs core

Marketing (`tokens/marketing/extensions.json`) intentionally uses **different hex values** for shared family names (gray, violet, blue, orange, green, yellow). These are legacy pulumi.com scales with non-standard steps (112, 125, 925, etc.).

**Examples:**

| Family | Shade | Core | Marketing |
|--------|-------|------|-----------|
| gray | 950 | `#2e2932` | `#131314` |
| violet | 600 | `#7952e5` | `#805ac3` (brand) |
| blue | 600 | `#3c79f6` | `#4d5bd9` (brand) |
| yellow | 600 | `#da7205` | `#f7bf2a` (brand) |

Marketing-only families (`salmon`, `fuchsia`, `purple`) and brand map entries have no core equivalent.

## Follow-up

1. Decide whether consumers use `utility.service-black` (`#1f1b21`) or `gray-950` (`#2e2932`) for service black
2. Migrate marketing consumers to core palettes where feasible
3. Resolve console brand yellow against core yellow scale or add to semantic tokens
