import React, { createContext, useState, useContext } from "react";
import es from "../lang/es.json";
import en from "../lang/en.json";

const LangContext = createContext();

export function LangProvider({ children }) {
  const [idioma, setIdioma] = useState("es");
  const [mensajes, setMensajes] = useState(es);

  const cambiarIdioma = (lenguaje) => {
    setIdioma(lenguaje);
    setMensajes(lenguaje === "es" ? es : en);
  };

  return (
    <LangContext.Provider value={{ idioma, mensajes, cambiarIdioma }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
