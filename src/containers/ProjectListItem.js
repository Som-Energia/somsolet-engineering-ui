import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

export default function ProjectListItem({ project }) {

  console.log('project', project)
  return (
    <Card sx={{padding: '5px'}}>
      <CardHeader
        action={
          <Badge
            badgeContent={project.warning !== 'No Warn' ? 0 : 1}
            color="error"
          >
            <NotificationsIcon />
          </Badge>
        }
        title={project.name}
        subheader={project.installation}
      />
      <CardContent>
        {project.warning !== 'No Warn' ? null : (
          <Alert severity="warning">
            This is a warning alert — check it out!
          </Alert>
        )}
        <Typography component="h6">{project.status}</Typography>
      </CardContent>
      <CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button startIcon={<VisibilityIcon />}>VIEW DETAILS</Button>
      </CardActions>
    </Card>
  )
}
