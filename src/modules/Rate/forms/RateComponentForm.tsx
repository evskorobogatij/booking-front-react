import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Stack from '@mui/material/Stack'
import {
  renderSelectField,
  renderTextField,
} from '../../../components/redux-form'
import { validators } from '../../../utils'
import LoadingButton from '@mui/lab/LoadingButton'
import type { RateComponentModel } from '../types'
import useMediaQuery from '@mui/material/useMediaQuery'
import { FormProps } from '../../../components/redux-form/types'
import { MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'

const RateComponentForm = reduxForm<RateComponentModel, FormProps>({
  form: 'rateComponent',
})((props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    invalid,
    response,
    initialValues,
  } = props
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
          name="description"
          label={t('Description')}
          component={renderTextField}
          required
          validate={[validators.required]}
        />
        <Field
          name="rate"
          label={t('Rate')}
          component={renderTextField}
          required
          validate={[
            validators.required,
            validators.number,
            validators.minValue(0),
          ]}
        />
        <Field
          name="type"
          label={t('Type')}
          component={renderSelectField}
          required
          validate={[validators.required]}
          disabled={!!initialValues}
        >
          <MenuItem value="FOOD_RATE">{t('FOOD_RATE')}</MenuItem>
          <MenuItem value="PLACE_RATE">{t('PLACE_RATE')}</MenuItem>
          <MenuItem value="TREATMENT_RATE">{t('TREATMENT_RATE')}</MenuItem>
        </Field>
        <Field
          name="currency"
          label={t('Currency')}
          component={renderSelectField}
          required
          validate={[validators.required]}
        >
          <MenuItem value="EURO">{t('EURO')}</MenuItem>
          <MenuItem value="DOLLAR">{t('DOLLAR')}</MenuItem>
          <MenuItem value="POUND_STERLING">{t('POUND_STERLING')}</MenuItem>
          <MenuItem value="JAPAN_YEN">{t('JAPAN_YEN')}</MenuItem>
          <MenuItem value="ROUBLE">{t('ROUBLE')}</MenuItem>
        </Field>
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

export default RateComponentForm
