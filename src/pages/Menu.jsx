import React from "react";
import { servicios } from "../data/menuData";
import "./Menu.css";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  const handleCotizar = (nombreServicio) => {
    navigate("/contacto", { state: { servicioInteres: nombreServicio } });
  };

  return (
    <div className="menu-container">
      <h2 className="menu-title">Nuestros Servicios de Catering</h2>

      <div className="menu-grid">
        {servicios.map((servicio) => (
          <div key={servicio.id} className="menu-card">
            <div className="card-image-container">
              <img
                src={servicio.imagen}
                alt={servicio.nombre}
                className="card-img"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>

            <div className="card-content">
              <div className="card-header">
                <h3 className="card-title">{servicio.nombre}</h3>
              </div>

              <p className="card-desc">{servicio.descripcion}</p>

              <div className="card-footer">
                <button
                  className="btn-cotizar"
                  style={{ width: "100%" }}
                  onClick={() => handleCotizar(servicio.nombre)}
                >
                  Cotizar Servicio
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
