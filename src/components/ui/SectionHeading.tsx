interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  /** Use 'h1' when this heading is the page title. */
  as?: 'h1' | 'h2'
  className?: string
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', as: Tag = 'h2', className = '' }: Props) {
  const centered = align === 'center'
  // A page title is above the fold: animate it on load (CSS only) rather
  // than waiting for it to scroll into view.
  const motion = Tag === 'h1' ? 'enter' : 'reveal'
  return (
    <div className={`${motion} ${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}

      <Tag
        className={`font-serif font-semibold leading-tight mb-3 text-ink-900 ${
          Tag === 'h1' ? 'text-4xl md:text-5xl tracking-[-0.02em]' : 'text-3xl md:text-4xl'
        }`}
      >
        {title}
      </Tag>

      {subtitle && (
        <p
          className={`text-ink-500 text-[15px] leading-relaxed font-sans ${
            centered ? 'max-w-xl mx-auto' : 'max-w-2xl'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
