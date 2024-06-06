import React, { useEffect, useState, useContext } from 'react';
import axiosClient from '../axiosClient';
import { ModalFooter, Button, Input } from "@nextui-org/react";
import ProduccionContext from '../../context/ProduccionContext.jsx';

export const FormProduccion = ({ mode, initialData, handleSubmit, onClose, actionLabel }) => {
  const [inversion, setInversion] = useState([]);
  const [programaciones, setProgramacion] = useState([]);
  const [inversionFk, setInversionFk] = useState('');
  const [cantidad_produccion, setcantidad_produccion] = useState('');
  const [precio, setPrecio] = useState('');
  const [programacionFk, setProgramacionFk] = useState('');
  const { idProduccion } = useContext(ProduccionContext);

  useEffect(() => {
    const obtenerProgramacion = async () => {
      try {
        const response = await axiosClient.get('/listarProgramacion');
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setProgramacion(response.data);
        } else {
          console.error('La respuesta no es un array', response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const obtenerInversiones = async () => {
      try {
        const response = await axiosClient.get('/listarinversion');
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setInversion(response.data);
        } else {
          console.error('La respuesta no es un array', response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    obtenerProgramacion();
    obtenerInversiones();
  }, []);

  useEffect(() => {
    if (mode === 'update' && idProduccion) {
      setcantidad_produccion(idProduccion.cantidad_produccion || '');
      setPrecio(idProduccion.precio || '');
      setProgramacionFk(idProduccion.fk_id_programacion || '');
      setInversionFk(idProduccion.fk_id_costos || '');
    }
  }, [mode, idProduccion]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        cantidad_produccion: cantidad_produccion,
        precio: parseInt(precio),
        fk_id_programacion: parseInt(programacionFk),
        fk_id_costos: parseInt(inversionFk)
      };
      handleSubmit(formData, e);
    } catch (error) {
      console.log(error);
      alert('Hay un error en el sistema ' + error);
    }
  };

  return (
    <form method='post' onSubmit={handleFormSubmit}>
      <div className='ml-5 align-items-center '>
        <div className='py-2'>
          <Input
            type="text"
            label="Cantidad Produccion"
            className="w-80"
            id='cantidad_produccion'
            name="cantidad_produccion"
            value={cantidad_produccion}
            onChange={(e) => setcantidad_produccion(e.target.value)}
            required
          />
        </div>
        <div className='py-2'>
          <Input
            className='w-80'
            type="float"
            label='Ingrese el precio'
            id='precio'
            name="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div className="py-2">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800"></span>
          <select
            className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            name="idProgramacion"
            value={programacionFk}
            onChange={(e) => setProgramacionFk(e.target.value)}
            required
          >
            <option value="" hidden className="text-gray-600">
              Seleccionar Asignación
            </option>
            {programaciones.map(programacion => (
              <option key={programacion.id_programacion} value={programacion.id_programacion}>
                {programacion.id_programacion}
              </option>
            ))}
          </select>
        </div>
        <div className="py-2">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800"></span>
          <select
            className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            name="idInversion"
            value={inversionFk}
            onChange={(e) => setInversionFk(e.target.value)}
            required
          >
            <option value="" hidden className="text-gray-600">
              Seleccionar Inversiones
            </option>
            {inversion.map(inv => (
              <option key={inv.id_inversiones} value={inv.id_inversiones}>
                {inv.valor_inversion}
              </option>
            ))}
          </select>
        </div>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
          <Button type='submit' color="primary">
            {actionLabel}
          </Button>
        </ModalFooter>
      </div>
    </form>
  );
};

export default FormProduccion;
