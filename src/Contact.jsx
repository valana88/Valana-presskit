import { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";

const ContactGlobalStyle = createGlobalStyle`
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
      box-shadow: 0 0 4px 1px rgba(201, 235, 255, 0.58), 0 0 8px 1.5px rgba(136, 194, 255, 0.2);
    }
    50% {
      opacity: 0.8;
      transform: scale(1);
      box-shadow: 0 0 7px 1.5px rgba(221, 243, 255, 0.86), 0 0 15px 3.5px rgba(136, 194, 255, 0.4);
    }
  }

  main {
    position: relative;
    z-index: 1;
    width: min(100%, 520px);
    padding: clamp(28px, 7vw, 52px);
    border: 3px solid transparent;
    border-radius: 8px 36px;
    background:
      linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)) padding-box,
      linear-gradient(135deg, #b8fff3 0%, #3fd0c0 30%, #167d82 62%, #6b3fa0 100%) border-box;
    background-size: 100% 100%, 260% 260%;
    background-position: 0 0, 100% 0;
    animation: contact-frame-gradient 9s ease-in-out infinite alternate;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.3), 0 0 1.4rem rgba(63, 208, 192, 0.16);
    text-align: center;
  }

  @keyframes contact-frame-gradient {
    from { background-position: 0 0, 100% 0; }
    to { background-position: 0 0, 0 100%; }
  }

  .language-switch {
    position: absolute;
    top: 14px;
    right: 18px;
    display: flex;
    gap: 6px;
  }

  .language-switch button {
    padding: 4px 7px;
    border: 1px solid rgba(239, 233, 220, 0.32);
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.45);
    color: #a9b7ae;
    font: 700 0.68rem Arial, Helvetica, sans-serif;
    cursor: pointer;
  }

  .language-switch button[aria-pressed="true"] {
    border-color: #3fd0c0;
    color: #efe9dc;
  }

  .language-switch button:focus-visible {
    outline: 2px solid #3fd0c0;
    outline-offset: 2px;
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
    main { animation: none; }
  }
`;

export default function Contact() {
  const [language, setLanguage] = useState(() =>
    new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "fr"
  );
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
    const url = new URL(window.location.href);
    if (language === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    window.history.replaceState({}, "", url);
  }, [language]);

  return (
    <>
      <ContactGlobalStyle />
      <div
        className="contact-scene"
        style={{
          "--contact-background-image": `url("${import.meta.env.BASE_URL}hero-background.jpeg")`,
        }}
      >
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
        <div className="language-switch" aria-label="Language">
          <button type="button" aria-pressed={language === "fr"} onClick={() => setLanguage("fr")}>FR</button>
          <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
        </div>
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
