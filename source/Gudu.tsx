import { AccessoryShapes, HATS, type GuduAccessory } from "./GuduAccessories";
import { useId, type ReactNode } from "react";

/**
 * Gudu, the Gudruts mascot: a villus with a microvilli tuft and the logo's leaf,
 * drawn as a die-cut sticker (cream border + hard plum offset shadow) to match the
 * site's other stickers. Every pose shares one canvas, so sizes stay consistent and
 * feet always sit on the bottom edge. Decorative — screen readers skip it; any
 * words Gudu "says" belong in visible text next to it. Colours live in gudu.css.
 */
export type GuduPose =
  | "neutral"
  | "peek"
  | "point"
  | "think"
  | "celebrate"
  | "shrug"
  | "sad"
  | "okay"
  | "glow";

type Arm = { d: string; hand: readonly [number, number] };
type Face = "smile" | "happy" | "glow" | "okay" | "sad" | "think" | "shrug";

const BODY =
  "M46 186C28 176 20 154 24 128C28 96 46 76 50 62C55 47 66 40 80 40C95 40 106 48 110 63C114 78 132 98 136 128C140 154 132 176 114 186C100 192 60 192 46 186Z";
const LEAF = "M80 41C77 26 86 12 104 8C106 25 96 37 80 41Z";
/** Microvilli: [base x, base y, tip x, tip y]. The right one leans clear of the leaf. */
const STALKS = [
  [64, 47, 57, 28],
  [72, 42, 68, 22],
  [96, 46, 112, 34],
] as const;
const FEET = [62, 98];
/** With a hat on, the leaf is tucked into the hat band like a feather. */
const LEAF_IN_HAT = "translate(18 -6) rotate(28 80 41)";
const BORDER = 18;

const ARMS = {
  downL: { d: "M27 130C16 138 11 148 11 158", hand: [11, 160] },
  downR: { d: "M133 130C144 138 149 148 149 158", hand: [149, 160] },
  waveR: { d: "M133 120C147 110 153 96 151 80", hand: [151, 77] },
  pointR: { d: "M133 126C150 120 162 112 170 104", hand: [172, 102] },
  chinR: { d: "M130 150C118 154 104 148 100 137", hand: [99, 134] },
  upL: { d: "M30 120C18 108 12 92 12 76", hand: [12, 73] },
  upR: { d: "M130 120C142 108 148 92 148 76", hand: [148, 73] },
  shrugL: { d: "M27 128C14 128 6 120 4 110", hand: [4, 107] },
  shrugR: { d: "M133 128C146 128 154 120 156 110", hand: [156, 107] },
  droopL: { d: "M28 134C21 145 20 155 22 166", hand: [22, 168] },
  droopR: { d: "M132 134C139 145 140 155 138 166", hand: [138, 168] },
  openL: { d: "M27 126C14 118 8 108 6 98", hand: [6, 95] },
  openR: { d: "M133 126C146 118 152 108 154 98", hand: [154, 95] },
} satisfies Record<string, Arm>;

/** Each pose: arms (a `front` arm crosses the body), a face, and optional extras. */
const POSES: Record<
  GuduPose,
  { left: Arm; right: Arm; front?: boolean; face: Face; look?: number; sparkles?: boolean }
> = {
  neutral: { left: ARMS.downL, right: ARMS.downR, face: "smile" },
  peek: { left: ARMS.downL, right: ARMS.waveR, face: "smile" },
  point: { left: ARMS.downL, right: ARMS.pointR, face: "smile", look: 3 },
  think: { left: ARMS.downL, right: ARMS.chinR, front: true, face: "think", look: -2 },
  celebrate: { left: ARMS.upL, right: ARMS.upR, face: "happy" },
  shrug: { left: ARMS.shrugL, right: ARMS.shrugR, face: "shrug" },
  sad: { left: ARMS.droopL, right: ARMS.droopR, face: "sad" },
  okay: { left: ARMS.downL, right: ARMS.downR, face: "okay" },
  glow: { left: ARMS.openL, right: ARMS.openR, face: "glow", sparkles: true },
};

const EYES = [63, 97];
const EYE_Y = 102;

function ArmShape({ arm, width, hand }: { arm: Arm; width: number; hand: number }) {
  return (
    <>
      <path d={arm.d} fill="none" strokeWidth={width} strokeLinecap="round" />
      <circle cx={arm.hand[0]} cy={arm.hand[1]} r={hand} />
    </>
  );
}

