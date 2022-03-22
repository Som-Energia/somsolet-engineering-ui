import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTheme } from '@mui/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'

import EventIcon from '@mui/icons-material/EventOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'

const CampaignItem = (props) => {
  const { campaignId, name, active } = props
  const theme = useTheme()
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
    <Card elevation={0} sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="subtitle1" color="textSecondary">
            {`#${campaignId}`}
          </Typography>
          <Link href={`/campaign/${campaignId}`} passHref>
            <MuiLink
              color="inherit"
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}>
              <Typography
                component="h5"
                variant="h5"
                sx={{
                  fontWeight: 400,
                  minHeight: '64px',
                  fontSize: '1.5rem'
                }}>
                {name}
              </Typography>
            </MuiLink>
          </Link>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(2),
            paddingBottom: theme.spacing(1)
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={handleDetailClick}
              aria-label="technical details">
              <SettingsOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleScheduleClick} aria-label="schedule">
              <EventIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {active ? (
              <CheckCircleOutlineOutlinedIcon color="primary" />
            ) : (
              <HighlightOffOutlinedIcon color="error" />
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default CampaignItem
