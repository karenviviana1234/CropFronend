
import React, { useEffect, useState } from 'react';
import './CssTablas.css'
import Header from '../organismos/Header/Header.jsx';
import FincaModal from '../templates/FincaModal.jsx';
import AccionesModal from '../organismos/ModalAcciones.jsx';
import axios from 'axios';
import Ejemplo from '../organismos/TableFinca.jsx';
import Swal from 'sweetalert2';
//confirmacion yaa

function Finca() {

    const [sidebarAbierto, setSidebarAbierto] = useState(false);
    
    const toggleSidebar = () => {
      setSidebarAbierto(!sidebarAbierto);
    };

    const [modalOpen, setModalOpen] = useState(false)
    const [modalAcciones, setModalAcciones] = useState(false)
    const [mode, setMode] = useState('create')
    const [initialData, setInitialData] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const [finca, setFinca] = useState([])
    const [idFinca, setIdFinca] = useState(null); // Nuevo estado para almacenar el id_finca a actualizar

    useEffect(() => {
        fetchData()
    }, [])

    const token = localStorage.getItem('token');

    const fetchData = async () => {
        try {
            const getURL = 'http://localhost:3000/finca/listarFinca'
            const response = await axios.get(getURL, { headers: { token: token } });
            console.log(response.data)
            setFinca(response.data)
        } catch (error) {
            console.log('Error en el servidor' + error);
        }
    }

    const data = [
        {
            uid: 'id_finca',
            name: 'Id',  // El titulo de los id
            sortable: true
        },
        {
            uid: 'nombre_finca',
            name: 'Nombre finca',
            sortable: true
        },
        {
            uid: 'longitud',
            name: 'Longitud',
            sortable: true
        },
        {
            uid: 'latitud',
            name: 'Latitud',
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
    const handleDesactivar = (id_finca) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Esto podrá afectar a tus lotes!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#006000",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, estoy seguro!"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.put(`http://localhost:3000/finca/desactivarFinca/${id_finca}`, null, { headers: { token: token } })
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
    

    const handleSubmit = async (datosForm, e) => {
        e.preventDefault()

        try {
            if (mode === 'create') {
                const postURL = 'http://localhost:3000/finca/RegistroFinca'
                const response = await axios.post(postURL, datosForm, { headers: { token: token } });
                if (response.status === 200) {
                    fetchData()
                    Swal.fire({
                        position: "center", // Posición centrada
                        icon: "success",
                        title: "Finca registrada con éxito",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } else if (mode === 'update') {
                const updateURL = `http://localhost:3000/finca/actualizarFinca/${idFinca}`
                const response = await axios.put(updateURL, datosForm, { headers: { token: token } });
                if (response.status === 200) {
                    fetchData()
                    Swal.fire({
                        position: "center", // Posición centrada
                        icon: "success",
                        title: "Se actualizó con éxito",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    alert('Error al actualizar')
                }
            }
            setModalOpen(false)
        } catch (error) {
            console.log('Error en el servidor ' + error)
            alert('Error, intente de nuevo')
        }
    }
    const handleToggle = (mode, initialData, id_finca) => {
        setInitialData(initialData)
        setModalOpen(true)
        setMode(mode)
        setIdFinca(id_finca);
    }

    return (
        <div className={`contenido ${sidebarAbierto ? 'contenido-extendido' : ''}`}>
        <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
    
            <div>
            {/* //<Header title="finca" />  */}
            <div className='flex flex-col items-center justify-center w-full p-10'>
                <AccionesModal
                    isOpen={modalAcciones}
                    onClose={() => setModalAcciones(false)}
                    label={mensaje}
                />
                <FincaModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={mode === 'create' ? 'Registrar finca' : 'Actualizar finca'}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                    initialData={initialData}
                    handleSubmit={handleSubmit}
                    mode={mode}
                />
                <Ejemplo
                    clickDesactivar={handleDesactivar}
                    clickEditar={(id_finca) => handleToggle('update', null, id_finca)}
                    clickRegistrar={() => handleToggle('create', null, null)}
                    data={data}
                    finca={finca}
                />
            </div>
        </div>
    </div>
    )
}
export default Finca;
