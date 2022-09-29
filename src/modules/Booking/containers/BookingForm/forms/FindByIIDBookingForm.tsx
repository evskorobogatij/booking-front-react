import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import ListItemText from '@mui/material/ListItemText'
import useMediaQuery from '@mui/material/useMediaQuery'
import UserSelectorField from './components/UserSelectorField'
import CompanySelectorField from './components/CompanySelectorField'
import DateRangeFields from './components/DateRangeFields'
import SearchField from './components/SearchField'
import {
  renderSelectField,
  renderTextField,
} from '../../../../../components/redux-form'
import { FormProps } from '../../../../../components/redux-form/types'
import { validators } from '../../../../../utils'
import { useDebounce } from '../../../../../hooks'
import { BookingCreateForm } from '../../../types'
import { dateMask, phoneMask } from '../../../../../utils/masks'
import {
  sourceFundingOptions,
  statusOfBookingOptions,
} from '../../../constants'

import { useGetAllComboRateQuery } from '../../../../Rate/services'
import {
  PersonItem,
  useFindPersonByIdMutation,
} from '../../../state/externalSearchService'
import { useGetApplicationQuery } from '../../../../Application/applicationService'
import PlaceSelector from './components/PlaceSelector'

interface Props extends FormProps {
  edit?: boolean
  enteringDate?: string
  onSetUser?: any
}

const convertResponseToOptions = (data: PersonItem[] | undefined) => {
  if (!data) return []

  return data.map((v) => ({
    key: v.individualId,
    label: v.name,
    data: v,
  }))
}

const renderOption = ({ data }: any) => (
  <>
    {data.surname} {data.name} {data.partName}{' '}
    <Typography variant="caption" color="text.secondary" ml={3}>
      {data.dob} {data.individualId}
    </Typography>
  </>
)

const FindByIIDBookingForm = reduxForm<BookingCreateForm, Props>({
  form: 'findByIIDBooking',
  enableReinitialize: true,
})((props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    invalid,
    response,
    onSetUser,
  } = props

  const matchSm = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  const comboRateQuery = useGetAllComboRateQuery(null)
  const applicationQuery = useGetApplicationQuery(null)
  const [find, { data }] = useFindPersonByIdMutation()

  const handleSetUser = (user: PersonItem) => {
    console.log(user)
    onSetUser(user)
  }

  const [query, setQuery] = React.useState('')
  const debouncedQuery = useDebounce(query, 500)
  const handleSetQuery = (value: string) => {
    setQuery(value)
  }

  React.useEffect(() => {
    if (debouncedQuery && applicationQuery.data) {
      find({
        params: debouncedQuery,
        externalApi: applicationQuery.data,
      })
    }
  }, [debouncedQuery])

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
                {sourceFundingOptions.map(([k, l]) => (
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
            <DateRangeFields form="findByIIDBooking" />
          </Stack>
        </Paper>
        <Paper sx={{ p: 2 }} variant="outlined">
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            User
          </Typography>
          <Stack spacing={3}>
            <SearchField
              label="Search user by individual ID"
              placeholder="Individual ID"
              onSearch={handleSetQuery}
              onSelect={handleSetUser}
              options={convertResponseToOptions(data)}
              renderOption={renderOption}
            />
            <Stack
              spacing={3}
              direction={matchSm ? 'row' : 'column'}
              width="100%"
            >
              <Field
                name="name"
                label="Name"
                disabled
                component={renderTextField}
              />
              <Field
                name="surname"
                label="Surname"
                disabled
                component={renderTextField}
              />
              <Field
                name="patronymicName"
                label="Middle name"
                disabled
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
                disabled
                component={renderTextField}
                {...dateMask}
              />
              <Field
                name="individualId"
                label="Individual ID"
                disabled
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

export default FindByIIDBookingForm
