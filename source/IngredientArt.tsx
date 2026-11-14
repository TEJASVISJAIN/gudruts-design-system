/**
 * Animated ingredient illustrations: flat fruit with a plum outline, a sprig that sways
 * and a couple of sparkles. All motion is CSS (ingredients.css) and stops for reduced motion.
 */
export type IngredientKind = "amla" | "bibhitaki" | "haritaki" | "more";

const SPARKLE = "M0 -8C1 -2 2 -1 8 0C2 1 1 2 0 8C-1 2 -2 1 -8 0C-2 -1 -1 -2 0 -8Z";

function Sparkles({ at }: { at: [number, number][] }) {
  return (
    <g className="ing-sparkles">
      {at.map(([x, y], index) => (
        <path
          key={index}
          d={SPARKLE}
          transform={`translate(${x} ${y})`}
          style={{ "--k": index } as React.CSSProperties}
        />
      ))}
    </g>
  );
}

/** Small paired leaflets along a twig, like the feathery amla branch. */
function Twig({ d, leaflets }: { d: string; leaflets: [number, number, number][] }) {
  return (
    <g className="ing-leaf">
      <path className="ing-stem" d={d} />
      {leaflets.map(([x, y, angle], index) => (
        <ellipse
          key={index}
          className="ing-leaflet"
          cx={x}
          cy={y}
          rx="8"
          ry="3.6"
          transform={`rotate(${angle} ${x} ${y})`}
        />
      ))}
    </g>
  );
}

function Amla() {
  return (
    <>
      <ellipse className="ing-shadow" cx="122" cy="168" rx="62" ry="7" />
      <Twig
        d="M104 66C108 50 122 38 146 32C160 28 176 30 188 36"
        leaflets={[
          [118, 44, -60],
          [126, 50, 20],
          [134, 34, -70],
          [140, 42, 15],
          [150, 28, -80],
          [156, 38, 10],
          [166, 26, -95],
          [170, 36, 0],
          [180, 30, -110],
          [184, 40, -10],
        ]}
      />
      <g className="ing-fruit ing-fruit--back">
        <circle className="ing-amla" cx="168" cy="128" r="30" />
        <path
          className="ing-lobe"
          d="M168 98C156 112 156 144 168 158M168 98C180 112 180 144 168 158"
        />
        <ellipse
          className="ing-shine"
          cx="157"
          cy="114"
          rx="6"
          ry="3.5"
          transform="rotate(-35 157 114)"
        />
      </g>
      <g className="ing-fruit">
        <circle className="ing-amla" cx="104" cy="114" r="46" />
        <path
          className="ing-lobe"
          d="M104 68C84 88 84 140 104 160M104 68C124 88 124 140 104 160M104 68C70 84 66 140 96 159M104 68C138 84 142 140 112 159"
        />
        <ellipse
          className="ing-shine"
          cx="86"
          cy="92"
          rx="10"
          ry="5.5"
          transform="rotate(-35 86 92)"
        />
      </g>
      <Sparkles
        at={[
          [56, 60],
          [204, 84],
          [190, 156],
        ]}
      />
    </>
  );
}

function Bibhitaki() {
  const fruit =
    "M102 62C130 62 150 90 148 120C146 148 128 166 102 166C76 166 58 148 56 120C54 90 74 62 102 62Z";
  return (
    <>
      <ellipse className="ing-shadow" cx="124" cy="170" rx="66" ry="7" />
      <g className="ing-leaf">
        <path className="ing-broadleaf" d="M110 66C124 36 160 22 196 28C188 60 152 78 110 66Z" />
        <path className="ing-vein" d="M110 66C138 52 166 40 196 28" />
      </g>
      <g className="ing-fruit">
        <path className="ing-stem" d="M102 62C102 54 106 48 112 46" />
        <path className="ing-bibhitaki" d={fruit} />
        <g className="ing-speckles">
          <circle cx="84" cy="98" r="2" />
          <circle cx="118" cy="88" r="1.8" />
          <circle cx="128" cy="132" r="2.2" />
          <circle cx="90" cy="140" r="1.8" />
          <circle cx="106" cy="116" r="1.6" />
        </g>
        <ellipse
          className="ing-shine"
          cx="80"
          cy="86"
          rx="9"
          ry="5"
          transform="rotate(-40 80 86)"
        />
      </g>
      {/* A halved fruit shows the pale flesh and the stone. */}
      <g className="ing-fruit ing-fruit--back">
        <circle className="ing-bibhitaki" cx="172" cy="136" r="28" />
        <circle className="ing-flesh" cx="172" cy="136" r="21" />
        <ellipse className="ing-stone" cx="172" cy="136" rx="9" ry="11" />
      </g>
      <Sparkles
        at={[
          [46, 74],
          [208, 104],
          [44, 150],
        ]}
      />
    </>
  );
}

