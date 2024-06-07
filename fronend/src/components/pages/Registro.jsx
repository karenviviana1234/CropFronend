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


export const Registro = () => {
  const navigate = useNavigate()
  const [mensaje, setMensaje] = useState('')
  const [modalAcciones, setModalAcciones] = useState(false)

  const [formData, setFormData] = useState({
    identificacion: '',
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    rol: 'administrador',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseURL = 'http://localhost:3000/usuario/registrarUsuario';
      await axios.post(baseURL, formData);
      setMensaje('Usuario Registrado exitosamente')
      setModalAcciones(true)
      navigate('/iniciosesion')
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className='flex items-center justify-center bg-[#EDEBDE] min-h-screen  p-4 w-full' >
      <div className='relative flex flex-col m-2 space-y-5 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 w-6/12 sm:w-full  lg:w-11/12 xl:w-9/12"'>

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
  )
}

export default Registro