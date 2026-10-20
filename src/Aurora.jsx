/* Aurore : une courbe ondulée extrudée vers le haut en rideau, texturée de rayons.
   La courbe se déforme sur place (morphing SVG) : les plis se forment et se défont sans défiler. */
const AURORA_WIDTH = 1200;
const AURORA_FRAMES = 24;
// Palettes : vert oxygène à la base (557,7 nm), puis un dégradé franc vers le violet
// et le magenta en altitude. La palette "violet" sert aux rideaux plus lointains.
const AURORA_PALETTES = {
  green: [
    [205, 255, 215], [135, 250, 160], [100, 238, 148], [105, 215, 175],
    [135, 165, 215], [160, 120, 230], [185, 100, 210], [205, 90, 185],
  ],
  violet: [
    [175, 255, 205], [120, 235, 170], [125, 195, 210], [145, 145, 235],
    [165, 115, 235], [180, 100, 220], [195, 90, 200], [205, 85, 180],
  ],
};

const auroraColorAt = (t, palette = "green") => {
  const colors = AURORA_PALETTES[palette];
  const scaled = t * (colors.length - 1);
  const index = Math.min(Math.floor(scaled), colors.length - 2);
  const mix = scaled - index;
  const [a, b] = [colors[index], colors[index + 1]];
  return a.map((value, channel) => Math.round(value + (b[channel] - value) * mix));
};

// Ondes stationnaires : chaque pli se creuse et se relâche sur place, sans glisser latéralement.
// [amplitude, nombre d'ondes, phase, rythme (entier pour boucler), décalage, part fixe]
// Les "ripples" ajoutent des plis serrés dont l'amplitude enfle et retombe localement.
const auroraWavePath = ({ base, waves, ripples }, frame) => {
  const time = (2 * Math.PI * frame) / AURORA_FRAMES;
  const points = [];
  for (let x = -120; x <= AURORA_WIDTH + 120; x += 12) {
    const u = (2 * Math.PI * x) / AURORA_WIDTH;
    let y = base;
    for (const [amplitude, harmonic, phase, rate, offset, steady] of waves) {
      const pulse = steady + (1 - steady) * Math.cos(rate * time + offset);
      const lean = 0.18 * Math.sin(rate * time + offset * 1.3);
      y += amplitude * pulse * Math.sin(harmonic * u + phase + lean);
    }
    for (const [amplitude, harmonic, phase, rate, offset, spread] of ripples) {
      const envelope = Math.max(0, Math.sin(spread * u + offset) * Math.cos(rate * time + offset));
      y += amplitude * envelope * envelope * Math.sin(harmonic * u + phase + 0.6 * Math.sin(rate * time));
    }
    points.push(`${x},${y.toFixed(1)}`);
  }
  return `M${points.join(" L")}`;
};

