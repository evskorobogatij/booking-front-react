import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/lab/AlertTitle'
import Stack from '@mui/material/Stack'
import { useSnackbar } from 'notistack'
import {
  useCreateBookingGroupMutation,
  useCreateBookingMutation,
  useUpdateBookingMutation,
} from '../../state/bookingService'
import { BookingCreateForm } from '../../types'
import {
  SourceFundingEnum,
  StatusOfBookingEnum,
  TypeOfBookingEnum,
} from '../../types/enums'
import { DATE_FORMAT_TEMPLATE } from '../../../../constants'
import moment from 'moment'
import { useAuth } from '../../../../hooks'
import { useGetUserByUsernameQuery } from '../../../User/user'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import ManualBookingForm from './forms/ManualBookingForm'
import RepairBookingForm from './forms/RepairBookingForm'
import AutoBookingForm from './forms/AutoBookingForm'
import FindByIIDBookingForm from './forms/FindByIIDBookingForm'
import GroupBookingForm from './forms/GroupBookingForm'
import { PlaceModel, RoomModel } from '../../../Room/types'

interface Props {
  open: boolean
  onClose(): void
  initialValues?: BookingCreateForm
  initialDate?: string
  place: PlaceModel
  room: RoomModel
}

const BookingFormContainer: React.FC<Props> = (props) => {
  const { open, onClose, initialValues, place, initialDate } = props
  const { enqueueSnackbar } = useSnackbar()
  const auth = useAuth()

  let initEnteringDate = initialDate
    ? initialDate
    : moment().format(DATE_FORMAT_TEMPLATE)

  const [value, setValue] = React.useState(
    !!initialValues
      ? initialValues.typeOfBooking === TypeOfBookingEnum.INDIVIDUAL
        ? 0
        : initialValues.typeOfBooking === TypeOfBookingEnum.REPAIR
        ? 3
        : 4
      : 0
  )
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const [loadedUser, setLoadedUser] = React.useState({
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
  })
  const handleSetLoadedUser = (user: any) => {
    setLoadedUser({ ...loadedUser, [value]: user })
  }

  const { data: user } = useGetUserByUsernameQuery(auth.user.username)
  const [submitCreate, responseCreate] = useCreateBookingMutation()
  const [submitUpdate, responseUpdate] = useUpdateBookingMutation()
  const [
    submitCreateGroup,
    responseCreateGroup,
  ] = useCreateBookingGroupMutation()

  const handleSubmit = (values: BookingCreateForm) => {
    if (value === 4 && !initialValues) {
      submitCreateGroup({
        ...values,
        typeOfBooking: undefined,
      })
      return
    }

    if (initialValues) {
      submitUpdate({
        ...initialValues,
        ...values,
        placeId: place.id,
        typeOfBooking: undefined,
      })
    } else {
      submitCreate({
        ...values,
        placeId: place.id,
        typeOfBooking: [0, 1, 2].includes(value)
          ? TypeOfBookingEnum.INDIVIDUAL
          : value === 3
          ? TypeOfBookingEnum.REPAIR
          : TypeOfBookingEnum.GROUP,
      })
    }
  }

  React.useEffect(() => {
    if (
      (responseCreate && responseCreate.status === 'fulfilled') ||
      (responseCreateGroup && responseCreateGroup.status === 'fulfilled') ||
      (responseUpdate && responseUpdate.status === 'fulfilled')
    ) {
      onClose()
      enqueueSnackbar('Success booking', {
        variant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      })
    }

    if (
      (responseCreate && responseCreate.status === 'rejected') ||
      (responseCreateGroup && responseCreateGroup.status === 'rejected') ||
      (responseUpdate && responseUpdate.status === 'rejected')
    ) {
      enqueueSnackbar('Error booking', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      })
    }
  }, [responseCreate, responseUpdate, responseCreateGroup])

  return (
    <Dialog
      onClose={onClose}
      maxWidth="lg"
      open={open}
      sx={{ overflow: 'visible' }}
    >
      <DialogTitle>
        {initialValues ? 'Edit booking' : 'Create a booking'}
      </DialogTitle>
      <DialogContent
        sx={{ overflow: 'visible' }}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        <Stack direction="column" spacing={3} maxWidth="min-content">
          {!initialValues && (
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Manual" />
                <Tab label="Auto" />
                <Tab label="Find by id" />
                <Tab label="Repair" />
                <Tab label="Group" />
              </Tabs>
            </Box>
          )}
          {responseCreate && responseCreate.status === 'rejected' && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {/* @ts-ignore */}
              {response.error.data?.message || response.error.data?.error}
            </Alert>
          )}
          {responseUpdate && responseUpdate.status === 'rejected' && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {/* @ts-ignore */}
              {response.error.data?.message || response.error.data?.error}
            </Alert>
          )}
          {responseCreateGroup && responseCreateGroup.status === 'rejected' && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {/* @ts-ignore */}
              {response.error.data?.message || response.error.data?.error}
            </Alert>
          )}
          {value === 0 && (
            <ManualBookingForm
              onSubmit={handleSubmit}
              response={responseCreate || responseUpdate}
              initialValues={{
                statusOfBooking: StatusOfBookingEnum.BOOKED,
                enteringDate: initEnteringDate,
                userId: user?.id,
                ...initialValues,
              }}
              edit={!!initialValues}
            />
          )}
          {value === 1 && (
            <AutoBookingForm
              onSubmit={handleSubmit}
              response={responseCreate || responseUpdate}
              initialValues={Object.assign(
                {
                  statusOfBooking: StatusOfBookingEnum.BOOKED,
                  enteringDate: initEnteringDate,
                  userId: user?.id,
                  ...initialValues,
                },
                loadedUser[1] && loadedUser[1]
              )}
              edit={!!initialValues}
              onSetUser={handleSetLoadedUser}
            />
          )}
          {value === 2 && (
            <FindByIIDBookingForm
              onSubmit={handleSubmit}
              response={responseCreate || responseUpdate}
              initialValues={Object.assign(
                {
                  statusOfBooking: StatusOfBookingEnum.BOOKED,
                  enteringDate: initEnteringDate,
                  userId: user?.id,
                  ...initialValues,
                },
                loadedUser[2] && loadedUser[2]
              )}
              edit={!!initialValues}
              onSetUser={handleSetLoadedUser}
            />
          )}
          {value === 3 && (
            <RepairBookingForm
              onSubmit={handleSubmit}
              response={responseCreate || responseUpdate}
              initialValues={{
                statusOfBooking: StatusOfBookingEnum.BOOKED,
                sourceFunding: SourceFundingEnum.OTHER,
                enteringDate: initEnteringDate,
                userId: user?.id,
                ...initialValues,
              }}
              edit={!!initialValues}
            />
          )}
          {value === 4 && (
            <GroupBookingForm
              onSubmit={handleSubmit}
              response={responseCreate || responseUpdate}
              initialValues={{
                statusOfBooking: StatusOfBookingEnum.BOOKED,
                sourceFunding: SourceFundingEnum.OTHER,
                enteringDate: initEnteringDate,
                userId: user?.id,
                ...initialValues,
              }}
              edit={!!initialValues}
            />
          )}
          {/*<BookingForm*/}
          {/*  onSubmit={handleSubmit}*/}
          {/*  response={responseCreate || responseUpdate}*/}
          {/*  initialValues={{*/}
          {/*    statusOfBooking: StatusOfBookingEnum.BOOKED,*/}
          {/*    enteringDate: moment().format(DATE_FORMAT_TEMPLATE),*/}
          {/*    userId: user?.id,*/}
          {/*    ...initialValues,*/}
          {/*  }}*/}
          {/*  edit={!!initialValues}*/}
          {/*/>*/}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default BookingFormContainer