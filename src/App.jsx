import { useEffect, useState } from "react";
import { AURORA_BANDS, AuroraBand } from "./Aurora.jsx";

const publicAsset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
const imageUrl = (path) =>
  path.startsWith("/") ? publicAsset(path) : path;
const WAVE_BAR_COUNT = 72;
// Logique commune aux trois univers : tempo = centre de la fourchette de BPM,
// une pulsation par mesure (4 temps), une longueur d'onde par carte, amplitude liée au BPM.
const WAVE_BEATS_PER_PULSE = 4;

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
    listenButton: "Écouter",
    pdfButton: "PDF",
    quickActionsLabel: "Liens rapides",
    navigationLabel: "Navigation",
    menuOpenLabel: "Ouvrir le menu",
    menuCloseLabel: "Fermer le menu",
    heroGenresLabel: "Genres musicaux",
    emblemAlt: "Emblème VALANA",
    originImageAlt: "Spirale lumineuse dans une nébuleuse",
    bioImageAlt: "VALANA en performance",
    bookingImageAlt: "Mandala psychédélique lumineux",
    nav: ["Univers", "Origine", "Biographie", "Sons", "Évènements", "Label", "Booking", "Contact"],
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
    eventsTitle: "Évènements",
    eventsIntro: "Festivals, clubs et soirées où VALANA a joué.",
    eventGroups: [
      { region: "Festival", place: "Bourgogne", venues: ["Nataraja Festival"] },
      {
        region: "Paris & alentours",
        place: "Île-de-France",
        venues: ["Unisson", "NOCT", "Sand Fabrik", "Bateau Phare", "Péniche Cinéma", "Folies Pigalle"],
      },
      {
        region: "Côte d’Azur",
        place: "Antibes · Nice · Mougins",
        venues: ["Green Garden", "Bioscenose", "L’Antre", "Bloc Party"],
      },
    ],
    eventsMore: "Voir plus",
    eventsLess: "Voir moins",
    eventTimeline: [
      { year: "2019", date: "9 mars 2019 · Paris", title: "Road to Freedom Festival", detail: "Unisson · Medhra vs Valana" },
      { year: "2022", date: "7–10 juillet 2022", title: "Nataraja Psychedelic Gathering", detail: "Festival · Bourgogne" },
      { year: "2023", date: "19 juin 2023 · Antibes", title: "Psychedelic After Party", detail: "Green Garden" },
      { year: "2024", date: "11–14 juillet 2024", title: "Nataraja Psychedelic Gathering", detail: "Line-up · Medhra vs Valana" },
      { year: "2024", date: "11–14 juillet 2024", title: "Nataraja Psychedelic Gathering", detail: "Nataraja Records" },
      { year: "2024", date: "31 octobre 2024 · Mougins", title: "Halloween Party", detail: "Bloc Party · Nataraja Records" },
      { year: "2025", date: "10–13 juillet 2025", title: "Nataraja Psychedelic Gathering", detail: "Line-up du festival" },
      { year: "2026", date: "9 mai 2026", title: "Symbiosis Journey · Part II", detail: "Nataraja × NOCT" },
      { year: "2026", date: "16–19 juillet 2026", title: "Nataraja Psychedelic Gathering", detail: "Spécial 10 ans · line-up Chillout" },
      { year: "2026", date: "Juillet 2026", title: "Nataraja Psychedelic Gathering", detail: "Aux platines · photo Black Cat Production" },
      { year: "2026", date: "16–19 juillet 2026", title: "Nataraja Psychedelic Gathering", detail: "Spécial 10 ans · line-up Mainstage" },
      { year: "2026", date: "Juillet 2026", title: "Nataraja Psychedelic Gathering", detail: "Aux platines · photo Black Cat Production" },
    ],
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
        tempo: 162,
        wave: "fast",
        mood: "Une montée d’énergie hypnotique, taillée pour les grands dancefloors",
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
        mood: "Des grooves libres et hybrides, entre techno, prog et funk psychédélique",
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
        tempo: 92,
        wave: "slow",
        mood: "Des basses profondes et des paysages lents pour voyager les yeux fermés",
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
    contactTitle: "Contact",
    contactForm: {
      name: "Nom",
      email: "E-mail",
      subject: "Objet",
      subjects: ["Booking", "Collaboration", "Presse", "Autre"],
      message: "Message",
      submit: "Envoyer",
      note: "L’envoi ouvre votre messagerie avec le message prêt à partir.",
      sent: "Votre messagerie s’est ouverte : il ne reste plus qu’à envoyer le message.",
    },
    placeholderMail: "Contact à renseigner",
    contactQrCaption: "Scanner pour choisir entre Booking et SoundCloud",
    contactQrAlt: "QR code vers les liens Booking et SoundCloud de VALANA",
    links: "Écoute",
  },
  en: {
    tagline: "Beyond psychedelia and groove",
    bookingButton: "Booking",
    listenButton: "Listen",
    pdfButton: "PDF",
    quickActionsLabel: "Quick links",
    navigationLabel: "Navigation",
    menuOpenLabel: "Open menu",
    menuCloseLabel: "Close menu",
    heroGenresLabel: "Music genres",
    emblemAlt: "VALANA emblem",
    originImageAlt: "Luminous spiral in a nebula",
    bioImageAlt: "VALANA performing",
    bookingImageAlt: "Luminous psychedelic mandala",
    nav: ["World", "Origin", "Biography", "Sound", "Events", "Label", "Booking", "Contact"],
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
    eventsTitle: "Events",
    eventsIntro: "Festivals, clubs and parties where VALANA has played.",
    eventGroups: [
      { region: "Festival", place: "Burgundy", venues: ["Nataraja Festival"] },
      {
        region: "Paris & surroundings",
        place: "Île-de-France",
        venues: ["Unisson", "NOCT", "Sand Fabrik", "Bateau Phare", "Péniche Cinéma", "Folies Pigalle"],
      },
      {
        region: "Côte d’Azur",
        place: "Antibes · Nice · Mougins",
        venues: ["Green Garden", "Bioscenose", "L’Antre", "Bloc Party"],
      },
    ],
    eventsMore: "Show more",
    eventsLess: "Show less",
    eventTimeline: [
      { year: "2019", date: "9 March 2019 · Paris", title: "Road to Freedom Festival", detail: "Unisson · Medhra vs Valana" },
      { year: "2022", date: "7–10 July 2022", title: "Nataraja Psychedelic Gathering", detail: "Festival · Burgundy" },
      { year: "2023", date: "19 June 2023 · Antibes", title: "Psychedelic After Party", detail: "Green Garden" },
      { year: "2024", date: "11–14 July 2024", title: "Nataraja Psychedelic Gathering", detail: "Line-up · Medhra vs Valana" },
      { year: "2024", date: "11–14 July 2024", title: "Nataraja Psychedelic Gathering", detail: "Nataraja Records" },
      { year: "2024", date: "31 October 2024 · Mougins", title: "Halloween Party", detail: "Bloc Party · Nataraja Records" },
      { year: "2025", date: "10–13 July 2025", title: "Nataraja Psychedelic Gathering", detail: "Festival line-up" },
      { year: "2026", date: "9 May 2026", title: "Symbiosis Journey · Part II", detail: "Nataraja × NOCT" },
      { year: "2026", date: "16–19 July 2026", title: "Nataraja Psychedelic Gathering", detail: "10th anniversary · Chillout line-up" },
      { year: "2026", date: "July 2026", title: "Nataraja Psychedelic Gathering", detail: "On the decks · photo Black Cat Production" },
      { year: "2026", date: "16–19 July 2026", title: "Nataraja Psychedelic Gathering", detail: "10th anniversary · Mainstage line-up" },
      { year: "2026", date: "July 2026", title: "Nataraja Psychedelic Gathering", detail: "On the decks · photo Black Cat Production" },
    ],
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
        tempo: 162,
        wave: "fast",
        mood: "A hypnotic surge of energy, built for big dancefloors",
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
        mood: "Free, hybrid grooves between techno, prog and psychedelic funk",
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
        tempo: 92,
        wave: "slow",
        mood: "Deep bass and slow soundscapes to travel with your eyes closed",
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
    contactTitle: "Contact",
    contactForm: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      subjects: ["Booking", "Collaboration", "Press", "Other"],
      message: "Message",
      submit: "Send",
      note: "Sending opens your email app with the message ready to go.",
      sent: "Your email app has opened: just send the message.",
    },
    placeholderMail: "Contact to be added",
    contactQrCaption: "Scan to choose between Booking and SoundCloud",
    contactQrAlt: "QR code to VALANA's Booking and SoundCloud links",
    links: "Listen",
  },
};

