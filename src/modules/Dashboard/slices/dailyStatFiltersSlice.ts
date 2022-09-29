import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { DailyStatFilters } from '../types'
import { DATE_FORMAT_TEMPLATE } from '../../../constants'

const initialState: DailyStatFilters = {
  date: dayjs().format(DATE_FORMAT_TEMPLATE),
}

const dailyStatFiltersSlice = createSlice({
  name: 'dailyStatFilters',
  initialState,
  reducers: {
    changeDate(state, action: PayloadAction<string>) {
      state.date = action.payload
    },
  },
})

export const { changeDate } = dailyStatFiltersSlice.actions
export default dailyStatFiltersSlice.reducer
