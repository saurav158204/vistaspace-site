/**
 * A photo slot.
 *
 * Give it a `src` and it renders the photograph. Leave `src` null and it renders
 * a halftone placeholder plate that states exactly which photo belongs there —
 * so the page looks deliberate today and tells you what to drop in.
 *
 * To fill a slot: put the file in `public/images/...` and set the path in the
 * matching data file (`src/data/team.ts`, `src/data/media.ts`).
 */

interface PhotoFrameProps {
  src: string | null
  /** Required. Describes the photo for screen readers AND labels the empty slot. */
  alt: string
  /** Shown on the placeholder: what to shoot / supply. */
  hint?: string
  className?: string
  /** 'portrait' uses a person glyph, 'scene' a wider equipment glyph. */
  kind?: 'portrait' | 'scene'
  rounded?: string
}

export function PhotoFrame({
  src,
  alt,
  hint,
  className = '',
  kind = 'scene',
  rounded = 'rounded-xl',
}: PhotoFrameProps) {
  if (src) {
    return (
      <div className={`overflow-hidden border border-hairline bg-paper-sunk ${rounded} ${className}`}>
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </div>
    )
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-dashed border-hairline-strong bg-paper-raised ${rounded} ${className}`}
      role="img"
      aria-label={`Photo slot, not yet filled: ${alt}`}
    >
      <div className="dotscreen absolute inset-0" aria-hidden="true" />

      <div className="relative flex flex-col items-center gap-3 px-5 py-6 text-center">
        {kind === 'portrait' ? (
          <svg viewBox="0 0 48 48" className="h-9 w-9 text-ink-faint" aria-hidden="true">
            <circle cx="24" cy="17" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M9 41c0-8.3 6.7-15 15-15s15 6.7 15 15" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        ) : (
          <svg viewBox="0 0 64 48" className="h-9 w-12 text-ink-faint" aria-hidden="true">
            <rect x="4" y="10" width="56" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="32" cy="27" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="32" cy="27" r="3" fill="currentColor" />
            <path d="M22 10l4-6h12l4 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        )}

        <span className="micro">Photo slot</span>
        {hint && <span className="max-w-[26ch] text-[12px] leading-snug text-ink-muted">{hint}</span>}
      </div>
    </div>
  )
}
