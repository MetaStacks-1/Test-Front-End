import React from "react";

export default function Mint({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        fontSize: "3rem",
        fontWeight: "bolder",
        padding: "10px",
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
        borderRadius: "15px",
      }}
    >
      mint
    </button>
  );
}
