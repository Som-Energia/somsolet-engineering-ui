import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PATHS from '../paths'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import CardActionArea from '@mui/material/CardActionArea'

const StyledCard = styled.article`
  padding: ${({ theme }) => theme.spacings.medium1};
  font-size: 16px;
  color: ${({ theme }) => theme.color.charcoal800};
  position: relative;
  height: 100%;

  > a {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &:hover + h2 {
      color: ${({ theme, isActive }) => isActive && theme.color.primary};
    }
  }

  > h2 {
    color: ${({ theme, isActive }) => !isActive && theme.color.charcoal500};
    font-size: 18px;
    transition: all 100ms ease-in-out;
  }
`
const StyledText = styled.p`
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme, isActive }) => !isActive && theme.color.charcoal600};
  margin: 0;
`

const StyledStatus = styled.p`
  font-size: 14px;
  margin-bottom: ${({ theme }) => theme.spacings.small3};
`

const CampaignCard = ({ data }) => {
  const {
    campaignId: id,
    name,
    active,
    region: { geographicalRegion, autonomousCommunity },
  } = data

  const nAlerts = 3

  return (
    <Card isActive={active} sx={{height:"100%"}}>
      <CardActionArea sx={{height:"100%", paddingRight:"10px"}}
      {...(active ? {component: Link, to: `${PATHS.CAMPAIGN}/${id}`} : {})}>
      <CardHeader
        action={
          nAlerts === 0
          ? null
          :
          <Badge
            badgeContent= { nAlerts }
            color="error"
          > 
            <NotificationsIcon />
          </Badge>
        }
        title = {name}
      />
      <CardContent>
        <StyledText>
          {geographicalRegion && `${geographicalRegion}, `}
          {autonomousCommunity}
        </StyledText>
      </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CampaignCard
