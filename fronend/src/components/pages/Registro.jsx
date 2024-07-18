import React, { useState } from 'react'
import v from '../../styles/variables'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import AccionesModal from '../organismos/ModalAcciones.jsx'
import Icon from '../atomos/Sidebar/IconosSidebar.jsx';
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../NextUI/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../NextUI/EyeSlashFilledIcon";
import { Select } from "@nextui-org/select";
import Footer from '../organismos/Footer.jsx';
import Swal from 'sweetalert2';



export const Registro = () => {

  const navigate = useNavigate()
  //mensaje para mostrar mensajes de éxito o error.
  const [mensaje, setMensaje] = useState('')
//modalAcciones para controlar la visibilidad del modal.
  const [modalAcciones, setModalAcciones] = useState(false)

  // datos almacenados en el formulario, se guardan
  const [formData, setFormData] = useState({
    identificacion: '',
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    rol: 'administrador',
  });

//handleChange actualiza el estado formData cuando el usuario cambia los valores del formulario.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

//handleSubmit envía los datos del formulario a la API 
//para registrar un nuevo usuario y muestra un mensaje de éxito o error.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseURL = 'http://localhost:3000/usuario/registrarUsuario';
      await axios.post(baseURL, formData);
      setMensaje('Usuario Registrado exitosamente')
      setModalAcciones(true)
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Usuario Registrado Con Exito",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/iniciosesion')
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };
  //isVisible para controlar la visibilidad de la contraseña.
  const [isVisible, setIsVisible] = React.useState(false);
//toggleVisibility alterna la visibilidad de la contraseña entre texto y puntos.
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      <div className='flex items-center justify-center bg-[#EDEBDE] min-h-screen  p-4 w-full' >
        <div className='relative flex flex-col m-2 space-y-5 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 '>

          <div className='flex flex-col p-5 m-4  md:p-5'>
            <Link className='mb-2' to='/'>
              <Icon icon={v.iconoVolver} className='w-6 h-6' />
            </Link>
            <span className='mb-2 text-4xl font-bold text-center'>Registro</span>
            <form onSubmit={handleSubmit}>

              <div className='py-2'>
                <Input
                  type="number"
                  label="Identificación"
                  variant="bordered"
                  className="w-80"
                  name='identificacion'
                  id='identificacion'
                  value={formData.identificacion}
                  onChange={handleChange}
                />
              </div>

              <div className='py-2'>
                <Input
                  type="text"
                  label="Nombre(s)"
                  variant="bordered"
                  className="w-80"
                  name='nombre'
                  id='nombre'
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>

              <div className='py-2'>
                <Input
                  type="text"
                  label="Apellido(s)"
                  variant="bordered"
                  className="w-80"
                  name='apellido'
                  id='apellido'
                  value={formData.apellido}
                  onChange={handleChange}
                />
              </div>

              <div className='py-2'>
                <Input
                  type="email"
                  label="Correo"
                  variant="bordered"
                  className="w-80"
                  name='correo'
                  id='correo'
                  value={formData.correo}
                  onChange={handleChange}
                />
              </div>
              <div className='py-2'>
                <Input
                  label="Password"
                  variant="bordered"
                  name='password'
                  id='password'
                  value={formData.password}
                  onChange={handleChange}
                  endContent={
                    <button type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none mb-2" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="max-w-xs"
                />
              </div>

              <div className='py-2'>
                <Select
                  variant="bordered"
                  label="Administrador"
                  className="max-w-xs"
                  isDisabled
                >
                </Select>

              </div>



              <button className='mt-4 w-full bg-green    hover:bg-green-500 text-white p-2 rounded-lg mb-6' type='submit' >
                Registro
              </button>
            </form>
          </div>
          <div className='relative'>
            <img src={v.image10} className='w-[500px] h-full hidden rounded-r-2xl md:block object-cover' />
          </div>
          
          <AccionesModal
            isOpen={modalAcciones}
            onClose={() => setModalAcciones(false)}
            label={mensaje}
          />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
    //Se muestra un modal de acciones (AccionesModal) cuando el registro es exitoso.
//Se incluye un pie de página (Footer).
  )
}

export default Registro