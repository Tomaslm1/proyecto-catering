import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
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
        <p>&copy; {new Date().getFullYear()} Catering corporativo</p>
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
