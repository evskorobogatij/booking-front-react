import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import DailyStatContainer from '../containers/DailyStatContainer'
import DailyStatForHospitalContainer from '../containers/DailyStatForHospitalContainer'
import UsersBookingStatContainer from '../containers/UsersBookingStatContainer'
import { useTranslation } from 'react-i18next'
// import DateSelectorContainer from '../containers/DateSelectorContainer'

const DashboardPage: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">{t('Dashboard')}</Typography>
        {/*<DateSelectorContainer />*/}
      </Grid>
      <Grid item lg={12} xs={12} md={12} sm={12}>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1, mt: 3 }}>
          {t('Daily')}
        </Typography>
        <DailyStatContainer />
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1, mt: 3 }}>
          {t('Hospitals daily')}
        </Typography>
        <DailyStatForHospitalContainer />
      </Grid>
      <Grid item lg={12} xs={12} md={12} sm={12}>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1, mt: 3 }}>
          {t('Users booking stats')}
        </Typography>
        <UsersBookingStatContainer />
      </Grid>
    </Grid>
  )
}

export default DashboardPage
