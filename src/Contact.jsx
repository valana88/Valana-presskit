import { createGlobalStyle } from "styled-components";

const ContactGlobalStyle = createGlobalStyle`
  :root {
    color-scheme: dark;
    font-family: Arial, Helvetica, sans-serif;
    background: #08130f;
    color: #efe9dc;
  }

  * { box-sizing: border-box; }

  body {
    min-height: 100svh;
    margin: 0;
    display: grid;
    place-items: center;
    padding: 24px;
    background:
      radial-gradient(ellipse at 50% 0%, rgba(63, 208, 192, 0.18), transparent 58%),
      #08130f;
  }

  main {
    width: min(100%, 520px);
    padding: clamp(28px, 7vw, 52px);
    border: 1px solid rgba(63, 208, 192, 0.45);
    border-radius: 8px 36px;
    background: rgba(12, 29, 23, 0.9);
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.3);
    text-align: center;
  }

  .mark {
    margin: 0;
    color: #efe9dc;
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
    transition: background-color 160ms ease, color 160ms ease, transform 160ms ease;
  }

  a:hover, a:focus-visible {
    transform: translateY(-2px);
    background: #efe9dc;
    color: #08130f;
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

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default function Contact() {
  return (
    <>
      <ContactGlobalStyle />
      <main>
        <h1 className="mark">VALANA</h1>
        <p className="intro">Choisissez une destination<br />Choose a destination</p>
        <nav aria-label="Liens VALANA / VALANA links">
          <a href="mailto:valana.booking@gmail.com">
            <span>Booking · Envoyer un e-mail</span>
          </a>
          <a href="https://soundcloud.com/valana-psyche" target="_blank" rel="noreferrer">
            <svg className="soundcloud-logo" viewBox="0 0 32 24" aria-hidden="true">
              <path d="M7 19.5h19a4.5 4.5 0 0 0 .5-9A10.5 10.5 0 0 0 6.4 9.1 5.3 5.3 0 0 0 7 19.5Z" />
              <path className="soundcloud-wave" d="M9 15V8m4 9V4m4 12V2m4 13V5m4 10V9" />
            </svg>
            <span>SoundCloud · Écouter</span>
          </a>
        </nav>
        <footer>VALANA · Psychedelic electronic music</footer>
      </main>
    </>
  );
}
