import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";

const FormProgramacion = ({ actionLabel, handleSubmit, initialdata, mode, onClose }) => {
  const token = localStorage.getItem('token');
  const [estado, setEstado] = useState('activo');
  const fecha_inicio = useRef(null);
  const fecha_fin = useRef(null);
  const fk_identificacion = useRef(null);
  const fk_id_actividad = useRef(null);
  const fk_id_variedad = useRef(null);

  const EstadoProgramacion = [
    { value: 'activo', label: 'Activo' },
    { value: 'inactivo', label: 'Inactivo' },
    { value: 'proceso', label: 'Proceso' },
    { value: 'terminado', label: 'Terminado' },
  ];

  useEffect(() => {
    if (mode === 'update' && initialdata) {
      fecha_inicio.current.value = initialdata.fecha_inicio;
      fecha_fin.current.value = initialdata.fecha_fin;
      fk_identificacion.current.value = initialdata.fk_identificacion;
      fk_id_actividad.current.value = initialdata.fk_id_actividad;
      fk_id_variedad.current.value = initialdata.fk_id_variedad;
      setEstado(initialdata.estado);
    }
  }, [mode, initialdata]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const datosForm = {
      fecha_inicio: new Date(fecha_inicio.current.value),
      fecha_fin: new Date(fecha_fin.current.value),
      fk_identificacion: parseInt(fk_identificacion.current.value),
      fk_id_actividad: parseInt(fk_id_actividad.current.value),
      fk_id_variedad: parseInt(fk_id_variedad.current.value),
      estado: estado,
    };

    try {
      handleSubmit(datosForm, e);
    } catch (error) {
      console.log('Error al conectar con el server ' + error);
    }
  };

  const [usuario, setUsuarios] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/usuario/listarUsuarios', { headers: { token: token } }).then((response) => {
      const usuarioFilter = response.data.filter(usuario => usuario.estado === 'activo');
      setUsuarios(usuarioFilter);
    });
  }, [token]);

  const [actividad, setActividad] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/listara', { headers: { token: token } }).then((response) => {
      const actividadFilter = response.data.filter(actividad => actividad.estado === 'activo');
      setActividad(actividadFilter);
    });
  }, [token]);

  const [variedades, setVariedades] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/listarVariedades', { headers: { token: token } }).then((response) => {
      const variedadFilter = response.data.filter(variedad => variedad.estado === 'activo');
      setVariedades(variedadFilter);
    });
  }, [token]);

  return (
    <>
      <form method='post' onSubmit={handleFormSubmit}>
        <div className='ml-5 align-items-center '>
          <div className='py-2'>
            <Input
              className='w-80'
              type="date"
              label='Ingrese la fecha inicial de la variable'
              id='fecha_inicio'
              name="fecha_inicio"
              ref={fecha_inicio}
              required={true}
            />
          </div>
          <div className='py-2'>
            <Input
              className='w-80'
              type="date"
              label='Ingrese la fecha final de la variable'
              id='fecha_fin'
              name="fecha_fin"
              ref={fecha_fin}
              required={true}
            />
          </div>
          <div className='py-2'>
            <Select
              label='Usuarios'
              className="w-80"
              name="idusuario"
              ref={fk_identificacion}
              required={true}
            >
              {usuario.map(usua => (
                <SelectItem key={usua.identificacion} value={usua.identificacion}>
                  {usua.nombre}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className='py-2'>
            <Select
              label='Actividad'
              className="w-80"
              name="idactividad"
              ref={fk_id_actividad}
              required={true}
            >
              {actividad.map(acti => (
                <SelectItem key={acti.id_actividad} value={acti.id_actividad}>
                  {acti.nombre_actividad}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className='py-2'>
            <Select
              label='Variedad'
              name="idvariedad"
              id=""
              ref={fk_id_variedad}
              required={true}
            >
              {variedades.map(variedad => (
                <SelectItem key={variedad.id_variedad} value={variedad.id_variedad}>
                  {variedad.nombre_variedad}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className='py-2'>
            <Select
              label='Estado'
              className="w-80"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              {EstadoProgramacion.map((estado) => (
                <SelectItem key={estado.value} value={estado.value}>
                  {estado.label}
                </SelectItem>
              ))}
            </Select>
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
