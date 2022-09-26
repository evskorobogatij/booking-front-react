import React from 'react'
import Stack from '@mui/material/Stack'
import { Field, reduxForm } from 'redux-form'
import { renderTextField } from '../../components/redux-form'
import { validators } from '../../utils'
import LoadingButton from '@mui/lab/LoadingButton'
import { SignInFields } from './types'

const SignInForm = reduxForm<SignInFields, { loading: boolean }>({
  form: 'signIn',
})((props) => {
  const { handleSubmit, pristine, submitting, loading, invalid } = props

  return (
    <Stack
      direction="column"
      spacing={3}
      width="100%"
      component="form"
      onSubmit={handleSubmit}
    >
      <Field
        name="username"
        label="Username"
        required
        component={renderTextField}
        validate={[validators.required]}
      />
      <Field
        name="password"
        type="password"
        label="Password"
        required
        component={renderTextField}
        validate={[validators.required]}
      />
      <LoadingButton
        variant="outlined"
        type="submit"
        disabled={invalid || pristine || submitting}
        loading={loading}
        loadingPosition="center"
        size="large"
      >
        Sign In
      </LoadingButton>
    </Stack>
  )
})

export default SignInForm
