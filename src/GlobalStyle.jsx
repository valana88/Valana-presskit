import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  --night: #08130f;
  --moss: #1f4a3a;
  --violet: #6b3fa0;
  --turq: #3fd0c0;
  --magenta: #d8368f;
  --ember: #ff7a3d;
  --bone: #efe9dc;
  --muted: #a9b7ae;
  --line: rgba(239, 233, 220, 0.16);
  --turq-line: rgba(63, 208, 192, 0.34);
  --glass: rgba(8, 19, 15, 0.82);
  --display: "Syne", system-ui, sans-serif;
  --hover-ease: 480ms cubic-bezier(0.22, 0.61, 0.36, 1);
  --hover-fill: rgba(63, 208, 192, 0.14);
  --hover-border: rgba(140, 240, 222, 0.85);
  --hover-glow: 0 0 1.4rem rgba(63, 208, 192, 0.3);
  --hover-scale: 1.05;
  /* Boutons : fond nuit et liseré aux couleurs des aurores, comme les cadres photo */
  --btn-fill: rgba(8, 19, 15, 0.92);
  --btn-border: linear-gradient(100deg, #64ee94, #69d7af 30%, #87a5d7 58%, #a078e6 80%, #cd5ab9);
  --btn-height: 2.8rem;
  --body: Verdana, sans-serif;
}

* { box-sizing: border-box; margin: 0; }
html { scroll-behavior: smooth; scroll-padding-top: 4rem; }
body {
  background: var(--night);
  color: var(--bone);
  font-family: var(--body);
  font-size: 17px;
  line-height: 1.65;
}
a { color: inherit; }
.visually-hidden {
  position: absolute; width: 1px; height: 1px; overflow: hidden;
  clip-path: inset(50%); white-space: nowrap;
}
/* Images protégées : ni glisser-déposer, ni sélection, ni menu d'enregistrement sur mobile */
img {
  -webkit-user-drag: none; user-select: none;
  -webkit-touch-callout: none;
}
:focus-visible { outline: 2px solid var(--turq); outline-offset: 3px; }
button, a { -webkit-tap-highlight-color: transparent; }

/* Barre */
.bar {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  padding: 0.8rem clamp(1rem, 4vw, 3rem);
  background: var(--glass);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
  font-family: var(--display);
}
.bar-name {
  display: inline-flex; align-items: center; gap: 0.55rem;
  text-decoration: none; font: 400 1.25rem/0.95 "Julius Sans One", var(--display);
  letter-spacing: 0.2em;
}
.bar-name-icon {
  flex: 0 0 2.4rem; width: 2.4rem; height: 2.4rem;
  overflow: hidden; border-radius: 50%;
}
.bar-name-icon img {
  display: block; width: 100%; height: 100%; object-fit: cover;
  transform: scale(1.33);
}
.bar nav { display: flex; gap: 1.4rem; font-size: 0.9rem; }
.bar nav a { text-decoration: none; color: var(--muted); transition: color var(--hover-ease); }
.bar nav a:hover { color: var(--bone); }
/* 8 liens : on resserre la navigation sur les écrans moyens pour éviter le débordement */
@media (min-width: 801px) and (max-width: 1100px) {
  .bar nav { gap: 0.85rem; font-size: 0.8rem; }
  .bar-name { font-size: 1.05rem; letter-spacing: 0.14em; }
  .bar-name-icon { flex-basis: 2rem; width: 2rem; height: 2rem; }
}
.menu-toggle { display: none; }
.bar-tools { display: flex; gap: 0.3rem; }
.bar-tools button {
  font: 700 0.8rem var(--display); color: var(--muted);
  background: none; border: 1px solid var(--line); border-radius: 99px;
  min-height: 2.4rem; padding: 0.25rem 0.7rem; cursor: pointer;
  transition: color var(--hover-ease), background-color var(--hover-ease), border-color var(--hover-ease), scale var(--hover-ease);
}
.bar-tools button:hover { scale: var(--hover-scale); }
.bar-tools button:not(.on):hover { color: var(--bone); border-color: var(--turq-line); background: rgba(63, 208, 192, 0.08); }
.bar-tools button.on { color: var(--night); background: var(--bone); border-color: var(--bone); }

