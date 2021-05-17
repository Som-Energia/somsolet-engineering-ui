import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'

import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import theme from '@/styles/theme'

import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'

import CampaignContext from 'context/campaign'

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
      <CampaignContext.Provider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className={classes.root}>
            <Header />
            <main className={classes.main}>
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </CampaignContext.Provider>
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
