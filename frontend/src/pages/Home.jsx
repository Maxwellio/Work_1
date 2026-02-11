import { useState, useEffect, useCallback } from 'react'
import {
  getSubstitutes,
  getFittings,
  getHydrotests,
  getPreformTypes,
  saveSubstitute,
  deleteSubstitute,
  deleteFitting,
  deleteHydrotest,
} from '../api'
import { useAuth } from '../context/AuthContext'
import HomeToolbar from '../components/HomeToolbar'
import HomeTable from '../components/HomeTable'
import SubstituteModal from '../components/SubstituteModal'
import '../styles/Home.css'

const TABS = [
  { id: 0, label: 'Переводники' },
  { id: 1, label: 'Патрубки' },
  { id: 2, label: 'Трубы' },
  { id: 3, label: 'Гидроиспытания' },
]

const COLUMNS = {
  0: [
    { key: 'idSubstitutePrepared', label: '№' },
    { key: 'name', label: 'Наименование' },
    { key: 'nmPreform', label: 'Тип заготовки' },
    { key: 'dPreformOut', label: 'D предформ. нар.' },
    { key: 'dPreformIn', label: 'D предформ. вн.' },
    { key: 'dSubstituteOut', label: 'D переходника нар.' },
    { key: 'dSubstituteIn', label: 'D переходника вн.' },
    { key: 'lSubstiute', label: 'L переходника' },
  ],
  1: [
    { key: 'idFiting', label: '№' },
    { key: 'nm', label: 'Наименование' },
    { key: 'd', label: 'D' },
    { key: 'th', label: 'Толщ.' },
    { key: 'mass', label: 'Масса' },
    { key: 'l', label: 'L' },
  ],
  2: [
    { key: 'idFiting', label: '№' },
    { key: 'nm', label: 'Наименование' },
    { key: 'd', label: 'D' },
    { key: 'th', label: 'Толщ.' },
    { key: 'mass', label: 'Масса' },
    { key: 'l', label: 'L' },
  ],
  3: [
    { key: 'idHydrotest', label: '№' },
    { key: 'nh', label: 'Наименование' },
    { key: 'd', label: 'D' },
    { key: 'l', label: 'L' },
    { key: 'th', label: 'Толщ.' },
    { key: 'testtime', label: 'Время исп.' },
    { key: 'mass', label: 'Масса' },
  ],
}

const DEBOUNCE_MS = 350

function getRowId(row, activeTab) {
  if (activeTab === 0) return row.idSubstitutePrepared
  if (activeTab === 1 || activeTab === 2) return row.idFiting
  return row.idHydrotest
}

function formatCell(value) {
  if (value == null) return '—'
  if (typeof value === 'number' || typeof value === 'string') return String(value)
  return String(value)
}

const EMPTY_SUBSTITUTE_FORM = {
  nmSub1: '',
  nmSub2: '',
  nmSub3: '',
  nmSub4: '',
  nmSub5: '',
  dSubstituteOut: '',
  dSubstituteIn: '',
  lSubstiute: '',
  idPreform: '1',
  dPreformOut: '',
  dPreformIn: '',
  lPreform: '',
  ph: '',
  massPreform: '',
}

function toInputValue(value) {
  if (value == null) return ''
  return String(value)
}

function mapSubstituteToForm(row) {
  return {
    nmSub1: toInputValue(row.nmSub1),
    nmSub2: toInputValue(row.nmSub2),
    nmSub3: toInputValue(row.nmSub3),
    nmSub4: toInputValue(row.nmSub4),
    nmSub5: toInputValue(row.nmSub5),
    dSubstituteOut: toInputValue(row.dSubstituteOut),
    dSubstituteIn: toInputValue(row.dSubstituteIn),
    lSubstiute: toInputValue(row.lSubstiute),
    idPreform: toInputValue(row.idPreform),
    dPreformOut: toInputValue(row.dPreformOut),
    dPreformIn: toInputValue(row.dPreformIn),
    lPreform: toInputValue(row.lPreform),
    ph: toInputValue(row.ph),
    massPreform: toInputValue(row.massPreform),
  }
}

