import React, { useState, useRef } from 'react';
import v from '../../styles/variables';
import './VistasCss.css';
import HeaderEmpleado from '../organismos/Header/HeaderEmpleado';

//import './VistasCss.css'

function Dashboard() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const historiaRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarAbierto(!sidebarAbierto);
  };

  const scrollHistoria = () => {
    historiaRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`contenidos : '60px' ${sidebarAbierto ? 'contenido-extendidos' : ''}`}>
      <HeaderEmpleado toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      <div className='bg-cover bg-center' style={{ backgroundImage: `url(${v.Image1})`, height: '800px',  backgroundRepeat: 'no-repeat' }}>
        <div className='flex items-center'>
          <div className='ml-28'>
            <h3 className='text-custom-white pt-80 text-2xl'>Plataforma diseñada para agricultores</h3>
            <h1 className='text-custom-white text-6xl'>CROP LINK</h1>
            <h2 className='text-custom-white text-3xl text-justify mr-40'>
              Una plataforma innovadora y accesible que transforma la gestión de cultivos y fincas. Pensada para optimizar la productividad y la rentabilidad de los usuarios, esta herramienta es tu aliado en la toma de decisiones informadas para el éxito de tus cultivos.
            </h2>
            <button onClick={scrollHistoria} className='inline-block mt-3 w-28 h-11 bg-green text-xl text-custom-white rounded-lg cursor-pointer transition duration-500 ease-in-out hover:bg-transparent hover:border-white hover:translate-x-1 hover:font-medium hover:focus:outline-none hover:border-2'>
              Ver más
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center' style={{height:'800px'}} ref={historiaRef}>
        <h1 className='mt-28 mb-10 text-4xl text-center text-green bold'>Nuestra Historia</h1>
        <div className='flex justify-center items-center'>
          <h2 className='ml-36 mr-20 flex justify-center text-xl'>
            Crop Link surge a partir de la problemática que enfrentan muchos campesinos en sus cultivos, quienes a menudo carecen del tiempo o la disposición para estar pendientes de sus tierras. Tradicionalmente, el control de las fincas se realizaba de manera física, lo que resultaba en una organización poco eficiente y un desperdicio de papel perjudicial para el medio ambiente.
            Por lo tanto, se creó esta plataforma para que los administradores y dueños de fincas controlen sus cultivos de forma remota y en tiempo real, con un seguimiento detallado de todas las actividades en cada lote, asegurando un control efectivo de las producciones.
          </h2>
          <img src={v.image17} style={{ width: '500px', height: '400px', marginRight: '60px' }} alt="Graph" />
        </div>
        </div>
        <div className='py-10 h-auto bg-zinc-100'>
          <h1 className='text-4xl text-center'>Beneficios de utilizar CropLink</h1>
          <div className='m-32 flex justify-center h-60 items-center shadow-2xl rounded-3xl bg-custom-white'>
            <p className='text-xl text-justify mr-10 ml-20'>
              Monitoreo en Tiempo Real: Los administradores y dueños de fincas pueden estar informados en todo momento sobre el estado de sus cultivos, permitiendo una respuesta rápida a cualquier percance o necesidad.
            </p>
            <img className="w-96 h-60 rounded-xl" src={v.image16} alt="Graph" />
          </div>
          <div className='m-32 flex justify-center h-60 items-center shadow-2xl rounded-3xl bg-custom-white'>
            <img className="w-96 h-60 rounded-xl" src={v.Image7} alt="Graph" />
            <p className='text-xl text-justify mr-20 ml-20'>
              Optimización de la producción: Al tener un control efectivo y detallado de todas las producciones, los administradores pueden tomar decisiones informadas para optimizar el rendimiento y la eficiencia de sus cultivos.
            </p>
          </div>
          <div className='m-32 flex justify-center h-60 items-center shadow-2xl rounded-3xl bg-custom-white'>
            <p className='text-xl text-justify mr-20 ml-20'>
              Seguimiento detallado de actividades: Cada actividad realizada en los lotes es registrada y monitoreada, lo que permite un control preciso y detallado de las tareas asignadas a los empleados.
            </p>
            <img className="w-96 h-60 rounded-xl" src={v.Image6} alt="Graph" />
          </div>
        </div>
    </div>
  );
}

export default Dashboard;
