import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getCampaign, updateSort, fetchProjects } from "../actions/campaigns";
import { DataGrid } from "@mui/x-data-grid";
import ProjectsFilters from "../components/ProjectsFilters";
import ProjectListItem from "../containers/ProjectListItem";
import Loading from "../components/Loading";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

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
  const [selectedState, setSelectedState] = useState("all");

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

  // TODO: move this
  const states = [
    { value: "registered", label: "Registre" },
    { value: "prereport", label: "Preinforme" },
    {
      value: "technicalVisits",
      label: "Informe visita tècnica",
    },
    {
      value: "report",
      label: "Report",
    },
    {
      value: "offer",
      label: "Proposta d'oferta final",
    },
    {
      value: "offer_accepted",
      label: "Oferta acceptada",
    },
    {
      value: "constructionPermit",
      label: "Permís d'obra",
    },
    {
      value: "installation",
      label: "Instal·lació",
    },
    {
      value: "deliveryCertificate",
      label: "Acta de recepció",
    },
    {
      value: "legalRegistration",
      label: "Registre Legal",
    },
    {
      value: "legalization",
      label: "Legalització",
    },
    {
      value: "invoices",
      label: "Factura",
    },
    {
      value: "signature",
      label: "Signatura Contracte Clau en mà",
    },
  ];

  return !isLoading && campaign ? (
    <StyledContainer>
      <StyledHeader>{campaign.name}</StyledHeader>
      <Box>
        <TextField
          id="outlined-select-currency"
          select
          label="Status"
          value={selectedState}
          onChange={(event) => {
            setSelectedState(event.target.value);
          }}
        >
          <MenuItem value={"all"}>{"Tots els estats"}</MenuItem>
          {states.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
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
