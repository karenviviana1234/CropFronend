import React, { useEffect, useState } from 'react';
import { Input } from "@nextui-org/react";



const FormEmpleado = ({ actionLabel, handleSubmit, initialdata, mode, onClose }) => {

  const [observacion, setObservacion] = useState('')




  useEffect(() => {
    setObservacion(observacion.observacion)
  }, [])

  // En FormEmpleado.jsx
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        observacion: observacion,
      };
      handleSubmit(e, formData); // Pasar e como primer argumento
    } catch (error) {
      console.log(error);
      alert('Hay un error en el sistema' + error);
    }
  };


  return (
    <>
      <form method='post' onSubmit={handleFormSubmit}>
        <div className=' align-items-center '>
          <div className=''>
            <Input
              type="text"
              label="Observacion"
              className="w-80"
              id='observacion'
              name="observacion"
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              required={true}
            />
          </div>
          {/* <div className='flex col '>
            <button type="submit"
              className=" bg-[#006000] hover:bg-[#153815] text-white font-bold py-2 px-4 m rounded focus:outline-none focus:shadow-outline"> Enviar</button>
          </div> */}
        </div>
      </form>
    </>
  );
};

export default FormEmpleado;