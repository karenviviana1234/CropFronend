import React, { useEffect, useState } from 'react';
import './VistasCss.css';
import Header from '../organismos/Header/Header';
import v from '../../styles/variables';
import Icon from '../atomos/Sidebar/IconosSidebar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ButtonActualizar from '../atomos/ButtonActualizar';
import AccionesModal from '../organismos/ModalAcciones';
import PerfilModal from '../templates/PerfilModal';
import { Tooltip } from "@nextui-org/react";
import axiosClient from '../axiosClient';


const PerfilEmpleado = () => {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const [finca, setFinca] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAcciones, setModalAcciones] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [mode, setMode] = useState('create');
  const identificacion = perfil?.identificacion;
  const [usuarios, setUsuarios] = useState(null);

  const toggleSidebar = () => {
    setSidebarAbierto(!sidebarAbierto);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };
  useEffect(() => {

  const ObtenerDatos = async () => {
    try {
      const token = localStorage.getItem("token");
      const getURL = "http://localhost:3000/usuario/listarPerfil";
      const response = await axiosClient.get(getURL, { headers: { token: token } });
      console.log(response.data);
      setPerfil(response.data.data);
    } catch (error) {
      console.error("Error al obtener la información", error.response ? error.response.data : error.message);
    }
  };
    ObtenerDatos();
  }, []);


  const handleSubmit = async (formData, e) => {
    console.log('Datos enviados:', formData);
    e.preventDefault();

    try {
      if (mode === 'update' && identificacion) {
        await axiosClient.put(`http://localhost:3000/usuario/actualizarPerfil/${identificacion}`, formData).then((response) => {
          console.log(response);
          if (response.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Se actualizó con éxito la información",
              showConfirmButton: false,
              timer: 1500
            });
            ObtenerDatos();
          } else {
            alert('Error al actualizar');
          }
        });
      }
      setModalOpen(false);
    } catch (error) {
      console.log('Error en el servidor ', error);
      alert('Error en el servidor');
    }
  };

  const handleToggle = (mode, initialData) => {
    setInitialData(initialData);
    setModalOpen(true);
    setMode(mode);
  };

  return (
    <div className={`contenido pt-5 ${sidebarAbierto ? 'contenido-extendido' : ''}`} style={{ backgroundImage: `url(${v.Image5})`, height: 'auto', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      {perfil && (
        <div className='my-20 h-full flex justify-center'> {/* cambiar tamaño de la imagen */}
          <div className='bg-white rounded-2xl' style={{ height: '450px', width: '450px' }}>
            <div className='mt-4'>
              <span className='bg-green p-2 text-white'>{perfil.rol}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Icon icon={v.iconoPerfilUsuario} className='h-50 w-50 mt-5' />
            </div>
            <span className='mt-4' style={{ display: 'flex', justifyContent: 'center', fontSize: '25px', borderRadius: '10px' }}>{`${perfil.nombre} ${perfil.apellido}`}</span>
          </div>
          <div className='w-10'></div> {/* Espacio en el medio */}
          <div className='bg-white rounded-2xl pt-3' style={{ height: '450px', width: '620px' }}>
            <span className='ml-10 mr-60 text-2xl font-semibold'>Información del Usuario:</span>
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
                <label style={{ fontWeight: '500', fontSize: '19px' }}> Correo Electrónico: </label>
                <br />
                <label>{perfil.correo}</label>
              </li>
            </ul>
            <div className='flex justify-end mt-7 gap-3 mr-4'>
              <div className='"text-black shadow-xl flex items-center rounded-lg transition-colors duration-300 hover:bg-green hover:text-white cursor-pointer'>
                <ButtonActualizar onClick={() => handleToggle('update', setPerfil(perfil))} />
              </div>
              <Tooltip content="Salir">
                <div className="text-black shadow-xl flex items-center py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-green hover:text-white cursor-pointer" onClick={() => {
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
                      logout();
                    }
                  });
                }}>
                  <Icon className="w-5 h-5" icon={v.iconoSalir} />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
     
      <div className='ml-28 items-center p-10'>
        <AccionesModal
          isOpen={modalAcciones}
          onClose={() => setModalAcciones(false)}
          label={mensaje}
        />
        <PerfilModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={mode === 'update' ? 'Actualizar Información de Usuario' : ' Actualizar Perfil'}
          actionLabel={mode === 'update' ? 'Actualizar' : 'Actualizar'}
          initialData={initialData}
          handleSubmit={handleSubmit}
          mode={mode}
        />
      </div>
    </div>
  );
};

export default PerfilEmpleado;
