import React, { useState } from 'react';
import Icon from '../../atomos/Navbar/IconosNavbar';
import v from '../../../styles/variables';
import Perfil from '../../organismos/Perfil/Perfil';

function NavbarHeader({ toggleSidebar, sidebarAbierto }) {
  const [perfilVisible, setPerfilVisible] = useState(false);
  const togglePerfil = () => {
    setPerfilVisible(!perfilVisible);
  };

  const navbarWidth = sidebarAbierto ? 'calc(100% - 60px)' : 'calc(100% - 60px)';

  return (
    <>
      <div className={`z-1 w-full top-0 fixed items-center h-12 bg-green transition-margin-left duration-600`} style={{ marginLeft: sidebarAbierto ? '220px' : '60px', width: navbarWidth }}>
        <div className="mt-1 flex items-center justify-between">
          <div className="w-1/7 text-left">
            <div className={`text-custom-white relative z-1 ${sidebarAbierto ? '' : 'transform rotate-180'}`} onClick={toggleSidebar}>
              <Icon icon={v.iconoFlechaDerecha} />
            </div>
          </div>
          <div className="w-1/2 text-center ml-40">
            <h3 className='text-2xl text-custom-white'>Crop Link</h3>
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
