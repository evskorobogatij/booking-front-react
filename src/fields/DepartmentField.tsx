import React from 'react'
import { Field } from 'redux-form'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'

import { renderSelectField } from '../components/redux-form'
import { validators } from '../utils'

import { useGetAllDepartmentsQuery } from '../modules/Department/department'

const DepartmentField = () => {
  const departmentsQuery = useGetAllDepartmentsQuery({ page: 0 })

  return (
    <Field
      name="department"
      label="Department"
      component={renderSelectField}
      required
      validate={[validators.required]}
    >
      {departmentsQuery.data &&
        departmentsQuery.data.content.map((department) => (
          <MenuItem key={department.id} value={JSON.stringify(department)}>
            <ListItemText>{department.name}</ListItemText>
            <Typography variant="body2" color="text.secondary">
              {department.description}
            </Typography>
          </MenuItem>
        ))}
    </Field>
  )
}

export default DepartmentField
