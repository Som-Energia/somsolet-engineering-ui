import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

import ProgressBar from '@badrap/bar-of-progress'
import Router from 'next/router'

import theme from '@styles/theme'
import { CacheProvider } from '@emotion/react'
import { Provider } from 'next-auth/client'

import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@mui/material/styles'
import createEmotionCache from '@styles/createEmotionCache'

import { CampaignContextProvider } from 'context/campaign'

import { Box, CssBaseline } from '@mui/material'

import Header from '@components/layout/Header'
import Footer from '@components/layout/Footer'

const progress = new ProgressBar({
  size: 2,
  color: theme.palette.primary.main,
  className: 'progress-bar',
  delay: 100
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

const clientSideEmotionCache = createEmotionCache()

const MyApp = (props) => {
  const {
    Component,
    pageProps: { session, ...pageProps },
    emotionCache = clientSideEmotionCache
  } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Som Solet | Som Energia</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider
          session={pageProps.session}
          options={{
            clientMaxAge: 300,
            keepAlive: 5 * 60
          }}>
          <CampaignContextProvider>
            <SnackbarProvider maxSnack={3}>
              <Box
                sx={{
                  flexGrow: 1,
                  backgroundColor: '#f2f2f2',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'between',
                  minHeight: '100vh'
                }}>
                <Header />
                <Box
                  variant="main"
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '84px',
                    paddingBottom: '28px'
                  }}>
                  <Component {...pageProps} />
                </Box>
                <Footer />
              </Box>
            </SnackbarProvider>
          </CampaignContextProvider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired
}

export default MyApp
