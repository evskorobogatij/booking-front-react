import * as React from 'react'

import HospitalsList from './HospitalsList'
import HospitalForm from './HospitalForm'
import { useCreateHospitalMutation } from './hospital'
import EntityPage from '../../components/layouts/EntityPage'

const HospitalsPage: React.FC = () => {
  return (
    <EntityPage
      title="Hospitals"
      createBtnTitle="Create hospital"
      form={HospitalForm}
      mutation={useCreateHospitalMutation}
      container={<HospitalsList />}
    />
  )
}

export default HospitalsPage
