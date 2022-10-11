import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'

import {
  renderSelectField,
  renderTextField,
} from '../../../../components/redux-form'
import { FormProps } from '../../../../components/redux-form/types'
import { validators } from '../../../../utils'

import { BookingCreateForm } from '../../types'
import { dateTimeMask } from '../../../../utils/masks'
import MenuItem from '@mui/material/MenuItem'

import {
  sourceFundingOptionsFn,
  statusOfBookingOptions,
  typeOfBookingOptions,
} from '../../constants'
import { useGetAllComboRateQuery } from '../../../Rate/services'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import UserSelectorField from './forms/components/UserSelectorField'
import CompanySelectorField from './forms/components/CompanySelectorField'
import useMediaQuery from '@mui/material/useMediaQuery'

interface Props extends FormProps {
  edit?: boolean
}

const BookingForm = reduxForm<BookingCreateForm, Props>({
  form: 'booking',
})((props) => {
  const { handleSubmit, pristine, submitting, invalid, response, edit } = props
  const matchSm = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  const comboRateQuery = useGetAllComboRateQuery(null)
  return (
    <form onSubmit={handleSubmit}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={4}
        width={!matchSm ? 250 : 640}
      >
        <Field
          name="userId"
          component={UserSelectorField}
          required
          validate={[validators.required]}
        />
        <Field name="sendById" component={CompanySelectorField} />
        <Stack
          direction={!matchSm ? 'column' : 'row'}
          spacing={2}
          sx={{ width: '100%' }}
        >
          <Field
            name="typeOfBooking"
            label="Type"
            component={renderSelectField}
            disabled={edit}
            required
            validate={[validators.required]}
          >
            {typeOfBookingOptions.map(([k, l]) => (
              <MenuItem value={k} key={k}>
                {l}
              </MenuItem>
            ))}
          </Field>
          <Field
            name="statusOfBooking"
            label="Status"
            component={renderSelectField}
            required
            validate={[validators.required]}
          >
            {statusOfBookingOptions.map(([k, l]) => (
              <MenuItem value={k} key={k}>
                {l}
              </MenuItem>
            ))}
          </Field>
          <Field
            name="sourceFunding"
            label="Funding"
            component={renderSelectField}
            required
            validate={[validators.required]}
          >
            {sourceFundingOptionsFn().map(([k, l]) => (
              <MenuItem value={k} key={k}>
                {l}
              </MenuItem>
            ))}
          </Field>
        </Stack>
        <Stack
          direction={!matchSm ? 'column' : 'row'}
          spacing={2}
          sx={{ width: '100%' }}
        >
          <Field
            name="enteringDate"
            label="Entering date"
            required
            component={renderTextField}
            validate={[validators.required]}
            {...dateTimeMask}
          />
          <Field
            name="leavingDate"
            label="Leaving date"
            required
            component={renderTextField}
            validate={[validators.required]}
            {...dateTimeMask}
          />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <Field
            name="comboRateId"
            label="Combo rate"
            component={renderSelectField}
          >
            {comboRateQuery.data &&
              comboRateQuery.data.map((combo) => (
                <MenuItem value={combo.id} key={combo.id}>
                  <ListItemText>{combo.description}</ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    {combo.totalRate}
                  </Typography>
                </MenuItem>
              ))}
          </Field>
        </Stack>
        <LoadingButton
          variant="outlined"
          type="submit"
          disabled={invalid || pristine || submitting}
          loading={response.status === 'pending'}
          loadingPosition="center"
          sx={{ width: 120 }}
        >
          Save
        </LoadingButton>
      </Stack>
    </form>
  )
})

export default BookingForm
