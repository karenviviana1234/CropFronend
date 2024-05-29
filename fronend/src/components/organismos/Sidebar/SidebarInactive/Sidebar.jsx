import React, { useState } from 'react'
import v from '../../../../styles/variables';
import Icon from '../../../atomos/Sidebar/IconosSidebar';
import Image from '../../../atomos/Logo';
import {Tooltip} from "@nextui-org/react"

function Sidebar() {
   
   const [bgColor, setBgColor] = useState('green');
  return (
    <div className={`bg-${bgColor} text-custom-white fixed top-0 left-0`} style={{ width: '60px', height: '100vh',position: 'fixed', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none', transition: 'width 0.6s' }} >
      <div className='mt-5' style={{'justifyContent': 'center', 'display': 'flex'}}>
          <Image style={{ width: '50px', height: '50px', marginLeft: '10px'}}/>
          </div>
        <ul className="mavbar mt-5">
        <Tooltip content="Inicio">
          <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Dashboard"> <Icon  icon={v.iconoInicio} />
</a>
          </li>
          </Tooltip>

          <Tooltip content="Usuario">
          <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/usuario"> 
             <Icon  icon={v.iconoUsuarios} />
             </a>
          </li>
          </Tooltip>

          <Tooltip content="Programación">
          <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/programacion"> 
             <Icon  icon={v.iconoProgramacion} />
             </a>
          </li>
          </Tooltip>

          <Tooltip content="Actividad">
          <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/actividad"> 
             <Icon  icon={v.iconoActividad} />
             </a>
          </li>
          </Tooltip>

          <Tooltip content="Finca">
          <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/finca"> 
             <Icon  icon={v.iconoFinca} />
             </a>
          </li>
          </Tooltip>

          <Tooltip content="Lote">
          <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/lote"> 
             <Icon  icon={v.iconoLote} />
             </a>
          </li>
          </Tooltip>

          <Tooltip content="Cultivo">
          <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/cultivo"> 
             <Icon  icon={v.iconoCultivo} />
             </a>
          </li>
          </Tooltip>

          <Tooltip content="Variedad">
          <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/variedad"> 
             <Icon  icon={v.iconoVariedad} />
             </a>
          </li>
          </Tooltip>

          <Tooltip content="Producción">
           <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/produccion"> 
             <Icon  icon={v.iconoProduccion} />
             </a>
          </li> 
          </Tooltip>

          <Tooltip content="Recursos">
          <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/recursos"> 
             <Icon  icon={v.iconoTractor} /> 
             </a>
          </li>
          </Tooltip>

          <Tooltip content="Reportes">
          <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/reporte"> 
             <Icon  icon={v.iconoReporte} />
             </a>
          </li>
          </Tooltip>

          <Tooltip content="Soporte">
          <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/soporte"> 
             <Icon  icon={v.iconoSoporte} />
             </a>
          </li>
          </Tooltip>

         {/*  <Tooltip content="Inicio">
          <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/mapa"> 
             <Icon  icon={v.iconoMapa} />
             </a>
          </li>
          </Tooltip> */}
        </ul>
  </div>
  )
}

export default Sidebar;