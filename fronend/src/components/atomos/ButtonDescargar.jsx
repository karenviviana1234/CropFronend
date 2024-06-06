import React from 'react';
import Icon from './Iconos'; 
import v from '../../styles/variables';
import {Tooltip} from "@nextui-org/react"


const ButtonDescargar = ({ onClick }) => {
  return (
    <Tooltip content="PDF">

<button className="font-bold py-2 px-4 rounded" onClick={onClick}> 
     <Icon icon={v.iconoDescargar} className=" text-grey-500" />
    </button>
    </Tooltip>

  );
};

export default ButtonDescargar;