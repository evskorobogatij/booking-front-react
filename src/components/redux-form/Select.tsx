import React from 'react'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { FieldProps } from './types'
import { renderFormHelper } from './FormHelper'
import { InputLabel, styled } from '@mui/material'

const StyledFormLabel = styled(InputLabel)(() => ({
  '& .MuiFormLabel-asterisk': {
    color: 'red',
  },
}))

export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}: FieldProps) => {
  return (
    <FormControl
      error={touched && error}
      sx={{
        width: '100%',
      }}
    >
      <StyledFormLabel id="demo-select-small" {...custom}>
        {label}
      </StyledFormLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        label={label}
        placeholder={label}
        {...input}
        {...custom}
        fullWidth
        value={
          typeof input.value === 'object'
            ? JSON.stringify(input.value)
            : input.value
        }
      >
        {children}
      </Select>
      {renderFormHelper({ touched, error })}
    </FormControl>
  )
}
