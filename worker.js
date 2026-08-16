// yiddish.fyi API - Cloudflare Worker
// Free tier: 100k requests/day, zero dependencies

const WORDS = {
  "apikoyres": { definition: "a skeptic or heretic; one who doubts religious authority", yiddish: "אַפּיקוירעס", pronunciation: "ah-pee-KOY-res", example: "My uncle was the family apikoyres — never set foot in shul.", literal: null, entered_english: false },
  "alter kacker": { definition: "an old fogey; a crotchety old man", yiddish: "אַלטער קאַקער", pronunciation: "ALL-ter KAH-ker", example: "Some alter kacker at the deli complained the soup was too hot.", literal: "old crapper", entered_english: false },
  "bagel": { definition: "a ring-shaped bread roll, boiled then baked", yiddish: "בייגל", pronunciation: "BAY-gel", example: "A bagel with lox and a schmear — that's a proper Sunday breakfast.", literal: null, entered_english: true },
  "balaboost": { definition: "a capable, efficient homemaker; a woman who runs her household masterfully", yiddish: "באַלאַבאָסטע", pronunciation: "bah-lah-BOOST", example: "She had twelve people at the table and not a dish out of place — a real balaboost.", literal: "mistress of the house", entered_english: false },
  "baleboste": { definition: "capable, competent housewife; variant of balaboost", yiddish: "באַלעבאָסטע", pronunciation: "BAH-leh-bos-teh", example: "My grandmother was a baleboste — everything spotless, always something on the stove.", literal: null, entered_english: false },
  "baruch hashem": { definition: "thank God; an expression of gratitude or relief", yiddish: "ברוך השם", pronunciation: "bah-ROOKH hah-SHEM", example: "The surgery went well, baruch hashem.", literal: "blessed is the name", entered_english: false },
  "beshert": { definition: "destined; fated; often used to describe a soulmate", yiddish: "בעשערט", pronunciation: "beh-SHERT", example: "They met at the airport during a delay — she said it was beshert.", literal: null, entered_english: false },
  "bialy": { definition: "a flat roll with an onion-filled indented center", yiddish: "ביאַליסטאָקער", pronunciation: "bee-AH-lee", example: "He passed on the bagel and grabbed a bialy instead.", literal: null, entered_english: true },
  "billig": { definition: "cheap, inferior, of low quality", yiddish: "ביליק", pronunciation: "BIL-ig", example: "Don't buy from that store — everything is billig and falls apart in a week.", literal: null, entered_english: false },
  "blintz": { definition: "a thin pancake rolled around a sweet or savory filling", yiddish: "בלינצע", pronunciation: "BLINTS", example: "She made cheese blintzes every Sunday without fail.", literal: null, entered_english: true },
  "bokher": { definition: "a young man; a bachelor; a yeshiva student", yiddish: "בחור", pronunciation: "BOH-kher", example: "Every bubbe at the kiddush had an eye on that bokher.", literal: null, entered_english: false },
  "borscht": { definition: "beet soup, often served cold with sour cream", yiddish: "באָרשט", pronunciation: "BORSHT", example: "Cold borscht on a hot summer day is underrated.", literal: null, entered_english: true },
  "boychik": { definition: "a young man; a term of endearment for a boy", yiddish: "בויציק", pronunciation: "BOY-chik", example: "Come here, boychik — let me take a look at you.", literal: null, entered_english: false },
  "bracha": { definition: "a blessing or benediction", yiddish: "ברכה", pronunciation: "BRAH-khah", example: "He said a bracha before eating, even in the restaurant.", literal: null, entered_english: false },
  "bris": { definition: "Jewish ritual circumcision ceremony, typically on the eighth day", yiddish: "ברית", pronunciation: "BRIS", example: "The whole family flew in for the bris.", literal: null, entered_english: true },
  "broiges": { definition: "angry, bitter, in a sulk", yiddish: "ברוגז", pronunciation: "BROY-gis", example: "They haven't spoken in three years — she's still broiges about the whole thing.", literal: null, entered_english: false },
  "broygus": { definition: "an angry bitter feud; variant of broiges", yiddish: "ברוגז", pronunciation: "BROY-gus", example: "The cousins have been broygus since the will was read.", literal: null, entered_english: false },
  "bubbe": { definition: "grandmother", yiddish: "באָבע", pronunciation: "BUB-eh", example: "Bubbe's chicken soup cured everything — real or imagined.", literal: null, entered_english: true },
  "bubbeleh": { definition: "a term of endearment, especially for a child or elderly person", yiddish: "בובעלע", pronunciation: "BUB-eh-leh", example: "Come, bubbeleh, eat something — you look pale.", literal: "little grandma (diminutive)", entered_english: false },
  "bubkes": { definition: "nothing; something trivial or worthless", yiddish: "בובקעס", pronunciation: "BUB-kis", example: "After all that work, he got bubkes.", literal: "goat droppings", entered_english: true },
  "challah": { definition: "braided egg bread, traditionally eaten on the Sabbath", yiddish: "חלה", pronunciation: "KHAH-lah", example: "She twisted the dough into a perfect challah braid.", literal: null, entered_english: true },
  "chazzer": { definition: "a greedy pig; someone gluttonous or selfish", yiddish: "חזיר", pronunciation: "KHAH-zer", example: "He took the last three slices — what a chazzer.", literal: "pig", entered_english: false },
  "chutzpah": { definition: "audacious nerve; fearless boldness bordering on shamelessness", yiddish: "חוצפּה", pronunciation: "KHOOTS-pah", example: "She asked for a raise the week after being late every day — pure chutzpah.", literal: null, entered_english: true },
  "chutzpadik": { definition: "having chutzpah; audaciously bold", yiddish: "חוצפּהדיק", pronunciation: "KHOOTS-pah-dik", example: "It was chutzpadik to correct the professor in front of the whole class — but he was right.", literal: null, entered_english: false },
  "daven": { definition: "to pray; to recite Jewish liturgical prayers", yiddish: "דאַוונען", pronunciation: "DAH-ven", example: "He davened every morning before work, without exception.", literal: null, entered_english: false },
  "dreck": { definition: "trash, junk, inferior goods or work", yiddish: "דרעק", pronunciation: "DREK", example: "That movie was absolute dreck — I walked out after twenty minutes.", literal: "excrement", entered_english: true },
  "dreidel": { definition: "a four-sided spinning top used in the Hanukkah game", yiddish: "דרײדל", pronunciation: "DRAY-del", example: "The kids played dreidel for chocolate coins until someone cried.", literal: null, entered_english: true },
  "dybbuk": { definition: "a malevolent spirit of a dead person that possesses the living", yiddish: "דיבוק", pronunciation: "DIB-uk", example: "The old play about the dybbuk still gives me chills.", literal: null, entered_english: false },
  "farblonjet": { definition: "hopelessly lost or confused; wandering aimlessly", yiddish: "פֿאַרבלאָנדזשעט", pronunciation: "far-BLON-jet", example: "We drove for an hour and were completely farblonjet — no idea which town we were in.", literal: null, entered_english: false },
  "farfel": { definition: "egg noodle dough broken or grated into small pieces", yiddish: "פֿאַרפֿל", pronunciation: "FAR-fel", example: "She made farfel with mushrooms for the holiday.", literal: null, entered_english: false },
  "farkakt": { definition: "thoroughly messed up; broken; lousy", yiddish: "פֿאַרקאַקט", pronunciation: "far-KAKT", example: "The whole plan was farkakt from the start.", literal: "covered in excrement", entered_english: false },
  "farklempt": { definition: "overcome with emotion; choked up", yiddish: "פֿאַרקלעמט", pronunciation: "far-KLEMPT", example: "She got so farklempt at the graduation she couldn't finish her speech.", literal: "clamped up", entered_english: false },
  "farrenkempt": { definition: "confused, bewildered, mixed up", yiddish: "פֿאַרענטפֿערט", pronunciation: "far-EN-kempt", example: "After the jet lag he was completely farrenkempt for three days.", literal: null, entered_english: false },
  "farshmelt": { definition: "confused, mixed up, muddled", yiddish: "פֿאַרשמעלט", pronunciation: "far-SHMELT", example: "By the third explanation I was more farshmelt than when we started.", literal: null, entered_english: false },
  "farshlepteh krenk": { definition: "a chronic, drawn-out illness; something that drags on forever", yiddish: "פֿאַרשלעפּטע קרענק", pronunciation: "far-SHLEP-teh KRENK", example: "That legal case became a farshlepteh krenk — years and nothing resolved.", literal: "a dragged-out sickness", entered_english: false },
  "farshtunken": { definition: "stinking, lousy, rotten", yiddish: "פֿאַרשטונקען", pronunciation: "far-SHTUNK-en", example: "The whole deal was farshtunken — I should have walked away.", literal: "stunk up", entered_english: false },
  "farputshed": { definition: "overdressed; decked out; fancied up", yiddish: "פֿאַרפּוצט", pronunciation: "far-PUTSHT", example: "She showed up to the casual dinner completely farputshed — full makeup, heels, the works.", literal: null, entered_english: false },
  "faygele": { definition: "a small bird; colloquially used for an effeminate man", yiddish: "פֿייגעלע", pronunciation: "FAY-geh-leh", example: "The old men called him a faygele and meant it unkindly.", literal: "little bird", entered_english: false },
  "feh": { definition: "an exclamation of disgust or disapproval", yiddish: "פֿע", pronunciation: "FEH", example: "Feh — I wouldn't eat there if they paid me.", literal: null, entered_english: false },
  "fleishig": { definition: "made with meat or poultry; a kosher classification", yiddish: "פֿליישיק", pronunciation: "FLAY-shig", example: "We can't have butter with this — the whole meal is fleishig.", literal: "meaty", entered_english: false },
  "freylach": { definition: "gleeful, happy, festive", yiddish: "פֿריילעך", pronunciation: "FRAY-lakh", example: "The klezmer band played freylach music until everyone was dancing.", literal: null, entered_english: false },
  "frum": { definition: "religiously observant; pious", yiddish: "פֿרום", pronunciation: "FRUM", example: "The frum neighborhood shut down completely on Shabbos.", literal: null, entered_english: false },
  "galitzyaner": { definition: "a Jewish person from the Galician region of Eastern Europe", yiddish: "גאַליציאַנער", pronunciation: "gah-lit-TSYAH-ner", example: "The litvaks and galitzyaners had their own food traditions and wouldn't let you forget it.", literal: null, entered_english: false },
  "ganef": { definition: "a thief; a swindler; a rascal", yiddish: "גנב", pronunciation: "GAH-nef", example: "That landlord is a ganef — charges double and fixes nothing.", literal: "thief", entered_english: false },
  "gatkes": { definition: "long underwear; long johns", yiddish: "גאַטקעס", pronunciation: "GOT-kes", example: "He still wore gatkes in April — old habits from the old country.", literal: null, entered_english: false },
  "gefilte fish": { definition: "ground fish mixed with meal and seasonings, poached and served in slices", yiddish: "געפֿילטע פֿיש", pronunciation: "geh-FIL-teh FISH", example: "Gefilte fish from a jar is an insult to the tradition.", literal: "stuffed fish", entered_english: true },
  "gekokht": { definition: "cooked; arranged; worked up", yiddish: "געקאָכט", pronunciation: "geh-KOKHT", example: "By the time he arrived, she was all gekokht about the delay.", literal: "cooked", entered_english: false },
  "gelt": { definition: "money; also chocolate coins given at Hanukkah", yiddish: "געלט", pronunciation: "GELT", example: "The kids were only interested in the gelt, not the dreidel.", literal: "gold", entered_english: false },
  "genug": { definition: "enough; that's enough", yiddish: "גענוג", pronunciation: "geh-NOOG", example: "Genug with the questions — I already told you everything I know.", literal: null, entered_english: false },
  "gey avek": { definition: "go away; get out of here", yiddish: "גיי אַוועק", pronunciation: "GAY ah-VEK", example: "Gey avek — I'm not listening to this anymore.", literal: "go away", entered_english: false },
  "glitch": { definition: "a minor malfunction or error", yiddish: "גליטש", pronunciation: "GLITCH", example: "There was a glitch in the system and all the orders disappeared.", literal: "slippery place", entered_english: true },
  "golem": { definition: "a man-made humanoid creature from Jewish folklore, animated by mystical means", yiddish: "גולם", pronunciation: "GOH-lem", example: "He followed instructions without any judgment — a complete golem.", literal: null, entered_english: true },
  "gonif": { definition: "a thief; a scoundrel; variant of ganef", yiddish: "גנב", pronunciation: "GOH-nif", example: "That contractor was a gonif — took the deposit and vanished.", literal: "thief", entered_english: false },
  "goy": { definition: "a non-Jewish person", yiddish: "גוי", pronunciation: "GOY", example: "The only goy at the seder, he gamely ate everything and asked good questions.", literal: "nation", entered_english: true },
  "goyim": { definition: "non-Jewish people; plural of goy", yiddish: "גויים", pronunciation: "GOY-im", example: "The goyim at the office had no idea why everyone was leaving early on Friday.", literal: "nations", entered_english: false },
  "gribenes": { definition: "crispy rendered chicken skin or fat; Jewish crackling", yiddish: "גריבענעס", pronunciation: "GRIB-eh-nes", example: "The gribenes were gone before the soup hit the table.", literal: null, entered_english: false },
  "gvir": { definition: "a rich man; a person of means", yiddish: "גביר", pronunciation: "geh-VIR", example: "He acts like a gvir but still borrows money from his mother.", literal: null, entered_english: false },
  "heymish": { definition: "homey, friendly, folksy, unpretentious", yiddish: "היימיש", pronunciation: "HAY-mish", example: "The restaurant wasn't fancy but it was heymish — exactly what you needed.", literal: "home-like", entered_english: false },
  "ikov": { definition: "a concern or worry", yiddish: "עיקר", pronunciation: "EE-kov", example: "His whole ikov was whether there'd be enough food for everyone.", literal: null, entered_english: false },
  "kasha": { definition: "buckwheat groats; also a porridge made from them", yiddish: "קאַשע", pronunciation: "KAH-shah", example: "She made kasha with onions and it smelled like her mother's kitchen.", literal: null, entered_english: false },
  "kasha varnishkes": { definition: "buckwheat groats cooked with bowtie pasta and onions", yiddish: "קאַשע וואַרנישקעס", pronunciation: "KAH-shah VAR-nish-kes", example: "Kasha varnishkes is the kind of dish you either grew up with or you don't understand.", literal: null, entered_english: false },
  "kibbitzer": { definition: "one who offers unsolicited advice; a backseat driver", yiddish: "קיביצער", pronunciation: "KIB-it-zer", example: "Every kibbitzer at the table had a better move than the one I made.", literal: null, entered_english: false },
  "kibitz": { definition: "to offer unsolicited advice; to watch and comment from the sidelines", yiddish: "קיביצן", pronunciation: "KIB-its", example: "Stop kibbitzing and let me finish the crossword.", literal: null, entered_english: true },
  "kiddush": { definition: "the blessing recited over wine to sanctify the Sabbath or a holiday", yiddish: "קידוש", pronunciation: "KID-ish", example: "Everyone crowded around for kiddush before the meal.", literal: "sanctification", entered_english: false },
  "kielbasa": { definition: "a smoked sausage of Polish-Jewish origin", yiddish: "קיעלבאַסע", pronunciation: "keel-BAH-sah", example: "He sliced the kielbasa thick and fried it with onions.", literal: null, entered_english: true },
  "kishke": { definition: "stuffed intestine casing; also slang for guts or stomach", yiddish: "קישקע", pronunciation: "KISH-keh", example: "The cholent sat in my kishke for three days.", literal: "intestine", entered_english: false },
  "klezmer": { definition: "traditional Ashkenazi Jewish instrumental music", yiddish: "כּלי-זמר", pronunciation: "KLEZ-mer", example: "The klezmer band had half the room crying and the other half dancing.", literal: "vessel of song", entered_english: true },
  "klutz": { definition: "a clumsy, awkward person", yiddish: "קלאָץ", pronunciation: "KLUTS", example: "I'm such a klutz — I knocked over the whole display.", literal: "wooden block", entered_english: true },
  "knaidel": { definition: "a matzo ball; a dumpling served in soup", yiddish: "קניידל", pronunciation: "KNAYD-el", example: "A light knaidel floats; a heavy one sinks — she made the kind that float.", literal: null, entered_english: false },
  "knish": { definition: "a baked or fried dumpling filled with potato, meat, or cheese", yiddish: "קניש", pronunciation: "keh-NISH", example: "A hot potato knish from a street cart is one of life's great simple pleasures.", literal: null, entered_english: true },
  "kosher": { definition: "conforming to Jewish dietary law; by extension, legitimate or proper", yiddish: "כּשר", pronunciation: "KOH-sher", example: "Something about this deal doesn't feel kosher.", literal: "fit, proper", entered_english: true },
  "kreplach": { definition: "triangle-shaped dumplings filled with meat, served in soup", yiddish: "קרעפּלעך", pronunciation: "KREP-lakh", example: "Kreplach in chicken soup — that's a Yom Kippur eve tradition.", literal: null, entered_english: false },
  "kugel": { definition: "a baked casserole, usually sweet noodle or potato", yiddish: "קוגל", pronunciation: "KOO-gel", example: "The noodle kugel disappeared before anyone could get seconds.", literal: "ball, dome", entered_english: false },
  "kvell": { definition: "to beam with pride and pleasure, especially over someone else's achievement", yiddish: "קוועלן", pronunciation: "KVEL", example: "His parents kvelled when he walked across the stage.", literal: null, entered_english: false },
  "kvel": { definition: "variant spelling of kvell", yiddish: "קוועלן", pronunciation: "KVEL", example: "She kvelted so hard at the recital she needed a tissue.", literal: null, entered_english: false },
  "kvetch": { definition: "to complain persistently; also a person who complains", yiddish: "קוועטשן", pronunciation: "KVETCH", example: "He kvetched about the line the whole time and then ordered the most complicated thing on the menu.", literal: null, entered_english: true },
  "l'chaim": { definition: "to life! — a traditional toast", yiddish: "לחיים", pronunciation: "leh-KHAY-im", example: "They raised their glasses and shouted l'chaim.", literal: "to life", entered_english: true },
  "latke": { definition: "a crispy fried potato pancake, traditional at Hanukkah", yiddish: "לאַטקע", pronunciation: "LOT-keh", example: "The debate about applesauce versus sour cream on latkes never ends.", literal: null, entered_english: true },
  "litvak": { definition: "a Jewish person historically from Lithuania; known for scholarship and rationalism", yiddish: "ליטוואַק", pronunciation: "LIT-vak", example: "A litvak would argue the point with Talmudic precision.", literal: null, entered_english: false },
  "litvish": { definition: "relating to Lithuanian Jewish tradition and culture", yiddish: "ליטוויש", pronunciation: "LIT-vish", example: "The litvish pronunciation sounds different from the Galician style.", literal: null, entered_english: false },
  "loksh": { definition: "noodle or noodles; also slang for a tall thin person", yiddish: "לאָקשן", pronunciation: "LOKSH", example: "She made loksh pudding like no one else.", literal: null, entered_english: false },
  "lox": { definition: "smoked salmon, typically served on a bagel with cream cheese", yiddish: "לאַקס", pronunciation: "LOKS", example: "Lox and a schmear on a Sunday morning — that's the whole religion right there.", literal: "salmon", entered_english: true },
  "luftmensch": { definition: "an impractical dreamer with no grounding in reality", yiddish: "לופֿטמענטש", pronunciation: "LUFT-mensh", example: "He had a thousand business ideas and no savings account — a true luftmensch.", literal: "air person", entered_english: false },
  "macher": { definition: "a big shot; a doer; someone who makes things happen", yiddish: "מאַכער", pronunciation: "MAH-kher", example: "Every room he walked into, he became the macher within twenty minutes.", literal: "maker", entered_english: false },
  "mame": { definition: "mother", yiddish: "מאַמע", pronunciation: "MAH-meh", example: "He still called her mame even at fifty.", literal: null, entered_english: false },
  "mamzer": { definition: "a bastard; an illegitimate person; also a clever rascal", yiddish: "ממזר", pronunciation: "MAM-zer", example: "That little mamzer figured out how to unlock the gate before he could walk.", literal: "bastard", entered_english: false },
  "maven": { definition: "an expert; a connoisseur; someone who really knows their stuff", yiddish: "מבֿין", pronunciation: "MAY-ven", example: "Ask her — she's a maven on the subject.", literal: "one who understands", entered_english: true },
  "mazel tov": { definition: "congratulations; good luck", yiddish: "מזל טובֿ", pronunciation: "MAH-zel TOV", example: "Mazel tov on the promotion — you've earned it.", literal: "good fortune", entered_english: true },
  "megillah": { definition: "a long, tedious story or explanation; the whole deal", yiddish: "מגילה", pronunciation: "meh-GIL-ah", example: "I asked a simple question and got the whole megillah.", literal: "scroll", entered_english: true },
  "mensch": { definition: "a person of integrity, honor, and decency", yiddish: "מענטש", pronunciation: "MENSH", example: "He didn't have to help, but he did — a real mensch.", literal: "person", entered_english: true },
  "meshuga": { definition: "crazy, senseless", yiddish: "משוגע", pronunciation: "meh-SHOO-gah", example: "You want to drive to the airport in this weather? You're meshuga.", literal: null, entered_english: true },
  "meshuggene": { definition: "a crazy person (female form)", yiddish: "משוגענע", pronunciation: "meh-SHOO-gen-eh", example: "That meshuggene called the landlord six times in one day.", literal: null, entered_english: false },
  "meshugener": { definition: "a crazy person (male form)", yiddish: "משוגענער", pronunciation: "meh-SHOO-gen-er", example: "Some meshugener was dancing on the car hood in the rain.", literal: null, entered_english: false },
  "meshpokhe": { definition: "extended family; the whole clan", yiddish: "משפּחה", pronunciation: "mesh-POH-kheh", example: "At Passover the whole meshpokhe shows up — thirty people minimum.", literal: "family", entered_english: false },
  "milchig": { definition: "made with milk or dairy products; a kosher classification", yiddish: "מילכיק", pronunciation: "MIL-khig", example: "It's a milchig meal so no meat — cheese blintzes and sour cream.", literal: "milky", entered_english: false },
  "minyan": { definition: "a quorum of ten adult Jews required for certain religious services", yiddish: "מנין", pronunciation: "MIN-yen", example: "They waited twenty minutes to get a minyan before starting the service.", literal: "count, number", entered_english: false },
  "mishegoss": { definition: "craziness; nonsense; foolish behavior", yiddish: "משוגעסט", pronunciation: "MISH-eh-goss", example: "What is this mishegoss? Someone explain to me what's happening.", literal: null, entered_english: false },
  "mishpocheh": { definition: "family; relatives; one's people", yiddish: "משפּחה", pronunciation: "mish-POH-kheh", example: "You don't have to explain yourself to mishpocheh.", literal: "family", entered_english: false },
  "mitzvah": { definition: "a good deed; also a religious commandment", yiddish: "מצוה", pronunciation: "MITS-vah", example: "Helping him move was a mitzvah — he had no one else.", literal: "commandment", entered_english: true },
  "motzi": { definition: "the blessing recited before eating bread", yiddish: "מוציא", pronunciation: "MOH-tsee", example: "Everyone quieted down for the motzi before tearing into the challah.", literal: "who brings forth", entered_english: false },
  "naches": { definition: "the pride and joy felt from a child's or loved one's achievements", yiddish: "נחת", pronunciation: "NAKH-es", example: "Watching her graduate, he felt the naches all the way to his bones.", literal: null, entered_english: false },
  "nebbish": { definition: "a timid, ineffectual, pitiful person", yiddish: "נעבעך", pronunciation: "NEB-ish", example: "He was such a nebbish — walked into walls, apologized to furniture.", literal: null, entered_english: true },
  "noodge": { definition: "to nag or pester persistently; also the person who does so", yiddish: "נודזשען", pronunciation: "NOOJ", example: "Stop being such a noodge — I said I'd call him tomorrow.", literal: null, entered_english: false },
  "nosh": { definition: "to snack; a light snack or bite to eat", yiddish: "נאַשן", pronunciation: "NOSH", example: "We didn't eat a real meal — just noshed all day at the party.", literal: null, entered_english: true },
  "nu": { definition: "well? so? come on! — an all-purpose expression of impatience or inquiry", yiddish: "נו", pronunciation: "NOO", example: "Nu? Are you going to say something or just stand there?", literal: null, entered_english: false },
  "nudnik": { definition: "a persistent, boring pest; an annoying nag", yiddish: "נודניק", pronunciation: "NOOD-nik", example: "Every office has a nudnik who forwards every email with no context.", literal: null, entered_english: false },
  "oy": { definition: "an exclamation of dismay, pain, or exasperation", yiddish: "אוי", pronunciation: "OY", example: "Oy — I left my wallet at the restaurant.", literal: null, entered_english: true },
  "oy gevalt": { definition: "oh my! an expression of alarm, shock, or distress", yiddish: "אוי גוואַלד", pronunciation: "OY geh-VALT", example: "Oy gevalt — did you see what he said at the meeting?", literal: "oh violence/force", entered_english: false },
  "oy vey": { definition: "oh woe; an expression of grief, distress, or exasperation", yiddish: "אוי וויי", pronunciation: "OY VAY", example: "Oy vey, another flat tire.", literal: "oh woe", entered_english: true },
  "oysgepucht": { definition: "overdressed; gaudy; dressed up beyond the occasion", yiddish: "אויסגעפּוצט", pronunciation: "oys-geh-PUTSHT", example: "She came to the picnic oysgepucht — full jewelry, silk blouse.", literal: null, entered_english: false },
  "pareve": { definition: "food containing neither meat nor dairy; neutral under kosher law", yiddish: "פּאַרעוו", pronunciation: "PAH-rev", example: "The margarine is pareve so you can use it with anything.", literal: null, entered_english: false },
  "paskudnik": { definition: "a nasty, contemptible, deceitful person", yiddish: "פּאַסקודניק", pronunciation: "pas-KUD-nik", example: "That paskudnik smiled to your face and stabbed you in the back.", literal: null, entered_english: false },
  "plotz": { definition: "to collapse or faint from strong emotion; to burst", yiddish: "פּלאַצן", pronunciation: "PLAHTS", example: "When she heard the news, she nearly plotzed.", literal: "to burst, explode", entered_english: false },
  "punim": { definition: "face; a sweet or cute face", yiddish: "פּנים", pronunciation: "PUH-nim", example: "Look at that punim — how could you say no to that face?", literal: "face", entered_english: false },
  "putz": { definition: "a fool; a contemptible jerk", yiddish: "פּאָץ", pronunciation: "PUTS", example: "Don't be such a putz — just apologize and be done with it.", literal: "penis", entered_english: true },
  "schav": { definition: "a cold sorrel soup, sometimes called Jewish borscht", yiddish: "שטשאַוו", pronunciation: "SHAV", example: "My grandmother made schav every summer — tart and cold and perfect.", literal: null, entered_english: false },
  "schlemiel": { definition: "a clumsy, unlucky, hapless person", yiddish: "שלמיאל", pronunciation: "shleh-MEEL", example: "He spilled the soup on the guest of honor — a true schlemiel.", literal: null, entered_english: true },
  "schlepp": { definition: "to drag or haul something with effort; to travel wearily", yiddish: "שלעפּן", pronunciation: "SHLEP", example: "I schlepped these bags six blocks in the rain for this?", literal: "to drag", entered_english: true },
  "schlimazel": { definition: "a chronically unlucky person; one to whom bad things always happen", yiddish: "שלימזל", pronunciation: "shlih-MAH-zel", example: "The schlemiel spills the soup; the schlimazel is the one it lands on.", literal: "bad luck", entered_english: false },
  "schlock": { definition: "cheap, shoddy merchandise or work", yiddish: "שלאַק", pronunciation: "SHLOK", example: "The boardwalk shops were full of schlock aimed at tourists.", literal: null, entered_english: true },
  "schlub": { definition: "a slob; an oafish, unkempt person", yiddish: "זשלאָב", pronunciation: "SHLUB", example: "He showed up to the interview looking like a total schlub.", literal: null, entered_english: true },
  "schmaltz": { definition: "excessive sentimentality; maudlin emotion", yiddish: "שמאַלץ", pronunciation: "SHMALTS", example: "That movie was pure schmaltz — I cried anyway.", literal: "rendered chicken fat", entered_english: true },
  "schmatta": { definition: "a rag; a piece of worn-out clothing", yiddish: "שמאַטע", pronunciation: "SHMAH-tah", example: "She wouldn't throw away that old coat — it was a schmatta but it was her mother's.", literal: "rag", entered_english: false },
  "schmear": { definition: "a spread, especially cream cheese; also to bribe or grease someone's palm", yiddish: "שמיר", pronunciation: "SHMEER", example: "Everything bagel with a thick schmear — perfect.", literal: "smear", entered_english: true },
  "schmo": { definition: "a stupid or unremarkable person; a nobody", yiddish: "שמאָ", pronunciation: "SHMOH", example: "Some schmo cut in line and acted like he didn't notice.", literal: null, entered_english: true },
  "schmooze": { definition: "to chat sociably; to make small talk for personal gain", yiddish: "שמועסן", pronunciation: "SHMOOZ", example: "He spent the whole party schmoozing instead of eating.", literal: null, entered_english: true },
  "schmuck": { definition: "a contemptible or foolish person; a jerk", yiddish: "שמאָק", pronunciation: "SHMUK", example: "Don't be a schmuck — just say you're sorry.", literal: "penis", entered_english: true },
  "schnook": { definition: "a timid, gullible, easily taken advantage of person", yiddish: "שנוק", pronunciation: "SHNOOK", example: "He paid double because he was too much of a schnook to negotiate.", literal: null, entered_english: true },
  "schnorrer": { definition: "a beggar; a habitual moocher", yiddish: "שנאָרער", pronunciation: "SHNOR-er", example: "He never bought a round in his life — a world-class schnorrer.", literal: null, entered_english: false },
  "schnoz": { definition: "a large nose; the nose (slang)", yiddish: "שנויץ", pronunciation: "SHNAHZ", example: "He had a schnoz you could see from across the room and wore it proudly.", literal: null, entered_english: true },
  "schnapps": { definition: "strong alcoholic spirits; brandy", yiddish: "שנאַפּס", pronunciation: "SHNAHPS", example: "After the funeral, someone always produces a bottle of schnapps.", literal: null, entered_english: true },
  "shabbat shalom": { definition: "a Sabbath greeting meaning 'peaceful Sabbath'", yiddish: "שבת שלום", pronunciation: "sha-BAHT shah-LOHM", example: "She texted shabbat shalom to the whole family every Friday afternoon.", literal: "peaceful Sabbath", entered_english: false },
  "shabbos": { definition: "the Jewish Sabbath, from Friday sundown to Saturday night", yiddish: "שבת", pronunciation: "SHAH-bis", example: "On shabbos the house went quiet and everything slowed down.", literal: null, entered_english: false },
  "shalom": { definition: "hello, goodbye, and peace — a versatile greeting", yiddish: "שלום", pronunciation: "shah-LOHM", example: "He said shalom and walked out the door.", literal: "peace", entered_english: true },
  "shegetz": { definition: "a non-Jewish boy or young man", yiddish: "שייגעץ", pronunciation: "SHAY-gets", example: "Her parents weren't thrilled that she was dating a shegetz.", literal: null, entered_english: false },
  "shikker": { definition: "a drunkard; drunk", yiddish: "שיכּור", pronunciation: "SHIK-er", example: "By the third toast he was completely shikker.", literal: "drunk", entered_english: false },
  "shiksa": { definition: "a non-Jewish girl or woman", yiddish: "שיקסע", pronunciation: "SHIK-sah", example: "His bubbe called every girlfriend a shiksa until he married a doctor.", literal: null, entered_english: false },
  "sholem aleichem": { definition: "a traditional Jewish greeting; also the name of a famous Yiddish author", yiddish: "שלום עליכם", pronunciation: "SHOH-lem ah-LAY-khem", example: "He walked in with a big sholem aleichem and shook everyone's hand.", literal: "peace be upon you", entered_english: false },
  "shnook": { definition: "a gullible, easily cheated person; variant of schnook", yiddish: "שנוק", pronunciation: "SHNOOK", example: "They saw him coming — a total shnook who'd believe anything.", literal: null, entered_english: false },
  "shnaps": { definition: "spirits, liquor; variant spelling of schnapps", yiddish: "שנאַפּס", pronunciation: "SHNAHPS", example: "He poured a finger of shnaps and didn't offer anyone else any.", literal: null, entered_english: false },
  "shnorer": { definition: "a beggar who wheedles and maneuvers for money; variant of schnorrer", yiddish: "שנאָרער", pronunciation: "SHNOR-er", example: "That shnorer hasn't paid for his own coffee in years.", literal: null, entered_english: false },
  "shpilkes": { definition: "anxious restlessness; an inability to sit still; nervous energy", yiddish: "שפּילקעס", pronunciation: "SHPIL-kes", example: "She had shpilkes the whole flight — up and down every twenty minutes.", literal: "pins and needles", entered_english: false },
  "shtick": { definition: "a gimmick, trademark routine, or practiced talent", yiddish: "שטיק", pronunciation: "SHTIK", example: "His whole shtick was the self-deprecating humor — it worked every time.", literal: "piece", entered_english: true },
  "shtetl": { definition: "a small Eastern European Jewish village or town", yiddish: "שטעטל", pronunciation: "SHTET-el", example: "Her grandparents left the shtetl in 1912 and never looked back.", literal: "little town", entered_english: false },
  "shtetlishe": { definition: "characteristic of or relating to shtetl life", yiddish: "שטעטלישע", pronunciation: "SHTET-lish-eh", example: "There was something shtetlishe about the neighborhood — everyone knew everyone's business.", literal: null, entered_english: false },
  "shul": { definition: "a synagogue", yiddish: "שול", pronunciation: "SHOOL", example: "He hadn't been to shul in twenty years but showed up for his mother's yahrzeit.", literal: "school", entered_english: false },
  "shvitz": { definition: "to sweat; also a steam bath", yiddish: "שוויצן", pronunciation: "SHVITS", example: "He was shvitzing through his shirt before the speech even started.", literal: null, entered_english: false },
  "simcha": { definition: "a joyous celebration; a happy occasion", yiddish: "שמחה", pronunciation: "SIM-khah", example: "A wedding, a bar mitzvah, a bris — every simcha brings the whole family.", literal: "joy", entered_english: false },
  "tate": { definition: "father", yiddish: "טאַטע", pronunciation: "TAH-teh", example: "Tate sat at the head of the table and said very little but everyone watched him.", literal: null, entered_english: false },
  "tchotchke": { definition: "a small trinket or knickknack; a decorative trifle", yiddish: "טשאַטשקע", pronunciation: "CHAHCH-keh", example: "Every shelf in the apartment was crowded with tchotchkes from every trip they'd ever taken.", literal: null, entered_english: true },
  "tikkun olam": { definition: "the concept of repairing or healing the world through righteous acts", yiddish: "תיקון עולם", pronunciation: "tee-KOON oh-LAHM", example: "She framed her whole career in public health as tikkun olam.", literal: "repair of the world", entered_english: false },
  "tref": { definition: "not kosher; forbidden food; by extension anything improper or dubious", yiddish: "טרף", pronunciation: "TREF", example: "The whole business arrangement felt tref — I didn't touch it.", literal: "torn", entered_english: false },
  "tsukneplekh": { definition: "worries, anxieties, nagging concerns", yiddish: "צוקנעפּלעך", pronunciation: "TSUK-nep-lekh", example: "She woke at 3am with all her tsukneplekh lined up waiting for her.", literal: null, entered_english: false },
  "tsuris": { definition: "troubles, woes, aggravation", yiddish: "צרות", pronunciation: "TSOO-ris", example: "I don't need your tsuris right now — I have enough of my own.", literal: "troubles", entered_english: false },
  "tuches": { definition: "buttocks, rear end", yiddish: "תּחת", pronunciation: "TUK-us", example: "Get off your tuches and help me with these boxes.", literal: "underneath", entered_english: true },
  "tzimmes": { definition: "a sweet stew of vegetables and fruit; by extension, a big fuss or commotion", yiddish: "צימעס", pronunciation: "TSIM-is", example: "Don't make such a tzimmes about it — it's just a parking ticket.", literal: null, entered_english: false },
  "vey iz mir": { definition: "woe is me; an expression of despair or self-pity", yiddish: "וויי איז מיר", pronunciation: "VAY iz MEER", example: "Vey iz mir — I left the kugel in the oven for three hours.", literal: "woe is me", entered_english: false },
  "verklempt": { definition: "choked with emotion; overcome; unable to speak from feeling", yiddish: "פֿאַרקלעמט", pronunciation: "fer-KLEMPT", example: "She got so verklempt at the toast she just waved her hand and sat down.", literal: "clamped", entered_english: true },
  "yarmulke": { definition: "a small round skullcap worn by observant Jewish men", yiddish: "יאַרמולקע", pronunciation: "YAH-meh-keh", example: "He kept a spare yarmulke in his jacket pocket for any occasion.", literal: null, entered_english: true },
  "yenta": { definition: "a busybody; a gossip; someone who meddles in others' business", yiddish: "יענטע", pronunciation: "YEN-tah", example: "The building's yenta knew everyone's business before they did.", literal: null, entered_english: true },
  "yiddish": { definition: "the language of Ashkenazi Jews, written in Hebrew script", yiddish: "ייִדיש", pronunciation: "YID-ish", example: "His grandmother only felt truly comfortable speaking Yiddish.", literal: "Jewish", entered_english: true },
  "yiddishe kop": { definition: "a Jewish way of thinking; clever, resourceful problem-solving", yiddish: "ייִדישע קאָפּ", pronunciation: "YID-ish-eh KOP", example: "She found a workaround nobody else saw — real yiddishe kop.", literal: "Jewish head", entered_english: false },
  "yiddishe meydel": { definition: "a Jewish girl", yiddish: "ייִדישע מיידל", pronunciation: "YID-ish-eh MAY-del", example: "He brought home a yiddishe meydel and the whole family exhaled.", literal: "Jewish girl", entered_english: false },
  "zaftig": { definition: "pleasingly plump; full-figured; voluptuous", yiddish: "זאַפֿטיק", pronunciation: "ZAF-tig", example: "The word zaftig carries a warmth the English 'curvy' doesn't.", literal: "juicy", entered_english: true },
  "zayde": { definition: "grandfather", yiddish: "זיידע", pronunciation: "ZAY-deh", example: "Zayde fell asleep in his chair every Sunday and nobody woke him.", literal: null, entered_english: false },
  "zei gezunt": { definition: "be well; stay healthy — a farewell blessing", yiddish: "זיי געזונט", pronunciation: "ZAY geh-ZUNT", example: "She hugged him at the door and said zei gezunt like it meant everything.", literal: "be healthy", entered_english: false },
  "zets": { definition: "a sharp blow or smack; by extension a stroke of luck", yiddish: "זעץ", pronunciation: "ZETS", example: "The news hit him like a zets — he had to sit down.", literal: null, entered_english: false },
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (path === "/api/random" || path === "/api/random/") {
      const keys = Object.keys(WORDS);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      return new Response(
        JSON.stringify({ word: randomKey, ...WORDS[randomKey] }),
        { headers: corsHeaders }
      );
    }

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
          JSON.stringify({ word, ...WORDS[word] }),
          { headers: corsHeaders }
        );
      } else {
        return new Response(
          JSON.stringify({ error: "Word not found" }),
          { status: 404, headers: corsHeaders }
        );
      }
    }

    if (path === "/api/list" || path === "/api/list/") {
      return new Response(
        JSON.stringify({ count: Object.keys(WORDS).length, words: WORDS }),
        { headers: corsHeaders }
      );
    }

    if (path === "/api" || path === "/api/") {
      return new Response(
        JSON.stringify({
          endpoints: {
            "/api/random": "Get a random Yiddish word with full details",
            "/api/word?q=kvetch": "Look up a specific word",
            "/api/list": "List all words with full details"
          },
          count: Object.keys(WORDS).length
        }),
        { headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ error: "Not found" }),
      { status: 404, headers: corsHeaders }
    );
  }
};
