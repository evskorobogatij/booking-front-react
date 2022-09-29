import React from 'react'
import { Field } from 'redux-form'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'

import { renderSelectField } from '../components/redux-form'
import { ListItemIcon } from '@mui/material'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

const c = (hex: string, name: string) => ({ hex, name })

const COLORS = [
  c('#f44336', 'red'),
  c('#e91e63', 'pink'),
  c('#9c27b0', 'purple'),
  c('#673ab7', 'deepPurple'),
  c('#3f51b5', 'indigo'),
  c('#2196f3', 'blue'),
  c('#03a9f4', 'lightBlue'),
  c('#00bcd4', 'cyan'),
  c('#009688', 'teal'),
  c('#4caf50', 'green'),
  c('#8bc34a', 'lightGreen'),
  c('#ffeb3b', 'yellow'),
  c('#ffc107', 'amber'),
  c('#ff9800', 'orange'),
  c('#ff5722', 'deepOrange'),
  c('#795548', 'brown'),
  c('#9e9e9e', 'grey'),
  c('#607d8b', 'blueGrey'),
]

const ColorField = () => {
  return (
    <Field name="color" label="Color" component={renderSelectField}>
      {COLORS.map((color) => (
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
