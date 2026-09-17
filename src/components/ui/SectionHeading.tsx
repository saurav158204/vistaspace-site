import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
  className = '',
}: SectionHeadingProps) {
  const centred = align === 'center'

  return (
    <Reveal
      className={`flex flex-col gap-5 ${centred ? 'mx-auto items-center text-center' : 'items-start text-left'} ${className}`}
    >
      {eyebrow && <span className="micro">{eyebrow}</span>}

      <Tag
        className={
          Tag === 'h1'
            ? 'display max-w-[15ch] text-[44px] sm:text-[60px] lg:text-[72px]'
            : 'display max-w-[18ch] text-[32px] sm:text-[42px]'
        }
      >
        {title}
      </Tag>

      {description && (
        <p className={`lede ${centred ? 'max-w-prose' : 'max-w-[58ch]'}`}>{description}</p>
      )}
    </Reveal>
  )
}
