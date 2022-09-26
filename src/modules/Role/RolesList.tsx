import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  useUpdateRoleMutation,
  useGetAllRolesQuery,
  useRemoveRoleMutation,
} from './role'
import { RoleModel } from '../../types'
import RoleForm from './RoleForm'

import { useAuth, useEntityModal } from '../../hooks'
import EntityOptionsMenu from '../../components/layouts/EntityOptionsMenu'
import EntityFormModal from '../../components/layouts/EntityFormModal'

import EntityRemoveModal from '../../components/layouts/EntityRemoveModal'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const RolesList: React.FC = () => {
  const widthMax500 = useMediaQuery('(max-width:500px)')
  const auth = useAuth()
  const { data } = useGetAllRolesQuery(null)
  const modals = useEntityModal<RoleModel>()

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              {widthMax500 ? (
                <>
                  <TableCell>Name</TableCell>
                </>
              ) : (
                <>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                </>
              )}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((role) => (
                <TableRow
                  key={role.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" width={70}>
                    {role.id}
                  </TableCell>
                  {widthMax500 ? (
                    <TableCell component="th" scope="row">
                      <Stack direction="column">
                        <Typography>{role.name}</Typography>
                        <Typography variant="caption">
                          {role.description}
                        </Typography>
                      </Stack>
                    </TableCell>
                  ) : (
                    <>
                      <TableCell component="th" scope="row">
                        {role.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {role.description}
                      </TableCell>
                    </>
                  )}
                  <TableCell component="th" scope="row" width={60}>
                    <EntityOptionsMenu
                      canEdit={auth.check('admin')}
                      canRemove={auth.check('admin')}
                      onEdit={modals.onEdit(role)}
                      onRemove={modals.onRemove(role)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EntityFormModal
        {...modals.edit}
        form={RoleForm}
        mutation={useUpdateRoleMutation}
        title="Update role"
      />
      <EntityRemoveModal
        {...modals.remove}
        title="Do you want to delete a role?"
        mutation={useRemoveRoleMutation}
      />
    </>
  )
}

export default RolesList
