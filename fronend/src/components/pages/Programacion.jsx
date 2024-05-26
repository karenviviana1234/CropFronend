import React, { useEffect, useState } from 'react'
import './CssTablas.css'
import Header from '../organismos/Header/Header.jsx';
import ProgramacionModal from '../templates/ProgramacionModal.jsx';
import AccionesModal from '../organismos/ModalAcciones.jsx';
import axios from 'axios';
import Ejemplo from '../organismos/TableProgramacion.jsx';
import Swal from 'sweetalert2';

export function Programacion() {
    const [sidebarAbierto, setSidebarAbierto] = useState(false);

    const toggleSidebar = () => {
        setSidebarAbierto(!sidebarAbierto);
    };

    const [modalOpen, setModalOpen] = useState(false)
    const [modalAcciones, setModalAcciones] = useState(false)
    const [mode, setMode] = useState('create')
    const [initialData, setInitialData] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const [programacion, setProgramacion] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const token = localStorage.getItem('token')

    const fetchData = async () => {
        try {
            const getURL = 'http://localhost:3000/listarProgramacion'
            axios.get(getURL, { headers: { token: token } }).then((response) => {
                console.log(response.data)
                setProgramacion(response.data)
            })

        } catch (error) {
            console.log('Error en el servidor' + error);
        }
    }

    const data = [
        {
            uid: 'id_programacion',
            name: 'Id',
            sortable: true
        },
        {
            uid: 'fecha_inicio',
            name: 'Fecha Inicio',
            sortable: true
        },
        {
            uid: 'fecha_fin',
            name: 'Fecha Fin',
            sortable: true
        },
        {
            uid: 'usuario',
            name: 'Usuario',
            sortable: true
        },
        {
            uid: 'nombre_actividad',
            name: 'Actividad',
            sortable: true
        },
        {
            uid: 'nombre_variedad',
            name: 'Variedad',
            sortable: true
        },
        {
            uid: 'lote',
            name: 'Lote',
            sortable: true
        },
        {
            uid: 'estado',
            name: 'Estado',
            sortable: true
        },
        {
            uid: 'actions',
            name: "Acciones",
            sortable: true
        }
    ];


    const handleDesactivar = (id_programacion) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Esto podrá afectar a tus programaciones!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, estoy seguro!"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.put(`http://localhost:3000/estadoProgramacion/${id_programacion}`, null, { headers: { token: token } })
                        .then((response) => {
                            if (response.status === 200) {
                                const nuevoEstado = response.data.message;
                                fetchData();
                                Swal.fire({
                                    title: "¡Actualizado!",
                                    text: `${nuevoEstado}`,
                                    icon: "success"
                                });
                            } else {
                                alert('Error al actualizar');
                            }
                        });
                } catch (error) {
                    alert('Error con el servidor');
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

    const id = localStorage.getItem('idUser')

    const handleSubmit = async (datosForm, e) => {
        console.log(datosForm);
        e.preventDefault()

        try {
            if (mode === 'create') {
                const postURL = 'http://localhost:3000/registrarProgramacion'

                await axios.post(postURL, datosForm, { headers: { token: token } }).then((response) => {
                    console.log(response)
                    if (response.status == 200) {
                        fetchData()
                        Swal.fire({
                            position: "center", // Posición centrada
                            icon: "success",
                            title: "Programación registrada con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
            } else if (mode === 'update') {
                const updateURL = `http://localhost:3000/actualizarProgramacion/${id}`
                axios.put(updateURL, datosForm, { headers: { token: token } }).then((response) => {
                    console.log(response);

                    if (response.status == 200) {
                        fetchData()
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Se actualizó con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        alert('Error al actualizar')
                    }
                })
            }
            setModalOpen(false)
        } catch (error) {
            console.log('Error en el servidor ' + error)
            alert('Error, intente de nuevo')
            /* console.log(error.response.status) */
        }
    }
    const handleToggle = (mode, initialData) => {
        setInitialData(initialData)
        setModalOpen(true)
        setMode(mode)
    }
    return (
        <>
            <div className={`contenido ${sidebarAbierto ? 'contenido-extendido' : ''}`}>
              {/*   <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} /> */}

                <AccionesModal
                    isOpen={modalAcciones}
                    onClose={() => setModalAcciones(false)}
                    label={mensaje}
                />
                <ProgramacionModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={mode === 'create' ? 'Registrar lote' : 'Actualizar lote'}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                    initialData={initialData}
                    handleSubmit={handleSubmit}
                    mode={mode}
                    setModalOpen={setModalOpen}
                />
                <Ejemplo
                    clickDesactivar={handleDesactivar}
                    clickEditar={() => handleToggle('update', id)}
                    clickRegistrar={() => handleToggle('create')}
                    data={data}
                    programaciones={programacion} /*  */
                />
            </div>
        </>
    )
}