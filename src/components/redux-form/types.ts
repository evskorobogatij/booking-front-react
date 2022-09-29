import React from 'react'
import type { WrappedFieldProps } from 'redux-form/lib/Field'

export interface FieldProps extends WrappedFieldProps {
  label: string
  children?: React.ReactNode
  disabled?: boolean
}

export interface FormProps {
  response: any
}
