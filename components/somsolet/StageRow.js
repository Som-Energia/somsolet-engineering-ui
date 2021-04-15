import { forwardRef, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { makeStyles } from '@material-ui/core/styles'

import Uploader from 'components/somsolet/Uploader'

import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField'
import Slide from '@material-ui/core/Slide'

import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined'
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined'
import FileIcon from '@material-ui/icons/DescriptionOutlined'
import SaveIcon from '@material-ui/icons/SaveOutlined'
import CloseIcon from '@material-ui/icons/CloseOutlined'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const StageRow = (props) => {
  const {
    id,
    date,
    invalid,
    file,
    project = 'Projecte',
    client = 'Client'
  } = props
  const classes = useStyles()
  const { t } = useTranslation('common')

  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(invalid)
  const [attachments, setAttachments] = useState([file])
  const [attachmentErrors, setAttachmentErrors] = useState()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleStatus = (event) => {
    setStatus(event.target.checked)
  }

  return (
    <div className={classes.stage}>
      <div>
        {date &&
          (invalid === true ? (
            <IconButton size="small">
              <ErrorOutlineIcon color="error" />
            </IconButton>
          ) : invalid === false ? (
            <IconButton size="small">
              <CheckCircleOutlineIcon color="primary" />
            </IconButton>
          ) : (
            ''
          ))}
      </div>
      <div>
        &nbsp;
        <Link
          href="#"
          color="inherit"
          className={classes.link}
          onClick={handleClickOpen}>
          <span>{date && new Date(date).toLocaleDateString()}</span>
        </Link>
      </div>
      <div>
        {!date && (
          <IconButton size="small" onClick={handleClickOpen}>
            <PublishOutlinedIcon />
          </IconButton>
        )}
      </div>
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
          <FileIcon /> &nbsp;{t(`${id}`.toUpperCase())}
        </DialogTitle>
        <DialogContent style={{ paddingTop: '16px' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Installation"
                fullWidth
                variant="outlined"
                size="small"
                value={project}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Client"
                fullWidth
                variant="outlined"
                size="small"
                value={client}
                disabled
                InputProps={{
                  startAdornment: <PermIdentityOutlinedIcon fontSize="small" />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Data enviament"
                fullWidth
                variant="outlined"
                size="small"
                value={date}
                disabled
                InputProps={{
                  startAdornment: <CalendarTodayIcon fontSize="small" />
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              {invalid !== undefined && (
                <>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Estat del {t(`${id}`.toUpperCase())}
                    </FormLabel>

                    <Typography component="div">
                      <Grid
                        component="label"
                        container
                        alignItems="center"
                        spacing={1}>
                        <Grid item>
                          <CheckCircleOutlineIcon
                            color={status ? 'inherit' : 'primary'}
                          />
                        </Grid>
                        <Grid item>
                          <Switch
                            checked={status}
                            onChange={handleStatus}
                            name="status"
                          />
                        </Grid>
                        <Grid item>
                          <ErrorOutlineIcon
                            color={status ? 'error' : 'inherit'}
                          />
                        </Grid>
                      </Grid>
                    </Typography>
                  </FormControl>
                </>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend" style={{ marginBottom: '10px' }}>
                {t(`${id}`.toUpperCase())} enviat
              </FormLabel>
              <Uploader
                fieldError={attachmentErrors}
                callbackFn={(values) => {
                  setAttachments(values)
                }}
                values={attachments}
                maxFiles={1}
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
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
    </div>
  )
}

export default StageRow

const useStyles = makeStyles((theme) => ({
  stage: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
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
  }
}))
