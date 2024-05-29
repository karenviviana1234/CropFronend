// ButtonActualizar.jsx
import React from 'react';
import Icon from './Iconos'; // Añadida la importación de Icon
import v from '../../styles/variables';
import {Tooltip} from "@nextui-org/react"

const ButtonActualizar = ({ onClick }) => {
  return (
    <Tooltip content="Editar">
    <button className="font-bold py-2 px-4 rounded" onClick={onClick}>
      <Icon icon={v.iconoEditar} className=" text-grey-500" />
    </button>
    </Tooltip>
  );
};

export default ButtonActualizar;
