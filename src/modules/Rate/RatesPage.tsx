import React from 'react'
import RateComponentsList from './containers/RateComponentsList'
import ComboRateList from './containers/ComboRateList'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const RatesPage: React.FC = () => {
  return (
    <Stack spacing={3} sx={{ pb: 6 }}>
      <Typography variant="h5">Rate</Typography>
      <Stack spacing={5}>
        <RateComponentsList />
        <ComboRateList />
      </Stack>
    </Stack>
  )
}

export default RatesPage
