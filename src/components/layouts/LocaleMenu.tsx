import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MUILink from '@mui/material/Link'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export default function LocaleMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <MUILink
        fontSize="small"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          justifyContent: 'space-between',
          width: 40,
        }}
        onClick={handleClick}
      >
        EN
        <KeyboardArrowDownIcon fontSize="small" />
      </MUILink>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose} disableRipple>
          Russian
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          English
        </MenuItem>
      </Menu>
    </div>
  )
}
