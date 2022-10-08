import React from 'react'
import { Field } from 'redux-form'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'

import { renderSelectField } from '../components/redux-form'
import { validators } from '../utils'

import { useGetAllLabelsQuery } from '../modules/Label/label'
import { useTranslation } from 'react-i18next'

const LabelField = () => {
  const labelsQuery = useGetAllLabelsQuery(null)
  const { t } = useTranslation()

  return (
    <Field
      name="label"
      label={t('Label')}
      component={renderSelectField}
      required
      validate={[validators.required]}
    >
      {labelsQuery.data &&
        labelsQuery.data.map((label) => (
          <MenuItem key={label.id} value={JSON.stringify(label)}>
            <ListItemText sx={{ color: label.color }}>
              {label.name}
            </ListItemText>
            <Typography variant="body2" color="text.secondary">
              {label.description}
            </Typography>
          </MenuItem>
        ))}
    </Field>
  )
}

export default LabelField
