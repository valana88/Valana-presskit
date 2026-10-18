import { useState } from "react";

const publicAsset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
const imageUrl = (path) =>
  path.startsWith("/") ? publicAsset(path) : path;

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
    nav: ["Univers", "Origine", "Biographie", "Sons", "Booking", "Contact"],
    originTitle: "Origine",
    origin: [
      "Valana (वलन) puise ses racines dans le sanskrit, langue sacrée et ancestrale de l'Inde.",
      "Elle désigne le mouvement ondulatoire, les courbes et dynamiques fluides ainsi que le changement de direction et de fluctuation ; symbolisant l'évolution, la transition et le flux perpétuel des formes et des énergies.",
      "Valana fait écho aux fréquences et aux rythmes évolutifs des genres musicaux où le son se déploie en vagues et en spirales hypnotiques, incarnant le mouvement perpétuel de la nature, de la conscience et du son.",
    ],
    bioTitle: "Biographie",
    bio: [
      "Valana évolue depuis vingt ans dans l’univers électronique, dont quinze dans la musique psychédélique transcendantale, et mixe depuis dix ans. Ses premiers pas sur scène ont lieu au Transition Festival, au Portugal. En parallèle, elle poursuit son parcours pendant cinq ans aux côtés de l’association Unisson, puis avec Nataraja, collectif et label parisien pour lequel et avec lequel elle mixe depuis dix ans. Elle a aussi joué ponctuellement dans diverses soirées à Paris et alentours comme au Nexus, à la Sand Fabric, au Bateau Phare, à la Péniche cinéma, aux Folies Pigalle ainsi que sur la côte d'Azur notamment au Green Garden (Antibes), à la Bioscenose, à l'Antre (Nice)...",
      "Elle débute par les sons nocturnes de la psytrance, de la psygroovy, de la twilight et de la forest, puis s’ouvre à la psytechno, à la bush prog et à la psygressive. Elle explore ensuite des tempos plus lents, jusqu’aux territoires profonds et apaisés de la psybass, de la psydub, de la psybreak et de la psychill.",
      "Au-delà des platines, VALANA s’implique dans l’envers du décor. Référente sur scène, elle s’occupe des branchements et du bon déroulement technique des soirées. Elle a également créé des visuels pour l'association Unisson et le Label Transubtil.",
    ],
    soundTitle: "Identité musicale",
    soundIntro:
      "Des styles variés, des mondes musicaux éclectiques",
    collectivesTitle: "Labels et collectifs",
    collectives: [
      {
        name: "Unisson",
        logo: "/unisson-logo.png",
        paragraphs: [
          "Unisson est une association de passionnés de son et d’événementiel, qui réunit des pôles de mix, de production musicale et d’organisation de soirées. Elle propose des soirées accessibles et bienveillantes, avec une équipe de DJs maison.",
          "VALANA a collaboré pendant cinq ans avec Unisson. Elle y a mixé et en a aussi créé les visuels.",
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
          ["Facebook", "https://www.facebook.com/NatarajaOfficial"],
          ["Bandcamp", "https://nataraja.bandcamp.com"],
          ["Instagram", "https://instagram.com/nataraja_collective"],
        ],
      },
    ],
    collectiveLinksLabel: "Liens",
    worlds: [
      {
        name: "Mainstage",
        mood: "Énergie, puissance, transe",
        styles: [
          ["Psytrance", "Des basses puissantes et des mélodies immersives pour faire monter l’énergie du dancefloor."],
          ["Twilight", "Une psytrance plus sombre et intense, aux sonorités acides et aux rythmes entraînants."],
          ["Forest", "Des textures organiques et mystérieuses, inspirées par la nature et les ambiances nocturnes."],
        ],
      },
      {
        name: "Alternative",
        mood: "Groove, exploration, liberté",
        styles: [
          ["Psytechno", "La rencontre entre la pulsation hypnotique de la techno et les textures psychédéliques."],
          ["Bush Prog", "Une progressive aux grooves souples et aux sonorités chaleureuses, pensée pour le mouvement."],
          ["Electro groove & funk", "Des rythmes syncopés et des basses rebondissantes aux accents électro et funk."],
        ],
      },
      {
        name: "Chill",
        mood: "Profondeur, nuances, évasion",
        styles: [
          ["Psygressive", "Des progressions psychédéliques qui développent le groove avec fluidité et subtilité."],
          ["Psybass", "Des basses profondes et des textures psychédéliques dans des tempos plus posés."],
          ["Psydub", "Des échos, des basses rondes et des paysages sonores inspirés du dub."],
          ["Psybreak", "Des rythmiques breakées et des variations qui jouent entre groove et expérimentation."],
          ["Psychill", "Des atmosphères amples et apaisées pour ralentir, respirer et voyager."],
        ],
      },
    ],
    bookTitle: "Booking & collaborations",
    bookRows: [
      ["Format", "DJ sets adaptés aux festivals en plein air, scènes forestières, clubs underground et espaces chill-out."],
      ["Public", "Amateurs de musique électronique psychédélique, de cultures alternatives et d’expériences immersives."],
      ["Objectif", "Collaborations avec des collectifs et présence sur les scènes électroniques en France et à l’international."],
      ["Durée", "1h30 à 3h, sets longs possibles"],
      ["Technique", "[Ex : CDJ / contrôleur, rider disponible sur demande]"],
    ],
    contactTitle: "Contact & Lien",
    placeholderMail: "Contact à renseigner",
    print: "Imprimer / PDF",
    links: "Écoute",
  },
  en: {
    tagline: "Beyond psychedelia and groove",
    nav: ["World", "Origin", "Biography", "Sound", "Booking", "Contact"],
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
          ["Facebook", "https://www.facebook.com/NatarajaOfficial"],
          ["Bandcamp", "https://nataraja.bandcamp.com"],
          ["Instagram", "https://instagram.com/nataraja_collective"],
        ],
      },
    ],
    collectiveLinksLabel: "Links",
    worlds: [
      {
        name: "Mainstage",
        mood: "Energy, power, trance",
        styles: [
          ["Psytrance", "Powerful basslines and immersive melodies that build energy on the dancefloor."],
          ["Twilight", "A darker, more intense psytrance sound, with acidic textures and driving rhythms."],
          ["Forest", "Organic, mysterious textures inspired by nature and nocturnal atmospheres."],
        ],
      },
      {
        name: "Alternative",
        mood: "Groove, exploration, freedom",
        styles: [
          ["Psytechno", "The meeting point of techno's hypnotic pulse and psychedelic textures."],
          ["Bush Prog", "Progressive sounds with fluid grooves and warm textures, made for movement."],
          ["Electro groove & funk", "Syncopated rhythms and bouncing basslines with electro and funk influences."],
        ],
      },
      {
        name: "Chill",
        mood: "Depth, nuance, escape",
        styles: [
          ["Psygressive", "Psychedelic progressions that build groove with fluidity and subtlety."],
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
      ["Set length", "[e.g. 1h30 to 3h, extended sets available]"],
      ["Technical", "[e.g. CDJ / controller, rider on request]"],
    ],
    contactTitle: "Links & contact",
    placeholderMail: "Contact to be added",
    print: "Print / PDF",
    links: "Listen",
  },
};

