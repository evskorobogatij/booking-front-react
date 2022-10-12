import {
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material'
import { useDebounce } from 'hooks'
import { useGetApplicationQuery } from 'modules/Application/applicationService'
import {
  EmployeeItem,
  useCaseSearchMutation,
  useFindEmployeeMutation,
} from 'modules/Booking/state/externalSearchService'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface UserExternalSearchProps {
  onSelect: (extUser: EmployeeItem) => void
}

export const UserExternalSearch = ({ onSelect }: UserExternalSearchProps) => {
  const { t } = useTranslation()
  const [value, setValue] = useState<string>('')
  const searchString = useDebounce(value, 750)

  const applicationQuery = useGetApplicationQuery(null)
  const [findEmployee, { data, isLoading }] = useFindEmployeeMutation()
  const [] = useCaseSearchMutation()

  //   const [options, setOptions] = useState<readonly EmployeeItem[]>([])

  useEffect(() => {
    if (!applicationQuery.data) return
    console.log('search for', searchString)
    findEmployee({
      params: {
        text: searchString,
        pageSize: 20,
        pageNumber: 0,
      },
      externalApi: applicationQuery.data,
    })
  }, [searchString])

  //   useEffect(() => {
  //     if (data) setOptions(data.content)
  //   }, [data])

  return (
    <>
      <Autocomplete
        id="external_user_search"
        options={data ? data.content : []}
        fullWidth
        loading={isLoading}
        noOptionsText={t('Nothing find')}
        loadingText={t('Searching')}
        inputValue={value}
        onInputChange={(_, v) => setValue(v)}
        onChange={(_, v) => v && onSelect(v)}
        getOptionLabel={(option) =>
          option.surname + ' ' + option.name + ' ' + option.patrName
        }
        renderOption={(props, option) => (
          <li {...props}>
            {option.surname} {option.name} {option.patrName}
            <Typography variant="caption" color="text.secondary" ml={3}>
              {option.individualId}
            </Typography>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t('Search user in external service')}
            placeholder={t('Type for search')}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </>
  )
}
