import { createGlobalStyle } from "styled-components";

const AuroraStyle = createGlobalStyle`
  /* Rideaux d'aurore (composant AuroraBand), partagés par le press kit et la page contact */
  .aurora-filter-defs { position: absolute; width: 0; height: 0; overflow: hidden; }
  .aurora-band {
    position: absolute;
    top: 0; left: -6%;
    width: 112%; height: 78%;
    transform-origin: 50% 80%;
    will-change: transform, opacity;
  }
  /* Trois formes du rideau en fondu enchaîné : seule l'opacité change (animée par le GPU) */
  .aurora-frame {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: fill; pointer-events: none; user-select: none;
    opacity: 0;
    animation: aurora-morph var(--morph-duration) ease-in-out infinite;
  }
  .aurora-frame-0 { animation-delay: 0s; }
  .aurora-frame-1 { animation-delay: calc(var(--morph-duration) / -3 * 2); }
  .aurora-frame-2 { animation-delay: calc(var(--morph-duration) / -3); }
  @keyframes aurora-morph {
    0%, 100% { opacity: 1; }
    33.3% { opacity: 0; }
    66.6% { opacity: 0; }
  }
  /* Rideaux dispersés : chacun occupe une portion du ciel, s'estompe sur les côtés
     et apparaît puis s'éteint à son propre rythme */
  .aurora-band-patch {
    top: var(--band-top); left: var(--band-left);
    width: var(--band-width); height: var(--band-height);
    opacity: 0;
    animation: aurora-appear var(--appear-duration) ease-in-out var(--appear-delay) infinite;
  }
  @keyframes aurora-appear {
    0% { opacity: 0; }
    22% { opacity: var(--appear-peak); }
    42% { opacity: calc(var(--appear-peak) * 0.6); }
    60% { opacity: calc(var(--appear-peak) * 0.9); }
    82%, 100% { opacity: 0; }
  }
  .aurora-band-main {
    opacity: 0.72;
    animation: aurora-breathe-main 11s ease-in-out infinite alternate;
  }
  .aurora-band-far {
    opacity: 0.38;
    animation: aurora-breathe-far 15s ease-in-out infinite alternate;
  }
  @keyframes aurora-breathe-main {
    from { transform: scaleY(0.95) skewX(-2deg); opacity: 0.62; }
    50% { opacity: 0.8; }
    to { transform: scaleY(1.05) skewX(2deg); opacity: 0.7; }
  }
  @keyframes aurora-breathe-far {
    from { transform: scaleY(1.04) skewX(1.5deg); opacity: 0.3; }
    to { transform: scaleY(0.96) skewX(-1.5deg); opacity: 0.45; }
  }
  @media (max-width: 800px) {
    .aurora-band-main, .aurora-band-far { left: -70%; width: 240%; }
    .aurora-band-patch { left: calc(var(--band-left) * 2.4 - 70%); width: calc(var(--band-width) * 2.4); }
  }
  @media (prefers-reduced-motion: reduce) {
    .aurora-band, .aurora-frame { animation: none; }
    .aurora-frame-0 { opacity: 1; }
    .aurora-band-patch { opacity: calc(var(--appear-peak) * 0.6); }
  }
`;

export default AuroraStyle;
