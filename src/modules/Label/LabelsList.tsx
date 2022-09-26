import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  useGetAllLabelsQuery,
  useRemoveLabelMutation,
  useUpdateLabelMutation,
} from './label'
import { LabelModel } from '../../types'
import EntityFormModal from '../../components/layouts/EntityFormModal'
import EntityRemoveModal from '../../components/layouts/EntityRemoveModal'
import EntityOptionsMenu from '../../components/layouts/EntityOptionsMenu'
import { useAuth, useEntityModal } from '../../hooks'
import LabelForm from './LabelForm'
import useMediaQuery from '@mui/material/useMediaQuery'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const LabelsList: React.FC = () => {
  const widthMax500 = useMediaQuery('(max-width:500px)')
  const auth = useAuth()
  const modals = useEntityModal<LabelModel>()
  const { data } = useGetAllLabelsQuery(null)

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
              data.map((row) => (
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
        {...modals.edit}
        form={LabelForm}
        mutation={useUpdateLabelMutation}
        title="Update label"
      />
      <EntityRemoveModal
        {...modals.remove}
        title="Do you want to delete a label?"
        mutation={useRemoveLabelMutation}
      />
    </>
  )
}

export default LabelsList
