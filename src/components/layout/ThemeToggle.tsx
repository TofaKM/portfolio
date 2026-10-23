'use client'
import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

/** Re-render when <html data-theme> changes (this toggle, or another tab via storage). */
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange)
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => mo.disconnect()
}
const getTheme = (): Theme | undefined => document.documentElement.dataset.theme as Theme | undefined

/**
 * Light/dark switch. The theme itself is applied before first paint by the
 * inline script in layout.tsx (saved choice, else the OS setting); this just
 * flips it and remembers the choice.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => undefined)
  const next: Theme = theme === 'dark' ? 'light' : 'dark'

  const toggle = () => {
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('theme', next) } catch { /* private mode: still switches for this visit */ }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={className}
    >
      {/* Before hydration the theme isn't known yet; the moon is a neutral default. */}
      {theme === 'dark' ? <Sun size={15} aria-hidden /> : <Moon size={15} aria-hidden />}
    </button>
  )
}
