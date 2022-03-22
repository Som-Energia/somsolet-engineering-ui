import React from 'react'

import Box from '@mui/material/Box'
import MuiAlert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

const Alert = ({ severity = 'warning', title, children }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <MuiAlert
        severity={severity}
        sx={{ padding: '10px 16px', fontSize: '1rem' }}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {children}
      </MuiAlert>
    </Box>
  )
}

export default Alert
