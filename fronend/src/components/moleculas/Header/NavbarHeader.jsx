import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importar Link y useLocation desde react-router-dom
import Icon from '../../atomos/Navbar/IconosNavbar';
import v from '../../../styles/variables';
import Perfil from '../../pages/Perfil';

function NavbarHeader({ toggleSidebar, sidebarAbierto }) {
  const [perfilVisible, setPerfilVisible] = useState(false);

  const location = useLocation();
  const vistaActual = location.pathname.split('/').filter(Boolean).pop() || 'Inicio'; // Obtener el último segmento de la ruta como nombre de la vista actual

  const navbarWidth = sidebarAbierto ? 'calc(100% - 220px)' : 'calc(100% - 60px)'; // Ajustar el ancho del navbar según el estado del sidebar

  const stored = localStorage.getItem('user');
  const user = stored ? JSON.parse(stored) : null;

  return (
    <>
      <div className={`w-full top-0 fixed items-center h-12 bg-green transition-margin-left duration-600`} style={{ marginLeft: sidebarAbierto ? '' : '60px', width: navbarWidth }}>
        <div className="mt-1 flex items-center justify-between">
          <div className="w-1/7 text-left">
            <div className={`text-custom-white relative z-1 ${sidebarAbierto ? '' : 'transform rotate-180'}`} onClick={toggleSidebar}>
              <Icon icon={v.iconoFlechaDerecha} />
            </div>
          </div>
          <div className="text-center">
            <h3 className='text-3xl ml-40 text-custom-white'>{vistaActual}</h3>
          </div>
          <div className="w-1/5 ">
            <div className='items-center flex content-center'>
              {/* Utiliza Link para redirigir a la nueva vista al hacer clic en el icono de perfil */}
              <Link to="/perfil" className="flex items-center">
                <Icon icon={v.iconoPerfilUsuario} />
                <div>
                  <h2 className="text-custom-white ml-3 font-bold">{user.nombre}</h2>
                  <h2 className="text-custom-white ml-3">{user.rol}</h2>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Elimina el componente Perfil y maneja la navegación en tu componente principal */}
    </>
  );
}

export default NavbarHeader;
