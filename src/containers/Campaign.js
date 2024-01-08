import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { useEffect } from "react";
import { getCampaign, updateSort, fetchProjects } from "../actions/campaigns";
import { DataGrid } from "@mui/x-data-grid";
import ProjectsFilters from "../components/ProjectsFilters";
import ProjectListItem from "../containers/ProjectListItem";
import Loading from "../components/Loading";

const StyledContainer = styled.div``;

const StyledTableContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
`;

const StyledHeader = styled.h2`
  font-weight: normal;
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

  return !isLoading && campaign ? (
    <StyledContainer>
      <StyledHeader>{campaign.name}</StyledHeader>
      <StyledTableContainer>
        {projects?.rows.map((project) => (
          <ProjectListItem key={project.id} project={project}></ProjectListItem>
        ))}
      </StyledTableContainer>
    </StyledContainer>
  ) : (
    <Loading />
  );
};

export default Campaign;
