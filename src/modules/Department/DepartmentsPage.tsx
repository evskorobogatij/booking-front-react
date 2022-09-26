import * as React from 'react'
import DepartmentsList from './DepartmentsList'
import EntityPage from '../../components/layouts/EntityPage'
import { useCreateDepartmentMutation } from '../../services'
import DepartmentForm from './DepartmentForm'

const DepartmentsPage: React.FC = () => {
  return (
    <EntityPage
      title="Departments"
      createBtnTitle="New department"
      form={DepartmentForm}
      mutation={useCreateDepartmentMutation}
      container={<DepartmentsList />}
    />
  )
}

export default DepartmentsPage
