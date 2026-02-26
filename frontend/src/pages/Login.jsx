import { useNavigate, Navigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { useLogin } from '../hooks/useLogin'

/**
 * Страница входа: форма логин/пароль, вызов POST /api/login (form-urlencoded),
 * после успеха — getCurrentUser и редирект на /.
 * При заходе на /login авторизованного пользователя — проверка сессии и редирект на главную.
 */
function Login() {
  const navigate = useNavigate()
  const { user, fetchUser } = useAuth()
  const {
    username,
    password,
    error,
    submitting,
    sessionChecked,
    setUsername,
    setPassword,
    handleSubmit,
  } = useLogin(fetchUser, navigate)

  if (!sessionChecked) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Card sx={{ width: '100%', maxWidth: 360 }}>
          <CardContent>
            <Stack spacing={1.5} alignItems="center">
              <CircularProgress size={24} />
              <Typography color="text.secondary">Проверка авторизации...</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    )
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 360 }}>
        <CardContent>
          <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 600 }}>
            Вход
          </Typography>
          <Stack component="form" spacing={2} onSubmit={handleSubmit}>
            <TextField
              label="Логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              disabled={submitting}
              size="small"
            />
            <TextField
              type="password"
              label="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={submitting}
              size="small"
            />
            <Typography variant="body2" color="text.secondary">
              Проверяйте вводимые данные
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? 'Вход...' : 'Войти'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Login
