import Check from '@mui/icons-material/Check'
import Close from '@mui/icons-material/Close'
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

function HydrotestModal({
  open,
  isEditMode,
  selectedRowId,
  formData,
  saveError,
  onClose,
  onFormChange,
  onSave,
}) {
  if (!open) return null

  const titleEdit = 'Редактирование гидроиспытания'
  const titleAdd = 'Добавление гидроиспытания'

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" aria-labelledby="home-hydrotest-modal-title">
      <DialogTitle id="home-hydrotest-modal-title" sx={{ pr: 6 }}>
        {isEditMode ? titleEdit : titleAdd}
        <IconButton onClick={onClose} aria-label="Закрыть" sx={{ position: 'absolute', right: 12, top: 12 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Гидроиспытание</Typography>
          {isEditMode && (
            <Typography variant="body2" color="text.secondary">
              {selectedRowId}
            </Typography>
          )}
          </Box>

          <TextField label="Наименование" type="text" size="small" value={formData.nh} onChange={onFormChange('nh')} />
          <TextField label="Диаметр, мм" type="number" size="small" value={formData.d} onChange={onFormChange('d')} />
          <TextField label="Толщина стенки, мм" type="number" size="small" value={formData.th} onChange={onFormChange('th')} />
          <TextField label="Длина, мм" type="number" size="small" value={formData.l} onChange={onFormChange('l')} />
          <TextField label="Время на испытание, сек" type="number" size="small" value={formData.testtime} onChange={onFormChange('testtime')} />
          <TextField label="Масса, кг" type="number" size="small" value={formData.mass} onChange={onFormChange('mass')} />
          <TextField label="Длина резьбовой поверхности 1, мм" type="number" size="small" value={formData.l1} onChange={onFormChange('l1')} />
          <TextField label="Длина резьбовой поверхности 2, мм" type="number" size="small" value={formData.l2} onChange={onFormChange('l2')} />
          <TextField label="Норма времени, чел.ч" type="number" size="small" value={formData.nv} InputProps={{ readOnly: true }} />

          {saveError && <Alert severity="error">{saveError}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Box sx={{ flex: 1 }} />
        <Button type="button" variant="contained" startIcon={<Check fontSize="small" />} onClick={onSave}>
          Ок
        </Button>
        <Button type="button" variant="outlined" startIcon={<Close fontSize="small" />} onClick={onClose}>
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default HydrotestModal
