import { forwardRef, useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import Switch from '@material-ui/core/Switch'
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

import { getTechnicalDetails } from '@/lib/project'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Field = (props) => {
  const { name, label, type, data, loading, handleChange } = props
  if (type === 'divider') {
    return <Divider />
  }

  if (type === 'boolean') {
    return (
      <FormControlLabel
        control={
          <Switch
            checked={data?.[name]}
            color="primary"
            onChange={handleChange}
            name={name}
            inputProps={{ 'aria-label': label }}
          />
        }
        label={label}
      />
    )
  } else if (type === 'textarea') {
    return (
      <TextField
        label={label}
        name={name}
        multiline
        rows={4}
        value={data?.[name]}
        InputLabelProps={{ shrink: !!data?.[name] }}
        disabled={loading}
        fullWidth
        variant="outlined"
        onChange={handleChange}
      />
    )
  } else {
    return (
      <TextField
        label={label}
        name={name}
        size="small"
        variant="outlined"
        fullWidth
        InputLabelProps={{
          shrink: data?.[name] !== '' && data?.[name] !== null
        }}
        disabled={loading}
        value={data?.[name] || ''}
        onChange={handleChange}
      />
    )
  }
}

const fields = [
  { name: 'roof_orientation', label: 'Orientació coberta', type: undefined },
  { name: 'solar_modules_angle', label: 'Orientació coberta', type: undefined },
  {
    name: 'installation_power',
    label: 'Potència instal·lada (kWp)',
    type: undefined
  },
  { name: 'power', label: 'Potència contractada', type: undefined },
  { name: 'tariff', label: "Tarifa d'accès", type: undefined },
  { name: 'anual_consumption', label: 'Consum anual (kWh)', type: undefined },
  { name: 'client_comments', label: 'Comentaris client', type: 'textarea' },
  {
    name: 'engineering_comments',
    label: 'Comentaris enginyeria',
    type: 'textarea'
  },
  { name: 'voltage', label: 'Tensió', type: undefined },
  { name: 'count_panels', label: 'Num. de panells', type: undefined },
  { name: 'installation_model', label: 'Model instal·lació', type: undefined },
  {
    name: 'installation_singlephase_model',
    label: 'Model instal·lació monofàsic',
    type: undefined
  },
  {
    name: 'installation_threephase_model',
    label: 'Model instal·lació trifàsic',
    type: undefined
  },
  {
    name: 'count_shadow_optimizer',
    label: 'Num. optimitzador de sombres',
    type: undefined
  },
  { name: 'homemanager', label: 'Homemanager', type: 'boolean' },
  { name: 'power_meter', label: 'Power meter', type: 'boolean' },
  { name: 'acquire_interest', label: 'Acquire interest', type: undefined },
  { type: 'divider' },
  { name: 'bateries_brand', label: 'Marca bateries', type: undefined },
  { name: 'bateries_model', label: 'Model bateries', type: undefined },
  { name: 'bateries_power', label: 'Power bateries', type: undefined },
  { name: 'bateries_capacity', label: 'Capacitat bateries', type: undefined },
  { name: 'bateries_price', label: 'Preu bateries', type: undefined },
  { type: 'divider' },
  {
    name: 'shadow_optimizer',
    label: 'Optimitzador de sombres',
    type: 'boolean'
  },
  {
    name: 'shadow_optimizer_brand',
    label: "Marca optimitzador d'ombres",
    type: undefined
  },
  {
    name: 'shadow_optimizer_model',
    label: "Model optimitzador d'ombres",
    type: undefined
  },
  {
    name: 'shadow_optimizer_price',
    label: "Preu optimitzador d'ombres",
    type: undefined
  },
  {
    name: 'peak_power_panels_wp',
    label: 'Peak Power Panels WP',
    type: undefined
  },
  { name: 'panel_brand', label: 'Marca panell', type: undefined },
  { name: 'panel_type', label: 'Tipus panell', type: undefined },
  { name: 'panel_model', label: 'Model panell', type: undefined },
  { name: 'inversor_brand', label: 'Marca inversor', type: undefined },
  { name: 'inversor_model', label: 'Model inversor', type: undefined },
  {
    name: 'nominal_inversor_power',
    label: 'Inversor de potència nominal',
    type: undefined
  },
  { name: 'charger_manager', label: 'Cargador manager', type: 'boolean' },
  {
    name: 'charger_manager_brand',
    label: 'Marca cargador manager',
    type: undefined
  },
  {
    name: 'charger_manager_model',
    label: 'Model cargador manager',
    type: undefined
  },
  {
    name: 'charger_manager_price',
    label: 'Preu cargador manager',
    type: undefined
  },
  { type: 'divider' },
  { name: 'electric_car', label: 'Cotxe elèctric', type: 'boolean' },
  {
    name: 'electric_car_charger',
    label: 'Cotxe elèctric manager',
    type: 'boolean'
  },
  {
    name: 'electric_car_charger_brand',
    label: 'Marca cargador cotxe',
    type: undefined
  },
  {
    name: 'electric_car_charger_model',
    label: 'Model cargador cotxe',
    type: undefined
  },
  {
    name: 'electric_car_charger_power',
    label: 'Potència cargador cotxe',
    type: undefined
  },
  {
    name: 'electric_car_charger_price',
    label: 'Preu cargador cotxe',
    type: undefined
  }
]

const ProjectTechnicalDetails = (props) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { projectId } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(props)

  useEffect(() => {
    if (open) {
      setLoading(true)
      getTechnicalDetails(projectId)
        .then((response) => {
          const technicalDetails = response.data?.[0]
          setData({ ...data, ...technicalDetails })
          setLoading(false)
        })
        .catch((error) => console.log(error))
    }
  }, [open])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event) => {
    const nameValue = {}
    nameValue[event.target.name] = event.target.value
    console.log(nameValue)
    setData({ ...data, ...nameValue })
    console.log(data)
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
        maxWidth="lg"
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className={classes.dialogTitle}>
          <SettingsOutlinedIcon />
          &nbsp;{'Technical Details'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Installation"
                size="small"
                variant="outlined"
                fullWidth
                value={data?.name}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Campanya"
                size="small"
                variant="outlined"
                fullWidth
                className={classes.input}
                InputProps={{
                  startAdornment: <WbSunnyOutlinedIcon />
                }}
                value={data?.campaignName}
                disabled
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
                value={data?.registeredPerson?.name}
                disabled
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
                value={data?.registeredPerson?.email}
                disabled
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
                value={data?.registeredPerson?.phoneNumber}
                disabled
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
                value={data?.registeredPerson?.language}
                disabled
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
                value={data?.supplyPoint?.address?.street}
                disabled
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
                value={data?.supplyPoint?.address?.municipality}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Comarca"
                id="standard-size-small"
                size="small"
                variant="outlined"
                fullWidth
                value={data?.supplyPoint?.address?.administrativeDivision}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Codi Postal"
                id="standard-size-small"
                size="small"
                variant="outlined"
                fullWidth
                value={data?.supplyPoint?.address?.postalCode}
                disabled
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
                disabled
                value={data?.contract_number}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                label="CUPS"
                id="standard-size-small"
                name="cups"
                size="small"
                variant="outlined"
                fullWidth
                className={classes.input}
                InputProps={{
                  startAdornment: <PowerOutlinedIcon />
                }}
                disabled
                value={data?.cups}
              />
            </Grid>
            {fields.map((field, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={
                  field?.type === 'textarea' || field.type === 'divider'
                    ? 12
                    : 4
                }>
                <Field
                  {...field}
                  data={data}
                  loading={loading}
                  handleChange={handleChange}
                />
              </Grid>
            ))}
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
