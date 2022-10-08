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
import { ListItemText, MenuItem } from '@mui/material'
import { useGetAllRateComponentsQuery } from '../services'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

const ComboRateForm = reduxForm<RateComponentModel, FormProps>({
  form: 'comboRate',
})((props) => {
  const { handleSubmit, pristine, submitting, invalid, response } = props
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up('sm'))
  const { data, status } = useGetAllRateComponentsQuery(null)
  console.log(data, status)
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
          name="components[0]"
          label={t('Food component')}
          component={renderSelectField}
          required
          validate={[validators.required]}
        >
          {data &&
            data
              .filter((component) => component.type === 'FOOD_RATE')
              .map((component) => (
                <MenuItem value={JSON.stringify(component)}>
                  <ListItemText>{component.description}</ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    {component.rate} {component.currency}
                  </Typography>
                </MenuItem>
              ))}
        </Field>
        <Field
          name="components[1]"
          label={t('Treatment component')}
          component={renderSelectField}
          required
          validate={[validators.required]}
        >
          {data &&
            data
              .filter((component) => component.type === 'TREATMENT_RATE')
              .map((component) => (
                <MenuItem value={JSON.stringify(component)}>
                  <ListItemText>{component.description}</ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    {component.rate} {component.currency}
                  </Typography>
                </MenuItem>
              ))}
        </Field>
        <Field
          name="components[2]"
          label={t('Place component')}
          component={renderSelectField}
          required
          validate={[validators.required]}
        >
          {data &&
            data
              .filter((component) => component.type === 'PLACE_RATE')
              .map((component) => (
                <MenuItem value={JSON.stringify(component)}>
                  <ListItemText>{component.description}</ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    {component.rate} {component.currency}
                  </Typography>
                </MenuItem>
              ))}
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

export default ComboRateForm
