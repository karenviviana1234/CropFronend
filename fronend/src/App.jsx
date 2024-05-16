import { BrowserRouter, Route, Routes } from "react-router-dom"
import InicioF from "./components/pages/Inicio.jsx";
import { InicioSesion } from "./components/pages/InicarSesion.jsx";
import Registro from "./components/pages/Registro.jsx";
import CambiarContra from "./components/pages/cambiarcontra.jsx";
import Recuperarcontra from "./components/pages/Recuperarcontra.jsx";
import { Usuario } from "./components/pages/Usuarios.jsx";
import { Produccion } from "./components/pages/Produccion.jsx";
import Empleado from "./components/pages/Empleado.jsx";



function App() {

  return (
    <BrowserRouter>
      {/*   <Sidebar /> */}
      <Routes>
        <Route path="/" element={<InicioF />} />
        <Route path="/iniciosesion" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar" element={<Recuperarcontra />} />
        <Route path="/cambia" element={<CambiarContra />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/produccion" element={<Produccion />} />
        <Route path="/empleado" element={<Empleado />} />


      </Routes>

    </BrowserRouter>
  )
}

export default App;