import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Stack from '@mui/material/Stack'
import { renderTextField } from '../../components/redux-form'
import LoadingButton from '@mui/lab/LoadingButton'
import { FormProps } from '../../components/redux-form/types'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ApplicationModel } from './types'

const ApplicationForm = reduxForm<ApplicationModel, FormProps>({
  form: 'applicationForm',
})((props) => {
  const { handleSubmit, pristine, submitting, invalid, response } = props
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up('sm'))

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={3}
        width={matches ? 350 : undefined}
      >
        <Field
          name="nameOfAppTitle"
          label="Name of app title"
          component={renderTextField}
        />
        <Field
          name="nameOfAppSubtitle"
          label="Name of app subtitle"
          component={renderTextField}
        />
        <Field
          name="footerText"
          label="Footer text"
          component={renderTextField}
        />
        <Field
          name="externalApiConnectorString"
          label="External API connector string"
          component={renderTextField}
        />
        <Field
          name="externalApiUsername"
          label="External API username"
          autoComplete="new-password"
          component={renderTextField}
        />
        <Field
          name="externalApiPassword"
          label="External API password"
          autoComplete="new-password"
          type="password"
          component={renderTextField}
        />
        <LoadingButton
          variant="outlined"
          type="submit"
          disabled={invalid || pristine || submitting}
          loading={response.status === 'pending'}
          loadingPosition="center"
          sx={{ width: '120px' }}
        >
          Save
        </LoadingButton>
      </Stack>
    </form>
  )
})

export default ApplicationForm
