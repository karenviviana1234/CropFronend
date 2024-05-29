
import React, { useState } from 'react';
import Header from '../organismos/Header/Header';
import v from '../../styles/variables'
import './VistasCss.css'

function Dashboard() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  const toggleSidebar = () => {
    setSidebarAbierto(!sidebarAbierto);
  };

  return (
    <div className={`contenidos ${sidebarAbierto ? 'contenido-extendidos' : ''}`}>
      <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      <div className=' bg-cover bg-center' style={{ backgroundImage: `url(${v.Image1})`, height: '874px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <div className='flex items-center'>
          <div>
            <h3 className='ml-5 text-custom-white' style={{ fontSize: '24px', paddingTop: '320px' }}>Plataforma diseñada para agricultores</h3>
            <h1 className='ml-5 text-custom-white' style={{ fontSize: '70px' }}>CROP LINK</h1>
            <h2 className='mx-5 text-custom-white' style={{ fontSize: '30px' }}>Una plataforma innovadora y accesible que transforma la gestión de cultivos y fincas. Pensada para optimizar la productividad y la rentabilidad de los usuarios, esta herramienta es tu aliado en la toma de decisiones informadas para el éxito de tus cultivos.</h2>
            {/*       <button className='ml-5 px-4 py-2 mt-4 rounded text-white' style={{border: 'none', backgroundColor: 'green', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>Ver más</button>
 */}    </div>
        </div>
      </div>
      <div className='part2'>
        <div className='text2 mx-10' style={{ height: '730px', marginTop: '240px' }}>
          <h1 className='text-4xl text-center' a>Algunos de Nuestros Servicios</h1>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <div className='bg-white mx-auto p-3 ml-5 mt-4 text-center' style={{ width: '350px', height: '455px', borderRadius: '20px' }}>
              <h4 className='mt-2'>Gráficas de la Producción y la Inversión de tus Cultivos</h4>
              <img src={v.Image3} className='mx-auto mt-5' style={{ width: '140px', height: '120px', display: 'block' }} alt="Graph" />
              <p className='mt-5'>¡Ingresa los datos de tus producciones e inversiones y mira las estadísticas de tu finca!</p>
              <button className='px-3 py-1 mt-1 rounded text-white' style={{ border: 'none', backgroundColor: 'green', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Ver aquí</button>
            </div>
            <div className='bg-white mx-auto p-3 ml-5 mt-4  text-center' style={{ width: '350px', height: '450px', borderRadius: '20px' }}>
              <h4 className='mt-3'>Reportes de tus Inversiones</h4>
              <img src={v.Image4} className='mx-auto' style={{ width: '180px', height: '120px', display: 'block', marginTop: '60px', marginBottom: '60px' }} alt="Graph" />
              <p className='mt-5'>¡Analiza, observa y descarga reportes de las variedades de tu cultivo!</p>
              <button className='px-3 py-1 mt-4 rounded  text-white' style={{ border: 'none', backgroundColor: 'green', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Ver aquí</button>
            </div>
            <div className='bg-white mx-auto p-3 ml-5 mt-4  text-center' style={{ width: '350px', height: '450px', borderRadius: '20px' }}>
              <h4 className='mt-3'>Mapeo en tiempo Real de tu Finca</h4>
              <img src={v.Image2} className='mx-auto mt-20' style={{ width: '160px', height: '120px', display: 'block', marginTop: '50px', marginBottom: '50px' }} />
              <p className='mt-5'>¡Localiza tu finca desde el mapa en tiempo real!</p>
              <button className='px-3 py-1 mt-4 rounded  text-white' style={{ border: 'none', backgroundColor: 'green', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Ver aquí</button>
            </div>
          </div>
        </div>
      </div>
      {/*
<div className='part3'>
  <div className='flex items-center'>
    <div className='text3 ml-10 mt-20'>
      <h1>Nuestro Equipo</h1>
      <h2>El equipo de CropLink está conformado por 4 aprendices programadores del Servicio Nacional de Aprendizaje SENA, cada uno con habilidades diferentes que hicieron posible este proyecto</h2>
    </div>
    <img src={v.image10} className="w-64 h-64" />
  </div>
    </div> */}
    </div>
  );
}

export default Dashboard;