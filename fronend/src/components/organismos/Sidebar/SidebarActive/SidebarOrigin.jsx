import React, { useState } from 'react'
import v from '../../../../styles/variables';
import Icon from '../../../atomos/Sidebar/IconosSidebar';
import Image from '../../../atomos/Logo';


function SidebarOrigin() {
   const [bgColor, setBgColor] = useState('green');

   return (
      <div className={`bg-${bgColor} text-custom-white fixed top-0 left-0`} style={{ width: '220px', height: '100vh', position: 'fixed', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none', transition: 'width 0.6s' }}>
         <div className=' mt-3' style={{ display: 'flex', justifyContent: 'center' }}>
            <Image style={{ width: "150px", height: "150px" }} />
         </div>
         <ul className="navbar-nav mt-3">
            <li className={`rounded-2xl ml-3 mr-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoInicio} />
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Dashboard">Inicio</a>
            </li>

            <li className={`rounded-2xl ml-3 mr-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoUsuarios} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/usuario">Usuarios</a>
            </li>
            <li className={`rounded-2xl ml-3 mr-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoProgramacion} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/programacion">Programacion</a>
            </li>
            <li className={`rounded-2xl ml-3 mr-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoActividad} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/actividad">Actividad</a>
            </li>
            <li className={`rounded-2xl ml-3 mr-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoFinca} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/finca">Finca</a>
            </li>

            <li className={`rounded-2xl ml-3 mr-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoLote} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/lote">Lote</a>
            </li>
            <li className={`rounded-2xl ml-3 mr-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoCultivo} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/cultivos">Cultivos</a>
            </li>
            <li className={`rounded-2xl ml-3 mr-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoVariedad} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/variedad">Variedad</a>
            </li>
            <li className={`rounded-2xl ml-3 mr-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoProduccion} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/produccion">Produccion</a>
            </li> 
            <li className={`rounded-2xl ml-3 mr-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoCostos} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/costos">Costos</a>
            </li>
            <li className={`rounded-2xl ml-3 mr-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoTractor} /> <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/recursos">Recursos</a>
            </li>
            <li className={`rounded-2xl ml-3 mr-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoReporte} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/reportes">Reportes</a>
            </li>
            <li className={`rounded-2xl ml-3 mr-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoSoporte} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/soporte">Soporte</a>
            </li>

            <li className={`rounded-2xl ml-3 mr-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoMapa} /><a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/mapa">Mapa</a>
            </li>


         </ul>
      </div>
   )
}

export default SidebarOrigin;
