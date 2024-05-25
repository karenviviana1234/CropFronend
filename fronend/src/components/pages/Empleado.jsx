import React, { useState } from 'react'
<<<<<<< HEAD
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
=======
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
>>>>>>> 6361f2617b0cfd39da1e46087890e18f27e6606e
        </div>
    </div>
  )
}

export default Empleado