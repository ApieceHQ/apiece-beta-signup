/**
 * Apiece brand logo — "The 45" (45rpm vinyl single, flat mark).
 * Reproduced exactly from design_handoff_apiece_logo (high-fidelity:
 * geometry, colors, and stroke weights are final — do not redraw).
 *
 * Black vinyl body, brand-navy label, center hole punched via mask with
 * a crisp white-tinted edge ring.
 */
export default function ApieceLogo({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label="Apiece"
      style={{ display: "block", flex: "0 0 auto" }}
    >
      <defs>
        <mask id="apiece-hole">
          <rect width="100" height="100" fill="white" />
          <circle cx="50" cy="50" r="10" fill="black" />
        </mask>
      </defs>
      <g mask="url(#apiece-hole)">
        {/* Record body */}
        <circle cx="50" cy="50" r="46" fill="#1a1a1a" />
        {/* Groove rings */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="#2d2d2d" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="#2d2d2d" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="#2d2d2d" strokeWidth="0.8" />
        {/* Navy label (cooled to #23324F to match the page navy) */}
        <circle cx="50" cy="50" r="28" fill="#23324f" />
      </g>
      {/* Hole edge */}
      <circle
        cx="50"
        cy="50"
        r="10"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.5"
      />
    </svg>
  );
}
