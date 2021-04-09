import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import MuiAlert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'

const Alert = ({ severity = 'warning', title, children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <MuiAlert severity={severity} className={classes.alert}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {children}
      </MuiAlert>
    </div>
  )
}

export default Alert

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  alert: {
    padding: '10px 16px',
    fontSize: '1rem'
  }
}))
