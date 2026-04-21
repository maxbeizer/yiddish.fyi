# yiddish.fyi

Oy, you found it! The one and only free Yiddish word API — no auth, no rate limits, no tsuris.

🌐 **Live:** https://yiddish.fyi
📖 **API Docs:** https://yiddish.fyi
🐙 **GitHub:** https://github.com/maxbeizer/yiddish.fyi

## API Endpoints — nu, let's get to it

### Random Word
```bash
curl https://yiddish.fyi/api/random
```
```json
{
  "word": "kvetch",
  "definition": "to complain persistently"
}
```

### Look Up a Word
```bash
curl https://yiddish.fyi/api/word?q=mensch
```
```json
{
  "word": "mensch",
  "definition": "a person of integrity and honor"
}
```

### List All Words
```bash
curl https://yiddish.fyi/api/list
```
```json
{
  "count": "<the current count, always up to date>",
  "words": { ... }
}
```

## Features — what's not to like?

- ✅ **CORS enabled** — works from browsers, no mishegoss
- ✅ **No authentication** — just hit the endpoint already
- ✅ **No rate limits** — we're not that kind of meshuggeneh
- ✅ **Zero dependencies** — pure vanilla JS, as God intended

## Dataset

A growing collection of common Yiddish words (bagel, kvetch, mensch, oy vey, etc.). The count is always current — check `/api/list` if you want the real number.

Got a word we're missing? We'd kvell if you submitted a PR!

## Deployment — you want to run this yourself? Chutzpah! We love it.

### Cloudflare Worker (API)

1. Install Wrangler CLI (optional, can deploy via dashboard):
```bash
npm install -g wrangler
```

2. Deploy:
```bash
wrangler deploy worker.js
```

Or deploy via Cloudflare dashboard:
- Workers & Pages → Create Worker → paste `worker.js` code

### Cloudflare Pages (Docs Site)

1. Connect this repo to Cloudflare Pages
2. Build settings:
   - Framework: None
   - Build command: (empty)
   - Build output: `/`
3. Custom domain: `yiddish.fyi`

## Local Development

Open `index.html` in a browser. The API endpoints will hit the live Worker.

To test the Worker locally:
```bash
wrangler dev worker.js
```

## License

Public domain / CC0. Use it however you want — farbreng!

---

Made with 💖 and a little chutzpah by [Max](https://maxbeizer.com)
