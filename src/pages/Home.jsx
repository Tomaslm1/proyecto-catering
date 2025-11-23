import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";
import "./Home.css";

function Home() {
  const { mensajes } = useLang();
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
      <div className="top-container">
        <section className="hero-section">
          <div className="hero-content">
            <h1>{mensajes.home.title}</h1>
            <p>{mensajes.home.subtitle}</p>
            <Link to="/menu" className="btn-cta">
              {mensajes.home.cta}
            </Link>
          </div>
        </section>

        <section className="weather-widget">
          <div>
            {" "}
            <h3>☁️ {mensajes.home.weather_title}</h3>
            <p style={{ fontSize: "0.9rem", color: "#777" }}>
              {mensajes.home.weather_sub}
            </p>
            {clima ? (
              <div className="weather-info">
                <span className="temp">{clima.temperature}°C</span>
                <div className="details">
                  <span className="condition">
                    Viento: {clima.windspeed} km/h
                  </span>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </section>
      </div>

      <section className="features-section">
        <div className="feature-item">
          <h4>{mensajes.home.feature1_title}</h4>
          <p>{mensajes.home.feature1_desc}</p>
        </div>
        <div className="feature-item">
          <h4>{mensajes.home.feature2_title}</h4>
          <p>{mensajes.home.feature2_desc}</p>
        </div>
        <div className="feature-item">
          <h4>{mensajes.home.feature3_title}</h4>
          <p>{mensajes.home.feature3_desc}</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
