import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Stack from '@mui/material/Stack'
import { renderTextField } from '../../../components/redux-form'
import LoadingButton from '@mui/lab/LoadingButton'
import { FormProps } from '../../../components/redux-form/types'
import useMediaQuery from '@mui/material/useMediaQuery'
import { RoomModel } from '../types'
import { validators } from '../../../utils'
import DepartmentField from '../../../fields/DepartmentField'
import LabelField from '../../../fields/LabelField'

const RoomForm = reduxForm<RoomModel, FormProps>({
  form: 'roomForm',
})((props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    invalid,
    response,
    initialValues,
  } = props
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up('sm'))

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={3}
        width={matches ? 350 : window.innerWidth - 112}
      >
        <Field
          name="roomNumber"
          label="roomNumber"
          component={renderTextField}
          required
          validate={[validators.required, validators.number]}
        />
        <Field
          name="capacity"
          label="capacity"
          component={renderTextField}
          required
          validate={[validators.required, validators.number]}
          disabled={!!initialValues}
        />
        <DepartmentField />
        <LabelField />
        <LoadingButton
          variant="outlined"
          type="submit"
          disabled={invalid || pristine || submitting}
          loading={response.status === 'pending'}
          loadingPosition="center"
          sx={{ width: '120px' }}
        >
          Save
        </LoadingButton>
      </Stack>
    </form>
  )
})

export default RoomForm
