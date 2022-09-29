import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import { useAppDispatch, useAppSelector } from '../../../../store'
import { BookingSearchParams } from '../../types/BookingSearchParams'
import { setFilters } from '../../state/bookingFiltersSlice'
import FiltersForm from './FiltersForm'

interface Props {
  open: boolean
  onClose(): void
}

const FiltersFormContainer: React.FC<Props> = ({ open, onClose }) => {
  const bookingFilters = useAppSelector((state) => state.bookingFilters)
  const dispatch = useAppDispatch()

  const handleSubmitFilters = (
    filters: Omit<BookingSearchParams, 'enteringDateTo' | 'enteringDateFrom'>
  ) => {
    dispatch(setFilters(filters))
    onClose()
  }

  return (
    <Dialog
      onClose={onClose}
      maxWidth="lg"
      open={open}
      sx={{ overflow: 'visible' }}
    >
      <DialogTitle>Filters</DialogTitle>
      <DialogContent sx={{ overflow: 'visible' }}>
        <FiltersForm
          onSubmit={handleSubmitFilters}
          initialValues={bookingFilters}
        />
      </DialogContent>
    </Dialog>
  )
}

export default FiltersFormContainer
