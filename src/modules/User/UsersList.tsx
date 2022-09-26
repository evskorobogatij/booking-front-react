import * as React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import Pagination from '@mui/material/Pagination'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'

import { useAuth, useEntityModal } from '../../hooks'

import EntityOptionsMenu from '../../components/layouts/EntityOptionsMenu'
import EntityFormModal from '../../components/layouts/EntityFormModal'
import EntityRemoveModal from '../../components/layouts/EntityRemoveModal'

import {
  useGetAllUsersQuery,
  useRemoveUserMutation,
  useUpdateUserMutation,
} from './user'
import UserForm from './UserForm'
import { UserModel } from './UserModel'

const UsersList: React.FC = () => {
  const auth = useAuth()
  const widthMax1600 = useMediaQuery('(max-width:1600px)')
  const widthMax1000 = useMediaQuery('(max-width:1000px)')
  const modals = useEntityModal<UserModel>()
  const [page, setPage] = React.useState(1)
  const { data } = useGetAllUsersQuery({ page: page - 1 })
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              {widthMax1600 ? (
                <>
                  <TableCell>Username</TableCell>
                  {widthMax1000 ? (
                    <>
                      <TableCell>Name</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>Name</TableCell>
                      <TableCell>Surname</TableCell>
                      <TableCell>Middle name</TableCell>
                    </>
                  )}
                </>
              ) : (
                <>
                  <TableCell>Username</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Surname</TableCell>
                  <TableCell>Middle name</TableCell>
                  <TableCell>dob</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Roles</TableCell>
                  <TableCell>individualId</TableCell>
                </>
              )}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.content.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" width={70}>
                    {row.id}
                  </TableCell>
                  {widthMax1600 ? (
                    <>
                      <TableCell component="th" scope="row">
                        {row.username}
                      </TableCell>
                      {widthMax1000 ? (
                        <>
                          <TableCell component="th" scope="row">
                            {row.surname &&
                              row.surname.charAt(0).toUpperCase() +
                                row.surname.slice(1)}{' '}
                            {row.name && `${row.name[0].toUpperCase()}.`}{' '}
                            {row.patrName &&
                              `${row.patrName[0].toUpperCase()}.`}
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.surname}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.patrName}
                          </TableCell>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <TableCell component="th" scope="row">
                        {row.username}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.surname}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.patrName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.dob}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.gender}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Stack direction="row" spacing={1}>
                          {row.roles.map((role) => (
                            <Tooltip key={role.id} title={role.description}>
                              <Chip label={role.name} size="small" />
                            </Tooltip>
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.individualId}
                      </TableCell>
                    </>
                  )}
                  <TableCell component="th" scope="row" width={60}>
                    <EntityOptionsMenu
                      canEdit={auth.check('admin')}
                      canRemove={auth.check('admin')}
                      onEdit={modals.onEdit({ ...row, password: '' })}
                      onRemove={modals.onRemove(row)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EntityFormModal
        {...modals.edit}
        form={UserForm}
        mutation={useUpdateUserMutation}
        title="Update user"
      />
      <EntityRemoveModal
        {...modals.remove}
        title="Do you want to delete a user?"
        mutation={useRemoveUserMutation}
      />
      {data && (
        <Pagination
          sx={{
            mt: 2,
            mb: 3,
          }}
          count={data.totalPages}
          onChange={handleChangePage}
          page={page}
        />
      )}
    </>
  )
}

export default UsersList
