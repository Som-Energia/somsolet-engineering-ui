
import React from 'react'

function InfoField({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
    <div style={{ fontWeight: 500, fontSize: "0.9rem", color: "black" }}>{label}</div>
    <div>
      {value}
    </div>
  </div>
  )
}

export default InfoField