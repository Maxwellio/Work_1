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
  formData,
  preformTypesFiltered,
  preformError,
  saveError,
  onClose,
  onFormChange,
  onSave,
}) {
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
            <TextField size="small" value={formData.nmSub1} onChange={onFormChange('nmSub1')} sx={{ width: 110 }} />
            <Typography color="text.secondary">-</Typography>
            <TextField size="small" value={formData.nmSub2} onChange={onFormChange('nmSub2')} sx={{ width: 110 }} />
            <Typography color="text.secondary">-</Typography>
            <TextField size="small" value={formData.nmSub3} onChange={onFormChange('nmSub3')} sx={{ width: 110 }} />
            <Typography color="text.secondary">/</Typography>
            <TextField size="small" value={formData.nmSub4} onChange={onFormChange('nmSub4')} sx={{ width: 110 }} />
            <Typography color="text.secondary">-</Typography>
            <TextField size="small" value={formData.nmSub5} onChange={onFormChange('nmSub5')} sx={{ width: 110 }} />
          </Stack>

          <TextField
            label="Диаметр наружный переводника, мм"
            type="number"
            size="small"
            value={formData.dSubstituteOut}
            onChange={onFormChange('dSubstituteOut')}
          />
          <TextField
            label="Диаметр внутренний переводника, мм"
            type="number"
            size="small"
            value={formData.dSubstituteIn}
            onChange={onFormChange('dSubstituteIn')}
          />
          <TextField
            label="Длина, мм переводника"
            type="number"
            size="small"
            value={formData.lSubstiute}
            onChange={onFormChange('lSubstiute')}
          />

          <Typography variant="subtitle1" sx={{ fontWeight: 600, pt: 1 }}>Заготовка</Typography>

          <TextField
            select
            label="Наименование"
            size="small"
            value={formData.idPreform}
            onChange={onFormChange('idPreform')}
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
            onChange={onFormChange('dPreformOut')}
          />
          <TextField
            label="Диаметр внутренний заготовки, мм"
            type="number"
            size="small"
            value={formData.dPreformIn}
            onChange={onFormChange('dPreformIn')}
            disabled={formData.idPreform === '1' || formData.idPreform === 1}
          />
          <TextField
            label="Длина, мм заготовки"
            type="number"
            size="small"
            value={formData.lPreform}
            onChange={onFormChange('lPreform')}
          />
          <TextField
            label="Коэф. жесткости, ГПа"
            type="number"
            size="small"
            value={formData.ph}
            onChange={onFormChange('ph')}
          />
          <TextField
            label="Масса заготовки"
            type="number"
            size="small"
            value={formData.massPreform}
            onChange={onFormChange('massPreform')}
          />

          {saveError && <Alert severity="error">{saveError}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button type="button" variant="outlined">
          Переходы при изготовлении переводника
        </Button>
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

export default SubstituteModal
