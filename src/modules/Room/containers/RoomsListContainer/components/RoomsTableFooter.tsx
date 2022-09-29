import React from 'react'
import Pagination from '@mui/material/Pagination'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Stack from '@mui/material/Stack'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'

import { ObjectsList } from '../../../../../types'

interface RoomsTableFooterProps {
  objects: ObjectsList<any>
  pageNumber: number
  onChangePageNumber(pageNumber: number): void
  pageSize: number
  onChangePageSize(pageSize: number): void
}

const PAGE_SIZES = [10, 30, 50, 100, 150, 200]

const RoomsTableFooter: React.FC<RoomsTableFooterProps> = (props) => {
  const {
    objects,
    pageNumber,
    pageSize,
    onChangePageNumber,
    onChangePageSize,
  } = props
  const matchesSm = useMediaQuery((theme: any) => theme.breakpoints.up('sm'))

  const handleChangePage = (event: unknown, newPage: number) => {
    onChangePageNumber(newPage - 1)
  }

  const handleSetPageSize = (event: SelectChangeEvent) => {
    onChangePageSize(parseInt(event.target.value))
  }

  return (
    <Toolbar sx={{ pl: { sm: 1 }, pt: 2, pb: 2 }}>
      <Stack
        direction={matchesSm ? 'row' : 'column'}
        spacing={matchesSm ? 3 : 2}
        alignItems="center"
        width="100%"
      >
        <Pagination
          count={objects.totalPages}
          onChange={handleChangePage}
          page={pageNumber + 1}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="rooms-list-container-page-size-select">
            Page size
          </InputLabel>
          <Select
            labelId="rooms-list-container-page-size-select"
            id="rooms-list-container-page-size-select"
            value={`${pageSize}`}
            label="Page size"
            onChange={handleSetPageSize}
          >
            {PAGE_SIZES.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Toolbar>
  )
}

export default RoomsTableFooter
