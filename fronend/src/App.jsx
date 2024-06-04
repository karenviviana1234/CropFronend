import { BrowserRouter, Route, Routes } from "react-router-dom"
import InicioF from "./components/pages/Inicio.jsx";
import { InicioSesion } from "./components/pages/InicarSesion.jsx";
import Registro from "./components/pages/Registro.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
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
// import Dashboard from "./components/pages/Dashboard.jsx";
// import PerfilUsuario from "./components/pages/PefilUsuario.jsx";

import CambiarContra from "./components/pages/cambiarcontra.jsx";
import Recuperarcontra from "./components/pages/Recuperacontra.jsx";
import { Usuarios } from "./components/pages/Usuarios.jsx";
import { Produccion } from "./components/pages/Produccion.jsx";
import Empleado from "./components/pages/Empleado.jsx";
import DashboardEmpleado from "./components/pages/DashboardEmpleado.jsx";



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


          <Route element={<ProtectedRoute />} >

            {user && user.rol === 'administrador' && (
              <>
                {/*    <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/perfil" element={<PerfilUsuario />} />
            */}
                <Route path="/usuario" element={<Usuarios />} />
                <Route path="/actividad" element={<Actividad />} />
                <Route path="/costos" element={<Costos />} />
                <Route path="/cultivos" element={<Cultivos />} />
                <Route path="/finca" element={<Fincas />} />
                <Route path="/lote" element={<Lotes />} />
                <Route path="/programacion" element={<Programaciones />} />
                <Route path="/recursos" element={<TipoRecursos />} />
                <Route path="/variedad" element={<Variedades />} />
                <Route path="/produccion" element={<Produccion />} />
              </>
            )}

            {user && user.rol === 'empleado' && (
              <>
                <Route path="/empleado" element={<Empleado />} />
                <Route path="/dashboarde" element={<DashboardEmpleado />} />
              </>
            )}

          </Route>
        </Routes>
      </GlobalProvider>
    </BrowserRouter >
  );
}

export default App;


