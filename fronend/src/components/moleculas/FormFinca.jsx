import React, { useEffect, useRef, useState } from 'react';
import { ModalFooter, Button, Input } from '@nextui-org/react';
import axios from 'axios'
//confirmacion yaa

const FormFinca = ({ actionLabel, handleSubmit, initialdata, mode, onClose }) => {

  const nombre_finca = useRef(null)
  const longitud = useRef(null);
  const latitud = useRef(null);
 

  const [errors, setErrors] = useState({
    nombre_finca: '',
    longitud: '',
    latitud: '',
   
  })

  useEffect(() => {
    if (mode == 'update' && initialdata) {
      nombre_finca.current.value = initialdata.nombre_finca
      longitud.current.value = initialdata.longitud
      latitud.current.value = initialdata.latitud
      
    }
  }, [mode, initialdata])

  const handleFormSubmit = async (e) => {
    e.preventDefault();


    const datosForm = {
      nombre_finca: nombre_finca.current.value,
      longitud: parseInt(longitud.current.value),
      latitud: parseInt(latitud.current.value),
      
    }
    let hasErrors = false;
    const newErrors = { ...errors };

    //Validación de Campos correctos 
    if (!datosForm.nombre_finca || !/^[a-zA-Z\s]+$/.test(datosForm.nombre)) {
      newErrors.nombre_finca = 'El nombre de la variable debe contener solo letras';
      hasErrors = true
    }
    if (!datosForm.longitud || isNaN(datosForm.longitud) || datosForm.longitud <= 0) {
      newErrors.longitud = 'El valor de longitud debe ser de numerico entero positivo';
      hasErrors = true
    }
    if (!datosForm.latitud || isNaN(datosForm.latitud) || datosForm.latitud <= 0) {
      newErrors.latitud = 'El valor de latitud debe ser de numerico entero positivo';
      hasErrors = true
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

  return (
    <>
      <form method='post' onSubmit={handleFormSubmit}>
      <div className='ml-5 align-items-center '>
            <div className='py-2'>
              <Input
                className="w-80"
                type="text"
                label='Ingrese el nombre de la finca'
                id='nombre_finca'
                name="nombre finca"
                ref={nombre_finca}
                required={true}
              />
          {errors.nombre_finca && <span className='text-red-500'>{errors.nombre_finca}</span>}
        </div>
        {/*  */}
        <div className='py-2'>
                <Input
                    className="w-80"
                    type="number"
                    label='Ingrese la longitud'
                    id='longitud'
                    name="longitud"
                    ref={longitud}
                    required={true}
                />
                {errors.longitud && <span className='text-red-500'>{errors.longitud}</span>}
            </div>
            <div className='py-2'>
                <Input
                     className='w-80'
                    type="number"
                    label='Ingrese la latitud'
                    id='latitud'
                    name="latitud"
                    ref={latitud}
                    required={true}
                />
                {errors.latitud && <span className='text-red-500'>{errors.latitud}</span>}
            </div>
        {/*  */}
    
        <ModalFooter>
          <Button
            color='danger'
            variant='flat'
            onPress={onClose}
          >
            Cerrar
          </Button>
          <Button
            type='submit' className='text-white bg-[#006000]'
          >
            {actionLabel}
          </Button>
        </ModalFooter>
        </div>
      </form>
    </>
  );
};

export default FormFinca;
