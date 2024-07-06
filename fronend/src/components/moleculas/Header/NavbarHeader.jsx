import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../atomos/Navbar/IconosNavbar';
import v from '../../../styles/variables';

function NavbarHeader({ toggleSidebar, sidebarAbierto }) {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const vistaActual = location.pathname.split('/').filter(Boolean).pop() || 'Inicio';
  const navbarWidth = sidebarAbierto ? 'calc(100% - 220px)' : 'calc(100% - 60px)';

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    };

    setUser(getUserFromLocalStorage());

    const handleStorageChange = () => {
      setUser(getUserFromLocalStorage());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const perfilRoute = user?.rol === 'administrador' ? '/perfil' : '/perfilEmpleado';

  return (
    <>
      <div className={`w-full top-0 fixed items-center h-12 bg-green transition-margin-left duration-600`} style={{ marginLeft: sidebarAbierto ? '' : '', width: navbarWidth, zIndex: 100 }}>
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
              <Link to={perfilRoute} className="flex items-center">
                <Icon icon={v.iconoPerfilUsuario} />
                <div>
                  <h2 className="text-custom-white ml-3 font-bold">{user?.nombre}</h2>
                  <h2 className="text-custom-white ml-3">{user?.rol}</h2>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarHeader;
