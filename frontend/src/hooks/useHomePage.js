import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { COLUMNS } from '../models/tableConfig'
import { useFittingForm } from './useFittingForm'
import { useHomeActions } from './useHomeActions'
import { useHomeData } from './useHomeData'
import { useHydrotestForm } from './useHydrotestForm'
import { useSubstituteForm } from './useSubstituteForm'
import { useTransitionsRef } from './useTransitionsRef'

export function useHomePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [showMyRecords, setShowMyRecords] = useState(false)
  const [isTransitionsRefModalOpen, setIsTransitionsRefModalOpen] = useState(false)
  const [isSubstituteTransitionsModalOpen, setIsSubstituteTransitionsModalOpen] = useState(false)
  const [transitionsMessage, setTransitionsMessage] = useState(null)

  const data = useHomeData({
    activeTab,
    searchQuery,
    showMyRecords,
    user,
  })

  const substituteForm = useSubstituteForm({
    activeTab,
    selectedRowId: data.selectedRowId,
    listData: data.listData,
    user,
    loadData: data.loadData,
    setSelectedRowId: data.setSelectedRowId,
    setPendingScrollToId: data.setPendingScrollToId,
  })

  const fittingForm = useFittingForm({
    activeTab,
    selectedRowId: data.selectedRowId,
    listData: data.listData,
    partyList: data.partyList,
    user,
    loadData: data.loadData,
    setSelectedRowId: data.setSelectedRowId,
    setPendingScrollToId: data.setPendingScrollToId,
  })

  const hydrotestForm = useHydrotestForm({
    activeTab,
    selectedRowId: data.selectedRowId,
    listData: data.listData,
    user,
    loadData: data.loadData,
    setSelectedRowId: data.setSelectedRowId,
    setPendingScrollToId: data.setPendingScrollToId,
  })

  const actions = useHomeActions({
    activeTab,
    selectedRowId: data.selectedRowId,
    listData: data.listData,
    loadData: data.loadData,
    setSelectedRowId: data.setSelectedRowId,
    setPendingScrollToId: data.setPendingScrollToId,
  })

  const transitionsRef = useTransitionsRef(isTransitionsRefModalOpen)

  const handleAdd = () => {
    if (activeTab === 0) substituteForm.openAdd()
    else if (activeTab === 1 || activeTab === 2) fittingForm.openAdd()
    else if (activeTab === 3) hydrotestForm.openAdd()
  }

  const handleEdit = () => {
    if (activeTab === 0) substituteForm.openEdit()
    else if (activeTab === 1 || activeTab === 2) fittingForm.openEdit()
    else if (activeTab === 3) hydrotestForm.openEdit()
  }

  const handleTransitions = () => {
    if (activeTab === 0) {
      if (data.selectedRowId == null) {
        setTransitionsMessage('Выберите переводник в таблице')
      } else {
        setTransitionsMessage(null)
        setIsSubstituteTransitionsModalOpen(true)
      }
    }
    // tabs 1–2: оставляем на потом
  }

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    showMyRecords,
    toggleMyRecords: () => setShowMyRecords((prev) => !prev),
    isTransitionsRefModalOpen,
    openTransitionsRefModal: () => setIsTransitionsRefModalOpen(true),
    closeTransitionsRefModal: () => setIsTransitionsRefModalOpen(false),
    isSubstituteTransitionsModalOpen,
    openSubstituteTransitionsModal: () => setIsSubstituteTransitionsModalOpen(true),
    closeSubstituteTransitionsModal: () => setIsSubstituteTransitionsModalOpen(false),
    transitionsMessage,
    clearTransitionsMessage: () => setTransitionsMessage(null),
    handleTransitions,
    columns: COLUMNS[activeTab],
    data,
    actions,
    substituteForm,
    fittingForm,
    hydrotestForm,
    transitionsRef,
    handleAdd,
    handleEdit,
  }
}
