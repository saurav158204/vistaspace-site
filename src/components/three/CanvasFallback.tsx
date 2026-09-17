interface CanvasFallbackProps {
  label?: string
  className?: string
}

/**
 * Static stand-in for the WebGL panel under reduced motion or on low-power devices.
 * Pure SVG line art in the site's print language — no animation loop.
 */
export function CanvasFallback({ label = 'Static view', className = '' }: CanvasFallbackProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-paper-raised ${className}`}
      role="img"
      aria-label={label}
    >
      <svg viewBox="0 0 220 150" className="h-full max-h-[190px] w-auto text-ink" aria-hidden="true">
        {/* rack */}
        <g stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.45">
          <rect x="46" y="22" width="128" height="106" />
          <line x1="46" y1="57" x2="174" y2="57" />
          <line x1="46" y1="92" x2="174" y2="92" />
          <line x1="88" y1="22" x2="88" y2="128" />
          <line x1="132" y1="22" x2="132" y2="128" />
        </g>
        {/* figure, off-axis */}
        <g transform="rotate(-24 110 75)">
          <circle cx="110" cy="52" r="7" fill="currentColor" opacity="0.85" />
          <rect x="104" y="62" width="12" height="26" rx="6" fill="currentColor" opacity="0.85" />
          <g stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" opacity="0.85">
            <line x1="106" y1="68" x2="92" y2="80" />
            <line x1="114" y1="68" x2="129" y2="77" />
            <line x1="107" y1="88" x2="101" y2="106" />
            <line x1="113" y1="88" x2="120" y2="105" />
          </g>
        </g>
      </svg>

      <span className="micro absolute bottom-3 left-0 right-0 text-center">{label}</span>
    </div>
  )
}
