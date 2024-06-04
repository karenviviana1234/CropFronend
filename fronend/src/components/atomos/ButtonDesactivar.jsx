// ButtonDesactivar.jsx
import React from 'react';
import Icon from './Iconos';
import v from '../../styles/variables';
import {Tooltip} from "@nextui-org/react"

const ButtonDesactivar = ({ estado, onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <Tooltip content="Estado">
    <button
      className={`py-2 font-semibold text-white rounded w-10 flex justify-center items-center ${estado === "activo" ? "text-danger" : "text-success"} `}
      onClick={handleClick}
    >
      <Icon icon={estado === 'activo' ? v.iconoDesactivar : v.iconoActivar} className="mr-1" />
      {estado === 'activo' ? '' : ''}
    </button>
    </Tooltip>
  );
};

export default ButtonDesactivar;
