import { useCallback, useEffect, useRef, useState } from 'react'
import { ApiError, checkHealth } from '../lib/api'
import { SLOW_NOTICE_MS } from '../lib/config'

export type HealthState =
  | { status: 'checking'; slow: boolean }
  | { status: 'ok' }
  | { status: 'degraded'; modelStatus: string }
  | { status: 'down'; message: string }

export function useHealth() {
  const [state, setState] = useState<HealthState>({ status: 'checking', slow: false })
  const ctl = useRef<AbortController | null>(null)

  const refresh = useCallback(async () => {
    ctl.current?.abort()
    const c = new AbortController()
    ctl.current = c
    setState({ status: 'checking', slow: false })
    const slow = setTimeout(() => setState((s) => (s.status === 'checking' ? { status: 'checking', slow: true } : s)), SLOW_NOTICE_MS)
    try {
      const h = await checkHealth(c.signal)
      if (c.signal.aborted) return
      setState(h.status === 'ok' && h.model_status === 'loaded' ? { status: 'ok' } : { status: 'degraded', modelStatus: h.model_status })
    } catch (e) {
      if (c.signal.aborted) return
      setState({ status: 'down', message: e instanceof ApiError ? e.message : 'Health check failed.' })
    } finally {
      clearTimeout(slow)
    }
  }, [])

  useEffect(() => {
    void refresh()
    return () => ctl.current?.abort()
  }, [refresh])

  return { state, refresh }
}
