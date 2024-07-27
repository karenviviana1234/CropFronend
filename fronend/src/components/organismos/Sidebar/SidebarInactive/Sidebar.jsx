import React, { useState, useEffect } from 'react';
import v from '../../../../styles/variables';
import Icon from '../../../atomos/Sidebar/IconosSidebar';
import Image from '../../../atomos/Logo';
import { Tooltip } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function Sidebar() {
  const [bgColor, setBgColor] = useState('green');
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    // Obtener el usuario del localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.rol);
    }
  }, []);

  const handleClick = (path) => {
    if (userRole === 'empleado' && path === '/Actividad') {
      navigate('/Empleado');
    } else {
      navigate(path);
    }
  };

  return (
    <div className={`bg-${bgColor} text-custom-white fixed top-0 left-0`} style={{ width: '60px', height: '100vh', position: 'fixed', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none', transition: 'width 0.6s' }} >
      <div className='mt-5' style={{ justifyContent: 'center', display: 'flex' }}>
        <Image style={{ width: '50px', height: '50px', marginLeft: '10px' }} />
      </div>

      <ul className="navbar mt-5">
        <Tooltip content="Inicio">
          <li className={`rounded-full ml-3 mr-3 flex items-center mb-3 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
            <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} onClick={() => handleClick('/Inicio')}>
              <Icon icon={v.iconoInicio} />
            </a>
          </li>
        </Tooltip>

        {userRole === 'administrador' && (
          <>
            <Tooltip content="Empleados">
              <li className={`rounded-full ml-3 mr-3 flex items-center mb-3 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
                <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} onClick={() => handleClick('/Usuario')}>
                  <Icon icon={v.iconoUsuarios} />
                </a>
              </li>
            </Tooltip>

            <Tooltip content="Finca">
              <li className={`rounded-full ml-3 mr-3 flex items-center mb-3 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
                <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} onClick={() => handleClick('/Finca')}>
                  <Icon icon={v.iconoFinca} />
                </a>
              </li>
            </Tooltip>

            <Tooltip content="Asignación">
              <li className={`rounded-full ml-3 mr-3 flex items-center mb-3 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
                <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} onClick={() => handleClick('/Asignacion')}>
                  <Icon icon={v.iconoProgramacion} />
                </a>
              </li>
            </Tooltip>

            <Tooltip content="Producción">
              <li className={`rounded-full ml-3 mr-3  flex items-center mb-3 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
                <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} onClick={() => handleClick('/Produccion')}>
                  <Icon icon={v.iconoProduccion} />
                </a>
              </li>
            </Tooltip>

            <Tooltip content="Estadísticas">
              <li className={`rounded-full ml-3 mr-3  flex items-center mb-3 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
                <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} onClick={() => handleClick('/Graficas')}>
                  <Icon icon={v.iconoGrafica} />
                </a>
              </li>
            </Tooltip>

            <Tooltip content="Mapa">
              <li className={`rounded-full ml-3 mr-3  flex items-center mb-3 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
                <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} onClick={() => handleClick('/mapa')}>
                  <Icon icon={v.iconoMapa} />
                </a>
              </li>
            </Tooltip>
          </>
        )}

        <Tooltip content="Actividad">
          <li className={`rounded-full ml-3 mr-3 flex items-center mb-3 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }} >
            <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} onClick={() => handleClick('/Actividad')}>
              <Icon icon={v.iconoActividad} />
            </a>
          </li>
        </Tooltip>

        <Tooltip content="Soporte">
          <li className={`rounded-full ml-3 mr-3  flex items-center mb-3 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
            <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} onClick={() => handleClick('/Soporte')}>
              <Icon icon={v.iconoSoporte} />
            </a>
          </li>
        </Tooltip>
      </ul>
    </div>
  );
}

export default Sidebar;
