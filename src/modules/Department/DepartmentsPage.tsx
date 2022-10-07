import * as React from 'react'
import DepartmentsList from './DepartmentsList'
import EntityPage from '../../components/layouts/EntityPage'
import { useCreateDepartmentMutation } from '../../services'
import DepartmentForm from './DepartmentForm'
import { useTranslation } from 'react-i18next'

const DepartmentsPage: React.FC = () => {
  const { t } = useTranslation()
  return (
    <EntityPage
      title={t('Departments')}
      createBtnTitle={t('New department')}
      form={DepartmentForm}
      mutation={useCreateDepartmentMutation}
      container={<DepartmentsList />}
    />
  )
}

export default DepartmentsPage
