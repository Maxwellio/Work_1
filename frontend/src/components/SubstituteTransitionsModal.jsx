import { useEffect, useState } from 'react'
import Close from '@mui/icons-material/Close'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { getSubstituteTransitions } from '../api/substitutesApi'

const COLUMNS = [
  { key: 'seqNumOper', label: '№' },
  { key: 'nmOperations', label: 'Переход' },
  { key: 'd', label: 'Диам. наруж. мм' },
  { key: 'lCalc', label: 'Длина обраб. Поверх. мм' },
  { key: 'valueMeas', label: 'Измер. велич. мм' },
  { key: 'depthCut', label: 'Глубина резания мм' },
  { key: 'i', label: 'Число проходов' },
  { key: 's', label: 'Подача мм/об' },
  { key: 'n', label: 'Обороты шп. мм' },
  { key: 'vRez', label: 'Vрез м/мин' },
  { key: 'tMach', label: 'Tмаш м/мин' },
  { key: 'tVp', label: 'Tвсп мин' },
  { key: 'tSum', label: 'Tобщ мин' },
]

function SubstituteTransitionsModal({
  open,
  onClose,
  idSubstitutePrepared,
  substituteName,
}) {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!open || idSubstitutePrepared == null) {
      setList([])
      setError(null)
      return
    }
    setLoading(true)
    setError(null)
    getSubstituteTransitions(idSubstitutePrepared)
      .then(setList)
      .catch((e) => setError(e.message || 'Ошибка загрузки'))
      .finally(() => setLoading(false))
  }, [open, idSubstitutePrepared])

  const formatCell = (value) => (value == null ? '—' : String(value))

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" aria-labelledby="substitute-transitions-modal-title">
      <DialogTitle id="substitute-transitions-modal-title" sx={{ pr: 6 }}>
        Переходы по переводнику {substituteName ?? ''}
        <IconButton onClick={onClose} aria-label="Закрыть" sx={{ position: 'absolute', right: 12, top: 12 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TableContainer component={Paper} sx={{ minHeight: 200 }}>
          {loading && (
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size={24} />
            </Box>
          )}
          {error && <Alert severity="error" sx={{ m: 1 }}>{error}</Alert>}
          {!loading && !error && (
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  {COLUMNS.map((col) => (
                    <TableCell key={col.key} sx={{ fontWeight: 600 }}>
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((row, idx) => (
                  <TableRow key={idx} hover>
                    {COLUMNS.map((col) => (
                      <TableCell key={col.key}>{formatCell(row[col.key])}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button type="button" variant="outlined" onClick={() => {}}>
          Добавить переход
        </Button>
        <Button type="button" variant="outlined" onClick={() => {}}>
          Изменить переход
        </Button>
        <Box sx={{ flex: 1 }} />
        <Button type="button" variant="outlined" startIcon={<Close fontSize="small" />} onClick={onClose}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SubstituteTransitionsModal
