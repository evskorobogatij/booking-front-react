import * as React from 'react'

import HospitalsList from './HospitalsList'
import HospitalForm from './HospitalForm'
import { useCreateHospitalMutation } from './hospital'
import EntityPage from '../../components/layouts/EntityPage'
import { useTranslation } from 'react-i18next'

const HospitalsPage: React.FC = () => {
  const { t } = useTranslation()
  return (
    <EntityPage
      title={t('Hospitals')}
      createBtnTitle={t('Create hospital')}
      form={HospitalForm}
      mutation={useCreateHospitalMutation}
      container={<HospitalsList />}
    />
  )
}

export default HospitalsPage
