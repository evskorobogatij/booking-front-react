import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import {
  useGetApplicationQuery,
  useUpdateApplicationMutation,
} from './applicationService'
import ApplicationForm from './ApplicationForm'
import { ApplicationModel } from './types'

const ApplicationSettingsPage: React.FC = () => {
  const { data } = useGetApplicationQuery(null)
  const [
    updateApplicationQuery,
    updateResponse,
  ] = useUpdateApplicationMutation()

  const handleSubmit = (value: ApplicationModel) => {
    updateApplicationQuery(value)
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={4}>
        <Typography variant="h5">Application settings</Typography>
        <ApplicationForm
          initialValues={data}
          onSubmit={handleSubmit}
          response={updateResponse}
        />
      </Stack>
    </Paper>
  )
}

export default ApplicationSettingsPage
