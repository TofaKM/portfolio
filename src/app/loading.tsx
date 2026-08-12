export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-doc flex items-center justify-center text-white font-serif font-bold text-lg animate-pulse"
          style={{ background: 'var(--accent-dark)' }}
        >
          TK
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full animate-bounce"
              style={{ background: 'var(--accent)', animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
