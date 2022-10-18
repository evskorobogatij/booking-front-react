import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField } from '@mui/material'

export const renderTimeField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        placeholder={label}
        fullWidth
        error={touched && invalid}
        helperText={touched && error}
        value={input.value}
        onChange={input.onChange}
        pm
        {...input}
        {...custom}
        renderInput={(params) => <TextField {...params} required />}
      />
    </LocalizationProvider>
  )
}
