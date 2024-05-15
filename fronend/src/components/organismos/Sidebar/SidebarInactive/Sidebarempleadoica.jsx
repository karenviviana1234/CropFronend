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
          <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ padding: '6px', gap: '13px', justifyContent: 'center' }}>
          <Icon  icon={v.iconoInicio} />
          </li>
          <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ padding: '6px', gap: '13px', justifyContent: 'center' }}>
             <Icon  icon={v.iconoActividad} />
          </li>
    
      
          <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ padding: '6px', gap: '13px', justifyContent: 'center' }}>
             <Icon  icon={v.iconoSoporte} />
          </li>

          <li className={`rounded-full ml-3 mr-3 mb-3 flex items-center mb-2 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ padding: '6px', gap: '13px', justifyContent: 'center' }}>
             <Icon  icon={v.iconoMapa} />
          </li>
        </ul>
  </div>
  )
}

export default Sidebar;