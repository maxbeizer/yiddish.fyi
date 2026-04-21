// yiddish.fyi API - Cloudflare Worker
// Free tier: 100k requests/day, zero dependencies

const WORDS = {
  "bagel": "a ring-shaped bread roll",
  "bialy": "a flat roll with an indented center filled with onions",
  "blintz": "a thin pancake rolled with filling (cheese, fruit, etc.)",
  "bris": "Jewish ritual circumcision ceremony",
  "bubbe": "grandmother",
  "bubkes": "nothing, worthless",
  "chutzpah": "audacity, nerve, guts",
  "dreck": "trash, junk, inferior goods",
  "farklempt": "overcome with emotion, choked up",
  "farshtunken": "stinking, lousy, rotten",
  "gatkes": "long underwear",
  "glitch": "a minor malfunction or problem",
  "goy": "a non-Jewish person",
  "klutz": "a clumsy person",
  "kosher": "proper, legitimate (lit. conforming to Jewish dietary law)",
  "kvell": "to beam with pride and pleasure",
  "kvetch": "to complain persistently",
  "lox": "smoked salmon",
  "maven": "an expert, connoisseur",
  "mazel tov": "congratulations, good luck",
  "mensch": "a person of integrity and honor",
  "meshuga": "crazy, senseless",
  "mishegoss": "craziness, nonsense",
  "mishpocheh": "family, relatives",
  "nosh": "to snack, a small amount of food",
  "nu": "well? so? (interjection expressing impatience)",
  "oy": "oh! (exclamation of dismay or pain)",
  "oy vey": "oh woe, expressing distress or grief",
  "plotz": "to collapse, faint, or explode with emotion",
  "putz": "a fool, a jerk (lit. penis)",
  "schlemiel": "an unlucky, awkward person",
  "schlepp": "to drag or haul, to move slowly",
  "schlock": "cheap, shoddy merchandise",
  "schlub": "a slob, an oaf",
  "schmaltz": "excessive sentimentality (lit. rendered chicken fat)",
  "schmatta": "a rag, old clothing",
  "schmear": "a spread (esp. cream cheese), or to bribe",
  "schmo": "a stupid person, a jerk",
  "schmooze": "to chat, make small talk",
  "schmuck": "a contemptible person, a jerk (lit. penis)",
  "schnook": "a timid, gullible person",
  "schnorrer": "a beggar, moocher",
  "shtick": "a gimmick, routine, or talent",
  "shvitz": "to sweat",
  "tchotchke": "a trinket, knickknack",
  "tsuris": "troubles, woes",
  "tuches": "buttocks, rear end",
  "yenta": "a busybody, gossip",
  "zaftig": "pleasingly plump (said of a woman)"
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers for browser requests
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json"
    };

    // Handle OPTIONS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Route: /api/random - return a random word
    if (path === "/api/random" || path === "/api/random/") {
      const keys = Object.keys(WORDS);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      return new Response(
        JSON.stringify({
          word: randomKey,
          definition: WORDS[randomKey]
        }),
        { headers: corsHeaders }
      );
    }

    // Route: /api/word?q=kvetch - lookup a specific word
    if (path === "/api/word" || path === "/api/word/") {
      const query = url.searchParams.get("q");
      if (!query) {
        return new Response(
          JSON.stringify({ error: "Nu? You forgot to tell me which word!", hint: "Add ?q=yourword to the URL, already." }),
          { status: 400, headers: corsHeaders }
        );
      }

      const word = query.toLowerCase();
      if (WORDS[word]) {
        return new Response(
          JSON.stringify({
            word: word,
            definition: WORDS[word]
          }),
          { headers: corsHeaders }
        );
      } else {
        return new Response(
          JSON.stringify({ error: "Feh! Never heard of it.", hint: "Try /api/list to see all known words, or submit a PR to add yours!" }),
          { status: 404, headers: corsHeaders }
        );
      }
    }

    // Route: /api/list - return all words
    if (path === "/api/list" || path === "/api/list/") {
      return new Response(
        JSON.stringify({
          count: Object.keys(WORDS).length,
          words: WORDS
        }),
        { headers: corsHeaders }
      );
    }

    // Route: /api - show available endpoints
    if (path === "/api" || path === "/api/") {
      return new Response(
        JSON.stringify({
          endpoints: {
            "/api/random": "Get a random Yiddish word",
            "/api/word?q=kvetch": "Look up a specific word",
            "/api/list": "List all words"
          },
          count: Object.keys(WORDS).length
        }),
        { headers: corsHeaders }
      );
    }

    // Default: 404
    return new Response(
      JSON.stringify({ error: "Oy vey! That route doesn't exist.", hint: "Try /api/random for a word, or /api to see all endpoints." }),
      { status: 404, headers: corsHeaders }
    );
  }
};
