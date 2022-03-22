import { forwardRef, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useTheme } from '@mui/styles'

import Uploader from '@components/somsolet/Uploader'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Grid,
  Link,
  TextField,
  Slide,
  Switch,
  Typography,
  FormControl,
  FormLabel
} from '@mui/material'

import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import FileIcon from '@mui/icons-material/DescriptionOutlined'
import SaveIcon from '@mui/icons-material/SaveOutlined'
import CloseIcon from '@mui/icons-material/CloseOutlined'

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
  const theme = useTheme()
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
      }}>
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
          sx={{
            textDecoration: 'underline',
            textUnderlineOffset: '1px',
            cursor: 'pointer',
            '&:hover': {
              color: theme.palette.primary.main
            }
          }}
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
        <DialogTitle
          sx={{
            '& h2': {
              display: 'flex',
              alignItems: 'center'
            }
          }}>
          <FileIcon /> &nbsp;{`${id}`.toUpperCase()}
        </DialogTitle>
        <DialogContent style={{ paddingTop: '16px' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Installation"
                fullWidth
                variant="outlined"
                size="small"
                value={project || ''}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Client"
                fullWidth
                variant="outlined"
                size="small"
                value={client || ''}
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
                value={date || ''}
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
                      Estat del {`${id}`.toUpperCase()}
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
                {`${id}`.toUpperCase()} enviat
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
    </Box>
  )
}

export default StageRow