// placement : position du rideau dans le ciel (en % du hero) ; appear : cycle d'apparition
// [durée, décalage, intensité max] pour les rideaux qui surgissent de façon dispersée.
export const AURORA_BANDS = [
  {
    id: "aurora-band-main",
    seed: 4,
    layers: 46,
    step: 6,
    duration: 40,
    breakup: 0.45,
    lift: 1,
    wave: {
      base: 395,
      waves: [
        [40, 1.1, 0.4, 1, 0, 0.55],
        [24, 2.3, 2.1, 2, 1.8, 0.2],
        [12, 3.6, 4.2, 3, 3.6, 0],
        [5, 5.2, 1, 2, 0.7, 0],
      ],
      ripples: [
        [20, 9, 0.3, 1, 0.4, 1.5],
        [14, 13, 2.2, 2, 2.6, 2.5],
        [8, 17, 4.1, 3, 5.2, 3.5],
      ],
    },
  },
  {
    id: "aurora-band-far",
    seed: 11,
    layers: 30,
    step: 6,
    duration: 52,
    palette: "violet",
    wave: {
      base: 270,
      waves: [
        [28, 0.9, 2.8, 1, 2.4, 0.6],
        [20, 2.1, 0.6, 2, 0.3, 0.2],
        [9, 3.7, 1.3, 3, 4.8, 0],
      ],
      ripples: [[15, 8, 1.1, 1, 3.1, 1.8], [9, 12, 2.9, 2, 0.9, 2.6]],
    },
  },
  {
    id: "aurora-band-patch-left",
    seed: 23,
    layers: 30,
    step: 6,
    duration: 44,
    placement: { left: "-2%", width: "46%", top: "-16%", height: "56%" },
    appear: [26, -4, 0.9],
    wave: {
      base: 400,
      waves: [[34, 0.8, 1.7, 1, 1.1, 0.5], [16, 1.9, 3.4, 2, 2.9, 0.2]],
      ripples: [[12, 6, 0.8, 1, 1.9, 1.2]],
    },
  },
  {
    id: "aurora-band-patch-right",
    seed: 37,
    layers: 30,
    step: 6,
    duration: 48,
    palette: "violet",
    placement: { left: "54%", width: "44%", top: "-20%", height: "54%" },
    appear: [31, -17, 0.85],
    wave: {
      base: 380,
      waves: [[30, 0.9, 4.1, 1, 0.4, 0.5], [18, 2.2, 0.9, 2, 3.7, 0.2]],
      ripples: [[11, 7, 2.4, 1, 4.4, 1.4]],
    },
  },
  {
    id: "aurora-band-patch-high",
    seed: 51,
    layers: 26,
    step: 6,
    duration: 56,
    palette: "violet",
    placement: { left: "24%", width: "50%", top: "-26%", height: "48%" },
    appear: [37, -26, 0.65],
    wave: {
      base: 420,
      waves: [[26, 0.7, 2.2, 1, 5.1, 0.5], [12, 1.8, 5.3, 2, 1.6, 0.2]],
      ripples: [[9, 6, 3.3, 1, 2.2, 1.3]],
    },
  },
];

