/**
 * API-слой: login, getCurrentUser, logout. Запросы с credentials: 'include' для cookie (JSESSIONID).
 */

const API_BASE = '/api';

/**
 * POST /api/login — form login (application/x-www-form-urlencoded).
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Response>} ответ сервера (проверять res.ok, res.status)
 */
export async function login(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username, password }).toString(),
  })
  return res
}

/**
 * GET /api/current-user — текущий пользователь по сессии.
 * @returns {Promise<{ username: string, roles: string[] } | null>} user или null при 401
 */
export async function getCurrentUser() {
  const res = await fetch(`${API_BASE}/current-user`, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' },
  })
  if (res.status === 401) return null
  if (!res.ok) throw new Error('getCurrentUser failed: ' + res.status)
  return res.json()
}

/**
 * POST /api/logout — инвалидация сессии.
 */
export async function logout() {
  const res = await fetch(`${API_BASE}/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error('logout failed: ' + res.status)
  return res.json()
}
