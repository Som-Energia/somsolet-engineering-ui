import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import Heading from '@components/layout/Heading'

export default function Campaign() {
  const router = useRouter()
  const { campaignId } = router.query
  return (
    <>
      <Container>
        <Heading>{`Calendari #${campaignId}`}</Heading>
      </Container>
    </>
  )
}
