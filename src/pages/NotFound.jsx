import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px 20px",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "6rem", margin: 0, color: "#d35400" }}>404</h1>
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>
        Página no encontrada
      </h2>
      <p style={{ color: "#666", marginBottom: "30px", fontSize: "1.2rem" }}>
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>

      <Link
        to="/"
        style={{
          backgroundColor: "#d35400",
          color: "white",
          padding: "12px 30px",
          borderRadius: "50px",
          textDecoration: "none",
          fontWeight: "bold",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        Volver al Inicio
      </Link>
    </div>
  );
}

export default NotFound;
