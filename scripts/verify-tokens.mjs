#!/usr/bin/env node
// Copyright 2026, Pulumi Corporation. All rights reserved.
/** Verify generated token outputs match build-tokens.mjs (for CI). */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

execSync("node scripts/build-tokens.mjs", { cwd: ROOT, stdio: "inherit" });

const dirty = execSync("git status --porcelain generated/ tokens/www.json", { cwd: ROOT, encoding: "utf8" }).trim();
if (dirty) {
    console.error("Generated token outputs are out of date. Run: npm run build:tokens");
    console.error(dirty);
    process.exit(1);
}

console.log("Token outputs are up to date.");
