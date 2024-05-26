import React, { useRef, useEffect, useState, useContext } from 'react';
import axiosClient from '../axiosClient';
import { ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import LotesContext from './../../context/LotesContext.jsx'


export const FormLotes = ({ mode, initialData, handleSubmit, onClose, actionLabel }) => {

  const [fincas, setFincas] = useState([])

  const [nombreLote, setNombreLote] = useState('')
  const [longitud, setLongitud] = useState('')
  const [latitud, setLatitud] = useState('')
  const [fincaFK, setFincaFk] = useState('')
  const { idLote } = useContext(LotesContext)


  useEffect(() => {
    axiosClient.get('/finca/listarFinca').then((response) => {
      console.log(response.data)
      const fincaFilter = response.data.filter(finca => finca.estado == 'activo')
      setFincas(fincaFilter)
    })
  }, [])

  useEffect(() => {
    if (mode == 'update' && idLote) {
      setNombreLote(idLote.nombre)
      setLongitud(idLote.longitud)
      setLatitud(idLote.latitud)
      setFincaFk(idLote.fk_id_finca)
    }
  }, [mode, idLote])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        nombre: nombreLote,
        longitud: parseInt(longitud),
        latitud: parseInt(latitud),
        fk_id_finca: parseInt(fincaFK)
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
            label="Nombre de la variable"
            className="w-80"
            id='nombre'
            name="nombre"
            value={nombreLote}
            onChange={(e) => setNombreLote(e.target.value)}
            required={true}
          />
        </div>
        <div className='py-2'>
          <Input
            className='w-80'
            type="float"
            label='Ingrese la longitud'
            id='longitud'
            name="longitud"
            value={longitud}
            onChange={(e) => setLongitud(e.target.value)}
            required={true}
          />
        </div>
        <div className='py-2'>
          <Input
            className='w-80'
            type="float"
            label='Ingrese la latitud'
            id='latitud'
            name="latitud"
            value={latitud}
            onChange={(e) => setLatitud(e.target.value)}
            required={true}
          />

        </div>
        {/*  */}
        <div className='py-2'>
          <Select
            label='Finca'
            name="idfinca"
            className='w-80'
            value={fincaFK}
            onChange={(e) => setFincaFk(e.target.value)}
          >
            {fincas.map(finca => (
              <SelectItem key={finca.id_finca} value={finca.nombre_finca} textValue={finca.nombre_finca}>
                {finca.nombre_finca}
              </SelectItem>
            ))}
          </Select>
          {/* <Select
            label='Finca'
            name="idfinca"
            className='w-80'
            value={fincaFK}
            onChange={(value) => setFincaFk(value)}
          >
            {fincas.map(finca => {
              console.log('finca:', finca); // Agregar este console.log para depurar
              return (
                <SelectItem key={finca.id_finca} value={finca.id_finca} textValue={finca.nombre_finca}>
                  {finca.nombre_finca}
                </SelectItem>
              );
            })}
          </Select> */}
          {/* <select
            name='finca'
            label='Seleccione la finca'
            value={fincaFK}
            onChange={(e) => setFincaFk(e.target.value)}
            required={true} >

            {fincas.map(finca => (
              <option key={finca.id_finca} value={finca.id_finca} textValue={finca.id_finca}>
                {finca.id_finca} - {finca.nombre_finca}
              </option>
            ))}
          </select> */}
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


export default FormLotes;