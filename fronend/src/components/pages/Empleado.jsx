import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ButtonDesactivar from "../atomos/ButtonDesactivar";
import HeaderEmpleado from "../organismos/Header/HeaderEmpleado";

const Empleado = () => {
  const [empleado, setEmpleado] = useState([]);
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  const toggleSidebar = () => {
    setSidebarAbierto(!sidebarAbierto);
  };

  const ObtenerDatos = async () => {
    try {
      const token = localStorage.getItem("token");
      const getURL = "http://localhost:3000/Listar";
      const response = await axios.get(getURL, { headers: { token: token } });
      console.log(response.data);
      setEmpleado(response.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    ObtenerDatos();
  }, []);

  const Desactivar = (id_actividad) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esto podrá afectar a tus lotes!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#006000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, estoy seguro!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .put(`http://localhost:3000/cambioestado/${id_actividad}`, null)
            .then((response) => {
              if (response.status === 200) {
                const nuevoEstado = response.data.message;
                ObtenerDatos();
                Swal.fire({
                  title: "¡Actualizado!",
                  text: `${nuevoEstado}`,
                  icon: "success",
                });
              }
            });
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      } else {
        Swal.fire({
          title: "Cancelado",
          text: "La operación ha sido cancelada",
          icon: "info",
        });
      }
    });
  };

  return (
    <div className={`contenido ${sidebarAbierto ? "contenido-extendido" : ""}`}>
      <HeaderEmpleado
        toggleSidebar={toggleSidebar}
        sidebarAbierto={sidebarAbierto}
      />
      <h1 className="text-3xl font-bold mb-5 mt-5 text-center text-white">Listar Empleados</h1>
      <div className="flex flex-wrap ml-36">
        {empleado.map((empleado, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden m-4 w-72  flex justify-center"
          >
            <div className="p-6">
              <p className="text-lg font-semibold">{empleado.identificacion}</p><br />
              <p className="text-lg font-medium mb-1" style={{fontSize:'23px'}}>{empleado.nombre}</p>
              <p className="text-lg font-medium">{empleado.fecha_inicio}</p>
              <p className="text-lg font-medium">{empleado.fecha_fin}</p>
              <p className="text-lg font-medium">{empleado.nombre_variedad}</p>
              <p className="text-lg font-medium">{empleado.nombre_actividad}</p>
              <p className="text-lg font-medium">{empleado.id_actividad} </p>
              <p className="text-lg font-medium">{empleado.tiempo}</p>
              <p className="text-lg font-medium">{empleado.observaciones}</p>
              <ButtonDesactivar
                onClick={() => Desactivar(empleado.id_actividad)}
              />{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Empleado;
