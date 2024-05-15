// ButtonDesactivar.jsx
import React from 'react';

const ButtonDesactivar = ({ estado, onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button

      className={` py-2 font-semibold text-white rounded ${estado === "activo" ? "bg-[#E10032] px-3" : "bg-[#006000] px-4"   
    }`}
      onClick={handleClick}
    >
      {estado === 'activo' ? 'Desactivar' : 'Activar'}
    </button>
  );
};

export default ButtonDesactivar;