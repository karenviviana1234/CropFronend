import React, { useEffect, useState } from 'react';
import './VistasCss.css';
import Header from '../organismos/Header/Header';
import v from '../../styles/variables';
import axios from 'axios';
import Icon from '../atomos/Sidebar/IconosSidebar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const PerfilUsuario = () => {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [perfil, setPerfil] = useState(null);

  const toggleSidebar = () => {
    setSidebarAbierto(!sidebarAbierto);
  };

  
//cerrar Sesion
const navigate = useNavigate()

const logout = () => {
  localStorage.clear()
  navigate('/')
}


  const ObtenerDatos = async () => {
    try {
      const token = localStorage.getItem("token");
      const getURL = "http://localhost:3000/usuario/listarPerfil"; // Asegúrate de que esta sea la ruta correcta
      const response = await axios.get(getURL, { headers: { token: token } });
      console.log(response.data);
      setPerfil(response.data.data);
    } catch (error) {
      console.error("Error al obtener la información", error.response ? error.response.data : error.message);
    }
  };
  useEffect(() => {
    ObtenerDatos();
  }, []);

  return (
    <div className={`contenido pt-5 ${sidebarAbierto ? 'contenido-extendido' : ''}`} style={{ backgroundImage: `url(${v.Image5})`, height: 'auto', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      {perfil && (
        <div className='my-5' style={{ display: 'flex', justifyContent: 'center', height: '600px' }}>
          <div className='bg-white' style={{ height: '450px', width: '450px', borderRadius: '20px' }}>
            <div className='mt-4'>
              <span className='bg-green p-2 text-white'>{perfil.rol}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Icon icon={v.iconoPerfilUsuario} className='h-50 w-50 mt-5' />
            </div>
            <span className='mt-4' style={{ display: 'flex', justifyContent: 'center', fontSize: '25px', borderRadius: '10px' }}>{`${perfil.nombre} ${perfil.apellido}`}</span>
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
                <label>{perfil.identificacion}</label>
              </li>
              <li className='ml-5'>
                <label style={{ fontWeight: '500', fontSize: '19px' }}> Nombres: </label>
                <br />
                <label>{perfil.nombre}</label>
              </li>
              <li className='ml-5'>
                <label style={{ fontWeight: '500', fontSize: '19px' }}> Apellidos: </label>
                <br />
                <label>{perfil.apellido}</label>
              </li>
              <li className='ml-5'>
                <label style={{ fontWeight: '500', fontSize: '19px' }}> Correo Electronico: </label>
                <br />
                <label>{perfil.correo}</label>
              </li>
            </ul>
            <li className=" text-black justify-end rounded-2xs nav-item flex items-center mt-3 mx-15 transition-colors duration-300 hover:text-green cursor-pointer" onClick={() => {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger",
              actions: "gap-5"
            },
            buttonsStyling: false
          });
  
          swalWithBootstrapButtons.fire({
            title: "¿Estás Seguro que deseas Cerrar Sesión?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Salir",
            cancelButtonText: "Cancelar",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              logout(); // Ejecutar la función logout al confirmar
            }
          });
        }}>
           <span className='mr-3' style={{fontSize: '19px'}}>Salir</span><Icon className="mr-16 w-8 h-8"  icon={v.iconoSalir} />
        </li>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilUsuario;
