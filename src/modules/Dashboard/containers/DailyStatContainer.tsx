import React from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useGetDailyStatQuery } from '../services/statisticService'
import { dailyStatValuesFn } from '../constants'
import { useAppSelector } from '../../../store'
// import { useTranslation } from 'react-i18next'

const DailyStatContainer: React.FC = () => {
  const { data } = useGetDailyStatQuery(
    useAppSelector((state) => state.dailyStatFilters)
  )

  // const { t } = useTranslation()

  return (
    <Grid container sx={{ m: -1 }}>
      {dailyStatValuesFn().map(({ key, label }) => (
        <Grid item lg={2} md={6} xs={12} sm={12} key={key}>
          <Paper sx={{ p: 2, m: 1 }}>
            <Typography variant="subtitle2">{label}</Typography>
            <Typography variant="h5">{data ? data[key] : '0'}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

export default DailyStatContainer
