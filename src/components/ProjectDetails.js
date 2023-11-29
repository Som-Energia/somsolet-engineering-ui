import React from "react";
import dataproject from "../assets/mockData/mockProject";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import InfoField from "./InfoField";
import SimpleCard from "./SimpleCard";

const getSupplyPointInfo = () => {
  const supplyPoint = dataproject[0].description.supplyPoint;

  let result = {
    CUPS: supplyPoint.cups,
    Direccio: supplyPoint.address.street,
    Poblacio: supplyPoint.address.municipality,
    Potencia_contractada: "kwh",
    Tariff: supplyPoint.tariff,
  };

  return Object.entries(result).map(([label, value]) => (
    <InfoField key={label} label={label} value={value} />
  ));
};

const getRegisteredPerson = () => {
  const registeredPersonInfo = dataproject[0].description.registeredPerson;

  let result = {
      Nom: registeredPersonInfo.name,
      Email: registeredPersonInfo.email,
      Telèfon: registeredPersonInfo.phoneNumber,
      Idioma: registeredPersonInfo.language,
    }
    
  return Object.entries(result).map(([label, value]) => (
    <InfoField key={label} label={label} value={value} />
  ));
};

function ProjectDetails(props) {
  // const {project } = props

  return (
    <Grid  container style={{display:'flex', gap:"2rem"}}>
      <SimpleCard title={"Punt de Subministrament"} >
        {getSupplyPointInfo()}
      </SimpleCard>
      <SimpleCard title={"Persona Inscrita"} >
        {getRegisteredPerson()}
      </SimpleCard>
    </Grid>
  );
}

export default ProjectDetails;
