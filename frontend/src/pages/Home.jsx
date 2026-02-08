import { useState, useEffect, useCallback } from 'react'
import {
  getSubstitutes,
  getFittings,
  getHydrotests,
  getPreformTypes,
  deleteSubstitute,
  deleteFitting,
  deleteHydrotest,
} from '../api'
import { useAuth } from '../context/AuthContext'
import './Home.css'

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
    { key: 'nmPreform', label: 'Тип заготовки' },
    { key: 'd', label: 'D' },
    { key: 'th', label: 'Толщ.' },
    { key: 'mass', label: 'Масса' },
    { key: 'l', label: 'L' },
  ],
  2: [
    { key: 'idFiting', label: '№' },
    { key: 'nm', label: 'Наименование' },
    { key: 'nmPreform', label: 'Тип заготовки' },
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
  idSubstitutePrepared: '',
  idPreform: '',
  dPreformOut: '',
  dPreformIn: '',
  ph: '',
  lPreform: '',
  massPreform: '',
  tSum: '',
  dSubstituteOut: '',
  dSubstituteIn: '',
  lSubstiute: '',
  nmSub1: '',
  nmSub2: '',
  nmSub3: '',
  nmSub4: '',
  nmSub5: '',
  idUserCreator: '',
}

function toInputValue(value) {
  if (value == null) return ''
  return String(value)
}

