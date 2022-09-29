import React from 'react'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'

interface Option {
  key: number | string
  label: string
  data: any
}

interface Props {
  label: string
  placeholder: string
  options: Option[]
  onSearch(value: string): void
  onSelect(optionData: Option['data']): void
  renderOption(option: Option): any
}

const SearchField: React.FC<Props> = (props) => {
  const {
    label,
    placeholder,
    options,
    onSearch,
    onSelect,
    renderOption,
  } = props

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleOpen: React.FocusEventHandler<HTMLInputElement> = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onSearch(event.target.value)
  }

  const handleSelect = (optionData: any) => () => {
    onSelect(optionData)
    handleClose()
  }

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',
        }}
      >
        <TextField
          label={label}
          placeholder={placeholder}
          onChange={handleSearch}
          onFocus={handleOpen}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: '100%',
            maxWidth: '100%',
          }}
        />
        <Box sx={{ position: 'relative' }}>
          <Fade in={open && options.length > 0}>
            <Paper
              sx={{
                width: '100%',
                maxWidth: '100%',
                maxHeight: 172,
                overflowY: 'auto',
                position: 'absolute',
                zIndex: 100,
              }}
              elevation={3}
            >
              <MenuList>
                {options.map((optionItem) => (
                  <MenuItem
                    key={optionItem.key}
                    onClick={handleSelect(optionItem.data)}
                  >
                    {renderOption(optionItem)}
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          </Fade>
        </Box>
      </Box>
    </ClickAwayListener>
  )
}

export default SearchField
