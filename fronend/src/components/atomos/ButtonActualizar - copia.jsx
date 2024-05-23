// ButtonActualizar.jsx
import React from 'react';
import Icon from './Iconos'; // Añadida la importación de Icon
import v from '../../styles/variables';

const ButtonActualizar = ({ onClick }) => {
  return (
    <button className="font-bold py-2 px-4 rounded" onClick={onClick}>
      <Icon icon={v.iconoEditar} className=" text-grey-500" />
    </button>
  );
};

export default ButtonActualizar;
