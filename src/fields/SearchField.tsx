import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { useDebounce } from 'hooks'
import { useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear'

interface SearchFieldProps {
  label: string
  placeholder: string
  value: string
  onSearch: (v: string) => void
}
export const SearchField = ({
  label,
  placeholder,
  onSearch,
  value,
}: SearchFieldProps) => {
  const [preSearch, setPreSearch] = useState(value)
  const search = useDebounce(preSearch, 750)

  const clearSearch = () => setPreSearch('')

  useEffect(() => {
    onSearch(search)
  }, [search])
  return (
    <FormControl variant={'outlined'} fullWidth>
      <InputLabel htmlFor={'find'}>{label}</InputLabel>
      <OutlinedInput
        id={'find'}
        value={preSearch}
        onChange={(e) => setPreSearch(e.target.value)}
        label={label}
        placeholder={placeholder}
        endAdornment={
          <>
            {search && (
              <InputAdornment position={'end'}>
                <IconButton onClick={clearSearch} size="large">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )}
          </>
        }
      />
    </FormControl>
  )
}
