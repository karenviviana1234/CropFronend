import React from 'react';
import SidebarOriginEmpleado from '../Sidebar/SidebarActive/SiderEmpleado';
import SidebarEmple from '../Sidebar/SidebarInactive/Sidebarempleadoica';
import NavbarHeaderEmpleado from '../../moleculas/Header/NavEmpleado';
import NavbarHeader from '../../moleculas/Header/NavbarHeader';

function HeaderEmpleado({ toggleSidebar, sidebarAbierto}) {
  return (
    <>
      <NavbarHeader toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      {sidebarAbierto ? <SidebarOriginEmpleado /> : <SidebarEmple />}
    </>
  );
}

export default HeaderEmpleado;
