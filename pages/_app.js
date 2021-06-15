import React, { useEffect } from 'react'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'

import ProgressBar from '@badrap/bar-of-progress'
import Router from 'next/router'

import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import theme from '@/styles/theme'

import { CampaignContextProvider } from 'context/campaign'

import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'

const progress = new ProgressBar({
  size: 2,
  color: theme.palette.primary.main,
  className: 'progress-bar',
  delay: 100
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

export default function MyApp(props) {
  const { Component, pageProps } = props
  const classes = useStyles()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Som Solet | Som Energia</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CampaignContextProvider>
          <div className={classes.root}>
            <Header />
            <main className={classes.main}>
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
        </CampaignContextProvider>
      </ThemeProvider>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f2f2f2',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'between',
    minHeight: '100vh'
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '84px',
    paddingBottom: '28px'
  },
  title: {
    flexGrow: 1
  }
}))
