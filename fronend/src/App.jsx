import { BrowserRouter, Route, Routes } from "react-router-dom"
import InicioF from "./components/pages/Inicio.jsx";
import { InicioSesion } from "./components/pages/InicarSesion.jsx";
import Registro from "./components/pages/Registro.jsx";
import CambiarContra from "./components/pages/cambiarcontra.jsx";
import Recuperarcontra from "./components/pages/Recuperarcontra.jsx";
import Hola from './components/pages/nn.jsx';





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
        <Route path="/nada" element={<Hola/>} />


      </Routes>

    </BrowserRouter>
  )
}

export default App;
