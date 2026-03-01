import { Box, Tab, Tabs } from '@mui/material'
import { TABS } from '../models/tableConfig'

function HomeTabs({ activeTab, onChange }) {
  return (
    <Box
      sx={{
        px: 3,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Tabs value={activeTab} onChange={(_, value) => onChange(value)} variant="scrollable" scrollButtons="auto">
        {TABS.map((tab) => (
          <Tab key={tab.id} value={tab.id} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  )
}

export default HomeTabs