export function AuroraBand({
  id, seed, layers, step, duration, wave, palette = "green", placement, appear, breakup = 0, lift = 0,
}) {
  const frames = Array.from({ length: AURORA_FRAMES + 1 }, (_, frame) => auroraWavePath(wave, frame));

  return (
    <svg
      className={`aurora-band ${id}${placement ? " aurora-band-patch" : ""}`}
      viewBox={`0 0 ${AURORA_WIDTH} 600`}
      preserveAspectRatio="none"
      style={{
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
      <defs>
        <path id={`${id}-curve`} d={frames[0]}>
          <animate attributeName="d" dur={`${duration}s`} repeatCount="indefinite" values={frames.join(";")} />
        </path>
        <filter id={`${id}-rays`} filterUnits="userSpaceOnUse" x="-150" y="-100" width={AURORA_WIDTH + 300} height="800">
          {/* Deux textures de rayons en fondu enchaîné : les rayons scintillent sur place */}
          <feTurbulence type="fractalNoise" baseFrequency="0.045 0.0025" numOctaves="3" seed={seed} result="noiseA" />
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.003" numOctaves="3" seed={seed + 21} result="noiseB" />
          <feComposite in="noiseA" in2="noiseB" operator="arithmetic" k1="0" k2="0.75" k3="0.25" k4="0" result="noise">
            <animate attributeName="k2" dur="5.5s" repeatCount="indefinite" values="0.75;0.25;0.6;0.3;0.75" />
            <animate attributeName="k3" dur="5.5s" repeatCount="indefinite" values="0.25;0.75;0.4;0.7;0.25" />
          </feComposite>
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  4 0 0 0 -1.25"
            result="rays"
          />
          <feGaussianBlur in="SourceGraphic" stdDeviation="3 14" result="curtain" />
          <feComposite in="curtain" in2="rays" operator="arithmetic" k1="1.1" k2="0.3" k3="0" k4="0" result="rayed" />
          {/* Grandes plages d'intensité : la bande se fragmente au lieu de former un bandeau uniforme */}
          <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.005" numOctaves="2" seed={seed + 7} result="patchNoise" />
          {/* Pulsations : les plages lumineuses montent et descendent le long du rideau */}
          <feOffset in="patchNoise" dy="0" result="patchPulse">
            <animate
              attributeName="dy"
              dur={`${duration * 0.6}s`}
              repeatCount="indefinite"
              values="-60;40;-20;60;-60"
              calcMode="spline"
              keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1;.45 0 .55 1"
            />
          </feOffset>
          <feColorMatrix
            in="patchPulse"
            type="matrix"
            values={`0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  ${2.6 + breakup * 1.6} 0 0 0 ${-0.55 - breakup}`}
            result="patches"
          />
          <feComposite in="rayed" in2="patches" operator="arithmetic" k1="1.25" k2="0.15" k3="0" k4="0" result="aurora" />
          {/* Ondulation organique : le rideau se courbe différemment selon la hauteur,
              et les ondulations remontent lentement le long des rayons */}
          <feTurbulence type="fractalNoise" baseFrequency="0.0055 0.011" numOctaves="2" seed={seed + 3} result="warpNoise">
            <animate
              attributeName="baseFrequency"
              dur={`${duration * 1.3}s`}
              repeatCount="indefinite"
              values="0.0055 0.011;0.0068 0.0095;0.005 0.0125;0.0055 0.011"
              calcMode="spline"
              keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1"
            />
          </feTurbulence>
          <feOffset in="warpNoise" dx="0" dy="0" result="warpShift">
            <animate
              attributeName="dy"
              dur={`${duration * 0.8}s`}
              repeatCount="indefinite"
              values="0;-140;-60;-200;0"
              calcMode="spline"
              keySplines=".4 0 .6 1;.4 0 .6 1;.4 0 .6 1;.4 0 .6 1"
            />
          </feOffset>
          <feColorMatrix
            in="warpShift"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0.5  0 0 0 0 0  0 0 0 0 1"
            result="warpMap"
          />
          <feDisplacementMap in="aurora" in2="warpMap" scale="40" xChannelSelector="R" yChannelSelector="G" result="waved" />
          {/* lift : bruit très large qui fait monter ou descendre le rideau selon l'endroit du ciel */}
          {lift > 0 && (
            <>
              <feTurbulence type="fractalNoise" baseFrequency="0.0024 0.0003" numOctaves="1" seed={seed + 13} result="liftNoise" />
              <feColorMatrix
                in="liftNoise"
                type="matrix"
                values="0 0 0 0 0.5  0 1 0 0 0  0 0 0 0 0  0 0 0 0 1"
                result="liftMap"
              />
              <feDisplacementMap in="waved" in2="liftMap" scale={lift * 260} xChannelSelector="R" yChannelSelector="G" />
            </>
          )}
        </filter>
      </defs>
      <g filter={`url(#${id}-rays)`} fill="none" strokeLinecap="round">
        {Array.from({ length: layers }, (_, layer) => {
          const t = layer / (layers - 1);
          const [r, g, b] = auroraColorAt(t, palette);
          // La base monte progressivement en intensité : pas de lisière marquée
          const rise = Math.min(1, t / 0.22);
          const opacity = 0.95 * rise * rise * (3 - 2 * rise) * Math.pow(1 - t, 1.3) + 0.03;
          return (
            <use
              key={layer}
              href={`#${id}-curve`}
              transform={`translate(0 ${-layer * step})`}
              stroke={`rgb(${r} ${g} ${b})`}
              strokeOpacity={opacity.toFixed(3)}
              strokeWidth={step + 2}
            />
          );
        })}
      </g>
    </svg>
  );
}
