import { BrowserRouter, Route, Routes } from "react-router-dom"
import { InicioSesion } from "./components/pages/InicarSesion.jsx";
import Registro from "./components/pages/Registro.jsx";
import GlobalProvider from "./context/GlobalContext.jsx";

import { Actividad } from './components/pages/Actividad.jsx'
 import { Cultivos } from "./components/pages/Cultivos.jsx";
import { Fincas } from "./components/pages/Fincass.jsx";
import { Lotes } from "./components/pages/Lotes.jsx";
import { Programaciones } from './components/pages/Programacion.jsx'
import TipoRecursos from "./components/pages/TipoRecursos.jsx";
import { Variedades } from "./components/pages/Variedades.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import PerfilUsuario from "./components/pages/Perfil.jsx";
import Soporte from "./components/pages/Soporte.jsx";
import { Usuarios } from "./components/pages/Usuarios.jsx";
import { Produccion } from "./components/pages/Produccion.jsx";
import Empleado from "./components/pages/Empleado.jsx";
import Map from "./components/pages/Map.jsx";
import Graficas from './components/pages/Graficas.jsx'
import FondoInicio from "./components/organismos/FondoInicio.jsx";
import ResetPassword from "./components/pages/Recuperarcontra.jsx";
import RecuperarPasswordUserLogin from "./components/moleculas/RecuperarPassword.jsx";


const stored = localStorage.getItem('user')
const user = stored && stored !== 'undefined' ? JSON.parse(stored) : null;

function App() {

  return (
    <BrowserRouter>
      <GlobalProvider>
        {/*   <Sidebar /> */}
        <Routes>

          <Route path="/" element={<FondoInicio />} />
          <Route path="/iniciosesion" element={<InicioSesion />} />
          <Route path="/registro" element={<Registro />} />
          

          <Route path="/perfil" element={<PerfilUsuario/>} />
          <Route path="/Perfil" element={<PerfilUsuario />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/update-password" element={<RecuperarPasswordUserLogin />} />
          <Route path="/Inicio" element={<Dashboard />} />
          <Route path="/Empleado" element={<Empleado />} />




 
 
              <Route path="/Inicio" element={<Dashboard />} />
              <Route path="/perfil" element={<PerfilUsuario />} />
              <Route path="/soporte" element={<Soporte />} />
              <Route path="/Usuario" element={<Usuarios />} />
              <Route path="/Actividad" element={<Actividad />} />
             <Route path="/Cultivos" element={<Cultivos />} />
              <Route path="/Finca" element={<Fincas />} />
              <Route path="/Lote" element={<Lotes />} />
              <Route path="/Asignacion" element={<Programaciones />} />
              <Route path="/Recursos" element={<TipoRecursos />} />
              <Route path="/Variedad" element={<Variedades />} />
              <Route path="/Produccion" element={<Produccion />} />
              <Route path="/Mapa" element={<Map />} />
              <Route path="/Graficas" element={<Graficas />} />


              <Route path="/Empleado" element={<Empleado />} />
+



        </Routes>
      </GlobalProvider>
    </BrowserRouter >
  );
}

export default App;