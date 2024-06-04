import React, { useState } from "react";
import Header from "../organismos/Header/Header";
import "./VistasCss.css";
import v from "../../styles/variables.jsx";
import Icon from "../atomos/Sidebar/IconosSidebar.jsx";

function Soporte() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  const toggleSidebar = () => {
    setSidebarAbierto(!sidebarAbierto);
  };

  return (
    <div
      className={`contenidos ${sidebarAbierto ? "contenido-extendidos" : ""}`}
    >
      <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      <div className='bg-cover bg-center mt-16 mb-16' style={{ backgroundImage: `url(${v.Image13})`, height: '480px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
    <div className=" overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none'">
      <h3 className=' text-custom-white text-center' style={{fontSize: '24px', paddingTop: '150px'}}>Estamos para ayudarte</h3>
      <h1 className='text-center text-custom-white' style={{fontSize: '70px'}}>Bienvenidos a Soporte de CropLink</h1>
    </div>
  </div>
  <div className="pb-16 text-center">
    <h1 className="text-center mb-10" style={{fontSize: '35px', fontWeight:'bold'}}>Servicios</h1>
<div className="flex justify-center">
    <div className="cursor-pointer w-36 mx-10 rounded-2xl py-2 hover:shadow-2xl hover:text-green" >
    <Icon icon={v.iconoAgregarUsuario} className="mx-5 w-12 h-14 text-center" />
    <h1  className="text-center" style={{ fontSize: '18px' }}>Registro de</h1>
    <h1   className="text-center" style={{ fontSize: '18px' }}>Empleados</h1>
    </div>

    <div className="cursor-pointer w-36 mx-10 rounded-2xl py-2 hover:shadow-2xl hover:text-green" >
    <Icon icon={v.iconoGrafica} className="mx-5 w-12 h-14 text-center" />
    <h1  className="text-center" style={{ fontSize: '18px' }}>Graficas en</h1>
    <h1  className="text-center" style={{ fontSize: '18px' }}>Tiempo Real</h1>
    </div>
    
    <div className="cursor-pointer w-36 mx-10 rounded-2xl py-2 hover:shadow-2xl hover:text-green" >
    <Icon icon={v.iconoPDF} className="mx-5 w-12 h-14 text-center" />
    <h1 className="text-center" style={{ fontSize: '18px' }}>Descarga</h1>
    <h1 className="text-center" style={{ fontSize: '18px' }}>Reportes</h1>
    </div>    
</div>
<div className="flex justify-center">
    <div className="bg-custom-white mt-10 items-center flex justify-center cursor-pointer shadow-2xl w-80 h-28 mx-20 rounded-2xl py-2 hover:shadow-2xl" >
    <Icon icon={v.iconoCandado} className="mx-3 w-9 h-9 text-center text-green" />
    <h1 className="text-center" style={{ fontSize: '18px' }}>Recuperacion de <br /> Contraseña</h1>
    </div>
    <div className="bg-custom-white mt-10 items-center flex justify-center cursor-pointer shadow-2xl w-80 h-28 mx-20 rounded-2xl py-2 hover:shadow-2xl " >
    <Icon icon={v.iconoDocumento} className="mx-3 w-9 h-9 text-center text-green" />
    <h1 className="text-center" style={{ fontSize: '18px' }}>Documentacion<br /> de CropLink</h1>
    </div>
    <div className="bg-custom-white mt-10 items-center flex justify-center cursor-pointer shadow-2xl w-80 h-28 mx-20 rounded-2xl py-2 hover:shadow-2xl " >
    <Icon icon={v.iconoPregunta} className="mx-3 w-9 h-9 text-center text-green" />
    <h1 className="text-center" style={{ fontSize: '18px' }}>Preguntas<br />Frecuentes</h1>
    </div>
    </div>
    <div>
      <h1 className="text-center mt-16 mb-5" style={{ fontSize: '30px', fontWeight: 'bold' }}>Sobre Nosotros</h1>
      <div className="flex justify-start items-center">
    <div className="rounded-xl" style={{height: '400px', width: '400px'}}>
    <img
                src={v.Image16}
                className="mx-20 my-5"
                style={{width: "300px", height: "300px"}}
                alt="Graph"

              />
              <h1 className="" style={{fontSize: '20px', fontWeight: 'bold'}}>Sharit Daniela Vargas Almario</h1>
              <span></span>


              
</div>

    </div>
    </div>
  </div>
      
{/* 
      </div>
      <div className="w-auto h-auto bg-custom-white mb-9">
        <section className="ml-12">
          <div className="newsletter-content">
            <div className="d-flex align-items-center">
              <img
                src={v.imageLogoV}
                style={{ width: "80px", height: "80px" }}
                alt="Graph"
              />
              <div>
                <h2
                  className="text-2xl text-black"
                  style={{ fontSize: "30px" }}
                >
                  Crop Link
                </h2>
                <p className="m-0">Plataforma diseñada para Agricultores</p>
              </div>
            </div>
          </div>
        </section> */}
        {/* Footer */}
{/*         <section className="flex flex-wrap justify-around gap-4 mb-3">
  <div className="flex flex-col items-start">
    <h3 className="font-bold text-lg">Servicios</h3>
    <button href="#" className="text-gray-700 mb-2 hover:text-green hover:translate-x-1 transition duration-500">Mapa</button>
    <button href="#" className="text-gray-700 mb-2 hover:text-green hover:translate-x-1 transition duration-500">Graficas y Reportes</button>
    <button href="#" className="text-gray-700 mb-2 hover:text-green hover:translate-x-1 transition duration-500">Asignacion de Actividades a Empleados</button>
  </div>
  <div className="flex flex-col items-start">
    <h3 className="font-bold text-lg">Acerca de</h3>
    <button href="#" className="text-gray-700 mb-2 hover:text-green hover:translate-x-1 transition duration-500">Nuestra Historia</button>
    <button href="#" className="text-gray-700 mb-2 hover:text-green hover:translate-x-1 transition duration-500">Beneficios</button>
    <button href="#" className="text-gray-700 mb-2 hover:text-green hover:translate-x-1 transition duration-500">Equipo</button>
  </div>
  <div className="flex flex-col items-start">
    <h3 className="font-bold text-lg">Ayuda</h3>
    <button href="#" className="text-gray-700 mb-2 hover:text-green hover:translate-x-1 transition duration-500 block">Preguntas Frecuentes</button>
    <button href="#" className="text-gray-700 mb-2 hover:text-green hover:translate-x-1 transition duration-500 block">Contáctanos</button>
  </div>
  <div className="flex flex-col">
  <h3 className="font-bold text-lg">Social</h3>
  <div className="d-flex content-center">
    <div className="mr-2 inline-flex items-center justify-center w-12 h-12 bg-green text-white rounded-full mb-2 transition duration-600 hover:bg-white hover:text-green cursor-pointer">
      <Icon icon={v.iconoGitHub} className="m-0 w-4 h-4" />
    </div>
    <div className="inline-flex items-center justify-center w-12 h-12 bg-green text-white rounded-full mb-2 transition duration-600 hover:bg-custom-white cursor-pointer">
      <Icon icon={v.iconoLinkedin} className="m-0 w-4 h-4 hover:text-green" />
    </div>
  </div>
</div>

</section>
<hr className=" text-gray-500 ml-10 mr-10"/>
        <div className="flex justify-content-center align-items-center text-gray-500 mt-2">
          <p className="m-0">Copyright </p>
          <Icon icon={v.iconoCopyRight} className="mx-1 w-4 "></Icon>
          <p className="m-0"> 2024 By Equipo CropLink</p>
        </div>
      </div> */}
    </div>
  );
}

export default Soporte;