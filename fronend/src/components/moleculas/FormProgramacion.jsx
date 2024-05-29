import React, { useEffect, useState, useContext } from 'react';
import { ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import axiosClient from '../axiosClient'; // Asegúrate de importar axiosClient si es necesario

import ProgramacionesContext from './../../context/ProgramacionesContext';

const FormProgramacion = ({ mode, initialData, handleSubmit, onClose, actionLabel }) => {

  const [variedades, setVariedades] = useState([]);
  const [cultivos, setCultivos] = useState([]);
  const [actividad, setActividad] = useState([]);
  const [usuario, setUsuarios] = useState([]);
  const [estado, setEstado] = useState([]);

  const [estadoOp, setEstadoOp] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [identificacionFK, setIdentificacionFK] = useState('');
  const [actividadFK, setActividadFK] = useState('');
  const [variedadFK, setVariedadFK] = useState('');
  const [cultivoFK, setCultivoFK] = useState('');
  const { idProgramacion } = useContext(ProgramacionesContext);

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
    axiosClient.get('/usuario/listarUsuarios').then((response) => {
      const usuarioFilter = response.data.filter(usuario => usuario.estado === 'activo');
      console.log(response.data)
      setUsuarios(usuarioFilter);
    });
  }, []);

  useEffect(() => {
    axiosClient.get('/listara').then((response) => {
      const actividadFilter = response.data.filter(actividad => actividad.estado === 'activo');
      console.log(response.data)
      setActividad(actividadFilter);
    });
  }, []);

  useEffect(() => {
    axiosClient.get('/listarVariedades').then((response) => {
      const variedadFilter = response.data.filter(variedad => variedad.estado === 'activo');
      console.log(response.data)
      setVariedades(variedadFilter);
    });
  }, []);

  useEffect(() => {
    axiosClient.get('/listarCultivos').then((response) => {
      const cultivoFilter = response.data.filter(cultivo => cultivo.estado === 'activo');
      console.log('API Cultivo:', response.data);
      setCultivos(cultivoFilter);
    });
  }, []);

  useEffect(() => {
    if (mode === 'update' && idProgramacion) {
      setFechaFin(idProgramacion.fecha_inicio);
      setFechaFin(idProgramacion.fecha_fin);
      setIdentificacionFK(idProgramacion.fk_identificacion);
      setActividadFK(idProgramacion.fk_id_actividad);
      setVariedadFK(idProgramacion.fk_id_variedad);
      setCultivoFK(idProgramacion.fk_id_cultivo);
      setEstadoOp(idProgramacion.estado);
    }
  }, [mode, idProgramacion]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        fk_identificacion: identificacionFK,
        fk_id_actividad: actividadFK,
        fk_id_variedad: variedadFK,
        fk_id_cultivo: cultivoFK,
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
        <div className='ml-5 align-items-center '>
          <div className='py-2'>
            <Input
              type="date"
              label="Fecha inicial"
              className='w-80'
              id='fecahinicio'
              name="fecahincio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              required={true}
            />
          </div>
          <div className='py-2'>
            <Input
              type="date"
              label="Fecha inicial"
              className='w-80'
              id='fecahinicio'
              name="fecahincio"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              required={true}
            />
          </div>
          <div className='py-2'>
            <select
              className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              name="idusuario"
              value={identificacionFK}
              onChange={(e) => setIdentificacionFK(e.target.value)}
              required={true}
            >
              <option value="" disabled hidden>Seleccionar usuario</option>
              {usuario.map(usua => (
                <option key={usua.identificacion} value={usua.identificacion}>
                  {usua.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className='py-2'>
            <select
              className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              id='fk_id_actividad'
              name='fk_id_actividad'
              value={actividadFK}
              onChange={(e) => setActividadFK(e.target.value)}
              required={true}
            >
              <option value="" disabled hidden>Seleccionar actividad</option>
              {actividad.map(acti => (
                <option key={acti.id_actividad} value={acti.id_actividad}>
                  {acti.nombre_actividad}
                </option>
              ))}
            </select>
          </div>
          <div className='py-2'>
            <select
              className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              id='fk_id_actividad'
              name='fk_id_actividad'
              value={cultivoFK}
              onChange={(e) => setCultivoFK(e.target.value)}
              required={true}
            >
              <option value="" disabled hidden>Seleccionar cultivo</option>
              {cultivos.map(culti => (
                <option key={culti.id_cultivo} value={culti.id_cultivo}>
                  {culti.cantidad_sembrada}
                </option>
              ))}
            </select>
          </div>
          <div className='py-2'>
            <select
              className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              id='fk_id_variedad'
              name='fk_id_variedad'
              value={variedadFK}
              onChange={(e) => setVariedadFK(e.target.value)}
              required
            >
              <option value="" disabled hidden>Seleccionar variedad</option>
              {variedades.map(variedad => (
                <option key={variedad.id_variedad} value={variedad.id_variedad}>
                  {variedad.nombre_variedad}
                </option>
              ))}
            </select>
          </div>
          <div className='py-2'>
            <select
              label='Estado'

              className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              value={estadoOp}
              onChange={(e) => setEstadoOp(e.target.value)}
              required
            >
              <option value="" disabled hidden>Seleccionar estado</option>
              {estado.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Close
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

export default FormProgramacion;
