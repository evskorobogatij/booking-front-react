import * as React from 'react'

import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import useMediaQuery from '@mui/material/useMediaQuery'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import { Link } from 'react-router-dom'

interface EntityOptionsMenuProps {
  canEdit?: boolean
  canRemove?: boolean
  small?: boolean
  onRemove(): void
  onEdit(): void
  to?: string
}

const EntityOptionsMenu: React.FC<EntityOptionsMenuProps> = ({
  onEdit,
  onRemove,
  canEdit = true,
  canRemove = true,
  small,
  to,
}) => {
  const matches = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
  const size = small ? 'small' : undefined

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    event.stopPropagation()
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    handleClose()
    onEdit()
  }

  const handleRemove = () => {
    handleClose()
    onRemove()
  }

  if (matches) {
    return (
      <>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={(e) => {
            handleClose()
            e.stopPropagation()
          }}
        >
          <MenuItem onClick={handleEdit} disabled={!canEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleRemove} disabled={!canRemove}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Remove</ListItemText>
          </MenuItem>
          {to && (
            <Link to={to}>
              <MenuItem title="Open">
                <ListItemIcon>
                  <OpenInNewIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Open</ListItemText>
              </MenuItem>
            </Link>
          )}
        </Menu>
      </>
    )
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <Tooltip title="Edit">
        <IconButton onClick={handleEdit} size={size}>
          <EditIcon fontSize={size} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Remove">
        <IconButton onClick={handleRemove} size={size}>
          <DeleteIcon fontSize={size} />
        </IconButton>
      </Tooltip>
      {to && (
        <Tooltip title="Open">
          <Link to={to}>
            <IconButton size={size}>
              <OpenInNewIcon fontSize={size} />
            </IconButton>
          </Link>
        </Tooltip>
      )}
    </Stack>
  )
}

export default EntityOptionsMenu
