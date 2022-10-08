import * as React from 'react'
import EntityPage from '../../components/layouts/EntityPage'

import RolesList from './RolesList'
import RoleForm from './RoleForm'
import { useCreateRoleMutation } from './role'
import { useTranslation } from 'react-i18next'

const RolesPage: React.FC = () => {
  const { t } = useTranslation()
  return (
    <EntityPage
      title={t('Roles')}
      createBtnTitle={t('Create role')}
      form={RoleForm}
      mutation={useCreateRoleMutation}
      container={<RolesList />}
    />
  )
}

export default RolesPage