function Home() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState(0)
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [showMyRecords, setShowMyRecords] = useState(false)
  const [listData, setListData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [preformTypes, setPreformTypes] = useState([])
  const [preformError, setPreformError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [formData, setFormData] = useState(EMPTY_SUBSTITUTE_FORM)
  const [saveError, setSaveError] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [searchQuery])

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const userId = showMyRecords && user?.userId ? user.userId : null
      if (activeTab === 0) {
        const data = await getSubstitutes(debouncedSearch, userId)
        setListData(data)
      } else if (activeTab === 1 || activeTab === 2) {
        const data = await getFittings(activeTab === 1 ? 1 : 2, debouncedSearch, userId)
        setListData(data)
      } else {
        const data = await getHydrotests(debouncedSearch, userId)
        setListData(data)
      }
    } catch (e) {
      setError(e.message || 'Ошибка загрузки')
      setListData([])
    } finally {
      setLoading(false)
    }
  }, [activeTab, debouncedSearch, showMyRecords, user])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    if (activeTab !== 0) return
    let isMounted = true
    setPreformError(null)
    getPreformTypes()
      .then((data) => {
        if (!isMounted) return
        setPreformTypes(Array.isArray(data) ? data : [])
      })
      .catch((e) => {
        if (!isMounted) return
        setPreformError(e.message || 'Ошибка загрузки типов заготовок')
        setPreformTypes([])
      })
    return () => {
      isMounted = false
    }
  }, [activeTab])

  useEffect(() => {
    setSelectedRowId(null)
  }, [activeTab])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab])

  const handleAdd = () => {
    if (activeTab !== 0) return
    setSaveError(null)
    setIsEditMode(false)
    setFormData(EMPTY_SUBSTITUTE_FORM)
    setIsModalOpen(true)
  }

  const handleEdit = () => {
    if (activeTab !== 0) return
    if (selectedRowId == null) {
      alert('Выберите запись для редактирования')
      return
    }
    const selectedRow = listData.find((row) => getRowId(row, activeTab) === selectedRowId)
    if (!selectedRow) return
    setSaveError(null)
    setIsEditMode(true)
    setFormData(mapSubstituteToForm(selectedRow))
    setIsModalOpen(true)
  }
  const handleTransitions = () => {
    console.log('Переходы по трубе', { activeTab })
  }
  const handleDelete = async () => {
    if (selectedRowId == null) {
      alert('Для удаления нужно выбрать запись.')
      return
    }
    try {
      if (activeTab === 0) await deleteSubstitute(selectedRowId)
      else if (activeTab === 1 || activeTab === 2) await deleteFitting(selectedRowId)
      else await deleteHydrotest(selectedRowId)
      setSelectedRowId(null)
      loadData()
    } catch (e) {
      alert(e.message || 'Не удалось удалить запись')
    }
  }
  const handleCalcNorms = () => {
    console.log('Расчёт норм времени', { activeTab })
  }
  const handlePrint = async () => {
    if (selectedRowId == null) {
      alert('Для генерации отчёта нужно выбрать запись.')
      return
    }
    const API_BASE = '/api'
    let path
    if (activeTab === 0) path = `${API_BASE}/downloadReportSub?id=${selectedRowId}`
    else if (activeTab === 1 || activeTab === 2) path = `${API_BASE}/downloadReportFit?id=${selectedRowId}`
    else path = `${API_BASE}/downloadReportHydro?id=${selectedRowId}`
    try {
      const res = await fetch(path, { credentials: 'include' })
      if (!res.ok) throw new Error('Ошибка загрузки отчёта')
      const blob = await res.blob()
      const disposition = res.headers.get('Content-Disposition')
      let filename = 'report.pdf'
      if (disposition) {
        const match = disposition.match(/filename="?([^";\n]+)"?/i)
        if (match) filename = match[1].trim()
      }
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      alert(e.message || 'Не удалось скачать отчёт')
    }
  }

  const handleFormChange = (field) => (event) => {
    const { value } = event.target
    setFormData((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'idPreform' && (value === '1' || value === 1)) {
        next.dPreformIn = ''
      }
      return next
    })
    setSaveError(null)
  }

  const parseNum = (v) => {
    if (v === '' || v == null) return null
    const n = Number(v)
    return Number.isNaN(n) ? null : n
  }

  const handleSave = async () => {
    setSaveError(null)
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
    }
    try {
      await saveSubstitute(payload)
      setIsModalOpen(false)
      loadData()
    } catch (e) {
      setSaveError(e.message || 'Ошибка сохранения')
    }
  }

  const columns = COLUMNS[activeTab]
  const preformTypesFiltered = preformTypes
    .filter((item) => item.idPreform === 1 || item.idPreform === 2)
    .sort((a, b) => a.idPreform - b.idPreform)

  return (
    <div className="home">
      <HomeToolbar
        activeTab={activeTab}
        searchQuery={searchQuery}
        showMyRecords={showMyRecords}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onTransitions={handleTransitions}
        onDelete={handleDelete}
        onCalcNorms={handleCalcNorms}
        onPrint={handlePrint}
        onToggleMyRecords={() => setShowMyRecords(!showMyRecords)}
        onSearchChange={setSearchQuery}
      />

      <div className="home-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`home-tab ${activeTab === tab.id ? 'home-tab_active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <HomeTable
        columns={columns}
        listData={listData}
        activeTab={activeTab}
        selectedRowId={selectedRowId}
        loading={loading}
        error={error}
        getRowId={getRowId}
        formatCell={formatCell}
        onSelectRow={setSelectedRowId}
      />

      <SubstituteModal
        open={isModalOpen && activeTab === 0}
        isEditMode={isEditMode}
        selectedRowId={selectedRowId}
        formData={formData}
        preformTypesFiltered={preformTypesFiltered}
        preformError={preformError}
        saveError={saveError}
        onClose={() => setIsModalOpen(false)}
        onFormChange={handleFormChange}
        onSave={handleSave}
      />
    </div>
  )
}

export default Home
