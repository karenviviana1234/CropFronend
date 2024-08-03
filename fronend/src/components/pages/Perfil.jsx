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


const PerfilUsuario = () => {
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
        const response = await axiosClient.get("/usuario/listarPerfil");
        setPerfil(response.data.data);
      } catch (error) {
        alert('Error en el servidor')
      }
    };
    ObtenerDatos();
  }, []);


  const sumaEmpleados = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosClient.get("/usuario/sumaEmpleados");
      setUsuarios(response.data.totalEmpleados);
    } catch (error) {
      alert('Error en el servidor')
    }
  };

  useEffect(() => {
    sumaEmpleados();
  }, []);



  const SumaFincas = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosClient.get("/finca/sumaFincas");
      setFinca(response.data.totalFincas); 
    } catch (error) {
      alert('Error en el servidor')
    }
  };

  useEffect(() => {
    SumaFincas();
  }, []);

  const handleSubmit = async (formData, e) => {
    e.preventDefault();

    try {
      if (mode === 'update' && identificacion) {
        await axiosClient.put(`/usuario/actualizarPerfil/${identificacion}`, formData).then((response) => {
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
      alert('Error en el servidor');
    }
  };

  const handleToggle = (mode, initialData) => {
    setInitialData(initialData);
    setModalOpen(true);
    setMode(mode);
  };

  return (
    <div className={`contenido h-max-screen ${sidebarAbierto ? 'contenido-extendido' : ''}`} style={{ backgroundImage: `url(${v.Image5})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
      {perfil && (
        <div className='my-12 flex justify-center'> {/* cambiar tamaño de la imagen */}
          <div className='bg-white rounded-2xl' style={{ width: '1100px' }}>
            <div className='mt-10'>
              <span className='bg-green p-2 text-white'>{perfil.rol}</span>
            </div>
            <div className='flex justify-end px-10 my-3'>
              <span className='mt-4 mr-80 text-3xl font-semibold' style={{ display: 'flex', justifyContent: 'center', borderRadius: '10px' }}>{`${perfil.nombre} ${perfil.apellido}`}</span>
              <div className='mr-5 ml-10 text-black shadow-xl flex items-center rounded-lg transition-colors duration-300 hover:bg-green hover:text-white cursor-pointer'>
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
            <span className='ml-10 mr-60 text-xl font-semibold'>Información del Usuario:</span>
            <hr className='mx-8' />
            <ul className='mt-4 flex justify-between px-10'>
              <li className='my-3'>
                <label style={{ fontWeight: '500', fontSize: '19px' }}> Identificación: </label>
                <br />
                <label>{perfil.identificacion}</label>
              </li>
              <li className='my-3'>
                <label style={{ fontWeight: '500', fontSize: '19px' }}> Nombres: </label>
                <br />
                <label>{perfil.nombre}</label>
              </li>
              <li className='my-3'>
                <label style={{ fontWeight: '500', fontSize: '19px' }}> Apellidos: </label>
                <br />
                <label>{perfil.apellido}</label>
              </li>
              <li className='mt-3'>
                <label style={{ fontWeight: '500', fontSize: '19px' }}> Correo Electrónico: </label>
                <br />
                <label>{perfil.correo}</label>
              </li>
            </ul>
            <div className='flex justify-center gap-10 '> {/* Flex container para centrar */}
              <div className='p-10 text-black hover:text-white hover:bg-green h-40 w-96 rounded-2xl flex items-center m-10'>
                <label className='text-xl font-semibold text-center'>Fincas Registradas: <span className='text-4xl ml-20'>{finca}</span></label>
              </div>
              <div className='p-10  text-black hover:text-white hover:bg-green h-40 w-96 rounded-2xl flex items-center m-10'>
                <label className='text-xl font-semibold text-center'>Empleados Registrados: <span className='text-4xl ml-10'>{usuarios}</span></label>
              </div>
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

export default PerfilUsuario;