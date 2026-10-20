export type UrlCheck = { ok: true; url: string } | { ok: false; message: string }

export function validateUrl(raw: string): UrlCheck {
  const value = raw.trim()
  if (!value) return { ok: false, message: 'Enter a URL to scan.' }
  if (value.length > 2048) return { ok: false, message: 'This URL is longer than 2,048 characters. Paste a shorter one.' }
  if (/\s/.test(value)) return { ok: false, message: 'Remove spaces from the URL.' }
  if (!/^https?:\/\//i.test(value)) return { ok: false, message: 'Start the URL with http:// or https://.' }
  let parsed: URL
  try {
    parsed = new URL(value)
  } catch {
    return { ok: false, message: 'This does not look like a valid URL. Check it and try again.' }
  }
  if (!parsed.hostname.includes('.') && !parsed.hostname.includes(':')) {
    return { ok: false, message: 'The URL needs a full domain name, such as example.com.' }
  }
  return { ok: true, url: value }
}

export interface UrlParts {
  scheme: string
  host: string
  rest: string
  hostLabels: number
  pathLength: number
  queryParams: number
  ipHost: boolean
}

/** Pure client-side breakdown of the entered address. No network involved. */
export function parseParts(value: string): UrlParts | null {
  try {
    const u = new URL(value.trim())
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null
    const host = u.host
    const afterHost = value.trim().slice(value.trim().indexOf(host) + host.length)
    return {
      scheme: u.protocol + '//',
      host,
      rest: afterHost,
      hostLabels: u.hostname.split('.').length,
      pathLength: u.pathname === '/' ? 0 : u.pathname.length,
      queryParams: Array.from(u.searchParams.keys()).length,
      ipHost: /^\d{1,3}(\.\d{1,3}){3}$/.test(u.hostname) || u.hostname.startsWith('['),
    }
  } catch {
    return null
  }
}
