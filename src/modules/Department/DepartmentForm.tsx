import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Stack from '@mui/material/Stack'
import { renderTextField, renderSelectField } from '../../components/redux-form'
import { validators } from '../../utils'
import { MenuItem } from '@mui/material'
import { useGetAllHospitalsQuery } from '../../services'
import LoadingButton from '@mui/lab/LoadingButton'
import { DepartmentModel } from '../../types'
import { FormProps } from '../../components/redux-form/types'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslation } from 'react-i18next'

const DepartmentForm = reduxForm<DepartmentModel, FormProps>({
  form: 'departament',
})((props) => {
  const { handleSubmit, pristine, submitting, invalid, response } = props
  const { data } = useGetAllHospitalsQuery(null)
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up('sm'))
  const { t } = useTranslation()

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
          label={t('Name')}
          component={renderTextField}
          required
          validate={[validators.required]}
        />
        <Field
          name="description"
          label={t('Description')}
          component={renderTextField}
        />
        <Field
          name="hospital"
          label={t('Hospital')}
          component={renderSelectField}
          required
          validate={[validators.required]}
        >
          {data &&
            data.map((hospital) => (
              <MenuItem key={hospital.id} value={JSON.stringify(hospital)}>
                {hospital.name}
              </MenuItem>
            ))}
        </Field>
        <LoadingButton
          variant="outlined"
          type="submit"
          disabled={invalid || pristine || submitting}
          loading={response.status === 'pending'}
          loadingPosition="center"
        >
          {t('Save')}
        </LoadingButton>
      </Stack>
    </form>
  )
})

export default DepartmentForm
