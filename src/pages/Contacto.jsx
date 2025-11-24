// src/pages/Contacto.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "../context/LangContext";
import emailjs from "@emailjs/browser"; // <--- 1. Importamos la librería
import "./Contacto.css";

function Contacto() {
  const { mensajes } = useLang();
  const location = useLocation();
  const servicioInicial = location.state?.servicioInteres || "";
  const hoy = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    tipoServicio: "",
    fecha: "",
    invitados: "",
    mensaje: "",
  });

  // Estado para saber si se está enviando (para deshabilitar el botón)
  const [enviando, setEnviando] = useState(false);

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
    setEnviando(true); // Activamos estado de carga

    // 1. Guardar en LocalStorage (Para tu panel Admin)
    const mensajesGuardados =
      JSON.parse(localStorage.getItem("mensajesContacto")) || [];
    const nuevoMensaje = {
      ...formData,
      id: Date.now(),
      estado: "Pendiente",
    };
    mensajesGuardados.push(nuevoMensaje);
    localStorage.setItem("mensajesContacto", JSON.stringify(mensajesGuardados));

    const SERVICE_ID = "service_yndtucs";
    const TEMPLATE_ID = "template_0nuhh8r";
    const PUBLIC_KEY = "GEmCEg7K7i5fvKyUl";

    const templateParams = {
      nombre: formData.nombre,
      empresa: formData.empresa,
      email: formData.email,
      telefono: formData.telefono,
      tipoServicio: formData.tipoServicio,
      fecha: formData.fecha,
      invitados: formData.invitados,
      mensaje: formData.mensaje,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert(mensajes.contact.alert_success);

        setFormData({
          nombre: "",
          empresa: "",
          email: "",
          telefono: "",
          tipoServicio: "",
          fecha: "",
          invitados: "",
          mensaje: "",
        });
        setEnviando(false);
      },
      (err) => {
        console.log("FAILED...", err);
        alert(
          "Hubo un error al enviar el correo, pero tus datos quedaron guardados en el sistema."
        );
        setEnviando(false);
      }
    );
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
          <label>{mensajes.contact.label_company}</label>
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            placeholder="Ej: Tech Solutions SpA"
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

        <button type="submit" className="btn-enviar" disabled={enviando}>
          {enviando ? "Enviando..." : mensajes.contact.btn_send}
        </button>
      </form>
    </div>
  );
}

export default Contacto;