function Haritaki() {
  return (
    <>
      <ellipse className="ing-shadow" cx="126" cy="172" rx="64" ry="7" />
      <g className="ing-leaf">
        <path className="ing-broadleaf" d="M118 54C112 28 126 10 152 4C158 30 144 48 118 54Z" />
        <path className="ing-vein" d="M118 54C130 38 142 22 152 4" />
      </g>
      <g className="ing-fruit">
        <path
          className="ing-haritaki"
          d="M112 52C142 64 150 102 146 130C142 158 128 172 112 174C96 172 82 158 78 130C74 102 82 64 112 52Z"
        />
        <path
          className="ing-ridge"
          d="M112 52C100 92 98 140 112 174M112 52C124 92 126 140 112 174M112 52C88 82 84 140 100 170M112 52C136 82 140 140 124 170"
        />
        <ellipse
          className="ing-shine"
          cx="94"
          cy="88"
          rx="5"
          ry="10"
          transform="rotate(15 94 88)"
        />
      </g>
      <g className="ing-fruit ing-fruit--back">
        <g transform="translate(178 146) rotate(72) scale(0.5)">
          <path
            className="ing-haritaki"
            d="M0 -62C30 -50 38 -12 34 16C30 44 16 58 0 60C-16 58 -30 44 -34 16C-38 -12 -30 -50 0 -62Z"
          />
          <path className="ing-ridge" d="M0 -62C-12 -22 -14 26 0 60M0 -62C12 -22 14 26 0 60" />
        </g>
      </g>
      <Sparkles
        at={[
          [52, 70],
          [200, 90],
          [56, 150],
        ]}
      />
    </>
  );
}

/** "And many more": a loose scatter of seeds and leaves drifting about. */
function More() {
  const seeds: [number, number, number][] = [
    [64, 70, 30],
    [150, 52, -20],
    [196, 98, 60],
    [78, 146, -40],
    [172, 160, 15],
    [120, 172, 80],
  ];
  return (
    <>
      {seeds.map(([x, y, angle], index) => (
        <g className="ing-drift" key={index} style={{ "--k": index } as React.CSSProperties}>
          {index % 2 ? (
            <ellipse
              className="ing-seed"
              cx={x}
              cy={y}
              rx="9"
              ry="4"
              transform={`rotate(${angle} ${x} ${y})`}
            />
          ) : (
            <ellipse
              className="ing-leaflet"
              cx={x}
              cy={y}
              rx="11"
              ry="5"
              transform={`rotate(${angle} ${x} ${y})`}
            />
          )}
        </g>
      ))}
      <text className="ing-more-plus" x="120" y="128" textAnchor="middle">
        + more
      </text>
    </>
  );
}

const ART: Record<IngredientKind, () => React.ReactElement> = {
  amla: Amla,
  bibhitaki: Bibhitaki,
  haritaki: Haritaki,
  more: More,
};

export function IngredientArt({ kind }: { kind: IngredientKind }) {
  const Art = ART[kind];
  return (
    <svg
      className={`ingredient-art ingredient-art--${kind}`}
      viewBox="0 0 240 190"
      aria-hidden="true"
    >
      <Art />
    </svg>
  );
}
