const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api'

type ApiOptions = RequestInit & {
  json?: unknown
}

export async function apiRequest<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers = new Headers(options.headers)

  if (options.json !== undefined) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    body: options.json !== undefined ? JSON.stringify(options.json) : options.body,
  })

  const contentType = response.headers.get('content-type') ?? ''
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const message =
      typeof data === 'object' && data && 'message' in data
        ? String((data as { message?: string }).message ?? 'Request failed')
        : 'Request failed'
    throw new Error(message)
  }

  return data as T
}

export function getApiBase() {
  return API_BASE
}
