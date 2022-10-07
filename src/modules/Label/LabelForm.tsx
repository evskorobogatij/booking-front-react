import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Stack from '@mui/material/Stack'
import { renderTextField } from '../../components/redux-form'
import { validators } from '../../utils'
import LoadingButton from '@mui/lab/LoadingButton'
import { LabelModel } from '../../types'
import { FormProps } from '../../components/redux-form/types'
import useMediaQuery from '@mui/material/useMediaQuery'
import ColorField from '../../fields/ColorField'
import { useTranslation } from 'react-i18next'

const LabelForm = reduxForm<LabelModel, FormProps>({
  form: 'label',
})((props) => {
  const { handleSubmit, pristine, submitting, invalid, response } = props
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up('sm'))
  const { t } = useTranslation()

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
          name="name"
          label={t('Name')}
          required
          component={renderTextField}
          validate={[validators.required]}
        />
        <Field
          name="description"
          label={t('Description')}
          component={renderTextField}
        />
        <ColorField />
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

export default LabelForm
