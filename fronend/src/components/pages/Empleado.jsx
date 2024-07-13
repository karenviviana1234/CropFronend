import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderEmpleado from "../organismos/Header/HeaderEmpleado";
import FormEmpleado from "../moleculas/FormEmpleado.jsx";
import { Input, Card, CardHeader } from "@nextui-org/react";
import { FaSistrix } from "react-icons/fa6";
import { SearchIcon } from "./../NextUI/SearchIcon.jsx";

const Empleado = () => {
  const [filterValue, setFilterValue] = useState("");
  const [empleado, setEmpleado] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [formData, setFormData] = useState({ observacion: '' });

  const ObtenerDatos = async () => {
    try {
      const token = localStorage.getItem("token");
      const getURL = "http://localhost:3000/Listar";
      const response = await axios.get(getURL, { headers: { token: token } });
      const activeData = response.data.filter(item => item.estado !== 'inactivo');
      setEmpleado(activeData);
      setFilteredData(activeData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleFilter = (event) => {
    const filterValue = event.target.value.toLowerCase();
    const newData = empleado.filter(row => row.nombre_variedad.toLowerCase().includes(filterValue));
    setFilteredData(newData);
  };

  useEffect(() => {
    ObtenerDatos();
  }, []);

  const handleSubmitObservacion = async (e, formData, idActividad, estado) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const baseURL = `http://localhost:3000/Registrar/${idActividad}`;
      await axios.put(baseURL, formData, { headers: { token: token } });
      Swal.fire({
        title: "Éxito",
        text: "Observación registrada exitosamente",
        icon: "success",
      });
      setFormData(formData); // Actualizar el estado de formData con la observación enviada
      ObtenerDatos();
    } catch (error) {
      console.error('Error al procesar la solicitud:', error.response?.data || error.message);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Error al procesar la solicitud",
        icon: "error",
      });
    }
  };

  const handleIniciarTerminar = async (idActividad, estado) => {
    if (estado === "activo") {
      try {
        const token = localStorage.getItem("token");
        await axios.put(`http://localhost:3000/cambioestado/${idActividad}`, null, { headers: { token: token } });
        Swal.fire({
          title: "¡Actividad Iniciada!",
          text: "La actividad ha sido iniciada correctamente.",
          icon: "success",
        });
        ObtenerDatos();
      } catch (error) {
        console.error("Error al iniciar la actividad:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al iniciar la actividad",
          icon: "error",
        });
      }
    } else if (estado === "proceso") {
      if (!formData.observacion) {
        Swal.fire({
          title: "Error",
          text: "Debes proporcionar una observación antes de terminar la actividad.",
          icon: "error",
        });
        return;
      }
      try {
        const token = localStorage.getItem("token");
        await axios.put(`http://localhost:3000/cambioestado/${idActividad}`, null, { headers: { token: token } });
        Swal.fire({
          title: "¡Actividad Terminada!",
          text: "La actividad ha sido terminada correctamente.",
          icon: "success",
        });
        setFormData({ observacion: '' }); // Limpiar el formulario después de terminar
        ObtenerDatos();
      } catch (error) {
        console.error("Error al terminar la actividad:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al terminar la actividad",
          icon: "error",
        });
      }
    } else if (estado === "terminado") {
      Swal.fire({
        title: "Error",
        text: "La actividad ya ha sido terminada.",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "No se puede iniciar la actividad si no está activa.",
        icon: "error",
      });
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="contenido">
      <HeaderEmpleado />

      <div className="mt-4 ml-4">
        <Input
          isClearable
          className="w-full sm:max-w-[44%] bg-[#f4f4f5] rounded"
          placeholder="Buscar..."
          startContent={<SearchIcon />}
          value={filterValue}
          onChange={handleFilter}
        />
        <FaSistrix size={25} style={{ marginRight: 10 }} />
      </div>

      <div className="flex flex-wrap ml-4">
        {filteredData.map((actividad, index) => (
          <Card className="py-4 m-4 mx-auto" key={index}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-lg">Identificación: {actividad.identificacion}</p>
              <p className="text-lg">Nombre: {actividad.nombre}</p>
              <p className="text-lg">Fecha Inicio: {formatDate(actividad.fecha_inicio)}</p>
              <p className="text-lg">Fecha Fin: {formatDate(actividad.fecha_fin)}</p>
              <p className="text-lg">Variedad: {actividad.nombre_variedad}</p>
              <p className="text-lg">id actividad: {actividad.id_actividad}</p>
              <p className="text-lg">Actividad: {actividad.nombre_actividad}</p>
              <p className="text-lg">Tiempo: {actividad.tiempo}</p>
              <p className="text-lg">Estado: {actividad.estado}</p>

              {actividad.estado === "proceso" && (
                <FormEmpleado
                  actionLabel="Enviar Observación"
                  handleSubmit={(e, formData) => handleSubmitObservacion(e, formData, actividad.id_actividad, actividad.estado)}
                  initialData={{ observacion: formData.observacion }}
                />
              )}

              {(actividad.estado === "activo" || actividad.estado === "proceso") && (
                <div className="mt-4">
                  <button
                    onClick={() => handleIniciarTerminar(actividad.id_actividad, actividad.estado)}
                    className="mr-5 bg-[#006000] hover:bg-[#153815] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {actividad.estado === "activo" ? "Iniciar Actividad" : "Terminar Actividad"}
                  </button>
                </div>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Empleado;
