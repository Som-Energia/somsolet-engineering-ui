import { forwardRef, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined'
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined'
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined'
import SaveIcon from '@material-ui/icons/SaveOutlined'
import CloseIcon from '@material-ui/icons/CloseOutlined'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LanguageIcon from '@material-ui/icons/Language'
import PowerOutlinedIcon from '@material-ui/icons/PowerOutlined'
import FileIcon from '@material-ui/icons/DescriptionOutlined'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ProjectTechnicalDetails = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton size="small" onClick={handleClickOpen}>
        <SettingsOutlinedIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className={classes.dialogTitle}>
          <SettingsOutlinedIcon />
          &nbsp;{'Technical Details'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Installation"
                id="standard-size-small"
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Campanya"
                id="standard-size-small"
                size="small"
                variant="outlined"
                fullWidth
                className={classes.input}
                InputProps={{
                  startAdornment: <WbSunnyOutlinedIcon />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Client"
                id="standard-size-small"
                size="small"
                variant="outlined"
                className={classes.input}
                fullWidth
                InputProps={{
                  startAdornment: <PermIdentityOutlinedIcon />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Email"
                size="small"
                variant="outlined"
                className={classes.input}
                fullWidth
                InputProps={{
                  startAdornment: <MailOutlineIcon />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Phone"
                size="small"
                variant="outlined"
                className={classes.input}
                fullWidth
                InputProps={{
                  startAdornment: <PhoneOutlinedIcon />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Language"
                size="small"
                variant="outlined"
                className={classes.input}
                fullWidth
                InputProps={{
                  startAdornment: <LanguageIcon />
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Adreça"
                id="standard-size-small"
                size="small"
                variant="outlined"
                className={classes.input}
                fullWidth
                InputProps={{
                  startAdornment: <HomeOutlinedIcon />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Municipi"
                id="standard-size-small"
                size="small"
                variant="outlined"
                className={classes.input}
                fullWidth
                InputProps={{
                  startAdornment: <PlaceOutlinedIcon />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Comarca"
                id="standard-size-small"
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Codi Postal"
                id="standard-size-small"
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Numero contracte"
                id="standard-size-small"
                size="small"
                variant="outlined"
                fullWidth
                className={classes.input}
                InputProps={{
                  startAdornment: <FileIcon />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                label="CUPS"
                id="standard-size-small"
                size="small"
                variant="outlined"
                fullWidth
                className={classes.input}
                InputProps={{
                  startAdornment: <PowerOutlinedIcon />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Orientació coberta"
                id="standard-size-small"
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Angle plaques solars"
                id="standard-size-small"
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Potència instal·lada (kWp)"
                id="standard-size-small"
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Potència contractada"
                id="standard-size-small"
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Tarifa d'accès"
                id="standard-size-small"
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Consum anual (kWh)"
                id="standard-size-small"
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="inherit"
            startIcon={<CloseIcon />}>
            Tanca
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="inherit"
            startIcon={<SaveIcon />}>
            Desa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ProjectTechnicalDetails

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'underline',
    textUnderlineOffset: '1px',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  dialogTitle: {
    '& h2': {
      display: 'flex',
      alignItems: 'center'
    }
  },
  input: {
    '& input': {
      color: 'rgba(0, 0, 0, 0.54)'
    },
    '& path': {
      color: 'rgba(0, 0, 0, 0.54)'
    }
  }
}))
