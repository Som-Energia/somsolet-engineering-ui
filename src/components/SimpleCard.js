import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

function SimpleCard({title, children}) {
  return (
    <Card sx={{ padding: "1rem", flex:1 }}>
        <p />
        <b style={{ fontSize: "larger" }}>{title}</b>
        <p />
        <Divider />
        <CardContent>{children}</CardContent>
      </Card>
  )
}

export default SimpleCard