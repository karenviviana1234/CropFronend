import { BrowserRouter, Route, Routes } from "react-router-dom"
import InicioF from "./components/pages/Inicio.jsx";
import { InicioSesion } from "./components/pages/InicarSesion.jsx";
import Registro from "./components/pages/Registro.jsx";
// import ProtectedRoute from "./ProtectedRoute.jsx";
// import NotFoundPage from "./components/pages/NotFoundPage .jsx";
import GlobalProvider from "./context/GlobalContext.jsx";

import { Actividad } from './components/pages/Actividad.jsx'
import { Costos } from './components/pages/Costos.jsx'
import { Cultivos } from "./components/pages/Cultivos.jsx";
import { Fincas } from "./components/pages/Fincass.jsx";
import { Lotes } from "./components/pages/Lotes.jsx";
import { Programaciones } from './components/pages/Programacion.jsx'
import TipoRecursos from "./components/pages/TipoRecursos.jsx";
import { Variedades } from "./components/pages/Variedades.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import PerfilUsuario from "./components/pages/Perfil.jsx";
import Soporte from "./components/pages/Soporte.jsx";
import CambiarContra from "./components/pages/cambiarcontra.jsx";
import Recuperarcontra from "./components/pages/Recuperacontra.jsx";
import { Usuarios } from "./components/pages/Usuarios.jsx";
import { Produccion } from "./components/pages/Produccion.jsx";
import Empleado from "./components/pages/Empleado.jsx";
import DashboardEmpleado from "./components/pages/DashboardEmpleado.jsx";
import  Map  from "./components/pages/Map.jsx";
import Graficas from './components/pages/Graficas.jsx'

import PerfilEmpleado from "./components/pages/PerfilEmpleado.jsx";


const stored = localStorage.getItem('user')
const user = stored ? JSON.parse(stored) : null

function App() {

  return (
    <BrowserRouter>
      <GlobalProvider>
        {/*   <Sidebar /> */}
        <Routes>

          <Route path="/" element={<InicioF />} />
          <Route path="/iniciosesion" element={<InicioSesion />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/cambia" element={<CambiarContra />} />
          <Route path="/recuperar" element={<Recuperarcontra />} />

          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="/Perfil" element={<PerfilEmpleado />} />



            {user && user.rol === 'administrador' && (
              <>
              <Route path="/Inicio" element={<Dashboard />} />
              <Route path="/perfil" element={<PerfilUsuario />} />
              <Route path="/soporte" element={<Soporte />} />
      
                <Route path="/Usuario" element={<Usuarios />} />
                <Route path="/Actividad" element={<Actividad />} />
                <Route path="/Costos" element={<Costos />} />
                <Route path="/Cultivos" element={<Cultivos />} />
                <Route path="/Finca" element={<Fincas />} />
                <Route path="/Lote" element={<Lotes />} />
                <Route path="/Asignacion" element={<Programaciones />} />
                <Route path="/Recursos" element={<TipoRecursos />} />
                <Route path="/Variedad" element={<Variedades />} />
                <Route path="/Produccion" element={<Produccion />} />

                <Route path="/Mapa" element={<Map />} />
                <Route path="/Graficas" element={<Graficas />} />
              </>
            )}

            {user && user.rol === 'empleado' && (
              <>
                <Route path="/Empleado" element={<Empleado />} />
                <Route path="/Dashboarde" element={<DashboardEmpleado />} />
              </>
            )}

          
        </Routes>
      </GlobalProvider>
    </BrowserRouter >
  );
}

export default App;


