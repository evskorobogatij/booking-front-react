import React from 'react'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { renderFormHelper } from './FormHelper'
import { InputLabel } from '@mui/material'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

export const renderMultiSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}: any) => {
  const value = input.value
    ? input.value.map((v: any) =>
        typeof v === 'object' ? JSON.stringify(v) : v
      )
    : []

  return (
    <FormControl
      error={touched && error}
      sx={{
        width: '100%',
      }}
    >
      <InputLabel id="multi-select" {...custom}>
        {label}
      </InputLabel>
      <Select
        labelId="multi-select"
        id="multi-select"
        label={label}
        placeholder={label}
        {...input}
        {...custom}
        fullWidth
        multiple
        value={value}
      >
        {children}
      </Select>
      <Stack spacing={0.75} direction="row" sx={{ mt: 1 }}>
        {value
          .map((v: string) => JSON.parse(v))
          .map((v: any) => (
            <Chip key={v.id} label={v.name} />
          ))}
      </Stack>
      {renderFormHelper({ touched, error })}
    </FormControl>
  )
}
