import React from 'react'
import Box from '@mui/material/Box'
import {
  DateRange,
  DateRangePicker as MUIDateRangePicker,
} from 'mui-daterange-picker'
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { DATE_FORMAT_TEMPLATE } from '../../constants'
import { FieldProps } from './types'

export const DateRangePicker: React.FC<FieldProps> = (props) => {
  const { input } = props

  const [open, setOpen] = React.useState(false)
  const handleToggle = () => setOpen(!open)

  const handleChangeDateRange = (range: DateRange) => {
    input.onChange({
      startDate: dayjs(range.startDate).format(DATE_FORMAT_TEMPLATE),
      endDate: dayjs(range.endDate).format(DATE_FORMAT_TEMPLATE),
    })
  }

  const initialDateRangeComputed: DateRange = {
    startDate: dayjs(input.value.startDate).toDate(),
    endDate: dayjs(input.value.endDate).toDate(),
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Stack spacing={2}>
        <TextField
          label="Entering date from"
          variant="outlined"
          onFocus={handleToggle}
          value={input.value.startDate}
        />
        <TextField
          label="Entering date to"
          variant="outlined"
          onFocus={handleToggle}
          value={input.value.endDate}
        />
      </Stack>
      <Box sx={{ position: 'absolute' }}>
        <Box sx={{ position: 'relative', zIndex: 10000 }}>
          <MUIDateRangePicker
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
