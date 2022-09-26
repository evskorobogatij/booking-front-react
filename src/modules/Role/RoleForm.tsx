import React from 'react'
import Stack from '@mui/material/Stack'
import { Field, reduxForm } from 'redux-form'
import { renderTextField } from '../../components/redux-form'
import { validators } from '../../utils'
import LoadingButton from '@mui/lab/LoadingButton'
import { RoleModel } from '../../types'
import { FormProps } from '../../components/redux-form/types'
import useMediaQuery from '@mui/material/useMediaQuery'

const RoleForm = reduxForm<RoleModel, FormProps>({
  form: 'role',
})((props) => {
  const { handleSubmit, pristine, submitting, response, invalid } = props
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up('sm'))

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={3}
        width={matches ? 350 : 250}
      >
        <Field
          name="name"
          label="Name"
          required
          component={renderTextField}
          validate={[validators.required]}
        />
        <Field
          name="description"
          label="Description"
          component={renderTextField}
        />
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

export default RoleForm
