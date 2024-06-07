import React, { useEffect, useState, useContext } from 'react';
import axiosClient from '../axiosClient';
import { ModalFooter, Button, Input } from "@nextui-org/react";
import LotesContext from './../../context/LotesContext.jsx';

export const FormLotes = ({ mode, initialData, handleSubmit, onClose, actionLabel }) => {
  const [fincas, setFincas] = useState([]);
  const [nombreLote, setNombreLote] = useState('');
  const [longitud, setLongitud] = useState('');
  const [latitud, setLatitud] = useState('');
  const [fincaFK, setFincaFk] = useState('');
  const { idLote } = useContext(LotesContext);

  useEffect(() => {
    axiosClient.get('/finca/listarFinca').then((response) => {
      const fincaFilter = response.data.filter(finca => finca.estado === 'activo');
      setFincas(fincaFilter);
    });
  }, []);

  useEffect(() => {
    if (mode === 'update' && idLote) {
      setNombreLote(idLote.nombre);
      setLongitud(idLote.longitud);
      setLatitud(idLote.latitud);
      setFincaFk(idLote.fk_id_finca); // Asegúrate de que fk_id_finca sea el id de la finca
    }
  }, [mode, idLote]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        nombre: nombreLote,
        longitud: parseFloat(longitud),
        latitud: parseFloat(latitud),
        fk_id_finca: parseInt(fincaFK)
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
            label="Nombre del Lote"
            className="w-80"
            id='nombre'
            name="nombre"
            value={nombreLote}
            onChange={(e) => setNombreLote(e.target.value)}
            required
            pattern="^[a-zA-Z\s]{1,20}$"
            title="El nombre del lote debe tener máximo 20 caracteres, y solo puede contener letras y espacios"
          />
        </div>
        <div className='py-2'>
          <Input
            className='w-80'
            type="number"
            label='Ingrese la longitud'
            id='longitud'
            name="longitud"
            value={longitud}
            onChange={(e) => setLongitud(e.target.value)}
            required={true}
            min={-180}
            max={180}
            step="any"
            title="La longitud es obligatoria y debe estar entre -180 y 180"
          />
        </div>
        <div className='py-2'>
          <Input
            className='w-80'
            type="number"
            label='Ingrese la latitud'
            id='latitud'
            name="latitud"
            value={latitud}
            onChange={(e) => setLatitud(e.target.value)}
            required={true}
            min={-80}
            max={90}
            step="any"
            title="La latitud es obligatoria y debe estar entre -80 y 90"
          />
        </div>
        <div className="py-2">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800"></span>
          <select
            className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            name="idfinca"
            value={fincaFK}
            onChange={(e) => setFincaFk(e.target.value)}
            required={true}
          >
            <option value="" hidden className="text-gray-600">
              Seleccionar Finca
            </option>
            {fincas.map(finca => (
              <option key={finca.id_finca} value={finca.id_finca}>
                {finca.nombre_finca}
              </option>
            ))}
          </select>
        </div>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
          <Button  type='submit' className='text-white bg-[#006000]'>
            {actionLabel}
          </Button>
        </ModalFooter>
      </div>
    </form>
  );
};

export default FormLotes;