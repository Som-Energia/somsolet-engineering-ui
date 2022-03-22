import Typography from '@mui/material/Typography'
require('typeface-montserrat')

const Heading = ({ children }) => {
  return (
    <Typography
      variant="h3"
      sx={{
        fontFamily: 'Montserrat',
        paddingTop: '16px',
        marginBottom: '24px',
        fontSize: '1.5rem',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center'
      }}>
      {children}
    </Typography>
  )
}

export default Heading
