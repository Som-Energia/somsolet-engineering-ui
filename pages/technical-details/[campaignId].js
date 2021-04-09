import { Container, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'

export default function Campaign() {
  const router = useRouter()
  const { campaignId } = router.query
  return (
    <div>
      <Container>
        <Typography variant="h3">{`Detalls tècnics #${campaignId}`}</Typography>
      </Container>
    </div>
  )
}
