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
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

function SubstituteModal({
  open,
  isEditMode,
  selectedRowId,
  initialFormData,
  preformTypesFiltered,
  preformError,
  saveError,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    if (open) setFormData(initialFormData)
  }, [open, initialFormData])

  const handleFormChange = (field) => (event) => {
    const { value } = event.target
    setFormData((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'idPreform' && (value === '1' || value === 1)) {
        next.dPreformIn = ''
      }
      return next
    })
  }

  if (!open) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="home-modal-title"
    >
      <DialogTitle id="home-modal-title" sx={{ pr: 6 }}>
        {isEditMode ? 'Редактирование переводника' : 'Добавление переводника'}
        <IconButton onClick={onClose} aria-label="Закрыть" sx={{ position: 'absolute', right: 12, top: 12 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Переводник</Typography>
          {isEditMode && (
            <Typography variant="body2" color="text.secondary">
              {selectedRowId}
            </Typography>
          )}
          </Box>

          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
            <Typography variant="body2">Наименование</Typography>
            <TextField size="small" value={formData.nmSub1} onChange={handleFormChange('nmSub1')} sx={{ width: 110 }} />
            <Typography color="text.secondary">-</Typography>
            <TextField size="small" value={formData.nmSub2} onChange={handleFormChange('nmSub2')} sx={{ width: 110 }} />
            <Typography color="text.secondary">-</Typography>
            <TextField size="small" value={formData.nmSub3} onChange={handleFormChange('nmSub3')} sx={{ width: 110 }} />
            <Typography color="text.secondary">/</Typography>
            <TextField size="small" value={formData.nmSub4} onChange={handleFormChange('nmSub4')} sx={{ width: 110 }} />
            <Typography color="text.secondary">-</Typography>
            <TextField size="small" value={formData.nmSub5} onChange={handleFormChange('nmSub5')} sx={{ width: 110 }} />
          </Stack>

          <TextField
            label="Диаметр наружный переводника, мм"
            type="number"
            size="small"
            value={formData.dSubstituteOut}
            onChange={handleFormChange('dSubstituteOut')}
          />
          <TextField
            label="Диаметр внутренний переводника, мм"
            type="number"
            size="small"
            value={formData.dSubstituteIn}
            onChange={handleFormChange('dSubstituteIn')}
          />
          <TextField
            label="Длина, мм переводника"
            type="number"
            size="small"
            value={formData.lSubstiute}
            onChange={handleFormChange('lSubstiute')}
          />

          <Typography variant="subtitle1" sx={{ fontWeight: 600, pt: 1 }}>Заготовка</Typography>

          <TextField
            select
            label="Наименование"
            size="small"
            value={formData.idPreform}
            onChange={handleFormChange('idPreform')}
            helperText={preformError || ''}
          >
            <MenuItem value="">Выберите тип</MenuItem>
            {preformTypesFiltered.map((item) => (
              <MenuItem key={item.idPreform} value={item.idPreform}>
                {item.nmPreform}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Диаметр наружный заготовки, мм"
            type="number"
            size="small"
            value={formData.dPreformOut}
            onChange={handleFormChange('dPreformOut')}
          />
          <TextField
            label="Диаметр внутренний заготовки, мм"
            type="number"
            size="small"
            value={formData.dPreformIn}
            onChange={handleFormChange('dPreformIn')}
            disabled={formData.idPreform === '1' || formData.idPreform === 1}
          />
          <TextField
            label="Длина, мм заготовки"
            type="number"
            size="small"
            value={formData.lPreform}
            onChange={handleFormChange('lPreform')}
          />
          <TextField
            label="Коэф. жесткости, ГПа"
            type="number"
            size="small"
            value={formData.ph}
            onChange={handleFormChange('ph')}
          />
          <TextField
            label="Масса заготовки"
            type="number"
            size="small"
            value={formData.massPreform}
            onChange={handleFormChange('massPreform')}
          />

          {saveError && <Alert severity="error">{saveError}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button type="button" variant="outlined">
          Переходы при изготовлении переводника
        </Button>
        <Box sx={{ flex: 1 }} />
        <Button type="button" variant="contained" startIcon={<Check fontSize="small" />} onClick={() => onSave(formData)}>
          Ок
        </Button>
        <Button type="button" variant="outlined" startIcon={<Close fontSize="small" />} onClick={onClose}>
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SubstituteModal
