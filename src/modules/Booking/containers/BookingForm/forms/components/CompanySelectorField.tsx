import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { FieldProps } from '../../../../../../components/redux-form/types'
import { useGetAllCompaniesQuery } from '../../../../../Company/company'
import { ListItemButton } from '@mui/material'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import CheckIcon from '@mui/icons-material/Check'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { CompanyModel } from '../../../../../Company/CompanyModel'
import { useTranslation } from 'react-i18next'

const CompanySelectorField: React.FC<FieldProps> = (props) => {
  const { input } = props

  const [query, setQuery] = React.useState('')
  const handleSetQuery: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value)
  }

  const { data: companies } = useGetAllCompaniesQuery({
    pageSize: !query ? 5 : 50,
    text: query,
  })

  const [open, setOpen] = React.useState(false)
  const handleToggleModal = () => setOpen(!open)

  const initialCompany =
    companies?.content.find((u) => u.id === parseInt(String(input.value))) ||
    null
  const [selected, setSelected] = React.useState<CompanyModel | null>(
    initialCompany
  )
  const handleSelect = (company: CompanyModel) => () => {
    setSelected(company)
  }

  const { t } = useTranslation()

  const handleContinue = () => {
    if (!selected) return

    input.onChange(selected.id)
    handleToggleModal()
  }

  return (
    <>
      <Dialog
        onClose={handleToggleModal}
        maxWidth="lg"
        open={open}
        sx={{ overflow: 'visible' }}
      >
        <DialogTitle>{t('Select company')}</DialogTitle>
        <DialogContent sx={{ overflow: 'visible' }}>
          <Stack direction="column" spacing={3} sx={{ width: 400 }}>
            <TextField
              label={t('Search company')}
              placeholder={t('Name of company')}
              onChange={handleSetQuery}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <List sx={{ width: '100%', maxHeight: 300, overflow: 'auto' }}>
              {companies &&
                companies.content.map((company: CompanyModel) => {
                  return (
                    <ListItemButton
                      onClick={handleSelect(company)}
                      key={company.id}
                    >
                      <ListItemIcon sx={{ mr: 0 }}>
                        {selected?.id === company.id && (
                          <CheckIcon color="primary" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={company.shortName}
                        secondary={company.longName}
                      />
                    </ListItemButton>
                  )
                })}
            </List>
            <Stack direction="row">
              <Button
                variant="outlined"
                onClick={handleContinue}
                disabled={!selected}
              >
                {t('Continue')}
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
      <Paper variant="outlined" sx={{ p: 2, width: '100%' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ width: '100%' }}
        >
          <Typography>
            <Typography variant="subtitle2">{t('Company')}</Typography>
            {initialCompany ? (
              <Box>
                <Typography>{initialCompany.shortName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {initialCompany.longName}
                </Typography>
              </Box>
            ) : (
              <Typography color="text.secondary">{t('None')}</Typography>
            )}
          </Typography>
          <Button onClick={handleToggleModal} sx={{ minWidth: 140 }}>
            {t('Select company')}
          </Button>
        </Stack>
      </Paper>
    </>
  )
}

export default CompanySelectorField
