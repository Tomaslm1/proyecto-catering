import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";
import "./Navbar.css";

function Navbar() {
  const { mensajes, cambiarIdioma, idioma } = useLang();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-logo">Catering Corporativo</div>

        <div className="nav-links">
          <Link to="/">{mensajes.navbar.home}</Link>
          <Link to="/menu">{mensajes.navbar.services}</Link>
          <Link to="/contacto">{mensajes.navbar.contact}</Link>

          <button
            onClick={() => cambiarIdioma(idioma === "es" ? "en" : "es")}
            style={{
              marginLeft: "20px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "5px",
              display: "flex",
              alignItems: "center",
            }}
            title="Cambiar idioma / Change language"
          >
            <img
              src={
                idioma === "es"
                  ? "https://flagcdn.com/w40/us.png"
                  : "https://flagcdn.com/w40/es.png"
              }
              alt="Flag"
              style={{
                width: "30px",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
