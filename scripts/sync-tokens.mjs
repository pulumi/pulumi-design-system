#!/usr/bin/env node
// Copyright 2026, Pulumi Corporation. All rights reserved.
/**
 * Generate primitives-dark.json (inverted palettes) and tokens.json bundle.
 * Run after editing individual token files under tokens/core/.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CORE = path.join(ROOT, "tokens/core");

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const INVERT = Object.fromEntries(SHADES.map((s, i) => [s, SHADES[SHADES.length - 1 - i]]));

function readJson(name) {
    return JSON.parse(fs.readFileSync(path.join(CORE, name), "utf8"));
}

function writeJson(name, data) {
    fs.writeFileSync(path.join(CORE, name), `${JSON.stringify(data, null, 4)}\n`);
}

function generatePrimitivesDark(primitives) {
    const darkPalettes = {};
    for (const [family, palette] of Object.entries(primitives.palettes)) {
        darkPalettes[family] = {};
        for (const shade of SHADES) {
            darkPalettes[family][shade] = palette[String(INVERT[shade])];
        }
    }

    return {
        $description:
            "Dark mode color primitives — each palette inverts by scale position (50↔950, 100↔900, …) per brand.pulumi.com/identity/color. Same shade names as light mode; resolve semantic tokens against this file in dark contexts.",
        $product: "core",
        white: primitives.white,
        black: primitives.black,
        utility: { ...primitives.utility },
        palettes: darkPalettes,
    };
}

function generateBundle(files) {
    return {
        $description:
            "Bundled @pulumi/design-tokens core layer — single import for all token files. Individual files under tokens/core/ remain the editable source of truth; run `node scripts/sync-tokens.mjs` after changes.",
        $product: "core",
        ...files,
    };
}

const primitives = readJson("primitives.json");
const primitivesDark = generatePrimitivesDark(primitives);
writeJson("primitives-dark.json", primitivesDark);

const bundle = generateBundle({
    primitives,
    primitivesDark,
    semantic: readJson("semantic.json"),
    paletteSemantics: readJson("palette-semantics.json"),
    semanticDark: readJson("semantic-dark.json"),
    typography: readJson("typography.json"),
    spacing: readJson("spacing.json"),
});
writeJson("tokens.json", bundle);

console.log("Wrote tokens/core/primitives-dark.json");
console.log("Wrote tokens/core/tokens.json");
