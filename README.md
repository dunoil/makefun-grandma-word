# One Word From Grandma

[![make.fun](https://make.fun/badge/u-0xkianno-one-word-from-grandma-f04bed16.svg)](https://make.fun/bounty/u-0xkianno-one-word-from-grandma-f04bed16)
[![rank](https://make.fun/badge/u-0xkianno-one-word-from-grandma-f04bed16/dunoil/makefun-grandma-word/rank.svg)](https://make.fun/bounty/u-0xkianno-one-word-from-grandma-f04bed16)
[![reward](https://make.fun/badge/u-0xkianno-one-word-from-grandma-f04bed16/dunoil/makefun-grandma-word/reward.svg)](https://make.fun/bounty/u-0xkianno-one-word-from-grandma-f04bed16)

Entry for the [One Word From Grandma](https://make.fun/bounty/u-0xkianno-one-word-from-grandma-f04bed16) bounty on make.fun ($5 prize).

## The word

**Witchcraft**

The single word a grandma would text about AI. Grandmothers have called every technology they could not explain "witchcraft" since the telephone. Faced with a machine that writes poems and answers questions, that is exactly the word she would send: warm, a little baffled, funny in one word, and tied to AI as a thing that does impossible work by means you cannot see.

## How it works

`main.ts` (Node 22) validates the word against the gate (one word, letters only, 1 to 30 characters, not only whitespace), writes it to `entry.txt` inside the directory named by `MAKEFUN_OUTPUT_DIR` (default `./output`), then reads the file back and verifies it matches the chosen word character for character, printing a verification report.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=/tmp/grandma-out node main.ts
cat /tmp/grandma-out/entry.txt
```
