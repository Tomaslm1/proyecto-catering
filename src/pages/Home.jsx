import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";
import "./Home.css";

function Home() {
  const { mensajes } = useLang();
  const scrollRef = useRef(null);

  const fotosEventos = [
    "/img/coffee1.jpg",
    "/img/almuerzo.jpeg",
    "/img/coffee2.jpg",
    "/img/coffee3.jpg",
    "/img/fruta.jpg",
    "/img/pizza.jpg",
    "/img/evento.jpg",
    "/img/regalos-corporativos.jpg",
  ];

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      if (direction === "left") {
        current.scrollLeft -= 320;
      } else {
        current.scrollLeft += 320;
      }
    }
  };

  return (
    <div className="home-container">
      <div className="top-container">
        <section className="hero-section">
          <div className="hero-content">
            <img
              src="/img/logo-blanco.png"
              alt="Logo Catering Corporativo"
              className="hero-logo"
            />
            <h1>{mensajes.home.title}</h1>
            <p>{mensajes.home.subtitle}</p>
            <Link to="/menu" className="btn-cta">
              {mensajes.home.cta}
            </Link>
          </div>
        </section>
      </div>

      <section className="gallery-section">
        <h2>{mensajes.home.gallery_title}</h2>

        <div className="carousel-wrapper">
          <button className="nav-btn left" onClick={() => scroll("left")}>
            &#8249;
          </button>

          <div className="carousel-track" ref={scrollRef}>
            {fotosEventos.map((foto, index) => (
              <div key={index} className="carousel-card">
                <img src={foto} alt={`Evento ${index + 1}`} />
              </div>
            ))}
          </div>

          <button className="nav-btn right" onClick={() => scroll("right")}>
            &#8250;
          </button>
        </div>
      </section>

      <section className="founder-section">
        <div className="founder-content">
          <div className="founder-image">
            <img src="/img/fundadora.jpg" alt="Fundadora Catering" />
          </div>
          <div className="founder-text">
            <h2>{mensajes.home.founder_title}</h2>
            <h3>{mensajes.home.founder_name}</h3>
            <span className="founder-role">{mensajes.home.founder_role}</span>
            <p>{mensajes.home.founder_desc}</p>
          </div>
        </div>
      </section>

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
