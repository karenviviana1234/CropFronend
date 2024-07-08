import React, { createContext, useState } from 'react'
//Archivo axiosClient es una instancia de Axios configurada previamente para hacer peticiones HTTP.
import axiosClient from '../components/axiosClient'
/* import axios from 'axios' */

//creando el contexto
const UsuarioContext = createContext()

export const UsuarioProvider = ({ children }) => {
//usuarios: Lista de usuarios.
//usuario: Datos de un usuario específico.
//idUsuario: Identificador del usuario.
    const [usuarios, setUsuarios] = useState([])
    const [usuario, setUsuario] = useState([])
    const [idUsuario, setUsuarioId] = useState([])


    //getUsuarios: Realiza una solicitud para obtener todos los usuarios y actualiza el estado usuarios.
    const getUsuarios = () => {
        try {
            axiosClient.get('/usuarios/listarUsuarios').then((response) => {
                console.log(response.data)
                setUsuarios(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    //getUsuario: Realiza una solicitud para obtener los datos de un usuario específico por su identificación y actualiza el estado usuario.
    const getUsuario = (identificacion) => {
        try {
            axiosClient.get(`/usuarios/buscarUsuarios${identificacion}`).then((response) => {
                console.log(response.data)
                setUsuario(response.data)
            })
        } catch (error) {
            console.log('Error' + error) ;
        }
    }
  return (
    //Se exporta todo lo que se utilizo
    <UsuarioContext.Provider
        value={{
            usuarios,
            usuario,
            idUsuario,
            setUsuarios,
            setUsuario,
            setUsuarioId,
            getUsuarios,
            getUsuario
        }}
    >
        {children}
    </UsuarioContext.Provider>
  )
}

export default UsuarioContext
