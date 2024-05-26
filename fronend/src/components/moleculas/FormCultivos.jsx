import React, { useRef, useEffect, useState, useContext } from 'react';
import { ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import CultivosContext from '../../context/CultivosContext';
import axiosClient from '../axiosClient';


const FormCultivos = ({ actionLabel, handleSubmit, initialdata, mode, onClose }) => {

  const [variedad, setVariedad] = useState([])
  const [lote, setLote] = useState([])

  const [fechaInicio, setFechaInicio] = useState('')
  const [cantidadSembrada, setCantidadSembrada] = useState('');
  const [loteFK, setLoteFK] = useState('');
  const [variedadFK, setVariedadFK] = useState('');
  const { idCultivo } = useContext(CultivosContext)

  useEffect(() => {
    axiosClient.get('/listarlote').then((response) => {
      console.log(response.data)

      const loteFilter = response.data.filter(lote => lote.estado == 'activo')
      setLote(loteFilter)
    })
  }, [])

  useEffect(() => {
    axiosClient.get('/listarVariedades').then((response) => {
      console.log(response.data)
      const variedadFilter = response.data.filter(variedad => variedad.estado == 'activo')
      setVariedad(variedadFilter)
    })
  }, [])

  useEffect(() => {
    if (mode == 'update' && idCultivo) {
      setFechaInicio(idCultivo.fecha_inicio)
      setCantidadSembrada(idCultivo.cantidad_sembrada)
      setLoteFK(idCultivo.fk_id_lote)
      setVariedadFK(idCultivo.fk_id_variedad)
    }
  }, [mode, idCultivo])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        fecha_inicio: fechaInicio,
        cantidad_sembrada: parseInt(cantidadSembrada),
        fk_id_lote: parseInt(loteFK),
        fk_id_variedad: parseInt(variedadFK)
      }
      handleSubmit(formData, e)
    } catch (error) {
      console.log(error);
      alert('Hay un error en el sistema ' + error);
    }
  }


  return (
    <>
      <form method='post' onSubmit={handleFormSubmit}>
        <div className='ml-5 align-items-center '>
          <div className='py-2'>
            <Input
              type="date"
              label="Fecha inicial"
              className="w-80"
              id='fecahinicio'
              name="fecahincio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              required={true}
            />
          </div>
          <div className='py-2'>
            <Input
              className="w-80"
              type="number"
              label='Ingrese la cantidadSembrada'
              id='cantidadSembrada'
              name="cantidadSembrada"
              value={cantidadSembrada}
              onChange={(e) => setCantidadSembrada(e.target.value)}
              required={true}
            />
          </div>
          {/*  */}
          <div className='py-2'>
            <Select
              label='Lote'
              name="idCultivo"
              className='w-80'
              value={loteFK}
            onChange={(e) => setLoteFK(e.target.value)}
            >
              {lote.map(lot => (
                <SelectItem key={lot.id_lote} value={lot.id_lote}textValue={lot.id_lote}>
                  {lot.nombre}
                </SelectItem>
              ))}
            </Select>
          </div>
          {/*  */}
          <div className='py-2'>
            <Select
              label='Viriedad'
              name="idvariedad"
              className='w-80'
              value={variedadFK}
              onChange={(e) => setVariedadFK(e.target.value)}
            >
              {variedad.map(vari => (
                <SelectItem key={vari.id_variedad} value={vari.id_variedad} textValue={vari.id_variedad}>
                  {vari.nombre_variedad}
                </SelectItem>
              ))}
            </Select>
          </div>
          {<ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Close
            </Button>
            <Button type='submit' color="primary">
              {actionLabel}
            </Button>
          </ModalFooter>}
        </div>
      </form>
    </>
  );
};

export default FormCultivos;
