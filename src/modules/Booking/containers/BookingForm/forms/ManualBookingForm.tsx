import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'

import {
  renderSelectField,
  renderTextField,
} from '../../../../../components/redux-form'
import { FormProps } from '../../../../../components/redux-form/types'
import { validators } from '../../../../../utils'

import { BookingCreateForm } from '../../../types'
import { dateMask, phoneMask } from '../../../../../utils/masks'
import MenuItem from '@mui/material/MenuItem'

import {
  sourceFundingOptionsFn,
  statusOfBookingOptions,
} from '../../../constants'
import { useGetAllComboRateQuery } from '../../../../Rate/services'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import UserSelectorField from './components/UserSelectorField'
import CompanySelectorField from './components/CompanySelectorField'
import useMediaQuery from '@mui/material/useMediaQuery'
import Paper from '@mui/material/Paper'
import DateRangeFields from './components/DateRangeFields'
import PlaceSelector from './components/PlaceSelector'

interface Props extends FormProps {
  edit?: boolean
  enteringDate?: string
}

const ManualBookingForm = reduxForm<BookingCreateForm, Props>({
  form: 'manualBooking',
})((props) => {
  const { handleSubmit, pristine, submitting, invalid, response } = props

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
        <Paper sx={{ p: 2, width: '100%' }} variant="outlined">
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Common
          </Typography>
          <Stack spacing={3}>
            <Field name="placeId" component={PlaceSelector} />
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
            <DateRangeFields form="manualBooking" />
          </Stack>
        </Paper>
        <Paper sx={{ p: 2 }} variant="outlined">
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            User
          </Typography>
          <Stack spacing={3}>
            <Stack
              spacing={3}
              direction={matchSm ? 'row' : 'column'}
              width="100%"
            >
              <Field name="name" label="Name" component={renderTextField} />
              <Field
                name="surname"
                label="Surname"
                component={renderTextField}
              />
              <Field
                name="patronymicName"
                label="Middle name"
                component={renderTextField}
              />
            </Stack>
            <Stack
              spacing={3}
              direction={matchSm ? 'row' : 'column'}
              width="100%"
            >
              <Field
                name="dob"
                label="Birth Date"
                component={renderTextField}
                {...dateMask}
              />
              <Field
                name="individualId"
                label="Individual ID"
                component={renderTextField}
              />
              <Field
                name="phoneNumber"
                label="Phone"
                component={renderTextField}
                {...phoneMask}
              />
            </Stack>
            <Stack
              spacing={3}
              direction={matchSm ? 'row' : 'column'}
              width="100%"
            >
              <Field
                name="email"
                label="Email"
                type="email"
                component={renderTextField}
                validate={[validators.email]}
              />
              <Field name="note" label="Note" component={renderTextField} />
            </Stack>
          </Stack>
        </Paper>
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

export default ManualBookingForm
