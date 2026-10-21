/* Aurores boréales : chaque rideau est une image pré-calculée (public/aurora/*.webp), rendue
   à partir de l'ancienne version en filtres SVG. Trois images par rideau se fondent l'une dans
   l'autre et le rideau ondule par de simples transformations CSS : tout est animé par la carte
   graphique, sans aucun calcul de filtre pendant l'animation (fluide sur mobile). */

const FRAMES = [0, 1, 2];

// placement : position du rideau dans le ciel (en % du hero) ; appear : cycle d'apparition
// [durée, décalage, intensité max] pour les rideaux qui surgissent de façon dispersée.
// morph : durée du fondu enchaîné entre les trois formes du rideau.
export const AURORA_BANDS = [
  { id: "aurora-band-main", image: "main", morph: 24 },
  { id: "aurora-band-far", image: "far", morph: 30 },
  {
    id: "aurora-band-patch-left",
    image: "patch-left",
    morph: 26,
    placement: { left: "-2%", width: "46%", top: "-16%", height: "56%" },
    appear: [26, -4, 0.9],
  },
  {
    id: "aurora-band-patch-right",
    image: "patch-right",
    morph: 28,
    placement: { left: "54%", width: "44%", top: "-20%", height: "54%" },
    appear: [31, -17, 0.85],
  },
  {
    id: "aurora-band-patch-high",
    image: "patch-high",
    morph: 34,
    placement: { left: "24%", width: "50%", top: "-26%", height: "48%" },
    appear: [37, -26, 0.65],
  },
];

export function AuroraBand({ id, image, morph, placement, appear }) {
  return (
    <div
      className={`aurora-band ${id}${placement ? " aurora-band-patch" : ""}`}
      style={{
        "--morph-duration": `${morph}s`,
        ...(placement && {
          "--band-left": placement.left,
          "--band-width": placement.width,
          "--band-top": placement.top,
          "--band-height": placement.height,
        }),
        ...(appear && {
          "--appear-duration": `${appear[0]}s`,
          "--appear-delay": `${appear[1]}s`,
          "--appear-peak": appear[2],
        }),
      }}
    >
      {FRAMES.map((frame) => (
        <img
          key={frame}
          className={`aurora-frame aurora-frame-${frame}`}
          src={`${import.meta.env.BASE_URL}aurora/${image}-${frame}.webp`}
          alt=""
          decoding="async"
          draggable="false"
        />
      ))}
    </div>
  );
}
