import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#96b633'
    },
    secondary: {
      main: '#a1a1a1'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#f2f2f2'
    },
    text: {
      primary: '#4d4d4d'
    },
    typography: {
      htmlFontSize: 16
    }
  },
  shape: {
    borderRadius: 4
  }
})

export default theme
