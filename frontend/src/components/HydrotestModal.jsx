import { useEffect, useState } from 'react'
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
  onSave,
}) {
  const [localFormData, setLocalFormData] = useState(() => ({ ...formData }))

  useEffect(() => {
    if (open) {
      setLocalFormData({ ...formData })
    }
  }, [formData, open])

  const handleFormChange = (field) => (event) => {
    const { value } = event.target
    setLocalFormData((prev) => ({ ...prev, [field]: value }))
  }

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

          <TextField label="Наименование" type="text" size="small" value={localFormData.nh} onChange={handleFormChange('nh')} />
          <TextField label="Диаметр, мм" type="number" size="small" value={localFormData.d} onChange={handleFormChange('d')} />
          <TextField label="Толщина стенки, мм" type="number" size="small" value={localFormData.th} onChange={handleFormChange('th')} />
          <TextField label="Длина, мм" type="number" size="small" value={localFormData.l} onChange={handleFormChange('l')} />
          <TextField label="Время на испытание, сек" type="number" size="small" value={localFormData.testtime} onChange={handleFormChange('testtime')} />
          <TextField label="Масса, кг" type="number" size="small" value={localFormData.mass} onChange={handleFormChange('mass')} />
          <TextField label="Длина резьбовой поверхности 1, мм" type="number" size="small" value={localFormData.l1} onChange={handleFormChange('l1')} />
          <TextField label="Длина резьбовой поверхности 2, мм" type="number" size="small" value={localFormData.l2} onChange={handleFormChange('l2')} />
          <TextField label="Норма времени, чел.ч" type="number" size="small" value={localFormData.nv} InputProps={{ readOnly: true }} />

          {saveError && <Alert severity="error">{saveError}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Box sx={{ flex: 1 }} />
        <Button
          type="button"
          variant="contained"
          startIcon={<Check fontSize="small" />}
          onClick={() => onSave(localFormData)}
        >
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
