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
  const [formData, setFormData] = useState(EMPTY_SUBSTITUTE_FORM)
  const [saveError, setSaveError] = useState(null)

  const openAdd = () => {
    setSaveError(null)
    setIsEditMode(false)
    setFormData({ ...EMPTY_SUBSTITUTE_FORM })
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
    setFormData(mapSubstituteToForm(selectedRow))
    setIsModalOpen(true)
  }

  const close = () => setIsModalOpen(false)

  const handleSave = async (submittedFormData = formData) => {
    setSaveError(null)
    const payload = {
      id: isEditMode ? selectedRowId : null,
      nmSub1: submittedFormData.nmSub1 || null,
      nmSub2: submittedFormData.nmSub2 || null,
      nmSub3: submittedFormData.nmSub3 || null,
      nmSub4: submittedFormData.nmSub4 || null,
      nmSub5: submittedFormData.nmSub5 || null,
      dSubstituteOut: parseNum(submittedFormData.dSubstituteOut),
      dSubstituteIn: parseNum(submittedFormData.dSubstituteIn),
      lSubstiute: parseNum(submittedFormData.lSubstiute),
      idPreform:
        submittedFormData.idPreform === '' || submittedFormData.idPreform == null
          ? 1
          : parseNum(submittedFormData.idPreform),
      dPreformOut: parseNum(submittedFormData.dPreformOut),
      dPreformIn:
        submittedFormData.idPreform === '1' || submittedFormData.idPreform === 1
          ? null
          : parseNum(submittedFormData.dPreformIn),
      lPreform: parseNum(submittedFormData.lPreform),
      ph: parseNum(submittedFormData.ph),
      massPreform: parseNum(submittedFormData.massPreform),
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
    formData,
    saveError,
    openAdd,
    openEdit,
    close,
    handleSave,
  }
}
