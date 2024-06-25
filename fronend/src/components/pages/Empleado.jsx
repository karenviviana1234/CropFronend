import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ButtonDesactivar from "../atomos/ButtonDesactivar";
import HeaderEmpleado from "../organismos/Header/HeaderEmpleado";
import { FaSistrix } from "react-icons/fa6";

const Empleado = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [mensaje, setMensaje] = useState('');
  const [modalAcciones, setModalAcciones] = useState(false);
  const [empleado, setEmpleado] = useState([]);
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [formData, setFormData] = useState({ observacion: '' });
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);


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
      setOriginalData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleFilter = (event) => {
    const filterValue = event.target.value.toLowerCase();
    const newData = originalData.filter(row => {
      return row.nombre_actividad.toLowerCase().includes(filterValue);
    });
    setFilteredData(newData);
  };
  useEffect(() => {
    setOriginalData(empleado);
  }, [empleado]);



  useEffect(() => {
    ObtenerDatos();
  }, []);

  const handleSubmit = async (e, id_actividad) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const baseURL = `http://localhost:3000/EmpleadoMood/Registrar/${id_actividad}`;
      await axios.put(baseURL, formData, { headers: { token: token } });
      setMensaje('Observación Registrada exitosamente');
      setModalAcciones(true);
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

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
          const token = localStorage.getItem("token");
          axios
            .put(`http://localhost:3000/cambioestado/${id_actividad}`, null, { headers: { token: token } })
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
      <HeaderEmpleado toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />

      {/* hola */}
      <div className="mt-20 ml-40">
        <div className='w-50 bg-[#E5E5E5] flex items-center rounded-lg'>
          <input
            className='w-full p-2 bg-[#E5E5E5] text-black rounded-lg border'
            type="text"
            onChange={handleFilter}
            placeholder='Buscar'
          />
          <FaSistrix size={25} style={{ marginRight: 10 }} />
        </div>
      </div>

      <div className="flex flex-wrap ml-36">

        {empleado.map((empleado, index) => (

          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden m-4 w-90 flex justify-center">

            <div className="p-6">
              <p className="text-lg font-normal">Identificación: {empleado.identificacion}</p><br />
              <p className="text-lg font-normal mb-1">Nombre: {empleado.nombre}</p>
              <p className="text-lg font-normal">Fecha Inicio: {empleado.fecha_inicio}</p>
              <p className="text-lg font-normal">Fecha Fin: {empleado.fecha_fin}</p>
              <p className="text-lg font-normal">Variedad: {empleado.nombre_variedad}</p>
              <p className="text-lg font-normal">Actividad: {empleado.nombre_actividad}</p>
              <p className="text-lg font-normal">Tiempo: {empleado.tiempo}</p>
              <p className="text-lg font-normal">Estado: {empleado.estado}</p>

              <form onSubmit={(e) => handleSubmit(e, empleado.id_actividad)}>
                <div className="mb-4">
                  <label htmlFor="observacion" className="font-normal mb-1">
                    Observación:
                  </label>
                  <div className='py-2'>
                    <input
                      className='w-60 border'
                      type="text"
                      label='Ingrese la observacion'
                      id='observacion'
                      name="observacion"
                      value={formData.observacion}
                      onChange={(e) => setFormData({ ...formData, observacion: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex col">
                  <button
                    type="submit"
                    className="mr-5 bg-[#006000] hover:bg-[#153815] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Enviar
                  </button>
                  <br />
                  <button
                    onClick={() => Desactivar(empleado.id_actividad)}
                    className="bg-[#006000] hover:bg-[#153815] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Estado
                  </button>
                </div>
              </form>

              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Empleado;