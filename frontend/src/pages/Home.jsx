import { Box, Snackbar } from '@mui/material'
import HomeModals from '../components/HomeModals'
import HomeToolbar from '../components/HomeToolbar'
import HomeTable from '../components/HomeTable'
import HomeTabs from '../components/HomeTabs'
import { useHomePage } from '../hooks/useHomePage'
import { formatCell, getRowId } from '../utils/format'

function Home() {
  const home = useHomePage()
  const { activeTab, data, actions } = home
  const selectedSubstitute =
    activeTab === 0 && data.selectedRowId != null
      ? data.listData.find((r) => r.idSubstitutePrepared === data.selectedRowId)
      : null
  const substituteName = selectedSubstitute?.name ?? ''

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <Box
        sx={{
          position: 'sticky',
          top: { xs: 56, sm: 64 },
          zIndex: 5,
          bgcolor: 'background.paper',
          mx: -3,
        }}
      >
        <HomeToolbar
          activeTab={activeTab}
          searchQuery={home.searchQuery}
          showMyRecords={home.showMyRecords}
          onAdd={home.handleAdd}
          onEdit={home.handleEdit}
          onTransitions={home.handleTransitions}
          onOpenTransitionsRef={home.openTransitionsRefModal}
          onDelete={actions.handleDelete}
          onCalcNorms={actions.handleCalcNorms}
          onPrint={actions.handlePrint}
          onToggleMyRecords={home.toggleMyRecords}
          onSearchChange={home.setSearchQuery}
        />

        <HomeTabs activeTab={activeTab} onChange={home.setActiveTab} />
      </Box>

      <HomeTable
        columns={home.columns}
        listData={data.listData}
        activeTab={activeTab}
        selectedRowId={data.selectedRowId}
        loading={data.loading}
        error={data.error}
        getRowId={getRowId}
        formatCell={formatCell}
        onSelectRow={data.setSelectedRowId}
      />

      <HomeModals
        activeTab={activeTab}
        selectedRowId={data.selectedRowId}
        preformTypesFiltered={data.preformTypesFiltered}
        preformTypesFilteredFitting={data.preformTypesFilteredFitting}
        preformError={data.preformError}
        partyList={data.partyList}
        isTransitionsRefModalOpen={home.isTransitionsRefModalOpen}
        onCloseTransitionsRef={home.closeTransitionsRefModal}
        isSubstituteTransitionsModalOpen={home.isSubstituteTransitionsModalOpen}
        onCloseSubstituteTransitions={home.closeSubstituteTransitionsModal}
        idSubstitutePrepared={activeTab === 0 ? data.selectedRowId : null}
        substituteName={substituteName}
        substituteForm={home.substituteForm}
        fittingForm={home.fittingForm}
        hydrotestForm={home.hydrotestForm}
        transitionsRef={home.transitionsRef}
      />

      <Snackbar
        open={Boolean(home.transitionsMessage)}
        autoHideDuration={4000}
        onClose={home.clearTransitionsMessage}
        message={home.transitionsMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}

export default Home
