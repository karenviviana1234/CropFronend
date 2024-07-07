import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import v from '../../styles/variables';

const Recuperarcontra = () => {
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!correo) {
      setError('Por favor, ingrese su correo.');
      return;
    }

    navigate('/cambia', { state: { correo } });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen">
    <div className="flex flex-col bg-white border-1 border-green-700 rounded-lg p-8 w-full max-w-md md:mr-4">
        <h2 className="text-2xl font-bold mb-5">Recuperar contraseña</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-2">Correo electrónico:</label>
            <input
              type="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full border border-gray-700 rounded-md focus:border-green-700  p-2"
              />
          </div>
      
          {error && (
            <div className="text-red-500 font-medium">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-green text-white font-medium py-2 px-4 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Recuperarcontra;