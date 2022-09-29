import React from 'react'
import Paper from '@mui/material/Paper'
import { dailyStatValues } from '../constants'
import { useGetDailyStatForHospitalQuery } from '../services/statisticService'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { useAppSelector } from '../../../store'
import Typography from '@mui/material/Typography'

const DailyStatForHospitalContainer: React.FC = () => {
  const { data } = useGetDailyStatForHospitalQuery(
    useAppSelector((state) => state.dailyStatFilters)
  )

  if (data && data.length === 0) {
    return (
      <Typography variant="caption" color="text.secondary">
        No hospitals stats
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
            <TableCell></TableCell>
            {dailyStatValues.map(({ key, label }) => (
              <TableCell key={key}>{label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row) => (
              <TableRow
                key={row.hospital.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" width={70}>
                  {row.hospital.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.hospital.name}
                </TableCell>
                {dailyStatValues.map(({ key }) => (
                  <TableCell key={key}>{row.dailyStat[key]}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DailyStatForHospitalContainer
