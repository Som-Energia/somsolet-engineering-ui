import React, { useEffect } from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup'

import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { makeStyles } from '@material-ui/core'
//import { useAuthState } from 'context/auth'

const Login = (props) => {
  const classes = useStyles()

  // const { user, login, isAuthenticated, isError, error } = useAuthState()
  const error = false
  const isError = false
  /*
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }
  }, [user, isAuthenticated, history])
*/

  const handleLogin = (username, password) => {
    return false
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Presentació
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('El email no és vàlid')
              .required('El email és obligatori'),
            password: Yup.string()
              .required('La password és obligatoria')
              .min(4, 'La password ha de tenir com a mínim 4 caràcters')
            // .matches(/(?=.*[0-9])/, 'La contraseña debe tener al menos un número')
          })}
          onSubmit={(values, { setSubmitting }) => {
            const { email, password } = values
            setSubmitting(true)
            handleLogin(email, password)
              .then(() => {
                setSubmitting(false)
              })
              .catch((error) => {
                console.log(error)
                setSubmitting(false)
              })
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <TextField
                required
                fullWidth
                autoFocus
                id="email"
                label="Email"
                name="email"
                variant="outlined"
                margin="normal"
                autoComplete="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={(errors.email && touched.email) || error}
                helperText={touched.email && errors.email}
              />
              <TextField
                required
                fullWidth
                id="password"
                type="password"
                label="Password"
                name="password"
                variant="outlined"
                margin="normal"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={(errors.password && touched.password) || error}
                helperText={touched.password && errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recorda'm"
              />
              {isError && (
                <FormHelperText variant="standard" error={true}>
                  Hi ha hagut algun problema!
                </FormHelperText>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}>
                Entrar
              </Button>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Link href="#" variant="body2">
                    He oblidat la password
                  </Link>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Link href="/auth/register" variant="body2">
                    No tinc compte
                  </Link>
                </Grid>
              </Grid>
              <Box mt={2}></Box>
            </form>
          )}
        </Formik>
      </Paper>
    </Container>
  )
}

export default Login

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    paddingTop: theme.spacing(8)
  },
  paper: {
    backgroundColor: '#fff',
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(2, 0, 3),
    color: '#fff'
  }
}))
