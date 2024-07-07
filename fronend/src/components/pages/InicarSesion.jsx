import React, { useState, useRef } from 'react'
import './../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../NextUI/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../NextUI/EyeSlashFilledIcon";
import AccionesModal from '../organismos/ModalAcciones'
import v from '../../styles/variables'
import Icon from '../atomos/Sidebar/IconosSidebar.jsx';
import Swal from 'sweetalert2';
import Footer from '../organismos/Footer.jsx'

export const InicioSesion = () => {
  const [mensaje, setMensaje] = useState('')
  const [modalAcciones, setModalAcciones] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const baseURL = "http://localhost:3000/validacion"

  const correo = useRef(null)
  const password = useRef(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      const emailValue = correo.current.value
      const passwordValue = password.current.value

      if (!emailValue || !passwordValue) {
        setMensaje('Los campos son obligatorios')
        setModalAcciones(true)
        return
      }

      const data = {
        correo: emailValue,
        password: passwordValue
      }

      axios.post(baseURL, data).then((response) => {
        console.log(response)

        if (response.status === 200) {
          const { token, user } = response.data
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(response.data.user[0]))
          console.log(response.data.user[0])

          const userRol = user[0]?.rol

          if (userRol === 'empleado') {
            setMensaje('Bienvenido empleado')
            setModalAcciones(true)
            navigate('/Empleado')
          } else if (userRol === 'administrador') {
            setMensaje('Bienvenido Admin')
            setModalAcciones(true)
            setModalOpen(false)
            navigate('/Inicio')

          }
        } else {
          console.log('Response', response)
          setMensaje('Credenciales incorrectas')
          setModalAcciones(true)
        }
      })
    } catch (error) {
      console.log(error)
      alert('Error del servidor' + error)
    }
  }
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-[#EDEBDE]  p-4 w-full">
        <div className="relative flex flex-col bg-white shadow-2xl rounded-2xl md:flex-row">


          <div className="flex flex-col justify-center p-8 md:p-20">
            <Link className='mb-5' to='/'>
              <Icon icon={v.iconoVolver} className='w-6 h-6' />
            </Link>
            <span className="mb-3 text-4xl font-bold">Inicio De Sesion</span>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={v.imageLogoV} style={{ width: '120px', height: '120px' }} alt="" />
            </div>
            <div className='py-2'>
              <Input
                type="email"
                label="Correo"
                variant="bordered"
                className="w-80"
                name="correo"
                id="correo"
                ref={correo}
              />
            </div>
            <div className='py-2'>
              <Input
                label="Contraseña"
                variant="bordered"
                ref={password}
                name="password"
                id="password"
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


            {/* <a href="/recuperar" className="text-gray-700 hover:text-gray-900 hover:underline flex justify-center mt-3">Olvidó su contraseña?</a> */}

            <button
              className="w-full mt-3 p-2 bg-[#006000] text-white  rounded-lg cursor-pointer  flex justify-center items-center "
              onClick={handleSubmit}>
              Ingresar
            </button>



          </div>
          <div className="relative">
            <img
              src={v.image11}
              alt="img"
              className="w-[500px] h-full hidden rounded-r-2xl md:block object-cover"
            />
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
  )
}