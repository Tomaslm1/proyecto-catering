import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">Catering Corporativo</div>
      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/menu">Servicios</Link>
        <Link to="/contacto">Contacto</Link>
      </div>
    </nav>
  );
}

export default Navbar;
