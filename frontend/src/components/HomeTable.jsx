import { alpha } from '@mui/material/styles'
import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

function HomeTable({
  columns,
  listData,
  activeTab,
  selectedRowId,
  loading,
  error,
  getRowId,
  formatCell,
  onSelectRow,
}) {
  return (
    <TableContainer component={Paper} sx={{ flex: 1, minHeight: 0, overflow: 'auto', mt: 2 }}>
      {error && <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>}
      {loading && (
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={26} />
        </Box>
      )}
      {!loading && !error && (
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key} sx={{ fontWeight: 600 }}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listData.map((row) => {
              const id = getRowId(row, activeTab)
              const selected = selectedRowId === id
              return (
                <TableRow
                  key={id}
                  data-row-id={id}
                  hover
                  onClick={() => onSelectRow(selected ? null : id)}
                  sx={(theme) => ({
                    cursor: 'pointer',
                    bgcolor: selected ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                    '&:hover': {
                      bgcolor: selected
                        ? alpha(theme.palette.primary.main, 0.14)
                        : alpha(theme.palette.primary.main, 0.04),
                    },
                  })}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key}>{formatCell(row[col.key])}</TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  )
}

export default HomeTable
