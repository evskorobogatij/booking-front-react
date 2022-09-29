import React from 'react'
import {
  useCreateRateComponentMutation,
  useGetAllRateComponentsQuery,
} from '../services'
import Grid from '@mui/material/Grid'
import RateComponentView from './RateComponentView'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import EntityFormModal from '../../../components/layouts/EntityFormModal'
import RateComponentForm from '../forms/RateComponentForm'
import Box from '@mui/material/Box'
import { useDefaultCurrency } from '../../Application/hooks'

const RateComponentsList: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  const handleToggle = () => {
    setOpen(!open)
  }
  const currency = useDefaultCurrency()

  const { data } = useGetAllRateComponentsQuery(null)

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Typography variant="h6">Components</Typography>
        <EntityFormModal
          open={open}
          onClose={handleToggle}
          form={RateComponentForm}
          mutation={useCreateRateComponentMutation}
          entityData={{ currency }}
          title="New rate component"
        />
      </Stack>
      <Box sx={{ ml: -2, mt: -2 }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
          {data &&
            data.map((rateComponent) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                key={rateComponent.id}
              >
                <RateComponentView rateComponent={rateComponent} editable />
              </Grid>
            ))}
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Button
              variant="outlined"
              sx={{ width: '100%', height: '100%' }}
              startIcon={<AddIcon />}
              onClick={handleToggle}
            >
              New component
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  )
}

export default RateComponentsList
