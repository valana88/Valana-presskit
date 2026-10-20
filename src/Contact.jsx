import { useEffect, useRef } from "react";
import { AURORA_BANDS, AuroraBand } from "./Aurora.jsx";

// Rideaux affichés sur la page contact (le plus haut est omis : la carte le cacherait)
const CONTACT_BANDS = AURORA_BANDS.filter(({ id }) => id !== "aurora-band-patch-high");
const SVG_FRAME_INTERVAL = 50;

export default function Contact() {
  // Plus de bouton de langue : l'anglais reste accessible avec ?lang=en dans l'adresse
  const language = new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "fr";
  const auroraRef = useRef(null);
  const copy = language === "en"
    ? {
        intro: "Psychedelic trance & groovy music",
        booking: "Booking · Send an email",
        listen: "SoundCloud · Listen",
        linksLabel: "VALANA links",
      }
    : {
        intro: "Trance psychédélique & musique groovy",
        booking: "Booking · Envoyer un e-mail",
        listen: "SoundCloud · Écouter",
        linksLabel: "Liens VALANA",
      };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Les rideaux avancent 20 fois par seconde (filtres coûteux), et restent figés si l'utilisateur
  // a demandé de réduire les animations
  useEffect(() => {
    const svgs = [...auroraRef.current.querySelectorAll("svg")];
    svgs.forEach((svg) => svg.pauseAnimations());
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame;
    let lastDraw = 0;
    const start = performance.now();
    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      if (now - lastDraw < SVG_FRAME_INTERVAL) return;
      lastDraw = now;
      svgs.forEach((svg) => svg.setCurrentTime((now - start) / 1000));
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <div
        className="contact-scene"
        style={{
          "--contact-background-image": `url("${import.meta.env.BASE_URL}hero-background.jpeg")`,
          "--contact-sky-mask": `url("${import.meta.env.BASE_URL}hero-sky-mask.png")`,
        }}
      >
        <div className="contact-aurora" aria-hidden="true" ref={auroraRef}>
          {CONTACT_BANDS.map((band) => <AuroraBand key={band.id} {...band} />)}
        </div>
        <div className="contact-starfield" aria-hidden="true">
          {Array.from({ length: 21 }, (_, index) => {
            const column = index % 7;
            const row = Math.floor(index / 7);
            const horizontalJitter = (row % 2 ? 0.14 : -0.14) + Math.sin(index * 2.3) * 0.08;
            const verticalJitter = Math.sin(index * 1.7) * 0.16;

            if (column >= 5 && row >= 1) return null;

            return (
              <span
                key={index}
                className={[0, 3, 5, 8, 10, 17].includes(index) ? "contact-star-cross" : undefined}
                style={{
                  left: `${((column + 0.5 + horizontalJitter) / 7) * 100}%`,
                  top: `${((row + 0.5 + verticalJitter) / 3) * 100}%`,
                  "--star-delay": `${-((index * 17 + index * index * 3) % 70) / 10}s`,
                  "--star-duration": `${(1.6 + ((index % 8) * 4.4) / 7).toFixed(2)}s`,
                }}
              />
            );
          })}
          <span
            style={{
              left: "86%",
              top: "88%",
              "--star-delay": "-3.4s",
              "--star-duration": "4.2s",
            }}
          />
        </div>
      </div>
      <main>
        <h1 className="mark">VALANA</h1>
        <p className="intro">{copy.intro}</p>
        <nav aria-label={copy.linksLabel}>
          <a href="mailto:valana.booking@gmail.com">
            <span>{copy.booking}</span>
          </a>
          <a href="https://soundcloud.com/valana-psyche" target="_blank" rel="noreferrer">
            <svg className="soundcloud-logo" viewBox="0 0 32 24" aria-hidden="true">
              <path d="M7 19.5h19a4.5 4.5 0 0 0 .5-9A10.5 10.5 0 0 0 6.4 9.1 5.3 5.3 0 0 0 7 19.5Z" />
              <path className="soundcloud-wave" d="M9 15V8m4 9V4m4 12V2m4 13V5m4 10V9" />
            </svg>
            <span>{copy.listen}</span>
          </a>
        </nav>
      </main>
    </>
  );
}
