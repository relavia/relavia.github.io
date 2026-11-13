// Relavia website i18n alignment check (Step 17).
// Usage: node check-i18n.mjs
// Verifies, for every HTML page in this directory:
//   1. all three packs in i18n.js carry the exact same key set;
//   2. no pack value is empty;
//   3. every data-i18n key used by any page exists in every pack.
// Exit code 0 means all checks passed.
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));

const windowStub = {};
new Function("window", readFileSync(join(root, "i18n.js"), "utf8"))(windowStub);
const packs = windowStub.TRANSLATIONS;
const langs = Object.keys(packs);
if (langs.length !== 3) {
  console.error(`expected exactly 3 language packs, found ${langs.length}`);
  process.exit(1);
}

let failed = false;
const base = Object.keys(packs[langs[0]]).sort();
for (const lang of langs) {
  const keys = Object.keys(packs[lang]).sort();
  const missing = base.filter((k) => !(k in packs[lang]));
  const extra = keys.filter((k) => !(k in packs[langs[0]]));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`${lang}: key set differs — missing [${missing}] extra [${extra}]`);
  }
  for (const [k, v] of Object.entries(packs[lang])) {
    if (typeof v !== "string" || v.trim() === "") {
      failed = true;
      console.error(`${lang}: key ${k} is empty or not a string`);
    }
  }
}

const used = new Map();
for (const f of readdirSync(root).filter((x) => x.endsWith(".html"))) {
  const html = readFileSync(join(root, f), "utf8");
  for (const m of html.matchAll(/data-i18n="([^"]+)"/g)) {
    if (!used.has(m[1])) used.set(m[1], []);
    used.get(m[1]).push(f);
  }
}
for (const [k, files] of used) {
  for (const lang of langs) {
    if (!(k in packs[lang])) {
      failed = true;
      console.error(`page key ${k} (used in ${[...new Set(files)].join(", ")}) missing from pack ${lang}`);
    }
  }
}

if (failed) process.exit(1);
console.log(
  `i18n check OK: ${langs.length} packs × ${base.length} keys aligned, ` +
  `${used.size} page keys covered, 0 empty values`
);
