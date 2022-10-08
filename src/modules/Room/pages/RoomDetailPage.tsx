import React from 'react'
import RoomDetailContainer from '../containers/RoomDetailContainer'
import { Link, useParams } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import MUILink from '@mui/material/Link'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import HomeIcon from '@mui/icons-material/Home'
import { useTranslation } from 'react-i18next'

type Params = { id: string }

const RoomsListPage: React.FC = () => {
  const { id } = useParams<Params>()

  const roomId: number = parseInt(id)
  const { t } = useTranslation()

  return (
    <Stack spacing={2}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">
          <MUILink
            underline="hover"
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <HomeIcon fontSize="inherit" />
          </MUILink>
        </Link>
        <Link to="/rooms">
          <MUILink
            underline="hover"
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {t('Rooms')}
          </MUILink>
        </Link>
        <Typography color="text.primary">{roomId}</Typography>
      </Breadcrumbs>
      <RoomDetailContainer id={roomId} />
    </Stack>
  )
}

export default RoomsListPage
