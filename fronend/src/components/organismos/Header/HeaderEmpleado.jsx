import React from 'react';
import SidebarOriginEmpleado from '../Sidebar/SidebarActive/SiderEmpleado';
import SidebarEmple from '../Sidebar/SidebarInactive/Sidebarempleadoica';
import Perfil from '../Perfil/Perfil';
import NavbarHeaderEmpleado from '../../moleculas/Header/NavEmpleado';
import PerfilEmpleado from '../../pages/PerfilEmpleado';

function HeaderEmpleado({ toggleSidebar, sidebarAbierto }) {
  return (
    <>
      <NavbarHeaderEmpleado toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      {sidebarAbierto ? <SidebarOriginEmpleado /> : <SidebarEmple />}
      <PerfilEmpleado/>
    </>
  );
}

export default HeaderEmpleado;
