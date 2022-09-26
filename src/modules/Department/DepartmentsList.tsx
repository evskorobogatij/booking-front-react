import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  useGetAllDepartmentsQuery,
  useRemoveDepartmentMutation,
  useUpdateDepartmentMutation,
} from './department'
import Pagination from '@mui/material/Pagination'
import DepartmentForm from './DepartmentForm'
import { DepartmentModel } from '../../types'
import EntityOptionsMenu from '../../components/layouts/EntityOptionsMenu'
import { useAuth, useEntityModal } from '../../hooks'
import EntityFormModal from '../../components/layouts/EntityFormModal'
import EntityRemoveModal from '../../components/layouts/EntityRemoveModal'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

const DepartmentsList: React.FC = () => {
  const widthMax500 = useMediaQuery('(max-width:500px)')
  const auth = useAuth()
  const modals = useEntityModal<DepartmentModel>()

  const [page, setPage] = React.useState(1)
  const { data } = useGetAllDepartmentsQuery({ page: page - 1 })
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
              <TableCell>Hospital</TableCell>
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
                  {widthMax500 ? (
                    <TableCell component="th" scope="row">
                      <Stack direction="column">
                        <Typography>{row.name}</Typography>
                        <Typography variant="caption">
                          {row.description}
                        </Typography>
                      </Stack>
                    </TableCell>
                  ) : (
                    <>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.description}
                      </TableCell>
                    </>
                  )}
                  <TableCell component="th" scope="row">
                    {row.hospital?.name}
                  </TableCell>
                  <TableCell component="th" scope="row" width={60}>
                    <EntityOptionsMenu
                      canEdit={auth.check('admin')}
                      canRemove={auth.check('admin')}
                      onEdit={modals.onEdit(row)}
                      onRemove={modals.onRemove(row)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EntityFormModal
        title="Update department"
        form={DepartmentForm}
        mutation={useUpdateDepartmentMutation}
        {...modals.edit}
      />
      <EntityRemoveModal
        title="Do you want to delete a department?"
        mutation={useRemoveDepartmentMutation}
        {...modals.remove}
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

export default DepartmentsList
