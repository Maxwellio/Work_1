import { TABS } from '../models/tableConfig'

function HomeTabs({ activeTab, onChange }) {
  return (
<<<<<<< Updated upstream
    <div className="home-tabs">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`home-tab ${activeTab === tab.id ? 'home-tab_active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
=======
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
>>>>>>> Stashed changes
  )
}

export default HomeTabs
