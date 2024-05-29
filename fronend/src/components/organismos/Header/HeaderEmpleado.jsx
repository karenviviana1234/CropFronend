import React, { useState } from 'react';
import HeaderEmpleado from '../organismos/Header/HeaderEmpleado';
import v from '../../styles/variables'
import './VistasCss.css'

function DashboardEmpleado() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  const toggleSidebar = () => {
    setSidebarAbierto(!sidebarAbierto);
  };

  return (
    <div className={`contenidos ${sidebarAbierto ? 'contenido-extendidos' : ''}`}>
      <HeaderEmpleado toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      <div className=' bg-cover bg-center' style={{ backgroundImage: `url(${v.Image1})`, height: '874px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
      <div className='flex items-center'>
    <div className='text'>
      <h3 className='ml-5 text-custom-white' style={{fontSize: '24px', paddingTop: '320px'}}>Plataforma diseñada para agricultores</h3>
      <h1 className='ml-5 text-custom-white'style={{fontSize: '70px'}}>CROP LINK</h1>
      <h2 className='ml-5 text-2xl mr-5 text-custom-white' style={{fontSize: '30px'}}>Una plataforma innovadora y accesible que transforma la gestión de cultivos y fincas. Pensada para optimizar la productividad y la rentabilidad de los usuarios, esta herramienta es tu aliado en la toma de decisiones informadas para el éxito de tus cultivos.</h2>
{/*       <button className='ml-5 px-4 py-2 mt-4 rounded text-white' style={{border: 'none', backgroundColor: 'green', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>Ver más</button>
 */}    </div>
  </div>
</div>
</div>
);
}
export default DashboardEmpleado