// Formulaire de contact désactivé pour le moment : passer à true pour le réafficher
const SHOW_CONTACT_FORM = false;

// Étoiles ajoutées à la main sur le landing : [gauche %, haut %, teinte, délai, durée].
// Elles comblent les vides de la grille, avec quelques teintes chaudes ou vertes plus naturelles.
const HERO_EXTRA_STARS = [
  [6, 84, "warm", "-2.2s", "4.8s"],
  [31, 62, null, "-0.8s", "3.4s"],
  [47, 8, "green", "-3.9s", "5.6s"],
  [58, 44, null, "-1.6s", "2.8s"],
  [66, 90, "warm", "-4.4s", "4.1s"],
  [93, 14, null, "-2.9s", "3.7s"],
  [39, 30, "warm", "-5.3s", "5.1s"],
  [17, 40, "green", "-0.3s", "3.2s"],
];

// Les animations SVG (aurores, lac, porte des étoiles) recalculent des filtres coûteux à chaque
// image : on les fait avancer à cadence réduite, et seulement quand la zone est à l'écran.
const SVG_FRAME_INTERVAL = 50; // ms, soit 20 images/s : invisible sur des mouvements aussi lents

// Styles affichés sous le bouton Booking du landing : une ligne par tableau
const HERO_GENRES = [
  ["Psytrance", "Twilight", "Forest", "Psytech", "Bushtech", "Bushprog"],
  ["Electro groove & funk", "Ethno orientale", "Psygressive"],
  ["Psybass", "psydub", "Psybreak", "Psychill", "Ambient"],
];

