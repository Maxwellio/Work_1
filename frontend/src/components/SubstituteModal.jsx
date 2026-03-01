import { useEffect, useState } from 'react'
import Check from '@mui/icons-material/Check'
import Close from '@mui/icons-material/Close'
import '../styles/SubstituteModal.css'

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
<<<<<<< Updated upstream
    <div
      className="home-modal"
      role="dialog"
      aria-modal="true"
=======
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
>>>>>>> Stashed changes
      aria-labelledby="home-modal-title"
      title={isEditMode ? 'Редактирование переводника' : 'Добавление переводника'}
    >
<<<<<<< Updated upstream
      <div className="home-modal__backdrop" onClick={onClose} />
      <div className="home-modal__panel" onClick={(e) => e.stopPropagation()}>
        <div className="home-modal__header">
          <h2 id="home-modal-title" className="home-modal__title">
            {isEditMode ? 'Редактирование переводника' : 'Добавление переводника'}
          </h2>
          <button
            type="button"
            className="home-modal__close"
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>
        <div className="home-modal__subheader">
          <span className="home-modal__subheader-label">Переводник</span>
          {isEditMode && (
            <span className="home-modal__id" aria-hidden="true">
              {selectedRowId}
            </span>
          )}
        </div>

        <div className="home-modal__body">
          <div className="home-modal__section">
            <div className="home-modal__name-row">
              <span className="home-modal__name-label">Наименование</span>
              <div className="home-modal__name-inputs">
                <input
                  type="text"
                  className="home-modal__name-inp"
                  value={formData.nmSub1}
                  onChange={onFormChange('nmSub1')}
                  aria-label="nm1"
                />
                <span className="home-modal__name-sep">-</span>
                <input
                  type="text"
                  className="home-modal__name-inp"
                  value={formData.nmSub2}
                  onChange={onFormChange('nmSub2')}
                  aria-label="nm2"
                />
                <span className="home-modal__name-sep">-</span>
                <input
                  type="text"
                  className="home-modal__name-inp"
                  value={formData.nmSub3}
                  onChange={onFormChange('nmSub3')}
                  aria-label="nm3"
                />
                <span className="home-modal__name-sep">/</span>
                <input
                  type="text"
                  className="home-modal__name-inp"
                  value={formData.nmSub4}
                  onChange={onFormChange('nmSub4')}
                  aria-label="nm4"
                />
                <span className="home-modal__name-sep">-</span>
                <input
                  type="text"
                  className="home-modal__name-inp"
                  value={formData.nmSub5}
                  onChange={onFormChange('nmSub5')}
                  aria-label="nm5"
                />
              </div>
            </div>

            <label className="home-modal__field">
              <span>Диаметр наружный переводника, мм</span>
              <input
                type="number"
                value={formData.dSubstituteOut}
                onChange={onFormChange('dSubstituteOut')}
              />
            </label>
            <label className="home-modal__field">
              <span>Диаметр внутренний переводника, мм</span>
              <input
                type="number"
                value={formData.dSubstituteIn}
                onChange={onFormChange('dSubstituteIn')}
              />
            </label>
            <label className="home-modal__field">
              <span>Длина, мм переводника</span>
              <input
                type="number"
                value={formData.lSubstiute}
                onChange={onFormChange('lSubstiute')}
              />
            </label>

            <h3 className="home-modal__section-title">Заготовка</h3>

            <label className="home-modal__field">
              <span>Наименование</span>
              <select value={formData.idPreform} onChange={onFormChange('idPreform')}>
                <option value="">Выберите тип</option>
                {preformTypesFiltered.map((item) => (
                  <option key={item.idPreform} value={item.idPreform}>
                    {item.nmPreform}
                  </option>
                ))}
              </select>
              {preformError && (
                <span className="home-modal__hint">{preformError}</span>
              )}
            </label>
            <label className="home-modal__field">
              <span>Диаметр наружный заготовки, мм</span>
              <input
                type="number"
                value={formData.dPreformOut}
                onChange={onFormChange('dPreformOut')}
              />
            </label>
            <label className="home-modal__field">
              <span>Диаметр внутренний заготовки, мм</span>
              <input
                type="number"
                value={formData.dPreformIn}
                onChange={onFormChange('dPreformIn')}
                disabled={formData.idPreform === '1' || formData.idPreform === 1}
              />
            </label>
            <label className="home-modal__field">
              <span>Длина, мм заготовки</span>
              <input
                type="number"
                value={formData.lPreform}
                onChange={onFormChange('lPreform')}
              />
            </label>
            <label className="home-modal__field">
              <span>Коэф. жесткости, ГПа</span>
              <input
                type="number"
                value={formData.ph}
                onChange={onFormChange('ph')}
              />
            </label>
            <label className="home-modal__field">
              <span>Масса заготовки</span>
              <input
                type="number"
                value={formData.massPreform}
                onChange={onFormChange('massPreform')}
              />
            </label>
          </div>
        </div>

        {saveError && (
          <div className="home-modal__save-error" role="alert">
            {saveError}
          </div>
        )}
        <div className="home-modal__footer">
          <button type="button" className="home-modal__btn home-modal__btn_outline">
            Переходы при изготовлении переводника
          </button>
          <button type="button" className="home-modal__btn" onClick={onSave}>
            <Check className="home-modal__btn-icon" fontSize="small" />
            Ок
          </button>
          <button
            type="button"
            className="home-modal__btn home-modal__btn_secondary"
            onClick={onClose}
          >
            <Close className="home-modal__btn-icon" fontSize="small" />
            Отмена
          </button>
        </div>
      </div>
    </div>
=======
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
>>>>>>> Stashed changes
  )
}

export default SubstituteModal
