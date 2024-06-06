import React, { useRef, useEffect, useState, useContext } from 'react';
import axiosClient from '../axiosClient';
import { ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import ProduccionContext from '../../context/ProduccionContext.jsx';


export const FormProduccion = ({ mode, initialData, handleSubmit, onClose, actionLabel }) => {

  const [programaciones, setProgramacion] = useState([])

  const [cantidad_produccion, setcantidad_produccion] = useState('')
  const [precio, setPrecio] = useState('')
  const [programacionFk, setProgramacionFk] = useState('')
  const [inversionFk, setInversionFk] = useState('')
  const { idProduccion } = useContext(ProduccionContext)


  useEffect(() => {
    axiosClient.get('/listarProgramacion').then((response) => {
      console.log(response.data)
      const programacionFilter = response.data.filter(programacion => programacion.estado == 'activo')
      setProgramacion(programacionFilter)
    }),
    axiosClient.get('/listarInversion').then((response) => {
      console.log(response.data)
      const inversionFilter = response.data.filter(inversiones => inversiones  .estado == 'activo')
      setProgramacion(inversionFilter)
    })
  }, [])

  useEffect(() => {
    if (mode == 'update' && idProduccion) {
      setcantidad_produccion(idProduccion.cantidad_produccion)
      setPrecio(idProduccion.precio)
      setProgramacionFk(idProduccion.fk_id_programacion)
      setInversionFK(idProduccion.fk_id_inversione)
    }
  }, [mode, idProduccion])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        cantidad_produccion: cantidad_produccion,
        precio: parseInt(precio),
        fk_id_programacion: parseInt(programacionFk),
        fk_id_inversiones: parseInt(inversionFk)
      }
      handleSubmit(formData, e)
    } catch (error) {
      console.log(error);
      alert('Hay un error en el sistema ' + error);
    }
  }

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
            required={true}
          />
        </div>
        <div className='py-2'>
          <Input
            className='w-80'
            type="float"
            label='Ingrese la precio'
            id='precio'
            name="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required={true}
          />
        </div>
        {/*  */}
        <div className='py-2'>
          <Select
            label='Asignacion'
            name="fk_id_programacion"
            className='w-80'
            value={programacionFk}
            onChange={(e) => setProgramacionFk(e.target.value)}
          >
            {programaciones.map(programacion => (
              <SelectItem key={programacion.id_programacion} value={programacion.id_programacion} textValue={programacion.id_programacion}>
                {programacion.nom}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className='py-2'>
          <Select
            label='Inversiones'
            name="fk_id_inversiones"
            className='w-80'
            value={inversionFk}
            onChange={(e) => setInversionFk(e.target.value)}
          >
            {programaciones.map(programacion => (
              <SelectItem key={programacion.fk_id_inversiones} value={programacion.fk_id_inversiones} textValue={programacion.fk_id_inversiones}>
                {programacion.fk_id_inversiones}
              </SelectItem>
            ))}
          </Select>
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