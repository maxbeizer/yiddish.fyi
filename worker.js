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
  "zaftig": "pleasingly plump (said of a woman)",
  "oy gevalt": "oh my! (expression of alarm or distress)",
  "gey avek": "go away!",
  "zei gezunt": "be well, stay healthy",
  "challah": "braided bread glazed with egg white",
  "knish": "baked dumpling typically filled with potato",
  "latke": "crispy potato pancake fried in oil",
  "kugel": "baked casserole or pudding, usually with noodles or potatoes",
  "kreplach": "triangle-shaped dumplings filled with meat, served in soup",
  "borscht": "beet soup, often served cold",
  "schav": "sorrel soup",
  "kielbasa": "smoked sausage",
  "gefilte fish": "ground fish pressed into a loaf and sliced",
  "kishke": "stuffed intestine or sausage casing",
  "gribenes": "crispy rendered chicken skin or fat",
  "zayde": "grandfather",
  "tate": "father",
  "mame": "mother",
  "nebbish": "insignificant, timid person; a nobody",
  "gonif": "thief, scoundrel",
  "nudnik": "persistent bore, annoying pest",
  "schlimazel": "extremely unlucky person (opposite of schlemiel)",
  "noodge": "to nag or pester; a person who nags",
  "shiksa": "non-Jewish girl or woman",
  "shegetz": "non-Jewish boy or young man",
  "yiddishe kop": "a Jewish mind or way of thinking",
  "naches": "pride and joy, especially from children's accomplishments",
  "ganef": "thief (variant: gonif)",
  "boychik": "young man, boy, sweetheart",
  "genug": "enough!",
  "klezmer": "traditional Ashkenazi Jewish instrumental music",
  "frum": "observant, religiously pious",
  "goyim": "non-Jewish people (plural of goy)",
  "shabbos": "the Sabbath, Jewish day of rest",
  "minyan": "quorum of ten adult Jews needed for prayer service",
  "kiddush": "blessing recited over wine at start of Sabbath",
  "shtetl": "small Eastern European Jewish village",
  "galitzyaner": "Jewish person from the Galician region of Eastern Europe",
  "litvak": "Jewish person historically from Lithuania",
  "balaboost": "a capable homemaker or woman (lit. mistress of the house)",
  "kibitz": "to offer unsolicited advice; to watch and comment",
  "kibbitzer": "one who offers unsolicited advice or backseat driving",
  "dybbuk": "malevolent spirit of a dead person that possesses living body",
  "golem": "a man-made humanoid creature from Jewish folklore",
  "shul": "synagogue",
  "pareve": "food containing neither meat nor dairy (neutral, kosher)",
  "fleishig": "made with meat or poultry (kosher classification)",
  "milchig": "made with milk or dairy products (kosher classification)",
  "tref": "not kosher, forbidden food",
  "kasha": "buckwheat porridge or grain",
  "tzimmes": "sweet stew of vegetables and fruit; also a big fuss",
  "gelt": "money (lit. gold)",
  "heymish": "homey, friendly, folksy, unpretentious",
  "daven": "to recite Jewish liturgical prayers",
  "simcha": "celebration, joy, happy event",
  "schnapps": "strong alcoholic drink, brandy",
  "loksh": "noodles or pasta",
  "knaidel": "matzo ball dumpling in soup",
  "dreidel": "four-sided spinning top used in Hanukkah game",
  "yarmulke": "round cloth skullcap worn by observant Jewish men",
  "alter kacker": "old fogey, old coot (lit. old crapper)",
  "mamzer": "bastard, illegitimate person",
  "shnook": "gullible, easily cheated person",
  "punim": "face (informal)",
  "schnoz": "nose (slang)",
  "shnorer": "beggar who wheedles for money or favors",
  "motzi": "blessing recited before eating bread",
  "bracha": "blessing or benediction",
  "baleboste": "capable, competent housewife",
  "verklempt": "choked with emotion, overcome",
  "faygele": "a bird; term used for effeminate man",
  "broiges": "angry, bitter, annoyed",
  "megillah": "tediously long story or explanation (lit. scroll)",
  "vey iz mir": "woe is me!",
  "sholem aleichem": "hello/goodbye (lit. peace unto you)",
  "farshmelt": "confused, mixed up",
  "farputshed": "overdressed, decked out",
  "gekokht": "cooked, arranged",
  "mitzvah": "good deed or commandment",
  "baruch hashem": "blessed be the name (thank God)",
  "shalom": "hello, goodbye, peace",
  "tikkun olam": "repairing/healing the world",
  "shabbat shalom": "have a peaceful Sabbath",
  "l'chaim": "to life! (traditional toast)",
  "feh": "expression of disgust",
  "zets": "a blow, hit, or bit of luck",
  "kasha varnishkes": "buckwheat with bowtie pasta",
  "farfel": "egg noodle dough cut into rice-size pieces",
  "billig": "cheap, inferior",
  "kvel": "to beam with pride",
  "shnaps": "spirits, liquor",
  "litvish": "relating to Lithuanian Jewish tradition",
  "yiddish": "the Jewish language of Eastern European origin",
  "apikoyres": "skeptic, cynic",
  "bubbeleh": "term of endearment for a child or elderly relative",
  "paskudnik": "nasty, deceiving person",
  "meshuggene": "crazy person (female)",
  "meshugener": "crazy person (male)",
  "shikker": "drunkard",
  "bokher": "bachelor, young boy",
  "yiddishe meydel": "a Jewish girl",
  "broygus": "angry, bitter feud",
  "farrenkempt": "confused, bewildered",
  "farshlepteh krenk": "chronic illness",
  "freylach": "gleeful, happy",
  "gvir": "rich man, person of means",
  "ikov": "concern or worry",
  "oysgepucht": "overdressed, gaudy",
  "tsukneplekh": "worries, anxieties",
  "shtetlishe": "characteristic of a small village",
  "meshpokhe": "extended family"
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
          JSON.stringify({ error: "Missing query parameter 'q'" }),
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
          JSON.stringify({ error: "Word not found" }),
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
      JSON.stringify({ error: "Not found" }),
      { status: 404, headers: corsHeaders }
    );
  }
};