function mapSubstituteToForm(row) {
  return {
    idSubstitutePrepared: toInputValue(row.idSubstitutePrepared),
    idPreform: toInputValue(row.idPreform),
    dPreformOut: toInputValue(row.dPreformOut),
    dPreformIn: toInputValue(row.dPreformIn),
    ph: toInputValue(row.ph),
    lPreform: toInputValue(row.lPreform),
    massPreform: toInputValue(row.massPreform),
    tSum: toInputValue(row.tSum),
    dSubstituteOut: toInputValue(row.dSubstituteOut),
    dSubstituteIn: toInputValue(row.dSubstituteIn),
    lSubstiute: toInputValue(row.lSubstiute),
    nmSub1: toInputValue(row.nmSub1),
    nmSub2: toInputValue(row.nmSub2),
    nmSub3: toInputValue(row.nmSub3),
    nmSub4: toInputValue(row.nmSub4),
    nmSub5: toInputValue(row.nmSub5),
    idUserCreator: toInputValue(row.idUserCreator),
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
  const [formData, setFormData] = useState(EMPTY_SUBSTITUTE_FORM)

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

  const handleCreateEdit = () => {
    if (activeTab !== 0) {
      console.log('Создать/Редактировать', { activeTab })
      return
    }
    const selectedRow = listData.find((row) => getRowId(row, activeTab) === selectedRowId)
    setFormData(selectedRow ? mapSubstituteToForm(selectedRow) : EMPTY_SUBSTITUTE_FORM)
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
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  useEffect(() => {
    if (!isModalOpen || activeTab !== 0) return
    if (selectedRowId == null) {
      setFormData(EMPTY_SUBSTITUTE_FORM)
      return
    }
    const selectedRow = listData.find((row) => getRowId(row, activeTab) === selectedRowId)
    if (selectedRow) {
      setFormData(mapSubstituteToForm(selectedRow))
    }
  }, [isModalOpen, selectedRowId, listData, activeTab])

  const columns = COLUMNS[activeTab]

  return (
    <div className="home">
      <div className="home-toolbar">
        <button type="button" className="home-toolbar-btn" onClick={handleCreateEdit}>
          Создать / Редактировать
        </button>
        {activeTab !== 3 && (
          <button type="button" className="home-toolbar-btn" onClick={handleTransitions}>
            Переходы по трубе
          </button>
        )}
        <button type="button" className="home-toolbar-btn" onClick={handleDelete}>
          Удалить
        </button>
        <button type="button" className="home-toolbar-btn" onClick={handleCalcNorms}>
          Расчёт норм времени
        </button>
        <button type="button" className="home-toolbar-btn" onClick={handlePrint}>
          Печать отчёта
        </button>
        <button
          type="button"
          className={`home-toolbar-btn ${showMyRecords ? 'home-toolbar-btn_active' : ''}`}
          onClick={() => setShowMyRecords(!showMyRecords)}
        >
          Мои записи
        </button>
        <input
          type="search"
          className="home-toolbar-search"
          placeholder="Поиск по записям"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Поиск по записям"
        />
      </div>

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

      <div className="home-table-wrap">
        {error && (
          <div className="home-table-message home-table-message_error">{error}</div>
        )}
        {loading && (
          <div className="home-table-message">Загрузка…</div>
        )}
        {!loading && !error && (
          <table className="home-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listData.map((row, index) => {
                const id = getRowId(row, activeTab)
                return (
                  <tr
                    key={id}
                    className={selectedRowId === id ? 'home-table-row_selected' : ''}
                    onClick={() => setSelectedRowId(selectedRowId === id ? null : id)}
                  >
                    {columns.map((col) => (
                      <td key={col.key}>
                        {formatCell(row[col.key])}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && activeTab === 0 && (
        <div className="home-modal" role="dialog" aria-modal="true">
          <div className="home-modal__backdrop" onClick={() => setIsModalOpen(false)} />
          <div className="home-modal__panel" onClick={(e) => e.stopPropagation()}>
            <div className="home-modal__header">
              <h2 className="home-modal__title">
                {selectedRowId ? 'Редактирование переводника' : 'Создание переводника'}
              </h2>
              <button
                type="button"
                className="home-modal__close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>

            <div className="home-modal__body">
              <div className="home-modal__grid">
                <label className="home-modal__field">
                  <span>№ переводника</span>
                  <input
                    type="number"
                    value={formData.idSubstitutePrepared}
                    onChange={handleFormChange('idSubstitutePrepared')}
                  />
                </label>
                <label className="home-modal__field">
                  <span>Тип заготовки</span>
                  <select value={formData.idPreform} onChange={handleFormChange('idPreform')}>
                    <option value="">Выберите тип</option>
                    {preformTypes.map((item) => (
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
                  <span>D предформ. нар.</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.dPreformOut}
                    onChange={handleFormChange('dPreformOut')}
                  />
                </label>
                <label className="home-modal__field">
                  <span>D предформ. вн.</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.dPreformIn}
                    onChange={handleFormChange('dPreformIn')}
                  />
                </label>
                <label className="home-modal__field">
                  <span>PH</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.ph}
                    onChange={handleFormChange('ph')}
                  />
                </label>
                <label className="home-modal__field">
                  <span>L предформ.</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.lPreform}
                    onChange={handleFormChange('lPreform')}
                  />
                </label>
                <label className="home-modal__field">
                  <span>Масса предформ.</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.massPreform}
                    onChange={handleFormChange('massPreform')}
                  />
                </label>
                <label className="home-modal__field">
                  <span>T сумм.</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.tSum}
                    onChange={handleFormChange('tSum')}
                  />
                </label>
                <label className="home-modal__field">
                  <span>D переходника нар.</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.dSubstituteOut}
                    onChange={handleFormChange('dSubstituteOut')}
                  />
                </label>
                <label className="home-modal__field">
                  <span>D переходника вн.</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.dSubstituteIn}
                    onChange={handleFormChange('dSubstituteIn')}
                  />
                </label>
                <label className="home-modal__field">
                  <span>L переходника</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.lSubstiute}
                    onChange={handleFormChange('lSubstiute')}
                  />
                </label>
                <label className="home-modal__field">
                  <span>NM Sub 1</span>
                  <input
                    type="text"
                    value={formData.nmSub1}
                    onChange={handleFormChange('nmSub1')}
                  />
                </label>
                <label className="home-modal__field">
                  <span>NM Sub 2</span>
                  <input
                    type="text"
                    value={formData.nmSub2}
                    onChange={handleFormChange('nmSub2')}
                  />
                </label>
                <label className="home-modal__field">
                  <span>NM Sub 3</span>
                  <input
                    type="text"
                    value={formData.nmSub3}
                    onChange={handleFormChange('nmSub3')}
                  />
                </label>
                <label className="home-modal__field">
                  <span>NM Sub 4</span>
                  <input
                    type="text"
                    value={formData.nmSub4}
                    onChange={handleFormChange('nmSub4')}
                  />
                </label>
                <label className="home-modal__field">
                  <span>NM Sub 5</span>
                  <input
                    type="text"
                    value={formData.nmSub5}
                    onChange={handleFormChange('nmSub5')}
                  />
                </label>
                <label className="home-modal__field">
                  <span>ID пользователя</span>
                  <input
                    type="number"
                    value={formData.idUserCreator}
                    onChange={handleFormChange('idUserCreator')}
                  />
                </label>
              </div>
            </div>

            <div className="home-modal__footer">
              <button
                type="button"
                className="home-modal__btn home-modal__btn_secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Закрыть без сохранения
              </button>
              <button type="button" className="home-modal__btn">
                Сохранить
              </button>
              <button type="button" className="home-modal__btn home-modal__btn_outline">
                Переходы
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
