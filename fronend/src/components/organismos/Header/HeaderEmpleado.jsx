import React from 'react';
import NavbarHeader from '../../moleculas/Header/NavbarHeader';
import SidebarEmpleado from '../Sidebar/SidebarActive/SiderEmpleado';
import Perfil from '../Perfil/Perfil';


function HeaderEmpleado({ toggleSidebar, sidebarAbierto }) {
  return (
    <>
      <NavbarHeader toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      {sidebarAbierto ? <SidebarEmpleado /> : <SidebarEmpleado />}
      <Perfil/>
    </>
  );
}

export default HeaderEmpleado;
