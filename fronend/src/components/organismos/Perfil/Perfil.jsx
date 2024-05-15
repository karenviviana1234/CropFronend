import React from 'react';
import v from '../../../styles/variables';
import Icon from '../../atomos/Sidebar/IconosSidebar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Perfil({ visible }) {
//cerrar Sesion
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className='bg-green items-center mt-12 fixed top-0 right-0 rounded-bl-2xl rounded-br-2xl' style={{ opacity: visible ? 1 : 0, width: '170px', height: '140px', position: 'fixed', transition: 'opacity 0.3s' }}>
      <ul className="navbar">
        <li className="bg-green text-custom-white justify-center rounded-2xs nav-item flex items-center mt-3 mx-15 transition-colors duration-300 hover:bg-custom-white hover:text-green cursor-pointer" >
          <Icon className="ml-4" icon={v.iconoPerfilUsuario} />
          <a className="nav-link" href="/perfil">Perfil</a>
        </li>
        <li className="bg-green text-custom-white justify-center rounded-2xs nav-item flex items-center mt-3 mx-15 transition-colors duration-300 hover:bg-custom-white hover:text-green cursor-pointer" onClick={() => {
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
          <Icon className="ml-4" icon={v.iconoSalir} />
          <span className="nav-link">Salir</span>
        </li>
      </ul>
    </div>
  );
  
  
}

export default Perfil;
