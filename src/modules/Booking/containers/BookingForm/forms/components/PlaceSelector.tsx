import React from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useGetAllLabelsQuery } from '../../../../../Label/label'
import { useGetAllDepartmentsQuery } from '../../../../../Department/department'
import { useGetAllHospitalsQuery } from '../../../../../Hospital/hospital'
import { useGetAllRoomsQuery } from '../../../../../Room/services/roomService'
import Pagination from '@mui/material/Pagination'
import { ListItemIcon } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import { RoomModel } from '../../../../../Room/types'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import FormHelperText from '@mui/material/FormHelperText'

interface RoomAccordionProps {
  room: RoomModel
  checked: number[]
  onCheck(v: number): void
  isFirst?: boolean
  isGroup?: boolean
}

const RoomAccordion: React.FC<RoomAccordionProps> = (props) => {
  const { room, checked, onCheck, isFirst, isGroup } = props
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const handleToggle = (id: number) => () => {
    onCheck(id)
  }

  const placesIds = room.places.map((p) => p.id)
  const includePlaces = placesIds.filter((p) => checked.includes(p))

  return (
    <>
      {!isFirst && <Divider />}
      <ListItemButton onClick={handleClick}>
        <ListItemText
          primary={
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  bgcolor: room.label.color,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  border: '1px solid rgb(0 0 0 / 20%)',
                }}
              />
              <Typography variant="subtitle2">{room.roomNumber}</Typography>
              {isGroup && (
                <Typography variant="caption">{`${includePlaces.length}/${placesIds.length}`}</Typography>
              )}
            </Stack>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {room.places.map((place) => (
            <ListItem key={place.id} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(place.id)}
                dense
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  {!isGroup ? (
                    <Radio
                      edge="start"
                      checked={checked.indexOf(place.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  ) : (
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(place.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  )}
                </ListItemIcon>
                <ListItemText primary={`${place.number}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  )
}

const PlaceSelector: React.FC<any> = (props) => {
  const {
    input,
    meta: { touched, invalid, error },
    isGroup,
  } = props

  const departmentsQuery = useGetAllDepartmentsQuery({ page: 0 })
  const hospitalsQuery = useGetAllHospitalsQuery(null)
  const labelsQuery = useGetAllLabelsQuery(null)
  const [filters, setFilters] = React.useState({
    hospitalId: undefined,
    labelId: undefined,
    departmentId: undefined,
  })

  const handleSetFilter = (filter: 'hospital' | 'label' | 'department') => (
    event: SelectChangeEvent
  ) => {
    setFilters({ ...filters, [`${filter}Id`]: event.target.value })
  }

  const [pageNumber, setPage] = React.useState(1)
  const handleChangePage = (_event: any, p: number) => {
    setPage(p)
  }

  const { data } = useGetAllRoomsQuery({
    pageNumber: pageNumber - 1,
    ...Object.fromEntries(Object.entries(filters).filter((v) => !!v[1])),
  })

  const [checked, setChecked] = React.useState([0])

  const handleToggle = (v: number) => {
    const currentIndex = checked.indexOf(v)
    const newChecked = isGroup ? [...checked] : [0]

    if (currentIndex === -1) {
      newChecked.push(v)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const [open, setOpen] = React.useState(false)
  const handleToggleModal = () => {
    setOpen(!open)

    if (open) {
      input.onFocus(null as any)
    } else {
      input.onBlur(checked.slice(1))
    }
  }

  const handleContinue = () => {
    if (!checked) return

    input.onChange(checked.slice(1))
    handleToggleModal()
  }

  return (
    <>
      <Dialog
        onClose={handleToggleModal}
        maxWidth="lg"
        open={open}
        sx={{ overflow: 'visible' }}
      >
        <DialogTitle>Select a place</DialogTitle>
        <DialogContent sx={{ overflow: 'visible' }}>
          <Stack spacing={3} sx={{ width: 350 }}>
            <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
              <FormControl size="small" sx={{ width: '100%' }}>
                <InputLabel id="rooms-list-container-filter-label">
                  Label
                </InputLabel>
                <Select
                  labelId="rooms-list-container-filter-label"
                  id="rooms-list-container-filter-label"
                  value={filters.labelId}
                  label="Label"
                  size="small"
                  onChange={handleSetFilter('label')}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {labelsQuery.data &&
                    labelsQuery.data.map((label) => (
                      <MenuItem
                        key={label.id}
                        value={label.id}
                        sx={{ color: label.color }}
                      >
                        {label.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ width: '100%' }}>
                <InputLabel id="rooms-list-container-filter-department">
                  Department
                </InputLabel>
                <Select
                  labelId="rooms-list-container-filter-department"
                  id="rooms-list-container-filter-department"
                  value={filters.departmentId}
                  label="Department"
                  onChange={handleSetFilter('department')}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {departmentsQuery.data &&
                    departmentsQuery.data.content.map((department) => (
                      <MenuItem key={department.id} value={department.id}>
                        {department.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ width: '100%' }}>
                <InputLabel id="rooms-list-container-filter-hospital">
                  Hospital
                </InputLabel>
                <Select
                  labelId="rooms-list-container-filter-hospital"
                  id="rooms-list-container-filter-hospital"
                  value={filters.hospitalId}
                  label="Label"
                  onChange={handleSetFilter('hospital')}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {hospitalsQuery.data &&
                    hospitalsQuery.data.map((hospital) => (
                      <MenuItem key={hospital.id} value={hospital.id}>
                        {hospital.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Stack>
            <Stack spacing={1}>
              {isGroup && (
                <Typography>Selected places: {checked.length}</Typography>
              )}
              <Paper variant="outlined">
                <List sx={{ width: '100%' }} disablePadding>
                  {data &&
                    data.content.map((room, i) => (
                      <RoomAccordion
                        key={room.id}
                        room={room}
                        onCheck={handleToggle}
                        checked={checked}
                        isFirst={i === 0}
                        isGroup={isGroup}
                      />
                    ))}
                </List>
              </Paper>
            </Stack>
            {data && (
              <Pagination
                count={data.totalPages}
                onChange={handleChangePage}
                page={pageNumber}
              />
            )}
          </Stack>
          <Stack direction="row">
            <Button
              variant="outlined"
              onClick={handleContinue}
              disabled={!checked}
            >
              Continue
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          width: '100%',
          ...(touched &&
            invalid && { borderColor: (theme) => theme.palette.error.main }),
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{
            width: '100%',
          }}
        >
          <Typography>
            <Typography variant="subtitle2">Place</Typography>
            {checked.slice(1) ? (
              <Box>
                <Typography>{checked.slice(1).join(', ')}</Typography>
              </Box>
            ) : (
              <Typography color="text.secondary">{input.value}</Typography>
            )}
          </Typography>
          <Button onClick={handleToggleModal} sx={{ minWidth: 140 }}>
            Select place
          </Button>
        </Stack>
        <FormHelperText sx={{ color: (theme) => theme.palette.error.main }}>
          {touched && error}
        </FormHelperText>
      </Paper>
    </>
  )
}

export default PlaceSelector
