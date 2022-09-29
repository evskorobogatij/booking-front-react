import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'
import { renderSelectField } from '../../../../components/redux-form'
import { useGetAllDepartmentsQuery } from '../../../Department/department'
import { useGetAllLabelsQuery } from '../../../Label/label'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { useGetAllHospitalsQuery } from '../../../Hospital/hospital'
import { BookingSearchParams } from '../../types/BookingSearchParams'
import {
  sourceFundingOptions,
  statusOfBookingOptions,
  typeOfBookingOptions,
} from '../../constants'
import useMediaQuery from '@mui/material/useMediaQuery'

const FiltersForm = reduxForm<
  Omit<BookingSearchParams, 'enteringDateTo' | 'enteringDateFrom'>
>({
  form: 'bookingFilters',
})((props) => {
  const { handleSubmit } = props
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up('sm'))
  const departmentsQuery = useGetAllDepartmentsQuery({ page: 0 })
  const labelsQuery = useGetAllLabelsQuery(null)
  const hospitalsQuery = useGetAllHospitalsQuery(null)

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={3}
        sx={{ width: matches ? 350 : 250 }}
      >
        <Field
          name="departmentId"
          label="Department"
          component={renderSelectField}
        >
          <MenuItem value="">None</MenuItem>
          {departmentsQuery.data &&
            departmentsQuery.data.content.map((department) => (
              <MenuItem key={department.id} value={department.id}>
                <ListItemText>{department.name}</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  {department.description}
                </Typography>
              </MenuItem>
            ))}
        </Field>
        <Field name="labelId" label="Label" component={renderSelectField}>
          <MenuItem value="">None</MenuItem>
          {labelsQuery.data &&
            labelsQuery.data.map((label) => (
              <MenuItem key={label.id} value={label.id}>
                <ListItemText sx={{ color: label.color }}>
                  {label.name}
                </ListItemText>
                <Typography variant="body2" color="text.secondary">
                  {label.description}
                </Typography>
              </MenuItem>
            ))}
        </Field>
        <Field name="hospitalId" label="Hospital" component={renderSelectField}>
          <MenuItem value="">None</MenuItem>
          {hospitalsQuery.data &&
            hospitalsQuery.data.map((hospital) => (
              <MenuItem key={hospital.id} value={hospital.id}>
                {hospital.name}
              </MenuItem>
            ))}
        </Field>
        <Field name="typeOfBooking" label="Type" component={renderSelectField}>
          <MenuItem value="">None</MenuItem>
          {typeOfBookingOptions.map(([k, l]) => (
            <MenuItem value={k} key={k}>
              {l}
            </MenuItem>
          ))}
        </Field>
        <Field
          name="statusOfBooking"
          label="Status"
          component={renderSelectField}
        >
          <MenuItem value="">None</MenuItem>
          {statusOfBookingOptions.map(([k, l]) => (
            <MenuItem value={k} key={k}>
              {l}
            </MenuItem>
          ))}
        </Field>
        <Field
          name="sourceFunding"
          label="Funding"
          component={renderSelectField}
        >
          <MenuItem value="">None</MenuItem>
          {sourceFundingOptions.map(([k, l]) => (
            <MenuItem value={k} key={k}>
              {l}
            </MenuItem>
          ))}
        </Field>
        <Stack direction="row" spacing={3}>
          <LoadingButton
            variant="outlined"
            type="submit"
            loadingPosition="center"
          >
            Save filters
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  )
})

export default FiltersForm
