import { useState } from "react";

const publicAsset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
const imageUrl = (path) =>
  path.startsWith("/") ? publicAsset(path) : path;
const WAVE_BAR_COUNT = 72;

const getWaveBarHeight = (wave, index) => {
  const position = index / (WAVE_BAR_COUNT - 1);
  const envelope = 0.18 + 0.82 * Math.pow(Math.sin(Math.PI * position), 0.7);
  const grain = 0.5 + 0.5 * Math.sin(index * 12.9898);

  if (wave === "fast") {
    const kick = Math.pow(Math.max(0, Math.sin((index + 0.5) * Math.PI / 8)), 5);
    const detail = 0.5 + 0.5 * Math.sin(index * 2.17);
    return 3 + envelope * (3 + kick * 18 + detail * 9 + grain * 6);
  }

  if (wave === "syncopated") {
    const accents = [0.18, 0.08, 0.3, 0.68, 0.12, 0.24, 0.88, 0.16, 0.1, 0.52, 0.2, 0.36];
    const accent = accents[index % accents.length];
    return 3 + envelope * (3 + accent * 22 + grain * 7);
  }

  const swell = 0.5 + 0.5 * Math.sin(index * 0.22 - 1.1);
  return 3 + envelope * (2 + swell * 12 + grain * 3);
};

/* ------------------------------------------------------------------
   À REMPLIR : toutes les infos réelles de VALANA sont ici.
   Laisse une chaîne vide "" pour masquer une ligne.
------------------------------------------------------------------- */
const INFO = {
  email: "valana.booking@gmail.com",
  instagram: "",      // ex: "https://instagram.com/valana"
  soundcloud: "https://soundcloud.com/valana-psyche",
  mixcloud: "",
  youtube: "",
  beatport: "",
  location: "",       // ex: "Marseille, France"
  photoUrl: "",       // ex: "/valana.jpg" (fichier dans /public)
};

