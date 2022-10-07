import React from 'react'
import { Field } from 'redux-form'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'

import { renderSelectField } from '../components/redux-form'
import { ListItemIcon } from '@mui/material'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'

const c = (hex: string, name: string) => ({ hex, name })

// const COLORS = [
//   c('#f44336', 'red'),
//   c('#e91e63', 'pink'),
//   c('#9c27b0', 'purple'),
//   c('#673ab7', 'deepPurple'),
//   c('#3f51b5', 'indigo'),
//   c('#2196f3', 'blue'),
//   c('#03a9f4', 'lightBlue'),
//   c('#00bcd4', 'cyan'),
//   c('#009688', 'teal'),
//   c('#4caf50', 'green'),
//   c('#8bc34a', 'lightGreen'),
//   c('#ffeb3b', 'yellow'),
//   c('#ffc107', 'amber'),
//   c('#ff9800', 'orange'),
//   c('#ff5722', 'deepOrange'),
//   c('#795548', 'brown'),
//   c('#9e9e9e', 'grey'),
//   c('#607d8b', 'blueGrey'),
// ]

const LocalizedColors = () => {
  const { t } = useTranslation()
  return [
    c('#f44336', t('color.red')),
    c('#e91e63', t('color.pink')),
    c('#9c27b0', t('color.purple')),
    c('#673ab7', t('color.deepPurple')),
    c('#3f51b5', t('color.indigo')),
    c('#2196f3', t('color.blue')),
    c('#03a9f4', t('color.lightBlue')),
    c('#00bcd4', t('color.cyan')),
    c('#009688', t('color.teal')),
    c('#4caf50', t('color.green')),
    c('#8bc34a', t('color.lightGreen')),
    c('#ffeb3b', t('color.yellow')),
    c('#ffc107', t('color.amber')),
    c('#ff9800', t('color.orange')),
    c('#ff5722', t('color.deepOrange')),
    c('#795548', t('color.brown')),
    c('#9e9e9e', t('color.grey')),
    c('#607d8b', t('color.blueGrey')),
  ]
}

const ColorField = () => {
  const { t } = useTranslation()
  return (
    <Field name="color" label={t('Color')} component={renderSelectField}>
      {LocalizedColors().map((color) => (
        <MenuItem key={color.hex} value={color.hex}>
          <Stack direction="row" alignItems="center">
            <ListItemIcon>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  backgroundColor: color.hex,
                }}
              />
            </ListItemIcon>
            <ListItemText>{color.name}</ListItemText>
          </Stack>
        </MenuItem>
      ))}
    </Field>
  )
}

export default ColorField
