import axios from 'axios'

const auth = {
  username: process.env.NEXT_PUBLIC_SOMSOLET_USER,
  password: process.env.NEXT_PUBLIC_SOMSOLET_PASS
}

export const getProjects = (campaignId) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_SOMSOLET_API}/project`, {
      headers: {
        // dni: '18897527Z'
      },
      auth
    })
    .catch((error) => console.error(error))
}

export const getCCH = (projectId) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_SOMSOLET_API}/cch`, {
      headers: {
        projectId: projectId
      },
      auth
    })
    .catch((error) => console.error(error))
}
