import React, { useEffect, useState, useContext } from 'react';
import { ModalFooter, Button, Input } from "@nextui-org/react";
import axiosClient from '../axiosClient';
import ActividadesContext from './../../context/ActividadContext';

export const FormActividad = ({ mode, initialData, handleSubmit, onClose, actionLabel }) => {
  const [variedades, setVariedades] = useState([]);
  const [tipo_recursos, setTipo_Recursos] = useState([]);
  const [estado, setEstado] = useState([]);

  const [estadoOp, setEstadoOp] = useState('');
  const [nombreActividad, setNombreActividad] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [valorActividad, setValorActividad] = useState('');
  const [variedadFK, setVariedadFK] = useState('');
  const [tipoRecursosFK, setTipoRecursosFK] = useState('');
  const { idActividad } = useContext(ActividadesContext);

  useEffect(() => {
    const enumData = [
      { value: 'activo', label: 'Activo' },
      { value: 'inactivo', label: 'Inactivo' },
      { value: 'proceso', label: 'Proceso' },
      { value: 'terminado', label: 'Terminado' },
    ];
    setEstado(enumData);
  }, []);

  useEffect(() => {
    axiosClient.get('/listarVariedades').then((response) => {
      const variedadesFilter = response.data.filter(variedad => variedad.estado === 'activo');
      console.log("Variedades obtenidas:", variedadesFilter);
      setVariedades(variedadesFilter);
    });
  }, []);

  useEffect(() => {
    axiosClient.get('/listarRecurso').then((response) => {
      const tipo_recursosFilter = response.data.filter(tipo_recursos => tipo_recursos.estado === 'existente');
      console.log("Recursos obtenidos:", tipo_recursosFilter);
      setTipo_Recursos(tipo_recursosFilter);
    });
  }, []);

  useEffect(() => {
    if (mode === 'update' && idActividad) {
      setNombreActividad(idActividad.nombre_actividad);
      setTiempo(idActividad.tiempo);
      setObservaciones(idActividad.observaciones);
      setValorActividad(idActividad.valor_actividad);
      setVariedadFK(idActividad.fk_id_variedad);
      setTipoRecursosFK(idActividad.fk_id_tipo_recursos);
      setEstadoOp(idActividad.estado);
    }
  }, [mode, idActividad]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        nombre_actividad: nombreActividad,
        tiempo: tiempo,
        observaciones: observaciones,
        valor_actividad: valorActividad,
        fk_id_variedad: variedadFK,
        fk_id_tipo_recursos: tipoRecursosFK,
        estado: estadoOp,
      };
      handleSubmit(formData, e);
    } catch (error) {
      console.log(error);
      alert('Hay un error en el sistema ' + error);
    }
  };

  return (
    <>
      <form method='post' onSubmit={handleFormSubmit}>
        <div className='ml-5 align-items-center'>
          <div className='py-2'>
            <Input
              className='w-80'
              type="text"
              label='Nombre Actividad'
              id='nombre_actividad'
              name="nombre_actividad"
              placeholder='Ingrese la actividad a realizar'
              value={nombreActividad}
              onChange={(e) => setNombreActividad(e.target.value)}
              required
              pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{1,30}$"
              title="El nombre de la actividad debe tener máximo 30 caracteres y solo puede contener letras y espacios"
            />
          </div>
          <div className='py-2'>
            <Input
              className='w-80'
              type="text"
              label='Tiempo'
              id='tiempo'
              name="tiempo"
              placeholder='HH:MM:SS'
              value={tiempo}
              onChange={(e) => setTiempo(e.target.value)}
              required
              pattern="^(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$"
              title="El tiempo debe estar en el formato HH:MM:SS"
            />
          </div>
          <div className='py-2'>
            <Input
              className='w-80'
              type="text"
              label='Observaciones'
              id='observaciones'
              name="observaciones"
              placeholder='Ingrese una observación'
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              required
              pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{1,100}$"
              title="Las observaciones deben tener máximo 100 caracteres y solo pueden contener letras y espacios"
            />
          </div>
          <div className='py-2'>
            <Input
              className='w-80'
              type="number"
              label='Valor Actividad'
              id='valor_actividad'
              name="valor_actividad"
              placeholder='Ingrese el valor de la actividad'
              value={valorActividad}
              onChange={(e) => setValorActividad(e.target.value)}
              required
              min="0"
              title="El valor de la actividad debe ser un número positivo"
            />
          </div>
          <div className='py-2'>
            <select
              className='w-[320px] rounded-xl bg-gray-100 h-[40px]'
              label='Variedad'
              id='fk_id_variedad'
              name='fk_id_variedad'
              value={variedadFK}
              onChange={(e) => setVariedadFK(e.target.value)}
              required
            >
               <option value="" hidden className="text-gray-600">
              Seleccione la variedad
            </option>
              {variedades.map(variedad => (
                <option key={variedad.id_variedad} value={variedad.id_variedad}>
                  {variedad.nombre_variedad}
                </option>
              ))}
            </select>
          </div>
          <div className='py-2'>
            <select
              className='w-[320px] rounded-xl bg-gray-100 h-[40px]'
              label='Tipo de Recursos'
              id='fk_id_tipo_recursos'
              name='fk_id_tipo_recursos'
              value={tipoRecursosFK}
              select= 'multiple'
              onChange={(e) => setTipoRecursosFK(e.target.value)}
              required
            >
               <option value="" hidden className="text-gray-600">
              Seleccionar Recurso
            </option>
              {tipo_recursos.map(tipo_recursos => (
                <option key={tipo_recursos.id_tipo_recursos} value={tipo_recursos.id_tipo_recursos}>
                  {tipo_recursos.nombre_recursos}
                </option>
              ))}
            </select>
          </div>
          <div className='py-2'>
            <select
              label='Estado'
              className='w-[320px] rounded-xl bg-gray-100 h-[40px]'
              value={estadoOp}
              onChange={(e) => setEstadoOp(e.target.value)}
              required
            >
               <option value="" hidden className="text-gray-600">
              Seleccionar Estado
            </option>
              {estado.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
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

export default FormActividad;