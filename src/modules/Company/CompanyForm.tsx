import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Stack from '@mui/material/Stack'
import { renderTextField } from '../../components/redux-form'
import { validators } from '../../utils'
import LoadingButton from '@mui/lab/LoadingButton'
import { CompanyModel } from '../../types'
import { FormProps } from '../../components/redux-form/types'
import useMediaQuery from '@mui/material/useMediaQuery'

const CompanyForm = reduxForm<CompanyModel, FormProps>({
  form: 'company',
})((props) => {
  const { handleSubmit, pristine, submitting, response, invalid } = props
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up('sm'))

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={3}
        width={matches ? 350 : 250}
      >
        <Field
          name="shortName"
          label="Name"
          required
          component={renderTextField}
          validate={[validators.required]}
        />
        <Field
          name="longName"
          label="Full name"
          required
          component={renderTextField}
          validate={[validators.required]}
        />
        <Field
          name="region"
          label="Region"
          required
          component={renderTextField}
          validate={[validators.required]}
        />
        <Field name="area" label="Area" component={renderTextField} />
        <LoadingButton
          variant="outlined"
          type="submit"
          disabled={invalid || pristine || submitting}
          loading={response.status === 'pending'}
          loadingPosition="center"
        >
          Save
        </LoadingButton>
      </Stack>
    </form>
  )
})

export default CompanyForm
