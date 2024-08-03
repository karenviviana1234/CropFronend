import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CambiarContra = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!newPassword || !confirmPassword) {
        setError('Por favor, ingrese sus contraseñas.');
        return;
      }
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    navigate('/iniciosesion');
  };

return (
  <div className="flex flex-col md:flex-row justify-center items-center h-screen">
    <div className="flex flex-col bg-white border-1 border-green-700 rounded-lg p-8 w-full max-w-md md:mr-4">
        
      <h2 className="text-2xl font-bold mb-4">Cambiar contraseña</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nueva contraseña:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-700 rounded-md focus:border-green-700 p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Confirmar contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          Cambiar contraseña
        </button>
      </form>
      
     
    </div>
  </div>
);
};

export default CambiarContra;