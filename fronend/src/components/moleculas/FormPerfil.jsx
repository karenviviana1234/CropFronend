import React, { useEffect, useState } from 'react';
import axiosClient from '../axiosClient';
import Swal from 'sweetalert2';
import { ModalFooter, Button, Input } from "@nextui-org/react";

const FormPerfil = () => {
  const [perfil, setPerfil] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');


  useEffect(() => {

  const ObtenerDatos = async () => {
    try {
      const token = localStorage.getItem("token");
      const getURL = "http://localhost:3000/usuario/listarPerfil";
      const response = await axiosClient.get(getURL, { headers: { token: token } });
      console.log(response.data);
      setPerfil(response.data.data);
      setNombre(response.data.data.nombre); 
      setApellido(response.data.data.apellido);
      setCorreo(response.data.data.correo);
    } catch (error) {
      console.error("Error al obtener la información", error.response ? error.response.data : error.message);
    }
  };


    ObtenerDatos();
  }, []);

  const actualizarPerfil = async (e) => {
    e.preventDefault();
    if (!perfil) return; 
    const identificacion = perfil.identificacion; 
    try {
      const token = localStorage.getItem("token"); // Obtener el token desde localStorage
      const response = await axiosClient.put(
        `http://localhost:3000/usuario/actualizarPerfil/${identificacion}`,
        { nombre, apellido, correo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        Swal.fire('¡Informacion actualizada!', 'Tu informacion ha sido actualizado correctamente.', 'success');
        setPerfil({ nombre, apellido, correo });
      }
    } catch (error) {
      console.error('Error al actualizar la informacion:', error);
      Swal.fire('¡Error!', 'Hubo un problema al actualizar tu perfil. Inténtalo de nuevo más tarde.', 'error');
    }
  };

  if (!perfil) return null;

  return (
    <div>
      <form onSubmit={actualizarPerfil}>
        <div>
          <label>Nombres:</label>
          <Input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div>
          <label>Apellidos:</label>
          <Input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <Input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </div>
        <ModalFooter>
          <Button type='submit' className='bg-green text-white'>
            Guardar
          </Button>
        </ModalFooter>
      </form>
    </div>
  );
};

export default FormPerfil;