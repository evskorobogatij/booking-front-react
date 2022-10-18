import {
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material'
import { useDebounce } from 'hooks'
import { useGetApplicationQuery } from 'modules/Application/applicationService'
import {
  CaseSearchItem,
  useCaseSearchMutation,
} from 'modules/Booking/state/externalSearchService'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface CasesExternalSearchProps {
  onSelect: (v: CaseSearchItem) => void
}

export const CasesExternalSearch = ({ onSelect }: CasesExternalSearchProps) => {
  const { t } = useTranslation()
  const [value, setValue] = useState<string>('')
  const searchString = useDebounce(value, 750)

  const applicationQuery = useGetApplicationQuery(null)
  const [casesSearch, { data, isLoading }] = useCaseSearchMutation()

  useEffect(() => {
    if (!applicationQuery.data) return
    casesSearch({
      params: {
        text: searchString,
        pageSize: 20,
        pageNumber: 0,
        sortBy: 'openCaseDate',
      },
      externalApi: applicationQuery.data,
    })
  }, [searchString])

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
          option.surname + ' ' + option.name + ' ' + option.partName
        }
        renderOption={(props, option) => (
          <li {...props}>
            {option.surname} {option.name} {option.partName}
            <Typography variant="caption" color="text.secondary" ml={3}>
              {option.openCaseDate}
            </Typography>
            <Typography variant="caption" color="text.secondary" ml={3}>
              {option.individualId}
            </Typography>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t('Search user in external service')}
            placeholder={t('Name, surname or patronymic or id')}
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
