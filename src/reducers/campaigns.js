export const initialState = {
  isLoading: false,
  error: null,
  campaigns: null,
  campaign: null,
  projects: null,
  filtering: null,
};

const reducer = (state = initialState, { type, payload, ...action }) => {
  switch (type) {
    case "UPDATE_FILTERING":
      return {
        ...state,
        filtering: { ...state.filtering, ...payload },
      };
    case "FETCH_PROJECTS":
    case "FETCH_CAMPAIGNS":
    case "FETCH_CAMPAIGN":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_PROJECTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        projects: transformProjectsToTable(payload.data),
        filters: transformProjectsToFilters(payload.data),
      };
    case "FETCH_CAMPAIGNS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        campaigns: payload.data,
      };
    case "FETCH_CAMPAIGN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        campaign: payload.data,
      };
    case "FETCH_CAMPAIGNS_FAIL":
    case "FETCH_CAMPAIGN_FAIL":
    case "FETCH_PROJECTS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;

const transformProjectsToTable = (data) => {
  return {
    columns: [
      { field: "id", headerName: "ID", width: 70 },
      { field: "installation", headerName: "Installation", width: 130 },
      { field: "name", headerName: "Name", width: 130 },
      { field: "status", headerName: "Status", width: 130 },
      { field: "warning", headerName: "Warning", width: 100 },
    ],
    rows: data.map(({ description }) => {
      return {
        id: description.projectId,
        installation: description.campaignName,
        name: description.registeredPerson.name,
        status: description.stageId,
        warning: description.warning,
      };
    }),
  };
};

const transformProjectsToFilters = (data) => {
  return [
    {
      id: "status",
      label: "Status",
      values: cleanDuplicatedValuesOnFilters(
        data.map(({ description }) => ({
          label: description.stageId,
          value: description.stageId,
        }))
      ),
    },
    {
      id: "warning",
      label: "Warning",
      values: cleanDuplicatedValuesOnFilters(
        data.map(({ description }) => ({
          label: description.warning,
          value: description.warning,
        }))
      ),
    },
  ];
};

const cleanDuplicatedValuesOnFilters = (data) =>
  data.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.label === value.label && t.value === value.value)
  );
