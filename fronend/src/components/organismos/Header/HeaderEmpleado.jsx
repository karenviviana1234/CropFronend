import React from 'react';
import NavbarHeader from '../../moleculas/Header/NavbarHeader';
import SidebarOriginEmpleado from '../Sidebar/SidebarActive/SiderEmpleado';
import SidebarEmple from '../Sidebar/SidebarInactive/Sidebarempleadoica';
import Perfil from '../Perfil/Perfil';

function Header({ toggleSidebar, sidebarAbierto }) {
  return (
    <>
      <NavbarHeader toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      {sidebarAbierto ? <SidebarOriginEmpleado /> : <SidebarEmple />}
      <Perfil/>
    </>
  );
}

export default Header;
