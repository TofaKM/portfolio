import type { ReactNode } from 'react'

interface Props {
  label: string
  value: ReactNode
  note?: string
  /** Smaller value text for words rather than numbers. */
  compact?: boolean
}

/**
 * Dashboard-style tile (gold label, monospace value) — the Agri-Link KPI card.
 * Render inside a <dl>.
 */
export default function StatTile({ label, value, note, compact }: Props) {
  return (
    <div className="bg-surface border border-border rounded-doc px-4 py-3">
      <dt className="text-[10px] font-sans uppercase tracking-[.16em] text-accent-dark">{label}</dt>
      <dd
        className={`font-mono font-semibold text-ink-900 mt-1 flex items-center gap-1.5 ${
          compact ? 'text-[17px] whitespace-nowrap' : 'text-[20px]'
        }`}
      >
        {value}
      </dd>
      {note && <dd className="text-[11px] text-ink-400 font-sans mt-0.5">{note}</dd>}
    </div>
  )
}
