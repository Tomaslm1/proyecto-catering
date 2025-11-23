import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [mensajes, setMensajes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogueado = localStorage.getItem("estaLogueado");

    if (isLogueado !== "true") {
      alert("Acceso denegado. Debes iniciar sesión.");
      navigate("/login");
    } else {
      const datos = JSON.parse(localStorage.getItem("mensajesContacto")) || [];
      setMensajes(datos);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("estaLogueado");
    navigate("/");
  };

  const borrarMensaje = (id) => {
    if (window.confirm("¿Estás seguro de borrar este mensaje?")) {
      const nuevosMensajes = mensajes.filter((msg) => msg.id !== id);
      setMensajes(nuevosMensajes);
      localStorage.setItem("mensajesContacto", JSON.stringify(nuevosMensajes));
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ color: "#d35400" }}>Panel de Administración</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            background: "#333",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      <h3>Mensajes Recibidos ({mensajes.length})</h3>

      {mensajes.length === 0 ? (
        <p>No hay mensajes nuevos.</p>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {mensajes.map((msg) => (
            <div
              key={msg.id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "8px",
                background: "white",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ margin: "0 0 10px 0" }}>
                  {msg.nombre}{" "}
                  <span
                    style={{
                      fontWeight: "normal",
                      color: "#777",
                      fontSize: "0.9rem",
                    }}
                  >
                    ({msg.email})
                  </span>
                </h4>
                <button
                  onClick={() => borrarMensaje(msg.id)}
                  style={{
                    background: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Borrar
                </button>
              </div>
              <p>
                <strong>Servicio:</strong> {msg.tipoServicio}
              </p>
              <p>
                <strong>Fecha:</strong> {msg.fecha} |{" "}
                <strong>Invitados:</strong> {msg.invitados}
              </p>
              <p
                style={{
                  background: "#f9f9f9",
                  padding: "10px",
                  borderRadius: "4px",
                  fontStyle: "italic",
                }}
              >
                "{msg.mensaje}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Admin;
