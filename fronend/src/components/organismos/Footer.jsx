import React from 'react'
import Icon from '../atomos/Iconos'
import v from '../../styles/variables'

function Footer() {
  return (
    <div className='bg-custom-white p-5'>
      <section className="flex flex-wrap justify-around gap-4 mb-3 ">
        <div className="flex flex-col items-start">
          <h3 className="font-bold text-lg">Ayuda</h3>
          <button href="#" className="text-gray-700 mb-2 mt-3 hover:text-green hover:translate-x-1 transition duration-500 block">Documentacion CropLink</button>
          <button href="#" className="text-gray-700 mb-2 hover:text-green hover:translate-x-1 transition duration-500 block">Contáctanos</button>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-lg">Social</h3>
          <div className="d-flex justify-center text-green">
            <a href="https://github.com/karenviviana1234/CropFronend"><div className="mr-2 inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 bg-custom-white cursor-pointer hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
              <Icon icon={v.iconoGitHub} className="m-0 w-4 h-4 text-green" />
            </div></a>
            <div className="mr-2 inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 bg-custom-white cursor-pointer hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
              <Icon icon={v.iconoFigma} className="m-0 w-4 h-4 text-green" />
            </div>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 bg-custom-white cursor-pointer hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
              <Icon icon={v.iconoGmail} className="m-0 w-4 h-4 text-green" />
            </div>
            <div className="mr-2 inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 bg-custom-white cursor-pointer hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
              <Icon icon={v.iconoApp} className="m-0 w-4 h-4 text-green" />
            </div>
          </div>
        </div>

      </section>
      <hr className=" text-gray-500 ml-10 mr-10" />
      <div className="flex justify-center align-items-center text-gray-500 mt-2">
        <p className="m-0">Copyright </p>
        <Icon icon={v.iconoCopyRight} className="mx-1 w-4 "></Icon>
        <p className="m-0 "> 2024 By Equipo CropLink</p>
      </div>
    </div>
  )
}

export default Footer
