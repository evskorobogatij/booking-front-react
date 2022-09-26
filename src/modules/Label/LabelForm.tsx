import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Stack from '@mui/material/Stack'
import { renderTextField } from '../../components/redux-form'
import { validators } from '../../utils'
import LoadingButton from '@mui/lab/LoadingButton'
import { LabelModel } from '../../types'
import { FormProps } from '../../components/redux-form/types'
import useMediaQuery from '@mui/material/useMediaQuery'

const LabelForm = reduxForm<LabelModel, FormProps>({
  form: 'label',
})((props) => {
  const { handleSubmit, pristine, submitting, invalid, response } = props
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

export default LabelForm