/** Everything outside the face, filled flat: drawn twice under the character for the sticker edge. */
function Silhouette({
  left,
  right,
  wave,
  className,
  accessories,
}: {
  left: Arm;
  right?: Arm;
  wave: boolean;
  className: string;
  accessories: GuduAccessory[];
}) {
  const w = BORDER;
  const stalks = !accessories.some((accessory) => HATS.includes(accessory));
  return (
    <g className={className} strokeLinecap="round" strokeLinejoin="round">
      <g className="gudu-crown">
        {stalks &&
          STALKS.map(([x1, y1, x2, y2]) => (
            <g key={x2}>
              <path d={`M${x1} ${y1}L${x2} ${y2}`} strokeWidth={w} />
              <circle cx={x2} cy={y2} r={4 + w / 2} />
            </g>
          ))}
        <path d={LEAF} strokeWidth={w} transform={stalks ? undefined : LEAF_IN_HAT} />
      </g>
      <g className="gudu-arm-left">
        <ArmShape arm={left} width={w + 1} hand={6.5 + w / 2} />
      </g>
      {right && (
        <g className={`gudu-arm-right${wave ? " gudu-arm-wave" : ""}`}>
          <ArmShape arm={right} width={w + 1} hand={6.5 + w / 2} />
        </g>
      )}
      <path d={BODY} strokeWidth={w} />
      {FEET.map((x) => (
        <ellipse key={x} cx={x} cy={189} rx={13 + w / 2} ry={7 + w / 2} />
      ))}
      <AccessoryShapes accessories={accessories} pass="outline" edge={w} />
    </g>
  );
}

function Eyes({ look = 0, dy = 0 }: { look?: number; dy?: number }) {
  return (
    <g className="gudu-eyes">
      {EYES.map((x) => (
        <g key={x}>
          <ellipse className="gudu-pupil" cx={x + look} cy={EYE_Y + dy} rx="7" ry="9" />
          <circle className="gudu-glint" cx={x + look + 2.5} cy={EYE_Y + dy - 3.6} r="2.6" />
          <circle className="gudu-glint" cx={x + look - 2.5} cy={EYE_Y + dy + 3.6} r="1.2" />
        </g>
      ))}
    </g>
  );
}

function FaceShape({ face, look }: { face: Face; look?: number }) {
  const [l, r] = EYES;
  const y = EYE_Y;
  let parts: ReactNode;
  switch (face) {
    case "happy":
      parts = (
        <>
          {EYES.map((x) => (
            <path
              key={x}
              className="gudu-ink"
              d={`M${x - 8} ${y + 2}Q${x} ${y - 9} ${x + 8} ${y + 2}`}
            />
          ))}
          <path className="gudu-mouth" d={`M68 ${y + 12}Q80 ${y + 32} 92 ${y + 12}Z`} />
          <ellipse className="gudu-tongue" cx="80" cy={y + 22} rx="5.5" ry="3.2" />
        </>
      );
      break;
    case "glow":
      parts = (
        <>
          <Eyes />
          <path className="gudu-mouth" d={`M69 ${y + 14}Q80 ${y + 30} 91 ${y + 14}Z`} />
        </>
      );
      break;
    case "okay":
      parts = (
        <>
          <Eyes dy={1} />
          <path className="gudu-ink" d={`M73 ${y + 17}q4 -2 7 0t7 0`} />
        </>
      );
      break;
    case "sad":
      parts = (
        <>
          <Eyes dy={3} />
          <path
            className="gudu-ink"
            d={`M${l - 9} ${y - 11}L${l + 5} ${y - 15}M${r + 9} ${y - 11}L${r - 5} ${y - 15}`}
          />
          <path className="gudu-ink" d={`M72 ${y + 23}Q80 ${y + 15} 88 ${y + 23}`} />
        </>
      );
      break;
    case "think":
      parts = (
        <>
          <Eyes look={look} dy={-2} />
          <path className="gudu-ink" d={`M${r - 7} ${y - 16}Q${r} ${y - 21} ${r + 7} ${y - 16}`} />
          <circle className="gudu-ink" cx="74" cy={y + 18} r="3.2" />
        </>
      );
      break;
    case "shrug":
      parts = (
        <>
          <Eyes />
          <path
            className="gudu-ink"
            d={`M${l - 7} ${y - 16}Q${l} ${y - 21} ${l + 7} ${y - 16}M${r - 7} ${y - 16}Q${r} ${y - 21} ${r + 7} ${y - 16}`}
          />
          <path className="gudu-ink" d={`M71 ${y + 18}l4.5 -3 4.5 3 4.5 -3 4.5 3`} />
        </>
      );
      break;
    default:
      parts = (
        <>
          <Eyes look={look} />
          <path className="gudu-ink" d={`M73 ${y + 15}q7 7 14 0`} />
        </>
      );
  }
  return (
    <>
      {parts}
      <ellipse className="gudu-cheek" cx={l - 11} cy={y + 15} rx="7" ry="4" />
      <ellipse className="gudu-cheek" cx={r + 11} cy={y + 15} rx="7" ry="4" />
    </>
  );
}

