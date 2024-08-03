import React, { useState, useEffect } from 'react';
import { Input } from "@nextui-org/react";

const FormEmpleado = ({ actionLabel, handleSubmit, initialData }) => {
  const [observacion, setObservacion] = useState('');

  useEffect(() => {
    if (initialData) {
      setObservacion(initialData.observacion || '');
    }
  }, [initialData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { observacion };
      handleSubmit(e, formData); // Aquí se pasa formData como argumento
    } catch (error) {
      alert('Hay un error en el sistema: ' + error);
    }
  };

  return (
    <form method='post' onSubmit={handleFormSubmit}>
      <div className='ml-1 align-items-center '>
        <div className='py-2'>
          <Input
            type="text"
            label="Observación"
            className="w-80"
            id='observacion'
            name="observacion"
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="mr-5 bg-[#006000] hover:bg-[#153815] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {actionLabel || "Enviar"}
        </button>
      </div>
    </form>
  );
};

export default FormEmpleado;