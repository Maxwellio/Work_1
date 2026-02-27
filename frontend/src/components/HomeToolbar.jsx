import Search from '@mui/icons-material/Search'
import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material'

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
    <Stack
      direction="row"
      spacing={1}
      useFlexGap
      sx={{
        alignItems: 'center',
        flexWrap: 'wrap',
        py: 1.5,
        px: 0,
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      {(activeTab === 0 || activeTab === 1 || activeTab === 2 || activeTab === 3) && (
        <>
          <Button type="button" variant="contained" onClick={onAdd}>
            Добавить
          </Button>
          <Button type="button" variant="contained" onClick={onEdit}>
            Редактировать
          </Button>
        </>
      )}
      {activeTab !== 3 && (
        <Button type="button" variant="outlined" onClick={onTransitions}>
          Переходы по трубе
        </Button>
      )}
      <Button type="button" variant="outlined" onClick={onDelete}>
        Удалить
      </Button>
      <Button type="button" variant="outlined" onClick={onCalcNorms}>
        Расчёт норм времени
      </Button>
      <Button type="button" variant="outlined" onClick={onPrint}>
        Печать отчёта
      </Button>
      <Button
        type="button"
        variant={showMyRecords ? 'contained' : 'outlined'}
        onClick={onToggleMyRecords}
      >
        Мои записи
      </Button>
      <Box sx={{ flex: 1 }} />
      <TextField
        type="search"
        placeholder="Поиск по записям"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Поиск по записям"
        size="small"
        sx={{ minWidth: 240 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="button"
        variant="outlined"
        onClick={onOpenTransitionsRef}
      >
        Справочник переходов
      </Button>
    </Stack>
  )
}

export default HomeToolbar
