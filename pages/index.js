import useTranslation from 'next-translate/useTranslation'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Campaign from '@/components/somsolet/Campaign'
import Heading from '@/components/layout/Heading'

import Alert from 'components/layout/Alert'

import { getCampaigns } from '@/lib/campaign'

export default function Home({ campaigns = [] }) {
  const { t } = useTranslation('common')
  return (
    <div>
      <Container>
        <Heading>Les meves campanyes</Heading>
        {!campaigns.length && <Alert>{t('NO_CAMPAIGNS_FOUND')}</Alert>}
        <Grid container spacing={3}>
          {campaigns.map((campaign) => (
            <Grid key={campaign.id} item xs={4}>
              <Campaign {...campaign} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export async function getServerSideProps(context) {
  // const res = await fetch('http://localhost:3000/api/somsolet/campaigns')
  // const data = await res.json()
  const response = await getCampaigns()
  console.log(response)
  const data = response?.data ? response.data : []

  return {
    props: { campaigns: data } // will be passed to the page component as props
  }
}
