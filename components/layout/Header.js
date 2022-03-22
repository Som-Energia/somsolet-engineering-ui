import React, { useState } from 'react'

import { AppBar, Box, Toolbar, IconButton } from '@mui/material'

import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import AccountCircle from '@mui/icons-material/AccountCircleOutlined'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined'

import Link from 'next/link'

require('typeface-montserrat')

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
  }

  return (
    <AppBar color="inherit" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& h3': {
              fontFamily: 'Montserrat',
              textTransform: 'uppercase',
              fontSize: '18px',
              fontWeight: 600
            },
            '& img': {
              maxWidth: '60px',
              height: 'auto',
              marginRight: '0.75rem',
              paddingBottom: ''
            }
          }}>
          <Link href="/" passHref>
            <a>
              <img src="/cuca.png" alt="Som Energia" />
            </a>
          </Link>
          <h3>Som Solet</h3>
        </Box>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit">
            <AccountCircle color="secondary" fontSize="large" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={open}
            onClose={handleClose}>
            <MenuItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
