# Color token discrepancies

Audit against [brand.pulumi.com/identity/color](https://brand.pulumi.com/identity/color) and historical Pulumi UI values.

## Core primitives vs brand guidelines

**Result: no hex mismatches.** All 50–900 values and 950 (formerly `1000` in this repo) match brand definitions exactly.

| Change | Notes |
|--------|-------|
| Renamed `1000` → `950` | Values unchanged; aligns with brand nomenclature |

## Utility colors

| Token | Brand guideline | Current repo usage | Status |
|-------|-----------------|-------------------|--------|
| `service-black` | `#1f1b21` (utility, brand.pulumi.com) | Stored in `tokens/core/primitives.json` → `utility.service-black` | Available; consumers choose whether to use vs `gray-950` (`#2e2932`) |

## Historical consumer values (not in this repo)

These were previously defined in console SCSS or legacy marketing tokens. Consumers should map from core or define locally when translating:

| Token | Value | Notes |
|-------|-------|-------|
| Console brand yellow | `#fed05d` | Not a palette step; closest core yellow is 300 (`#fdcf4c`) |
| Stack favorites | `#fb9746` | Matches `orange-400` in core |
| Legacy www gray-950 | `#131314` | Differs from core `gray-950` (`#2e2932`) |
| Marketing brand accents | e.g. salmon `#f26e7e`, purple `#8a3391` | Not in core; define in consumer if still needed |

## Follow-up

1. Decide whether consumers use `utility.service-black` (`#1f1b21`) or `gray-950` (`#2e2932`) for service black
2. Add brand accent colors (salmon, fuchsia, purple) to core if brand guidelines adopt them
3. Resolve console brand yellow against core yellow scale or add to semantic tokens
