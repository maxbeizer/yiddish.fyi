# Contributing — A Bisl of Guidance

We'd kvell to have your help! Whether you're adding new words, fixing a bug, or improving the docs — *a dank* in advance.

## Adding Words

The word list lives in `worker.js` as the `WORDS` object near the top of the file. Each entry looks like this:

```js
"mentsh": {
  word: "mentsh",
  definition: "A person of integrity and honor; someone truly admirable.",
  part_of_speech: "noun",
  example: "He stayed late to help everyone finish — what a mentsh."
},
```

To add a new word:

1. Fork the repo and create a branch (e.g., `add-word-kvetch`)
2. Add your word entry to the `WORDS` object in alphabetical order
3. Make sure all four fields are present: `word`, `definition`, `part_of_speech`, `example`
4. Open a pull request with a short description

**A few guidelines:**
- Definitions should be clear and friendly, not clinical
- Examples should use the word naturally in context
- Yiddish words often have multiple spellings — use the most common one as the key, and feel free to mention variants in the definition

## Reporting Bugs

Open an issue! Even a one-liner like *"Oy, `/api/random` returned an empty response"* is helpful.

## Code Changes

The project is intentionally small — one `worker.js`, one `index.html`. Keep it that way if you can. No build step, no dependencies.

---

*Remember: a little chutzpah goes a long way. Don't be shy — open that PR!*
