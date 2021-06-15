import { createContext, useState } from 'react'

const CampaignContext = createContext({
  selectedProjects: [],
  setSelectedProject: () => {}
})

export function CampaignContextProvider(props) {
  const [selectedProjects, setSelectedProject] = useState([])

  return (
    <CampaignContext.Provider value={{ selectedProjects, setSelectedProject }}>
      {props.children}
    </CampaignContext.Provider>
  )
}

export default CampaignContext
