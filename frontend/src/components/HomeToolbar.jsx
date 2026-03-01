import '../styles/Home.css'

function HomeToolbar({
  activeTab,
  searchQuery,
  showMyRecords,
  onAdd,
  onEdit,
  onTransitions,
  onOpenTransitionsRef,
  onDelete,
  onCalcNorms,
  onPrint,
  onToggleMyRecords,
  onSearchChange,
}) {
  return (
<<<<<<< Updated upstream
    <div className="home-toolbar">
=======
    <Stack
      direction="row"
      spacing={1}
      useFlexGap
      sx={{
        alignItems: 'center',
        flexWrap: 'wrap',
        pt: 1.5,
        pb: 0,
        px: 2,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
>>>>>>> Stashed changes
      {(activeTab === 0 || activeTab === 1 || activeTab === 2 || activeTab === 3) && (
        <>
          <button type="button" className="home-toolbar-btn" onClick={onAdd}>
            Добавить
          </button>
          <button type="button" className="home-toolbar-btn" onClick={onEdit}>
            Редактировать
          </button>
        </>
      )}
      {activeTab !== 3 && (
<<<<<<< Updated upstream
        <button type="button" className="home-toolbar-btn" onClick={onTransitions}>
          Переходы по трубе
        </button>
=======
        <Button type="button" variant="outlined" onClick={onTransitions}>
          Переходы
        </Button>
>>>>>>> Stashed changes
      )}
      <button type="button" className="home-toolbar-btn" onClick={onDelete}>
        Удалить
      </button>
      <button type="button" className="home-toolbar-btn" onClick={onCalcNorms}>
        Расчёт норм времени
      </button>
      <button type="button" className="home-toolbar-btn" onClick={onPrint}>
        Печать отчёта
      </button>
      <button
        type="button"
        className={`home-toolbar-btn ${showMyRecords ? 'home-toolbar-btn_active' : ''}`}
        onClick={onToggleMyRecords}
      >
        Мои записи
      </button>
      <input
        type="search"
        className="home-toolbar-search"
        placeholder="Поиск по записям"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Поиск по записям"
      />
      <button
        type="button"
        className="home-toolbar-btn"
        onClick={onOpenTransitionsRef}
      >
        Справочник переходов
      </button>
    </div>
  )
}

export default HomeToolbar
