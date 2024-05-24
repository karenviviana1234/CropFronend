import React, { useEffect, useRef, useState } from 'react';
import { ModalFooter, Button,Input } from '@nextui-org/react';
//confirmacion yaa

const FormTrecursos = ({ actionLabel, handleSubmit, initialdata, mode, onClose }) => {

  const nombre_recursos = useRef(null)
  const cantidad_medida = useRef(null);
  const unidades_medida = useRef(null);
  const extras = useRef(null);

  

  const [errors, setErrors] = useState({
    nombre_recursos: '',
    cantidad_medida: '',
    unidades_medida: '',
    extras: ''
  })

  useEffect(() => {
    if (mode === 'update' && initialdata) {
      nombre_recursos.current.value = initialdata.nombre_recursos;
      cantidad_medida.current.value = initialdata.cantidad_medida;
      unidades_medida.current.value = initialdata.unidades_medida;
      extras.current.value = initialdata.extras;
    }
  }, [mode, initialdata])

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const datosForm = {
      nombre_recursos: nombre_recursos.current.value,
      cantidad_medida: parseInt(cantidad_medida.current.value),
      unidades_medida: unidades_medida.current.value,
      extras: extras.current.value
    }
    let hasErrors = false;
    const newErrors = { ...errors };

    // Validación de Campos correctos
    if (!datosForm.nombre_recursos || !/^[a-zA-Z\s]+$/.test(datosForm.nombre_recursos)) {
      newErrors.nombre_recursos = 'El nombre del recurso debe contener solo letras';
      hasErrors = true;
    }
    if (!datosForm.cantidad_medida || isNaN(datosForm.cantidad_medida) || datosForm.cantidad_medida <= 0) {
      newErrors.cantidad_medida = 'El valor de la cantidad de medida debe ser un número entero positivo';
      hasErrors = true;
    }
    if (!datosForm.unidades_medida) {
      newErrors.unidades_medida = 'Debes seleccionar una opción para las unidades de medida';
      hasErrors = true;
    }

  /*   if (!datosForm.extras) {
      newErrors.extras = 'El campo extras es requerido';
      hasErrors = true;
    } else {
      // Verifica si la cantidad de palabras supera el límite de 20
      const wordCount = datosForm.extras.trim().split(/\s+/).length;
      if (wordCount > 20) {
        newErrors.extras = 'El campo no puede tener más de 20 palabras';
        hasErrors = true;
      }
    } */

    setErrors(newErrors);
    if (hasErrors) {
      return;
    }
    try {
      handleSubmit(datosForm, e);
    } catch (error) {
      console.log('Error al conectar con el servidor: ' + error);
    }

  };
  return (
    <>
      <form method='post' onSubmit={handleFormSubmit}>
        <div className='ml-5 align-items-center'>
          <div className='py-2'>
            <Input
              className="w-80"
              type="text"
              label='Nombre Recurso'
              id='nombre_recursos'
              name="nombre_recursos"
              ref={nombre_recursos}
              required={true}
            />
            {errors.nombre_recursos && <span className='text-red-500'>{errors.nombre_recursos}</span>}
          </div>
          <div className='py-2'>
            <Input
              className="w-80"
              type="number"
              label='Cantidad Medida'
              id='cantidad_medida'
              name="cantidad_medida"
              ref={cantidad_medida}
              required={true}
            />
            {errors.cantidad_medida && <span className='text-red-500'>{errors.cantidad_medida}</span>}
          </div>
          <div className='py-2'>
            <select
              className='p-2 rounded-lg w-80 h-12'
              id='unidades_medida'
              name='unidades_medida'
              ref={unidades_medida}
              required
            >
              <option value=''>Selecciona una opción</option>
              <option value='ml'>Mililitro</option>
              <option value='litro'>Litro</option>
              <option value='g'>Gramos</option>
              <option value='kg'>Kilogramo</option>
              <option value='unidad'>Unidad</option>
            </select>
            {errors.unidades_medida && <span className='text-red-500'>{errors.unidades_medida}</span>}
          </div>
          <div className='py-2'>
            <Input
              className="w-80"
              type="text"
              label='Extras'
              id='extras'
              name="extras"
              ref={extras}
              required={true}
            />
            {errors.extras && <span className='text-red-500'>{errors.extras}</span>}
          </div>
          <ModalFooter>
            <Button color='danger' variant='flat' onClick={onClose}>
              Cerrar
            </Button>
            <Button type='submit' className='text-white bg-[#006000]'>
              {actionLabel}
            </Button>
          </ModalFooter>
        </div>
      </form>
    </>
  );
};

export default FormTrecursos;