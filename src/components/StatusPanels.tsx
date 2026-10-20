import { Loader2, RefreshCw, TriangleAlert } from 'lucide-react'
import type { ApiError } from '../lib/api'

export function LoadingPanel({ url, slow }: { url: string; slow: boolean }) {
  return (
    <div className="animate-rise rounded-2xl border border-ink-600 bg-ink-800/90 p-6" role="status" aria-live="polite">
      <div className="flex items-center gap-3">
        <Loader2 size={20} className="animate-spin text-mint-300" aria-hidden />
        <p className="font-display text-lg font-semibold">Analysing URL structure…</p>
      </div>
      <p className="mt-3 break-all font-mono text-xs text-mist-400">{url}</p>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-ink-600" aria-hidden>
        <div className="h-full w-1/4 animate-sweep rounded-full bg-mint-400" />
      </div>
      {slow && <p className="mt-4 text-sm text-mist-300">This is taking longer than usual. The API may be waking up from idle, which can take up to a minute.</p>}
    </div>
  )
}

const TITLES: Record<ApiError['kind'], string> = {
  network: 'Could not reach the API',
  timeout: 'The API timed out',
  http: 'The API rejected the request',
  invalid: 'The API sent an unexpected response',
}

export function ErrorPanel({ error, onRetry }: { error: ApiError; onRetry: () => void }) {
  return (
    <div className="animate-rise rounded-2xl border border-rose-400/40 bg-rose-400/5 p-6" role="alert">
      <div className="flex items-start gap-3">
        <TriangleAlert size={22} className="mt-0.5 shrink-0 text-rose-300" aria-hidden />
        <div>
          <h2 className="font-display text-lg font-semibold text-rose-200">{TITLES[error.kind]}</h2>
          <p className="mt-1 text-sm text-mist-100">{error.message}{error.status ? ` (HTTP ${error.status})` : ''}</p>
          {error.kind === 'network' && <p className="mt-2 text-sm text-mist-300">Check your connection and the API status above. If the API is online and this keeps happening, the browser may be blocking the request because of CORS. See the README for the backend fix.</p>}
          {error.kind === 'timeout' && <p className="mt-2 text-sm text-mist-300">The server may still be starting up. Try again in a moment.</p>}
          <button type="button" onClick={onRetry} className="mt-4 inline-flex items-center gap-2 rounded-lg border border-ink-500 px-3.5 py-2 text-sm font-medium transition-colors hover:border-mint-400/60 hover:text-mint-300">
            <RefreshCw size={14} aria-hidden /> Try again
          </button>
        </div>
      </div>
    </div>
  )
}
