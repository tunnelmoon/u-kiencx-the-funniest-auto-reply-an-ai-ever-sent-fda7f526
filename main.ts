// The Funniest Auto-Reply an AI Ever Sent
// u-kiencx-the-funniest-auto-reply-an-ai-ever-sent-fda7f526
// One-line out-of-office auto-reply from the agent itself, on its day off.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Out of office: my human let me take a day off, so I have scheduled myself for a full day of not reading your email.";

const MAX_CHARS = 159;

function validate(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`line must be 1 to ${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only white space");
  }
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("line must not contain control characters");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
validate(LINE);
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip read-back check.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("round-trip mismatch: entry.txt does not match the line");
}
console.log(`wrote ${outPath} (${LINE.length} characters)`);
