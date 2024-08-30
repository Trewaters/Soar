'use client'
import React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import FlareIcon from '@mui/icons-material/Flare'
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'

import Link from 'next/link'

const navLinks = [
  {
    name: 'Home',
    href: '/',
    icon: <HomeIcon />,
  },
  {
    name: '8 Limbs',
    href: '/eightLimbs',
    icon: <FlareIcon />,
  },
  {
    name: 'Asanas',
    href: '/asanaPostures',
    icon: <WaterDropOutlinedIcon />,
  },
  {
    name: 'Flows',
    href: '/flowSeries',
    icon: <WhatshotIcon />,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: <ChevronRightIcon />,
  },
  // final item will have a divider above it
  {
    name: 'Sign In',
    href: '/userManagement/signIn',
    icon: <AccountCircleIcon />,
  },
]

export default function TopNav() {
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const toggleDrawer = (open: boolean) => () => {
    setOpenDrawer(open)
  }
  // const session = auth()
  // console.log('TopNav session', session)

  // useEffect(() => {
  //   // get session
  //   async function checkSession() {
  //     const session = await auth()
  //     console.log('TopNav session', session)
  //   }
  //   checkSession()
  // }, [])

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <nav aria-label="quick menu">
        <List>
          {navLinks.map((navItem, index) => (
            <React.Fragment key={navItem.name}>
              {index === navLinks.length - 1 && <Divider />}
              <ListItem disablePadding>
                <Link href={navItem.href} passHref>
                  <ListItemButton
                    sx={{ width: '250px' }}
                    onClick={() => {
                      setOpenDrawer(false)
                    }}
                  >
                    <ListItemIcon>{navItem.icon}</ListItemIcon>
                    <ListItemText>
                      {navItem.name === 'Sign In' ? (
                        /* ! TO DO:
                         * access session to get session status and flip text based on that.
                         * Add the Sign in button here outside the list.
                         * I want to have text ("Login/Logout") change based on the session status.
                         */
                        // { session === null ? (
                        // <Typography variant="button">Login</Typography>
                        // ):(
                        //   <Typography variant="button">Logout</Typography>
                        // )}
                        <Typography variant="button">Login/Logout</Typography>
                      ) : (
                        <Typography variant="button">{navItem.name}</Typography>
                      )}
                      {/* <Typography variant="button">{navItem.name}</Typography> */}
                    </ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </nav>
    </Box>
  )

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    setOpenDrawer(false)
  }

  return (
    <>
      <IconButton disableRipple onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        <Paper onClick={handleClick} sx={{ height: '100%' }}>
          {DrawerList}
        </Paper>
      </Drawer>
    </>
  )
}
