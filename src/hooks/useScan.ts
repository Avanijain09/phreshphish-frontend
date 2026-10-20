import { useCallback, useEffect, useRef, useState } from 'react'
import { ApiError, predictUrl, type PredictResponse } from '../lib/api'
import { SLOW_NOTICE_MS } from '../lib/config'

export type ScanState =
  | { status: 'idle' }
  | { status: 'loading'; url: string; slow: boolean }
  | { status: 'success'; url: string; result: PredictResponse }
  | { status: 'error'; url: string; error: ApiError }

export function useScan() {
  const [state, setState] = useState<ScanState>({ status: 'idle' })
  const ctl = useRef<AbortController | null>(null)

  useEffect(() => () => ctl.current?.abort(), [])

  const run = useCallback(async (url: string) => {
    ctl.current?.abort()
    const c = new AbortController()
    ctl.current = c
    setState({ status: 'loading', url, slow: false })
    const slow = setTimeout(() => setState((s) => (s.status === 'loading' ? { ...s, slow: true } : s)), SLOW_NOTICE_MS)
    try {
      const result = await predictUrl(url, c.signal)
      if (!c.signal.aborted) setState({ status: 'success', url, result })
    } catch (e) {
      if (c.signal.aborted) return
      setState({ status: 'error', url, error: e instanceof ApiError ? e : new ApiError('network', 'Something unexpected went wrong.') })
    } finally {
      clearTimeout(slow)
    }
  }, [])

  const reset = useCallback(() => {
    ctl.current?.abort()
    setState({ status: 'idle' })
  }, [])

  return { state, run, reset }
}
