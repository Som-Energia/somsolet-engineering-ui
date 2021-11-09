import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'

import EventIcon from '@material-ui/icons/EventOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined'
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined'

const Campaign = (props) => {
  const { campaignId, name, active } = props
  const classes = useStyles()
  const router = useRouter()

  const handleScheduleClick = (event) => {
    event.preventDefault()
    router.push(`/schedule/${campaignId}`)
  }

  const handleDetailClick = (event) => {
    event.preventDefault()
    router.push(`/technical-details/${campaignId}`)
  }

  return (
    <>
      <Card className={classes.root} elevation={0}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="subtitle1" color="textSecondary">
              {`#${campaignId}`}
            </Typography>
            <Link href={`/campaign/${campaignId}`} passHref>
              <MuiLink color="inherit">
                <Typography
                  component="h5"
                  variant="h5"
                  className={classes.title}>
                  {name}
                </Typography>
              </MuiLink>
            </Link>
          </CardContent>
          <div className={classes.controlsWrapper}>
            <div className={classes.controls}>
              <IconButton
                onClick={handleDetailClick}
                aria-label="technical details">
                <SettingsOutlinedIcon />
              </IconButton>
              <IconButton onClick={handleScheduleClick} aria-label="schedule">
                <EventIcon />
              </IconButton>
            </div>
            <div className={classes.active}>
              {active ? (
                <CheckCircleOutlineOutlinedIcon color="primary" />
              ) : (
                <HighlightOffOutlinedIcon color="error" />
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}

export default Campaign

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  content: {
    flex: '1 0 auto'
  },
  controlsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1)
  },
  controls: {
    display: 'flex',
    alignItems: 'center'
  },
  active: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 500,
    minHeight: '64px'
  }
}))
