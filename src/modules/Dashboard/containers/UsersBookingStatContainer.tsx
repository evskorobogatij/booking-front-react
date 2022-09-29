import React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'

import { useGetUsersBookingStatQuery } from '../services/statisticService'
import { getUserShortName } from '../../../utils'
import Typography from '@mui/material/Typography'

const UsersBookingStatContainer: React.FC = () => {
  const { data } = useGetUsersBookingStatQuery(null)

  if (data && data.length === 0) {
    return (
      <Typography variant="caption" color="text.secondary">
        No users stats
      </Typography>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Bookings size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row) => (
              <TableRow
                key={row.user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" width={70}>
                  {row.user.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {getUserShortName(row.user)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.bookingsSize}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UsersBookingStatContainer
