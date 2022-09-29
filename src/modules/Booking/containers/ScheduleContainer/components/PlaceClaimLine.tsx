import React from 'react'
import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { BookingModel } from '../../../types'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { getUserShortName } from '../../../../../utils'
import Paper from '@mui/material/Paper'
import EntityRemoveModal from '../../../../../components/layouts/EntityRemoveModal'
import { useRemoveBookingMutation } from '../../../state/bookingService'
import BookingFormContainer from '../../BookingForm/BookingFormContainer'
import { useAppSelector } from '../../../../../store'
import { TypeOfBookingEnum } from '../../../types/enums'
import { PlaceModel, RoomModel } from '../../../../Room/types'

// @ts-ignore
const moment = extendMoment(Moment)

interface Props {
  place: PlaceModel
  room: RoomModel
  booking: BookingModel
}

const PlaceClaimLine: React.FC<Props> = ({ booking, place, room }) => {
  const bookingFilters = useAppSelector((state) => state.bookingFilters)
  const [openRemoveModal, setOpenRemoveModal] = React.useState(false)
  const handleToggleRemoveModal = () => {
    setOpenRemoveModal(!openRemoveModal)
  }

  const [openEditModal, setOpenEditModal] = React.useState(false)
  const handleToggleEditModal = () => {
    setOpenEditModal(!openEditModal)
  }

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)

  const isOverflow = moment(bookingFilters.to).isBefore(booking.leavingDate)

  const w =
    Array.from(
      moment
        .range(moment(booking.leavingDate), moment(booking.enteringDate))
        .by('minutes')
    ).length / 30

  const overflow =
    Array.from(
      moment
        .range(
          moment(bookingFilters.to.slice(0, 10)).add(1, 'day'),
          moment(booking.leavingDate)
        )
        .by('minutes')
    ).length / 30

  const l =
    Array.from(
      moment
        .range(
          moment(bookingFilters.from.slice(0, 10)),
          moment(booking.enteringDate)
        )
        .by('minutes')
    ).length / 30

  const formData = {
    ...booking,
    placeId: place.id,
    comboRateId: booking.comboRate?.id,
    userId: booking.appUser.id,
    sendById: booking.sentByCompany?.id,
  }

  const color = ((t) => ({ palette }: any) => {
    switch (t) {
      case TypeOfBookingEnum.INDIVIDUAL:
        return palette.primary.main
      case TypeOfBookingEnum.REPAIR:
        return palette.secondary.main
      case TypeOfBookingEnum.GROUP:
        return palette.success.main
      case TypeOfBookingEnum.INTERNET_CHATBOT:
        return palette.info.main
      case TypeOfBookingEnum.INTERNET_WEB:
        return palette.info.main
      default:
        return palette.primary.main
    }
  })(booking.typeOfBooking)

  const borderColor = ((t) => ({ palette }: any) => {
    switch (t) {
      case TypeOfBookingEnum.INDIVIDUAL:
        return palette.primary.dark
      case TypeOfBookingEnum.REPAIR:
        return palette.secondary.dark
      case TypeOfBookingEnum.GROUP:
        return palette.success.dark
      case TypeOfBookingEnum.INTERNET_CHATBOT:
        return palette.info.dark
      case TypeOfBookingEnum.INTERNET_WEB:
        return palette.info.dark
      default:
        return palette.primary.dark
    }
  })(booking.typeOfBooking)

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          zIndex: 40,
          height: 35,
          left: l,
          width: w - (isOverflow ? overflow : 0),
        }}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: 12,
            borderRadius: isOverflow ? '8px 0 0 8px' : 8,
            marginTop: '11px',
            bgcolor: color,
            borderColor: borderColor,
          }}
          component="button"
          onClick={handleClick}
        />
      </Box>
      <Popover
        id={`PlaceClaimLine${booking.id}`}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={(event) => {
          event.stopPropagation()
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack
          direction="row"
          sx={{ p: 2, pb: 0 }}
          justifyContent="space-between"
          alignItems="center"
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <Typography variant="subtitle2">
            {getUserShortName(booking.appUser)}
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton size="small" onClick={handleToggleEditModal}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleToggleRemoveModal}>
              <DeleteIcon fontSize="small" />
            </IconButton>
            <BookingFormContainer
              open={openEditModal}
              onClose={handleToggleEditModal}
              place={place}
              room={room}
              initialValues={formData}
            />
          </Stack>
        </Stack>
        <Stack spacing={1} sx={{ p: 2 }}>
          <Paper variant="outlined" sx={{ p: 1 }}>
            <Stack direction="row" spacing={1}>
              <Typography variant="subtitle2" color="text.secondary">
                Full name:{' '}
              </Typography>
              <Typography>
                {booking.appUser.surname} {booking.appUser.name}{' '}
                {booking.appUser.patrName}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="subtitle2" color="text.secondary">
                Birth date:{' '}
              </Typography>
              <Typography>{booking.appUser.dob}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="subtitle2" color="text.secondary">
                IID:{' '}
              </Typography>
              <Typography>{booking.appUser.individualId}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="subtitle2" color="text.secondary">
                Gender:{' '}
              </Typography>
              <Typography>{booking.appUser.gender}</Typography>
            </Stack>
          </Paper>
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Type:{' '}
            </Typography>
            <Typography>{booking.typeOfBooking}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Status:{' '}
            </Typography>
            <Typography>{booking.statusOfBooking}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Source funding:{' '}
            </Typography>
            <Typography>{booking.sourceFunding}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Entering date:{' '}
            </Typography>
            <Typography>{booking.enteringDate}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Leaving date:{' '}
            </Typography>
            <Typography>{booking.leavingDate}</Typography>
          </Stack>
        </Stack>
      </Popover>
      <EntityRemoveModal
        open={openRemoveModal}
        onClose={handleToggleRemoveModal}
        entityData={booking.id}
        title="Do you want to delete a booking item?"
        mutation={useRemoveBookingMutation}
      />
    </>
  )
}

export default PlaceClaimLine