const ANCHORS = ["univers", "origine", "biographie", "sons", "booking", "contact"];

export default function App() {
  const [lang, setLang] = useState("fr");
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
        <nav aria-label="Navigation">
          {t.nav.map((label, i) => (
            <a key={label} href={`#${ANCHORS[i]}`}>{label}</a>
          ))}
        </nav>
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
                alt="Emblème VALANA"
              />
            </div>
            <div className="hero-text">
              <h1>VALANA</h1>
              <p className="hero-tag">{t.tagline}</p>
              {INFO.location && <p className="hero-loc">{INFO.location}</p>}
            </div>
            <p className="hero-genres" aria-label="Genres musicaux">
              Psytrance · Twilight · Forest · Psytechno · Bush Prog · Electro groove &amp; funk · Psygressive · Psybass · psydub · Psybreak · Psychill
            </p>
          </div>
          <div className="horizon" aria-hidden="true" />
        </section>

        <section className="row" id="origine">
          <h2>{t.originTitle}</h2>
          <div className="prose">
            {t.origin.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section className="row" id="biographie">
          <h2>{t.bioTitle}</h2>
          <div className="prose">
            {t.bio.map((p, i) => (
              <p key={i} className={p.startsWith("[") ? "todo" : ""}>{p}</p>
            ))}
          </div>
        </section>

        <section className="row" id="sons">
          <h2>{t.soundTitle}</h2>
          <div>
            <p className="lead">{t.soundIntro}</p>
            <div className="worlds">
              {t.worlds.map((w, wi) => (
                <article key={w.name} className={`world w${wi}`}>
                  <h3>{w.name}</h3>
                  <p className="mood">{w.mood}</p>
                  {w.styles.map(([name, desc]) => (
                    <div key={name} className="style">
                      <h4>{name}</h4>
                      <p>{desc}</p>
                    </div>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="row">
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

        <section className="row" id="booking">
          <h2>{t.bookTitle}</h2>
          <dl className="book">
            {t.bookRows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd className={v.startsWith("[") ? "todo" : ""}>{v}</dd>
              </div>
            ))}
          </dl>
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
            <button className="print" onClick={() => window.print()}>{t.print}</button>
          </div>
        </section>
      </main>

    </>
  );
}
