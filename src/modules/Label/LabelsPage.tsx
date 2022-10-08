import * as React from 'react'
import LabelsList from './LabelsList'
import LabelForm from './LabelForm'
import { useCreateLabelMutation } from './label'
import EntityPage from '../../components/layouts/EntityPage'
import { useTranslation } from 'react-i18next'

const LabelsPage: React.FC = () => {
  const { t } = useTranslation()
  return (
    <EntityPage
      title={t('Labels')}
      createBtnTitle={t('Create label')}
      form={LabelForm}
      mutation={useCreateLabelMutation}
      container={<LabelsList />}
    />
  )
}

export default LabelsPage
