import * as React from 'react'
import LabelsList from './LabelsList'
import LabelForm from './LabelForm'
import { useCreateLabelMutation } from './label'
import EntityPage from '../../components/layouts/EntityPage'

const LabelsPage: React.FC = () => {
  return (
    <EntityPage
      title="Labels"
      createBtnTitle="Create label"
      form={LabelForm}
      mutation={useCreateLabelMutation}
      container={<LabelsList />}
    />
  )
}

export default LabelsPage
