import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx"; // <--- 1. IMPORTAMOS LA LIBRERÍA

function Admin() {
  const [mensajes, setMensajes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogueado = localStorage.getItem("estaLogueado");
    if (isLogueado !== "true") {
      alert("Acceso denegado.");
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
    if (window.confirm("¿Borrar mensaje?")) {
      const nuevosMensajes = mensajes.filter((msg) => msg.id !== id);
      setMensajes(nuevosMensajes);
      localStorage.setItem("mensajesContacto", JSON.stringify(nuevosMensajes));
    }
  };

  const toggleEstado = (id) => {
    const nuevosMensajes = mensajes.map((msg) => {
      if (msg.id === id) {
        const nuevoEstado =
          msg.estado === "Atendido" ? "Pendiente" : "Atendido";
        return { ...msg, estado: nuevoEstado };
      }
      return msg;
    });
    setMensajes(nuevosMensajes);
    localStorage.setItem("mensajesContacto", JSON.stringify(nuevosMensajes));
  };

  // --- NUEVA FUNCIÓN: EXPORTAR A .XLSX ---
  const descargarExcel = () => {
    if (mensajes.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    // 1. Preparamos los datos para que se vean bonitos en Excel
    const datosExcel = mensajes.map((msg) => ({
      ID: msg.id,
      Fecha: msg.fecha,
      Estado: msg.estado || "Pendiente",
      Cliente: msg.nombre,
      Empresa: msg.empresa || "N/A",
      Email: msg.email,
      Teléfono: msg.telefono,
      Servicio: msg.tipoServicio,
      Invitados: msg.invitados,
      Mensaje: msg.mensaje,
    }));

    // 2. Creamos una "Hoja de Cálculo" (Worksheet)
    const hoja = XLSX.utils.json_to_sheet(datosExcel);

    // 3. Ajustamos el ancho de las columnas automáticamente (Opcional, para que se vea pro)
    const anchoColumnas = [
      { wch: 15 }, // ID
      { wch: 12 }, // Fecha
      { wch: 10 }, // Estado
      { wch: 20 }, // Cliente
      { wch: 20 }, // Empresa
      { wch: 25 }, // Email
      { wch: 15 }, // Teléfono
      { wch: 20 }, // Servicio
      { wch: 10 }, // Invitados
      { wch: 50 }, // Mensaje (más ancho)
    ];
    hoja["!cols"] = anchoColumnas;

    // 4. Creamos el "Libro" (Workbook) y le agregamos la hoja
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Cotizaciones");

    // 5. Descargamos el archivo .xlsx
    XLSX.writeFile(libro, "Reporte_Catering.xlsx");
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

        <div style={{ display: "flex", gap: "10px" }}>
          {/* Botón actualizado */}
          <button
            onClick={descargarExcel}
            style={{
              padding: "10px 20px",
              background: "#217346",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            Descargar Excel
          </button>

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
      </div>

      <h3>Bandeja de Entrada ({mensajes.length})</h3>

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
                borderLeft:
                  msg.estado === "Atendido"
                    ? "5px solid #27ae60"
                    : "5px solid #e74c3c",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <h4 style={{ margin: "0 0 5px 0" }}>{msg.nombre}</h4>
                  <div style={{ color: "#555", fontSize: "0.9rem" }}>
                    🏢{" "}
                    <strong>{msg.empresa || "Empresa no especificada"}</strong>{" "}
                    <br />
                    📧 {msg.email} <br />
                    📞 {msg.telefono || "Sin teléfono"}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      padding: "5px 12px",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      backgroundColor:
                        msg.estado === "Atendido" ? "#d4efdf" : "#fadbd8",
                      color: msg.estado === "Atendido" ? "#145a32" : "#943126",
                      display: "inline-block",
                      marginBottom: "10px",
                    }}
                  >
                    {msg.estado || "Pendiente"}
                  </span>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      onClick={() => toggleEstado(msg.id)}
                      style={{
                        background:
                          msg.estado === "Atendido" ? "#95a5a6" : "#27ae60",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      {msg.estado === "Atendido"
                        ? "Marcar Pendiente"
                        : "Marcar Atendido"}
                    </button>

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
                </div>
              </div>

              <hr
                style={{
                  border: "0",
                  borderTop: "1px solid #eee",
                  margin: "15px 0",
                }}
              />

              <p>
                <strong>Servicio:</strong> {msg.tipoServicio}
              </p>
              <p>
                <strong>Fecha:</strong> {msg.fecha} |
                <strong style={{ color: "#d35400", marginLeft: "5px" }}>
                  Invitados: {msg.invitados}
                </strong>
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
