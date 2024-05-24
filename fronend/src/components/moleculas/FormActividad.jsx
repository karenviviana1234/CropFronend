import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { ModalFooter, Button, Select, SelectItem, Tooltip, Input } from '@nextui-org/react';

//confirmacion yaa

export const FormActividad = ({ mode, initialData, handleSubmit, onClose, actionLabel }) => {
    const [variedades, setVariedades] = useState([]);
    const [tipo_recursos, setTipo_Recursos] = useState([]);
    const [errors, setErrors] = useState({});

    const token = localStorage.getItem('token');
    const [estado, setEstado] = useState('activo');
    const nombre_actividad = useRef(null);
    const tiempo = useRef(null);
    const observaciones = useRef(null);
    const valor_actividad = useRef(null);
    const fk_id_variedad = useRef(null);
    const fk_id_tipo_recursos = useRef(null);
    
    const EstadoActividad = [
        { value: 'activo', label: 'Activo' },
        { value: 'inactivo', label: 'Inactivo' },
        { value: 'proceso', label: 'Proceso' },
        { value: 'terminado', label: 'Terminado' },
      ];

    useEffect(() => {
        axios.get('http://localhost:3000/listarVariedades', { headers: { token: token } }).then((response) => {
            const variedadesFilter = response.data.filter(variedad => variedad.estado === 'activo');
            setVariedades(variedadesFilter);
        });
    }, [token]);

    useEffect(() => {
      axios.get('http://localhost:3000/listarRecurso', { headers: { token: token } }).then((response) => {
          const tipo_recursosFilter = response.data.filter (tipo_recursos => tipo_recursos.estado === 'existente');
          console.log("Recursos obtenidos:", tipo_recursosFilter); // Agregamos el console.log aquí
          setTipo_Recursos(tipo_recursosFilter);
      });
    }, [token]);
    

    useEffect(() => {
        if (mode === 'update' && initialData) {
            nombre_actividad.current.value = initialData.nombre_actividad;
            tiempo.current.value = initialData.tiempo;
            observaciones.current.value = initialData.observaciones;
            valor_actividad.current.value = initialData.valor_actividad;
            fk_id_variedad.current.value = initialData.fk_id_variedad;
            fk_id_tipo_recursos.current.value = initialData.fk_id_tipo_recursos;
            setEstado(initialdata.estado);
        }
    }, [mode, initialData]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const datosForm = {
            nombre_actividad: nombre_actividad.current.value,
            tiempo: tiempo.current.value,
            observaciones: observaciones.current.value,
            valor_actividad: parseInt(valor_actividad.current.value),
            fk_id_variedad: fk_id_variedad.current.value,
            fk_id_tipo_recursos: fk_id_tipo_recursos.current.value,
            estado: estado,
        };

        // Validación de campos
        const newErrors = {};

        // Validación de nombre de actividad
        if (!datosForm.nombre_actividad.trim()) {
            newErrors.nombre_actividad = 'El nombre de la actividad es requerido';
        }

        // Validación de valor de actividad
        if (!datosForm.valor_actividad || isNaN(datosForm.valor_actividad) || datosForm.valor_actividad <= 0) {
            newErrors.valor_actividad = 'El valor de la actividad debe ser un número entero positivo';
        }

        // Validación de tiempo
        if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(datosForm.tiempo)) {
            newErrors.tiempo = 'El tiempo debe tener el formato HH:MM:SS';
        }

        // Validación de variedad seleccionada
        if (!datosForm.fk_id_variedad) {
            newErrors.fk_id_variedad = 'Debe seleccionar una variedad';
        }
         // Validación de recursos seleccionada
         if (!datosForm.fk_id_tipo_recursos) {
          newErrors.fk_id_tipo_recursos = 'Debe seleccionar un recurso';
      }
        // para estado
        if (!datosForm.estado) {
            newErrors.estado = 'Debe seleccionar un estado';
        }

        if (Object.keys(newErrors).length > 0) {
            // Si hay errores, almacenarlos en el estado local
            setErrors(newErrors);
            return;
        }

        // Si no hay errores, enviar el formulario
        handleSubmit(datosForm, e);
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
                  ref={nombre_actividad}
                  required={true}
                />
                {errors.nombre_actividad && <span className='text-red-500'>{errors.nombre_actividad}</span>}
              </div>
              <div className='py-2'>
                <Input
                  className='w-80'
                  type="text"
                  label='Tiempo'
                  id='tiempo'
                  name="tiempo"
                  placeholder='HH:MM:SS'
                  ref={tiempo}
                  required={true}
                />
                {errors.tiempo && <span className='text-red-500'>{errors.tiempo}</span>}
              </div>
              <div className='py-2'>
                <Input
                  className='w-80'
                  type="text"
                  label='Observaciones'
                  id='observaciones'
                  name="observaciones"
                  placeholder='Ingrese una observacion'
                  ref={observaciones}
                  required={true}
                />
                {errors.observaciones && <span className='text-red-500'>{errors.observaciones}</span>}
              </div>
              <div className='py-2'>
                <Input
                  className='w-80'
                  type="number"
                  label='Valor Actividad'
                  id='valor_actividad'
                  name="valor_actividad"
                  placeholder='Ingrese el valor de la actividad'
                  ref={valor_actividad}
                  required={true}
                />
                {errors.valor_actividad && <span className='text-red-500'>{errors.valor_actividad}</span>}
              </div>
              <div className='py-2'>
                <Select
                  className='w-80'
                  label='Variedad'
                  id='fk_id_variedad'
                  name='fk_id_variedad'
                  ref={fk_id_variedad}
                  required
                >
                  {variedades.map(variedad => (
                    <SelectItem key={variedad.id_variedad} value={variedad.id_variedad}>
                      {variedad.nombre_variedad}
                    </SelectItem>
                  ))}
                </Select>
                {errors.fk_id_variedad && <span className='text-red-500'>{errors.fk_id_variedad}</span>}
              </div>
              <div className='py-2'>
              <Select
                className='w-80'
                label='Tipo de Recursos'
                id='fk_id_tipo_recursos'
                name='fk_id_tipo_recursos'
                selectionMode="multiple"
                ref={fk_id_tipo_recursos}
                required={true}
                >
                {tipo_recursos.map(tipo_recursos => (
                  <SelectItem key={tipo_recursos.id_tipo_recursos} value={tipo_recursos.id_tipo_recursos}>
                    {tipo_recursos.nombre_recursos}
                  </SelectItem>
                ))}
              </Select>

                {errors.fk_id_tipo_recursos && <span className='text-red-500'>{errors.fk_id_tipo_recursos}</span>}
              </div>
              <div className='py-2'>
            <Select
              label='Estado'
              className="w-80"
              value={estado} // Cambiado de Estado a estado
              onChange={(e) => setEstado(e.target.value)}
            >
              {EstadoActividad.map((estado) => (
                <SelectItem key={estado.value} value={estado.value}>
                  {estado.label}
                </SelectItem>
              ))}
            </Select>
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