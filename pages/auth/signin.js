import React from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup'
import { signIn } from 'next-auth/client'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { useTheme } from '@mui/material/styles'

const Login = (props) => {
  const theme = useTheme()

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

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ height: '100%', paddingTop: theme.spacing(8) }}>
      <Paper
        sx={{
          backgroundColor: '#fff',
          padding: theme.spacing(4),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        elevation={0}>
        <Avatar
          sx={{
            margin: theme.spacing(1),
            backgroundColor: theme.palette.primary.main
          }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontFamily: 'Montserrat', fontWeight: 500 }}>
          Presentació
        </Typography>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required("L'usuari és obligatori"),
            password: Yup.string()
              .required('La password és obligatoria')
              .min(4, 'La password ha de tenir com a mínim 4 caràcters')
            // .matches(/(?=.*[0-9])/, 'La contraseña debe tener al menos un número')
          })}
          onSubmit={(values, { setSubmitting }) => {
            const { username, password } = values
            setSubmitting(true)
            signIn('credentials', { username, password })
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
            <Box
              variant="form"
              sx={{ width: '100%', marginTop: theme.spacing(1) }}
              onSubmit={handleSubmit}
              noValidate>
              <TextField
                required
                fullWidth
                autoFocus
                id="username"
                label="Usuari"
                name="username"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                error={(errors.username && touched.username) || error}
                helperText={touched.username && errors.username}
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
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                sx={{ margin: theme.spacing(2, 0, 3), color: '#fff' }}
                disabled={isSubmitting}>
                Entrar
              </Button>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Link
                    href="#"
                    variant="body2"
                    sx={{ fontWeight: 500, textDecoration: 'none' }}>
                    He oblidat la password
                  </Link>
                </Grid>
              </Grid>
              <Box mt={2}></Box>
            </Box>
          )}
        </Formik>
      </Paper>
    </Container>
  )
}

export default Login
