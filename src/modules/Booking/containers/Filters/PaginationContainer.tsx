import React from 'react'
import RoomsTableFooter from '../../../Room/containers/RoomsListContainer/components/RoomsTableFooter'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { useSearchQuery } from '../../state/bookingService'
import { setPageNumber, setPageSize } from '../../state/bookingFiltersSlice'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

const PaginationContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const bookingFilters = useAppSelector((state) => state.bookingFilters)
  const { data } = useSearchQuery(bookingFilters)

  const handleChangePage = (value: number) => {
    dispatch(setPageNumber(value))
  }

  const handleChangeRowsPerPage = (value: number) => {
    dispatch(setPageSize(value))
  }

  if (!data)
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    )

  return (
    <RoomsTableFooter
      objects={data}
      pageNumber={bookingFilters.pageNumber || 0}
      pageSize={bookingFilters.pageSize || 0}
      onChangePageNumber={handleChangePage}
      onChangePageSize={handleChangeRowsPerPage}
    />
  )
}

export default PaginationContainer
