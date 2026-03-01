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

function FittingModal({
  open,
  isEditMode,
  selectedRowId,
  initialFormData,
  preformTypesFiltered,
  partyList,
  preformError,
  saveError,
  onClose,
  onSave,
  tip,
}) {
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    if (open) setFormData(initialFormData)
  }, [open, initialFormData])

  const handleFormChange = (field) => (event) => {
    const { value } = event.target
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!open) return null

  const isPatrubok = tip === 1
  const label = isPatrubok ? 'Патрубок' : 'Труба'
  const titleEdit = isPatrubok ? 'Редактирование патрубка' : 'Редактирование трубы'
  const titleAdd = isPatrubok ? 'Добавление патрубка' : 'Добавление трубы'
  const transitionsLabel = isPatrubok
    ? 'Переходы при изготовлении патрубка'
    : 'Переходы при изготовлении трубы'

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" aria-labelledby="home-fitting-modal-title">
      <DialogTitle id="home-fitting-modal-title" sx={{ pr: 6 }}>
        {isEditMode ? titleEdit : titleAdd}
        <IconButton onClick={onClose} aria-label="Закрыть" sx={{ position: 'absolute', right: 12, top: 12 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{label}</Typography>
          {isEditMode && (
            <Typography variant="body2" color="text.secondary">
              {selectedRowId}
            </Typography>
          )}
          </Box>

          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
            <Typography variant="body2">Наименование</Typography>
            <TextField size="small" value={formData.nm} onChange={handleFormChange('nm')} sx={{ width: 160 }} />
            <Typography color="text.secondary">-</Typography>
            <TextField
              type="number"
              size="small"
              value={formData.d}
              onChange={handleFormChange('d')}
              sx={{ width: 110 }}
            />
                {isPatrubok && (
                  <>
                <Typography color="text.secondary">x</Typography>
                <TextField
                      type="number"
                      size="small"
                      value={formData.th}
                      onChange={handleFormChange('th')}
                      sx={{ width: 110 }}
                    />
                  </>
                )}
          </Stack>

          <TextField label="Длина, мм" type="number" size="small" value={formData.l} onChange={handleFormChange('l')} />
          <TextField label="Масса, кг" type="number" size="small" value={formData.mass} onChange={handleFormChange('mass')} />

            {isPatrubok && (
              <>
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
              label="Длина, мм"
              type="number"
              size="small"
              value={formData.lPreform}
              onChange={handleFormChange('lPreform')}
            />
              </>
            )}

          <TextField
            label="Коэф. жесткости, ГПа"
            type="number"
            size="small"
            value={formData.phPreform}
            onChange={handleFormChange('phPreform')}
          />
          <TextField
            label="Наибольший диаметр изделия"
            type="number"
            size="small"
            value={formData.dStan}
            onChange={handleFormChange('dStan')}
          />

          <TextField
            select
            label="Количество деталей в партии, шт."
            size="small"
            value={formData.cnt ?? ''}
            onChange={handleFormChange('cnt')}
          >
            <MenuItem value="">Выберите</MenuItem>
                {partyList.map((item) => (
              <MenuItem key={item.colParty} value={item.colParty}>
                    {item.colParty}
              </MenuItem>
                ))}
          </TextField>

          {saveError && <Alert severity="error">{saveError}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button type="button" variant="outlined">{transitionsLabel}</Button>
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

export default FittingModal
