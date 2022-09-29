import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'

import { renderSelectField } from '../../../../../components/redux-form'
import { FormProps } from '../../../../../components/redux-form/types'
import { validators } from '../../../../../utils'

import { BookingCreateForm } from '../../../types'
import MenuItem from '@mui/material/MenuItem'

import {
  sourceFundingOptions,
  statusOfBookingOptions,
} from '../../../constants'
import Typography from '@mui/material/Typography'
import UserSelectorField from './components/UserSelectorField'
import useMediaQuery from '@mui/material/useMediaQuery'
import Paper from '@mui/material/Paper'
import DateRangeFields from './components/DateRangeFields'
import { SourceFundingEnum, StatusOfBookingEnum } from '../../../types/enums'
import PlaceSelector from './components/PlaceSelector'

interface Props extends FormProps {
  edit?: boolean
  enteringDate?: string
}

const GroupBookingForm = reduxForm<BookingCreateForm, Props>({
  form: 'groupBooking',
})((props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    invalid,
    response,
    initialValues,
  } = props
  console.log(initialValues)
  const matchSm = useMediaQuery((theme: any) => theme.breakpoints.up('md'))

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
            <Field name="placesId" component={PlaceSelector} isGroup />
            <Field name="userId" component={UserSelectorField} />
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
                disabled
                validate={[validators.required]}
              >
                {statusOfBookingOptions.map(([k, l]) => (
                  <MenuItem
                    value={k}
                    key={k}
                    selected={k === StatusOfBookingEnum.BOOKED}
                  >
                    {l}
                  </MenuItem>
                ))}
              </Field>
              <Field
                name="sourceFunding"
                label="Funding"
                component={renderSelectField}
                required
                disabled
                validate={[validators.required]}
              >
                {sourceFundingOptions.map(([k, l]) => (
                  <MenuItem
                    value={k}
                    key={k}
                    selected={k === SourceFundingEnum.OTHER}
                  >
                    {l}
                  </MenuItem>
                ))}
              </Field>
            </Stack>
            <DateRangeFields form="groupBooking" />
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

export default GroupBookingForm
