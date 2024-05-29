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
              pattern="^\d+$"
              title="La cantidad debe ser un número entero."
            />
          </div>
          {/*  */}
          <div className='py-2'>
            <select
              className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              label='Lote'
              name="idCultivo"
              value={loteFK}
              onChange={(e) => setLoteFK(e.target.value)}
            >
              <option value="" disabled hidden>Seleccionar lote</option>
              {lote.map(lot => (
                <option key={lot.id_lote} value={lot.id_lote} textValue={lot.id_lote}>
                  {lot.nombre}
                </option>
              ))}
            </select>
          </div>
          {/*  */}
          <div className='py-2'>
            <select
              className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              label='Viriedad'
              name="idvariedad"
              value={variedadFK}
              onChange={(e) => setVariedadFK(e.target.value)}
            >
              <option value="" disabled hidden>Seleccionar variedad</option>
              {variedad.map(vari => (
                <option key={vari.id_variedad} value={vari.id_variedad} textValue={vari.id_variedad}>
                  {vari.nombre_variedad}
                </option>
              ))}
            </select>
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
