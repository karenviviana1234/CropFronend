import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import BotonRegistrar from '../atomos/BotonRegistrar.jsx'
import DataTableComponent from '../organismos/Tablas.jsx';
import axios from 'axios';
import Header from '../organismos/Header/Header.jsx';
import UsuarioModal from '../templates/TempleteUsuarios.jsx';
import ButtonActualizar from '../atomos/ButtonActualizar.jsx';
import ButtonDesactivar from '../atomos/ButtonDesactivar.jsx';
import { FaSistrix } from "react-icons/fa6";

export function Usuario() {
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('create');
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            name: 'Identificacion',
            selector: row => row.identificacion,
            sortable: true
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'Apellido',
            selector: row => row.apellido,
            sortable: true
        },
        {
            name: 'Correo',
            selector: row => row.correo,
            sortable: true
        },
        {
            name: 'Rol',
            selector: row => row.rol,
            sortable: true
        },
        {
            name: 'Estado',
            selector: row => row.estado,
            sortable: true
        },
        {
            name: 'Acciones',
            cell: row => <>
                <ButtonActualizar variant="primary" click={() => handleToggle('update', row)} />
                <ButtonDesactivar variant="danger" click={() => handleDesactivar(row.identificacion)} />
            </>
        }
    ];

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const baseURL = 'http://localhost:3000/usuarios/listarUsuario';
            const response = await axios.get(baseURL, { headers: { token: token } });
            console.log(response.data)
            setOriginalData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    const handleFilter = (event) => {
        const newData = originalData.filter(row => {
            const name= row.nombre.toLowerCase().includes(event.target.value.toLowerCase());
            const id= row.identificacion.toString().includes(event.target.value);
            return name || id;
        });
        setFilteredData(newData);
    };


    const handleDesactivar = async (identificacion) => {
        console.log("ID del usuario a desactivar:", identificacion);
        try {
            const token = localStorage.getItem('token');
            const baseURL = `http://localhost:3000/usuarios/desactivarUsuario/${identificacion}`;
            await axios.put(baseURL, null, { headers: { token: token } });
            console.log("se desactivo correctamente el usuario");
            alert('Usuario desactivado con éxito');
            fetchData();
        } catch (error) {
            console.error('Error al desactivar usuario:', error);
            alert('Error al desactivar usuario');
        }
    };

    const handleToggle = (mode, user) => {
        setMode(mode);
        setSelectedUser(user);
        setModalOpen(true);
    };

    const handleSubmit = async (formData, e) => {
        console.log(formData);
        try {
            const token = localStorage.getItem('token');
            if (mode === 'create') {
                const baseURL = 'http://localhost:3000/usuarios/registrarUsuario';
                await axios.post(baseURL, formData, { headers: { token: token } });
                alert('Usuario registrado exitosamente');
                fetchData();
                setModalOpen(false);
            } else if (mode === 'update' && selectedUser) {
                await actualizar(selectedUser.identificacion, formData);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };

    const actualizar = async (identificacion, formData) => {
        console.log(identificacion);
        try {
            const token = localStorage.getItem('token');
            const baseURL = `http://localhost:3000/usuarios/actualizarusuario/${identificacion}`;
            await axios.put(baseURL, formData,{ headers: { token: token }});
            alert('Usuario actualizado exitosamente');
            setModalOpen(false);
            fetchData();
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        }
    };

    return (
        <>
            <div>
                
                <div className='w-10/12 ml-28'>
                    <div className='flex justify-center items-center text-center'>
                        <div className='w-96 bg-[#E5E5E5] flex items-center m-8 rounded-lg border-black'>
                            <input className='w-full p-2 bg-[#E5E5E5] text-black rounded-lg border' type="text" 
                            onChange={handleFilter}
                             placeholder='Buscar' 
                             />
                            <FaSistrix size={25} style={{ marginRight: 10 }} />
                        </div>
                    </div>
                    <BotonRegistrar  click={() => handleToggle('create')} />
                    <UsuarioModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        handleSubmit={handleSubmit}
                        selectedUser={selectedUser}
                        actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                    />

                    <div style={{ height: '80vh', width: '100%' }}> 
                        <DataTableComponent
                            columns={columns}
                            data={Array.isArray(filteredData) ? filteredData : []}
                            title="Usuarios registrados"
                            fixedHeader
                            pagination
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5, 10, 15]}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}