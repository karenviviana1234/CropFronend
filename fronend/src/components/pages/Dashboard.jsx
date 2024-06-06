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
      <div className=' bg-cover bg-center pl-20' style={{ backgroundImage: `url(${v.Image1})`, height: '874px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <div className='flex items-center'>
          <div>
            <h3 className=' text-custom-white' style={{ fontSize: '24px', paddingTop: '320px' }}>Plataforma diseñada para agricultores</h3>
            <h1 className=' text-custom-white' style={{ fontSize: '70px' }}>CROP LINK</h1>
            <h2 className=' text-custom-white' style={{ fontSize: '30px' }}>Una plataforma innovadora y accesible que transforma la gestión de cultivos y fincas. Pensada para optimizar la productividad y la rentabilidad de los usuarios, esta herramienta es tu aliado en la toma de decisiones informadas para el éxito de tus cultivos.</h2>
             <button className='ml-2 px-4 py-2 mt-4 rounded text-white border-none bg-green shadow-xl hover:bg-success-700' >Ver más</button>
  </div>
        </div>
      </div>
      <div className='part2'>
      <h1 className='mt-20 text-4xl text-center' a>Nuestra Historia</h1>
        <div className='text2' style={{ height: '730px', marginTop: '40px', display: 'flex',  justifyContent: 'center' }}>
            <h2 className='ml-36 mr-20 mt-32' style={{fontSize: '20px', borderRadius: '30px', justifyContent: 'center', display: 'flex'}}>Crop Link surge de las necesidades de los caficultores de tener un control preciso sobre sus fincas y las actividades que en ellas se llevan a cabo. En muchas ocasiones, los propietarios o administradores de las fincas no pueden estar al tanto de todas las operaciones en sus cultivos, lo que puede resultar en malentendidos y problemas en la producción. Por ello, se ha creado esta plataforma con el fin de agilizar el proceso de asignación de actividades por parte de los administradores, y para generar informes claros y precisos sobre las producciones e inversiones de los diversos cultivos.</h2>
            <img src={v.image17} style={{width: "400px", height: "450px", marginRight: "70px"}}alt="Graph"/>
            <div>
            </div>
        </div>
      </div>
     {/*  <div className='mb-50'>
      <h1 style={{fontSize: '30px', justifyContent: 'center', display: 'flex'}}>Beneficios de CropLink</h1>
        <h2 className='m-20'>1.Mayor Acceso a Mercados: Permite a los agricultores acceder a una red más amplia de compradores potenciales, tanto a nivel local como internacional, lo que puede aumentar sus oportunidades de venta y mejorar sus ingresos.</h2>
        <h2 className='m-20'>2.Transparencia y Confianza: Proporciona un entorno transparente donde los agricultores pueden mostrar la calidad de sus productos, sus métodos de cultivo y otros detalles relevantes, lo que genera confianza entre los compradores.</h2>
        <h2 className='m-20'>3.Optimización de Precios: Al tener acceso a información sobre la demanda y los precios del mercado, los agricultores pueden tomar decisiones más informadas sobre cuándo y a qué precio vender sus productos, maximizando sus ganancias.</h2>
        <h2 className='m-20'>4. Reducción de Desperdicios: Al facilitar la conexión directa entre productores y compradores, CropLink puede ayudar a reducir los desperdicios al minimizar los excedentes no vendidos y al garantizar que los productos se vendan antes de que se deterioren.</h2>
        <h2 className='m-20'>5. Eficiencia en la Logística: Al permitir la planificación anticipada de la producción y la venta, CropLink puede mejorar la eficiencia en la logística, reduciendo costos y tiempos de transporte.</h2>
        <h2 className='m-20'>6. Apoyo a la Agricultura Sostenible: Al conectar a compradores con agricultores que practican métodos sostenibles, CropLink puede promover prácticas agrícolas más respetuosas con el medio ambiente.</h2>
      </div> */}
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