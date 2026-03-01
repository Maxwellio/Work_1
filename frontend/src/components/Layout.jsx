import { useNavigate } from 'react-router-dom'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useAuth } from '../context/AuthContext'

function Layout({ children }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
          <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
            Патрубки
          </Typography>
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {user.username}
            </Typography>
            <Button type="button" color="inherit" variant="outlined" onClick={handleLogout}>
              Выйти
            </Button>
          </Box>
        )}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, pt: 0, px: 3, pb: 3 }}>
        {children}
      </Box>
    </Box>
  )
}

export default Layout
