import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'

import type { BookingSearchParams } from '../types/BookingSearchParams'
import { DATE_FORMAT_TEMPLATE } from '../../../constants'

interface BookingFiltersState extends BookingSearchParams {}

const initialState: BookingFiltersState = {
  pageNumber: 0,
  pageSize: 10,
  from: moment().format(DATE_FORMAT_TEMPLATE),
  to: moment().add(30, 'days').format(DATE_FORMAT_TEMPLATE),
  sortBy: 'department',
  sortDirection: 'ASC',
}

const bookingFiltersSlice = createSlice({
  name: 'bookingFilters',
  initialState,
  reducers: {
    setDateRange(
      state,
      action: PayloadAction<{ startDate?: string; endDate?: string }>
    ) {
      if (action.payload.startDate) state.from = action.payload.startDate
      if (action.payload.endDate) state.to = action.payload.endDate
    },
    setFilters(
      state,
      action: PayloadAction<
        Omit<BookingSearchParams, 'enteringDateTo' | 'enteringDateFrom'>
      >
    ) {
      state.departmentId = action.payload.departmentId
      state.hospitalId = action.payload.hospitalId
      state.sourceFunding = action.payload.sourceFunding
      state.typeOfBooking = action.payload.typeOfBooking
      state.statusOfBooking = action.payload.statusOfBooking
      state.labelId = action.payload.labelId
      state.test = action.payload.test
    },
    setPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload
    },
    removeFilter(
      state,
      action: PayloadAction<
        | 'departmentId'
        | 'hospitalId'
        | 'sourceFunding'
        | 'typeOfBooking'
        | 'statusOfBooking'
        | 'labelId'
        | 'test'
      >
    ) {
      state[action.payload] = undefined
    },
  },
})

export const {
  setDateRange,
  setFilters,
  setPageNumber,
  setPageSize,
  removeFilter,
} = bookingFiltersSlice.actions
export default bookingFiltersSlice.reducer
