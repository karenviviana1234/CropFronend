import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../atomos/Navbar/IconosNavbar';
import v from '../../../styles/variables';
import Perfil from '../../organismos/Perfil/Perfil';

function NavbarHeader({ toggleSidebar, sidebarAbierto }) {
  const [perfilVisible, setPerfilVisible] = useState(false);
  const togglePerfil = () => {
    setPerfilVisible(!perfilVisible);
  };

  const location = useLocation();
  const vistaActual = location.pathname.split('/').filter(Boolean).pop() || 'Inicio'; // Obtener el último segmento de la ruta como nombre de la vista actual

  const navbarWidth = sidebarAbierto ? 'calc(100% - 60px)' : 'calc(100% - 60px)';

  return (
    <>
      <div className={` w-full top-0 fixed items-center h-12 bg-green transition-margin-left duration-600`} style={{ marginLeft: sidebarAbierto ? '' : '60px', width: navbarWidth }}>
        <div className="mt-1 flex items-center justify-between">
          <div className="w-1/7 text-left">
            <div className={`text-custom-white relative z-1 ${sidebarAbierto ? '' : 'transform rotate-180'}`} onClick={toggleSidebar}>
              <Icon icon={v.iconoFlechaDerecha} />
            </div>
          </div>
          <div className="w-1/2 text-center ml-64">
            <h3 className='text-3xl text-custom-white'>{vistaActual}</h3>
          </div>
          <div className="w-1/5 mt-2">
            <div className={`ml-40 ${sidebarAbierto ? 'ml-2' : ''}`}>
              <Icon icon={v.iconoPerfilUsuario} onClick={togglePerfil} />
            </div>
          </div>
        </div>
      </div>
      {perfilVisible && <Perfil visible={perfilVisible} />}
    </>
  );
}

export default NavbarHeader;
