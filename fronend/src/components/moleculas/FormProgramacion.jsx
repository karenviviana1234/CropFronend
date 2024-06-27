import React, { useEffect, useState, useContext } from 'react';
import { ModalFooter, Button, Select } from "@nextui-org/react";
import axiosClient from '../axiosClient';
import ProgramacionesContext from './../../context/ProgramacionesContext';
import { DatePicker } from "@nextui-org/react";
import { getLocalTimeZone, today, parseDate } from "@internationalized/date";

const FormProgramacion = ({ mode, initialData, handleSubmit, onClose, actionLabel }) => {

  const [lotes, setLotes] = useState([]);
  const [actividad, setActividad] = useState([]);
  const [usuario, setUsuarios] = useState([]);
  const [estado, setEstado] = useState([]);

  const [estadoOp, setEstadoOp] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [identificacionFK, setIdentificacionFK] = useState('');
  const [actividadFK, setActividadFK] = useState('');
  const [loteFK, setLoteFK] = useState('');
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
      const usuarioFilter = response.data.filter((usuario) => usuario.estado === 'activo');
      setUsuarios(usuarioFilter);
    });
  }, []);

  useEffect(() => {
    axiosClient.get('/listara').then((response) => {
      const actividadFilter = response.data.filter((actividad) => actividad.estado === 'activo');
      setActividad(actividadFilter);
    });
  }, []);

  useEffect(() => {
    axiosClient.get('/listarlote').then((response) => {
      const loteFilter = response.data.filter((lote) => lote.estado === 'activo');
      setLotes(loteFilter);
    });
  }, []);

  useEffect(() => {
    if (mode === 'update' && idProgramacion) {
      const formattedFechaInicio = idProgramacion.fecha_inicio ? parseDate(idProgramacion.fecha_inicio) : null;
      const formattedFechaFin = idProgramacion.fecha_fin ? parseDate(idProgramacion.fecha_fin) : null;

      setFechaInicio(formattedFechaInicio);
      setFechaFin(formattedFechaFin);
      setIdentificacionFK(idProgramacion.fk_identificacion);
      setActividadFK(idProgramacion.fk_id_actividad);
      setLoteFK(idProgramacion.fk_id_lote);
      setEstadoOp(idProgramacion.estado);
    }
  }, [mode, idProgramacion]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        fecha_inicio: fechaInicio ? fechaInicio.toString() : '',
        fecha_fin: fechaFin ? fechaFin.toString() : '',
        fk_identificacion: identificacionFK,
        fk_id_actividad: actividadFK,
        fk_id_lote: loteFK,
        estado: estadoOp,
      };
      handleSubmit(formData, e);
    } catch (error) {
      console.log(error);
      alert('Hay un error en el sistema ' + error);
    }
  };

  return (
    <form method="post" onSubmit={handleFormSubmit}>
      <div className="ml-5 align-items-center">
        <div className="py-2">
          <DatePicker
            label="Fecha inicial"
            minValue={today(getLocalTimeZone())}
            value={fechaInicio}
            onChange={(date) => setFechaInicio(date)}
            required
          />
        </div>
        <div className="py-2">
          <DatePicker
            label="Fecha final"
            minValue={today(getLocalTimeZone())}
            value={fechaFin}
            onChange={(date) => setFechaFin(date)}
            required
          />
        </div>
        <div className="py-2">
          <select
            className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            name="idusuario"
            value={identificacionFK}
            onChange={(e) => setIdentificacionFK(e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Seleccionar usuario
            </option>
            {usuario.map((usua) => (
              <option key={usua.identificacion} value={usua.identificacion}>
                {usua.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="py-2">
          <select
            className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            id="fk_id_actividad"
            name="fk_id_actividad"
            value={actividadFK}
            onChange={(e) => setActividadFK(e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Seleccionar actividad
            </option>
            {actividad.map((acti) => (
              <option key={acti.id_actividad} value={acti.id_actividad}>
                {acti.nombre_actividad}
              </option>
            ))}
          </select>
        </div>
        <div className="py-2">
          <select
            className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            id="fk_id_lote"
            name="fk_id_lote"
            value={loteFK}
            onChange={(e) => setLoteFK(e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Seleccionar lote
            </option>
            {lotes.map((lot) => (
              <option key={lot.id_lote} value={lot.id_lote}>
                {lot.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="py-2">
          <select
            label="Estado"
            className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            value={estadoOp}
            onChange={(e) => setEstadoOp(e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Seleccionar estado
            </option>
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
          <Button type="submit" className="text-white bg-[#006000]">
            {actionLabel}
          </Button>
        </ModalFooter>
      </div>
    </form>
  );
};

export default FormProgramacion;
