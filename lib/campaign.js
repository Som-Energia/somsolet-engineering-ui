import axios from 'axios'

const auth = {
  username: process.env.NEXT_PUBLIC_SOMSOLET_USER,
  password: process.env.NEXT_PUBLIC_SOMSOLET_PASS
}

export const getCampaign = (campaignId) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_SOMSOLET_API}/campaign/${campaignId}`, {
      auth
    })
    .catch((error) => console.error(error))
}

export const getCampaigns = () => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_SOMSOLET_API}/campaign`, {
      auth
    })
    .catch((error) => console.error(error))
}
