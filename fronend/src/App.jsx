import { BrowserRouter, Route, Routes } from "react-router-dom"
import React from 'react'
import Inicio from "./components/pages/Inicio.jsx";
import { InicioSesion } from "./components/pages/InicarSesion.jsx";
import Registro from "./components/pages/Registro.jsx";
import { Usuario } from "./components/pages/Usuarios.jsx";
import { Produccion } from "./components/pages/Produccion.jsx";
import Recuperarcontra from "./components/pages/RecuperarContra.jsx";
import CambiarContra from "./components/pages/cambiarcontra.jsx";
import Empleado from "./components/pages/Empleado.jsx";


function App() {

  return (
    <BrowserRouter>
      {/*   <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/empleado" element={<Empleado />} />
        <Route path="/iniciosesion" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar" element={<Recuperarcontra />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/produccion" element={<Produccion />} />
        <Route path="/cambia" element={<CambiarContra />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App;
