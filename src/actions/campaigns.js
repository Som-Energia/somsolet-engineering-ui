export const fetchProject = (id) => {
  return {
    type: "FETCH_PROJECT",
    payload: {
      request: {
        method: "GET",
        url: `/technical_details/`,
        params: { projectId: id },
      },
    },
  };
};

export const fetchCampaigns = () => {
  return {
    type: "FETCH_CAMPAIGNS",
    payload: {
      request: {
        method: "POST",
        url: "/campaign",
      },
    },
  };
};

export const fetchCampaign = (id) => {
  return {
    type: "FETCH_CAMPAIGN",
    payload: {
      request: {
        method: "POST",
        url: `/campaign/${id}`,
      },
    },
  };
};

export const fetchProjects = ({ id, params }) => {
  return {
    type: "FETCH_PROJECTS",
    payload: {
      request: {
        method: "POST",
        url: `/project`,
        params: { campaignId: id, ...params },
      },
    },
  };
};

export const updateSort = (payload) => {
  return {
    type: "UPDATE_FILTERING",
    payload: payload,
  };
};

export const getCampaign = (id) => (dispatch) => {
  dispatch(fetchCampaign(id));
  dispatch(fetchProjects({ id }));
};
