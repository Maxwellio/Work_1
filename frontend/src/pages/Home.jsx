import { useState, useEffect, useCallback } from 'react'
import { getSubstitutes, getFittings, getHydrotests } from '../api'
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
    setSelectedRowId(null)
  }, [activeTab])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab])

  const handleCreateEdit = () => {
    console.log('Создать/Редактировать', { activeTab })
  }
  const handleTransitions = () => {
    console.log('Переходы по трубе', { activeTab })
  }
  const handleDelete = () => {
    console.log('Удалить', { activeTab })
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
    </div>
  )
}

export default Home
