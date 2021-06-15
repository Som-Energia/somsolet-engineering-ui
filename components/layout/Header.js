import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import AccountCircle from '@material-ui/icons/AccountCircleOutlined'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/PersonOutlineOutlined'

import Link from 'next/link'

require('typeface-montserrat')

const Header = () => {
  const classes = useStyles()
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
      <Toolbar className={classes.toolbar}>
        <div className={classes.brand}>
          <Link href="/" passHref>
            <a>
              <img src="/cuca.png" alt="Som Energia" />
            </a>
          </Link>
          <h3>Som Solet</h3>
        </div>
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

const useStyles = makeStyles((theme) => ({
  brand: {
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
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))
