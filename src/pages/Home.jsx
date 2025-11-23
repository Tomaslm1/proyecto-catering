import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [clima, setClima] = useState(null);

  useEffect(() => {
    const lat = -33.4489;
    const lon = -70.6693;

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    )
      .then((response) => response.json())
      .then((data) => {
        setClima(data.current_weather);
      })
      .catch((error) => console.error("Error cargando el clima:", error));
  }, []);

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Catering Corporativo de Excelencia</h1>
          <p>
            Transformamos tus reuniones y eventos en experiencias gastronómicas
            inolvidables.
          </p>
          <Link to="/menu" className="btn-cta">
            Ver Nuestros Servicios
          </Link>
        </div>
      </section>

      <section className="weather-widget">
        <h3>☁️ Planifica tu evento</h3>
        <p style={{ fontSize: "0.9rem", color: "#777" }}>
          Clima actual en Santiago
        </p>

        {clima ? (
          <div className="weather-info">
            <span className="temp">{clima.temperature}°C</span>
            <div className="details">
              <span className="condition">Viento: {clima.windspeed} km/h</span>
            </div>
          </div>
        ) : (
          <p>Cargando pronóstico...</p>
        )}
      </section>

      <section className="features-section">
        <div className="feature-item">
          <h4>Productos Frescos</h4>
          <p>
            Utilizamos ingredientes seleccionados del día para garantizar el
            mejor sabor.
          </p>
        </div>
        <div className="feature-item">
          <h4>Puntualidad</h4>
          <p>
            Tu evento comenzará exactamente a la hora acordada, sin retrasos.
          </p>
        </div>
        <div className="feature-item">
          <h4>Atención Personalizada</h4>
          <p>
            Nos adaptamos a las necesidades dietéticas y temáticas de tu
            empresa.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
