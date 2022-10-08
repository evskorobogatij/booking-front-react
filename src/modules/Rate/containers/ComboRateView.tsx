import React from 'react'
import Paper from '@mui/material/Paper'
import { ComboRateModel } from '../types'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import EntityOptionsMenu from '../../../components/layouts/EntityOptionsMenu'
import RateComponentView from './RateComponentView'
import EntityFormModal from '../../../components/layouts/EntityFormModal'
import {
  useRemoveComboRateMutation,
  useUpdateComboRateMutation,
} from '../services'
import EntityRemoveModal from '../../../components/layouts/EntityRemoveModal'
import { useEntityModal } from '../../../hooks'
import ComboRateForm from '../forms/ComboRateForm'
import { useTranslation } from 'react-i18next'

interface Props {
  comboRate: ComboRateModel
}

const ComboRateView: React.FC<Props> = ({ comboRate }) => {
  const modals = useEntityModal<ComboRateModel>()
  const { t } = useTranslation()

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">{comboRate.description}</Typography>
          <EntityOptionsMenu
            onEdit={modals.onEdit(comboRate)}
            onRemove={modals.onRemove(comboRate)}
          />
        </Stack>
        <Stack spacing={2}>
          {comboRate.components.map((rateComponent) => (
            <RateComponentView
              key={rateComponent.id}
              rateComponent={rateComponent}
            />
          ))}
        </Stack>
      </Stack>
      <EntityFormModal
        {...modals.edit}
        form={ComboRateForm}
        mutation={useUpdateComboRateMutation}
        title={t('Update combo')}
      />
      <EntityRemoveModal
        {...modals.remove}
        title={t('Do you want to delete a combo?')}
        mutation={useRemoveComboRateMutation}
      />
    </Paper>
  )
}

export default ComboRateView
