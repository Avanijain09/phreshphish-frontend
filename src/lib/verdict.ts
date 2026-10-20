import type { Verdict } from './api'

export interface VerdictMeta {
  label: string
  headline: string
  advice: string[]
  text: string
  border: string
  soft: string
  fill: string
}

export const VERDICTS: Record<Verdict, VerdictMeta> = {
  phishing: {
    label: 'Potential phishing',
    headline: 'The model found signs of phishing in this URL.',
    advice: [
      'Do not open the link or enter any passwords, codes or card details.',
      'If you already did, change that account’s password and turn on two-factor authentication.',
      'Report it to your IT team, bank or the impersonated service, then delete the message.',
    ],
    text: 'text-rose-300',
    border: 'border-rose-400/40',
    soft: 'bg-rose-400/10',
    fill: 'bg-rose-400',
  },
  benign: {
    label: 'Likely benign',
    headline: 'The model found no strong phishing signals in this URL.',
    advice: [
      'This is not a guarantee of safety. Only the address was analysed, not the page behind it.',
      'Be cautious if the link arrived unexpectedly or asks you to sign in or pay.',
      'For banking and work accounts, type the official address yourself or use a saved bookmark.',
    ],
    text: 'text-mint-300',
    border: 'border-mint-400/40',
    soft: 'bg-mint-400/10',
    fill: 'bg-mint-400',
  },
  uncertain: {
    label: 'Uncertain result',
    headline: 'The model could not reach a clear decision on this URL.',
    advice: [
      'Treat the link with caution until you can verify it another way.',
      'Contact the sender through a separate, trusted channel to confirm they sent it.',
      'Avoid entering credentials. Navigate to the official site directly instead.',
    ],
    text: 'text-amber-300',
    border: 'border-amber-400/40',
    soft: 'bg-amber-400/10',
    fill: 'bg-amber-400',
  },
}

/** Values 0–1 are treated as fractions; values above 1 (up to 100) as percentages. */
export function toPercent(value: number): number {
  return Math.min(100, Math.max(0, value <= 1 ? value * 100 : value))
}

export function formatPercent(value: number): string {
  const p = toPercent(value)
  return `${p % 1 === 0 ? p.toFixed(0) : p.toFixed(1)}%`
}
