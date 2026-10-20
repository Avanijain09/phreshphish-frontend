import { Loader2, RefreshCw } from 'lucide-react'
import type { HealthState } from '../hooks/useHealth'

export default function HealthBadge({ health, onRefresh }: { health: HealthState; onRefresh: () => void }) {
  let dot = 'bg-amber-400'
  let label = 'Checking API…'
  let title = 'Checking GET /health'
  if (health.status === 'checking' && health.slow) label = 'Waking API…'
  if (health.status === 'ok') { dot = 'bg-mint-400'; label = 'API online'; title = 'Model loaded' }
  if (health.status === 'degraded') { dot = 'bg-amber-400'; label = 'Model not ready'; title = `model_status: ${health.modelStatus}` }
  if (health.status === 'down') { dot = 'bg-rose-400'; label = 'API unreachable'; title = health.message }

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-ink-600 bg-ink-800/80 py-1 pl-3 pr-1 text-xs text-mist-300" role="status" title={title}>
      {health.status === 'checking' ? <Loader2 size={12} className="animate-spin text-mist-400" aria-hidden /> : <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden />}
      <span>{label}</span>
      <button type="button" onClick={onRefresh} aria-label="Recheck API status" className="grid h-6 w-6 place-items-center rounded-full text-mist-400 transition-colors hover:bg-ink-600 hover:text-white">
        <RefreshCw size={12} aria-hidden />
      </button>
    </div>
  )
}
