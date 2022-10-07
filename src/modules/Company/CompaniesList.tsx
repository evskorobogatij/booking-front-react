import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Pagination from '@mui/material/Pagination'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import {
  useGetAllCompaniesQuery,
  useRemoveCompanyMutation,
  useUpdateCompanyMutation,
} from './company'
import { CompanyModel } from '../../types'
import CompanyForm from './CompanyForm'
import EntityOptionsMenu from '../../components/layouts/EntityOptionsMenu'
import { useAuth, useEntityModal } from '../../hooks'
import EntityFormModal from '../../components/layouts/EntityFormModal'
import EntityRemoveModal from '../../components/layouts/EntityRemoveModal'
import useMediaQuery from '@mui/material/useMediaQuery'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Card, CardContent, CardHeader } from '@mui/material'
import { useTranslation } from 'react-i18next'

const CompaniesList: React.FC = () => {
  const { t } = useTranslation()
  const widthMax900 = useMediaQuery('(max-width:900px)')
  const [page, setPage] = React.useState(1)
  const auth = useAuth()
  const { data } = useGetAllCompaniesQuery({ pageNumber: page - 1 })
  const modals = useEntityModal<CompanyModel>()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  return (
    <>
      {!widthMax900 && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{t('ID')}</TableCell>
                <TableCell>{t('Name')}</TableCell>
                <TableCell>{t('Full name')}</TableCell>
                <TableCell>{t('Region')}</TableCell>
                <TableCell>{t('Area')}</TableCell>
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
                    <TableCell
                      component="th"
                      scope="row"
                      width={70}
                      height={74}
                    >
                      {row.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.canEdit ? (
                        <LockOpenIcon color="success" fontSize="inherit" />
                      ) : (
                        <LockIcon color="disabled" fontSize="inherit" />
                      )}
                      {row.shortName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.longName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.region}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.area}
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
      )}
      {widthMax900 && (
        <Stack direction="column" spacing={2}>
          {data &&
            data.content.map((row) => (
              <Card key={row.id}>
                <CardHeader
                  action={
                    <EntityOptionsMenu
                      canEdit={row.canEdit || auth.check('admin')}
                      canRemove={row.canEdit || auth.check('admin')}
                      onEdit={modals.onEdit(row)}
                      onRemove={modals.onRemove(row)}
                    />
                  }
                  title={
                    <Typography variant="h6" component="div">
                      {row.canEdit ? (
                        <LockOpenIcon
                          color="success"
                          fontSize="inherit"
                          sx={{ mr: 1 }}
                        />
                      ) : (
                        <LockIcon
                          color="disabled"
                          fontSize="inherit"
                          sx={{ mr: 1 }}
                        />
                      )}
                      {row.shortName}
                    </Typography>
                  }
                  subheader={
                    <Typography color="text.secondary" gutterBottom>
                      {row.longName}
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography sx={{ mb: 1.5 }}>
                    {t(`Region`)} {row.region}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }}>
                    {t(`Area`)} {row.area}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Stack>
      )}
      <EntityFormModal
        title={t('Update company')}
        form={CompanyForm}
        mutation={useUpdateCompanyMutation}
        {...modals.edit}
      />
      <EntityRemoveModal
        title={t('Do you want to delete a company?')}
        mutation={useRemoveCompanyMutation}
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

export default CompaniesList
