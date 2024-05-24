import React, { useEffect, useState } from 'react'
import './CssTablas.css'
import Header from '../organismos/Header/Header.jsx';
import TipoRModal from '../templates/TipoRModal.jsx';
import AccionesModal from '../organismos/ModalAcciones.jsx';
import axios from 'axios';
import Ejemplo from '../organismos/TableTRecursos.jsx';
import Swal from 'sweetalert2';
//confirmacion yaa

 function TipoRecursos() {

        const [sidebarAbierto, setSidebarAbierto] = useState(false);
    
        const toggleSidebar = () => {
          setSidebarAbierto(!sidebarAbierto);
        };
     
    const [modalOpen, setModalOpen] = useState(false)
    const [modalAcciones, setModalAcciones] = useState(false)
    const [mode, setMode] = useState('create')
    const [initialData, setInitialData] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const [tipo_recursos, setTipo_recursos] = useState([])
    const [idTipo_recursos, setIdTipo_recursos] = useState(null); // Nuevo estado para almacenar el id_finca a actualizar


    useEffect(() => {
        fetchData()
    }, [])

    const token = localStorage.getItem('token')

    const fetchData = async () => {
        try {
            const getURL = 'http://localhost:3000/listarRecurso'
            const response = await axios.get(getURL, { headers: { token: token } }).then((response) => {
                console.log(response.data)
                setTipo_recursos(response.data)
            })

        } catch (error) {
            console.log('Error en el servidor' + error);
        }
    }

    const data = [
        {
            uid: 'id_tipo_recursos',
            name: 'Id',  // El titulo de los id
            sortable: true
        },
        {
            uid: 'nombre_recursos',
            name: 'Nombre recursos',
            sortable: true
        },
        {
            uid: 'cantidad_medida',
            name: 'Cantidad',
            sortable: true
        },
        {
            uid: 'unidades_medida',
            name: 'Unidades',
            sortable: true
        },
        {
            uid: 'extras',
            name: 'Extras',
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

    const handleDesactivar = (id_tipo_recursos) => {
        try {
            axios.put(`http://localhost:3000/desactivarRecurso/${id_tipo_recursos}`, null, {headers: {token: token}})
                .then((response) => {
                   // const mensaje = response.data.message;
                    if (response.status === 200) {  
                        const newEstado = response.data.message.split("'")[1]; 
                        fetchData();
                        Swal.fire({
                            position: "center", // Posición centrada
                            icon: "success",
                            title: `Se cambió el estado del recurso a ${newEstado}`,
                            showConfirmButton: false,
                            timer: 1400
                        });
                    } else {
                        alert('Error' + error);
                    }
                });
        } catch (error) {
            alert('Error con el servidor');
        }
    };

    //const id = localStorage.getItem('idUser')

    const handleSubmit = async (datosForm, e) => {
        e.preventDefault();
    
        try {
            if (mode === 'create') {
                const postURL = 'http://localhost:3000/RegistroRecurso';
    
                const response = await axios.post(postURL, datosForm, { headers: { token: token } });
    
                if (response.status === 200) {
                    fetchData();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Recurso registrado con éxito",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } else if (mode === 'update') {
                const updateURL = `http://localhost:3000/actualizarRecurso/${idTipo_recursos}`;
                const response = await axios.put(updateURL, datosForm, { headers: { token: token } });
    
                if (response.status === 200) {
                    fetchData();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Se actualizó con éxito",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    alert('Error al actualizar');
                }
            }
            setModalOpen(false);
        } catch (error) {
            console.log('Error en el servidor ' + error);
            alert('Error, intente de nuevo');
        }
    };
    
    const handleToggle = (mode, initialData, id_tipo_recursos) => {
        setInitialData(initialData)
        setModalOpen(true)
        setMode(mode)
        setIdTipo_recursos(id_tipo_recursos);
    }
        return (
            <div className={`contenido ${sidebarAbierto ? 'contenido-extendido' : ''}`}>
            <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
        
        <div>
            {/* <Header title="recursos" /> */}
            <div className='w-full flex flex-col justify-center items-center p-10'>

                <AccionesModal
                    isOpen={modalAcciones}
                    onClose={() => setModalAcciones(false)}
                    label={mensaje}
                />
                <TipoRModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={mode === 'create' ? 'Registrar Recurso' : 'Actualizar Recurso'}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                    initialData={initialData}
                    handleSubmit={handleSubmit}
                    mode={mode}
                    
                />
                <Ejemplo
                    clickDesactivar={handleDesactivar}
                    clickEditar={(id_tipo_recursos) => handleToggle('update', null, id_tipo_recursos)}
                    clickRegistrar={() => handleToggle('create', null, null)}
                    data={data}
                    tipo_recursos={tipo_recursos}
                />
            </div>
        </div>
    </div>
  )
}

export default TipoRecursos;