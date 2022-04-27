import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { useEffect } from "react";
import { getCampaign, updateSort, fetchProjects } from "../actions/campaigns";
import { DataGrid } from "@mui/x-data-grid";
import ProjectsFilters from "../components/ProjectsFilters";
const StyledContainer = styled.div``;

const StyledTableContainer = styled.div`
  height: 400px;
  width: 100%;
  background-color: white;
`;

const Campaign = () => {
  const dispatch = useDispatch();
  const { campaign, projects, filters, filtering, isLoading } = useSelector(
    (state) => state.campaigns
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch(getCampaign(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchProjects({ id, params: filtering }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtering]);

  const handleFilter = (value) => {
    dispatch(updateSort({ ...filtering, ...value }));
  };

  return (
    !isLoading &&
    campaign && (
      <StyledContainer>
        <h2>{campaign.name}</h2>
        <StyledTableContainer>
          {projects?.columns && projects?.rows && (
            <>
              <ProjectsFilters
                data={filters}
                onFilterChange={handleFilter}
                filtering={filtering}
              />
              <DataGrid
                rows={projects.rows}
                columns={projects.columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </>
          )}
        </StyledTableContainer>
      </StyledContainer>
    )
  );
};

export default Campaign;
