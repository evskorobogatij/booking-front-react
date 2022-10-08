import * as React from 'react'

import UsersList from './UsersList'
import EntityPage from '../../components/layouts/EntityPage'
import { useCreateUserMutation } from './user'
import UserForm from './UserForm'
import { useTranslation } from 'react-i18next'

const UsersPage: React.FC = () => {
  const { t } = useTranslation()
  return (
    <EntityPage
      title={t('Users')}
      createBtnTitle={t('New user')}
      form={UserForm}
      mutation={useCreateUserMutation}
      container={<UsersList />}
    />
  )
}

export default UsersPage
