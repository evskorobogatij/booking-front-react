import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MUILink from '@mui/material/Link'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useTranslation } from 'react-i18next'

export default function LocaleMenu() {
  const { t, i18n } = useTranslation()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const setRussian = () => {
    i18n.changeLanguage('ru')
    handleClose()
  }

  const setEnglish = () => {
    i18n.changeLanguage('en')
    handleClose()
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
        {i18n.language.toLocaleUpperCase()}
        <KeyboardArrowDownIcon fontSize="small" />
      </MUILink>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={setRussian} disableRipple>
          {t('Russian')}
        </MenuItem>
        <MenuItem onClick={setEnglish} disableRipple>
          {t('English')}
        </MenuItem>
      </Menu>
    </div>
  )
}
