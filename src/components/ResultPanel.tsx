import { Info, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react'
import type { PredictResponse, Verdict } from '../lib/api'
import { VERDICTS, formatPercent } from '../lib/verdict'
import ScoreMeter from './ScoreMeter'

const ICONS = { phishing: ShieldAlert, benign: ShieldCheck, uncertain: ShieldQuestion } as const

export default function ResultPanel({ url, result }: { url: string; result: PredictResponse }) {
  const v: Verdict = result.verdict
  const meta = VERDICTS[v]
  const Icon = ICONS[v]
  const conf = typeof result.confidence === 'number' ? formatPercent(result.confidence) : result.confidence

  return (
    <article className={`animate-rise overflow-hidden rounded-2xl border ${meta.border} bg-ink-800/90`} aria-labelledby="verdict-title">
      <header className={`flex items-start gap-4 border-b ${meta.border} ${meta.soft} p-6`}>
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border ${meta.border} ${meta.text}`}><Icon size={26} aria-hidden /></span>
        <div className="min-w-0">
          <h2 id="verdict-title" className={`font-display text-2xl font-semibold ${meta.text}`}>{meta.label}</h2>
          <p className="mt-1 text-mist-100">{meta.headline}</p>
          <p className="mt-2 break-all font-mono text-xs text-mist-400" title="Shown as text only. Never opened.">{url}</p>
        </div>
      </header>

      <div className="grid gap-8 p-6 md:grid-cols-2">
        <div className="space-y-5">
          <ScoreMeter score={result.risk_score} meta={meta} />
          {conf !== null && conf !== '' && (
            <div className="flex items-baseline justify-between border-t border-ink-600 pt-4 text-sm">
              <span className="text-mist-300">Model confidence</span>
              <span className="font-mono text-mist-100">{conf}</span>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-display text-base font-semibold">Evidence from the URL</h3>
          {result.evidence.length ? (
            <ul className="mt-3 space-y-2.5">
              {result.evidence.map((e, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-mist-100">
                  <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${meta.fill}`} aria-hidden />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-mist-400">The API returned no evidence items for this scan.</p>
          )}
        </div>
      </div>

      {result.explanation && (
        <div className="border-t border-ink-600 p-6">
          <h3 className="font-display text-base font-semibold">Explanation</h3>
          <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-mist-300">{result.explanation}</p>
        </div>
      )}

      <div className="border-t border-ink-600 bg-ink-900/60 p-6">
        <h3 className="font-display text-base font-semibold">What to do next</h3>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-mist-300">
          {meta.advice.map((a) => <li key={a} className="flex gap-3"><span className="text-mist-400" aria-hidden>–</span>{a}</li>)}
        </ul>
        <p className="mt-4 flex gap-2 text-xs leading-relaxed text-mist-400">
          <Info size={14} className="mt-0.5 shrink-0" aria-hidden />
          The model reads the URL’s structure only. It does not load the website or inspect its content.
        </p>
      </div>
    </article>
  )
}
