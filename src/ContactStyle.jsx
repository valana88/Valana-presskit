import { createGlobalStyle } from "styled-components";

const ContactStyle = createGlobalStyle`
  :root {
    color-scheme: dark;
    font-family: Arial, Helvetica, sans-serif;
    background: #08130f;
    color: #efe9dc;
  }

  * { box-sizing: border-box; }

  body {
    position: relative;
    isolation: isolate;
    min-height: 100svh;
    margin: 0;
    display: grid;
    place-items: center;
    padding: 24px;
    overflow-x: hidden;
    background: #08130f;
  }

  .contact-scene {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    background:
      linear-gradient(180deg, rgba(8, 19, 15, 0.28), rgba(8, 19, 15, 0.12) 48%, rgba(8, 19, 15, 0.62)),
      var(--contact-background-image) center / cover no-repeat;
  }

  /* Aurores limitées au ciel par le même masque que le press kit, cadré comme le fond */
  .contact-aurora {
    position: absolute;
    inset: 0;
    overflow: hidden;
    mix-blend-mode: screen;
    mask-image: linear-gradient(to bottom, transparent 0%, #000 11%), var(--contact-sky-mask);
    mask-size: 100% 100%, cover;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-composite: intersect;
  }

  .contact-starfield {
    position: absolute;
    inset: 0 0 48%;
    pointer-events: none;
  }

  .contact-starfield span {
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: radial-gradient(circle, #fff 0 28%, rgba(211, 240, 255, 0.94) 52%, transparent 80%);
    opacity: 0.58;
    box-shadow: 0 0 5px 1px rgba(201, 235, 255, 0.78), 0 0 11px 2px rgba(136, 194, 255, 0.3);
    animation: contact-star-twinkle var(--star-duration) ease-in-out var(--star-delay) infinite both;
  }

  .contact-starfield .contact-star-cross::before,
  .contact-starfield .contact-star-cross::after {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    border-radius: 50%;
    content: "";
    background: linear-gradient(90deg, transparent, rgba(229, 247, 255, 0.92), transparent);
    filter: drop-shadow(0 0 4px rgba(201, 235, 255, 0.8));
  }

  .contact-starfield .contact-star-cross::before {
    width: 13px;
    height: 1px;
    transform: translate(-50%, -50%);
  }

  .contact-starfield .contact-star-cross::after {
    width: 1px;
    height: 13px;
    transform: translate(-50%, -50%);
  }

  @keyframes contact-star-twinkle {
    0%, 100% {
      opacity: 0.5;
      transform: scale(0.5);
    }
    50% {
      opacity: 0.85;
      transform: scale(1);
    }
  }

  main {
    position: relative;
    z-index: 1;
    isolation: isolate;
    width: min(100%, 520px);
    padding: clamp(28px, 7vw, 52px);
    border: 3px solid transparent;
    border-radius: 8px 36px;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.3);
    text-align: center;
  }

  /* Cadre aux couleurs des aurores (vert → turquoise → bleu-violet → violet → magenta) */
  main::after {
    position: absolute;
    inset: -3px;
    z-index: -1;
    border: 3px solid transparent;
    border-radius: inherit;
    content: "";
    background:
      linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)) padding-box,
      linear-gradient(135deg, #d6ffe2 0%, #64ee94 18%, #69d7af 34%, #87a5d7 52%, #a078e6 70%, #cd5ab9 86%, #ecd2ff 100%) border-box;
  }

  /* Halo qui tournoie derrière le cadre : un disque au dégradé conique tourne (transformation
     animée par la carte graphique) dans un cadre arrondi flouté */
  .frame-halo {
    position: absolute;
    inset: -10px;
    z-index: -2;
    overflow: hidden;
    border-radius: 16px 46px;
    filter: blur(17px);
    opacity: 0.8;
    pointer-events: none;
  }
  .frame-halo span {
    position: absolute;
    top: 50%; left: 50%;
    width: 180%; aspect-ratio: 1;
    border-radius: 50%;
    background: conic-gradient(
      rgb(120, 255, 170), rgba(105, 230, 190, 0.35) 16%, transparent 30%,
      rgb(175, 130, 250) 50%, rgba(220, 100, 200, 0.4) 66%, transparent 80%,
      rgb(120, 255, 170)
    );
    transform: translate(-50%, -50%);
    will-change: transform;
    animation: contact-halo-spin 10s linear infinite;
  }

  @keyframes contact-halo-spin {
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  .mark {
    margin: 0;
    color: #efe9dc;
    font-family: "Julius Sans One", Arial, Helvetica, sans-serif;
    font-size: clamp(2.5rem, 12vw, 4.5rem);
    font-weight: 300;
    letter-spacing: 0.22em;
    line-height: 1;
    padding-left: 0.22em;
  }

  .intro { margin: 16px 0 32px; color: #a9b7ae; line-height: 1.6; }
  nav { display: grid; gap: 14px; }

  a {
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 15px 20px;
    border: 1px solid #3fd0c0;
    border-radius: 999px;
    color: #efe9dc;
    font-size: 1.05rem;
    font-weight: 700;
    text-decoration: none;
    transition:
      background-color 480ms cubic-bezier(0.22, 0.61, 0.36, 1),
      border-color 480ms cubic-bezier(0.22, 0.61, 0.36, 1),
      box-shadow 480ms cubic-bezier(0.22, 0.61, 0.36, 1),
      scale 480ms cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  a:hover, a:focus-visible {
    scale: 1.05;
    background: rgba(63, 208, 192, 0.14);
    border-color: rgba(140, 240, 222, 0.85);
    box-shadow: 0 0 1.4rem rgba(63, 208, 192, 0.3);
  }

  a:focus-visible { outline: 3px solid #3fd0c0; outline-offset: 4px; }
  .soundcloud-logo { width: 26px; height: 20px; fill: currentColor; }

  .soundcloud-wave {
    fill: none;
    stroke: #08130f;
    stroke-width: 1.2;
    stroke-linecap: round;
  }

  footer { margin-top: 28px; color: #a9b7ae; font-size: 0.8rem; }

  /* Logo, boutons au style du press kit (Syne, liseré aurore) et lien vers le site */
  .emblem {
    display: block; width: 72px; height: 72px; margin: 0 auto 18px;
    opacity: 0.92;
    filter: drop-shadow(0 0 6px rgba(215, 232, 255, 0.35)) drop-shadow(0 0 16px rgba(170, 200, 255, 0.18));
  }
  nav a {
    border: 1px solid transparent;
    background:
      linear-gradient(rgba(8, 19, 15, 0.92), rgba(8, 19, 15, 0.92)) padding-box,
      linear-gradient(rgba(8, 19, 15, 0.45), rgba(8, 19, 15, 0.45)) border-box,
      linear-gradient(100deg, #64ee94, #69d7af 30%, #87a5d7 58%, #a078e6 80%, #cd5ab9) border-box;
    font: 700 1.02rem/1.2 "Syne", Arial, sans-serif; letter-spacing: 0.06em;
  }
  nav a.primary {
    background:
      linear-gradient(rgba(8, 19, 15, 0.92), rgba(8, 19, 15, 0.92)) padding-box,
      linear-gradient(100deg, #64ee94, #69d7af 30%, #87a5d7 58%, #a078e6 80%, #cd5ab9) border-box;
    box-shadow: 0 0 1.1rem rgba(100, 238, 148, 0.16), 0 0 1.6rem rgba(160, 120, 230, 0.14);
  }
  nav a:hover, nav a:focus-visible {
    background:
      linear-gradient(rgba(16, 38, 34, 0.95), rgba(16, 38, 34, 0.95)) padding-box,
      linear-gradient(100deg, #64ee94, #69d7af 30%, #87a5d7 58%, #a078e6 80%, #cd5ab9) border-box;
    box-shadow: 0 0 1.1rem rgba(100, 238, 148, 0.2), 0 0 1.6rem rgba(160, 120, 230, 0.16);
  }
  a.site-link {
    display: inline-block; min-height: 0; margin-top: 22px; padding: 6px 4px;
    border: 0; border-radius: 0; background: none;
    color: #a9b7ae; font: 700 0.85rem "Syne", Arial, sans-serif; letter-spacing: 0.06em;
    text-decoration: underline; text-underline-offset: 0.3em; text-decoration-color: rgba(160, 120, 230, 0.6);
  }
  a.site-link:hover, a.site-link:focus-visible { scale: 1; background: none; box-shadow: none; color: #efe9dc; }

  /* Mobile : page scannée depuis un téléphone — carte pleine largeur, gros boutons au pouce */
  @media (max-width: 560px) {
    body {
      padding:
        max(20px, env(safe-area-inset-top)) 16px
        max(20px, env(safe-area-inset-bottom));
    }
    main { width: 100%; padding: 34px 22px 26px; border-radius: 8px 30px; }
    .emblem { width: 64px; height: 64px; margin-bottom: 14px; }
    .mark { font-size: clamp(2.3rem, 13vw, 3.2rem); }
    .intro { margin: 12px 0 26px; font-size: 0.95rem; }
    nav { gap: 12px; }
    nav a { min-height: 58px; padding-inline: 14px; font-size: 0.95rem; letter-spacing: 0.03em; white-space: nowrap; }
  }
  /* Très petits écrans (iPhone SE…) : le libellé SoundCloud tient toujours sur une ligne */
  @media (max-width: 350px) {
    main { padding-inline: 16px; }
    nav a { gap: 8px; padding-inline: 10px; font-size: 0.86rem; letter-spacing: 0.02em; }
    .soundcloud-logo { width: 22px; height: 17px; }
    .intro { font-size: 0.88rem; }
  }

  @media (max-width: 800px) {
    .contact-starfield span:nth-child(n + 10) { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
    .contact-starfield span {
      animation: none;
      opacity: 0.65;
    }
    .frame-halo span { animation: none; }
  }
`;

export default ContactStyle;
