import Typography from '@material-ui/core/Typography'
require('typeface-montserrat')

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  title: {
    fontFamily: 'Montserrat',
    paddingTop: '16px',
    marginBottom: '24px',
    fontSize: '1.8rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center'
  }
})

const Heading = ({ children }) => {
  const classes = useStyles()
  return (
    <Typography variant="h3" className={classes.title}>
      {children}
    </Typography>
  )
}

export default Heading
