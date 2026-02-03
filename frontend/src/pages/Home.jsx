import { useState } from 'react'
import './Home.css'

const TABS = [
  { id: 0, label: 'Переводники' },
  { id: 1, label: 'Патрубки' },
  { id: 2, label: 'Трубы' },
  { id: 3, label: 'Гидроиспытания' },
]

const TABLE_HEADERS = {
  0: ['№', 'Наименование', 'Тип', 'Диаметр'],
  1: ['№', 'Наименование', 'Размер', 'Материал'],
  2: ['№', 'Наименование', 'Длина', 'Диаметр'],
  3: ['№', 'Дата', 'Объект', 'Результат'],
}

function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

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
  const handlePrint = () => {
    console.log('Печать отчёта', { activeTab })
  }

  const headers = TABLE_HEADERS[activeTab]
  const stubRows = [
    { id: 1, cells: ['1', '—', '—', '—'] },
    { id: 2, cells: ['2', '—', '—', '—'] },
  ]

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
        <table className="home-table">
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stubRows.map((row) => (
              <tr
                key={row.id}
                className={selectedRowId === row.id ? 'home-table-row_selected' : ''}
                onClick={() => setSelectedRowId(selectedRowId === row.id ? null : row.id)}
              >
                {row.cells.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
