import React, { useState } from 'react'
import './Empleado.css'
import HeaderEmpleado from '../organismos/Header/HeaderEmpleado';
import v from '../../styles/variables';

function Empleado() {


    const [sidebarAbierto, setSidebarAbierto] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarAbierto(!sidebarAbierto);
    };
  return (
    <div className={`contenid ${sidebarAbierto ? 'contenido-extendid' : ''}`}>
      <HeaderEmpleado toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />  
      <div style={{ backgroundImage: `url(${v.image12})`,display:"flex", justifyContent:"center", height: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}
      >
       <div className='flex flex-col justify-center m-20 p-5 box-content w-60 h-60 p-4 bg-slate-100 rounded-xl'>
            <label className='text-lg'>Actividad: Fumigar </label>
            <label className='text-lg'>Fecha Inicio:12/09/2024</label>
            <label className='text-lg'>Fecha Fin:02/10/2024</label>
            <button className=' px-4 py-2 mt-4 rounded text-white' style={{border: 'none', backgroundColor: 'green', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>Iniciar</button>
        </div>
        <div className='flex flex-col justify-center m-20 p-5 box-content w-60 h-60 p-4 bg-slate-100 rounded-xl'>
            <label className='text-lg'>Actividad: Sembrar  </label>
            <label className='text-lg'>Fecha Inicio:10/10/2024</label>
            <label className='text-lg'>Fecha Fin:07/12/2024</label>
            <button className=' px-4 py-2 mt-4 rounded text-white' style={{border: 'none', backgroundColor: 'green', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>Iniciar</button>
        </div>
        <div className='flex flex-col justify-center m-20 p-5 box-content w-60 h-60 p-4 bg-slate-100 rounded-xl'>
            <label className='text-lg'>Actividad: Recoger  </label>
            <label className='text-lg'>Fecha Inicio:01/09/2024</label>
            <label className='text-lg'>Fecha Fin:12/09/2024</label>
            <button className=' px-4 py-2 mt-4 rounded text-white' style={{border: 'none', backgroundColor: 'green', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>Iniciar</button>
        </div>
        </div>
    </div>
  )
}

export default Empleado