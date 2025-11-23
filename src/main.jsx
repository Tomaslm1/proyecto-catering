import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LangProvider } from "./context/LangContext.jsx";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu /> },
      { path: "/contacto", element: <Contacto /> },
      { path: "/login", element: <Login /> },
      { path: "/admin", element: <Admin /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LangProvider>
      <RouterProvider router={router} />
    </LangProvider>
  </React.StrictMode>
);