/** Four-point twinkle, centred on (x, y). */
const sparkle = (x: number, y: number, s: number) =>
  `M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z`;

export function Gudu({
  pose = "neutral",
  className = "",
  accessories = [],
}: {
  pose?: GuduPose;
  className?: string;
  /** Occasion accessories, e.g. ["scarf", "pilgrim-hat"] for Thanksgiving. */
  accessories?: GuduAccessory[];
}) {
  const hat = accessories.some((accessory) => HATS.includes(accessory));
  const id = useId();
  const clip = `${id}-body`;
  const dots = `${id}-dots`;
  const { left, right, front, face, look, sparkles } = POSES[pose];
  const wave = pose === "peek";
  const backRight = front ? undefined : right;

  return (
    <span className={`gudu gudu--${pose} ${className}`} aria-hidden="true">
      <svg
        viewBox="-30 -12 236 228"
        focusable="false"
        overflow={accessories.length ? "visible" : undefined}
      >
        <defs>
          <clipPath id={clip}>
            <path d={BODY} />
          </clipPath>
          <pattern id={dots} width="7" height="7" patternUnits="userSpaceOnUse">
            <circle className="gudu-halftone" cx="3.5" cy="3.5" r="1.6" />
          </pattern>
        </defs>
        {pose === "celebrate" && (
          <ellipse className="gudu-ground" cx="86" cy="203" rx="52" ry="6" />
        )}
        <g className="gudu-body">
          <g transform="translate(6 6)">
            <Silhouette
              left={left}
              right={backRight}
              wave={wave}
              className="gudu-shadow"
              accessories={accessories}
            />
          </g>
          <Silhouette
            left={left}
            right={backRight}
            wave={wave}
            className="gudu-border"
            accessories={accessories}
          />

          {/* Leaf + tuft: grouped so they can trail the body (follow-through). */}
          <g className="gudu-crown">
            {!hat && (
              <>
                <g className="gudu-ink">
                  {STALKS.map(([x1, y1, x2, y2]) => (
                    <path key={x2} d={`M${x1} ${y1}L${x2} ${y2}`} />
                  ))}
                </g>
                {STALKS.map(([, , x, y]) => (
                  <circle key={x} className="gudu-bobble" cx={x} cy={y} r="4.2" />
                ))}
              </>
            )}
            <g transform={hat ? LEAF_IN_HAT : undefined}>
              <path className="gudu-leaf" d={LEAF} />
              <path className="gudu-leaf-vein" d="M82 37C88 28 94 20 101 13" />
            </g>
          </g>

          <g className="gudu-limb gudu-arm-left">
            <ArmShape arm={left} width={5} hand={6.5} />
          </g>
          {backRight && (
            <g className={`gudu-limb gudu-arm-right${wave ? " gudu-arm-wave" : ""}`}>
              <ArmShape arm={backRight} width={5} hand={6.5} />
            </g>
          )}
          {FEET.map((x) => (
            <ellipse key={x} className="gudu-foot" cx={x} cy={189} rx={13} ry={7} />
          ))}

          <path className="gudu-skin" d={BODY} />
          <ellipse
            cx="140"
            cy="132"
            rx="36"
            ry="96"
            fill={`url(#${dots})`}
            clipPath={`url(#${clip})`}
          />
          <path className="gudu-outline" d={BODY} />

          <FaceShape face={face} look={look} />

          {front && (
            <>
              <g className="gudu-border gudu-arm-chin" strokeLinecap="round">
                <ArmShape arm={right} width={13} hand={10} />
              </g>
              <g className="gudu-limb gudu-arm-chin">
                <ArmShape arm={right} width={5} hand={6.5} />
              </g>
            </>
          )}
          <AccessoryShapes accessories={accessories} pass="art" edge={0} />
        </g>
        {sparkles && (
          <g className="gudu-sparkles">
            <path d={sparkle(166, 44, 11)} />
            <path d={sparkle(-8, 58, 8)} />
            <path d={sparkle(178, 146, 7)} />
          </g>
        )}
      </svg>
    </span>
  );
}

/** Gudu with a speech bubble. The line is real text, so it is read out and selectable. */
export function GuduSays({
  pose,
  children,
  className = "",
  live = false,
}: {
  pose: GuduPose;
  children: ReactNode;
  className?: string;
  /** Announce changes to screen readers (for lines that react to the visitor). */
  live?: boolean;
}) {
  return (
    <div className={`gudu-says ${className}`}>
      <Gudu pose={pose} />
      <p className="gudu-bubble" aria-live={live ? "polite" : undefined}>
        {children}
      </p>
    </div>
  );
}
