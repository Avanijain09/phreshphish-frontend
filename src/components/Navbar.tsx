import { ShieldCheck } from 'lucide-react'
import HealthBadge from './HealthBadge'
import type { HealthState } from '../hooks/useHealth'

export default function Navbar({ health, onRefresh }: { health: HealthState; onRefresh: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-ink-600/60 bg-ink-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#top" className="flex items-center gap-2.5 rounded-md">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-mint-400/30 bg-mint-400/10 text-mint-300">
            <ShieldCheck size={19} aria-hidden />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">PhreshPhish</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-7 text-sm text-mist-300 md:flex">
          <a className="transition-colors hover:text-white" href="#top">Scan</a>
          <a className="transition-colors hover:text-white" href="#how">How it works</a>
          <a className="transition-colors hover:text-white" href="#privacy">Privacy</a>
        </nav>
        <HealthBadge health={health} onRefresh={onRefresh} />
      </div>
    </header>
  )
}
