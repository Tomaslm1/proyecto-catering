import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <Navbar />

      <main style={{ padding: "20px", minHeight: "80vh" }}>
        <Outlet />
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          borderTop: "1px solid #eee",
          marginTop: "20px",
          color: "#666",
          backgroundColor: "#fff",
        }}
      >
        <p style={{ margin: "5px 0" }}>
          &copy; {new Date().getFullYear()} Catering corporativo
        </p>
        <p style={{ margin: "5px 0", fontWeight: "500" }}>
          Contacto / WhatsApp: +56 9 7431 3183
        </p>
      </footer>

      <a
        href="https://www.instagram.com/catering.corpo"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-insta"
      >
        <img src="/img/instagram.png" alt="Instagram" />
      </a>
    </div>
  );
}

export default App;
