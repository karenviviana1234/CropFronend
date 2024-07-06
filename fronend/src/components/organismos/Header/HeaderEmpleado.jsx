import React from 'react';
import SidebarOriginEmpleado from '../Sidebar/SidebarActive/SiderEmpleado';
import SidebarEmple from '../Sidebar/SidebarInactive/Sidebarempleadoica';
import NavbarHeaderEmpleado from '../../moleculas/Header/NavEmpleado';

function HeaderEmpleado({ toggleSidebar, sidebarAbierto}) {
  return (
    <>
      <NavbarHeaderEmpleado toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      {sidebarAbierto ? <SidebarOriginEmpleado /> : <SidebarEmple />}
    </>
  );
}

export default HeaderEmpleado;
