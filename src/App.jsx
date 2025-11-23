import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>

      <hr />

      <footer style={{ textAlign: "center", padding: "20px" }}>
        <p>&copy; 2025 Catering Services</p>
      </footer>
    </div>
  );
}

export default App;
