import React from "react";
import { Tooltip } from "@nextui-org/react";
import Icon from "./Iconos";
import v from "../../styles/variables";

const ButtonDesactivar = ({ estado, onClick }) => {
  const handleClick = () => {
    onClick();
  };

  // Determinar el contenido del tooltip según el estado
  let tooltipContent = "";
  let tooltipColor = "";
  let iconComponent = null;
  let iconColorClass = estado === "activo" ? "text-danger" : "text-success";

  if (estado === "activo") {
    tooltipContent = "Desactivar";
    tooltipColor = "danger";
    iconComponent = <Icon icon={v.iconoDesactivar} className={iconColorClass} />;
  } else {
    tooltipContent = "Activar";
    tooltipColor = "success";
    iconComponent = <Icon icon={v.iconoActivar} className={iconColorClass} />;
  }

  return (
    <Tooltip color={tooltipColor} content={tooltipContent}>
      <span className={`py-2 font-semibold text-white rounded w-10 flex justify-center items-center ${iconColorClass}`} onClick={handleClick}>
        {iconComponent}
      </span>
    </Tooltip>
  );
};

export default ButtonDesactivar;
