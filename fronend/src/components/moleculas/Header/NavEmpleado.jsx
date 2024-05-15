import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import v from '../../../styles/variables';
import Perfil from '../../organismos/Perfil/Perfil'; 

function NavbarHeader({ toggleSidebar, sidebarAbierto }) {
  const [perfilVisible, setPerfilVisible] = useState(false); 

  const togglePerfil = () => {
    setPerfilVisible(!perfilVisible);
  };

  return (
    <>
      <div className={`bg ${!sidebarAbierto ? 'navbar-extendido' : ''}`} style={{ position: 'fixed'}}>
        <div className="row align-items-center" >
          <div className="col">
            <div className={`Icono ${!sidebarAbierto ? 'flecha-izquierda' : ''}`} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={v.iconoFlechaDerecha} style={{ width: "25px", height: "23px"}} />
            </div>
          </div>
          <div className="col text-center">
            <h3 className='text'>Crop Link</h3>
          </div>
          <div className="col text-end">
            <FontAwesomeIcon icon={v.iconoPerfilUsuario} style={{ color: '#EDEBDE', width: "30px", height: "30px", marginTop: '5px', marginRight: '20px'}} onClick={togglePerfil} />
          </div>
        </div>
      </div>
      <Perfil visible={perfilVisible} />   </>
  );
}

export default NavbarHeader;
