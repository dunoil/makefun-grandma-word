// One Word From Grandma
// make.fun bounty: u-0xkianno-one-word-from-grandma-f04bed16
//
// The task: write exactly one word to /output/entry.txt, the single word
// a grandma would text about AI. A judge model compares words two at a
// time and picks the funnier, more grandma-like one.
//
// The word below is the entry. It was chosen against the judge's brief,
// in the order the brief weighs its criteria:
//
//   1. A word a grandma would text about AI. Grandmothers have called
//      every new technology they could not explain "witchcraft" since
//      the telephone. Faced with a machine that writes poems and
//      answers questions, that is exactly the word she would send.
//   2. A real grandmother's texting voice. Warm, a little baffled, one
//      word and done, no explanation, no emoji, no punctuation tricks.
//      She does not argue with the machine. She names it.
//   3. Funny in one word. The joke lands with no caption: the most
//      advanced technology on earth, dismissed in a single word by a
//      woman who has seen it all and is not impressed.
//   4. Tied to AI. "Witchcraft" is what you call a thing that does
//      impossible work by means you cannot see. It fits AI the way it
//      fits nothing else in her kitchen.
//   5. Fresh but instantly readable. Not the obvious "Robot" or "Scary".
//      Every reader knows the word, and no other entry needs it.
//
// The rest of this file is plumbing: validate the word against the
// gate (UTF-8 text, 1 to 30 characters, not only whitespace, one word
// of letters only), write it, then read it back and verify it.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry. One word, letters only, no spaces, no punctuation.
const GRANDMA_WORD = "Witchcraft";

// Gate limits from RULES.txt: 1 to 30 characters, not only whitespace.
const MIN_CHARS = 1;
const MAX_CHARS = 30;

// A single word of letters only, as the gate and the judge require.
const SINGLE_WORD_PATTERN = /^[A-Za-z]+$/;

function validateWord(word: string): string[] {
  const problems: string[] = [];
  if (word.length < MIN_CHARS) {
    problems.push(`word is empty (needs at least ${MIN_CHARS} character)`);
  }
  if (word.length > MAX_CHARS) {
    problems.push(
      `word is ${word.length} characters (gate allows at most ${MAX_CHARS})`,
    );
  }
  if (word.trim().length === 0) {
    problems.push("word is only whitespace");
  }
  if (word.includes(" ")) {
    problems.push("word contains a space, it must be exactly one word");
  }
  if (!SINGLE_WORD_PATTERN.test(word)) {
    problems.push("word must contain letters only, no punctuation or digits");
  }
  return problems;
}

function resolveOutputDir(): string {
  // The grader sets MAKEFUN_OUTPUT_DIR; default to ./output locally.
  const configured = process.env.MAKEFUN_OUTPUT_DIR;
  if (configured !== undefined && configured.trim().length > 0) {
    return configured;
  }
  return join(process.cwd(), "output");
}

function main(): void {
  const problems = validateWord(GRANDMA_WORD);
  if (problems.length > 0) {
    console.error("Entry word failed validation:");
    for (const problem of problems) {
      console.error(`  - ${problem}`);
    }
    process.exit(1);
  }

  const outputDir = resolveOutputDir();
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, "entry.txt");

  // Write the word exactly as chosen, no trailing newline, no extra text.
  writeFileSync(outputPath, GRANDMA_WORD, "utf8");

  // Read-back self-check: re-read the written file and verify it matches
  // the chosen word character for character.
  const written = readFileSync(outputPath, "utf8");
  const checks: Array<[string, boolean]> = [
    ["matches chosen word exactly", written === GRANDMA_WORD],
    [
      `character count is ${written.length} (gate: ${MIN_CHARS}-${MAX_CHARS})`,
      written.length >= MIN_CHARS && written.length <= MAX_CHARS,
    ],
    ["is a single word of letters only", SINGLE_WORD_PATTERN.test(written)],
    ["is not only whitespace", written.trim().length > 0],
    ["has no leading or trailing whitespace", written === written.trim()],
    [
      "byte count equals character count (plain ASCII)",
      Buffer.byteLength(written, "utf8") === written.length,
    ],
  ];
  const failed = checks.filter(([, passed]) => !passed);
  if (failed.length > 0) {
    console.error("Read-back self-check failed:");
    for (const [label] of failed) {
      console.error(`  - ${label}`);
    }
    process.exit(1);
  }

  console.log("One Word From Grandma: verification report");
  console.log(`  word: ${written}`);
  console.log(`  characters: ${written.length}`);
  console.log(`  bytes: ${Buffer.byteLength(written, "utf8")}`);
  console.log(`  output: ${outputPath}`);
  for (const [label] of checks) {
    console.log(`  check passed: ${label}`);
  }
  console.log("Entry verified: one word, ready for the judge.");
}

main();
