import React from 'react'
import Icon from '../atomos/Iconos'
import v from '../../styles/variables'

function Footer() {
  return (
    <div className='bg-custom-white p-5'>
<section className="flex flex-wrap justify-around gap-4 mb-3 ">
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
      </div> 
  )
}

export default Footer
