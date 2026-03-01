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
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

function TransitionsRefModal({
  open,
  onClose,
  groups,
  operations,
  selectedGroupId,
  onSelectGroup,
  loadingGroups,
  loadingOperations,
  errorGroups,
  errorOperations,
}) {

  if (!open) return null

  const formatCell = (value) => (value == null ? '—' : String(value))
  const groupsSorted = [...groups].sort((a, b) => (a.idGroupOperations ?? 0) - (b.idGroupOperations ?? 0))
  const operationsSorted = [...operations].sort((a, b) => (a.idOperations ?? 0) - (b.idOperations ?? 0))

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" aria-labelledby="transitions-ref-modal-title">
      <DialogTitle id="transitions-ref-modal-title" sx={{ pr: 6 }}>
        Справочник переходов
        <IconButton onClick={onClose} aria-label="Закрыть" sx={{ position: 'absolute', right: 12, top: 12 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ minHeight: 460 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Группа</Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 560 }}>
              {loadingGroups && (
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}><CircularProgress size={24} /></Box>
              )}
              {errorGroups && <Alert severity="error" sx={{ m: 1 }}>{errorGroups}</Alert>}
              {!loadingGroups && !errorGroups && (
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Группа</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groupsSorted.map((g) => (
                      <TableRow
                        key={g.idGroupOperations}
                        hover
                        selected={selectedGroupId === g.idGroupOperations}
                        onClick={() =>
                          onSelectGroup(selectedGroupId === g.idGroupOperations ? null : g.idGroupOperations)
                        }
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>{formatCell(g.nmGroupOperations)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          </Box>

          <Box sx={{ flex: 1.5, minWidth: 0 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Операции</Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 560 }}>
              {selectedGroupId == null && !loadingOperations && (
                <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>Выберите группу слева</Box>
              )}
              {loadingOperations && (
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}><CircularProgress size={24} /></Box>
              )}
              {errorOperations && <Alert severity="error" sx={{ m: 1 }}>{errorOperations}</Alert>}
              {!loadingOperations && !errorOperations && selectedGroupId != null && (
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Наименование перехода</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Tk, мин</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {operationsSorted.map((op) => (
                      <TableRow key={op.idOperations} hover>
                        <TableCell>{formatCell(op.nmOperations)}</TableCell>
                        <TableCell>{formatCell(op.tk)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Box sx={{ flex: 1 }} />
        <Button type="button" variant="outlined" startIcon={<Close fontSize="small" />} onClick={onClose}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TransitionsRefModal
