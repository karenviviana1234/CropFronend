import React, { useState } from 'react';
import './VistasCss.css';
import Header from '../organismos/Header/Header';
import v from '../../styles/variables';
import Icon from '../atomos/Sidebar/IconosSidebar';

function PerfilUsuario() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  const toggleSidebar = () => {
    setSidebarAbierto(!sidebarAbierto);
  };

  return (
    <div className={`contenido pt-5 ${sidebarAbierto ? 'contenido-extendido' : ''}`} style={{ backgroundImage: `url(${v.Image5})`, height: 'auto', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      <div className='my-5' style={{ display: 'flex', justifyContent: 'center', height: '600px'}}>
        <div className='bg-white' style={{ height: '450px', width: '450px', borderRadius: '20px' }}>
          <div className='mt-4'>
            <span className='bg-green p-2 text-white'>Administrador</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Icon icon={v.iconoPerfilUsuario} className='h-50 w-50 mt-5' ></Icon>
          </div>
          <span className='mt-4' style={{ display: 'flex', justifyContent: 'center', fontSize: '25px', borderRadius: '10px' }}>Adriana Sanchez</span>
        </div>
        <div className='w-10'></div> {/* Espacio en el medio */}
        <div className='bg-white' style={{ height: '450px', width: '620px', borderRadius: '20px' }}>
          <div className='mt-3'>
            <span className='ml-4' style={{ fontSize: '22px' }}>Informacion del Usuario:</span>
          </div>
          <hr className='mx-4' />
          <ul className='mt-4'>
            <li className='ml-5'>
              <label style={{ fontWeight: '500', fontSize: '19px' }}> Identificación: </label>
              <br />
              <label> 4936566</label>
            </li>
            <li className='ml-5'>
              <label style={{ fontWeight: '500', fontSize: '19px' }}> Nombres: </label>
              <br />
              <label> Adriana</label>
            </li>
            <li className='ml-5'>
              <label style={{ fontWeight: '500', fontSize: '19px' }}> Apellidos: </label>
              <br />
              <label> Sanchez</label>
            </li>
            <li className='ml-5'>
              <label style={{ fontWeight: '500', fontSize: '19px' }}> Correo Electronico: </label>
              <br />
              <label> adrianasanchez@gmail.com</label>
            </li>
          </ul>
        </div>
      </div>
{/*       <div className='mx-5' style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='ml-5 bg-white mt-5 mb-5' style={{ height: '100px', width: '450px', borderRadius: '20px' }}>
        <label style={{ fontWeight: '500', fontSize: '19px' }}> Total de Fincas Registradas: </label>
        <label> 2 </label>
        </div>
        <div className='w-10'></div> 
        <div className='bg-white mt-5 mb-5' style={{ height: '100px', width: '620px', borderRadius: '20px' }}></div>
      </div> */}
    </div>
  );
}

export default PerfilUsuario;
