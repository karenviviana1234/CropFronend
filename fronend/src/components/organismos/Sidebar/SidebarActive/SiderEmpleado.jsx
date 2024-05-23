import React, { useState } from 'react'
import v from '../../../../styles/variables';
import Icon from '../../../atomos/Sidebar/IconosSidebar';
import Image from '../../../atomos/Logo';

function SidebarOriginEmpleado() {
   const [bgColor, setBgColor] = useState('green');

   return (
      <div className={`bg-${bgColor} text-custom-white fixed top-0 left-0`} style={{ width: '220px', height: '100vh', position: 'fixed', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none', transition: 'width 0.6s' }}>
         <div className=' mt-3' style={{ display: 'flex', justifyContent: 'center' }}>
            <Image style={{ width: "75px", height: "60px" }} />
         </div>
         <ul className="navbar-nav mt-3">
         <li className={`rounded-2xl ml-3 mr-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoInicio} /> <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/dashboard">Dashboard</a>
            </li>

           
           
            <li className={`rounded-2xl ml-3 mr-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoActividad} /> <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/empleado">Actividad</a>
            </li>

       
       
            <li className={`rounded-2xl ml-3 mr-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ paddingRight: '20px', gap: '13px', justifyContent: 'left' }}>
               <Icon className="ml-8" icon={v.iconoSoporte} /> <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/soporte">Soporte</a>
            </li>

         </ul>
      </div>
   )
}

export default SidebarOriginEmpleado;
