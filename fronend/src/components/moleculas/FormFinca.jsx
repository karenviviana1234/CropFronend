import React, { useEffect, useState, useContext } from 'react';
import { ModalFooter, Button, Input } from '@nextui-org/react';
import FincasContext from './../../context/FincaContext';

const FormFinca = ({ actionLabel, handleSubmit, mode, onClose }) => {
  const [nombreFinca, setNombreFinca] = useState('');
  const [longitud, setLongitud] = useState('');
  const [latitud, setLatitud] = useState('');
  const { idFinca } = useContext(FincasContext);

  useEffect(() => {
    if (mode === 'update' && idFinca) {
      setNombreFinca(idFinca.nombre_finca);
      setLongitud(idFinca.longitud);
      setLatitud(idFinca.latitud);
    }
  }, [mode, idFinca]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        nombre_finca: nombreFinca,
        longitud: parseFloat(longitud),
        latitud: parseFloat(latitud)
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
          className="w-80"
          type="text"
          label='Ingrese el nombre de la finca'
          id='nombreFinca'
          name="nombre_finca"
          value={nombreFinca}
          onChange={(e) => setNombreFinca(e.target.value)}
          required
          pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{1,30}$"
          title="El nombre de la finca debe tener máximo 20 caracteres, y solo puede contener letras y espacios"
        />
      </div>
        <div className='py-2'>
          <Input
            className="w-80"
            type="number"
            label='Ingrese la longitud'
            id='longitud'
            name="longitud"
            value={longitud}
            onChange={(e) => setLongitud(e.target.value)}
            required
            min="-180"
            max="180"
            step="any"
            title="La longitud debe ser un número válido entre -180 y 180"
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
            required
            min="-190"
            max="190"
            step="any"
            title="La latitud debe ser un número válido entre -190 y 190"
          />
        </div>
        <ModalFooter>
          <Button
            color='danger'
            variant='flat'
            onPress={onClose}
          >
            Cerrar
          </Button>
          <Button
            type='submit' className='text-white bg-[#006000]'
          >
            {actionLabel}
          </Button>
        </ModalFooter>
      </div>
    </form>
  );
};

export default FormFinca;
