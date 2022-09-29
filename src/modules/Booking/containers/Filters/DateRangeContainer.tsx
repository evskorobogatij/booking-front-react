import React from 'react'
import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { DateRange, DateRangePicker } from 'mui-daterange-picker'

import { useAppDispatch, useAppSelector } from '../../../../store'
import { DATE_FORMAT_TEMPLATE } from '../../../../constants'
import { setDateRange } from '../../state/bookingFiltersSlice'

const DateRangeContainer: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  const handleToggle = () => setOpen(!open)

  const bookingFilters = useAppSelector((state) => state.bookingFilters)
  const dispatch = useAppDispatch()

  const handleChangeDateRange = (range: DateRange) => {
    dispatch(
      setDateRange({
        startDate: dayjs(range.startDate).format(DATE_FORMAT_TEMPLATE),
        endDate: dayjs(range.endDate).format(DATE_FORMAT_TEMPLATE),
      })
    )
  }

  const initialDateRangeComputed: DateRange = {
    startDate: dayjs(bookingFilters.from).toDate(),
    endDate: dayjs(bookingFilters.to).toDate(),
  }

  return (
    <Box sx={{ position: 'relative', minWidth: 200 }}>
      <Stack spacing={2} direction="row">
        <TextField
          label="From"
          variant="outlined"
          onFocus={handleToggle}
          value={dayjs(bookingFilters.from).format('YYYY-MM-DD')}
          size="small"
        />
        <TextField
          label="To"
          variant="outlined"
          onFocus={handleToggle}
          value={dayjs(bookingFilters.to).format('YYYY-MM-DD')}
          size="small"
        />
      </Stack>
      <Box sx={{ position: 'absolute' }}>
        <Box sx={{ position: 'relative', zIndex: 10000 }}>
          <DateRangePicker
            open={open}
            initialDateRange={initialDateRangeComputed}
            toggle={handleToggle}
            onChange={handleChangeDateRange}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default DateRangeContainer
