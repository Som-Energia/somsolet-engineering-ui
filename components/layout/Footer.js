import React from 'react'
import { Box, Container } from '@mui/material'

const Footer = () => {
  return (
    <Box
      variant="footer"
      sx={{
        padding: '2rem 0',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
      <Container>
        <Box sx={{ fontSize: '1rem', fontWeight: 400 }}>
          Som Energia © {new Date().getFullYear()} | Made with 💚 and open
          source
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