const T = {
  fr: {
    tagline: "au delà de la psychédélique et du groove",
    bookingButton: "Booking",
    navigationLabel: "Navigation",
    menuOpenLabel: "Ouvrir le menu",
    menuCloseLabel: "Fermer le menu",
    heroGenresLabel: "Genres musicaux",
    emblemAlt: "Emblème VALANA",
    originImageAlt: "Spirale lumineuse dans une nébuleuse",
    bioImageAlt: "VALANA en performance",
    nav: ["Univers", "Origine", "Biographie", "Sons", "Label", "Booking", "Contact"],
    originTitle: "Origine",
    origin: [
      "VALANA (वलन) puise ses racines dans le sanskrit, langue sacrée et ancestrale de l’Inde.",
      "Elle désigne le mouvement ondulatoire, les courbes et les dynamiques fluides, ainsi que le changement de direction et de fluctuation. Elle évoque aussi la déflexion de la lumière : le moment où un rayon lumineux, en traversant un milieu ou en rencontrant un obstacle, dévie de sa trajectoire et se révèle autrement. Elle symbolise ainsi l’évolution, la transition et le flux perpétuel des formes et des énergies.",
      "VALANA fait écho aux fréquences et aux rythmes évolutifs des genres musicaux où le son se déploie en vagues et en spirales hypnotiques, incarnant le mouvement perpétuel de la nature, de la conscience et du son.",
    ],
    bioTitle: "Biographie",
    bio: [
      "Valana évolue depuis vingt ans dans l’univers électronique, dont quinze dans la musique psychédélique transcendantale, et mixe depuis dix ans. Ses premiers pas sur scène ont lieu au Transition Festival, au Portugal. En parallèle, elle poursuit son parcours pendant cinq ans aux côtés de l’association Unisson, puis avec Nataraja, collectif et label parisien pour lequel et avec lequel elle mixe depuis dix ans. Elle a aussi joué ponctuellement dans diverses soirées à Paris et alentours comme au Nexus, à la Sand Fabric, au Bateau Phare, à la Péniche cinéma, aux Folies Pigalle ainsi que sur la côte d'Azur notamment au Green Garden (Antibes), à la Bioscenose, à l'Antre (Nice)...",
      "Elle débute par les sons nocturnes de la psytrance, de la psygroovy, de la twilight et de la forest, puis s’ouvre à la psytechno, à la bush prog et à la psygressive. Elle explore ensuite des tempos plus lents, jusqu’aux territoires profonds et apaisés de la psybass, de la psydub, de la psybreak et de la psychill.",
      "Au-delà des platines, VALANA s’implique dans l’envers du décor. Référente sur scène, elle s’occupe des branchements et du bon déroulement technique des soirées. Elle a également créé des visuels pour l'association Unisson et le Label Transubtil.",
    ],
    soundTitle: "Identité musicale",
    soundIntro:
      "Des styles variés, des univers musicaux éclectiques !",
    collectivesTitle: "Labels & collectifs",
    collectives: [
      {
        name: "Unisson",
        logo: "/unisson-logo.png",
        paragraphs: [
          "Unisson est une association de passionnés de son et d’événementiel, qui réunit des pôles de mix, de production musicale et d’organisation de soirées. Elle propose des soirées accessibles et bienveillantes, avec une équipe de DJs maison.",
          "VALANA a collaboré pendant cinq ans avec Unisson. Elle y a mixé et en a aussi créé des visuels.",
        ],
        links: [
          ["Facebook", "https://facebook.com/unisson"],
          ["Instagram", "https://instagram.com/unisson.asso"],
        ],
      },
      {
        name: "Nataraja",
        logo: "/nataraja-logo.svg",
        paragraphs: [
          "Nataraja est une association parisienne née de la scène psychédélique. À la fois collectif d’artistes, organisateur de soirées et label psytrance, elle défend une culture électronique ouverte, familiale et chaleureuse. Elle est aussi à l’origine du festival Nataraja Psychedelic Gathering, en Bourgogne, dont la 10e édition s’est tenue du 16 au 19 juillet 2026.",
          "VALANA mixe pour et avec Nataraja depuis une dizaine d’années. Ce compagnonnage de longue date l’a fait grandir au sein d’une communauté soudée, entre soirées, scènes de festival et partages avec des artistes de la scène locale et internationale.",
        ],
        links: [
          ["Site internet", "https://nataraja.fun"],
          ["Artistes", "https://nataraja.fun/artistes"],
          ["Facebook", "https://www.facebook.com/profile.php?id=61571059611305"],
          ["Bandcamp", "https://nataraja.bandcamp.com"],
          ["Instagram", "https://instagram.com/nataraja_collective"],
        ],
      },
    ],
    collectiveLinksLabel: "Liens",
    worlds: [
      {
        name: "Mainstage",
        bpm: "145–180",
        tempo: 155,
        wave: "fast",
        mood: "Énergie, puissance, transe",
        styles: [
          ["Psytrance", "Des basses puissantes et des mélodies immersives pour faire monter l’énergie du dancefloor."],
          ["Twilight", "Une psytrance plus sombre et intense, aux sonorités acides et aux rythmes entraînants."],
          ["Forest", "Des textures organiques et mystérieuses, inspirées par la nature et les ambiances nocturnes."],
        ],
      },
      {
        name: "Alternative",
        bpm: "125–145",
        tempo: 135,
        wave: "syncopated",
        mood: "Groove, exploration, liberté",
        styles: [
          ["Psytechno", "La rencontre entre la pulsation hypnotique de la techno et les textures psychédéliques."],
          ["Bush Prog", "Une progressive aux grooves souples et aux sonorités chaleureuses, pensée pour le mouvement."],
          ["Electro groove & funk", "Des rythmes syncopés et des basses rebondissantes aux accents électro et funk."],
          ["Psygressive", "Des progressions psychédéliques qui développent le groove avec fluidité et subtilité."],
        ],
      },
      {
        name: "Chill",
        bpm: "60–125",
        tempo: 100,
        wave: "slow",
        mood: "Profondeur, nuances, évasion",
        styles: [
          ["Psybass", "Des basses profondes et des textures psychédéliques dans des tempos plus posés."],
          ["Psydub", "Des échos, des basses rondes et des paysages sonores inspirés du dub."],
          ["Psybreak", "Des rythmiques breakées et des variations qui jouent entre groove et expérimentation."],
          ["Psychill", "Des atmosphères amples et apaisées pour ralentir, respirer et voyager."],
        ],
      },
    ],
    bookTitle: "Booking & collaborations",
    bookRows: [
      ["Format", "DJ sets adaptés aux événements et festivals en plein air, clubs underground et espaces chill-out."],
      ["Public", "Amateurs de musique électronique psychédélique, de cultures alternatives et d’expériences immersives."],
      ["Objectif", "Collaborations avec des collectifs et présence sur les scènes électroniques en France et à l’international."],
      ["Durée", "1h30 à 3h, sets longs possibles"],
    ],
    contactTitle: "Contact & Lien",
    placeholderMail: "Contact à renseigner",
    print: "Imprimer / PDF",
    links: "Écoute",
  },
  en: {
    tagline: "Beyond psychedelia and groove",
    bookingButton: "Booking",
    navigationLabel: "Navigation",
    menuOpenLabel: "Open menu",
    menuCloseLabel: "Close menu",
    heroGenresLabel: "Music genres",
    emblemAlt: "VALANA emblem",
    originImageAlt: "Luminous spiral in a nebula",
    bioImageAlt: "VALANA performing",
    nav: ["World", "Origin", "Biography", "Sound", "Label", "Booking", "Contact"],
    originTitle: "Origin",
    origin: [
      "Valana (वलन) has its roots in Sanskrit, the sacred and ancient language of India.",
      "It describes wave-like movement - curves and fluid dynamics - as well as a change in direction or fluctuation, symbolising evolution, transition, and the perpetual flow of forms and energies.",
      "Valana echoes the frequencies and evolving rhythms of musical genres where sound unfolds in waves and hypnotic spirals, embodying the perpetual movement of nature, consciousness, and sound.",
    ],
    bioTitle: "Biography",
    bio: [
      "Valana has been part of the electronic music scene for twenty years, including fifteen years in psychedelic trance music, and has been DJing for ten years. Her first steps on stage were at Transition Festival in Portugal. Alongside this, she spent five years with the Unisson association, then joined Nataraja, a Paris-based collective and label for and with whom she has been DJing for ten years. She has also played at various events in and around Paris, including Nexus, Sand Fabrik, Bateau Phare, Péniche Cinéma and Folies Pigalle, as well as on the Côte d’Azur, notably at Green Garden (Antibes), Bioscenose and L’Antre (Nice)...",
      "She began with the nocturnal sounds of psytrance, psygroovy, twilight and forest, then opened up to psytechno, bush prog and psygressive. She later explored slower tempos, reaching the deep, tranquil territories of psybass, psydub, psybreak and psychill.",
      "Beyond the decks, VALANA is involved behind the scenes. As a stage coordinator, she handles connections and helps ensure the smooth technical running of events. She has also created visuals for the Unisson association and the Transubtil label.",
    ],
    soundTitle: "Musical identity",
    soundIntro:
      "A wide range of styles across eclectic musical spectrums",
    collectivesTitle: "Labels & collectives",
    collectives: [
      {
        name: "Unisson",
        logo: "/unisson-logo.png",
        paragraphs: [
          "Unisson is an association of sound and event enthusiasts, bringing together teams focused on DJing, music production and event organising. It puts on welcoming, accessible parties featuring its own team of DJs.",
          "VALANA collaborated with Unisson for five years. She DJed at its events and also created visuals for the association.",
        ],
        links: [
          ["Facebook", "https://facebook.com/unisson"],
          ["Instagram", "https://instagram.com/unisson.asso"],
        ],
      },
      {
        name: "Nataraja",
        logo: "/nataraja-logo.svg",
        paragraphs: [
          "Nataraja is a Paris-based association born from the psychedelic scene. A collective of artists, event organiser and psytrance label, it champions an open, welcoming and warm electronic music culture. It is also behind the Nataraja Psychedelic Gathering festival in Burgundy, whose 10th edition took place from 16 to 19 July 2026.",
          "VALANA has been DJing for and with Nataraja for around ten years. This longstanding relationship has helped her grow within a close-knit community, through parties, festival stages and exchanges with artists from the local and international scenes.",
        ],
        links: [
          ["Website", "https://nataraja.fun"],
          ["Artists", "https://nataraja.fun/artistes"],
          ["Facebook", "https://www.facebook.com/profile.php?id=61571059611305"],
          ["Bandcamp", "https://nataraja.bandcamp.com"],
          ["Instagram", "https://instagram.com/nataraja_collective"],
        ],
      },
    ],
    collectiveLinksLabel: "Links",
    worlds: [
      {
        name: "Mainstage",
        bpm: "145–180",
        tempo: 155,
        wave: "fast",
        mood: "Energy, power, trance",
        styles: [
          ["Psytrance", "Powerful basslines and immersive melodies that build energy on the dancefloor."],
          ["Twilight", "A darker, more intense psytrance sound, with acidic textures and driving rhythms."],
          ["Forest", "Organic, mysterious textures inspired by nature and nocturnal atmospheres."],
        ],
      },
      {
        name: "Alternative",
        bpm: "125–145",
        tempo: 135,
        wave: "syncopated",
        mood: "Groove, exploration, freedom",
        styles: [
          ["Psytechno", "The meeting point of techno's hypnotic pulse and psychedelic textures."],
          ["Bush Prog", "Progressive sounds with fluid grooves and warm textures, made for movement."],
          ["Electro groove & funk", "Syncopated rhythms and bouncing basslines with electro and funk influences."],
          ["Psygressive", "Psychedelic progressions that build groove with fluidity and subtlety."],
        ],
      },
      {
        name: "Chill",
        bpm: "60–125",
        tempo: 100,
        wave: "slow",
        mood: "Depth, nuance, escape",
        styles: [
          ["Psybass", "Deep bass and psychedelic textures at more laid-back tempos."],
          ["Psydub", "Echoes, rounded basslines and soundscapes inspired by dub."],
          ["Psybreak", "Broken rhythms and shifting patterns between groove and experimentation."],
          ["Psychill", "Expansive, calming atmospheres to slow down, breathe and drift."],
        ],
      },
    ],
    bookTitle: "Booking & collaborations",
    bookRows: [
      ["Format", "DJ sets for open-air festivals, forest stages, underground clubs and chill-out spaces."],
      ["Audience", "Fans of psychedelic electronic music, alternative cultures and immersive experiences."],
      ["Goal", "Collaborations with collectives and a presence on electronic stages in France and abroad."],
      ["Set length", "1.5 to 3 hours; extended sets available"],
    ],
    contactTitle: "Links & contact",
    placeholderMail: "Contact to be added",
    print: "Print / PDF",
    links: "Listen",
  },
};

