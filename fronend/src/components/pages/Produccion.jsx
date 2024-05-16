import React, { useEffect, useState } from 'react';
import ModalProdu from '../templates/ProduccionTemplete.jsx';
import AccionesModal from '../organismos/ModalAcciones.jsx';
import axios from 'axios';
import EjemploProduccion from '../organismos/TableProduccion.jsx';
import './CssTablas.css'
import Header from '../organismos/Header/Header.jsx';

export function Produccion() {

    const [sidebarAbierto, setSidebarAbierto] = useState(false);
    
    const toggleSidebar = () => {
      setSidebarAbierto(!sidebarAbierto);
      setPerfilVisible(false); 
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [modalAcciones, setModalAcciones] = useState(false);
    const [mode, setMode] = useState('create');
    const [initialData, setInitialData] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [produccion, setProduccion] = useState([]);

 
    const token = localStorage.getItem('token')

    useEffect(() => {
        fetchData()
    }, [])

    
    const fetchData = async () => {
        try {
            const getURL = 'http://localhost:3000/listarProducciones';
            axios.get(getURL, { headers: { token: token } }).then((response) => {
                console.log(response.data)
                setProduccion(data)
            });

        } catch (error) {
            console.log('Error en el servidor ' + error);
        }
    };

    const data = [
        
        {
            uid: 'cantidad_produccion',
            name: 'Cantidad',
            sortable: true
        },
        {
            uid: 'fecha_fin',
            name: 'Fecha Fin',
            sortable: true
        },
        {
            uid: 'fecha_inicio',
            name: 'Fecha Inicio',
            sortable: true
        },
        {
            uid: 'id_produccion',
            name: 'Id Produccion',
            sortable: true
        },
        {
            uid: 'fk_id_programacion',
            name: 'Fk Programacion',
            sortable: true
        },
        {
            uid: 'actions',
            name: 'Acciones',
            sortable: true
        }
    ];

    const id = localStorage.getItem('idUser');

 

    const handleSubmit = async (datosForm, e) => {
        console.log(datosForm);
        e.preventDefault();

        try {
            if (mode === 'create') {
                const postURL = 'http://localhost:3000/RegistraProduccion';
                
                await axios.post(postURL, datosForm, { headers: { token: token } }).then((response) => {
                    console.log(response)
                if (response.status === 200) {
                    setMensaje('Produccion registrada con éxito');
                    setModalAcciones(true);
                    setModalOpen(false);
                    fetchData();
                }
             }) 
            } else if (mode === 'update') {
                const updateURL = `http://localhost:3000/ActualizarProduccion/:id_producccion/${id}`;
                axios.put(updateURL, datosForm, {headers: {token: token}} ).then((response) => {
                    console.log(response);

                if (response.status === 200) {
                    setMensaje('Se actualizó la produccion con éxito');
                    setModalAcciones(true);
                    setModalOpen(false);
                    fetchData();
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

    const handleToggle = (mode, initialData) => {
        setInitialData(initialData);
        setModalOpen(true);
        setMode(mode);
    };

    return (
        <>
          <div className={`contenido ${sidebarAbierto ? 'contenido-extendido' : ''}`}>
            <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
                <AccionesModal
                    isOpen={modalAcciones}
                    onClose={() => setModalAcciones(false)}
                    label={mensaje}
                />
                <ModalProdu
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={mode === 'create' ? 'Registrar produccion' : 'Actualizar produccion'}
                    actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                    initialData={initialData}
                    handleSubmit={handleSubmit}
                    mode={mode}
                    setModalOpen={setModalOpen}
                />
                <EjemploProduccion
                    clickEditar={() => handleToggle('update', id)}
                    clickRegistrar={() => handleToggle('create')}
                    data={data}
                    produccion={produccion}
                />
            </div>
        </>
    );
}
