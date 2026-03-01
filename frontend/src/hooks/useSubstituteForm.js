import { useState } from 'react'
import { saveSubstitute } from '../api'
import { EMPTY_SUBSTITUTE_FORM, mapSubstituteToForm } from '../models/forms'
import { getRowId, parseNum } from '../utils/format'

export function useSubstituteForm({
  activeTab,
  selectedRowId,
  listData,
  user,
  loadData,
  setSelectedRowId,
  setPendingScrollToId,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [initialFormData, setInitialFormData] = useState(EMPTY_SUBSTITUTE_FORM)
  const [saveError, setSaveError] = useState(null)

  const openAdd = () => {
    setSaveError(null)
    setIsEditMode(false)
    setInitialFormData(EMPTY_SUBSTITUTE_FORM)
    setIsModalOpen(true)
  }

  const openEdit = () => {
    if (selectedRowId == null) {
      window.alert('Выберите запись для редактирования')
      return
    }
    const selectedRow = listData.find((row) => getRowId(row, activeTab) === selectedRowId)
    if (!selectedRow) return
    setSaveError(null)
    setIsEditMode(true)
    setInitialFormData(mapSubstituteToForm(selectedRow))
    setIsModalOpen(true)
  }

  const close = () => setIsModalOpen(false)

  const handleSave = async (formData) => {
    setSaveError(null)
    const nameFields = [formData.nmSub1, formData.nmSub2, formData.nmSub3, formData.nmSub4, formData.nmSub5]
    const hasName = nameFields.some((v) => v != null && String(v).trim() !== '')
    if (!hasName) {
      setSaveError('Заполните хотя бы одно поле наименования')
      return
    }
    const payload = {
      id: isEditMode ? selectedRowId : null,
      nmSub1: formData.nmSub1 || null,
      nmSub2: formData.nmSub2 || null,
      nmSub3: formData.nmSub3 || null,
      nmSub4: formData.nmSub4 || null,
      nmSub5: formData.nmSub5 || null,
      dSubstituteOut: parseNum(formData.dSubstituteOut),
      dSubstituteIn: parseNum(formData.dSubstituteIn),
      lSubstiute: parseNum(formData.lSubstiute),
      idPreform: formData.idPreform === '' || formData.idPreform == null ? 1 : parseNum(formData.idPreform),
      dPreformOut: parseNum(formData.dPreformOut),
      dPreformIn: formData.idPreform === '1' || formData.idPreform === 1 ? null : parseNum(formData.dPreformIn),
      lPreform: parseNum(formData.lPreform),
      ph: parseNum(formData.ph),
      massPreform: parseNum(formData.massPreform),
      ...(isEditMode ? {} : { idUserCreator: user?.userId ?? null }),
    }
    try {
      const { id } = await saveSubstitute(payload)
      setIsModalOpen(false)
      await loadData()
      if (id != null && id > 0) {
        setSelectedRowId(id)
        setPendingScrollToId(id)
      }
    } catch (err) {
      setSaveError(err.message || 'Ошибка сохранения')
    }
  }

  return {
    isModalOpen,
    isEditMode,
    initialFormData,
    saveError,
    openAdd,
    openEdit,
    close,
    handleSave,
  }
}
