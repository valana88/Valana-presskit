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
.bar nav a { text-decoration: none; color: var(--muted); transition: color 180ms ease; }
.bar nav a:hover { color: var(--bone); }
.menu-toggle { display: none; }
.bar-tools { display: flex; gap: 0.3rem; }
.bar-tools button {
  font: 700 0.8rem var(--display); color: var(--muted);
  background: none; border: 1px solid var(--line); border-radius: 99px;
  min-height: 2.4rem; padding: 0.25rem 0.7rem; cursor: pointer;
  transition: color 180ms ease, background-color 180ms ease, border-color 180ms ease;
}
.bar-tools button.on { color: var(--night); background: var(--bone); border-color: var(--bone); }

/* Hero */
.hero {
  position: relative; overflow: hidden;
  min-height: calc(100vh - 3.4rem);
  display: flex; align-items: center; justify-content: center;
  padding: 3rem clamp(1rem, 4vw, 3rem) 6rem;
  background:
    linear-gradient(180deg, rgba(8, 19, 15, 0.34), rgba(8, 19, 15, 0.12) 48%, rgba(8, 19, 15, 0.62)),
    var(--hero-background-image) center / cover no-repeat;
}
.hero-starfield {
  position: absolute; inset: 0 0 48%; z-index: 0;
  overflow: hidden; pointer-events: none;
}
.hero-starfield span {
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
.hero-starfield .hero-star-cross::after {
  position: absolute; top: 50%; left: 50%;
  display: block; border-radius: 50%; content: "";
  background: linear-gradient(90deg, transparent, rgba(229, 247, 255, 0.92), transparent);
  filter: drop-shadow(0 0 4px rgba(201, 235, 255, 0.8));
}
.hero-starfield .hero-star-cross::before {
  width: 13px; height: 1px; transform: translate(-50%, -50%);
}
.hero-starfield .hero-star-cross::after {
  width: 1px; height: 13px; transform: translate(-50%, -50%);
}
@keyframes star-twinkle {
  0%, 100% {
    opacity: 0.48; transform: scale(0.9);
    box-shadow: 0 0 4px 1px rgba(201, 235, 255, 0.58), 0 0 8px 1.5px rgba(136, 194, 255, 0.2);
  }
  50% {
    opacity: 0.9; transform: scale(1.22);
    box-shadow: 0 0 7px 1.5px rgba(221, 243, 255, 0.86), 0 0 15px 3.5px rgba(136, 194, 255, 0.4);
  }
}
.hero-content {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: center;
  width: min(100%, 60rem); text-align: center;
}
.hero h1 {
  font: 400 clamp(3.2rem, 10vw, 7.5rem)/0.95 "Julius Sans One", var(--display);
  letter-spacing: 0.2em; padding-left: 0.2em;
  color: var(--bone); text-shadow: 0 2px 24px rgba(8, 19, 15, 0.75);
  animation:
    rise 1.6s cubic-bezier(.2,.7,.2,1) both,
    cosmic-title-shimmer 7s ease-in-out 1.6s infinite;
}
@keyframes cosmic-title-shimmer {
  0%, 68%, 100% { text-shadow: 0 2px 24px rgba(8, 19, 15, 0.75), 0 0 10px rgba(136, 194, 255, 0.12); }
  74%, 80% { text-shadow: 0 2px 24px rgba(8, 19, 15, 0.75), 0 0 9px rgba(229, 247, 255, 0.42), 0 0 24px rgba(136, 194, 255, 0.3); }
}
.hero-tag {
  margin-top: 1rem; font: 600 clamp(0.7rem, 1.5vw, 0.95rem)/1.5 var(--display);
  letter-spacing: 0.34em; text-transform: uppercase; color: var(--bone);
  text-shadow: 0 2px 12px rgba(8, 19, 15, 0.85);
  animation: rise 1.6s 0.25s cubic-bezier(.2,.7,.2,1) both;
}
.hero-booking { margin-top: 1.5rem; }
.floating-booking {
  position: fixed; left: 50%; transform: translateX(-50%);
  bottom: max(1rem, env(safe-area-inset-bottom)); z-index: 9; margin: 0;
  animation: floating-booking-in 180ms ease-out both;
}
.floating-booking:hover { transform: translate(-50%, -2px); }
@keyframes floating-booking-in {
  from { opacity: 0; transform: translate(-50%, 0.5rem); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
.hero-loc { margin-top: 0.6rem; color: var(--muted); }
.hero-art {
  display: grid; place-items: center; margin-bottom: 1.25rem;
  width: clamp(5.4rem, 10.8vw, 8.37rem); aspect-ratio: 1;
  overflow: hidden; border-radius: 50%;
}
.hero-art img {
  display: block; width: 100%; height: 100%; object-fit: cover;
  transform: scale(1.33);
}
.hero-genres {
  margin-top: clamp(3.5rem, 10vh, 6.5rem);
  max-width: 48rem; color: rgba(239, 233, 220, 0.9);
  font: 600 clamp(0.58rem, 1.2vw, 0.78rem)/2 var(--display);
  letter-spacing: 0.12em; text-transform: uppercase;
  text-shadow: 0 2px 12px rgba(8, 19, 15, 0.9);
}
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
  background:
    repeating-conic-gradient(from 0deg, rgba(220, 235, 229, 0.82) 0deg 0.2deg, transparent 0.2deg 44.5deg, rgba(3, 13, 24, 0.96) 44.5deg 45deg),
    conic-gradient(from 0deg, #d5dfd9 0deg 2deg, #344b52 2deg 5deg, #0c2631 5deg 17deg, #31616a 17deg 20deg, #18263e 20deg 35deg, #57436f 35deg 39deg, #172c38 39deg 42deg, #b5c5bd 42deg 45deg, #344b52 45deg 47deg, #0c2631 47deg 60deg, #31616a 60deg 63deg, #18263e 63deg 80deg, #57436f 80deg 84deg, #172c38 84deg 87deg, #d5dfd9 87deg 90deg);
  box-shadow: 0 0 1.5rem rgba(63, 208, 192, 0.22), 0 1.5rem 4rem rgba(0, 0, 0, 0.5), inset 0 0 0 0.18rem rgba(6, 18, 24, 0.9), inset 0 0 0 0.34rem rgba(193, 215, 207, 0.54), inset 0 0 0.7rem 0.4rem rgba(4, 15, 21, 0.82);
}
.origin-visual::before {
  content: ""; position: absolute; z-index: -1; inset: -0.75rem;
  border: 1px solid rgba(63, 208, 192, 0.64); border-radius: 50%;
  box-shadow: 0 0 1.2rem rgba(63, 208, 192, 0.2), inset 0 0 0.6rem rgba(63, 208, 192, 0.14), 0 0 0 0.2rem rgba(7, 25, 32, 0.9), 0 0 0 0.26rem rgba(174, 196, 189, 0.7);
}
.origin-photo {
  display: block; width: 100%; height: 100%; object-fit: cover;
  border: 2px solid rgba(5, 18, 22, 0.9); border-radius: 50%;
}
.bio-content {
  display: grid; grid-template-columns: minmax(20rem, 1fr) minmax(0, 1.5fr);
  align-items: center; gap: clamp(2rem, 5vw, 5rem);
  width: min(100%, 70rem); margin-inline: auto;
}
.bio-photo-frame {
  position: relative; isolation: isolate;
  width: min(100%, 25rem); aspect-ratio: 0.72;
  justify-self: center;
  border: 5px solid transparent;
  border-radius: 1rem 4rem 1rem 4rem;
  --photo-frame-gradient: linear-gradient(135deg, #d5fff8 0%, #55e5d1 24%, #167d82 60%, #4acdbd 82%, #b8fff3 100%);
  background:
    linear-gradient(var(--night), var(--night)) padding-box,
    var(--photo-frame-gradient) border-box;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.36), 0 0 1.2rem rgba(63, 208, 192, 0.16);
}
.bio-photo-frame::before {
  position: absolute; z-index: -1; inset: -0.55rem;
  border: 1px solid rgba(63, 208, 192, 0.48);
  border-radius: 1.2rem 4.2rem 1.2rem 4.2rem;
  content: ""; pointer-events: none;
}
.bio-photo-frame::after {
  position: absolute; z-index: 3; top: 0.55rem; right: 2rem;
  width: 2.5rem; height: 2px; border-radius: 99px;
  background: linear-gradient(90deg, rgba(63, 208, 192, 0.4), #c1fff2);
  box-shadow: 0 0 0.65rem rgba(63, 208, 192, 0.55);
  content: ""; pointer-events: none;
}
.bio-photo-image {
  position: absolute; inset: 5px; overflow: hidden;
  border-radius: 0.78rem 3.68rem 0.78rem 3.68rem;
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
.bio-wave-main {
  stroke: #3fd0c0; stroke-width: 2.4; vector-effect: non-scaling-stroke;
  filter: drop-shadow(0 0 5px rgba(63, 208, 192, 0.8));
}
.bio-wave-echo {
  stroke: rgba(63, 208, 192, 0.38); stroke-width: 1;
  vector-effect: non-scaling-stroke;
}
.bio-wave-glint {
  stroke: #c1fff2; stroke-width: 0.9; opacity: 0.82;
  vector-effect: non-scaling-stroke;
}
.bio-wave-node { fill: #c1fff2; stroke: var(--turq); stroke-width: 1; }
.bio-wave-node-soft { opacity: 0.72; }
.bio-content .prose { width: 100%; }
.origin-ornaments {
  position: absolute; z-index: 1; inset: -1rem; width: calc(100% + 2rem); height: calc(100% + 2rem);
  overflow: visible; pointer-events: none;
}
.ornament-bezel, .ornament-orbit, .ornament-guide, .ornament-sigil, .ornament-star, .ornament-tooth {
  fill: none; vector-effect: non-scaling-stroke;
}
.ornament-bezel { stroke: url(#portal-metal-gradient); stroke-width: 4; }
.ornament-orbit { stroke: rgba(63, 208, 192, 0.7); stroke-width: 0.8; stroke-dasharray: 1 4; }
.ornament-guide { stroke: rgba(195, 217, 209, 0.62); stroke-width: 0.9; stroke-dasharray: 16 3 1 3; }
.ornament-tick { fill: none; stroke: rgba(239, 233, 220, 0.55); stroke-width: 0.65; vector-effect: non-scaling-stroke; }
.ornament-tick-major { stroke: var(--turq); stroke-width: 1; }
.ornament-tooth { fill: url(#portal-metal-gradient); stroke: #d4eee4; stroke-width: 1.1; }
.ornament-tooth path + path { fill: var(--turq); stroke: none; }
.ornament-tooth path:last-child { fill: none; stroke: rgba(229, 242, 233, 0.8); stroke-width: 1; }
.ornament-tooth-orange { fill: url(#portal-orange-gradient); stroke: #ffd294; }
.ornament-tooth-orange path + path { fill: #f36b2d; }
.ornament-tooth-orange path:last-child { fill: none; stroke: rgba(255, 220, 185, 0.9); }
.ornament-inscription {
  fill: rgba(239, 233, 220, 0.81); font: 500 15px/1 system-ui, sans-serif;
  letter-spacing: 1px; text-anchor: start;
  transform-box: view-box; transform-origin: center;
  animation: inscription-rotation 90s linear infinite;
}
@keyframes inscription-rotation { to { transform: rotate(360deg); } }
.ornament-sigil { stroke: #b9efdf; stroke-width: 1.2; }
.ornament-sigil circle { fill: var(--turq); stroke: var(--bone); stroke-width: 0.8; }
.ornament-star { stroke: rgba(239, 233, 220, 0.78); stroke-width: 0.8; }
.ornament-star circle { fill: var(--turq); stroke: none; }
.origin-visual::after {
  content: ""; position: absolute; top: 0.08rem; left: 50%;
  width: 1.35rem; height: 1.65rem; transform: translateX(-50%);
  clip-path: polygon(50% 0, 100% 42%, 50% 100%, 0 42%);
  background: linear-gradient(180deg, #e6ffed, var(--turq) 52%, #277e81);
  filter: drop-shadow(0 0 0.45rem var(--turq));
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
  0%, 100% { transform: scaleY(0.72); opacity: 0.62; }
  50% { transform: scaleY(1); opacity: 1; }
}
.world-wave-line {
  fill: none; stroke: rgba(63, 208, 192, 0.85); stroke-width: 1.5;
  vector-effect: non-scaling-stroke;
}
.world-wave-line-back { stroke: rgba(239, 233, 220, 0.42); stroke-width: 1; }

/* Booking */
.booking-layout {
  display: grid; grid-template-columns: minmax(0, 1fr) auto;
  align-items: center; gap: clamp(2rem, 6vw, 6rem);
  width: min(100%, 70rem); margin-inline: auto;
}
.booking-layout h2 { margin-bottom: 2rem; text-align: left; }
.booking-cta {
  display: grid; gap: 0.15rem; justify-items: center;
  padding: 0.7rem 1.4rem; border: 1px solid var(--turq); border-radius: 99px;
  background: rgba(8, 19, 15, 0.9); text-decoration: none;
  font: 700 0.9rem/1.4 var(--display); letter-spacing: 0.08em;
  color: var(--bone); box-shadow: 0 0 1.2rem rgba(63, 208, 192, 0.18);
  transition: transform 180ms ease, background-color 180ms ease, color 180ms ease;
}
.booking-cta span + span { font: 400 0.72rem/1.4 var(--body); letter-spacing: 0; }
.booking-cta:hover { transform: translateY(-2px); background: var(--bone); color: var(--night); }
.floating-booking.booking-cta:hover { transform: translate(-50%, -2px); }
.book { max-width: 64ch; margin-inline: auto; width: 100%; }
.book > div { display: grid; grid-template-columns: 8rem 1fr; gap: 1.5rem; padding: 1.1rem 0; border-bottom: 1px solid var(--line); }
.book dt { font: 700 1rem var(--display); color: var(--turq); }
.book dd { margin: 0; }
.booking-visual {
  justify-self: end; aspect-ratio: 1;
  border-width: 5px; border-radius: 1.2rem 4.4rem 1.2rem 4.4rem;
  --photo-frame-gradient: linear-gradient(135deg, #d5fff8 0%, #55e5d1 20%, #167d82 48%, #6b3fa0 74%, #4acdbd 88%, #b8fff3 100%);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.4), 0 0 1.5rem rgba(63, 208, 192, 0.16);
}
.booking-visual::before { inset: -0.65rem; border-radius: 1.5rem 4.7rem 1.5rem 4.7rem; }
.booking-visual .bio-photo-image { inset: 5px; border-radius: 0.95rem 4rem 0.95rem 4rem; }
.booking-visual img {
  display: block; width: 100%; height: 100%; object-fit: cover;
}
.booking-visual-ornaments {
  position: absolute; z-index: 2; right: -7%; bottom: -7%;
  width: 70%; height: 70%; overflow: visible; pointer-events: none;
}

/* Contact */
.mail { font: 700 clamp(1.2rem, 3vw, 2rem) var(--display); text-decoration: none; border-bottom: 2px solid var(--magenta); }
.contact .mail { font-size: clamp(1rem, 2.2vw, 1.25rem); }
.contact > div { text-align: center; }
.links { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 2rem; }
.contact .links { justify-content: center; }
.links a {
  display: inline-block; padding: 0.4rem 1rem; border: 1px solid var(--line);
  border-radius: 99px; text-decoration: none; font-family: var(--display); font-size: 0.9rem;
  transition: border-color 180ms ease, background-color 180ms ease, color 180ms ease;
}
.link-screen-label { display: inline-flex; align-items: center; gap: 0.45rem; }
.soundcloud-logo { width: 1.25rem; height: 1rem; fill: #fff; }
.soundcloud-wave {
  fill: none; stroke: var(--night); stroke-width: 1; stroke-linecap: round;
}
.link-print-label { display: none; }
.contact-print-marker { display: none; }
.links a:hover { border-color: var(--bone); background: var(--bone); color: var(--night); }
.contact-print-qr { display: none; }
.print { margin: 2.5rem auto 0; display: block; font: 600 0.9rem var(--display); color: var(--muted); background: none; border: 0; cursor: pointer; text-decoration: underline; }

footer { padding: 2.5rem clamp(1rem, 4vw, 3rem); color: var(--muted); border-top: 1px solid var(--line); font-size: 0.95rem; }

@media (min-width: 801px) {
  .booking-layout { grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.65fr); }
  .booking-cta {
    justify-self: center; width: min(100%, 18rem);
    padding: 1rem 2rem; font-size: 1.1rem;
  }
  .contact .mail { font-size: 20px; }
}

@media (min-width: 801px) and (max-width: 1000px) {
  .worlds { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

/* Mobile */
@media (max-width: 800px) {
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
  .booking-visual { justify-self: center; width: min(100%, 22rem); }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important; animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .hero-starfield span { animation: none; opacity: 0.65; }
}

@keyframes mobile-menu-in {
  from { opacity: 0; transform: translateY(-0.35rem); }
  to { opacity: 1; transform: translateY(0); }
}

/* Impression PDF */
@media print {
  @page {
    size: A4 landscape;
    margin: 10mm 12mm;
  }

  *, *::before, *::after {
    box-shadow: none !important; text-shadow: none !important; filter: none !important;
  }
  .bar, .print, .horizon, .hero-starfield, .booking-cta, .floating-booking { display: none !important; }
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
  .row#origine .origin-ornaments { display: none !important; }
  .row#origine .origin-photo {
    border: 0; border-radius: 3mm; object-fit: cover;
  }
  .row#origine .origin-content .prose p + p { margin-top: 3mm; }
  .prose { max-width: none; }
  .prose p + p { margin-top: 3mm; }
  #univers, #origine, #biographie, #sons, #labels, #booking, #contact {
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
    break-before: page; page-break-before: always;
    gap: 5mm; padding: 0;
    break-inside: avoid; page-break-inside: avoid;
  }
  #sons .lead {
    max-width: none; margin: 0 0 5mm;
    font-size: 14pt; line-height: 1.3; color: #41564d;
  }
  #sons .worlds {
    grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: stretch; gap: 4mm;
  }
  #sons .world {
    padding: 5mm 4mm; overflow: hidden;
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
  #sons .mood { margin: 1.5mm 0 3mm; font-size: 10.5pt; color: #41564d; }
  #sons .style + .style { margin-top: 2.5mm; padding-top: 2mm; border-color: #cbd5cf; }
  #sons .style h4 { margin-bottom: 0.5mm; font-size: 11.5pt; }
  #sons .style p { font-size: 11.5pt; line-height: 1.4; }
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
}

`;

export default GlobalStyle;
