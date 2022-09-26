import * as React from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import MenuIcon from '@mui/icons-material/Menu'
import LayersIcon from '@mui/icons-material/Layers'
import LabelIcon from '@mui/icons-material/Label'
import ApartmentIcon from '@mui/icons-material/Apartment'
import CottageIcon from '@mui/icons-material/Cottage'
import BadgeIcon from '@mui/icons-material/Badge'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import { Link } from 'react-router-dom'
import AccountMenu from './AccountMenu'
import Stack from '@mui/material/Stack'
import LocaleMenu from './LocaleMenu'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useAuth } from '../../hooks'
import ApplicationHeader from '../../modules/Application/containers/ApplicationHeader'
import ApplicationFooter from '../../modules/Application/containers/ApplicationFooter'

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const CustomDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const mdTheme = createTheme()

const Dashboard: React.FC = ({ children }) => {
  const widthMax950 = useMediaQuery('(max-width:950px)')
  const widthMax700 = useMediaQuery('(max-width:700px)')
  const [open, setOpen] = React.useState(!widthMax700)
  const toggleDrawer = () => {
    setOpen(!open)
  }
  const auth = useAuth()

  const handleLogout = () => {
    auth.logout()
  }

  const Drawer = widthMax700 ? MuiDrawer : CustomDrawer

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
              <ApplicationHeader />
            </Box>
            <Stack direction="row" spacing={3} alignItems="center">
              <LocaleMenu />
              <AccountMenu onLogout={handleLogout} />
            </Stack>
          </Toolbar>
        </AppBar>
        <Drawer
          open={open}
          variant={widthMax700 ? undefined : 'permanent'}
          onClose={toggleDrawer}
          sx={{ overflowX: 'hidden' }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List
            component="nav"
            onClick={() => widthMax700 && setOpen(false)}
            sx={{ width: '240px' }}
          >
            <Link to="/roles">
              <ListItemButton selected={location.pathname === '/roles'}>
                <ListItemIcon>
                  <BadgeIcon />
                </ListItemIcon>
                <ListItemText primary="Roles" />
              </ListItemButton>
            </Link>
            <Link to="/users">
              <ListItemButton selected={location.pathname === '/users'}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </Link>
            <Link to="/hospitals">
              <ListItemButton selected={location.pathname === '/hospitals'}>
                <ListItemIcon>
                  <CottageIcon />
                </ListItemIcon>
                <ListItemText primary="Hospitals" />
              </ListItemButton>
            </Link>
            <Link to="/departments">
              <ListItemButton selected={location.pathname === '/departments'}>
                <ListItemIcon>
                  <FolderOpenIcon />
                </ListItemIcon>
                <ListItemText primary="Departments" />
              </ListItemButton>
            </Link>
            <Link to="/labels">
              <ListItemButton selected={location.pathname === '/labels'}>
                <ListItemIcon>
                  <LabelIcon />
                </ListItemIcon>
                <ListItemText primary="Labels" />
              </ListItemButton>
            </Link>
            <Link to="/companies">
              <ListItemButton selected={location.pathname === '/companies'}>
                <ListItemIcon>
                  <ApartmentIcon />
                </ListItemIcon>
                <ListItemText primary="Companies" />
              </ListItemButton>
            </Link>
            <Divider sx={{ my: 1 }} />
            <Link to="/rates">
              <ListItemButton selected={location.pathname === '/rates'}>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Rates" />
              </ListItemButton>
            </Link>
            <ListItemButton>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Rooms" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Booking" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <Link to="/application">
              <ListItemButton selected={location.pathname === '/application'}>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Application" />
              </ListItemButton>
            </Link>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Box sx={widthMax950 ? { m: 2 } : { mr: 5, ml: 5, mt: 4, mb: 4 }}>
            {children}
            <Box sx={{ mt: 4 }}>
              <ApplicationFooter />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Dashboard
