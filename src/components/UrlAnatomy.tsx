import { parseParts } from '../lib/url'

export default function UrlAnatomy({ value }: { value: string }) {
  const p = parseParts(value)
  if (!p) return null
  const stats: [string, string][] = [
    ['Host labels', String(p.hostLabels)],
    ['Path length', String(p.pathLength)],
    ['Query parameters', String(p.queryParams)],
    ['IP address host', p.ipHost ? 'Yes' : 'No'],
  ]
  return (
    <div className="rounded-xl border border-ink-600/70 bg-ink-900/60 p-4">
      <p className="break-all font-mono text-sm leading-relaxed" aria-label="Address broken into parts">
        <span className="text-mist-400">{p.scheme}</span>
        <span className="rounded bg-mint-400/15 px-0.5 text-mint-300">{p.host}</span>
        <span className="text-mist-300">{p.rest}</span>
      </p>
      <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-xs sm:grid-cols-4">
        {stats.map(([k, v]) => (
          <div key={k}>
            <dt className="text-mist-400">{k}</dt>
            <dd className="font-mono text-sm text-mist-100">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
