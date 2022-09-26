import React from 'react'
import {
  useCreateComboRateMutation,
  useGetAllComboRateQuery,
} from '../services'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import ComboRateView from './ComboRateView'
import EntityFormModal from '../../../components/layouts/EntityFormModal'
import ComboRateForm from '../forms/ComboRateForm'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

const ComboRateList: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  const handleToggle = () => {
    setOpen(!open)
  }
  const { data } = useGetAllComboRateQuery(null)

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Typography variant="h6">Combinations</Typography>
        <Button variant="text" startIcon={<AddIcon />} onClick={handleToggle}>
          New combo
        </Button>
        <EntityFormModal
          open={open}
          onClose={handleToggle}
          form={ComboRateForm}
          mutation={useCreateComboRateMutation}
          title="New combo"
        />
      </Stack>
      <Box sx={{ ml: -2, mt: -2 }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
          {data &&
            data.map((comboRate) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                key={comboRate.id}
              >
                <ComboRateView comboRate={comboRate} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Stack>
  )
}

export default ComboRateList
