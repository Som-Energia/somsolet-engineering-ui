import React from 'react'
import useTranslation from 'next-translate/useTranslation'

import { Container, Grid } from '@mui/material'
import Heading from '@components/layout/Heading'
import CampaignItem from '@components/somsolet/Campaign'

import Alert from 'components/layout/Alert'

import { getCampaigns } from '@lib/campaign'

export default function Home({ campaigns = [] }) {
  const { t } = useTranslation('common')
  return (
    <>
      <Container>
        <Heading>Les meves campanyes</Heading>
        {!campaigns.length && <Alert>{t('NO_CAMPAIGNS_FOUND')}</Alert>}
        <Grid container spacing={3}>
          {campaigns.map((campaign, index) => (
            <React.Fragment key={index}>
              <Grid key={campaign?.id} item xs={4}>
                <CampaignItem {...campaign} />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  // const res = await fetch('http://localhost:3000/api/somsolet/campaigns')
  // const data = await res.json()
  const response = await getCampaigns()
  const data = response?.data ? response.data : []

  return {
    props: { campaigns: data } // will be passed to the page component as props
  }
}
