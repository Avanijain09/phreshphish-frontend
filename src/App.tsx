import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import ScanForm from './components/ScanForm'
import ResultPanel from './components/ResultPanel'
import { ErrorPanel, LoadingPanel } from './components/StatusPanels'
import { Footer, HowItWorks, Notices } from './components/Sections'
import { useHealth } from './hooks/useHealth'
import { useScan } from './hooks/useScan'
import { API_BASE_URL } from './lib/config'

export default function App() {
  const { state: health, refresh } = useHealth()
  const { state: scan, run } = useScan()
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scan.status !== 'idle') resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    if (scan.status === 'error') refresh()
  }, [scan.status]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="top">
      <Navbar health={health} onRefresh={refresh} />
      <main>
        <section className="mx-auto max-w-3xl px-5 pb-10 pt-16 sm:pt-24">
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            Know what a link is before you click it.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist-300">
            PhreshPhish scores a URL for phishing risk with a trained machine-learning model. It reads the structure of the address. It never opens the page.
          </p>
          <div className="mt-10">
            <ScanForm loading={scan.status === 'loading'} onScan={run} />
          </div>
        </section>

        <div ref={resultRef} className="mx-auto max-w-3xl scroll-mt-24 px-5 pb-6" aria-live="polite">
          {scan.status === 'loading' && <LoadingPanel url={scan.url} slow={scan.slow} />}
          {scan.status === 'error' && <ErrorPanel error={scan.error} onRetry={() => run(scan.url)} />}
          {scan.status === 'success' && <ResultPanel url={scan.url} result={scan.result} />}
        </div>

        <HowItWorks />
        <Notices apiBase={API_BASE_URL} />
      </main>
      <Footer />
    </div>
  )
}
