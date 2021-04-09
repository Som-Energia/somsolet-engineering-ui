import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'

const Footer = () => {
  const classes = useStyles()
  return (
    <footer className={classes.root}>
      <Container>
        <div className={classes.madeText}>
          Made with&nbsp;<span>💚</span>&nbsp;&nbsp;by Som Energia
        </div>
      </Container>
    </footer>
  )
}

export default Footer

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2rem 0',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  madeText: {
    fontSize: '1rem',
    fontWeight: 400
  }
}))
