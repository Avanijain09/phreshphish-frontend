import { useId, useState, type FormEvent } from 'react'
import { AlertCircle, Loader2, ScanLine } from 'lucide-react'
import { validateUrl } from '../lib/url'
import UrlAnatomy from './UrlAnatomy'

export default function ScanForm({ loading, onScan }: { loading: boolean; onScan: (url: string) => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const id = useId()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (loading) return
    const check = validateUrl(value)
    if (!check.ok) return setError(check.message)
    setError(null)
    onScan(check.url)
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <label htmlFor={id} className="block text-sm font-medium text-mist-300">URL to scan</label>
      <div className={`flex flex-col gap-2 rounded-2xl border bg-ink-800/90 p-2 shadow-[0_0_60px_-20px_rgba(52,211,164,0.35)] transition-colors sm:flex-row ${error ? 'border-rose-400/60' : 'border-ink-600 focus-within:border-mint-400/60'}`}>
        <input
          id={id}
          type="text"
          inputMode="url"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          value={value}
          onChange={(e) => { setValue(e.target.value); if (error) setError(null) }}
          placeholder="https://example.com/account/verify"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3.5 font-mono text-[15px] text-white placeholder:text-mist-400/70 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-mint-400 px-6 py-3.5 font-display text-[15px] font-semibold text-ink-950 transition hover:bg-mint-300 disabled:cursor-wait disabled:opacity-70"
        >
          {loading ? <Loader2 size={18} className="animate-spin" aria-hidden /> : <ScanLine size={18} aria-hidden />}
          {loading ? 'Scanning…' : 'Scan URL'}
        </button>
      </div>
      {error && (
        <p id={`${id}-err`} role="alert" className="flex items-start gap-2 text-sm text-rose-300">
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
      {!error && value.trim() && <UrlAnatomy value={value} />}
    </form>
  )
}
