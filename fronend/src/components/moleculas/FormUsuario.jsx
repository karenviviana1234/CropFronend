import React, { useEffect, useRef, useState } from 'react';
import { ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { EyeFilledIcon } from "../NextUI/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../NextUI/EyeSlashFilledIcon";

const FormUsuario = ({ actionLabel, handleSubmit, initialdata, mode, onClose }) => {

  const identificacion = useRef(null);
  const nombre = useRef(null)
  const apellido = useRef(null);
  const correo = useRef(null);
  const password = useRef(null);
  const rol = useRef(null);

  const [errors, setErrors] = useState({
    nombre: '',
    identificacion: '',
    apellido: '',
    correo: '',
    password: '',
    rol: ''
  })

  useEffect(() => {
    if (mode == 'update' && initialdata) {
      nombre.current.value = initialdata.nombre
      identificacion.current.value = initialdata.identificacion
      apellido.current.value = initialdata.apellido
      correo.current.value = initialdata.correo
      password.current.value = initialdata.password
      rol.current.value = initialdata.rol

    }
  }, [mode, initialdata])

  const handleFormSubmit = async (e) => {
    e.preventDefault();


    const datosForm = {
      identificacion: parseInt(identificacion.current.value),
      nombre: nombre.current.value,
      apellido: apellido.current.value,
      correo: correo.current.value,
      password: password.current.value,
      rol: rol.current.value

    }
    let hasErrors = false;
    const newErrors = { ...errors };

    if (!datosForm.identificacion || !/^\d+$/.test(datosForm.identificacion)) {
      newErrors.identificacion = 'La identificacionión debe contener solo números';
      hasErrors = true;
    }
    if (!datosForm.nombre || !/^[a-zA-Z\s]+$/.test(datosForm.nombre)) {
      newErrors.nombre = 'El nombre de la variable debe contener solo letras';
      hasErrors = true
    }
    if (!datosForm.apellido || !/^[a-zA-Z\s]+$/.test(datosForm.apellido)) {
      newErrors.apellido = 'El apellido de la variable debe contener solo letras';
      hasErrors = true
    }
    if (!datosForm.correo || !/\S+@\S+\.\S+/.test(datosForm.correo)) {
      newErrors.correo = 'El correo electrónico no es válido';
      hasErrors = true;
    }
    if (!datosForm.password || datosForm.password.length < 8 || !/\d/.test(datosForm.password) || !/[a-zA-Z]/.test(datosForm.password)) {
      newErrors.password = 'La contraseña debe contener al menos 8 caracteres, una letra y un número';
      hasErrors = true;
    }

    setErrors(newErrors);
    if (hasErrors) {
      return;
    }
    try {
      handleSubmit(datosForm, e)
    } catch (error) {
      console.log('Error al conectar con el server ' + error);
    }


  };
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <>
      <form method='post' onSubmit={handleFormSubmit} >
        {/*  */}
        <div className='ml-5 align-items-center '>
          <div className='py-2 '>
            <Input
              type="number"
              label="Identificación"
              className="max-w-xs"
              id='identificacion'
              name="identificacion"
              ref={identificacion}
              required={true}
            />
          </div>
          {/*  */}
          <div className='py-2'>
            <Input
              type="text"
              label="Nombre"
              className="max-w-xs"
              id='nombre'
              name="nombre"
              ref={nombre}
              required={true}
            />
            {errors.nombre && <span className='text-red-500'>{errors.nombre}</span>}
          </div>

          {/*  */}
          <div className='py-2'>
            <Input
              type="text"
              label="Apellido"
              className="max-w-xs"
              id='apellido'
              name="apellido"
              ref={apellido}
              required={true}
            />
            {errors.apellido && <span className='text-red-500'>{errors.apellido}</span>}
          </div>
          {/*  */}
          <div className='py-2'>
            <Input
              type="text"
              label="Correo Electrónico"
              className="max-w-xs"
              id='correo'
              name="correo"
              ref={correo}
              required={true}
            />
            {errors.correo && <span className='text-red-500'>{errors.correo}</span>}
          </div>
          {/*  */}
          <div className='py-2'>
            <Input
              label="Contraseña"
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
            {errors.password && <span className='text-red-500'>{errors.password}</span>}
          </div>
          {/*  */}
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 py-2">
            <Select
              label='Rol'
              name="rol"
              id=""
              className="max-w-xs"
              ref={rol}
              required={true}
              onChange={(e) => rol.current.value = e.target.value} 
            >
              <SelectItem value='administrador'>Adminstrador</SelectItem>
              <SelectItem value='empleado'>Empleado</SelectItem>
            </Select>
          </div>
        </div>
        <ModalFooter>
          <Button
            color='danger'
            variant='flat'
            onPress={onClose}
          >
            Close
          </Button>
          <Button
            type='submit' className='text-white bg-[#006000]'
          >
            {actionLabel}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default FormUsuario;
