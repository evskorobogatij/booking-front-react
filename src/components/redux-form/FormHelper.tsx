import FormHelperText from '@mui/material/FormHelperText'
import React from 'react'

export const renderFormHelper = ({
  touched,
  error,
}: {
  touched: boolean
  error: boolean
}) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}
