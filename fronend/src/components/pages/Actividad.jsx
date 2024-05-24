import React, { useEffect, useState } from 'react';
import './CssTablas.css'
import Header from '../organismos/Header/Header.jsx';
import axios from 'axios';
import AccionesModal from '../organismos/ModalAcciones.jsx';
import Ejemplo from '../organismos/TableActividad.jsx';
import ActividadModal from '../templates/ActividadModal.jsx';
import Swal from 'sweetalert2';
//confirmacion yaa

function Actividad() {

    const [sidebarAbierto, setSidebarAbierto] = useState(false);
    
    const toggleSidebar = () => {
      setSidebarAbierto(!sidebarAbierto);
    };
    const token = localStorage.getItem('token');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAcciones, setModalAcciones] = useState(false);
    const [mode, setMode] = useState('create');
    const [initialData, setInitialData] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [actividad, setActividad] = useState([]);
    const [idActividad, setIdActividad] = useState(null);
    /* useEffect(() => {
        fetchData();
    }, [token]);
 */

    useEffect(() => {
        fetchData()
    }, [])
    
    const fetchData = async () => {
        try {
            const getURL = 'http://localhost:3000/listara';
            axios.get(getURL, { headers: { token: token } }).then((response) => {
                console.log(response.data)
                setActividad(response.data)
            });

        } catch (error) {
            console.log('Error en el servidor ' + error);
        }
    };

    const data = [
        {
            uid: 'id_actividad',
            name: 'Id',
            sortable: true
        },
        {
            uid: 'nombre_actividad',
            name: 'actividad',
            sortable: true
        },
        {
            uid: 'tiempo',
            name: 'tiempo',
            sortable: true
        },
        {
            uid: 'observaciones',
            name: 'observaciones',
            sortable: true
        },
        {
            uid: 'valor_actividad',
            name: 'valor_actividad',
            sortable: true
        },
        {
            uid: 'nombre_variedad',
            name: 'variedad',
            sortable: true
        },
        {
            uid: 'nombre_recursos',
            name: 'tipo_recursos',
            sortable: true
        },
        {
            uid: 'observacion',
            name: 'observacion',
            sortable: true
        },
        {
            uid: 'estado',
            name: 'estado',
            sortable: true
        },
        {
            uid: 'actions',
            name: 'Acciones',
            sortable: true
        }
    ];

    const id = localStorage.getItem('idUser');
    const peticionDesactivar = (id_actividad) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Esto podrá afectar a tus demas tablas!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#006000",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, estoy seguro!"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.put(`http://localhost:3000/Desactivara/actividad/${id_actividad}`, null, { headers: { token: token } })
                        .then((response) => {
                            console.log(response.data);
                            const mensaje = response.data.message;
                            if (response.status === 200) {
                                const index = mensaje.indexOf('cambiado a');
                                if (index !== -1) {
                                    const nuevoEstado = mensaje.substring(index + 10); // 10 es la longitud de "cambiado a "
                                    fetchData();
                                    Swal.fire({
                                        position: "center", // Posición centrada
                                        icon: "success",
                                        title: `Estado de la actividad cambiado a ${nuevoEstado}`,
                                        showConfirmButton: false,
                                        timer: 1400
                                    });
                                } else {
                                    alert('Error: El mensaje recibido no tiene el formato esperado');
                                }
                            } else {
                                alert('Error');
                            }
                        });
                } catch (error) {
                    alert('Error del servidor ' + error);
                }
            } else {
                Swal.fire({
                    title: "Cancelado",
                    text: "La operación ha sido cancelada",
                    icon: "info"
                });
            }
        });
    };
    
    const handleSubmit = async (datosForm, e) => {
        console.log(datosForm);
        e.preventDefault();

        try {
            if (mode === 'create') {
                const postURL = 'http://localhost:3000/Registrara';
                
                await axios.post(postURL, datosForm, { headers: { token: token } }).then((response) => {
                    console.log(response)
                if (response.status === 200) {
                    fetchData();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Actividad registrada con éxito",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
             }) 
            } else if (mode === 'update') {
                const updateURL = `http://localhost:3000/Actualizara/actividad/${id}`;
                axios.put(updateURL, datosForm, {headers: {token: token}} ).then((response) => {
                    console.log(response);

                if (response.status === 200) {
                    fetchData();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Se actualizó la actividad con éxito",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    throw new Error('Error al actualizar')
                }
            })
        }    
            setModalOpen(false);
        } catch (error) {
            console.log('Error en la solicitud: ', error.message);
            alert('Se produjo un error: ' + error.message);
        }
    };

    const handleToggle = (mode, initialData, id_actividad) => {
        setInitialData(initialData);
        setModalOpen(true);
        setMode(mode);
        setIdActividad(id_actividad)
    };

    return (
        <div className={`contenido ${sidebarAbierto ? 'contenido-extendido' : ''}`}>
        <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
    
        <div>
           {/*  <Header title="Actividad" /> */}
            <div className='w-full max-w-[90%] ml-28 items-center p-10'>
                <AccionesModal
                    isOpen={modalAcciones}
                    onClose={() => setModalAcciones(false)}
                    label={mensaje}
                />
                <ActividadModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={mode === 'create' ? 'Registrar actividad' : 'Actualizar actividad'}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                    initialData={initialData}
                    handleSubmit={handleSubmit}
                    mode={mode}
                    setModalOpen={setModalOpen}
                />
                <Ejemplo
                    clickDesactivar={peticionDesactivar}
                    clickEditar={(id_actividad) => handleToggle('update',null, id_actividad)}
                    clickRegistrar={() => handleToggle('create',null, null)}
                    data={data}
                    actividad={actividad}
                />
            </div>
        </div>
    </div>
    );
}
export default Actividad;