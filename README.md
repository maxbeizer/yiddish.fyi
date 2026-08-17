# yiddish.fyi

Oy, you found it! The one and only free Yiddish word API — no auth, no rate limits, no tsuris.

- 🌐 **Live:** https://yiddish.fyi
- 📖 **API Docs:** https://yiddish.fyi
- 🐙 **GitHub:** https://github.com/maxbeizer/yiddish.fyi

## API Endpoints — nu, let's get to it

### Random Word
```bash
curl https://yiddish.fyi/api/random
```
```json
{
  "word": "kvetch",
  "definition": "to complain persistently",
  "yiddish": "קוועטשן",
  "pronunciation": "KVETCH",
  "example": "She kvetched about the weather for the entire drive.",
  "literal": null,
  "entered_english": true
}
```

### Look Up a Word
```bash
curl https://yiddish.fyi/api/word?q=mensch
```
```json
{
  "word": "mensch",
  "definition": "a person of integrity and honor",
  "yiddish": "מענטש",
  "pronunciation": "MENSH",
  "example": "He stayed late to help clean up — what a mensch.",
  "literal": "person",
  "entered_english": true
}
```

### List All Words
```bash
curl https://yiddish.fyi/api/list
```
```json
{
  "count": 167,
  "words": { ... }
}
```

## Features — what's not to like?

- ✅ **CORS enabled** — works from browsers, no mishegoss
- ✅ **No authentication** — just hit the endpoint already
- ✅ **No rate limits** — we're not that kind of meshuggeneh
- ✅ **Zero dependencies** — pure vanilla JS, as God intended

## Dataset

167 Yiddish words with full rich data: original Yiddish script, pronunciation guide, example sentence, literal translation (where it differs meaningfully from usage), and an `entered_english` flag for words that crossed into mainstream English. Check `/api/list` for the live count.

Got a word we're missing? We'd kvell if you submitted a PR!

## Deployment — you want to run this yourself? Chutzpah! We love it.

Pushing to `main` deploys the site automatically via Cloudflare Pages CI/CD.

When `worker.js` changes, deploy the API Worker too:
```bash
npx wrangler deploy
```

## Local Development

Open `index.html` in a browser. The API endpoints will hit the live Worker.

To test the Worker locally (no install required):
```bash
script/server
```

Or directly with npx:
```bash
npx wrangler dev worker.js
```

## License

Public domain / CC0. Use it however you want — farbreng!

---

Made with 💖 and a little chutzpah by [Max](https://maxbeizer.com)
