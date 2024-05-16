import React, { useState } from 'react'
import './VistasCss.css'
import HeaderEmpleado from '../organismos/Header/HeaderEmpleado';

function Empleado() {

   
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [perfilVisible, setPerfilVisible] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarAbierto(!sidebarAbierto);
    setPerfilVisible(false);
  };
  return (
    <div className={`contenidos ${sidebarAbierto ? 'contenido-extendidos' : ''}`}>
    <HeaderEmpleado toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />   
       <div className='flex flex-col justify-center m-20 p-5 box-content w-40 h-40 p-4 border-4'>
            <label className='text-lg'>Actividad: Fumigar </label>
            <label className='text-lg'>Fecha Inicio:12/09/2024</label>
            <label className='text-lg'>Fecha Fin:02/10/2024</label>
            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 w-20 ml-20  mt-3 rounded'>Iniciar</button>
        </div>
        <div className='flex flex-col justify-center m-20 p-5 box-content w-40 h-40 p-4 border-4'>
            <label className='text-lg'>Actividad: Sembrar Cebolla </label>
            <label className='text-lg'>Fecha Inicio:12/08/2024</label>
            <label className='text-lg'>Fecha Fin:02/08/2024</label>
            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 w-20 ml-20  mt-3 rounded'>Iniciar</button>
        </div>
        <div className='flex flex-col justify-center m-20 p-5 box-content w-40 h-40 p-4 border-4'>
            <label className='text-lg'>Actividad: Recoger cosecha </label>
            <label className='text-lg'>Fecha Inicio:02/03/2024</label>
            <label className='text-lg'>Fecha Fin:11/03/2024</label>
            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 w-20 ml-20  mt-3 rounded'>Iniciar</button>
        </div>
    </div>
  )
}

export default Empleado