'use client'
import { useEffect, useRef } from 'react'

/** Thin gold reading-progress bar under the navbar. */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    }
    // At most one style write per animation frame.
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Sits on the bottom edge of the sticky navbar, full width at every breakpoint.
  return (
    <div
      ref={bar}
      aria-hidden
      className="fixed left-0 right-0 z-[51] h-[2px] origin-left bg-accent will-change-transform"
      style={{ top: 'calc(var(--nav-h) - 1px)', transform: 'scaleX(0)' }}
    />
  )
}
