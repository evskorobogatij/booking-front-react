import React from 'react'
import RoomsListContainer from '../containers/RoomsListContainer/RoomsListContainer'
import EntityPage from '../../../components/layouts/EntityPage'
import RoomForm from '../forms/RoomForm'
import {
  useCreateRoomGroupMutation,
  useCreateRoomMutation,
} from '../services/roomService'
import EntityFormModal from '../../../components/layouts/EntityFormModal'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import GroupRoomForm from '../forms/GroupRoomForm'

const RoomsListPage: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <EntityPage
      title="Rooms"
      container={<RoomsListContainer />}
      createBtnTitle="New room"
      form={RoomForm}
      mutation={useCreateRoomMutation}
      header={
        <>
          <Button
            variant="text"
            startIcon={<AddIcon />}
            onClick={handleToggle}
            sx={{ ml: 2 }}
          >
            New group
          </Button>
          <EntityFormModal
            onClose={handleToggle}
            open={open}
            form={GroupRoomForm}
            mutation={useCreateRoomGroupMutation}
            title="New group room"
          />
        </>
      }
    />
  )
}

export default RoomsListPage
