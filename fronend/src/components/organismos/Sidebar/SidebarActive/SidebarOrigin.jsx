import React, { useState } from 'react'
import v from '../../../../styles/variables';
import Icon from '../../../atomos/Sidebar/IconosSidebar';
import Image from '../../../atomos/Logo';


function SidebarOrigin() {
   const [bgColor, setBgColor] = useState('green');

   return (
      <div className={`bg-${bgColor} text-custom-white fixed top-0 left-0`} style={{ width: '220px', height: '100vh', position: 'fixed', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none', transition: 'width 0.6s' }}>
         <div className=' mt-5' style={{ display: 'flex', justifyContent: 'center' }}>
            <Image style={{ width: "140px", height: "140px" }} />
         </div>
         <ul className="navbar-nav mt-3">
            <li className={`p-2 text-center rounded-2xl ml-3 mr-3 flex items-center mb-1  transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoInicio} />
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Inicio">Inicio</a>
            </li>

            <li className={`p-2 rounded-2xl ml-3 mr-3 flex items-center mb-1 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoUsuarios} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Usuario">Empleados</a>
            </li>

            <li className={`p-2 rounded-2xl ml-3 mr-3 flex items-center mb-1 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoFinca} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Finca">Finca</a>
            </li>



             <li className={`p-2 rounded-2xl ml-3 mr-3 flex items-center mb-1 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoActividad} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Actividad">Actividad</a>
            </li>         

            <li className={`p-2 rounded-2xl ml-3 mr-3 flex items-center mb-1 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoProgramacion} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Asignacion">Asignación</a>
            </li>
            
            <li className={`p-2 rounded-2xl ml-3 mr-3 flex items-center mb-1 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoCostos} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Costos">Costos</a>
            </li>

            <li className={`p-2 rounded-2xl ml-3 mr-3 flex items-center mb-1 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoProduccion} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Produccion">Produccion</a>
            </li> 

            <li className={`p-2 rounded-2xl ml-3 mr-3 flex items-center mb-1 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoGrafica} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Graficas">Estadísticas</a>
            </li>
            
            <li className={`p-2 rounded-2xl ml-3 mr-3 flex items-center mb-1 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoMapa} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/mapa">Mapa</a>
            </li> 
            
            <li className={`p-2 rounded-2xl ml-3 mr-3 flex items-center mb-1 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoSoporte} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Soporte">Soporte</a>
            </li>



         </ul>
      </div>
   )
}

export default SidebarOrigin;
