// ButtonActualizar.jsx (no changes needed)
import React from 'react';

const ButtonActualizar = ({ onClick }) => {
  return (
    <button
    
      className="px-4 py-2  bg-gray-600 text-white font-semibold border-2 border-white rounded-lg hover:bg-[#535e5c]"
      onClick={onClick}
    >
      Editar
    </button>
  );
};

export default ButtonActualizar;