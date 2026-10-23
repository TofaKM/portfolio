import { ImageResponse } from 'next/og'
import { profile } from '@/data'

export const alt = `${profile.name} — ${profile.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Link-preview card (LinkedIn, WhatsApp, X…) in the site's navy / cream / gold style. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          background: '#F4F5F3', fontFamily: 'Georgia, serif',
        }}
      >
        {/* navy bar, like the site's navbar */}
        <div style={{ display: 'flex', alignItems: 'center', height: 96, padding: '0 72px', background: '#0F2436', gap: 20 }}>
          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52,
              background: '#FFFFFF', color: '#0F2436', fontSize: 24, fontWeight: 700, borderRadius: 4,
            }}
          >
            TM
          </div>
          <div style={{ display: 'flex', color: '#FFFFFF', fontSize: 28, fontWeight: 600 }}>{profile.shortName}</div>
          <div style={{ display: 'flex', marginLeft: 'auto', color: '#FFFFFF', fontSize: 20, border: '1px solid rgba(255,255,255,.6)', padding: '6px 14px', borderRadius: 4, fontFamily: 'sans-serif' }}>
            Open to work
          </div>
        </div>
        <div style={{ display: 'flex', height: 4, background: '#A2793F' }} />

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '64px 72px 0' }}>
          <div style={{ display: 'flex', color: '#7C5A2E', fontSize: 22, letterSpacing: 6, textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
            {profile.location}
          </div>
          <div style={{ display: 'flex', color: '#1B232B', fontSize: 84, fontWeight: 700, marginTop: 18, lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div style={{ display: 'flex', color: '#33414C', fontSize: 34, marginTop: 22 }}>{profile.tagline}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 40 }}>
            {profile.roles.map(r => (
              <div
                key={r}
                style={{
                  display: 'flex', padding: '8px 16px', fontSize: 20, fontFamily: 'monospace',
                  background: '#F1E7D8', color: '#7C5A2E', border: '1px solid rgba(162,121,63,.35)', borderRadius: 3,
                }}
              >
                {r}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
