import { makeStyles } from '@material-ui/core/styles'
import useTranslation from 'next-translate/useTranslation'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Campaign from '@/components/somsolet/Campaign'

import Alert from 'components/layout/Alert'

import { getCampaigns } from '@/lib/campaign'

const useStyles = makeStyles({
  root: {
    paddingTop: '32px'
  },
  table: {
    minWidth: 650
  }
})

export default function Home({ campaigns = [] }) {
  const classes = useStyles()
  const { t } = useTranslation('common')
  return (
    <div className={classes.root}>
      <Container>
        {!campaigns.length && <Alert>{t('NO_CAMPAIGNS_FOUND')}</Alert>}
        <Grid container spacing={3}>
          {campaigns.map((campaign) => (
            <Grid key={campaign.id} item xs={3}>
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
