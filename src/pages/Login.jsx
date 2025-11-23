import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const ADMIN_USER = "admin";
  const ADMIN_PASS_ENCRIPTADA = "MTIzNDU=";

  const handleLogin = (e) => {
    e.preventDefault();

    const inputCifrado = btoa(password);

    if (usuario === ADMIN_USER && inputCifrado === ADMIN_PASS_ENCRIPTADA) {
      localStorage.setItem("estaLogueado", "true");

      alert("¡Bienvenido Admin! Inicio de sesión exitoso.");

      navigate("/admin");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Acceso Administrativo</h2>
        <p>Ingresa tus credenciales para gestionar el sitio.</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="admin"
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="12345"
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="btn-login">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
