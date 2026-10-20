import { API_BASE_URL, REQUEST_TIMEOUT_MS } from './config'

export type Verdict = 'phishing' | 'benign' | 'uncertain'

export interface PredictResponse {
  verdict: Verdict
  risk_score: number
  confidence: number | string | null
  evidence: string[]
  explanation: string
}

export interface HealthResponse {
  status: string
  model_status: string
}

export type ApiErrorKind = 'network' | 'timeout' | 'http' | 'invalid'

export class ApiError extends Error {
  kind: ApiErrorKind
  status?: number
  constructor(kind: ApiErrorKind, message: string, status?: number) {
    super(message)
    this.kind = kind
    this.status = status
  }
}

async function request(path: string, init: RequestInit, external?: AbortSignal): Promise<unknown> {
  const controller = new AbortController()
  let timedOut = false
  const timer = setTimeout(() => {
    timedOut = true
    controller.abort()
  }, REQUEST_TIMEOUT_MS)
  const onExternalAbort = () => controller.abort()
  external?.addEventListener('abort', onExternalAbort)

  try {
    let res: Response
    try {
      res = await fetch(`${API_BASE_URL}${path}`, { ...init, signal: controller.signal })
    } catch (e) {
      if (timedOut) throw new ApiError('timeout', 'The API did not respond in time.')
      if (external?.aborted) throw e
      throw new ApiError('network', 'Could not reach the API.')
    }

    if (!res.ok) {
      let detail = ''
      try {
        const body = await res.json()
        if (typeof body?.detail === 'string') detail = body.detail
        else if (Array.isArray(body?.detail) && typeof body.detail[0]?.msg === 'string') detail = body.detail[0].msg
      } catch {
        /* body was not JSON */
      }
      throw new ApiError('http', detail || `The API returned HTTP ${res.status}.`, res.status)
    }

    try {
      return await res.json()
    } catch {
      throw new ApiError('invalid', 'The API response was not valid JSON.')
    }
  } finally {
    clearTimeout(timer)
    external?.removeEventListener('abort', onExternalAbort)
  }
}

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null

export async function checkHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const data = await request('/health', { method: 'GET', headers: { Accept: 'application/json' } }, signal)
  if (!isRecord(data) || typeof data.status !== 'string' || typeof data.model_status !== 'string') {
    throw new ApiError('invalid', 'Unexpected health response format.')
  }
  return { status: data.status, model_status: data.model_status }
}

function parsePrediction(data: unknown): PredictResponse {
  const bad = (why: string) => new ApiError('invalid', `Unexpected prediction response (${why}).`)
  if (!isRecord(data)) throw bad('not an object')
  const { verdict, risk_score, confidence, evidence, explanation } = data
  if (verdict !== 'phishing' && verdict !== 'benign' && verdict !== 'uncertain') throw bad('unknown verdict')
  if (typeof risk_score !== 'number' || !Number.isFinite(risk_score) || risk_score < 0 || risk_score > 100) {
    throw bad('risk_score out of range')
  }
  if (evidence !== undefined && evidence !== null && (!Array.isArray(evidence) || evidence.some((e) => typeof e !== 'string'))) {
    throw bad('evidence is not a list of strings')
  }
  return {
    verdict,
    risk_score,
    confidence: typeof confidence === 'number' || typeof confidence === 'string' ? confidence : null,
    evidence: (evidence as string[] | undefined | null) ?? [],
    explanation: typeof explanation === 'string' ? explanation : '',
  }
}

export async function predictUrl(url: string, signal?: AbortSignal): Promise<PredictResponse> {
  const data = await request(
    '/predict',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ url }),
    },
    signal,
  )
  return parsePrediction(data)
}
