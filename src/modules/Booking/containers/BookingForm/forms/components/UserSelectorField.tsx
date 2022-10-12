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
import { useGetAllUsersQuery } from '../../../../../User/user'
import { ListItemButton } from '@mui/material'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import CheckIcon from '@mui/icons-material/Check'
import { getUserShortName } from '../../../../../../utils'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { UserModel } from '../../../../../User/UserModel'
import FormHelperText from '@mui/material/FormHelperText'
import { useTranslation } from 'react-i18next'

const UserSelectorField: React.FC<FieldProps> = (props) => {
  const {
    input,
    meta: { touched, invalid, error },
  } = props

  const { t } = useTranslation()
  const [query, setQuery] = React.useState('')
  const handleSetQuery: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value)
  }

  const { data: users } = useGetAllUsersQuery({ pageSize: 50, text: query })

  const initialUser =
    users?.content.find((u) => u.id === parseInt(String(input.value))) || null
  const [selected, setSelected] = React.useState<UserModel | null>(initialUser)
  const handleSelectUser = (user: UserModel) => () => {
    setSelected(user)
  }

  const [open, setOpen] = React.useState(false)
  const handleToggleModal = () => {
    setOpen(!open)

    if (open) {
      input.onFocus(null as any)
    } else {
      input.onBlur(selected?.id)
    }
  }

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
        <DialogTitle>{t('Select user')}</DialogTitle>
        <DialogContent sx={{ overflow: 'visible' }}>
          <Stack direction="column" spacing={3} sx={{ width: 400 }}>
            <TextField
              label={t('Search user')}
              placeholder={t('Username or name')}
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
              {users &&
                users.content.map((user) => {
                  return (
                    <ListItemButton
                      onClick={handleSelectUser(user)}
                      key={user.id}
                    >
                      <ListItemIcon sx={{ mr: 0 }}>
                        {selected?.id === user.id && (
                          <CheckIcon color="primary" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={getUserShortName(user)}
                        secondary={[user.username, user.dob, user.gender]
                          .filter((v) => !!v)
                          .join(', ')}
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
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          width: '100%',
          ...(touched &&
            invalid && { borderColor: (theme) => theme.palette.error.main }),
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{
            width: '100%',
          }}
        >
          <Typography>
            <Typography variant="subtitle2">{t('Booking by')}</Typography>
            {initialUser ? (
              <Box>
                <Typography>{getUserShortName(initialUser)}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {initialUser.username}
                </Typography>
              </Box>
            ) : (
              <Typography color="text.secondary">{t('None')}</Typography>
            )}
          </Typography>
          <Button onClick={handleToggleModal} sx={{ minWidth: 140 }}>
            {t('Select user')}
          </Button>
        </Stack>
        <FormHelperText sx={{ color: (theme) => theme.palette.error.main }}>
          {touched && error}
        </FormHelperText>
      </Paper>
    </>
  )
}

export default UserSelectorField
