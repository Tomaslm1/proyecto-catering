import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "../context/LangContext";
import "./Contacto.css";

function Contacto() {
  const { mensajes } = useLang();
  const location = useLocation();
  const servicioInicial = location.state?.servicioInteres || "";
  const hoy = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
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
    if (name === "telefono") {
      const soloNumeros = value.replace(/[^0-9]/g, "");
      setFormData({ ...formData, [name]: soloNumeros });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mensajesGuardados =
      JSON.parse(localStorage.getItem("mensajesContacto")) || [];

    const nuevoMensaje = {
      ...formData,
      id: Date.now(),
      estado: "Pendiente",
    };

    mensajesGuardados.push(nuevoMensaje);
    localStorage.setItem("mensajesContacto", JSON.stringify(mensajesGuardados));

    alert(`${mensajes.contact.alert_success} (${formData.nombre})`);

    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      tipoServicio: "",
      fecha: "",
      invitados: "",
      mensaje: "",
    });
  };

  return (
    <div className="contacto-container">
      <h2>{mensajes.contact.title}</h2>
      <p>{mensajes.contact.subtitle}</p>

      <form onSubmit={handleSubmit} className="contacto-form">
        <div className="form-group">
          <label>{mensajes.contact.label_service}</label>
          <input
            type="text"
            name="tipoServicio"
            value={formData.tipoServicio}
            onChange={handleChange}
            style={{
              backgroundColor: "#f9f9f9",
              fontWeight: "bold",
              color: "#d35400",
            }}
          />
        </div>

        <div className="form-group">
          <label>{mensajes.contact.label_name}</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>{mensajes.contact.label_phone}</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="912345678"
            required
            maxLength="15"
          />
        </div>

        <div className="form-group">
          <label>{mensajes.contact.label_email}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{mensajes.contact.label_date}</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              min={hoy}
            />
          </div>
          <div className="form-group">
            <label>{mensajes.contact.label_guests}</label>
            <input
              type="number"
              name="invitados"
              value={formData.invitados}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>{mensajes.contact.label_message}</label>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows="4"
            placeholder={mensajes.contact.placeholder_message}
          ></textarea>
        </div>

        <button type="submit" className="btn-enviar">
          {mensajes.contact.btn_send}
        </button>
      </form>
    </div>
  );
}

export default Contacto;
