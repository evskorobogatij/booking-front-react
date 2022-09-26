import * as React from 'react'

import UsersList from './UsersList'
import EntityPage from '../../components/layouts/EntityPage'
import { useCreateUserMutation } from './user'
import UserForm from './UserForm'

const UsersPage: React.FC = () => {
  return (
    <EntityPage
      title="Users"
      createBtnTitle="New user"
      form={UserForm}
      mutation={useCreateUserMutation}
      container={<UsersList />}
    />
  )
}

export default UsersPage
