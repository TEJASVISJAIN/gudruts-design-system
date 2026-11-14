/**
 * Occasion accessories for Gudu (Thanksgiving scarf, Santa hat, …), drawn in his own
 * coordinate space (viewBox -30 -12 236 228; head top ≈ y 40, mouth ≈ y 120).
 *
 * Each accessory is a list of shapes. Gudu draws them three times, like his body:
 *   "shadow" and "border" pass → flat fills with the sticker-edge stroke (die-cut look)
 *   "art" pass                 → the real colours, on top of the face
 * Hats hide the microvilli stalks (the leaf still peeks out from behind).
 */
export type GuduAccessory = "scarf" | "pilgrim-hat" | "santa-hat" | "party-hat";

type Shape = { d: string; className: string; outline?: boolean };

const SHAPES: Record<GuduAccessory, Shape[]> = {
  scarf: [
    { d: "M110 152L102 188L117 191L121 155Z", className: "acc-scarf" },
    { d: "M116 152L127 186L141 179L125 148Z", className: "acc-scarf" },
    { d: "M22 131C50 146 110 146 138 131L141 146C112 163 48 163 19 146Z", className: "acc-scarf" },
    {
      d: "M100 141C108 135 122 137 125 146C127 155 118 160 109 158C101 156 96 147 100 141Z",
      className: "acc-scarf-knot",
    },
    {
      d: "M44 141L42 155M70 145L69 160M93 145L94 160M126 139L129 152",
      className: "acc-scarf-stripe",
      outline: false,
    },
    {
      d: "M105 189L104 195M110 190L109 196M115 191L114 197M130 184L132 190M135 182L137 188M140 179L142 185",
      className: "acc-scarf-fringe",
      outline: false,
    },
  ],
  "pilgrim-hat": [
    { d: "M57 44L63 2C63 -3 97 -3 97 2L103 44Z", className: "acc-hat" },
    { d: "M59 29H101L103 42H57Z", className: "acc-hat-band" },
    { d: "M71 29.5H89V41.5H71ZM75 33V38H85V33Z", className: "acc-buckle" },
    { d: "M32 46C32 37 128 37 128 46C128 55 32 55 32 46Z", className: "acc-hat" },
  ],
  "santa-hat": [
    {
      d: "M40 46C46 18 70 -2 100 -6C120 -8 142 6 152 26C138 20 120 20 110 28C118 34 121 40 121 46Z",
      className: "acc-santa",
    },
    { d: "M32 48C32 38 128 38 128 48C128 59 32 59 32 48Z", className: "acc-fur" },
    { d: "M141 30a12 12 0 1 0 24 0a12 12 0 1 0 -24 0Z", className: "acc-fur" },
  ],
  "party-hat": [
    { d: "M58 45L81 -6L104 45Z", className: "acc-party" },
    { d: "M64 32L94 22M69 20L88 13", className: "acc-party-stripe", outline: false },
    { d: "M74 -8a7 7 0 1 0 14 0a7 7 0 1 0 -14 0Z", className: "acc-pompom" },
    { d: "M56 46C56 40 106 40 106 46C106 52 56 52 56 46Z", className: "acc-party-rim" },
  ],
};

export const HATS: GuduAccessory[] = ["pilgrim-hat", "santa-hat", "party-hat"];

/** Order matters: scarves sit on the body, hats go on last (on top of the head). */
const ORDER: GuduAccessory[] = ["scarf", "pilgrim-hat", "santa-hat", "party-hat"];

export function AccessoryShapes({
  accessories,
  pass,
  edge,
}: {
  accessories: GuduAccessory[];
  pass: "outline" | "art";
  /** Stroke width of the sticker edge for the outline passes. */
  edge: number;
}) {
  const list = ORDER.filter((accessory) => accessories.includes(accessory));
  return (
    <>
      {list.flatMap((accessory) =>
        SHAPES[accessory]
          .filter((shape) => pass === "art" || shape.outline !== false)
          .map((shape, index) =>
            pass === "outline" ? (
              <path
                key={`${accessory}-${index}`}
                d={shape.d}
                strokeWidth={edge}
                strokeLinejoin="round"
              />
            ) : (
              <path
                key={`${accessory}-${index}`}
                d={shape.d}
                className={`gudu-acc ${shape.className}`}
              />
            ),
          ),
      )}
    </>
  );
}
