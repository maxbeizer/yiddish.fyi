# yiddish.fyi

A free, simple API for Yiddish words and definitions.

🌐 **Live:** https://yiddish.fyi  
📖 **API Docs:** https://yiddish.fyi  
🐙 **GitHub:** https://github.com/maxbeizer/yiddish.fyi

## API Endpoints

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
  "count": 49,
  "words": { ... }
}
```

## Features

- ✅ **CORS enabled** - works from browsers
- ✅ **No authentication** - just hit the endpoint
- ✅ **No rate limits** - (within reason)
- ✅ **Free forever** - runs on Cloudflare Workers
- ✅ **Zero dependencies** - pure vanilla JS

## Dataset

Currently 49 common Yiddish words (bagel, kvetch, mensch, oy vey, etc.)

Want to add more? Submit a PR!

## Deployment

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

## Cost

$0/month on Cloudflare Workers free tier (100k requests/day)

## License

Public domain / CC0. Use it however you want.

---

Made with 💖 by [Max](https://maxbeizer.com)
