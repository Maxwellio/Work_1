import { useState } from 'react'
import { saveHydrotest } from '../api'
import { EMPTY_HYDROTEST_FORM, mapHydrotestToForm } from '../models/forms'
import { getRowId, parseNum } from '../utils/format'

export function useHydrotestForm({
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
  const [formData, setFormData] = useState(EMPTY_HYDROTEST_FORM)
  const [saveError, setSaveError] = useState(null)

  const openAdd = () => {
    setSaveError(null)
    setIsEditMode(false)
    setFormData({ ...EMPTY_HYDROTEST_FORM })
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
    setFormData(mapHydrotestToForm(selectedRow))
    setIsModalOpen(true)
  }

  const close = () => setIsModalOpen(false)

  const handleSave = async (submittedFormData = formData) => {
    setSaveError(null)
    const payload = {
      id: isEditMode ? selectedRowId : null,
      nh: submittedFormData.nh || null,
      d: parseNum(submittedFormData.d),
      th: parseNum(submittedFormData.th),
      l: parseNum(submittedFormData.l),
      testtime: parseNum(submittedFormData.testtime),
      mass: parseNum(submittedFormData.mass),
      l1: parseNum(submittedFormData.l1),
      l2: parseNum(submittedFormData.l2),
      ...(isEditMode ? {} : { idUserCreator: user?.userId ?? null }),
    }
    try {
      const { id } = await saveHydrotest(payload)
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
