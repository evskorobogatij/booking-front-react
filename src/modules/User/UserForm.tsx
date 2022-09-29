import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Stack from '@mui/material/Stack'
import {
  renderMultiSelectField,
  renderSelectField,
  renderTextField,
} from '../../components/redux-form'
import { validators } from '../../utils'
import MenuItem from '@mui/material/MenuItem'
import LoadingButton from '@mui/lab/LoadingButton'
import { useGetAllRolesQuery } from '../Role/role'
import { UserModel } from '../../types'
import { FormProps } from '../../components/redux-form/types'
import useMediaQuery from '@mui/material/useMediaQuery'
import DepartmentField from '../../fields/DepartmentField'
import { dateMask } from '../../utils/masks'

const UserForm = reduxForm<UserModel, FormProps>({
  form: 'user',
})((props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    response,
    invalid,
    initialValues,
  } = props
  const { data } = useGetAllRolesQuery(null)
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up('sm'))

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={matches ? 4 : 3}
        width={matches ? 600 : 250}
      >
        <Stack spacing={3} direction={matches ? 'row' : 'column'} width="100%">
          <Field name="name" label="Name" component={renderTextField} />
          <Field name="surname" label="Surname" component={renderTextField} />
          <Field
            name="patrName"
            label="Middle name"
            component={renderTextField}
          />
        </Stack>
        <Stack spacing={3} direction={matches ? 'row' : 'column'} width="100%">
          <Field
            name="dob"
            label="Birth Date"
            component={renderTextField}
            {...dateMask}
          />
          <Field name="individualId" label="IID" component={renderTextField} />
          <Field name="gender" label="Gender" component={renderSelectField}>
            <MenuItem value="MALE">Male</MenuItem>
            <MenuItem value="FEMALE">Female</MenuItem>
          </Field>
        </Stack>
        <Stack spacing={3} direction={matches ? 'row' : 'column'} width="100%">
          <Field
            name="username"
            label="Username"
            component={renderTextField}
            required
            validate={[validators.required]}
          />
          <Field
            name="password"
            label="Password"
            type="password"
            component={renderTextField}
            {...(!initialValues ? { required: true } : {})}
            validate={!initialValues && [validators.required]}
          />
        </Stack>
        <Stack spacing={3} direction={matches ? 'row' : 'column'} width="100%">
          <Field
            name="roles"
            label="Roles"
            placeholder="Add role"
            component={renderMultiSelectField}
            required
            validate={[validators.required]}
          >
            {data &&
              data.map((role) => (
                <MenuItem key={role.id} value={JSON.stringify(role)}>
                  {role.name}
                </MenuItem>
              ))}
          </Field>
          <DepartmentField />
        </Stack>
        <LoadingButton
          variant="outlined"
          type="submit"
          disabled={invalid || pristine || submitting}
          loading={response.status === 'pending'}
          loadingPosition="center"
        >
          Save
        </LoadingButton>
      </Stack>
    </form>
  )
})

export default UserForm