// Nombre de cartes visibles avant le bouton « Voir plus »
const EVENTS_PREVIEW_COUNT = 6;

// Affiches et photos d'évènements, par ordre chronologique (les textes sont dans T.*.eventTimeline).
// La frise les affiche du plus récent au plus ancien. Les photos en paysage ont un point
// de cadrage (focus) : elles sont recadrées en portrait autour de Valana.
const EVENT_IMAGES = [
  "/events/unisson-freedom.jpg",
  { src: "/events/natafest-22.jpg", focus: "50% 50%" },
  "/events/green-23.jpg",
  "/events/natafest-24-lineup.jpg",
  { src: "/events/natafest-24.jpg", focus: "54% 50%" },
  "/events/bp-hallow-24.jpg",
  "/events/natafest-25.jpg",
  "/events/natanoct-symbiosis-26.jpg",
  "/events/natafest-26-chillout.jpg",
  "/events/natafest-25-stage.jpg",
  "/events/natafest-26-mainstage.jpg",
  { src: "/events/natafest-25-backstage.jpg", focus: "8% 50%" },
];

const ANCHORS = ["univers", "origine", "biographie", "sons", "evenements", "labels", "booking", "contact"];

export default function App() {
  const [lang, setLang] = useState("fr");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFloatingActions, setShowFloatingActions] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const t = T[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);

  // Horloge commune des animations SVG des zones [data-svg-clock]
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scenes = [...document.querySelectorAll("[data-svg-clock]")].map((element) => ({
      element,
      visible: false,
      svgs: [...element.querySelectorAll("svg")].filter((svg) => !svg.parentElement.closest("svg")),
    }));
    scenes.forEach(({ svgs }) => svgs.forEach((svg) => svg.pauseAnimations()));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const scene = scenes.find(({ element }) => element === entry.target);
        scene.visible = entry.isIntersecting;
        entry.target.classList.toggle("is-offscreen", !entry.isIntersecting);
      });
    });
    scenes.forEach(({ element }) => observer.observe(element));

    let frame;
    let elapsed = 0;
    let previous = performance.now();
    let lastDraw = 0;
    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      const delta = Math.min(now - previous, 100);
      previous = now;
      if (reduceMotion.matches || !scenes.some(({ visible }) => visible)) return;
      elapsed += delta;
      if (now - lastDraw < SVG_FRAME_INTERVAL) return;
      lastDraw = now;
      scenes.forEach(({ visible, svgs }) => {
        if (visible) svgs.forEach((svg) => svg.setCurrentTime(elapsed / 1000));
      });
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  // Images protégées : pas de menu « Enregistrer l'image » ni de glisser-déposer
  useEffect(() => {
    const blockImageSave = (event) => {
      if (event.target instanceof Element && event.target.closest("img, .event-media")) event.preventDefault();
    };

    document.addEventListener("contextmenu", blockImageSave);
    document.addEventListener("dragstart", blockImageSave);
    return () => {
      document.removeEventListener("contextmenu", blockImageSave);
      document.removeEventListener("dragstart", blockImageSave);
    };
  }, []);

  useEffect(() => {
    const updateFloatingActions = () => setShowFloatingActions(window.scrollY > 180);

    updateFloatingActions();
    window.addEventListener("scroll", updateFloatingActions, { passive: true });
    return () => window.removeEventListener("scroll", updateFloatingActions);
  }, []);

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
        {/* Dégradés partagés par les ondes posées sur les photos : palette des aurores */}
        <svg className="shared-gradients" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="aurora-wave-gradient" gradientUnits="userSpaceOnUse" x1="-22" y1="0" x2="226" y2="0">
              <stop offset="0%" stopColor="#64ee94" />
              <stop offset="32%" stopColor="#69d7af" />
              <stop offset="58%" stopColor="#87a5d7" />
              <stop offset="80%" stopColor="#a078e6" />
              <stop offset="100%" stopColor="#cd5ab9" />
            </linearGradient>
            <linearGradient id="aurora-wave-glint-gradient" gradientUnits="userSpaceOnUse" x1="-18" y1="0" x2="190" y2="0">
              <stop offset="0%" stopColor="#d6ffe2" />
              <stop offset="55%" stopColor="#d4e4ff" />
              <stop offset="100%" stopColor="#ecd2ff" />
            </linearGradient>
          </defs>
        </svg>
        <section
          className="hero"
          data-svg-clock
          id="univers"
          style={{
            "--hero-background-image": `url("${publicAsset("/hero-background.jpeg")}")`,
            "--hero-sky-mask": `url("${publicAsset("/hero-sky-mask.png")}")`,
            "--hero-glow-mask": `url("${publicAsset("/hero-glow-mask.png")}")`,
            "--hero-lake-mask": `url("${publicAsset("/hero-lake-mask.png")}")`,
            "--hero-trees-mask": `url("${publicAsset("/hero-trees-mask.png")}")`,
          }}
        >
          <div className="hero-aurora" aria-hidden="true">
            {AURORA_BANDS.map((band) => <AuroraBand key={band.id} {...band} />)}
          </div>
          {/* Sapins : copie de l'image limitée à la forêt, qui oscille légèrement comme sous le vent */}
          <div className="hero-trees" aria-hidden="true">
            <svg className="aurora-filter-defs" aria-hidden="true" focusable="false">
              <filter id="trees-wind" x="0" y="0.2" width="1" height="0.8">
                <feTurbulence type="fractalNoise" baseFrequency="0.005 0.01" numOctaves="1" seed="9" result="gust">
                  <animate
                    attributeName="baseFrequency"
                    dur="34s"
                    repeatCount="indefinite"
                    values="0.005 0.01;0.0062 0.0085;0.0044 0.011;0.005 0.01"
                    calcMode="spline"
                    keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1"
                  />
                </feTurbulence>
                {/* Déplacement horizontal uniquement : le canal vertical est neutralisé (0,5) */}
                <feColorMatrix in="gust" type="matrix" values="1 0 0 0 0  0 0 0 0 0.5  0 0 0 0 0  0 0 0 0 1" result="sway" />
                <feDisplacementMap in="SourceGraphic" in2="sway" scale="0" xChannelSelector="R" yChannelSelector="G">
                  <animate
                    attributeName="scale"
                    dur="9s"
                    repeatCount="indefinite"
                    values="10;-20;16;-10;22;10"
                    calcMode="spline"
                    keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1;.45 0 .55 1;.45 0 .55 1"
                  />
                </feDisplacementMap>
              </filter>
            </svg>
            <div className="hero-trees-sway" />
          </div>
          <div className="hero-aurora-glow" aria-hidden="true" />
          {/* Lac : l'image est reprise et ondulée sous le masque de l'eau, avec des reflets qui scintillent */}
          <div className="hero-lake" aria-hidden="true">
            <svg className="aurora-filter-defs" aria-hidden="true" focusable="false">
              <filter id="lake-ripple" x="0" y="0" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.004 0.11" numOctaves="2" seed="5" result="ripples">
                  <animate
                    attributeName="baseFrequency"
                    dur="26s"
                    repeatCount="indefinite"
                    values="0.004 0.11;0.0046 0.1;0.0036 0.12;0.004 0.11"
                    calcMode="spline"
                    keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1"
                  />
                </feTurbulence>
                <feOffset in="ripples" dy="0" result="flow">
                  <animate attributeName="dy" dur="16s" repeatCount="indefinite" values="0;8;0" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" />
                </feOffset>
                {/* Faible amplitude : les reflets tremblent à peine, surtout à l'horizontale, comme une eau calme */}
                <feDisplacementMap in="SourceGraphic" in2="flow" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </svg>
            <div className="hero-lake-water" />
            <div className="hero-lake-glints" />
          </div>
          <div className="hero-starfield" aria-hidden="true">
            {Array.from({ length: 21 }, (_, index) => {
              const column = index % 7;
              const row = Math.floor(index / 7);
              const horizontalJitter = (row % 2 ? 0.14 : -0.14) + Math.sin(index * 2.3) * 0.08;
              const verticalJitter = Math.sin(index * 1.7) * 0.16;

              if (column >= 5 && row >= 1) return null;

              return (
                <span
                  key={index}
                  className={[0, 3, 5, 8, 10, 17].includes(index) ? "hero-star-cross" : undefined}
                  style={{
                    left: `${((column + 0.5 + horizontalJitter) / 7) * 100}%`,
                    top: `${((row + 0.5 + verticalJitter) / 3) * 100}%`,
                    "--star-delay": `${-((index * 17 + index * index * 3) % 70) / 10}s`,
                    "--star-duration": `${(1.6 + ((index % 8) * 4.4) / 7).toFixed(2)}s`,
                  }}
                />
              );
            })}
            {HERO_EXTRA_STARS.map(([left, top, tone, delay, duration]) => (
              <span
                key={`${left}-${top}`}
                className={`hero-star-extra${tone ? ` hero-star-${tone}` : ""}`}
                style={{ left: `${left}%`, top: `${top}%`, "--star-delay": delay, "--star-duration": duration }}
              />
            ))}
            <span
              className="hero-star-feature"
              style={{
                left: "86%",
                top: "88%",
                "--star-delay": "-3.4s",
                "--star-duration": "4.2s",
              }}
            />
          </div>
          <div className="hero-content">
            <div className="hero-art">
              <img
                src={imageUrl(INFO.photoUrl || "/hero-emblem.png")}
                alt={t.emblemAlt}
                decoding="async"
              />
            </div>
            <div className="hero-text">
              <h1>VALANA</h1>
              <p className="hero-tag">{t.tagline}</p>
              {INFO.location && <p className="hero-loc">{INFO.location}</p>}
            </div>
            {INFO.email && (
              <a className="booking-cta hero-booking" href={`mailto:${INFO.email}`}>
                <span>{t.bookingButton}</span>
              </a>
            )}
            <p className="hero-genres" aria-label={t.heroGenresLabel}>
              {HERO_GENRES.map((line) => (
                <span className="hero-genres-line" key={line[0]}>
                  {line.map((genre, index) => (
                    <span key={genre}>
                      {index > 0 && " · "}
                      <span className="hero-genre">{genre}</span>
                    </span>
                  ))}
                </span>
              ))}
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
            <figure className="origin-visual" data-svg-clock>
              <img
                className="origin-photo"
                src={publicAsset("/origin-photo.jpeg")}
                alt={t.originImageAlt}
                loading="lazy"
                decoding="async"
              />
              <div className="origin-horizon" aria-hidden="true" />
              {/* Quelques étoiles scintillantes, du même style que celles du landing */}
              <div className="origin-stars" aria-hidden="true">
                {[
                  [22, 26, true, "-1.3s", "3.1s"],
                  [76, 18, false, "-4.2s", "4.6s"],
                  [86, 60, false, "-0.6s", "2.4s"],
                  [14, 56, false, "-2.7s", "5.2s"],
                  [34, 80, true, "-3.6s", "3.8s"],
                  [64, 84, false, "-5.1s", "2.9s"],
                ].map(([left, top, cross, delay, duration]) => (
                  <span
                    key={`${left}-${top}`}
                    className={cross ? "hero-star-cross" : undefined}
                    style={{ left: `${left}%`, top: `${top}%`, "--star-delay": delay, "--star-duration": duration }}
                  />
                ))}
              </div>
              <svg className="origin-ornaments" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
                <defs>
                  <path id="origin-inscription-path" d="M 200 6 A 194 194 0 1 1 199.99 6" />
                  {/* Chevrons : un sur deux en dégradé turquoise, un sur deux en dégradé violacé */}
                  <linearGradient id="portal-chevron-turq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e6fff9" />
                    <stop offset="45%" stopColor="#7fe6d4" />
                    <stop offset="100%" stopColor="#2fa69a" />
                  </linearGradient>
                  <linearGradient id="portal-chevron-turq-gem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#a6f3e6" />
                  </linearGradient>
                  <linearGradient id="portal-chevron-violet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f3e8ff" />
                    <stop offset="45%" stopColor="#b896ef" />
                    <stop offset="100%" stopColor="#7a52c4" />
                  </linearGradient>
                  <linearGradient id="portal-chevron-violet-gem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#dcc8fb" />
                  </linearGradient>
                  <linearGradient id="portal-metal-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#e2f2e8" />
                    <stop offset="28%" stopColor="#4a6466" />
                    <stop offset="54%" stopColor="#16283a" />
                    <stop offset="78%" stopColor="#b9b6cf" />
                    <stop offset="100%" stopColor="#2b3548" />
                  </linearGradient>
                  {/* Relief métallique : éclairage spéculaire rasant + ombre portée sur l'anneau */}
                  <filter id="portal-relief" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1.1" result="bump" />
                    <feSpecularLighting
                      in="bump"
                      surfaceScale="3.2"
                      specularConstant="0.95"
                      specularExponent="24"
                      lightingColor="#eafff8"
                      result="shine"
                    >
                      <feDistantLight azimuth="235" elevation="46" />
                    </feSpecularLighting>
                    <feComposite in="shine" in2="SourceAlpha" operator="in" result="shineIn" />
                    <feComposite in="SourceGraphic" in2="shineIn" operator="arithmetic" k1="0" k2="1" k3="0.75" k4="0" result="lit" />
                    <feDropShadow in="lit" dx="0" dy="1.6" stdDeviation="1.6" floodColor="#020a0e" floodOpacity="0.75" />
                  </filter>
                  {/* Horizon des événements : la photo ondule très légèrement */}
                  <filter id="portal-ripple" x="0" y="0" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.011 0.013" numOctaves="2" seed="3" result="flow">
                      <animate
                        attributeName="baseFrequency"
                        dur="16s"
                        repeatCount="indefinite"
                        values="0.011 0.013;0.014 0.010;0.010 0.014;0.011 0.013"
                      />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" in2="flow" scale="6" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                  {/* Les couleurs de la gemme passent par des variables CSS, seules à traverser les <use> */}
                  <g id="portal-tooth">
                    <path d="M200 2 219 26 209 22 200 37 191 22 181 26Z" />
                    <path
                      d="M200 6.5 214 25 200 19.5 186 25Z"
                      style={{ fill: "var(--gem-fill)", stroke: "var(--gem-edge)", strokeWidth: 0.6 }}
                    />
                    <path d="M200 25v7" style={{ fill: "none", stroke: "var(--gem-line)", strokeWidth: 1 }} />
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
                    className={`ornament-tooth${index % 2 !== 0 ? " ornament-tooth-violet" : ""}`}
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
                <img
                  className="bio-photo"
                  src={publicAsset("/bio-photo.jpg")}
                  alt={t.bioImageAlt}
                  loading="lazy"
                  decoding="async"
                />
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
                    style={{
                      "--beat-duration": `${(WAVE_BEATS_PER_PULSE * 60) / w.tempo}s`,
                      "--pulse-floor": (1 - w.tempo / 360).toFixed(2),
                    }}
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
                          // La crête traverse la carte de gauche à droite en une pulsation
                          style={{
                            animationDelay: `${(-((WAVE_BAR_COUNT - index) * WAVE_BEATS_PER_PULSE * 60) / (w.tempo * WAVE_BAR_COUNT)).toFixed(3)}s`,
                          }}
                        />
                      );
                    })}
                  </svg>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="row" id="evenements">
          <h2>{t.eventsTitle}</h2>
          <p className="events-intro">{t.eventsIntro}</p>
          <div className="events">
            {t.eventGroups.map((group) => (
              <article className="event-group" key={group.region}>
                <h3>{group.region}</h3>
                <p className="event-place">{group.place}</p>
                <ul className="event-venues">
                  {group.venues.map((venue) => <li key={venue}>{venue}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <ol className="event-timeline">
            {t.eventTimeline
              .map((event, index) => ({ event, index }))
              .reverse()
              .slice(0, showAllEvents ? undefined : EVENTS_PREVIEW_COUNT)
              .map(({ event, index }) => {
              const image = EVENT_IMAGES[index];
              const { src: path, focus } = typeof image === "string" ? { src: image } : image;
              const src = publicAsset(path);
              return (
                <li className="event-card" key={path}>
                  <div className={`event-media${focus ? " event-media-cropped" : ""}`} style={{ "--event-image": `url("${src}")` }}>
                    <img
                      src={src}
                      alt={`${event.title} — ${event.date}`}
                      loading="lazy"
                      decoding="async"
                      style={focus ? { objectPosition: focus } : undefined}
                    />
                  </div>
                  <div className="event-info">
                    <span className="event-year">{event.year}</span>
                    <h3>{event.title}</h3>
                    <p className="event-date">{event.date}</p>
                    <p className="event-detail">{event.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          {t.eventTimeline.length > EVENTS_PREVIEW_COUNT && (
            <button
              className="events-toggle"
              type="button"
              aria-expanded={showAllEvents}
              onClick={() => setShowAllEvents((open) => !open)}
            >
              {showAllEvents ? t.eventsLess : t.eventsMore}
            </button>
          )}
        </section>

        <section className="row" id="labels">
          <h2>{t.collectivesTitle}</h2>
          <div className="prose">
            {t.collectives.map((collective) => (
              <article className="collective" key={collective.name}>
                <h3 className="collective-title">
                  {collective.name === "Nataraja" && (
                    <img
                      className="collective-logo-print"
                      src={publicAsset("/nataraja-logo-black.svg")}
                      alt=""
                      aria-hidden="true"
                      decoding="async"
                    />
                  )}
                  <img
                    className="collective-logo-screen"
                    src={publicAsset(collective.logo)}
                    alt=""
                    aria-hidden="true"
                    decoding="async"
                  />
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
            <figure className="bio-photo-frame booking-visual">
              <div className="bio-photo-image">
                <img
                  src={publicAsset("/booking-visual.jpg")}
                  alt={t.bookingImageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <svg className="booking-visual-ornaments" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden="true">
                <g className="bio-wave-group">
                  <path className="bio-wave-echo" d="M-18 472 C0 472 0 505 18 505 S36 485 54 485 72 530 90 530 108 497 126 497 144 516 162 516 180 492 198 492" />
                  <path className="bio-wave-main" d="M-22 494 C-7 494 -6 525 9 525 S25 481 40 481 56 548 71 548 87 503 102 503 118 534 133 534 149 489 164 489 180 522 195 522 211 505 226 505" />
                  <path className="bio-wave-glint" d="M-18 505 C-7 505 -7 517 4 517 S19 496 30 496 45 531 56 531 71 509 82 509 97 524 108 524 123 500 134 500 149 519 160 519 175 508 190 508" />
                  <circle className="bio-wave-node" cx="71" cy="548" r="2.6" />
                  <circle className="bio-wave-node bio-wave-node-soft" cx="164" cy="489" r="1.8" />
                </g>
              </svg>
            </figure>
          </div>
        </section>

        <section className="row contact" id="contact">
          <h2>{t.contactTitle}</h2>
          <div>
            {INFO.email ? (
              <a className="mail" href={`mailto:${INFO.email}`}>
                <span className="contact-print-marker contact-email-marker" aria-hidden="true">@</span>
                {INFO.email}
              </a>
            ) : (
              <p className="todo">{t.placeholderMail}</p>
            )}
            {SHOW_CONTACT_FORM && INFO.email && (
              <form
                className="contact-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  const data = new FormData(event.currentTarget);
                  const subject = `[${data.get("subject")}] ${data.get("name")}`;
                  const body = `${data.get("message")}\n\n${data.get("name")} · ${data.get("email")}`;
                  window.location.href =
                    `mailto:${INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  setContactSent(true);
                }}
              >
                <label>
                  <span>{t.contactForm.name}</span>
                  <input name="name" type="text" autoComplete="name" required />
                </label>
                <label>
                  <span>{t.contactForm.email}</span>
                  <input name="email" type="email" autoComplete="email" required />
                </label>
                <label className="contact-form-wide">
                  <span>{t.contactForm.subject}</span>
                  <select name="subject" defaultValue={t.contactForm.subjects[0]}>
                    {t.contactForm.subjects.map((subject) => <option key={subject}>{subject}</option>)}
                  </select>
                </label>
                <label className="contact-form-wide">
                  <span>{t.contactForm.message}</span>
                  <textarea name="message" rows="6" required />
                </label>
                <div className="contact-form-footer">
                  <p className="contact-form-note" aria-live="polite">
                    {contactSent ? t.contactForm.sent : t.contactForm.note}
                  </p>
                  <button className="booking-cta" type="submit"><span>{t.contactForm.submit}</span></button>
                </div>
              </form>
            )}
            {links.length > 0 && (
              <ul className="links contact-print-links" aria-label={t.links}>
                {links.map(([name, url]) => (
                  <li key={name} className={name === "SoundCloud" ? "soundcloud-contact" : undefined}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className={name === "SoundCloud" ? "link-address" : undefined}
                    >
                      <span className="link-screen-label">
                        {name === "SoundCloud" && (
                          <svg className="soundcloud-logo" viewBox="0 0 32 24" aria-hidden="true">
                            <path d="M7 19.5h19a4.5 4.5 0 0 0 .5-9A10.5 10.5 0 0 0 6.4 9.1 5.3 5.3 0 0 0 7 19.5Z" />
                            <path className="soundcloud-wave" d="M9 15V8m4 9V4m4 12V2m4 13V5m4 10V9" />
                          </svg>
                        )}
                        {name}
                      </span>
                      {name === "SoundCloud" && (
                        <>
                          <span className="contact-print-marker contact-soundcloud-marker" aria-hidden="true">
                            <svg viewBox="0 0 32 24">
                              <path d="M7 19.5h19a4.5 4.5 0 0 0 .5-9A10.5 10.5 0 0 0 6.4 9.1 5.3 5.3 0 0 0 7 19.5Z" />
                              <path d="M9 15V8m4 9V4m4 12V2m4 13V5m4 10V9" />
                            </svg>
                          </span>
                          <span className="link-print-label">{url}</span>
                        </>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {INFO.email && INFO.soundcloud && (
              <figure className="contact-print-qr">
                <img src={publicAsset("/contact-qr.png")} alt={t.contactQrAlt} />
                <figcaption>{t.contactQrCaption}</figcaption>
              </figure>
            )}
          </div>
        </section>
        </div>
      </main>

      {showFloatingActions && (
        <nav className="floating-actions" aria-label={t.quickActionsLabel}>
          {INFO.email && (
            <a className="booking-cta floating-booking" href={`mailto:${INFO.email}`}>
              <span>{t.bookingButton}</span>
            </a>
          )}
          {INFO.soundcloud && (
            <a className="floating-action floating-listen" href={INFO.soundcloud} target="_blank" rel="noreferrer">
              <svg className="listen-notes" viewBox="0 0 24 24" aria-hidden="true">
                <defs>
                  <linearGradient id="listen-notes-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#8ff0e0" />
                  </linearGradient>
                </defs>
                <g fill="url(#listen-notes-gradient)">
                  <path d="M8.1 5.6 19.9 2.4v3.1L8.1 8.7Z" />
                  <rect x="8.1" y="6.4" width="1.7" height="11.4" rx="0.8" />
                  <rect x="18.2" y="3.4" width="1.7" height="12.4" rx="0.8" />
                  <ellipse cx="6.5" cy="17.7" rx="3.2" ry="2.35" transform="rotate(-22 6.5 17.7)" />
                  <ellipse cx="16.6" cy="15.7" rx="3.2" ry="2.35" transform="rotate(-22 16.6 15.7)" />
                </g>
                <path className="listen-notes-sparkle" d="M3.2 4.2v2.6M1.9 5.5h2.6M22 18.6v2M21 19.6h2" />
              </svg>
              <span>{t.listenButton}</span>
            </a>
          )}
          <button className="floating-action floating-pdf" type="button" onClick={() => window.print()}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 3.75h8l4 4v12.5H6zM14 3.75v4h4M8.5 14h7M8.5 17h7" />
            </svg>
            <span>{t.pdfButton}</span>
          </button>
        </nav>
      )}
    </>
  );
}
