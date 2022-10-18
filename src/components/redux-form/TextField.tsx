import React from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { styled } from '@mui/material'

const StyledTextField = styled(TextField)(() => ({
  '& .MuiFormLabel-asterisk': {
    color: 'red',
  },
}))

export const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}: any) => {
  const [show, toggle] = React.useState(false)

  return (
    <StyledTextField
      label={label}
      placeholder={label}
      fullWidth
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
      type={
        custom.type === 'password' ? (show ? 'text' : 'password') : custom.type
      }
      InputProps={{
        endAdornment: custom.type === 'password' && (
          <InputAdornment position="end">
            <IconButton onClick={() => toggle(!show)}>
              {show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}
