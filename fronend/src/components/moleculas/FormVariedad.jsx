import React, { useRef, useEffect, useState, useContext } from 'react';
import { ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import VariedadesContext from './../../context/VariedadContext'

const FormVariedades = ({ mode, initialData, handleSubmit, onClose, actionLabel }) => {

  const [tipoCultivo, setTipoCultivo] = useState([]);

  const [nombreVariedad, setNombreVariedad] = useState('')
  const [tipoCultivoOp, setTipoCultivoOp] = useState('')

  const { idVariedad } = useContext(VariedadesContext)


  // Supongamos que hacemos una solicitud a la base de datos
  useEffect(() => {
    // Lógica para obtener los datos del enum desde la base de datos
    const enumData = [
      { value: 'alimentarios', label: 'Alimentarios' },
      { value: 'textiles', label: 'Textiles' },
      { value: 'oleaginosos', label: 'Oleaginosos' },
      { value: 'ornamentales', label: 'Ornamentales' },
      { value: 'industriales', label: 'Industriales' }
    ];
    setTipoCultivo(enumData);
  }, []);
  /*  */
  useEffect(() => {
    if (mode == 'update' && idVariedad) {
      setNombreVariedad(idVariedad.nombre_variedad)
      setTipoCultivoOp(idVariedad.tipo_cultivo)

    }
  }, [mode, idVariedad])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        nombre_variedad: nombreVariedad,
        tipo_cultivo: tipoCultivoOp,

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
              type="text"
              label="Nombre de la variedad"
              className="w-80"
              id='nombrevariedad'
              name="nombrevariedad"
              value={nombreVariedad}
              onChange={(e) => setNombreVariedad(e.target.value)}
              required
              pattern="^[a-zA-Z\s]{1,20}$"
              title="El nombre de la variedad debe tener máximo 20 caracteres, y solo puede contener letras y espacios"
            />
          </div>
          <div className="py-2">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800"></span>
          <select
            className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              label='tipo de cultivo'
              name='tipo_cultivo'
              value={tipoCultivoOp}
              onChange={(e) => setTipoCultivoOp(e.target.value)}
               required={true}
            >
                  <option value="" hidden className="text-gray-600">
              Seleccionar Finca
            </option>
              {tipoCultivo.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
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
    </>
  );
};

export default FormVariedades;
