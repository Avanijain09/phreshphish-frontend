import { formatPercent, toPercent, type VerdictMeta } from '../lib/verdict'

export default function ScoreMeter({ score, meta }: { score: number; meta: VerdictMeta }) {
  const pct = toPercent(score)
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-mist-300">Model risk score</span>
        <span className={`font-display text-4xl font-semibold tabular-nums ${meta.text}`}>{formatPercent(score)}</span>
      </div>
      <div className="relative mt-3 h-3 rounded-full bg-ink-600" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)} aria-label="Model risk score">
        <div className={`h-full rounded-full ${meta.fill} transition-[width] duration-700 ease-out`} style={{ width: `${pct}%` }} />
        <div className="absolute top-1/2 h-5 w-1 -translate-y-1/2 rounded bg-white shadow" style={{ left: `calc(${pct}% - 2px)` }} aria-hidden />
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-[11px] text-mist-400" aria-hidden>
        <span>0%</span><span>50%</span><span>100%</span>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-mist-400">A model output on a 0–100% scale. It is not a calibrated probability that the site is malicious.</p>
    </div>
  )
}
