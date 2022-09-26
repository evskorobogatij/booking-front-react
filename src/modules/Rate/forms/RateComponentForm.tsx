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

const RateComponentForm = reduxForm<RateComponentModel, FormProps>({
  form: 'rateComponent',
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
        width={matches ? 350 : 250}
      >
        <Field
          name="description"
          label="Description"
          component={renderTextField}
          required
          validate={[validators.required]}
        />
        <Field
          name="rate"
          label="Rate"
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
          label="Type"
          component={renderSelectField}
          required
          validate={[validators.required]}
        >
          <MenuItem value="FOOD_RATE">FOOD_RATE</MenuItem>
          <MenuItem value="PLACE_RATE">PLACE_RATE</MenuItem>
          <MenuItem value="TREATMENT_RATE">TREATMENT_RATE</MenuItem>
        </Field>
        <Field
          name="currency"
          label="Currency"
          component={renderSelectField}
          required
          validate={[validators.required]}
        >
          <MenuItem value="EURO">EURO</MenuItem>
          <MenuItem value="DOLLAR">DOLLAR</MenuItem>
          <MenuItem value="POUND_STERLING">POUND_STERLING</MenuItem>
          <MenuItem value="JAPAN_YEN">JAPAN_YEN</MenuItem>
          <MenuItem value="ROUBLE">ROUBLE</MenuItem>
        </Field>
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

export default RateComponentForm
