import axios from 'axios'

const auth = {
  username: process.env.NEXT_PUBLIC_SOMSOLET_USER,
  password: process.env.NEXT_PUBLIC_SOMSOLET_PASS
}

export const getProjects = async (campaignId) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_SOMSOLET_API}/project`, {
      headers: {
        // dni: '18897527Z'
      },
      auth: { ...auth }
    })
    .catch((error) => console.error(error))
}

export const getCCH = async (projectId) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_SOMSOLET_API}/cch`, {
      headers: {
        projectId: projectId
      },
      auth: { ...auth }
    })
    .catch((error) => console.error(error))
}

export const getStages = async () => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_SOMSOLET_API}/stages`, {
      auth: { ...auth }
    })
    .catch((error) => console.error(error))
}

export const getSelectedTechnicalDetails = async (selectedProjects = []) => {
  const response = await axios
    .get(`${process.env.NEXT_PUBLIC_SOMSOLET_API}/technical_details/`, {
      auth: { ...auth }
    })
    .catch((error) => console.error(error))

  if (response.data && response.data.length > 0) {
    const projects = selectedProjects.map((project) => project.projectId)
    return response.data.filter((item) => projects.includes(item.project))
  }
}

export const getTechnicalDetails = async (projectId) => {
  return axios
    .get(
      `${process.env.NEXT_PUBLIC_SOMSOLET_API}/technical_details/?projectId=${projectId}`,
      {
        auth: { ...auth }
      }
    )
    .catch((error) => console.error(error))
}

export const uploadFile = async () => {
  return true
}