const ANCHORS = ["univers", "origine", "biographie", "sons", "labels", "booking", "contact"];

export default function App() {
  const [lang, setLang] = useState("fr");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = T[lang];

  const links = [
    ["SoundCloud", INFO.soundcloud],
    ["Mixcloud", INFO.mixcloud],
    ["YouTube", INFO.youtube],
    ["Beatport", INFO.beatport],
    ["Instagram", INFO.instagram],
  ].filter(([, url]) => url);

  return (
    <>
      <header className="bar">
        <a href="#top" className="bar-name">
          <span className="bar-name-icon" aria-hidden="true">
            <img src={publicAsset("/logo-90-opacity.png")} alt="" />
          </span>
          <span>VALANA</span>
        </a>
        <nav id="primary-navigation" className={mobileMenuOpen ? "is-open" : ""} aria-label={t.navigationLabel}>
          {t.nav.map((label, i) => (
            <a key={label} href={`#${ANCHORS[i]}`} onClick={() => setMobileMenuOpen(false)}>{label}</a>
          ))}
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={mobileMenuOpen ? t.menuCloseLabel : t.menuOpenLabel}
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="bar-tools">
          <button className={lang === "fr" ? "on" : ""} onClick={() => setLang("fr")} aria-pressed={lang === "fr"}>FR</button>
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button>
        </div>
      </header>

      <main id="top">
        <section
          className="hero"
          id="univers"
          style={{
            "--hero-background-image": `url("${publicAsset("/hero-background.jpeg")}")`,
          }}
        >
          <div className="hero-content">
            <div className="hero-art">
              <img
                src={imageUrl(INFO.photoUrl || "/logo-90-opacity.png")}
                alt={t.emblemAlt}
              />
            </div>
            <div className="hero-text">
              <h1>VALANA</h1>
              <p className="hero-tag">{t.tagline}</p>
              {INFO.location && <p className="hero-loc">{INFO.location}</p>}
            </div>
            {INFO.email && (
              <a className="hero-booking" href={`mailto:${INFO.email}`}>
                <span>{t.bookingButton}</span>
                <span>{INFO.email}</span>
              </a>
            )}
            <p className="hero-genres" aria-label={t.heroGenresLabel}>
              Psytrance · Twilight · Forest · Psytechno · Bush Prog · Electro groove &amp; funk · Psygressive · Psybass · psydub · Psybreak · Psychill
            </p>
          </div>
          <div className="horizon" aria-hidden="true" />
        </section>

        <section className="row" id="origine">
          <h2>{t.originTitle}</h2>
          <div className="origin-content">
            <div className="prose">
              {t.origin.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <figure className="origin-visual">
              <img className="origin-photo" src={publicAsset("/origin-photo.jpeg")} alt={t.originImageAlt} />
              <svg className="origin-ornaments" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
                <defs>
                  <path id="origin-inscription-path" d="M 200 6 A 194 194 0 1 1 199.99 6" />
                  <linearGradient id="portal-orange-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffd18a" />
                    <stop offset="48%" stopColor="#f4773b" />
                    <stop offset="100%" stopColor="#75429a" />
                  </linearGradient>
                  <linearGradient id="portal-metal-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#dce6df" />
                    <stop offset="28%" stopColor="#45656a" />
                    <stop offset="54%" stopColor="#132c37" />
                    <stop offset="78%" stopColor="#aebbb5" />
                    <stop offset="100%" stopColor="#263c46" />
                  </linearGradient>
                  <g id="portal-tooth">
                    <path d="M200 2 219 26 209 22 200 37 191 22 181 26Z" />
                    <path d="M200 9 211 24 200 20 189 24Z" />
                    <path d="M200 25v7" />
                  </g>
                </defs>
                <polygon className="ornament-bezel" points="200,1 301,28 372,99 399,200 372,301 301,372 200,399 99,372 28,301 1,200 28,99 99,28" />
                <polygon className="ornament-orbit" points="200,6 297,32 368,103 394,200 368,297 297,368 200,394 103,368 32,297 6,200 32,103 103,32" />
                <polygon className="ornament-guide" points="200,16 292,41 359,108 384,200 359,292 292,359 200,384 108,359 41,292 16,200 41,108 108,41" />
                {Array.from({ length: 36 }, (_, index) => (
                  <path
                    key={index}
                    className={`ornament-tick${index % 4 === 0 ? " ornament-tick-major" : ""}`}
                    d={index % 4 === 0 ? "M200 14v9" : "M200 17v5"}
                    transform={`rotate(${index * 10} 200 200)`}
                  />
                ))}
                <text className="ornament-inscription">
                  <textPath href="#origin-inscription-path" textLength="1218" lengthAdjust="spacing">
                    वलन ✧ प्रकृतेः चेतनायाः नादस्य च अनन्तः प्रवाहः ✧ वलन ✧ प्रकृतेः चेतनायाः नादस्य च अनन्तः प्रवाहः ✧ वलन ✧ प्रकृतेः चेतनायाः नादस्य च अनन्तः प्रवाहः ✧
                  </textPath>
                </text>
                {Array.from({ length: 8 }, (_, index) => (
                  <use
                    key={index}
                    className={`ornament-tooth${index % 2 !== 0 ? " ornament-tooth-orange" : ""}`}
                    href="#portal-tooth"
                    transform={`rotate(${index * 45} 200 200)`}
                  />
                ))}
                <g className="ornament-sigil" transform="translate(200 14)">
                  <path d="M0 -12 11 0 0 12 -11 0Z M0 -25V-16 M0 16V25" />
                  <circle r="3" />
                </g>
                <g className="ornament-sigil" transform="translate(386 200) rotate(90)">
                  <path d="M0 -12 11 0 0 12 -11 0Z M0 -25V-16 M0 16V25" />
                  <circle r="3" />
                </g>
                <g className="ornament-sigil" transform="translate(200 386) rotate(180)">
                  <path d="M0 -12 11 0 0 12 -11 0Z M0 -25V-16 M0 16V25" />
                  <circle r="3" />
                </g>
                <g className="ornament-sigil" transform="translate(14 200) rotate(270)">
                  <path d="M0 -12 11 0 0 12 -11 0Z M0 -25V-16 M0 16V25" />
                  <circle r="3" />
                </g>
                <g className="ornament-star" transform="translate(68 68)">
                  <path d="M0 -7V7 M-7 0H7" /><circle r="2" />
                </g>
                <g className="ornament-star" transform="translate(332 68)">
                  <path d="M0 -7V7 M-7 0H7" /><circle r="2" />
                </g>
                <g className="ornament-star" transform="translate(332 332)">
                  <path d="M0 -7V7 M-7 0H7" /><circle r="2" />
                </g>
                <g className="ornament-star" transform="translate(68 332)">
                  <path d="M0 -7V7 M-7 0H7" /><circle r="2" />
                </g>
              </svg>
            </figure>
          </div>
        </section>

        <section className="row" id="biographie">
          <h2>{t.bioTitle}</h2>
          <div className="bio-content">
            <div className="bio-photo-frame">
              <div className="bio-photo-image">
                <img className="bio-photo" src={publicAsset("/bio-photo.png")} alt={t.bioImageAlt} />
              </div>
              <svg className="bio-photo-ornaments" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden="true">
                <g className="bio-wave-group bio-wave-group-bottom">
                  <path className="bio-wave-echo" d="M-18 472 C0 472 0 505 18 505 S36 485 54 485 72 530 90 530 108 497 126 497 144 516 162 516 180 492 198 492" />
                  <path className="bio-wave-main" d="M-22 494 C-7 494 -6 525 9 525 S25 481 40 481 56 548 71 548 87 503 102 503 118 534 133 534 149 489 164 489 180 522 195 522 211 505 226 505" />
                  <path className="bio-wave-glint" d="M-18 505 C-7 505 -7 517 4 517 S19 496 30 496 45 531 56 531 71 509 82 509 97 524 108 524 123 500 134 500 149 519 160 519 175 508 190 508" />
                  <circle className="bio-wave-node" cx="71" cy="548" r="2.6" />
                  <circle className="bio-wave-node bio-wave-node-soft" cx="164" cy="489" r="1.8" />
                </g>
              </svg>
            </div>
            <div className="prose">
              {t.bio.map((p, i) => (
                <p key={i} className={p.startsWith("[") ? "todo" : ""}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="row" id="sons">
          <h2>{t.soundTitle}</h2>
          <div>
            <p className="lead">{t.soundIntro}</p>
            <div className="worlds">
              {t.worlds.map((w, wi) => (
                <article key={w.name} className={`world w${wi}`}>
                  <div className="world-heading">
                    <h3>{w.name}</h3>
                    <span className="world-bpm">{w.bpm} BPM</span>
                  </div>
                  <p className="mood">{w.mood}</p>
                  {w.styles.map(([name, desc]) => (
                    <div key={name} className="style">
                      <h4>{name}</h4>
                      <p>{desc}</p>
                    </div>
                  ))}
                  <svg
                    className={`world-wave world-wave-${w.wave}`}
                    viewBox="0 0 400 48"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    style={{ "--beat-duration": `${240 / w.tempo}s` }}
                  >
                    <line className="world-wave-baseline" x1="0" y1="24" x2="400" y2="24" />
                    {Array.from({ length: WAVE_BAR_COUNT }, (_, index) => {
                      const height = getWaveBarHeight(w.wave, index);
                      const step = 400 / WAVE_BAR_COUNT;
                      return (
                        <rect
                          key={index}
                          className="world-wave-bar"
                          x={index * step + step * 0.25}
                          y={24 - height / 2}
                          width={step * 0.5}
                          height={height}
                          rx={step * 0.25}
                          style={{ animationDelay: `${-index * 0.025}s` }}
                        />
                      );
                    })}
                  </svg>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="row" id="labels">
          <h2>{t.collectivesTitle}</h2>
          <div className="prose">
            {t.collectives.map((collective) => (
              <article className="collective" key={collective.name}>
                <h3 className="collective-title">
                  <img src={publicAsset(collective.logo)} alt="" aria-hidden="true" />
                  <span>{collective.name}</span>
                </h3>
                {collective.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <ul className="links collective-links" aria-label={`${collective.name} — ${t.collectiveLinksLabel}`}>
                  {collective.links.map(([label, url]) => (
                    <li key={url}><a href={url} target="_blank" rel="noreferrer">{label}</a></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <div className="booking-contact-print-group">
        <section className="row" id="booking">
          <div className="booking-layout">
            <div>
              <h2>{t.bookTitle}</h2>
              <dl className="book">
                {t.bookRows.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd className={v.startsWith("[") ? "todo" : ""}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {INFO.email && (
              <a className="booking-cta" href={`mailto:${INFO.email}`}>
                <span>{t.bookingButton}</span>
              </a>
            )}
          </div>
        </section>

        <section className="row contact" id="contact">
          <h2>{t.contactTitle}</h2>
          <div>
            {INFO.email ? (
              <a className="mail" href={`mailto:${INFO.email}`}>{INFO.email}</a>
            ) : (
              <p className="todo">{t.placeholderMail}</p>
            )}
            {links.length > 0 && (
              <ul className="links" aria-label={t.links}>
                {links.map(([name, url]) => (
                  <li key={name}><a href={url} target="_blank" rel="noreferrer">{name}</a></li>
                ))}
              </ul>
            )}
            {INFO.email && (
              <a className="booking-cta contact-booking" href={`mailto:${INFO.email}`}>
                <span>{t.bookingButton}</span>
              </a>
            )}
            <button className="print" onClick={() => window.print()}>{t.print}</button>
          </div>
        </section>
        </div>
      </main>

    </>
  );
}
