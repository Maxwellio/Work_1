export const API_BASE = '/api'

function withBase(path) {
  return `${API_BASE}${path}`
}

export async function request(path, options = {}) {
  const { headers = {}, ...rest } = options
  return fetch(withBase(path), {
    credentials: 'include',
    headers,
    ...rest,
  })
}

export async function requestJson(path, options = {}) {
  const res = await request(path, {
    headers: { Accept: 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }
  return res.json()
}

export function buildQuery(params) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value == null) return
    if (typeof value === 'string' && value.trim() === '') return
    query.set(key, String(value).trim())
  })
  const serialized = query.toString()
  return serialized ? `?${serialized}` : ''
}
