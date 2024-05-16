import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { ModalFooter, Button, Select, SelectItem } from '@nextui-org/react';

 const FormProduccion = ({ mode, initialData, handleSubmit, onClose, actionLabel }) => {
  const [programaciones, setProgramacion] = useState([]);
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem('token');

  const cantidad_produccion = useRef(null);
  const fk_id_programacion = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:3000/listarProgramacion', { headers: { token: token } }).then((response) => {
      const programacionFilter = response.data.filter(programacion => programacion.estado === 'activo');
      setProgramacion(programacionFilter);
    });
  }, [token]);

  useEffect(() => {
    if (mode === 'update' && initialData) {
      cantidad_produccion.current.value = initialData.cantidad_produccion;
      fk_id_programacion.current.value = initialData.fk_id_programacion;
    }
  }, [mode, initialData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const datosForm = {
      cantidad_produccion: cantidad_produccion.current.value,
      fk_id_programacion: fk_id_programacion.current.value,
    };

    // Validación de campos
    const newErrors = {};


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    handleSubmit(datosForm, e);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className='flex flex-col'>

          <div className='flex flex-col m-3'>
            <label className='text-xl font-bold'> Cantidad: </label>
            <input className='p-2 rounded-lg w-80 h-12' name='cantidad_produccion' placeholder='Ingrese la Cantidad' ref={cantidad_produccion} required />
            {errors.cantidad_produccion && <span className="text-red-500">{errors.cantidad_produccion}</span>}
          </div>
         
          <div className='flex flex-col m-3'>
            <label className='text-xl font-bold'> Programacion: </label>
            <Select className='p-2 rounded-lg w-80 h-12' 
            label='Selecciona' 
            ref={fk_id_programacion}
           required>
              {programaciones.map(programacion => (
                <SelectItem 
                key={programacion.id_programacion}
                 value={programacion.id_programacion}>
                  {programacion.id_programacion}
                </SelectItem>
              ))}
            </Select>
            {errors.fk_id_programacion && <span className="text-red-500">{errors.fk_id_programacion}</span>}
          </div>
          <ModalFooter>
            <Button color='danger' variant='flat' onClick={onClose}>
              Close
            </Button>
            <Button type='submit' color='primary'>
              {actionLabel}
            </Button>
          </ModalFooter>
        </div>
      </form>
    </>
  );
};

export default FormProduccion;
