import { useRouter } from 'next/router'
import { Container } from '@material-ui/core'
import Heading from '@/components/layout/Heading'

export default function Campaign() {
  const router = useRouter()
  const { campaignId } = router.query
  return (
    <div>
      <Container>
        <Heading>{`Detalls tècnics #${campaignId}`}</Heading>
      </Container>
    </div>
  )
}
