import { createContext } from 'react'

const CampaignContext = createContext({
  selectedProjects: [],
  setSelectedProject: () => {}
})

export function CampaignContextProvider ({children}){
  const selectedProjects = []

  return <Context.Provider value={selectedProject}>{children}</Context.Provider>
}

export default CampaignContext