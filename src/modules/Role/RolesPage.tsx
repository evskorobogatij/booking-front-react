import * as React from 'react'
import EntityPage from '../../components/layouts/EntityPage'

import RolesList from './RolesList'
import RoleForm from './RoleForm'
import { useCreateRoleMutation } from './role'

const RolesPage: React.FC = () => {
  return (
    <EntityPage
      title="Roles"
      createBtnTitle="Create role"
      form={RoleForm}
      mutation={useCreateRoleMutation}
      container={<RolesList />}
    />
  )
}

export default RolesPage
