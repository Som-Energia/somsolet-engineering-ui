import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  title: {
    paddingTop: '16px',
    marginBottom: '24px',
    fontSize: '1.8rem',
    fontWeight: 400,
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
