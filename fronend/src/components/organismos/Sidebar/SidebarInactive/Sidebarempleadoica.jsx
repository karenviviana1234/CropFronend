import React, { useState } from 'react'
import v from '../../../../styles/variables';
import Icon from '../../../atomos/Sidebar/IconosSidebar';
import Image from '../../../atomos/Logo';

function Sidebar() {
   
   const [bgColor, setBgColor] = useState('green');
  return (
    <div className={`bg-${bgColor} text-custom-white fixed top-0 left-0`} style={{ width: '60px', height: '100vh',position: 'fixed', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none', transition: 'width 0.6s' }} >
      <div className='mt-5' style={{'justifyContent': 'center', 'display': 'flex'}}>
          <Image style={{ width: '37px', height: '30px', marginLeft: '10px'}}/>
          </div>
        <ul className="mavbar mt-5">
        <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/dashboarde"> 
             <Icon  icon={v.iconoInicio} /> 
             </a>
             </li>
             <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/empleado"> 
             <Icon  icon={v.iconoActividad} /> 
             </a>
             </li>
      
             <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
               <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/soporte"> 
             <Icon  icon={v.iconoSoporte} /> 
             </a>
             </li>
        </ul>
  </div>
  )
}

export default Sidebar;