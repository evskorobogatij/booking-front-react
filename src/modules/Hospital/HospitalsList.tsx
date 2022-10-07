import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  useUpdateHospitalMutation,
  useGetAllHospitalsQuery,
  useRemoveHospitalMutation,
} from './hospital'
import HospitalForm from './HospitalForm'
import { HospitalModel } from '../../types'
import EntityFormModal from '../../components/layouts/EntityFormModal'
import EntityRemoveModal from '../../components/layouts/EntityRemoveModal'
import EntityOptionsMenu from '../../components/layouts/EntityOptionsMenu'
import { useAuth, useEntityModal } from '../../hooks'
import { useTranslation } from 'react-i18next'

const HospitalsList: React.FC = () => {
  const auth = useAuth()
  const { data } = useGetAllHospitalsQuery(null)
  const modals = useEntityModal<HospitalModel>()
  const { t } = useTranslation()

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('ID')}</TableCell>
              <TableCell>{t('Name')}</TableCell>
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
                  <TableCell component="th" scope="row">
                    {row.name}
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
        {...modals.edit}
        form={HospitalForm}
        mutation={useUpdateHospitalMutation}
        title={t('Update hospital')}
      />
      <EntityRemoveModal
        {...modals.remove}
        title={t('Do you want to delete a hospital?')}
        mutation={useRemoveHospitalMutation}
      />
    </>
  )
}

export default HospitalsList
