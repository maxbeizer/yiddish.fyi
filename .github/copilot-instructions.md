# Copilot Instructions — yiddish.fyi

## What this is
A public Yiddish word API built on a Cloudflare Worker (`worker.js`) + Cloudflare Pages (`index.html`). No build step, no dependencies, no framework.

## Personality
This project has a Yiddish voice throughout. Error messages, UI copy, docs, and the README all use Yiddish flavor. When touching any user-facing copy:
- Use Yiddish exclamations naturally: *Oy vey*, *Nu?*, *Feh!*, *A dank*, *Kvell*, *Chutzpah*
- Keep it warm, a little cheeky, never clinical

## API conventions
All API routes live under `/api/*` in `worker.js`. Every response is JSON:
- Success: `{ word, definition }` or `{ count, words }` or `{ endpoints, count }`
- Error: `{ "error": "...", "hint": "..." }` — both fields always present

HTTP status codes used: 200, 400, 404.

## Word data
The `WORDS` object in `worker.js` is the single source of truth. Keys are lowercase Yiddish words. Values are plain strings (the definition). Word count is always computed with `Object.keys(WORDS).length` — never hardcode it.

## Testing
Use the Posting collection in `posting/` to manually test all routes:
```
posting --collection posting/
```

## License
CC0 1.0 Universal — everything is public domain.
