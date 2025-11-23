import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Contacto.css";

function Contacto() {
  const location = useLocation();

  const servicioInicial = location.state?.servicioInteres || "";

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    tipoServicio: "",
    fecha: "",
    invitados: "",
    mensaje: "",
  });

  useEffect(() => {
    if (servicioInicial) {
      setFormData((prevData) => ({
        ...prevData,
        tipoServicio: servicioInicial,
      }));
    }
  }, [servicioInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `¡Gracias ${formData.nombre}! Cotizaremos "${formData.tipoServicio}" para ti.`
    );
    console.log("Datos del formulario:", formData);
  };

  return (
    <div className="contacto-container">
      <h2>Solicita tu Cotización</h2>
      <p>Cuéntanos sobre tu evento y te contactaremos a la brevedad.</p>

      <form onSubmit={handleSubmit} className="contacto-form">
        <div className="form-group">
          <label>Servicio a Cotizar:</label>
          <input
            type="text"
            name="tipoServicio"
            value={formData.tipoServicio}
            onChange={handleChange}
            placeholder="Ej: Coffee Break, Matrimonio..."
            style={{
              backgroundColor: "#f9f9f9",
              fontWeight: "bold",
              color: "#d35400",
            }}
          />
        </div>

        <div className="form-group">
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="juan@ejemplo.com"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Fecha del Evento:</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>N° Invitados (Aprox):</label>
            <input
              type="number"
              name="invitados"
              value={formData.invitados}
              onChange={handleChange}
              placeholder="Ej: 50"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Mensaje o Detalles Adicionales:</label>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows="4"
            placeholder="Cuéntanos más detalles..."
          ></textarea>
        </div>

        <button type="submit" className="btn-enviar">
          Enviar Solicitud
        </button>
      </form>
    </div>
  );
}

export default Contacto;
