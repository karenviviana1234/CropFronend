import React, { createContext, useState } from 'react'
import axiosClient from '../components/axiosClient'
/* import axios from 'axios' */

const UsuarioContext = createContext()

export const UsuarioProvider = ({ children }) => {

    const [usuarios, setUsuarios] = useState([])
    const [usuario, setUsuario] = useState([])
    const [idUsuario, setUsuarioId] = useState([])

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
