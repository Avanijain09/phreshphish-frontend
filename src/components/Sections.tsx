import { Eye, Lock, ScanLine, Scale, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'

function Card({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink-600/80 bg-ink-800/60 p-6">
      <span className="grid h-10 w-10 place-items-center rounded-lg border border-mint-400/25 bg-mint-400/10 text-mint-300">{icon}</span>
      <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-mist-300">{children}</div>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-16">
      <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">What a scan does, and what it does not</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card icon={<ScanLine size={20} aria-hidden />} title="Reads the address">
          The trained model analyses the structure of the URL you submit: its domain, path and query pattern.
        </Card>
        <Card icon={<Eye size={20} aria-hidden />} title="Never opens the page">
          It does not fetch the website or inspect its live HTML, so it cannot see page content, forms or redirects.
        </Card>
        <Card icon={<ShieldCheck size={20} aria-hidden />} title="Returns a verdict with evidence">
          You get a verdict, a model risk score, supporting evidence and a written explanation. The score is not a calibrated probability.
        </Card>
      </div>
    </section>
  )
}

export function Notices({ apiBase }: { apiBase: string }) {
  return (
    <section id="privacy" className="mx-auto max-w-6xl px-5 pb-20">
      <div className="grid gap-4 md:grid-cols-2">
        <Card icon={<Lock size={20} aria-hidden />} title="Privacy">
          The URL you enter is sent to the PhreshPhish API ({apiBase}) for analysis. Do not scan links that contain passwords, session tokens, password-reset codes or other private details in the address.
        </Card>
        <Card icon={<Scale size={20} aria-hidden />} title="Responsible use">
          PhreshPhish is an educational and decision-support tool, not a security guarantee. It can be wrong in both directions. Use it alongside your own judgement and your organisation’s security guidance, and only scan URLs you are entitled to check.
        </Card>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-ink-600/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-mist-400 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-mist-300">
          <ShieldCheck size={16} className="text-mint-300" aria-hidden />
          <span className="font-display font-semibold">PhreshPhish</span>
          <span>URL phishing detection</span>
        </div>
        <p>A machine-learning engineering project. Results are advisory only.</p>
      </div>
    </footer>
  )
}
