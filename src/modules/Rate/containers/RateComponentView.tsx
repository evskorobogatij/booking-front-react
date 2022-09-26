import React from 'react'
import Paper from '@mui/material/Paper'
import { RateComponentModel } from '../types'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import EntityOptionsMenu from '../../../components/layouts/EntityOptionsMenu'
import { useEntityModal } from '../../../hooks'
import EntityFormModal from '../../../components/layouts/EntityFormModal'
import EntityRemoveModal from '../../../components/layouts/EntityRemoveModal'
import RateComponentForm from '../forms/RateComponentForm'
import {
  useRemoveRateComponentMutation,
  useUpdateRateComponentMutation,
} from '../services'
import RateComponentTypeIcon from '../components/RateComponentTypeIcon'

interface Props {
  rateComponent: RateComponentModel
  editable?: boolean
}

const RateComponentView: React.FC<Props> = ({ rateComponent, editable }) => {
  const modals = useEntityModal<RateComponentModel>()

  return (
    <Paper
      sx={{ p: 1.5, height: '100%' }}
      variant={!editable ? 'outlined' : undefined}
    >
      <Stack spacing={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <RateComponentTypeIcon type={rateComponent.type} />
            <Typography variant="subtitle2">
              {rateComponent.description}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Stack spacing={1} direction="row">
              <Typography>
                {rateComponent.rate} {rateComponent.currency}
              </Typography>
            </Stack>
            {editable && (
              <EntityOptionsMenu
                onEdit={modals.onEdit(rateComponent)}
                onRemove={modals.onRemove(rateComponent)}
                small
              />
            )}
          </Stack>
        </Stack>
      </Stack>
      <EntityFormModal
        {...modals.edit}
        form={RateComponentForm}
        mutation={useUpdateRateComponentMutation}
        title="Update rate component"
      />
      <EntityRemoveModal
        {...modals.remove}
        title="Do you want to delete a rate component?"
        mutation={useRemoveRateComponentMutation}
      />
    </Paper>
  )
}

export default RateComponentView
