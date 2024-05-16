import React, { useEffect, useState } from 'react'
import UsuarioModal from '../templates/UsuarioModal.jsx';
import AccionesModal from '../organismos/ModalAcciones.jsx';
import axios from 'axios';
import EjemploUsuario from '../organismos/TableUsuarios.jsx';
import './CssTablas.css'
import Header from '../organismos/Header/Header.jsx';

export function Usuario() {


    const [sidebarAbierto, setSidebarAbierto] = useState(false);
    const [perfilVisible, setPerfilVisible] = useState(false);
    
    const toggleSidebar = () => {
      setSidebarAbierto(!sidebarAbierto);
      setPerfilVisible(false);
    };
    
    const [modalOpen, setModalOpen] = useState(false)
    const [modalAcciones, setModalAcciones] = useState(false)
    const [mode, setMode] = useState('create')
    const [initialData, setInitialData] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const [usuarios, setusuario] = useState([])
    const [identificacion, setID] = useState([])
    

    useEffect(() => {
        fetchData()
    }, [])

    const token = localStorage.getItem('token')

    const fetchData = async () => {
        try {
            const getURL = 'http://localhost:3000/usuarios/listarUsuarios'
            axios.get(getURL, { headers: { token: token } }).then((response) => {
                setusuario(response.data)
            })

        } catch (error) {
            console.log('Error en el servidor' + error);
        }
    }

    const data = [
        {
            uid: 'identificacion',
            name: 'Identificación', 
            sortable: true
        },
        {
            uid: 'nombre',
            name: 'Nombre',
            sortable: true
        },
        {
            uid: 'apellido',
            name: 'Apellido',
            sortable: true
        },
        {
            uid: 'correo',
            name: 'Correo',
            sortable: true
        },
        {
            uid: 'rol',
            name: 'Rol',
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

    const handleDesactivar = (identificacion) => {
        try {
            axios.put(`http://localhost:3000/usuarios/DesactivarUsuario/${identificacion}`, 
            null, { headers: { token: token } }).then((response) => {
                console.log(response.data);


                if (response.status == 200) {
                    const nuevoEstado = mensaje.split("'")[1];
                setMensaje(`Se cambió el estado del usuario a ${nuevoEstado} con exito`)
                    setModalAcciones(true)
                    fetchData()
                } else {
                    alert('Error' + error)
                }
            })
        } catch (error) {
            alert('Error con el servidor')
        }
    }

    const handleSubmit = async (datosForm, e) => {
        e.preventDefault();
    
        try {
            if (mode === 'create') {
                const postURL = 'http://localhost:3000/usuarios/registrarEmple';
                const response = await axios.post(postURL, datosForm, { headers: { token: token } });
                if (response.status === 200) {
                    fetchData();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Registro Exitoso",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } else if (mode === 'update') {
                const updateURL = `http://localhost:3000/usuarios/actualizarUsuario/${identificacion}`;
                const response = await axios.put(updateURL, datosForm, { headers: { token: token } });
                if (response.status === 200) {
                    setMensaje('Se actualizó con éxito');
                    setModalAcciones(true);
                    setModalOpen(false);
                    fetchData();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Actualización Exitosa",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    throw new Error('Error al actualizar');
                }
            }
            setModalOpen(false);
        } catch (error) {
            console.error('Error en el servidor:', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error",
                text: "Hubo un problema, por favor intente de nuevo.",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    

    const handleToggle = (mode, initialData, identificacion) => {
        setInitialData(initialData)
        setModalOpen(true)
        setMode(mode)
        setID(identificacion);
    }
    
    return (
        <>
          <div className={`contenido ${sidebarAbierto ? 'contenido-extendido' : ''}`}>
            <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
            <AccionesModal
              isOpen={modalAcciones}
              onClose={() => setModalAcciones(false)}
              label={mensaje}
            />
            <UsuarioModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title={mode === 'create' ? 'Registrar usuario' : 'Actualizar usuario'}
              className=''
              actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
              initialData={initialData}
              handleSubmit={handleSubmit}
              mode={mode}
              setModalOpen={setModalOpen}
            />
            <EjemploUsuario
              clickDesactivar={handleDesactivar}
              clickEditar={() => handleToggle('update', identificacion)}
              clickRegistrar={() => handleToggle('create')}
              data={data}
              usuarios={usuarios}
            />
          </div>
        </>
      );
    }