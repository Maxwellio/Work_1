import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login as apiLogin } from '../api'
import './Login.css'

/**
 * Страница входа: форма логин/пароль, вызов POST /api/login (form-urlencoded),
 * после успеха — getCurrentUser и редирект на /.
 */
function Login() {
  const navigate = useNavigate()
  const { user, fetchUser } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    return <Navigate to="/" replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await apiLogin(username.trim(), password)
      if (!res.ok) {
        if (res.status === 401) {
          setError('Неверный логин или пароль')
        } else {
          setError('Ошибка входа. Попробуйте позже.')
        }
        return
      }
      await fetchUser()
      navigate('/', { replace: true })
    } catch (err) {
      setError('Ошибка соединения. Проверьте подключение.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Вход</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            Логин
            <input
              type="text"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              disabled={submitting}
            />
          </label>
          <label className="login-label">
            Пароль
            <input
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={submitting}
            />
          </label>
          <p className="login-hint">Проверяйте вводимые данные</p>
          {error && <p className="login-error" role="alert">{error}</p>}
          <button type="submit" className="login-submit" disabled={submitting}>
            {submitting ? 'Вход…' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
