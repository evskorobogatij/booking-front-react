import React from 'react'
import Typography from '@mui/material/Typography'
import { useGetApplicationQuery } from '../applicationService'

const ApplicationFooter: React.FC = () => {
  const { data } = useGetApplicationQuery(null)

  return (
    <Typography color="text.secondary">{data && data.footerText}</Typography>
  )
}

export default ApplicationFooter