/* Hero */
.hero {
  position: relative; overflow: hidden;
  min-height: calc(100vh - 3.4rem);
  display: flex; align-items: center; justify-content: center;
  padding: 3rem clamp(1rem, 4vw, 3rem) 6rem;
  background:
    linear-gradient(180deg, rgba(8, 19, 15, 0.14), rgba(8, 19, 15, 0) 42%, rgba(8, 19, 15, 0.58)),
    var(--hero-background-image) center / cover no-repeat;
}
.hero-aurora {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  mix-blend-mode: screen;
  /* Le masque du ciel reprend le cadrage du fond (center / cover) : rien sur les montagnes ni les arbres */
  mask-image:
    linear-gradient(to bottom, transparent 0%, #000 11%),
    var(--hero-sky-mask);
  mask-size: 100% 100%, cover;
  mask-position: center;
  mask-repeat: no-repeat;
  mask-composite: intersect;
}
/* Lac : reflets de lumière limités à l'eau par le masque du lac, cadré comme le fond */
.hero-lake {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  mask-image: var(--hero-lake-mask);
  mask-size: cover; mask-position: center; mask-repeat: no-repeat;
}
/* Reflets : fines lignes de lumière horizontales qui ondulent et scintillent */
.hero-lake-glints {
  position: absolute; inset: 0;
  mix-blend-mode: screen;
  /* Reflets fins et irréguliers, plus présents au centre où le ciel est lumineux */
  background: repeating-linear-gradient(
    180deg,
    transparent 0 7px, rgba(255, 214, 170, 0.07) 8px, transparent 9px 16px,
    rgba(210, 190, 255, 0.05) 17px, transparent 18px 23px, rgba(255, 220, 185, 0.06) 24px, transparent 25px 34px
  );
  mask-image: radial-gradient(ellipse 34% 100% at 50% 50%, #000, rgba(0, 0, 0, 0.35) 60%, transparent);
  /* Mouvement par transformation et opacité seulement : animé par la carte graphique */
  will-change: transform, opacity;
  animation: lake-glints 12s ease-in-out infinite alternate;
}
@keyframes lake-glints {
  from { opacity: 0.35; transform: translateY(0); }
  to { opacity: 0.7; transform: translateY(4px); }
}
/* Lumière de l'aurore sur les crêtes et la cime des arbres : fond le ciel et le relief ensemble */
.hero-aurora-glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  mix-blend-mode: screen;
  background:
    radial-gradient(ellipse 38% 40% at 18% 55%, rgba(110, 230, 175, 0.55), transparent 75%),
    radial-gradient(ellipse 34% 36% at 82% 52%, rgba(95, 215, 190, 0.5), transparent 75%),
    linear-gradient(rgba(100, 200, 190, 0.22), rgba(100, 200, 190, 0.22));
  mask-image: var(--hero-glow-mask);
  mask-size: cover;
  mask-position: center;
  mask-repeat: no-repeat;
  opacity: 0.4;
  animation: aurora-glow-breathe 11s ease-in-out infinite alternate;
}
@keyframes aurora-glow-breathe {
  from { opacity: 0.3; }
  to { opacity: 0.45; }
}
/* Lueur diffuse autour des rideaux, comme dans les vidéos où tout le ciel verdit */
.hero-aurora::before {
  position: absolute; inset: 0;
  content: "";
  background:
    radial-gradient(ellipse 45% 26% at 25% 52%, rgba(90, 235, 150, 0.22), transparent 72%),
    radial-gradient(ellipse 40% 24% at 72% 46%, rgba(90, 225, 160, 0.2), transparent 72%),
    radial-gradient(ellipse 70% 30% at 50% 32%, rgba(170, 110, 170, 0.08), transparent 75%);
  filter: blur(20px);
  animation: aurora-airglow 13s ease-in-out infinite alternate;
}
@keyframes aurora-airglow {
  from { opacity: 0.6; }
  to { opacity: 1; }
}
.hero-starfield {
  position: absolute; inset: 0 0 48%; z-index: 1;
  overflow: hidden; pointer-events: none;
}
.hero-starfield span,
.origin-stars span {
  position: absolute; width: 3px; height: 3px; border-radius: 50%;
  background: radial-gradient(circle, #fff 0 28%, rgba(211, 240, 255, 0.94) 52%, transparent 80%);
  opacity: 0.58;
  box-shadow: 0 0 5px 1px rgba(201, 235, 255, 0.78), 0 0 11px 2px rgba(136, 194, 255, 0.3);
  animation: star-twinkle var(--star-duration) ease-in-out var(--star-delay) infinite both;
}
.hero-starfield span:nth-child(8n + 1) {
  width: 4px; height: 4px;
  box-shadow: 0 0 6px 1.5px rgba(221, 243, 255, 0.86), 0 0 14px 3px rgba(136, 194, 255, 0.4);
}
.hero-starfield span:nth-child(13n + 4) {
  width: 4px; height: 4px;
  box-shadow: 0 0 6px 1.5px rgba(239, 250, 255, 0.86), 0 0 14px 3px rgba(136, 194, 255, 0.4);
}
.hero-starfield .hero-star-cross::before,
.hero-starfield .hero-star-cross::after,
.origin-stars .hero-star-cross::before,
.origin-stars .hero-star-cross::after {
  position: absolute; top: 50%; left: 50%;
  display: block; border-radius: 50%; content: "";
  background: linear-gradient(90deg, transparent, rgba(229, 247, 255, 0.92), transparent);
  filter: drop-shadow(0 0 4px rgba(201, 235, 255, 0.8));
}
.hero-starfield .hero-star-cross::before,
.origin-stars .hero-star-cross::before {
  width: 13px; height: 1px; transform: translate(-50%, -50%);
}
.hero-starfield .hero-star-cross::after,
.origin-stars .hero-star-cross::after {
  width: 1px; height: 13px; transform: translate(-50%, -50%);
}
/* Étoiles ajoutées : un peu plus petites, et quelques teintes naturelles */
.hero-starfield .hero-star-extra { width: 2.5px; height: 2.5px; }
.hero-starfield .hero-star-warm {
  --star-glow: 255 222 175; --star-halo: 255 180 120;
  background: radial-gradient(circle, #fff 0 28%, rgba(255, 228, 190, 0.94) 52%, transparent 80%);
}
.hero-starfield .hero-star-green {
  --star-glow: 185 255 210; --star-halo: 100 238 148;
  background: radial-gradient(circle, #fff 0 28%, rgba(200, 255, 220, 0.94) 52%, transparent 80%);
}
@keyframes star-twinkle {
  /* Seulement taille et opacité : pas de halo recalculé à chaque image */
  0%, 100% { opacity: 0.5; transform: scale(0.5); }
  50% { opacity: 0.85; transform: scale(1); }
}
.hero-content {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; align-items: center;
  width: min(100%, 60rem); text-align: center;
}
/* Voile sombre très doux derrière le titre pour le détacher des aurores */
.hero-content::before {
  position: absolute; z-index: -1;
  inset: 12% -12% 28%;
  content: "";
  background: radial-gradient(ellipse 50% 50% at 50% 50%, rgba(8, 12, 24, 0.42), rgba(8, 12, 24, 0.18) 55%, transparent 75%);
  filter: blur(20px);
  pointer-events: none;
}
.hero h1 {
  font: 400 clamp(3.2rem, 10vw, 7.5rem)/0.95 "Julius Sans One", var(--display);
  letter-spacing: 0.2em; padding-left: 0.2em;
  color: #fbf7ee;
  /* Lumière astrale : contour sombre serré pour la lisibilité, puis halo clair et lavande,
     et une ombre large dessous pour détacher le titre des aurores */
  --title-glow: 0.5;
  text-shadow:
    0 0 1px rgba(255, 255, 255, 0.6),
    0 2px 5px rgba(8, 12, 24, 0.85),
    0 0 18px rgba(215, 232, 255, var(--title-glow)),
    0 0 44px rgba(170, 160, 240, calc(var(--title-glow) * 0.7)),
    0 0 90px rgba(150, 190, 255, calc(var(--title-glow) * 0.45)),
    0 6px 30px rgba(8, 12, 24, 0.55);
  animation: rise 1.6s cubic-bezier(.2,.7,.2,1) both;
}
.hero-tag {
  margin-top: 1rem; font: 600 clamp(0.7rem, 1.5vw, 0.95rem)/1.5 var(--display);
  letter-spacing: 0.34em; text-transform: uppercase; color: var(--bone);
  text-shadow: 0 2px 12px rgba(8, 19, 15, 0.85);
  animation: rise 1.6s 0.25s cubic-bezier(.2,.7,.2,1) both;
}
.hero-booking { margin-top: 1.5rem; }
.floating-actions {
  position: fixed;
  right: clamp(0.75rem, 3vw, 2rem);
  left: clamp(0.75rem, 3vw, 2rem);
  bottom: max(1.25rem, env(safe-area-inset-bottom));
  z-index: 9;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 0.75rem;
  animation: floating-actions-in 220ms ease-out both;
}
.hero-booking {
  position: relative;
  isolation: isolate;
}
.floating-actions .floating-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  gap: 0.55rem;
  min-height: var(--btn-height);
  padding: 0.6rem 1.15rem;
  border: 1px solid transparent;
  border-radius: 99px;
  /* Boutons secondaires : même liseré aurore, atténué, pour laisser Booking au premier plan */
  background:
    linear-gradient(var(--btn-fill), var(--btn-fill)) padding-box,
    linear-gradient(rgba(8, 19, 15, 0.45), rgba(8, 19, 15, 0.45)) border-box,
    var(--btn-border) border-box;
  color: var(--bone);
  font: 700 0.84rem/1.2 var(--display); letter-spacing: 0.06em;
  text-decoration: none;
  box-shadow: 0 0.4rem 1.5rem rgba(0, 0, 0, 0.34);
  backdrop-filter: blur(12px);
  cursor: pointer;
  transition:
    transform var(--hover-ease), background-color var(--hover-ease), color var(--hover-ease),
    border-color var(--hover-ease), box-shadow var(--hover-ease), scale var(--hover-ease);
}
.floating-actions .floating-action:hover {
  scale: var(--hover-scale);
  background:
    linear-gradient(rgba(16, 38, 34, 0.95), rgba(16, 38, 34, 0.95)) padding-box,
    var(--btn-border) border-box;
  box-shadow: 0 0.6rem 1.7rem rgba(0, 0, 0, 0.4), 0 0 1.1rem rgba(100, 238, 148, 0.2), 0 0 1.6rem rgba(160, 120, 230, 0.16);
}
/* Icônes des boutons secondaires teintées comme les aurores */
.floating-actions .floating-pdf svg { color: #8ff0c0; }
.floating-actions .floating-action:focus-visible { outline-offset: 4px; }
.floating-actions .floating-action .soundcloud-logo { width: 1.25rem; height: 1rem; fill: currentColor; }
.floating-actions .listen-notes {
  flex: 0 0 auto; width: 1.2rem; height: 1.2rem; overflow: visible;
  transform-origin: 40% 80%;
  transition: rotate var(--hover-ease);
}
.listen-notes-sparkle {
  fill: none; stroke: #c9fff5; stroke-width: 1; stroke-linecap: round;
  opacity: 0.75;
  transition: opacity var(--hover-ease);
}
.floating-actions .floating-listen:hover .listen-notes { rotate: -8deg; }
.floating-actions .floating-listen:hover .listen-notes-sparkle { opacity: 1; }
.floating-actions .floating-action .soundcloud-wave { stroke: var(--night); }
.floating-actions .floating-action:hover .soundcloud-wave { stroke: var(--night); }
.floating-actions .floating-pdf svg {
  width: 1.1rem;
  height: 1.1rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.floating-actions .floating-booking {
  position: relative;
  isolation: isolate;
  width: 248px;
  min-width: 0;
  margin: 0;
  /* Même hauteur que PDF et Écouter : la barre flottante reste alignée */
  padding: 0.6rem 1.6rem;
  font-size: 0.95rem;
}
.floating-actions .floating-pdf { grid-column: 1; grid-row: 1; justify-self: start; }
.floating-actions .floating-booking { grid-column: 2; grid-row: 1; justify-self: center; }
.floating-actions .floating-listen { grid-column: 3; grid-row: 1; justify-self: end; }
@keyframes floating-actions-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.hero-loc { margin-top: 0.6rem; color: var(--muted); }
/* Emblème en traits seuls, posé dans le ciel : halo sombre discret pour la lisibilité,
   lueur froide reprise des aurores */
.hero-art {
  position: relative;
  display: grid; place-items: center; margin-bottom: clamp(0.9rem, 1.8vw, 1.4rem);
  /* ≈ 1,3 × la hauteur des capitales du titre (font-size clamp(3.2rem, 10vw, 7.5rem)) :
     assez présent pour équilibrer le titre, sans lui faire concurrence */
  width: clamp(4rem, 9.2vw, 6.9rem); aspect-ratio: 1;
}
/* Emblème fondu dans le ciel comme un astre : pas de disque opaque ni de couronne nette,
   seulement un léger voile sombre diffus et un halo très doux qui prolonge le cercle */
.hero-art::before,
.hero-art::after {
  position: absolute; z-index: -1; content: "";
  border-radius: 50%; pointer-events: none;
}
.hero-art::before {
  inset: -55%;
  background: radial-gradient(
    circle,
    rgba(225, 238, 255, 0.1) 0 26%, rgba(190, 215, 255, 0.055) 42%,
    rgba(160, 140, 230, 0.03) 58%, transparent 72%
  );
  filter: blur(10px);
  animation: astre-halo 9s ease-in-out infinite alternate;
}
.hero-art::after {
  inset: 3%;
  background: radial-gradient(circle, rgba(10, 16, 34, 0.28) 0 55%, transparent 72%);
  filter: blur(4px);
}
.hero-art img {
  display: block; width: 100%; height: 100%; object-fit: contain;
  opacity: 0.92;
  filter:
    drop-shadow(0 0 1.5px rgba(255, 255, 255, 0.6))
    drop-shadow(0 0 6px rgba(215, 232, 255, 0.35))
    drop-shadow(0 0 16px rgba(170, 200, 255, 0.18));
}
@keyframes astre-halo {
  from { opacity: 0.75; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1.04); }
}
.hero-genres {
  margin-top: clamp(3.5rem, 10vh, 6.5rem);
  max-width: 48rem; color: rgba(239, 233, 220, 0.9);
  font: 600 clamp(0.58rem, 1.2vw, 0.78rem)/2 var(--display);
  letter-spacing: 0.12em; text-transform: uppercase;
  text-shadow: 0 2px 12px rgba(8, 19, 15, 0.9);
}
/* Une ligne par groupe de styles ; un style n'est jamais coupé en deux */
.hero-genres-line { display: block; }
/* Mobile : chaque groupe de styles tient sur une seule ligne, la taille suit la largeur de l'écran */
@media (max-width: 800px) {
  .hero .hero-genres { max-width: none; }
  .hero-genres-line { white-space: nowrap; font-size: min(0.78rem, 2vw); letter-spacing: 0.05em; }
}
.hero-genre { white-space: nowrap; }
.horizon {
  position: absolute; left: 0; right: 0; bottom: 0; height: 7rem;
  background: linear-gradient(to top, rgba(8, 19, 15, 0.7), transparent);
  opacity: 0.8;
  mask-image: linear-gradient(to top, #000, transparent);
}
@keyframes rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }

/* Sections */
.row {
  display: grid; grid-template-columns: 1fr; gap: 2rem;
  padding: 5rem clamp(1rem, 4vw, 3rem);
  border-top: 1px solid var(--line);
}
.row h2 { font: 700 26px/1.2 var(--display); text-align: center; }
/* Puce en onde devant chaque titre de section : palette des aurores, amplitude qui s'éteint */
.row h2::before {
  display: inline-block; vertical-align: -0.08em;
  width: 1.85em; height: 0.78em; margin-right: 0.55em;
  content: "";
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 20'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1'%3E%3Cstop offset='0' stop-color='%2364ee94'/%3E%3Cstop offset='.4' stop-color='%2369d7af'/%3E%3Cstop offset='.72' stop-color='%23a078e6'/%3E%3Cstop offset='1' stop-color='%23cd5ab9'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M3 12 C6 12 7 15 10 15 S15 9 19 9 25 16 29 16 34 7 39 7 43 13 46 12' fill='none' stroke='url%28%23g%29' stroke-opacity='.45' stroke-width='1.1' stroke-linecap='round'/%3E%3Cpath d='M2 10 C5 10 6 2 10 2 S15 18 19 18 24 4 28 4 32 15 36 15 39.5 7.5 42 7.5 45 10 46 10' fill='none' stroke='url%28%23g%29' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat;
  filter: drop-shadow(0 0 4px rgba(100, 238, 148, 0.45)) drop-shadow(0 0 7px rgba(160, 120, 230, 0.3));
  transform-origin: left center;
  animation: title-wave-breathe 4.4s ease-in-out infinite alternate;
}
@keyframes title-wave-breathe {
  from { transform: scaleY(0.82); opacity: 0.85; }
  to { transform: scaleY(1.08); opacity: 1; }
}
.row#origine h2 { width: min(100%, 70rem); margin-inline: auto; text-align: left; }
.prose { max-width: 62ch; margin-inline: auto; }
.prose p + p { margin-top: 1rem; }
.origin-content {
  display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(14rem, 0.8fr);
  align-items: center; gap: clamp(2rem, 5vw, 5rem);
  width: min(100%, 70rem); margin-inline: auto;
}
.origin-content .prose { width: 100%; }
.origin-visual {
  position: relative; isolation: isolate;
  width: min(90%, 17.8rem); aspect-ratio: 1;
  justify-self: center; padding: 0.72rem;
  border: 2px solid #c7d0cb;
  border-radius: 50%;
  /* Anneau en métal brossé : joints de plaques, reflets d'une lumière haut-gauche, biseaux */
  background:
    /* Reflet de lumière qui glisse lentement sur le métal */
    conic-gradient(
      from 300deg,
      transparent 0deg, rgba(255, 255, 255, 0.28) 7deg, transparent 16deg,
      transparent 176deg, rgba(255, 255, 255, 0.12) 184deg, transparent 194deg
    ),
    /* Reflets de l'aurore sur le métal : vert d'un côté, violet de l'autre */
    conic-gradient(
      from 20deg,
      rgba(100, 238, 148, 0.16), transparent 14%, transparent 34%, rgba(160, 120, 230, 0.18) 48%,
      rgba(205, 90, 185, 0.1) 56%, transparent 68%, transparent 84%, rgba(100, 238, 148, 0.16)
    ),
    repeating-conic-gradient(from 5deg, rgba(2, 10, 14, 0.7) 0deg 0.45deg, rgba(220, 240, 234, 0.18) 0.45deg 0.8deg, transparent 0.8deg 15deg),
    radial-gradient(circle, transparent 88%, rgba(0, 0, 0, 0.5) 90.5%, rgba(255, 255, 255, 0.12) 92%, transparent 95%, rgba(0, 0, 0, 0.45) 100%),
    conic-gradient(
      from 0deg,
      #8fa3a1 0deg, #4a5e62 26deg, #2a3a40 58deg, #5c7173 96deg, #b9cbc7 126deg, #4b5f63 150deg,
      #26353b 186deg, #4a5e62 218deg, #c3d3cf 258deg, #f4fbf8 292deg, #cad8d4 310deg, #7d9190 336deg, #8fa3a1 360deg
    );
  box-shadow:
    0 0 1.4rem rgba(100, 238, 148, 0.16), 0 0 2.6rem rgba(160, 120, 230, 0.16), 0 1.5rem 4rem rgba(0, 0, 0, 0.55),
    inset 0 1px 1px rgba(255, 255, 255, 0.45), inset 0 -1px 2px rgba(0, 0, 0, 0.8),
    inset 0 0 0 0.2rem rgba(6, 18, 24, 0.55), inset 0 0 0.7rem 0.35rem rgba(4, 15, 21, 0.7);
}
.origin-visual::before {
  content: ""; position: absolute; z-index: -1; inset: -0.75rem;
  border: 1px solid transparent; border-radius: 50%;
  /* Liseré extérieur aux couleurs des aurores */
  background: conic-gradient(from 200deg, #64ee94, #69d7af, #87a5d7, #a078e6, #cd5ab9, #a078e6, #69d7af, #64ee94) border-box;
  mask: linear-gradient(#000 0 0) padding-box exclude, linear-gradient(#000 0 0) border-box;
  opacity: 0.75;
}
.origin-stars {
  position: absolute; inset: 0.72rem; z-index: 0;
  border-radius: 50%; overflow: hidden; pointer-events: none;
}
.origin-photo {
  display: block; width: 100%; height: 100%; object-fit: cover;
  border: 2px solid rgba(5, 18, 22, 0.9); border-radius: 50%;
  filter: saturate(1.08);
}
/* Horizon des événements : liseré de plasma au contact de l'anneau, ombre de l'anneau,
   ondes concentriques et reflet tournant */
.origin-horizon {
  position: absolute; inset: 0.72rem; z-index: 0;
  border-radius: 50%; overflow: hidden; pointer-events: none;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.09), transparent 35%, transparent 70%, rgba(200, 180, 255, 0.06)),
    radial-gradient(circle, transparent 58%, rgba(100, 220, 170, 0.04) 80%, rgba(4, 14, 18, 0.85) 100%);
  box-shadow: inset 0 0.35rem 0.9rem rgba(0, 0, 0, 0.6), inset 0 0 0.25rem rgba(200, 255, 225, 0.22);
}
.origin-horizon::before,
.origin-horizon::after {
  position: absolute; inset: 0; content: ""; border-radius: 50%;
  mix-blend-mode: screen;
}
.origin-horizon::before {
  background: repeating-radial-gradient(circle, rgba(220, 240, 235, 0.05) 0 1.5px, transparent 2.5px 13px);
  mask-image: radial-gradient(circle, transparent 18%, #000 55%, transparent 92%);
  animation: horizon-ripple 7s ease-in-out infinite;
}
/* Anneau de plasma au contact du métal : vert, turquoise, violet, magenta, qui tourne lentement */
.origin-horizon::after {
  background: conic-gradient(
    from 0deg,
    rgba(100, 238, 148, 0.32), rgba(105, 215, 175, 0.2) 18%, rgba(135, 165, 215, 0.18) 36%,
    rgba(160, 120, 230, 0.3) 52%, rgba(205, 90, 185, 0.22) 64%, rgba(160, 120, 230, 0.18) 78%, rgba(100, 238, 148, 0.32)
  );
  mask-image: radial-gradient(circle closest-side, transparent 91%, rgba(0, 0, 0, 0.85) 98%, rgba(0, 0, 0, 0.6) 100%);
  animation: horizon-sheen 38s linear infinite;
}
@keyframes horizon-ripple {
  0%, 100% { transform: scale(1); opacity: 0.55; }
  50% { transform: scale(1.09); opacity: 1; }
}
@keyframes horizon-sheen { to { transform: rotate(360deg); } }
.bio-content {
  display: grid; grid-template-columns: minmax(20rem, 1fr) minmax(0, 1.5fr);
  align-items: center; gap: clamp(2rem, 5vw, 5rem);
  width: min(100%, 70rem); margin-inline: auto;
}
.bio-photo-frame {
  position: relative; isolation: isolate;
  width: min(100%, 25rem); aspect-ratio: 0.72;
  justify-self: center;
  border: solid transparent;
  border-width: 2px 4px 2px 3px; /* même finesse que l'encadré Booking */
  border-radius: 1rem 4rem 1rem 4rem;
  /* Encadrés Biographie et Booking : palette des aurores (vert → turquoise → violet → magenta) */
  --photo-frame-gradient: linear-gradient(
    135deg, #d6ffe2 0%, #64ee94 16%, #69d7af 32%, #1d5f52 48%, #87a5d7 62%, #a078e6 76%, #cd5ab9 88%, #ecd2ff 100%
  );
  background:
    linear-gradient(var(--night), var(--night)) padding-box,
    var(--photo-frame-gradient) border-box;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.4), 0 0 1.4rem rgba(100, 238, 148, 0.14), 0 0 2.6rem rgba(160, 120, 230, 0.12);
}
.bio-photo-frame::before {
  position: absolute; z-index: -1; inset: -0.55rem;
  border: 1px solid transparent;
  border-radius: 1.2rem 4.2rem 1.2rem 4.2rem;
  background: linear-gradient(135deg, rgba(100, 238, 148, 0.5), rgba(135, 165, 215, 0.4), rgba(160, 120, 230, 0.5)) border-box;
  mask: linear-gradient(#000 0 0) padding-box exclude, linear-gradient(#000 0 0) border-box;
  content: ""; pointer-events: none;
}
.bio-photo-frame::after {
  position: absolute; z-index: 3; top: 0.55rem; right: 2rem;
  width: 2.5rem; height: 2px; border-radius: 99px;
  background: linear-gradient(90deg, rgba(160, 120, 230, 0.5), #64ee94 60%, #d6ffe2);
  box-shadow: 0 0 0.65rem rgba(100, 238, 148, 0.55);
  content: ""; pointer-events: none;
}
.bio-photo-image {
  position: absolute; inset: 2px 4px 2px 3px; overflow: hidden;
  border-radius: 0.85rem 3.8rem 0.85rem 3.8rem;
}
.bio-photo {
  display: block; width: 100%; height: 100%; object-fit: cover; object-position: center;
  transform: scaleX(-1) scale(1.06);
}
.bio-photo-ornaments {
  position: absolute; z-index: 2; inset: -9%; width: 118%; height: 118%;
  overflow: visible; pointer-events: none;
}
.bio-wave-group { fill: none; stroke-linecap: round; stroke-linejoin: round; }
/* Ondes sur les photos : dégradé vert → turquoise → violet → magenta des aurores */
.shared-gradients { position: absolute; width: 0; height: 0; overflow: hidden; }
.bio-wave-main {
  stroke: url(#aurora-wave-gradient); stroke-width: 2.4; vector-effect: non-scaling-stroke;
  filter: drop-shadow(0 0 4px rgba(100, 238, 148, 0.65)) drop-shadow(0 0 9px rgba(160, 120, 230, 0.4));
}
.bio-wave-echo {
  stroke: url(#aurora-wave-gradient); stroke-opacity: 0.42; stroke-width: 1;
  vector-effect: non-scaling-stroke;
}
.bio-wave-glint {
  stroke: url(#aurora-wave-glint-gradient); stroke-width: 0.9; opacity: 0.85;
  vector-effect: non-scaling-stroke;
}
.bio-wave-node { fill: #d6ffe2; stroke: #64ee94; stroke-width: 1; }
.bio-wave-node-soft { fill: #ecd2ff; stroke: #a078e6; opacity: 0.72; }
.bio-content .prose { width: 100%; }
.origin-ornaments {
  position: absolute; z-index: 1; inset: -1rem; width: calc(100% + 2rem); height: calc(100% + 2rem);
  overflow: visible; pointer-events: none;
}
.ornament-bezel, .ornament-orbit, .ornament-guide, .ornament-sigil, .ornament-star, .ornament-tooth {
  fill: none; vector-effect: non-scaling-stroke;
}
.ornament-bezel { stroke: url(#portal-metal-gradient); stroke-width: 4; filter: url(#portal-relief); }
.ornament-sigil { filter: url(#portal-relief); }
.ornament-orbit { stroke: rgba(100, 238, 148, 0.6); stroke-width: 0.8; stroke-dasharray: 1 4; }
.ornament-guide { stroke: rgba(195, 217, 209, 0.62); stroke-width: 0.9; stroke-dasharray: 16 3 1 3; }
.ornament-tick { fill: none; stroke: rgba(239, 233, 220, 0.55); stroke-width: 0.65; vector-effect: non-scaling-stroke; }
.ornament-tick-major { stroke: #87e8b0; stroke-width: 1; }
.ornament-tick-major:nth-of-type(8n + 1) { stroke: #b99af0; }
/* Chevrons : sans animation ni noir, un sur deux turquoise, un sur deux violacé */
.ornament-tooth {
  --gem-fill: url(#portal-chevron-turq-gem);
  --gem-edge: rgba(230, 255, 250, 0.6);
  --gem-line: rgba(255, 255, 255, 0.8);
  fill: url(#portal-chevron-turq); stroke: #c9fbf2; stroke-width: 1;
  filter: drop-shadow(0 0 3px rgba(127, 230, 212, 0.55));
}
.ornament-tooth-violet {
  --gem-fill: url(#portal-chevron-violet-gem);
  --gem-edge: rgba(243, 232, 255, 0.6);
  fill: url(#portal-chevron-violet); stroke: #e9dcff;
  filter: drop-shadow(0 0 3px rgba(184, 150, 239, 0.6));
}
.ornament-inscription {
  /* Gravé dans le métal : ombre au-dessus, reflet en dessous */
  fill: rgba(214, 230, 224, 0.78); font: 500 15px/1 system-ui, sans-serif;
  filter: drop-shadow(0 -0.6px 0 rgba(0, 0, 0, 0.85)) drop-shadow(0 0.6px 0 rgba(255, 255, 255, 0.22));
  letter-spacing: 1px; text-anchor: start;
}
/* Inscription dans son propre calque, tourné en entier : rotation animée par la carte
   graphique, sans recalculer le texte ni redessiner l'anneau à chaque image */
.origin-inscription {
  position: absolute; z-index: 1; inset: -1rem; width: calc(100% + 2rem); height: calc(100% + 2rem);
  overflow: visible; pointer-events: none;
  will-change: transform;
  animation: inscription-rotation 90s linear infinite;
}
@keyframes inscription-rotation { to { transform: rotate(360deg); } }
.origin-inscription svg { display: block; width: 100%; height: 100%; overflow: visible; }
.ornament-sigil { stroke: #c8f5d8; stroke-width: 1.2; }
.ornament-sigil circle { fill: #64ee94; stroke: var(--bone); stroke-width: 0.8; }
.ornament-sigil:nth-of-type(2n) circle { fill: #a078e6; }
.ornament-star { stroke: rgba(239, 233, 220, 0.78); stroke-width: 0.8; }
.ornament-star circle { fill: #a078e6; stroke: none; }
.origin-visual::after {
  content: ""; position: absolute; top: 0.08rem; left: 50%;
  width: 1.35rem; height: 1.65rem; transform: translateX(-50%);
  clip-path: polygon(50% 0, 100% 42%, 50% 100%, 0 42%);
  background: linear-gradient(180deg, #e6ffed, #64ee94 50%, #1d5f52);
  filter: drop-shadow(0 0 0.45rem rgba(100, 238, 148, 0.9));
}
.collective + .collective { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--line); }
.collective-title {
  display: flex; align-items: center; gap: 0.75rem;
  margin-bottom: 1rem; font: 700 1.3rem/1.2 var(--display);
}
.collective-title img {
  flex: 0 0 2.25rem; width: 2.25rem; height: 2.25rem; object-fit: contain;
}
.collective-logo-print { display: none; }
.collective-links { margin-top: 1.25rem; }
@media (min-width: 801px) {
  .row#labels > .prose {
    display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(2rem, 5vw, 5rem); width: min(100%, 70rem); max-width: none;
  }
  .row#labels .collective + .collective {
    margin-top: 0; padding-top: 0; border-top: 0;
  }
}
.lead { font: italic 300 26px/1.4 "Newsreader", cursive; max-width: 50ch; margin: 0 auto 2.5rem; text-align: center; }
.todo { color: var(--ember); font-style: italic; }

/* Sons */
.worlds {
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start; gap: 1.5rem;
}
.world {
  position: relative; overflow: hidden; padding: 1.2rem 1.8rem 4.5rem;
  border: 1px solid rgba(239, 233, 220, 0.12); border-radius: 4px 28px 4px 28px;
  transition: transform 220ms ease, border-color 220ms ease;
}
.world:hover { transform: translateY(-3px); border-color: var(--turq-line); }
.w0 { background: linear-gradient(160deg, #0f2a20, #1a1236); }
.w1 { background: linear-gradient(160deg, #3a1747, #6a2a4a 60%, #8a4a3a); }
.w2 { background: linear-gradient(160deg, #173047, #1c5860 60%, #4b4a68); }
.world-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 0.5rem; }
.world h3 { font: 800 24px var(--display); }
.world-bpm {
  flex: 0 0 auto; color: rgba(239, 233, 220, 0.78);
  font: 600 0.7rem/1.4 var(--display); letter-spacing: 0.06em;
}
.mood { font-style: italic; color: var(--muted); margin-bottom: 1.4rem; }
.style + .style { margin-top: 1.2rem; padding-top: 1.2rem; border-top: 1px solid var(--line); }
.style h4 { font: 700 1.05rem var(--display); margin-bottom: 0.3rem; }
.style p { font-size: 17px; line-height: 1.55; }
.world-wave {
  position: absolute; right: 1.8rem; bottom: 0.8rem; left: 1.8rem;
  width: calc(100% - 3.6rem); height: 2.8rem; overflow: visible;
  filter: drop-shadow(0 0 0.35rem rgba(63, 208, 192, 0.55));
}
.world-wave-baseline { stroke: rgba(239, 233, 220, 0.24); stroke-width: 0.7; }
.world-wave-bar {
  fill: rgba(63, 208, 192, 0.85);
  transform-box: fill-box; transform-origin: center;
}
.world-wave-fast .world-wave-bar,
.world-wave-syncopated .world-wave-bar,
.world-wave-slow .world-wave-bar {
  animation: waveform-pulse var(--beat-duration, 0.6s) ease-in-out infinite;
}
@keyframes waveform-pulse {
  0%, 100% { transform: scaleY(var(--pulse-floor, 0.72)); opacity: 0.62; }
  50% { transform: scaleY(1); opacity: 1; }
}
.world-wave-line {
  fill: none; stroke: rgba(63, 208, 192, 0.85); stroke-width: 1.5;
  vector-effect: non-scaling-stroke;
}
.world-wave-line-back { stroke: rgba(239, 233, 220, 0.42); stroke-width: 1; }

/* Évènements */
.events-intro { text-align: center; font-style: italic; color: var(--muted); margin-top: -0.75rem; }
.events {
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem;
  align-items: start; width: min(100%, 70rem); margin-inline: auto;
}
.event-group {
  position: relative; padding: 1.4rem 1.6rem 1.6rem;
  border: 1px solid rgba(239, 233, 220, 0.12); border-radius: 4px 28px 4px 28px;
  background: linear-gradient(160deg, rgba(100, 238, 148, 0.05), transparent 45%, rgba(160, 120, 230, 0.07));
}
.event-group::before {
  position: absolute; top: 0; left: 1.6rem; right: 1.6rem; height: 2px;
  content: ""; border-radius: 99px;
  background: linear-gradient(90deg, #64ee94, #69d7af, #a078e6, #cd5ab9);
  opacity: 0.8;
}
.event-group h3 { font: 800 1.3rem/1.2 var(--display); }
.event-place {
  margin-top: 0.2rem; color: var(--muted);
  font: 600 0.75rem var(--display); letter-spacing: 0.12em; text-transform: uppercase;
}
.event-group-images { display: none; }
.event-venues { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.1rem; padding: 0; list-style: none; }
.event-venues li {
  padding: 0.3rem 0.8rem; border: 1px solid var(--turq-line); border-radius: 99px;
  font: 600 0.85rem var(--display);
}
/* Une colonne par région : ses évènements du plus récent au plus ancien, image entière sur un
   fond flouté de la même image, sans recadrage */
.event-column {
  display: grid; gap: 1.2rem; margin: 1.4rem 0 0; padding: 0; list-style: none;
}
.event-group .events-toggle { display: block; margin: 1.2rem auto 0; }
.event-card {
  display: flex; flex-direction: column; overflow: hidden;
  border: 1px solid rgba(239, 233, 220, 0.12); border-radius: 4px 22px 4px 22px;
  background: rgba(8, 19, 15, 0.6);
  transition: border-color var(--hover-ease), box-shadow var(--hover-ease);
}
.event-card:hover {
  border-color: rgba(140, 240, 222, 0.5);
  box-shadow: 0 0 1.2rem rgba(100, 238, 148, 0.12), 0 0 2rem rgba(160, 120, 230, 0.1);
}
.event-media {
  position: relative; isolation: isolate; display: block; overflow: hidden;
  aspect-ratio: 4 / 5;
}
.event-media::before {
  position: absolute; inset: -10%; z-index: -1; content: "";
  background: var(--event-image) center / cover no-repeat;
  filter: blur(18px) brightness(0.55) saturate(1.2);
}
.event-media img {
  display: block; width: 100%; height: 100%; object-fit: contain;
  transition: scale var(--hover-ease);
}
.event-card:hover .event-media img { scale: 1.03; }
/* Photos en paysage : recadrées en portrait autour du sujet (object-position par image) */
.event-media-cropped img { object-fit: cover; }
.event-info { position: relative; padding: 1rem 1.2rem 1.2rem; }
.event-info::before {
  position: absolute; top: 0; left: 1.2rem; right: 1.2rem; height: 2px;
  content: ""; border-radius: 99px;
  background: linear-gradient(90deg, #64ee94, #69d7af, #a078e6, #cd5ab9); opacity: 0.7;
}
.event-year {
  display: inline-block; margin-bottom: 0.35rem;
  font: 800 0.8rem var(--display); letter-spacing: 0.14em;
  background: linear-gradient(90deg, #64ee94, #a078e6); -webkit-background-clip: text; background-clip: text;
  color: transparent;
}
.event-info h4 { font: 700 1.05rem/1.25 var(--display); }
.event-date { margin-top: 0.25rem; color: var(--bone); font-size: 0.9rem; }
.event-detail { margin-top: 0.15rem; color: var(--muted); font-size: 0.85rem; }
.events-toggle {
  justify-self: center;
  min-height: var(--btn-height); padding: 0.6rem 1.6rem; border: 1px solid transparent; border-radius: 99px;
  background:
    linear-gradient(var(--btn-fill), var(--btn-fill)) padding-box,
    linear-gradient(rgba(8, 19, 15, 0.45), rgba(8, 19, 15, 0.45)) border-box,
    var(--btn-border) border-box;
  color: var(--bone); cursor: pointer;
  font: 700 0.9rem var(--display); letter-spacing: 0.06em;
  transition:
    border-color var(--hover-ease), background-color var(--hover-ease),
    box-shadow var(--hover-ease), scale var(--hover-ease);
}
.events-toggle:hover {
  scale: var(--hover-scale);
  background:
    linear-gradient(rgba(16, 38, 34, 0.95), rgba(16, 38, 34, 0.95)) padding-box,
    var(--btn-border) border-box;
  box-shadow: 0 0 1.1rem rgba(100, 238, 148, 0.2), 0 0 1.6rem rgba(160, 120, 230, 0.16);
}
@media (max-width: 1000px) {
  .event-group { padding-inline: 1.1rem; }
}
@media (max-width: 800px) {
  .events { grid-template-columns: 1fr; }
  /* Une seule colonne à l'écran : les deux évènements côte à côte */
  .event-column { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.8rem; }
  .event-info { padding: 0.8rem 0.9rem 1rem; }
  .event-info h4 { font-size: 0.92rem; }
  .event-date, .event-detail { font-size: 0.8rem; }
}

/* Booking */
.booking-layout {
  display: grid; grid-template-columns: minmax(0, 1fr) auto;
  align-items: center; gap: clamp(2rem, 6vw, 6rem);
  width: min(100%, 70rem); margin-inline: auto;
}
.booking-layout h2 { margin-bottom: 2rem; text-align: left; }
.booking-cta {
  --booking-ease: 750ms cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative; isolation: isolate; overflow: hidden;
  display: grid; gap: 0.15rem; justify-items: center;
  min-height: var(--btn-height); align-content: center;
  padding: 0.6rem 1.6rem; border: 1px solid transparent; border-radius: 99px;
  background: linear-gradient(var(--btn-fill), var(--btn-fill)) padding-box, var(--btn-border) border-box;
  text-decoration: none;
  font: 700 0.9rem/1.4 var(--display); letter-spacing: 0.08em;
  color: var(--bone); box-shadow: 0 0 1.1rem rgba(100, 238, 148, 0.14), 0 0 1.6rem rgba(160, 120, 230, 0.12);
  transition:
    color var(--booking-ease), box-shadow var(--booking-ease), scale var(--booking-ease);
}
/* Survol : une lumière crème se diffuse depuis le centre jusqu'à remplir le bouton */
.booking-cta::before {
  position: absolute; inset: 0; z-index: -1;
  border-radius: inherit; content: "";
  /* Survol : le fond crème apparaît en fondu, simplement, sans effet de propagation */
  background: var(--bone);
  opacity: 0;
  transition: opacity var(--booking-ease);
}
.booking-cta:hover::before { opacity: 1; }
.booking-cta span + span { font: 400 0.72rem/1.4 var(--body); letter-spacing: 0; }
.booking-cta:hover {
  scale: 1.02;
  color: var(--night);
  box-shadow: 0 0 1.6rem rgba(239, 233, 220, 0.22), 0 0 3rem rgba(180, 200, 255, 0.12);
}
.book { max-width: 64ch; margin-inline: auto; width: 100%; }
.book > div { display: grid; grid-template-columns: 8rem 1fr; gap: 1.5rem; padding: 1.1rem 0; border-bottom: 1px solid var(--line); }
.book dt { font: 700 1rem var(--display); color: var(--turq); }
.book dd { margin: 0; }
.booking-visual {
  justify-self: end; aspect-ratio: 1;
  border-radius: 1.2rem 4.4rem 1.2rem 4.4rem;
}
.booking-visual::before { inset: -0.65rem; border-radius: 1.5rem 4.7rem 1.5rem 4.7rem; }
.booking-visual .bio-photo-image { border-radius: 0.95rem 4rem 0.95rem 4rem; }
.booking-visual img {
  display: block; width: 100%; height: 100%; object-fit: cover;
}
.booking-visual-ornaments {
  position: absolute; z-index: 2; right: -7%; bottom: -7%;
  width: 70%; height: 70%; overflow: visible; pointer-events: none;
}

/* Dossier presse : bouton secondaire sous le tableau Booking, même liseré aurore que les autres boutons */
.press-kit-link {
  display: inline-flex; align-items: center; gap: 0.85rem;
  margin-top: 1.8rem; padding: 0.7rem 1.5rem 0.7rem 0.75rem;
  text-align: left;
  border: 1px solid transparent; border-radius: 99px;
  background:
    linear-gradient(var(--btn-fill), var(--btn-fill)) padding-box,
    linear-gradient(rgba(8, 19, 15, 0.45), rgba(8, 19, 15, 0.45)) border-box,
    var(--btn-border) border-box;
  color: var(--bone); text-decoration: none;
  transition: scale var(--hover-ease), background var(--hover-ease), box-shadow var(--hover-ease);
}
/* Icône dans une pastille ronde au dégradé aurore */
.press-kit-link svg {
  flex: 0 0 auto; box-sizing: content-box; width: 1.15rem; height: 1.15rem; padding: 0.55rem;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(100, 238, 148, 0.22), rgba(160, 120, 230, 0.22));
  box-shadow: inset 0 0 0 1px rgba(180, 230, 220, 0.25);
  fill: none; stroke: #c9fbe0; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
  transition: translate var(--hover-ease);
}
.press-kit-link:hover svg { translate: 0 2px; }
.press-kit-link span { display: grid; gap: 0.1rem; }
.press-kit-link strong { font: 700 0.95rem/1.2 var(--display); letter-spacing: 0.06em; }
.press-kit-link small { color: var(--muted); font-size: 0.78rem; }
.press-kit-link:hover {
  scale: var(--hover-scale);
  background:
    linear-gradient(rgba(16, 38, 34, 0.95), rgba(16, 38, 34, 0.95)) padding-box,
    var(--btn-border) border-box;
  box-shadow: 0 0 1.1rem rgba(100, 238, 148, 0.2), 0 0 1.6rem rgba(160, 120, 230, 0.16);
}
/* Section Dossier presse : titre comme les autres sections, texte et bouton centrés */
.row.press { justify-items: center; text-align: center; }
.press-intro { max-width: 46ch; color: var(--muted); margin-top: -0.5rem; }
.press .press-kit-link { margin-top: 0; }
.press-print { display: none; }

/* Contact */
.mail { font: 700 clamp(1.2rem, 3vw, 2rem) var(--display); text-decoration: none; border-bottom: 2px solid var(--magenta); }
.contact .mail { font-size: clamp(1rem, 2.2vw, 1.25rem); }
.contact > div { text-align: center; }
/* Espace sous l'adresse pour que la barre flottante (Booking) ne recouvre pas la fin de page */
.row.press { padding-bottom: 5rem; }
.links { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 2rem; }
.contact .links { justify-content: center; }
.links a {
  display: inline-block; padding: 0.4rem 1rem; border: 1px solid var(--line);
  border-radius: 99px; text-decoration: none; font-family: var(--display); font-size: 0.9rem;
  transition:
    border-color var(--hover-ease), background-color var(--hover-ease), color var(--hover-ease),
    box-shadow var(--hover-ease), scale var(--hover-ease);
}
.link-screen-label { display: inline-flex; align-items: center; gap: 0.45rem; }
/* Liens des labels : à l'écran, seul le nom s'affiche (pastille) ; pictogramme et adresse sont pour le PDF */
.collective-links .link-icon,
.collective-links .link-url { display: none; }
.soundcloud-logo { width: 1.25rem; height: 1rem; fill: #fff; }
.soundcloud-wave {
  fill: none; stroke: var(--night); stroke-width: 1; stroke-linecap: round;
}
.link-print-label { display: none; }
.contact-print-marker { display: none; }
.links a:hover { scale: var(--hover-scale); border-color: var(--hover-border); background: var(--hover-fill); box-shadow: var(--hover-glow); }
.contact-print-qr { display: none; }
/* Le bouton SoundCloud n'apparaît plus à l'écran, seulement dans le PDF imprimé */
.contact .contact-print-links { display: none; }
/* Formulaire de contact */
.contact-form {
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem 1.2rem;
  width: min(100%, 40rem); margin: 2.2rem auto 0; text-align: left;
}
.contact-form label { display: grid; gap: 0.4rem; }
.contact-form label > span {
  color: var(--muted); font: 600 0.75rem var(--display); letter-spacing: 0.12em; text-transform: uppercase;
}
.contact-form-wide { grid-column: 1 / -1; }
.contact-form input,
.contact-form select,
.contact-form textarea {
  width: 100%; padding: 0.75rem 1rem;
  border: 1px solid rgba(239, 233, 220, 0.16); border-radius: 0.8rem;
  background: rgba(8, 19, 15, 0.7); color: var(--bone);
  font: 400 1rem/1.5 var(--body);
  transition: border-color var(--hover-ease), box-shadow var(--hover-ease);
}
.contact-form textarea { resize: vertical; min-height: 8rem; }
.contact-form select { appearance: none; cursor: pointer;
  background-image: linear-gradient(45deg, transparent 50%, var(--muted) 50%), linear-gradient(135deg, var(--muted) 50%, transparent 50%);
  background-position: calc(100% - 1.25rem) 50%, calc(100% - 0.95rem) 50%;
  background-size: 0.32rem 0.32rem; background-repeat: no-repeat;
}
.contact-form input:focus,
.contact-form select:focus,
.contact-form textarea:focus {
  outline: none; border-color: var(--hover-border); box-shadow: var(--hover-glow);
}
.contact-form-footer {
  grid-column: 1 / -1;
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;
}
.contact-form-note { color: var(--muted); font-size: 0.85rem; max-width: 26rem; }
.contact-form .booking-cta {
  cursor: pointer; font-size: 0.95rem;
  width: auto; min-width: 11rem; margin-left: auto; padding: 0.75rem 2rem;
}
@media (max-width: 560px) {
  .contact-form { grid-template-columns: 1fr; }
  .contact-form-footer { justify-content: center; text-align: center; }
  .contact-form .booking-cta { margin-left: 0; }
}

footer { padding: 2.5rem clamp(1rem, 4vw, 3rem); color: var(--muted); border-top: 1px solid var(--line); font-size: 0.95rem; }
/* Mentions en bas de page ; marge basse pour passer sous la barre flottante */
.site-footer {
  padding-block: 1.6rem calc(1.6rem + 5rem + env(safe-area-inset-bottom, 0px));
  text-align: center; font: 600 0.75rem var(--display); letter-spacing: 0.08em;
}

@media (min-width: 801px) {
  .booking-layout { grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.65fr); }
  .booking-cta {
    justify-self: center; width: min(100%, 18rem);
    padding: 1rem 2rem; font-size: 1.1rem;
  }
  .hero-booking { width: 248px; min-width: 248px; }
  /* Booking fixe : même taille que celui du landing ; PDF et Écouter gardent leur taille compacte */
  .floating-actions .floating-booking { width: 248px; padding: 1rem 2rem; font-size: 1.1rem; }
  .contact .mail { font-size: 20px; }
}

@media (min-width: 801px) and (max-width: 1000px) {
  .worlds { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

/* Mobile */
@media (max-width: 800px) {
  .hero-starfield span:nth-child(2n):not(.hero-star-feature) { display: none; }
  .floating-actions {
    right: clamp(1rem, 4vw, 3rem);
    left: clamp(1rem, 4vw, 3rem);
    bottom: max(0.65rem, env(safe-area-inset-bottom));
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 1fr);
    gap: 0.4rem;
  }
  .floating-actions .floating-action {
    gap: 0.25rem;
    min-width: 0;
    width: 100%;
    min-height: 2.5rem;
    padding: 0.4rem 0.2rem;
    font-size: 0.66rem;
    white-space: nowrap;
  }
  .floating-actions .floating-pdf,
  .floating-actions .floating-listen {
    width: 100%;
    min-height: 2.5rem;
  }
  .floating-actions .floating-action .soundcloud-logo {
    width: 1rem;
    height: 0.8rem;
    flex: 0 0 auto;
  }
  .floating-actions .listen-notes { width: 1rem; height: 1rem; }
  .floating-actions .floating-pdf svg {
    width: 0.95rem;
    height: 0.95rem;
    flex: 0 0 auto;
  }
  .floating-actions .floating-pdf { grid-column: 1; grid-row: 1; }
  .floating-actions .floating-booking { grid-column: 2; grid-row: 1; }
  .floating-actions .floating-listen { grid-column: 3; grid-row: 1; }
  .floating-actions .floating-booking {
    justify-self: stretch;
    width: 100%;
    min-width: 0;
    min-height: 2.8rem;
    padding: 0.65rem 0.4rem;
    font-size: 0.84rem;
    letter-spacing: 0.06em;
  }
  .bar { position: sticky; }
  .bar nav {
    position: absolute; top: calc(100% + 1px); right: 0; left: 0;
    display: none; flex-direction: column; gap: 0;
    padding: 0.5rem clamp(1rem, 4vw, 3rem) 1rem;
    background: rgba(8, 19, 15, 0.96); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--line); font-size: 1rem;
  }
  .bar nav.is-open { display: flex; animation: mobile-menu-in 180ms ease-out both; }
  .bar nav a {
    min-height: 2.75rem; display: flex; align-items: center;
    padding: 0.55rem 0; border-bottom: 1px solid var(--line);
  }
  .bar nav a:last-child { border-bottom: 0; }
  .bar-tools { order: 2; margin-left: auto; }
  .bar-tools button { min-width: 2.5rem; min-height: 2.75rem; }
  .menu-toggle {
    order: 3;
    margin-left: -0.7rem;
    display: grid; place-content: center; gap: 4px;
    width: 2.75rem; height: 2.75rem; padding: 0;
    color: var(--bone); background: none; border: 1px solid var(--line);
    border-radius: 50%; cursor: pointer;
  }
  .menu-toggle span {
    display: block; width: 1rem; height: 1px; background: currentColor;
    transition: transform 180ms ease, opacity 180ms ease;
  }
  .menu-toggle[aria-expanded="true"] span:first-child { transform: translateY(5px) rotate(45deg); }
  .menu-toggle[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
  .menu-toggle[aria-expanded="true"] span:last-child { transform: translateY(-5px) rotate(-45deg); }
  .hero { min-height: calc(100svh - 3.4rem); padding-bottom: 5rem; }
  .hero-genres { max-width: 30rem; margin-top: 4rem; }
  .row { padding-block: 3.5rem; }
  .row#origine { grid-template-areas: "portal" "title" "prose"; }
  .row#origine h2 { grid-area: title; margin-top: 1rem; }
  .origin-content { display: contents; }
  .origin-content .prose { grid-area: prose; }
  .origin-visual { grid-area: portal; width: min(60.2vw, 242px); }
  .bio-content { grid-template-columns: 1fr; overflow: clip; }
  .bio-photo-frame { width: min(88vw, 25rem); }
  .worlds { grid-template-columns: 1fr; }
  .book > div { grid-template-columns: 1fr; gap: 0.2rem; }
  .booking-layout { grid-template-columns: 1fr; gap: 2rem; }
  .booking-cta { justify-self: center; min-width: min(80%, 18rem); padding: 1rem 2rem; font-size: 1.1rem; }
  .hero-booking { width: 174px; min-width: 174px; }
  .booking-visual { justify-self: center; width: min(100%, 22rem); }
}

/* Zones animées hors écran : animations CSS suspendues (voir l'horloge SVG dans App.jsx) */
.is-offscreen *,
.is-offscreen *::before,
.is-offscreen *::after { animation-play-state: paused !important; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important; animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .hero-starfield span, .origin-stars span { animation: none; opacity: 0.65; }
  .origin-visual { animation: none; }
  .aurora-band, .hero-aurora::before, .hero-aurora-glow, .hero-art::before, .row h2::before, .hero-lake-glints, .origin-inscription { animation: none; }
  .aurora-band-patch { opacity: calc(var(--appear-peak) * 0.6); }
  .hero-booking, .floating-booking { animation: none; }
  .floating-actions { animation: none; }
}

@keyframes mobile-menu-in {
  from { opacity: 0; transform: translateY(-0.35rem); }
  to { opacity: 1; transform: translateY(0); }
}

/* Impression PDF */
@media print {
  @page {
    size: A4 portrait;
    margin: 10mm 12mm;
  }

  *, *::before, *::after {
    box-shadow: none !important; text-shadow: none !important; filter: none !important;
  }
  .bar, .print, .horizon, .hero-starfield, .hero-aurora, .hero-aurora-glow, .hero-lake, .event-column, .events-toggle, .booking-cta, .floating-actions { display: none !important; }
  :root {
    --night: #fff;
    --bone: #13231e;
    --muted: #41564d;
    --line: #cbd5cf;
  }
  html, body { background: #fff; }
  body {
    color: #17231e; font-size: 12pt; line-height: 1.45;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .hero {
    min-height: 0; padding: 6mm 8mm 5mm;
    color: #fff; background-position: center 56%;
    break-after: avoid; page-break-after: avoid;
  }
  .hero-content { width: 100%; }
  .hero-art { width: 15mm; margin-bottom: 1mm; }
  .hero h1 { font-size: 32pt; letter-spacing: 0.18em; color: #fff; }
  .hero-tag {
    max-width: 180mm; margin-top: 1mm; color: #fff;
    font-size: 9.5pt; letter-spacing: 0.18em;
  }
  .hero-genres {
    max-width: 220mm; margin-top: 3mm; color: #fff;
    font-size: 8.5pt; line-height: 1.55; letter-spacing: 0.07em;
  }
  .row {
    gap: 4mm; padding: 6mm 0;
    border-top: 0; border-bottom: 0;
  }
  .row h2 {
    padding-bottom: 2.5mm; border-bottom: 1px solid #81b8aa;
    color: #153b32; font-size: 21pt; text-align: left;
  }
  .row#origine {
    gap: 3mm; padding-top: 4mm; padding-bottom: 0;
    grid-template-areas: none; grid-template-columns: 1fr;
    break-inside: avoid; page-break-inside: avoid;
  }
  .row#origine .origin-content {
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(42mm, 0.55fr);
    align-items: center; gap: 9mm;
  }
  .row#origine h2 { grid-area: auto; width: 100%; text-align: left; }
  .row#origine .origin-content .prose { grid-area: auto; }
  .row#origine .origin-visual {
    grid-area: auto; justify-self: center;
    width: 100%; padding: 1.5mm; overflow: hidden;
    aspect-ratio: 0.86; border: 1px solid #9abbb0; border-radius: 4mm;
    background: #f1f6f3;
  }
  .row#origine .origin-visual::before,
  .row#origine .origin-visual::after,
  .row#origine .origin-ornaments,
  .row#origine .origin-horizon,
  .row#origine .origin-stars,
  .row#origine .origin-inscription { display: none !important; }
  .row#origine .origin-photo {
    border: 0; border-radius: 3mm; object-fit: cover;
  }
  .row#origine .origin-content .prose p + p { margin-top: 3mm; }
  .prose { max-width: none; }
  .prose p + p { margin-top: 3mm; }
  #univers, #origine, #biographie, #sons, #evenements, #labels, #booking, #contact {
    break-inside: avoid; page-break-inside: avoid;
  }
  #biographie {
    break-before: page; page-break-before: always;
    gap: 4mm; padding: 0;
    break-after: page; page-break-after: always;
  }
  #biographie h2 { margin-bottom: 1mm; }
  #biographie .bio-content {
    display: flow-root; width: 100%;
  }
  #biographie .bio-photo-frame {
    float: left; width: 70mm; max-width: 40%; aspect-ratio: 0.72;
    margin: 0 7mm 4mm 0; border: 1.5px solid #398f7d;
    border-radius: 4mm; background: #eff6f2;
  }
  #biographie .bio-photo-image {
    inset: 1.5mm; border-radius: 2.5mm;
  }
  #biographie .bio-photo {
    transform: none; border-radius: 2mm; object-position: center;
  }
  #biographie .bio-photo-ornaments { display: none; }
  #biographie .prose { display: block; max-width: none; }
  #biographie .prose p {
    margin: 0; break-inside: avoid; page-break-inside: avoid;
  }
  #biographie .prose p + p { margin-top: 3mm; }
  #sons {
    display: block;
    break-before: page; page-break-before: always;
    break-inside: auto; page-break-inside: auto;
    padding: 0;
  }
  #sons > * + * { margin-top: 5mm; }
  #sons .lead {
    max-width: none; margin: 0 0 5mm;
    font-size: 14pt; line-height: 1.3; color: #41564d;
  }
  #sons .worlds {
    grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: stretch; gap: 4mm;
  }
  #sons .world {
    padding: 4mm 3.5mm; overflow: hidden;
    border: 1px solid #b9cec5; border-top: 2mm solid #398f7d;
    border-radius: 3mm 3mm 1mm 3mm; background: #eff6f2 !important;
    break-inside: avoid; page-break-inside: avoid;
  }
  #sons .world.w1 { border-top-color: #8861a3; background: #f4eff7 !important; }
  #sons .world.w2 { border-top-color: #4d8c9a; background: #edf4f5 !important; }
  #sons .world-heading { display: block; }
  #sons .world h3 { font-size: 14pt; line-height: 1.2; }
  #sons .world-bpm {
    display: block; margin-top: 1mm; color: #41564d;
    font-size: 8.5pt; letter-spacing: 0.03em;
  }
  #sons .mood { margin: 1.5mm 0 2.5mm; font-size: 10pt; color: #41564d; }
  #sons .style + .style { margin-top: 2mm; padding-top: 1.5mm; border-color: #cbd5cf; }
  #sons .style h4 { margin-bottom: 0.5mm; font-size: 10.5pt; }
  #sons .style p { font-size: 10.5pt; line-height: 1.35; }
  #sons .world-wave { display: none; }
  #labels {
    break-before: page; page-break-before: always;
    gap: 5mm; padding: 0;
    break-inside: avoid; page-break-inside: avoid;
  }
  #labels > .prose {
    display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 7mm; width: 100%; max-width: none;
  }
  #labels .collective {
    margin: 0; padding: 4mm; border: 1px solid #cbd9d2;
    border-top: 1.5mm solid #398f7d; border-radius: 2mm;
    background: #f5f8f6;
    break-inside: avoid; page-break-inside: avoid;
  }
  #labels .collective-title {
    gap: 3mm; margin-bottom: 3mm;
    color: #153b32; font-size: 15pt;
  }
  #labels .collective-title img {
    width: 14mm; height: 14mm; padding: 1mm;
    border: 1px solid #cbd9d2; border-radius: 50%; background: #fff;
  }
  #labels .collective-title .collective-logo-screen[src*="nataraja-logo.svg"] { display: none; }
  #labels .collective-title .collective-logo-print { display: block; }
  #labels .collective-links { gap: 2mm; margin-top: 3mm; }
  #labels .links a {
    padding: 1mm 2.5mm; border-color: #9fb7ac;
    color: #153b32; font-size: 9pt;
  }
  .booking-contact-print-group {
    break-before: page; page-break-before: always;
    break-inside: avoid; page-break-inside: avoid;
  }
  #booking, #contact { gap: 3mm; padding: 2mm 0; }
  #booking { break-inside: avoid; page-break-inside: avoid; }
  #contact {
    break-inside: avoid; page-break-inside: avoid;
  }
  .booking-layout {
    grid-template-columns: minmax(0, 1fr) 50mm;
    align-items: start; gap: 8mm; width: 100%;
  }
  .booking-layout h2 { margin-bottom: 3mm; }
  .book { max-width: none; }
  .book > div {
    grid-template-columns: 25mm 1fr; gap: 4mm; padding: 2.5mm 3mm;
    border: 1px solid #d5e0da; border-radius: 1.5mm;
    background: #f5f8f6;
  }
  .book > div + div { margin-top: 1.5mm; }
  .book dt { font-size: 11pt; color: #287568; }
  .book dd { font-size: 10.5pt; }
  .booking-visual {
    justify-self: center; width: 48mm; aspect-ratio: 1;
    border-width: 1.5px; border-radius: 3mm 12mm 3mm 12mm; box-shadow: none;
  }
  #booking .bio-photo-image { inset: 1.5mm; border-radius: 2.5mm 11mm 2.5mm 11mm; }
  .bio-photo-frame::before, .bio-photo-frame::after { display: none; }
  .booking-visual-ornaments { display: none; }
  .contact .mail { font-size: 15pt; }
  .contact-print-marker { display: inline-flex; align-items: center; justify-content: center; }
  .contact-email-marker {
    width: 1.1em; height: 1.1em; margin-right: 1mm;
    border: 1.2pt solid currentColor; border-radius: 50%;
    font: 700 0.72em/1 var(--display); vertical-align: 0.08em;
  }
  .contact .links { justify-content: center; }
  .contact .contact-print-links { display: flex; }
  /* Impression : la section se réduit à une ligne, pour que Booking et Contact restent sur la même page */
  .press-screen, #presse h2, .press-intro { display: none !important; }
  #presse { display: block; padding: 3mm 0 0; text-align: center; }
  .press-print { display: block; color: #153b32; font-size: 10pt; }
  .row.press { padding-bottom: 0; }
  .site-footer { padding: 4mm 0 0; border-top: 0; color: #41564d; font-size: 8pt; }
  .contact-form { display: none !important; }
  .contact .links > li { display: grid; justify-items: center; gap: 2mm; }
  .contact .links a {
    padding: 1.5mm 3mm; border-color: #9fb7ac;
    color: #153b32; font-size: 9.5pt;
  }
  .contact .links a.link-address {
    display: block; max-width: 100%; overflow-wrap: anywhere;
    padding: 0; border: 0; border-radius: 0;
    color: #153b32; font: 700 15pt/1.35 var(--display); text-decoration: none;
  }
  .contact .links .link-screen-label { display: none; }
  .contact-soundcloud-marker {
    width: 1.25em; height: 1em; margin-right: 1mm; vertical-align: -0.08em;
  }
  .contact-soundcloud-marker svg { display: block; width: 100%; height: 100%; overflow: visible; }
  .contact-soundcloud-marker svg path:first-child { fill: #153b32; }
  .contact-soundcloud-marker svg path:last-child {
    fill: none; stroke: #fff; stroke-width: 1.2; stroke-linecap: round;
  }
  .contact .links .link-print-label {
    display: inline; font: inherit; vertical-align: baseline;
    overflow-wrap: anywhere;
    text-decoration: underline; text-decoration-color: #398f7d;
    text-underline-offset: 1mm;
  }
  .contact-print-qr {
    display: grid; justify-items: center; gap: 1mm;
    width: 35mm; margin: 1.5mm auto 0;
    break-inside: avoid; page-break-inside: avoid;
  }
  .contact-print-qr img { display: block; width: 36mm; height: 36mm; }
  .contact-print-qr figcaption {
    color: #41564d; font-size: 9.5pt; line-height: 1.2; text-align: center;
  }

  /* ——— Thème nuit du PDF : fond du site, texte clair, accents aux couleurs des aurores ——— */
  @page { size: A4 portrait; margin: 0; }
  :root {
    --night: #08130f; --bone: #efe9dc; --muted: #a9b7ae; --line: rgba(239, 233, 220, 0.14);
    --print-aurora: linear-gradient(90deg, #64ee94, #69d7af 30%, #87a5d7 58%, #a078e6 80%, #cd5ab9);
    --print-card: rgba(239, 233, 220, 0.045);
    --print-card-line: rgba(239, 233, 220, 0.12);
  }
  html, body { background: #08130f; }
  body { color: #e6e1d6; }
  main { padding: 0 12mm; }
  .hero { margin: 0 -12mm; padding: 9mm 12mm 7mm; }
  .hero::after {
    position: absolute; left: 0; right: 0; bottom: 0; height: 1mm; content: "";
    background: var(--print-aurora);
  }
  /* Animations d'apparition figées à leur état final (sinon le PDF capture un texte à moitié visible) */
  .hero *, .hero *::before, .hero *::after { animation: none !important; opacity: 1 !important; transform: none !important; }
  .hero-tag { margin-top: 2mm; color: #f3eee4; }
  .hero-genres { margin-top: 2.5mm; color: #e6e1d6; }
  .row#origine { padding-top: 7mm; }
  #biographie, #labels, #sons, .booking-contact-print-group { padding-top: 10mm !important; }
  .row h2 {
    color: #f3eee4; border-bottom: 0; padding-bottom: 2.5mm;
    background: var(--print-aurora) left bottom / 100% 0.5mm no-repeat;
  }
  .row h2::before { opacity: 1; }
  .prose p, .book dd, .style p { color: #ddd8cd; }

  /* Origine & biographie : cadres photo en liseré aurore */
  .row#origine .origin-visual,
  #biographie .bio-photo-frame,
  .booking-visual {
    border: 0.6mm solid transparent;
    background: linear-gradient(#08130f, #08130f) padding-box, linear-gradient(135deg, #64ee94, #87a5d7, #a078e6, #cd5ab9) border-box;
  }

  /* Labels */
  #labels .collective {
    border: 1px solid var(--print-card-line); border-top: 0;
    background: var(--print-aurora) top / 100% 1mm no-repeat, var(--print-card);
    padding-top: 5mm;
  }
  #labels .collective-title { color: #f3eee4; }
  #labels .collective-title img { border-color: var(--print-card-line); background: #101c18; }
  #labels .collective-title .collective-logo-screen[src*="nataraja-logo.svg"] { display: block; }
  #labels .collective-title .collective-logo-print { display: none; }
  #labels .links a, .contact .links a { border-color: rgba(143, 240, 192, 0.45); color: #c9fbe0; }

  /* Identité musicale : cartes sombres, filet de couleur par univers */
  #sons .lead, #sons .mood, #sons .world-bpm { color: #b9c4bc; }
  #sons .world {
    border: 1px solid var(--print-card-line); border-top: 1.2mm solid #64ee94;
    background: var(--print-card) !important;
  }
  #sons .world.w1 { border-top-color: #a078e6; background: rgba(160, 120, 230, 0.06) !important; }
  #sons .world.w2 { border-top-color: #69d7af; background: rgba(105, 215, 175, 0.05) !important; }
  #sons .world h3, #sons .style h4 { color: #f3eee4; }
  #sons .style + .style { border-color: var(--print-card-line); }

  /* Évènements */
  .event-group { border-color: var(--print-card-line); background: var(--print-card); }
  .event-group h3 { color: #f3eee4; }
  .event-place, .events-intro { color: #a9b7ae; }
  .event-venues li { border-color: rgba(143, 240, 192, 0.45); color: #c9fbe0; }

  /* Booking & contact */
  .book > div { border-color: var(--print-card-line); background: var(--print-card); }
  .book dt { color: #8ff0c0; }
  .contact .mail { color: #f3eee4; border-bottom-color: #cd5ab9; }
  .contact .links a.link-address { color: #f3eee4; }
  .contact .links .link-print-label { text-decoration-color: #64ee94; }
  .contact-soundcloud-marker svg path:first-child { fill: #efe9dc; }
  .contact-soundcloud-marker svg path:last-child { stroke: #08130f; }
  .contact-print-qr img { padding: 1.5mm; border-radius: 2mm; background: #fff; }
  .contact-print-qr figcaption, .press-print, .site-footer { color: #a9b7ae; }

  /* ——— Mise en page portrait : pages remplies en hauteur ——— */
  .hero { min-height: 105mm; padding-block: 14mm 10mm; background-position: center 55%; }
  .hero-art { width: 20mm; margin-bottom: 2mm; }
  .hero h1 { font-size: 44pt; }
  .hero-tag { font-size: 10.5pt; }
  .hero-genres { font-size: 9pt; line-height: 1.7; }
  .prose p { font-size: 12pt; line-height: 1.6; }
  .row#origine .origin-content { grid-template-columns: minmax(0, 1fr) 62mm; gap: 8mm; }
  /* Une section par page, texte agrandi pour remplir la hauteur du portrait */
  #biographie .bio-photo-frame { width: 72mm; margin-right: 8mm; }
  #biographie .prose p { font-size: 12.5pt; line-height: 1.65; }
  #biographie .prose p + p { margin-top: 4mm; }
  #labels > .prose { grid-template-columns: 1fr; gap: 7mm; }
  #labels .collective { padding: 7mm 8mm 8mm; }
  #labels .collective-title { font-size: 18pt; }
  #labels .collective p { font-size: 12pt; line-height: 1.6; }
  #labels .links a { font-size: 10pt; padding: 1.3mm 3.5mm; }
  /* Identité musicale : page entière, texte plus confortable */
  #sons .lead { font-size: 15pt; }
  #sons .worlds { gap: 4mm; }
  #sons .world { padding: 5mm 4mm 6mm; }
  #sons .world h3 { font-size: 15pt; }
  #sons .mood { font-size: 10.5pt; margin-bottom: 4mm; }
  #sons .style + .style { margin-top: 3.5mm; padding-top: 3mm; }
  #sons .style h4 { font-size: 11.5pt; }
  #sons .style p { font-size: 10.5pt; line-height: 1.45; }
  /* Évènements : sa propre page, cartes plus aérées */
  #evenements { break-before: page; page-break-before: always; padding-top: 10mm !important; }
  .events { grid-template-columns: 1fr; gap: 6mm; }
  .events-intro { font-size: 12pt; }
  .events { gap: 9mm; margin-top: 4mm; }
  .event-group { padding: 9mm 9mm 10mm; }
  .event-group h3 { font-size: 22pt; }
  .event-place { font-size: 9.5pt; margin-top: 1mm; }
  .event-venues { gap: 2.5mm; margin-top: 5mm; }
  .event-venues li { font-size: 12pt; padding: 1.8mm 4.5mm; }
  /* Booking & contact : tableau pleine largeur, visuel au-dessus */
  .booking-layout { grid-template-columns: minmax(0, 1fr) 46mm; }
  .book dd { font-size: 10.5pt; }
  #contact { padding-top: 8mm; }

  /* ——— Tailles de texte maximales : chaque section remplit sa page sans déborder ——— */
  #origine .prose p { font-size: 14pt; line-height: 1.55; }
  #biographie .prose p { font-size: 16pt; line-height: 1.6; }
  #labels .collective p { font-size: 13.5pt; line-height: 1.55; }
  #labels .collective-title { font-size: 20pt; }
  #sons .lead { font-size: 16pt; }
  #sons .world h3 { font-size: 16pt; }
  #sons .world-bpm { font-size: 9.5pt; }
  #sons .mood { font-size: 11.5pt; }
  #sons .style h4 { font-size: 12.5pt; }
  #sons .style p { font-size: 11.5pt; line-height: 1.45; }
  .events-intro { font-size: 15pt; }
  .events { gap: 12mm; }
  .event-group { padding: 11mm 10mm 12mm; }
  .event-group h3 { font-size: 30pt; }
  .event-place { font-size: 12pt; }
  .event-venues { gap: 3mm; margin-top: 6mm; }
  .event-venues li { font-size: 16pt; padding: 2.4mm 5.5mm; }
  .book dt { font-size: 14pt; }
  .book dd { font-size: 14pt; line-height: 1.45; }
  .book > div { padding: 3.5mm 4mm; }
  .contact .mail { font-size: 18pt; }
  .contact .links a.link-address { font-size: 17pt; }
  .contact-print-qr { width: 50mm; }
  .contact-print-qr img { width: 50mm; height: 50mm; }
  .contact-print-qr figcaption { font-size: 11pt; }
  .press-print { font-size: 11pt; }
  .site-footer { font-size: 9.5pt; }

  /* ——— Liens des labels en clair dans le PDF : pictogramme + nom + adresse ——— */
  #labels .collective-links { display: grid; gap: 1.6mm; margin-top: 4mm; }
  #labels .collective-links a {
    display: grid; grid-template-columns: 7.5mm 28mm 1fr; align-items: center; gap: 2.5mm;
    padding: 0; border: 0; border-radius: 0; background: none;
    color: #e6e1d6; font-size: 11pt; text-decoration: none;
  }
  #labels .collective-links .link-icon {
    display: block; width: 7.5mm; height: 7.5mm; padding: 1.4mm; box-sizing: border-box;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(100, 238, 148, 0.28), rgba(160, 120, 230, 0.28));
    fill: #c9fbe0;
  }
  #labels .collective-links .link-icon-site path,
  #labels .collective-links .link-icon-artistes path { fill: #c9fbe0; }
  #labels .collective-links .link-icon-site path { fill: none; stroke: #c9fbe0; stroke-width: 1.6; }
  #labels .collective-links .link-icon-instagram path { fill: #c9fbe0; fill-rule: evenodd; }
  #labels .collective-links .link-name { font: 700 10.5pt var(--display); color: #f3eee4; }
  #labels .collective-links .link-url { display: block; color: #c9fbe0; overflow-wrap: anywhere; }

  /* Contact : QR code aéré pour que le contenu occupe toute la hauteur de la dernière page */
  .contact-print-qr { margin: 9mm auto 0; gap: 2.5mm; }
  #presse { padding-top: 9mm; }
  .site-footer { padding-top: 5mm; }

  /* Pas de lien vers le dossier presse dans le PDF ; QR code un peu plus grand pour occuper la page */
  #presse { display: none !important; }
  .contact-print-qr { width: 58mm; margin-top: 11mm; }
  .contact-print-qr img { width: 58mm; height: 58mm; }
  .contact-print-qr figcaption { font-size: 12pt; }
  .site-footer { padding-top: 10mm; }

  /* Dernière page : le bloc Booking + Contact occupe toute la hauteur de la page,
     le copyright se pose tout en bas, sur le fond nuit */
  .booking-contact-print-group {
    display: flex; flex-direction: column; box-sizing: border-box;
    height: 283mm; break-after: avoid; page-break-after: avoid;
  }
  .booking-contact-print-group #contact { flex: 1; display: flex; flex-direction: column; }
  .booking-contact-print-group #contact > div { flex: 1; display: flex; flex-direction: column; align-items: center; }
  .contact-print-qr { margin-block: auto; }
  .site-footer { height: 14mm; padding: 0 !important; display: grid; place-items: center; }

  /* Évènements : chaque région illustrée par ses affiches */
  .events { gap: 6mm; margin-top: 3mm; }
  .event-group {
    display: grid; grid-template-columns: minmax(0, 1fr) auto; column-gap: 6mm;
    align-items: center; padding: 7mm 7mm 7mm 8mm;
  }
  .event-group > :not(.event-group-images) { grid-column: 1; }
  .event-group h3 { font-size: 24pt; }
  .event-venues li { font-size: 13pt; padding: 1.8mm 4.5mm; }
  .event-group-images {
    display: flex; gap: 3mm; grid-column: 2; grid-row: 1 / span 3;
  }
  .event-group-images img {
    display: block; width: 31mm; height: 48mm; object-fit: cover;
    border-radius: 2mm; border: 0.4mm solid rgba(160, 120, 230, 0.6);
  }

  /* Identité musicale : Chill compte 6 styles, texte resserré pour tenir sur la page */
  #sons .style p { font-size: 10.8pt; line-height: 1.4; }
  #sons .style + .style { margin-top: 2.6mm; padding-top: 2.2mm; }
}
`;

export default GlobalStyle;
