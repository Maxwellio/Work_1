import { useEffect, useState } from 'react'
import Check from '@mui/icons-material/Check'
import Close from '@mui/icons-material/Close'
import '../styles/SubstituteModal.css'

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
<<<<<<< Updated upstream
    <div
      className="home-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="home-fitting-modal-title"
      title={isEditMode ? titleEdit : titleAdd}
    >
      <div className="home-modal__backdrop" onClick={onClose} />
      <div className="home-modal__panel" onClick={(e) => e.stopPropagation()}>
        <div className="home-modal__header">
          <h2 id="home-fitting-modal-title" className="home-modal__title">
            {isEditMode ? titleEdit : titleAdd}
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
          <span className="home-modal__subheader-label">{label}</span>
=======
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
>>>>>>> Stashed changes
          {isEditMode && (
            <span className="home-modal__id" aria-hidden="true">
              {selectedRowId}
            </span>
          )}
        </div>

<<<<<<< Updated upstream
        <div className="home-modal__body">
          <div className="home-modal__section">
            <div className="home-modal__name-row">
              <span className="home-modal__name-label">Наименование</span>
              <div className="home-modal__name-inputs">
                <input
                  type="text"
                  className="home-modal__name-inp"
                  value={formData.nm}
                  onChange={onFormChange('nm')}
                  aria-label="nm"
                />
                <span className="home-modal__name-sep">-</span>
                <input
                  type="number"
                  className="home-modal__name-inp"
                  value={formData.d}
                  onChange={onFormChange('d')}
                  aria-label="d"
                />
=======
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
>>>>>>> Stashed changes
                {isPatrubok && (
                  <>
                    <span className="home-modal__name-sep">x</span>
                    <input
                      type="number"
                      className="home-modal__name-inp"
                      value={formData.th}
<<<<<<< Updated upstream
                      onChange={onFormChange('th')}
                      aria-label="th"
=======
                      onChange={handleFormChange('th')}
                      sx={{ width: 110 }}
>>>>>>> Stashed changes
                    />
                  </>
                )}
              </div>
            </div>

<<<<<<< Updated upstream
            <label className="home-modal__field">
              <span>Длина, мм</span>
              <input
                type="number"
                value={formData.l}
                onChange={onFormChange('l')}
              />
            </label>
            <label className="home-modal__field">
              <span>Масса, кг</span>
              <input
                type="number"
                value={formData.mass}
                onChange={onFormChange('mass')}
              />
            </label>

            {isPatrubok && (
              <>
                <h3 className="home-modal__section-title">Заготовка</h3>
                <label className="home-modal__field">
                  <span>Наименование</span>
                  <select value={formData.idPreform} onChange={onFormChange('idPreform')}>
                    <option value="">Выберите тип</option>
=======
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
>>>>>>> Stashed changes
                    {preformTypesFiltered.map((item) => (
                      <option key={item.idPreform} value={item.idPreform}>
                        {item.nmPreform}
                      </option>
                    ))}
<<<<<<< Updated upstream
                  </select>
                  {preformError && (
                    <span className="home-modal__hint">{preformError}</span>
                  )}
                </label>
                <label className="home-modal__field">
                  <span>Длина, мм</span>
                  <input
                    type="number"
                    value={formData.lPreform}
                    onChange={onFormChange('lPreform')}
                  />
                </label>
              </>
            )}

            <label className="home-modal__field">
              <span>Коэф. жесткости, ГПа</span>
              <input
                type="number"
                value={formData.phPreform}
                onChange={onFormChange('phPreform')}
              />
            </label>
            <label className="home-modal__field">
              <span>Наибольший диаметр изделия</span>
              <input
                type="number"
                value={formData.dStan}
                onChange={onFormChange('dStan')}
              />
            </label>

            <label className="home-modal__field">
              <span>Количество деталей в партии, шт.</span>
              <select value={formData.cnt ?? ''} onChange={onFormChange('cnt')}>
                <option value="">Выберите</option>
=======
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
>>>>>>> Stashed changes
                {partyList.map((item) => (
                  <option key={item.colParty} value={item.colParty}>
                    {item.colParty}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

<<<<<<< Updated upstream
        {saveError && (
          <div className="home-modal__save-error" role="alert">
            {saveError}
          </div>
        )}
        <div className="home-modal__footer">
          <button type="button" className="home-modal__btn home-modal__btn_outline">
            {transitionsLabel}
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
>>>>>>> Stashed changes
  )
}

export default FittingModal
