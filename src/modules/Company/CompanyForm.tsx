import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Stack from '@mui/material/Stack'
import { renderTextField } from '../../components/redux-form'
import { validators } from '../../utils'
import LoadingButton from '@mui/lab/LoadingButton'
import { CompanyModel } from '../../types'
import { FormProps } from '../../components/redux-form/types'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslation } from 'react-i18next'

const CompanyForm = reduxForm<CompanyModel, FormProps>({
  form: 'company',
})((props) => {
  const { t } = useTranslation()
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
          label={t('Name')}
          required
          component={renderTextField}
          validate={[validators.required]}
        />
        <Field
          name="longName"
          label={t('Full name')}
          required
          component={renderTextField}
          validate={[validators.required]}
        />
        <Field
          name="region"
          label={t('Region')}
          required
          component={renderTextField}
          validate={[validators.required]}
        />
        <Field name="area" label={t('Area')} component={renderTextField} />
        <LoadingButton
          variant="outlined"
          type="submit"
          disabled={invalid || pristine || submitting}
          loading={response.status === 'pending'}
          loadingPosition="center"
        >
          {t('Save')}
        </LoadingButton>
      </Stack>
    </form>
  )
})

export default CompanyForm
